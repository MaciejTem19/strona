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