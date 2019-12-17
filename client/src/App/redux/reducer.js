import {shuffle, sample} from 'underscore';
import theme from '../theme';
import { combineReducers } from 'redux'




let initialState = {
  theme: theme
};

// general

const setTheme = (state, theme) => ({ ...state, theme});

const initialThemeState = {theme};

const themeReducer = (state = initialThemeState, action) => {
  switch (action.type){
    case 'SET_THEME':
      return setTheme(state, action.payload);
    default: 
      return state;
  }
} 

// user
const login = (state, user) => ({ ...state, user });

const logout = (state) => ({ ...state, user: {} });

const logState = (state) => {
  console.log(state)
  return state
}

const initialUserState = {};

const userReducer = (state = initialUserState, action) => {
  switch (action.type){
    case 'LOGIN':
      return login(state, action.payload);
    case 'LOGOUT':
      return logout(state);
    case 'LOG_STATE':
      return logState(state);
    default: 
      return state;
  }
} 

// dictionary

const getWords = (state, wordList) => ({...state, words: wordList.sort((a, b) => {return a.globalName > b.globalName;}) || [] })

const openSidePanel = (state) => ({ ...state, openSidePanel: true });

const toggleSidePanel = (state) => ({ ...state, openSidePanel: !openSidePanel });

const updateSelectedWords = (state, word) => {
  const selectedWords = [...state.selectedWords];
  const currentIndex = selectedWords.indexOf(word);
  if (currentIndex === -1) {

    selectedWords.push(word);
  } else {
    selectedWords.splice(currentIndex, 1);
  }
return ({ ...state, selectedWords});
}

const cleanSelectedWords = state => ({ ...state, selectedWords: [] });

const toggleSelectedWords = state => ({ ...state,  openSelectedWords: !state.openSelectedWords})

const setWordPreview = (state, word) => ({ ...state, wordPreview: word });

const openWordPreview = state => ({ ...state, openWordPreview: true });

const toggleWordPreview = state => ({ ...state, openWordPreview: !state.openWordPreview });

const initialDictionaryState = {
  words: [],
  selectedWords: [],
  wordPreview: {},
  openSidePanel: false,
  openSelectedWords: false,
  openWordPreview: false,
  selectedWordsSwitchChecked: false
}

const dictionaryReducer = (state = initialDictionaryState, action) => {
  switch (action.type) {
    case 'GET_WORDS':
      return getWords(state, action.payload);
    case 'OPEN_SIDE_PANEL':
      return openSidePanel(state);
    case 'TOGGLE_SIDE_PANEL':
      return toggleSidePanel(state);
    case 'UPDATE_SELECTED_WORDS':
      console.log('reducer update selcted words : ')
      console.log(action.payload)
      return updateSelectedWords(state, action.payload);
    case 'CLEAN_SELECTED_WORDS':
      return cleanSelectedWords(state);
    case 'TOGGLE_SELECTED_WORDS':
      return toggleSelectedWords(state)
    case 'SET_WORD_PREVIEW':
      return setWordPreview(state, action.payload)
    case 'OPEN_WORD_PREVIEW':
      return openWordPreview(state);
    case 'TOGGLE_WORD_PREVIEW':
      return toggleWordPreview(state);
    default: 
      return state;

  }
}

// login modal

const toggleLoginModal = state => ({ ...state, open: !state.open });

const changeLoginModalTab = (state, tabNumber) => ({ ...state, tab: tabNumber });

const initialLoginModalState = {
  open: false,
  tab: 0,
}

const loginModalReducer = (state = initialLoginModalState, action) => {
  switch (action.type) {
    case 'TOGGLE_LOGIN_MODAL':
      return toggleLoginModal(state);
    case 'CHANGE_LOGIN_MODAL_TAB':
      return changeLoginModalTab(state, action.payload);
    default: 
      return state;
  }
}

// nav snackbar

const toggleNavSnackbar = state => ({ ...state, open: !state.open });

const setnavSnackbar = (state, variant, message) => ({ ...state, variant, message });

const initialNavSnackbarState = {
  open: false,
  variant: 'success',
  message: 'Success !'
}

const navSnackbarReducer = (state = initialNavSnackbarState, action) => {
  switch (action.type) {
    case 'TOGGLE_NAV_SNACKBAR':
      return toggleNavSnackbar(state);
    case 'SET_NAV_SNACKBAR':
      return setnavSnackbar(state, action.payload.variant, action.payload.message);
    default: 
      return state;
  }
}

// exercice

function getTurnData(cards){
  const allTranslations = cards.reduce(function(p,c,i){
    return p.concat(c.translations);
  }, []);
  const fourRandomTranslations = shuffle(allTranslations).slice(0, 4);
  const answer = sample(fourRandomTranslations);

  return {
    card: cards.find((card) =>
      card.translations.some((translation) =>
        translation === answer)
    ),
    translations: fourRandomTranslations
  }
}

const answerSelected = (state, answer) => ({ ...state, highlight: state.card.translations.some((tr) => tr === answer) ? 'correct' : 'wrong' });

const exerciceContinue = (state, turnData) => ({ ...state, highlight: '', turnData: getTurnData(state.cards) });

const addCard = (state, card) => ({ ...state, cards: state.cards.concat([card]) });


const initialExerciceState = {};

const exerciceReducer = (state = initialExerciceState, action) => {
  switch (action.type) {
    case 'ANSWER_SELECTED':
      return answerSelected(state, action.payload);
    case 'CONTINUE':
      return exerciceContinue(state, action.payload);
    case 'ADD_CARD':
      return addCard(state, action.payload)
    default: 
      return state;
  }
}



const reducer = combineReducers({
  user: userReducer,
  dictionary: dictionaryReducer,
  loginModal: loginModalReducer,
  navSnackBar: navSnackbarReducer,
  exercice: exerciceReducer,
  theme: themeReducer
})

export default reducer;