
export const WELCOME_CONTENTS = ["jeden", "dwa", "trzy", "cztery", "piec"]

export const OFFERT_TEXT = "Oferta na kursyy!!"
export const OFFERT_ADD = "30%"

interface welcomePanelContent {
    title: string,
    param: string,
    helpMessage: string,
    
    secondButtonAnchor: string,
    buttonText: string,
    additionText: string,
    imageUrl: string
}

interface headerButtonsContent { 
    text: string,
    url: string
}

export const WELCOME_PANEL_CONTENTS: welcomePanelContent[] = [
    {
        additionText: "Na googlu mamy same dobre opinie.",
        title: "Nasza akademia czeka na ciebie.",
        param: "Od lat prowadzimy kompleksowe szkolenia z dziedziny groomingu. Niesłychana wiedza oraz zaangażowanie powoduje że jesteśmy najlepsi w naszej dziedzinie. Nie ma lepszego bo tak.",
        buttonText: "Zapisz się",
        secondButtonAnchor: "",
        helpMessage: "o nas",
        imageUrl: "https://picsum.photos/id/1018/1920/1080"
    },
    {
        title: "Kursy dla początkujących.",
        additionText: "Pomagamy realizować się każdej nowej osobie",
        param: "Zaczynasz od zera? Krok po kroku nauczymy cię kąpieli, suszenia i podstaw strzyżenia. Pracujesz na prawdziwych psach pod okiem instruktora, w małych grupach.",
        buttonText: "Zobacz kursy",
        secondButtonAnchor: "",
        helpMessage: "kursy",
        imageUrl: "https://picsum.photos/id/1020/1920/1080"
    },
    {
        title: "Doświadczeni instruktorzy.",
        additionText: "Nasza kadra robi kursy od 10 lat.",
        param: "Uczą cię groomerzy z wieloletnią praktyką w salonach i na wystawach. Dzielą się sprawdzonymi technikami i trikami, których nie znajdziesz w podręcznikach.",
        buttonText: "Poznaj zespół",
        secondButtonAnchor: "",
        helpMessage: "instruktorzy",
        imageUrl: "https://picsum.photos/id/1022/1920/1080"

    },
    {
        title: "Certyfikat na start kariery.",
        additionText: "Potrzebujes dwujęzycznego? Nie ma problemu!",
        param: "Każdy kurs kończy się egzaminem praktycznym i certyfikatem. Pomagamy też w pierwszych krokach zawodowych — od wyposażenia stanowiska po pozyskanie klientów.",
        buttonText: "Dowiedz się więcej",
        secondButtonAnchor: "",
        helpMessage: "certyfikat",
        imageUrl: "https://picsum.photos/id/1023/1920/1080"


    },
    {
        title: "Zapisy na nowy semestr.",
        additionText: "Dawaaaaj co ci szkodzi",
        param: "Ruszają zapisy na kolejne edycje kursów. Liczba miejsc w grupach jest ograniczona, więc nie zwlekaj — zarezerwuj termin, który ci pasuje.",
        buttonText: "Zarezerwuj miejsce",
        secondButtonAnchor: "",
        helpMessage: "zapisy",
        imageUrl: "https://picsum.photos/id/1025/1920/1080"
    }
]

export const HEADER_PANEL_BUTTONS: headerButtonsContent[] = [
    {text: "Strona główna", url: "/"},
    {text: 'Galeria', url: "/gallery"},
    {text: "O nas", url: "/about"},
    {text: "Cennik", url: "/cost"},
]


//Strona "O nas" — tekst od klientki podzielony na sekcje. Akapit albo lista punktów, w kolejności jak w oryginale
type aboutBlock = { paragraph: string } | { list: string[] }

interface aboutSection {
    title?: string,
    blocks: aboutBlock[],
}

export const ABOUT_WELCOME_TITLE = "Witaj"
export const ABOUT_WELCOME_SUBTITLE = "rozpocznij nową przygodę z groomingiem w naszej Akademii"

export const ABOUT_SECTIONS: aboutSection[] = [
    {
        blocks: [
            { paragraph: "Akademia Oohs&Woofs powstała z potrzeby stworzenia przestrzeni, w której wysoki standard zawodowy nie odbywa się kosztem człowieka ani zwierzęcia." },
            { paragraph: "Nie jesteśmy kolejną szkołą groomingu." },
            { paragraph: "Posiadamy 10 lat doświadczenia w groomingu i 12 lat w coachingu." },
            { paragraph: "Jesteśmy miejscem, w którym profesjonalizm, empatia i odpowiedzialność istnieją jednocześnie." },
            { paragraph: "Wierzymy, że prawdziwa jakość rodzi się w spokoju." },
            { paragraph: "Że nauka nie wymaga strachu." },
            { paragraph: "Że rozwój nie potrzebuje presji." },
            { paragraph: "Dlatego Akademia Oohs&Woofs to coś więcej niż szkolenia." },
            { paragraph: "To kultura." },
        ],
    },
    {
        title: "Nasza filozofia",
        blocks: [
            { paragraph: "Uczymy groomingu, ale przede wszystkim uczymy ludzi." },
            { paragraph: "Uczymy ich:" },
            { list: [
                "pracy z uważnością",
                "odpowiedzialności bez lęku",
                "komunikacji bez zawstydzania",
                "stawiania granic z szacunkiem",
            ] },
            { paragraph: "W centrum naszej filozofii zawsze są trzy elementy:" },
            { list: ["człowiek", "zwierzę", "proces"] },
            { paragraph: "Żaden z nich nie jest ważniejszy kosztem pozostałych." },
        ],
    },
    {
        title: "Dlaczego powstała Akademia Oohs&Woofs?",
        blocks: [
            { paragraph: "Akademia Oohs&Woofs narodziła się z doświadczenia – zarówno zawodowego, jak i ludzkiego." },
            { paragraph: "Z obserwacji, że w branży groomingu:" },
            { list: [
                "często brakuje bezpieczeństwa psychologicznego",
                "nauka bywa oparta na strachu, presji lub zawstydzaniu",
                "wysokie wymagania nie idą w parze z troską o człowieka",
            ] },
            { paragraph: "My wybraliśmy inną drogę." },
            { paragraph: "Zdecydowaliśmy, że:" },
            { list: [
                "standard może być wysoki i jednocześnie ludzki",
                "błąd może być elementem nauki, a nie powodem do wstydu",
                "zwierzę zasługuje na spokój, a nie pośpiech",
            ] },
            { paragraph: "Akademia Oohs&Woofs to odpowiedź na potrzebę zmiany kultury w branży." },
        ],
    },
    {
        title: "Zaproszenie",
        blocks: [
            { paragraph: "Jeśli czujesz, że:" },
            { list: [
                "chcesz się rozwijać w bezpiecznej przestrzeni",
                "cenisz jakość i spokój",
                "chcesz pracować ze zwierzętami odpowiedzialnie",
            ] },
            { paragraph: "Zapraszamy do Akademii Oohs&Woofs. To nie jest tylko nauka groomingu." },
            { paragraph: "To jest kultura pracy, która zostaje na lata." },
        ],
    },
]

//W oryginale poprzedzone "Dodając w jednym zdaniu -"
export const ABOUT_SUPPORT_QUOTE = "Damy Ci ogromne wsparcie w starcie."

export const ABOUT_CONTACT_TEXT = "Zadzwoń dopytaj o szczegóły"
export const ABOUT_CONTACT_PHONE = "884 701 223"
