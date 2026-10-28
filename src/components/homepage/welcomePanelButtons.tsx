import { useEffect, useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { WELCOME_PANEL_CONTENTS } from "./texts"
import { PANEL_ENTER_EVENT, PANEL_LEAVE_EVENT, dispatchPanelEvent, type PanelEventDetail } from "./panelEvents"

export type AnimationType =  "none" | "entering" | "leaving"

export const withAlpha = (hex: string, alpha: number) => {
    const n = parseInt(hex.slice(1), 16)
    return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`
}

//Podpisy dymków nad guzikami — po jednym na każdy panel powitalny
const WELCOME_CONTENTS = WELCOME_PANEL_CONTENTS.map(({ helpMessage }) => helpMessage)

const SLIDE_DURATION = 10

const WELCOME_SWITCH_LABEL = "aaaa"

//GSAP nie animuje var(), więc kolory kropek są wpisane jako hex z palety: dark-800 i secondary-400
const DOT_SIZE = "0.75rem"
const DOT_ACTIVE_WIDTH = "2.5rem"
const DOT_RESIZE_DURATION = 0.45
const DOT_IDLE_COLOR = withAlpha("#2f3437", 0.3)
const DOT_TRACK_COLOR = withAlpha("#fb9637", 0.3)


type ArrowWithHelpProp = { 
    type: "left" | "right", 
    contentIndex: number, 
    contentAnimation: AnimationType,
    onGoTo: (index: number) => void 
} 


function ArrowWithHelp({contentAnimation, contentIndex, onGoTo, type} : ArrowWithHelpProp) {
// const ArrowWithHelp = ({ type, contentIndex, contentAnimation, onGoTo }: { type: "left" | "right", contentIndex: number, contentAnimation: AnimationType, onGoTo: (index: number) => void }) => {

    const [hovered, setHovered] = useState(false)
    const target = contentIndex + (type === "left" ? -1 : 1)
    const targetName = WELCOME_CONTENTS[(target + WELCOME_CONTENTS.length) % WELCOME_CONTENTS.length]

    return <span className="relative flex" onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
        <HelpDotInfo isShown={hovered} animationFase={contentAnimation} text={targetName} size="large" />
        <PhotoButton type={type} onClick={() => onGoTo(target)} />
    </span>
}

export function WelcomePanelButtons() {

    const [contentIndex, setContentIndex] = useState(0)
    const [contentAnimation, setContentAnimation] = useState<AnimationType>("entering")
    //Ref, a nie stan — goTo wołane z onComplete paska postępu widziałoby nieaktualny stan z poprzedniego renderu
    const shownIndex = useRef(0)
    const isLeaving = useRef(false)

    //Tekst panelu kończy wyjście i wpuszcza nowy — dopiero wtedy przestawiamy kropki i odpalamy pasek od nowa
    useEffect(() => {
        const onEnter = (event: Event) => {
            const { index } = (event as CustomEvent<PanelEventDetail>).detail
            isLeaving.current = false
            shownIndex.current = index
            setContentIndex(index)
            setContentAnimation("entering")
        }
        document.addEventListener(PANEL_ENTER_EVENT, onEnter)
        return () => document.removeEventListener(PANEL_ENTER_EVENT, onEnter)
    }, [])

    const goTo = (index: number) => {
        const target = (index + WELCOME_CONTENTS.length) % WELCOME_CONTENTS.length
        //Klik w trakcie wyjścia albo w bieżący panel pomijamy, żeby animacje się nie nakładały
        if (isLeaving.current || target === shownIndex.current) return

        isLeaving.current = true
        setContentAnimation("leaving")
        dispatchPanelEvent(PANEL_LEAVE_EVENT, target)
    }

    //Białe tło w pigułce pod strzałkami i kropkami, żeby odcinały się od półprzezroczystego panelu
    return <div className="mx-auto mt-7 flex w-fit items-center justify-center gap-4 rounded-full bg-white/80 px-4 py-2 shadow-sm">
        <ArrowWithHelp type="left" contentIndex={contentIndex} contentAnimation={contentAnimation} onGoTo={goTo} />
        <SwitchDots contentIndex={contentIndex} contentAnimation={contentAnimation} onDotClick={goTo} />
        <ArrowWithHelp type="right" contentIndex={contentIndex} contentAnimation={contentAnimation} onGoTo={goTo} />
    </div>
}

export default WelcomePanelButtons

export type SwitchDotsProps = {
    contentIndex: number,
    contentAnimation: AnimationType,
    onDotClick: (index: number) => void
}

//Kropki slajdów: aktywna rozciąga się w pigułkę, a w niej pasek postępu do automatycznej zmiany slajdu —
//trwa tyle co wjazd i dryf zdjęcia, bo to koniec dryfu przełącza slajd
const SwitchDots = ({ contentIndex, contentAnimation, onDotClick }: SwitchDotsProps) => {

    const [hovered, setHovered] = useState(-1);
    
    const rootRef = useRef<HTMLDivElement>(null)
    const dotRefs = useRef<(HTMLButtonElement | null)[]>([])
    const fillRefs = useRef<(HTMLSpanElement | null)[]>([])
    const isFirstRender = useRef(true)

    useGSAP(() => {
        const firstRender = isFirstRender.current
        isFirstRender.current = false

        dotRefs.current.forEach((dot, index) => {
            const active = index === contentIndex
            const target = {
                width: active ? DOT_ACTIVE_WIDTH : DOT_SIZE,
                backgroundColor: active ? DOT_TRACK_COLOR : DOT_IDLE_COLOR,
            }
            if (firstRender) gsap.set(dot, target)
            else gsap.to(dot, { ...target, duration: DOT_RESIZE_DURATION, ease: "power3.out", overwrite: "auto" })
        })

        //Nieaktywne paski gasną od razu, żeby przy powrocie do slajdu nie startowały od starego postępu
        fillRefs.current.forEach((fill, index) => {
            if (index !== contentIndex) gsap.set(fill, { scaleX: 0, overwrite: true })
        })
    }, { scope: rootRef, dependencies: [contentIndex] })

    useGSAP(() => {
        const fill = fillRefs.current[contentIndex]
        if (!fill || contentAnimation !== "entering") return
        //Pełny pasek = koniec slajdu, przechodzimy automatycznie do następnego
        gsap.fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: SLIDE_DURATION, ease: "none", overwrite: true, onComplete: () => onDotClick(contentIndex + 1) })
    }, { scope: rootRef, dependencies: [contentAnimation, contentIndex] })

    const hover = (index: number, on: boolean) => {
        if (on) {
            setHovered(index)
        }
        else {
            setHovered(-1)
        }
        gsap.to(dotRefs.current[index], { scale: on ? 1.25 : 1, duration: 0.2, ease: "power2.out", overwrite: "auto" })
    }

    const press = (index: number) => {
        gsap.fromTo(dotRefs.current[index], { scale: 0.8 }, { scale: 1, duration: 0.35, ease: "back.out(3)", overwrite: "auto" })
        onDotClick(index)
    }

    return <div ref={rootRef} className="flex items-center gap-2" role="tablist" aria-label={WELCOME_SWITCH_LABEL}>
        {WELCOME_CONTENTS.map((text, index) => (
            <span key={index} className="relative flex">
                <HelpDotInfo isShown={index == hovered && contentIndex != index} animationFase={contentAnimation} text={text} size="small"/>
                <button
                    ref={(el) => { dotRefs.current[index] = el }}
                    type="button"
                    role="tab"
                    aria-selected={index === contentIndex}
                    // aria-label={welcomeSwitchItemLabel(index, WELCOME_CONTENTS.length)}
                    onPointerEnter={() => hover(index, true)}
                    onPointerLeave={() => hover(index, false)}
                    onClick={() => press(index)}
                    className="relative h-3 w-3 overflow-hidden rounded-full border-0 p-0 cursor-pointer bg-dark-800/30"
                >
                    <span
                        ref={(el) => { fillRefs.current[index] = el }}
                        //Startowe scaleX(0) inline, nie klasą scale-x-0 — Tailwind 4 ustawia nią właściwość `scale`, której GSAP nie rusza, więc pasek zostawał niewidoczny
                        style={{ transform: "scaleX(0)" }}
                        className="absolute inset-0 origin-left rounded-full bg-secondary-600"
                        aria-hidden="true"
                    />
                </button>
            </span>
        ))}
    </div>
}


//Rozmiary dymka: pigułka i strzałka pod nią
const HELP_DOT_SIZES = {
    small: { bubble: "px-3.5 py-1 text-sm", arrow: "-mt-1 h-2 w-2" },
    large: { bubble: "px-4 py-1.5 text-base", arrow: "-mt-1.5 h-2.5 w-2.5" },
}

//Opóźnienie ponownego pokazania dymka po zmianie panelu, gdy kursor cały czas był na guziku (s)
const HELP_DOT_RETURN_DELAY = 0.5

const HelpDotInfo = ({isShown, animationFase, text, size = "small"} : {isShown: boolean, animationFase:  AnimationType, text:string, size?: keyof typeof HELP_DOT_SIZES}) => {

    const dRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLSpanElement>(null)
    //Bieżące przejście pokaż/schowaj — przed nowym zabijamy stare, żeby wygaszanie nie walczyło z pokazywaniem
    const visibilityTween = useRef<gsap.core.Tween | null>(null)
    //Poprzednie isShown — pozwala odróżnić świeży hover od powrotu dymka po zmianie panelu przy wciąż trzymanym kursorze
    const wasShown = useRef(isShown)

    //Tekst w dymku podmieniamy dopiero po zrzuceniu stanu Flipa — wtedy szerokość płynnie przechodzi do nowego tekstu
    const [shownText, setShownText] = useState(text)
    // const flipState = useRef<Flip.FlipState | null>(null)

    useLayoutEffect(() => {
        if (text === shownText) return
        // flipState.current = isShown && dRef.current ? Flip.getState(dRef.current) : null
        setShownText(text)
    }, [text])

    // useGSAP(() => {
    //     const state = flipState.current
    //     flipState.current = null
    //     if (!state) return
    //     //Dymek jest centrowany względem własnej szerokości, więc layout sam go przesuwa — przesunięcie x od Flipa zdublowałoby ruch
    //     Flip.from(state, {
    //         duration: 0.35,
    //         ease: "power2.inOut",
    //         simple: true,
    //         onUpdate: () => { gsap.set(dRef.current, { x: 0 }) },
    //         onComplete: () => { gsap.set(dRef.current, { clearProps: "width,height" }) },
    //     })
    //     gsap.fromTo(textRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, delay: 0.1, ease: "power1.out", overwrite: true })
    // }, [shownText])

    useGSAP( () => {
        gsap.set(dRef.current, {autoAlpha: 0, y: 6, scale: 0.9})
    }, [])

    useGSAP(() => {

        visibilityTween.current?.kill()
        //Kursor był już na guziku, a zmieniła się tylko faza panelu — dymek wraca z opóźnieniem, gdy nowa treść już wjeżdża
        const returnsAfterPanelChange = isShown && wasShown.current
        wasShown.current = isShown

        if (animationFase == "leaving" || animationFase == "none") {
            visibilityTween.current = gsap.to(dRef.current, {autoAlpha: 0, y: 6, scale: 0.9, ease: "power1.in", duration: 0.2, overwrite: "auto"})
        }
        else if (isShown) {
            visibilityTween.current = gsap.to(dRef.current, {autoAlpha: 1, y: 0, scale: 1, ease: "back.out(2)", duration: 0.35, delay: returnsAfterPanelChange ? HELP_DOT_RETURN_DELAY : 0, overwrite: "auto"})
        }
        else {
            visibilityTween.current = gsap.to(dRef.current, {autoAlpha: 0, y: 6, scale: 0.9, ease: "power1.in", duration: 0.2, overwrite: "auto"})
        }
    }, {scope: dRef, dependencies: [isShown, animationFase]})

    //Zewnętrzny div tylko centruje nad kropką — transformy z GSAP siedzą na wewnętrznym, żeby nie nadpisały translate
    return <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-3 -translate-x-1/2" aria-hidden="true">
        <div ref={dRef} className={`relative origin-bottom whitespace-nowrap rounded-full bg-secondary-600 font-medium text-light-50 shadow-md ${HELP_DOT_SIZES[size].bubble}`}>
            <span ref={textRef} className="block overflow-hidden">{shownText}</span>
            <span className={`absolute left-1/2 top-full -translate-x-1/2 rotate-45 bg-secondary-600 ${HELP_DOT_SIZES[size].arrow}`}/>
        </div>
    </div>
}


const ARROW_PATH = {
    left: "M15 5l-7 7 7 7",
    right: "M9 5l7 7-7 7",
}

const ARROW_LABEL = {
    left: "Poprzednie zdjęcie",
    right: "Następne zdjęcie",
}

//Klasy guzika ze strzałką trzymamy osobno od JSX, pogrupowane: układ, wygląd, fokus, wyłączony
const PHOTO_BUTTON_STYLE = {
    button: [
        "inline-grid size-11 shrink-0 place-items-center p-0",
        "rounded-full border-2 border-dark-800 bg-transparent text-dark-800 cursor-pointer",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-600",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    ].join(" "),
    icon: "size-1/2",
}

type PhotoButtonProps = {
    type: "left" | "right"
    onClick?: () => void
    disabled?: boolean
}

export function PhotoButton({ type, onClick, disabled }: PhotoButtonProps) {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const iconRef = useRef<SVGSVGElement>(null)
    const dir = type === "left" ? -1 : 1

    useEffect(() => {
        const targets = [buttonRef.current, iconRef.current]
        return () => { gsap.killTweensOf(targets) }
    }, [])

    const hover = (on: boolean) => {
        gsap.to(buttonRef.current, {
            scale: on ? 1.08 : 1,
            backgroundColor: withAlpha("#2f3437", on ? 0.08 : 0),
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto",
        })
    }

    const press = (down: boolean) => {
        gsap.to(buttonRef.current, {
            scale: down ? 0.9 : 1.08,
            duration: 0.12,
            ease: "power2.out",
            overwrite: "auto",
        })
    }

    const handleClick = () => {
        gsap.fromTo(iconRef.current,
            { x: 0 },
            { x: dir * 8, duration: 0.12, yoyo: true, repeat: 1, ease: "power1.inOut", overwrite: "auto" },
        )
        onClick?.()
    }

    return (
        <button
            ref={buttonRef}
            type="button"
            className={PHOTO_BUTTON_STYLE.button}
            aria-label={ARROW_LABEL[type]}
            disabled={disabled}
            onPointerEnter={() => hover(true)}
            onPointerLeave={() => hover(false)}
            onPointerDown={() => press(true)}
            onPointerUp={() => press(false)}
            onClick={handleClick}
        >
            <svg ref={iconRef} className={PHOTO_BUTTON_STYLE.icon} viewBox="0 0 24 24" aria-hidden="true">
                <path
                    d={ARROW_PATH[type]}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    )
}
