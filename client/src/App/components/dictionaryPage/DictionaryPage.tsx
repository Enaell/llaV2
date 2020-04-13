import React, { useEffect } from 'react';
import { Column, Row } from '../common/Flexbox';
import translate from 'counterpart';
import  { PageTitle }  from '../common/GenericComponents';
import DictionaryTabs from './tabs';
import DictionarySidePanel from './dictionarySidePanel';
import { withStyles } from '@material-ui/core/styles';
import { UserType, LanguageType, WordListType } from '../common/types';
import { Route } from 'react-router-dom';
import { WordListsPanel } from './wordListsPanel/WordListsPanel';

const styles = (theme: any) => ({
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: '100%',
    marginRight:0,
  },
  contentShift: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: '100%',
    marginLeft: -300,
  }
});


const DictionaryPage = ({ 
  user, 
  getAllWordLists,
  wordlists,
  openSidePanel, 
  classes
}: { user: UserType, getAllWordLists: (language: LanguageType | undefined, targetLanguage: LanguageType | undefined, token: string | undefined) => void, openSidePanel: boolean, classes: any, wordlists: WordListType[] }) => {

  const contentShiftClasses = {
    [classes.contentShift]: openSidePanel,
  }

  useEffect(()=>{
    const token = user && user.token ? user.token : undefined;
    // getAllWords(targetLanguage, token);
    getAllWordLists(user?.language, user.targetLanguage, user?.token)
    },[user.token]);

  return(
      // <Row horizontal={'center'} className={openSidePanel ? `${classes.contentShift}`: `${classes.content}`}>
      //   <DictionaryTabs />
      //   <DictionarySidePanel />
      // </Row>
      <Route
        key={'dictionary_wordlists'}
        path={'/dictionary/wordlists'}
        render={props => <WordListsPanel {...props} wordLists={wordlists}/>}
      />
      
    );
}

export default withStyles(styles, {withTheme: true })(DictionaryPage);