import { LanguageType, ModuleUrlType, TranslationType } from './types';
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

export const moduleUrl: {[key in ModuleUrlType]: string} = {
    news: '/',
    fastExercice: '/cardTraining',
    wordOfTheDay: '/dictionary',
    manga: '/',
    culture: '/'
}

export const subjects= ['general', 'food', 'daily', 'house', 'number'];

export const visibilities= ['visitor', 'loggedin', 'owner'];

export function setWebSiteLanguage(language: LanguageType) {
    counterpart.setLocale(language)
}

export function translationsToString(translations: TranslationType[]) {
  let s = '';
  translations.forEach((translation, i, translations) => {
    if (Object.is(translations.length - 1, i))
      s += translation.name;
    else
      s += (translation.name + ', ');
  })
  return s;
}

export function renameObjectKey(keysMap: {[key: string]: string}, obj: {[key: string]: any}){
  return Object.keys(obj).reduce((acc, key) => ({
    ...acc,
    ... { [keysMap[key] || key]: obj[key]}
  }), {})
}