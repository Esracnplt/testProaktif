export const LOCALES = {
    ENGLISH: "en-US",
    TURKISH: "tr-TR",
    // GERMAN: "de-DE",
    // FRENCH: "fr-FR",
}

export const LANGUAGE_OPTIONS = [
    {
        label: "TR",
        value: "tr-TR", // Sitenin lokal dil değerini değiştiren sabit
        phoneLocale: "tr", // ReactPhone inputun local değerini değiştiren sabit
        languageCode: "tr", // Grafiğin lokal dil değerini değiştiren sabit
    },
    {
        label: "EN",
        value: "en-US",
        phoneLocale: "us",
        languageCode: "en",
    },
]
export const getBrowserLanguage=()=>navigator.language.length >= 3 ? navigator.language : (Object.values(LOCALES).find(l => l.toLowerCase().indexOf(navigator.language.toLowerCase()) >= 0));
