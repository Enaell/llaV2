import React, { useEffect } from 'react';
import { Column, Row } from '../common/Flexbox';
import translate from 'counterpart';
import  { PageTitle }  from '../common/GenericComponents';
import DictionaryTabs from './tabs';
import DictionarySidePanel from './dictionarySidePanel';
import { withStyles } from '@material-ui/core/styles';
import { UserType, LanguageType } from '../common/types';

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
  getAllWords, 
  openSidePanel, 
  classes
}: { user: UserType, getAllWords: (language: LanguageType | undefined, token: string | undefined) => void, openSidePanel: boolean, classes: any }) => {

  const contentShiftClasses = {
    [classes.contentShift]: openSidePanel,
  }

  useEffect(()=>{
    const token = user && user.token ? user.token : undefined;
    const targetLanguage = user && user.targetLanguage ? user.targetLanguage : undefined; 
    getAllWords(targetLanguage, token);
    },[]);

  return(
      <Row horizontal={'center'} className={openSidePanel ? `${classes.contentShift}`: `${classes.content}`}>
        <DictionaryTabs />
        <DictionarySidePanel />
      </Row>
  );
}

export default withStyles(styles, {withTheme: true })(DictionaryPage);