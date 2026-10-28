import {
    MapPinSvg,
    ClockSvg,
    PhoneSvg,
    MailSvg,
    InstagramSvg,
    FacebookSvg,
} from "../icons/index";

export const CONTACT_TITLE = 'Kontakt'

const CONTACT_ADDRESS = "ul. Przykładowa 12, 00-001 Warszawa"

export type ContactRow = {
    label: string,
    value: string,
    href?: string, //Z linkiem wartość jest klikalna (tel:, mailto:, mapa)
    Icon: typeof MapPinSvg
}

export type SocialLink = {
    name: string,
    href: string,
    Icon: typeof InstagramSvg
}
export type ContactContent = {
    heading: string,
    rows: ContactRow[],
    socials: SocialLink[],
    buttonText: string
}

export const FREE_COURSE_TEXT = {
    title: "Nie wiesz czy czy ta praca jest dla Ciebie?",
    titleSecond: "Pobierz bezpłatny kurs wstępny i zobacz czy ci się spodoba.",
    content: `Wierzymy, że większość waha się przed podjęciem decyzji wyboru kursu.
             U nas nie musisz kupować kota w worku i bezpłatnie możesz zobaczyć z czym wiąrze się praca groomera. 
             Matariały posiadają niezbędne informacje, które każdy początkujący groomer musi znać.`,
    footerText: "Rozwij swoje obawy kompletnie za darmo z naszym darmowym mini-kursem!",

    buttonMoreText: "Dowiedz się więcej",
    buttonDownlandText: "Pobierz darmowe materiały",

    imgUrl: "https://picsum.photos/id/1/3000/2000"
}

export const CONTACT_CONTENT: ContactContent = {
    heading: "Wpadnij z psem",
    rows: [
        {
            label: "adres",
            value: CONTACT_ADDRESS,
            href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT_ADDRESS)}`,
            Icon: MapPinSvg,
        },
        { label: "godziny otwarcia", value: "pon–pt 9:00–18:00, sob 9:00–14:00", Icon: ClockSvg },
        { label: "telefon", value: "+48 600 000 000", href: "tel:+48600000000", Icon: PhoneSvg },
        { label: "e-mail", value: "kontakt@oohsnwoofs.pl", href: "mailto:kontakt@oohsnwoofs.pl", Icon: MailSvg },
    ],
    socials: [
        { name: "Instagram", href: "https://instagram.com/oohsnwoofs", Icon: InstagramSvg },
        { name: "Facebook", href: "https://facebook.com/oohsnwoofs", Icon: FacebookSvg },
    ],
    buttonText: "Umów wizytę",
}


export type FooterLink = {
    label: string,
    href: string
}

export type FooterContent = {
    brand: string,
    tagline: string,
    navHeading: string,
    contactHeading: string,
    socialsHeading: string,
    legalLinks: FooterLink[], //Dolny pasek: polityka prywatności, regulamin, cookies
    copyright: string
}

export const FOOTER_CONTENT: FooterContent = {
    brand: "oohs",
    tagline: "Salon groomerski i akademia groomingu. Dbamy o psy tak, jak o własne.",
    navHeading: "Na stronie",
    contactHeading: "Kontakt",
    socialsHeading: "Obserwuj nas",
    legalLinks: [
        { label: "Polityka prywatności", href: "/polityka-prywatnosci" },
        { label: "Regulamin", href: "/regulamin" },
        { label: "Polityka cookies", href: "/cookies" },
    ],
    copyright: `© ${new Date().getFullYear()} Oohs 'n Woofs. Wszelkie prawa zastrzeżone.`,
}