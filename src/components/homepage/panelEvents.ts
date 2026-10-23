//Zdarzenia na document łączące guziki (wyspa React) z tekstem panelu (skrypt Astro) — to osobne bundle, więc nie mogą się importować nawzajem

//Guziki → tekst: zacznij chować bieżący panel i pokaż panel o danym indeksie
export const PANEL_LEAVE_EVENT = "welcome-panel:leave"
//Tekst → guziki: stary panel zniknął, nowy właśnie wjeżdża
export const PANEL_ENTER_EVENT = "welcome-panel:enter"

export type PanelEventDetail = { index: number }

export const dispatchPanelEvent = (name: string, index: number) => {
    document.dispatchEvent(new CustomEvent<PanelEventDetail>(name, { detail: { index } }))
}
