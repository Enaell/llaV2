import { LanguageType } from './types';
import counterpart from 'counterpart';

import localeFr from '../../locale/fr.json';
import localeEn from '../../locale/en.json';
import localeCn from '../../locale/cn.json';

export const fullNameLanguages: {[key in LanguageType | string]: string} = {
    Fr: "Francais",
    En: "English",
    Cn: "中文"
};

export const fileLanguage: {[key in LanguageType]: any} = {
    Fr: localeFr,
    En: localeEn,
    Cn: localeCn
}


export const setWebSiteLanguage = (language: LanguageType) => {
    counterpart.setLocale(language)
}