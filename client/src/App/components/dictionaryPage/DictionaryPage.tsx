import React from 'react';
import { Column, Row } from '../common/Flexbox';
import translate from 'counterpart';
import  { PageTitle }  from '../common/GenericComponents';
import DictionaryTabs from './tabs';
import DictionarySidePanel from './dictionarySidePanel';
import { withStyles } from '@material-ui/core/styles';
import { UserType, LanguageType, WordListType, WordType } from '../common/types';
import { Route } from 'react-router-dom';
import { WordListsPanel } from './wordListsPanel/WordListsPanel';
import { DictionaryPanel } from './dictionaryPanel/DictionaryPanel';

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
  openSidePanel, 
  classes,
  setNewWords,
  setNewWordLists
}: { 
  user: UserType,
  openSidePanel: boolean,
  classes: any,
  setNewWords: (newWords: {[key: string]: WordType}) => void,
  setNewWordLists: (newWordLists: {[key: string]: WordListType}) => void
}) => {

  const contentShiftClasses = {
    [classes.contentShift]: openSidePanel,
  }

  // useEffect(()=>{
  //   const token = user && user.token ? user.token : undefined;
  //   // getAllWords(targetLanguage, token);
  //   getAllWordLists(user?.language, user.targetLanguage, user?.token)
  //   },[user.token]);

  return(
      // <Row horizontal={'center'} className={openSidePanel ? `${classes.contentShift}`: `${classes.content}`}>
      //   <DictionaryTabs />
      //   <DictionarySidePanel />
      // </Row>
      <Row horizontal='center'>
        <Route
          key={'dictionary_wordlists'}
          path={'/dictionary/wordlists'}
          render={props => <WordListsPanel {...props} user={user} setNewWords={setNewWords} setNewWordLists={setNewWordLists}/>}
        />
        <Route
          key={'dictionary'}
          path={'/dictionary/words'}
          render={ props => <DictionaryPanel {...props} user={user} />}
        />
      </Row>
    );
}

export default withStyles(styles, {withTheme: true })(DictionaryPage);