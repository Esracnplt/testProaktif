import { atom, selector } from "recoil";
import { getBrowserLanguage, LOCALES } from "../i18nProvider/locales";
import history from "./history";


export const currentLocale = atom({// Halihazırdaki lokal dilin tutulduğu değişken
    key: "currentLocale",
    default: (new URLSearchParams(history.location.search)).get('language') || localStorage.getItem('language') || getBrowserLanguage() || LOCALES.TURKISH
  })
  
  export const currentLocaleSelector = selector({
    key: 'currentLocaleSelector',
    get: ({ get }) => {
      return get(currentLocale);
    },
  });
  export const navClass= atom({
      key: "navClass",
      default: "navMain"
  })