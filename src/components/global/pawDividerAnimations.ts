import gsap from "gsap"

//Rozsuwanie kresek — szybkie, z wyhamowaniem na końcu
const LINE_ENTER_DURATION = 0.7
//Kreski ruszają chwilę po starcie pojawiania się łapy
const LINE_ENTER_DELAY = 0.2

//Chowanie jest wyraźnie krótsze: przy zmianie slajdu treść czeka na nie, więc długi wyjazd byłby ospały.
//Eksportowane, żeby wołający wiedział, po jakim czasie może podmienić kontent
export const PAW_DIVIDER_LEAVE_DURATION = 0.45

//Bieżąca animacja każdej przedziałki — nowa dokańcza poprzednią natychmiast, zanim ruszy
const runningTimelines = new WeakMap<Element, gsap.core.Timeline>()

//Niedokończona poprzednia animacja skacze od razu na swój koniec — nowa rusza z czystego stanu,
//a nie walczy o te same właściwości z tweenami, które jeszcze trwają
const finishRunning = (root: Element) => {
    runningTimelines.get(root)?.progress(1).kill()
    runningTimelines.delete(root)
}

//Elementy, nie selektory — funkcje mogą być wołane z callbacków tweenów z innych kontekstów GSAP
//data-paw-animation="false" — łapa stoi w miejscu, animują się tylko kreski
const parts = (root: Element) => ({
    lines: root.querySelectorAll(".paw-divider-line"),
    paw: root.querySelector(".paw-divider-svg"),
    animatePaw: (root as HTMLElement).dataset.pawAnimation !== "false",
})

//Wjazd: łapa się pojawia, a kreski wyjeżdżają od niej na zewnątrz.
//transform-origin każdej kreski siedzi przy łapie, więc scaleX wygląda jak rysowanie linii w bok
export function enterPawDivider(root: Element) {
    finishRunning(root)
    const { lines, paw, animatePaw } = parts(root)

    const timeline = gsap.timeline()
    if (animatePaw) timeline.fromTo(paw, { opacity: 0 }, { opacity: 1, duration: LINE_ENTER_DURATION, ease: "power3.out" }, 0)
    timeline.fromTo(lines, { scaleX: 0 }, { scaleX: 1, duration: LINE_ENTER_DURATION, ease: "power2.out" }, LINE_ENTER_DELAY)

    runningTimelines.set(root, timeline)
    return timeline
}

//Wyjście: kreski chowają się z powrotem pod łapę, potem gaśnie łapa.
//Wjazd jest już dokończony przez finishRunning, więc kreski zawsze chowają się z pełnej długości
export function leavePawDivider(root: Element) {
    finishRunning(root)
    const { lines, paw, animatePaw } = parts(root)

    const timeline = gsap.timeline()
        .to(lines, { scaleX: 0, duration: PAW_DIVIDER_LEAVE_DURATION, ease: "power2.in" }, PAW_DIVIDER_LEAVE_DURATION / 2)
    if (animatePaw) timeline.to(paw, { opacity: 0, duration: PAW_DIVIDER_LEAVE_DURATION / 3 * 2, ease: "power2.in" })

    runningTimelines.set(root, timeline)
    return timeline
}

//Bez animacji — kreski od razu rozłożone, łapa widoczna
export function showPawDivider(root: Element) {
    finishRunning(root)
    const { lines, paw } = parts(root)
    gsap.set(lines, { scaleX: 1 })
    gsap.set(paw, { opacity: 1 })
}
