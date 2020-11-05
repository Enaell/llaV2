import { LanguageType, ModuleUrlType, TranslationType, WordType } from './types';
import counterpart from 'counterpart';

import localeFr from '../../locale/fr.json';
import localeEn from '../../locale/en.json';
import localeCn from '../../locale/cn.json';

export const languages: LanguageType[] = ['Fr', 'En', 'Cn', 'Es', 'Ko', 'Jp', 'Ge']

export const fullNameLanguages: {[key in LanguageType]: string} = {
  Fr: "Francais",
  Cn: "中文",
  En: "English",
  Es: "Español",
  Ge: "Deutsch",
  Ko: "한국어",
  Jp: "日本語",
};

export const inputLanguage: {[key in LanguageType]: boolean} = {
  Fr: true,
  Cn: true,
  En: true,
  Es: false,
  Ge: false,
  Ko: false,
  Jp: false
};

export const fileLanguage: {[key in LanguageType]: any} = {
  Fr: localeFr,
  Cn: localeCn,
  En: localeEn,
  Es: undefined,
  Ge: undefined,
  Ko: undefined,
  Jp: undefined,
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

export const sections = [ 'information', 'stat', 'team', 'contact' ];

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
    ...{ [keysMap[key] || key]: obj[key]}
  }), {})
}

export function cleanTranslations(word: WordType){
  return {
    ...word,
    translations: word.translations.filter(t=> t && t.name).map(translation => ({
      ...translation,
      sentences: translation.sentences.filter(sentence => sentence.sentence && sentence.translatedSentence)
    }))
  } as WordType
}


export function arrayOfInt(startAt: number, size: number) {
  let array = [];
  for(let i = startAt; i < startAt + size; i++) {
    array.push(i);
  } 
  return array
}

export function shuffleArray<T>(array:T[]) {
  let newArray = [...array];
  for(let i = newArray.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * i)
    const temp = newArray[i]
    newArray[i] = newArray[j]
    newArray[j] = temp
  }

  return newArray;
}