import React, { useEffect } from 'react';
import { Column, Row } from '../common/Flexbox';
import translate from 'counterpart';
import  { PageTitle }  from '../common/GenericComponents';
import DictionaryTabs from './tabs';
import DictionarySidePanel from './dictionarySidePanel';
import { withStyles } from '@material-ui/core/styles';
import { UserType } from '../common/types';

const styles = (theme: any) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 300,
  }
});


const DictionaryPage = ({ 
  user, 
  getAllWords, 
  openSidePanel, 
  classes
}: { user: UserType, getAllWords: (language: string, token: string | null) => void, openSidePanel: boolean, classes: any }) => {

  const contentShiftClasses = {
    [classes.contentShift]: openSidePanel,
  }

  useEffect(()=>{
    const token = user.id ? user.id : null;
    getAllWords('cn', token);
    },[]);

  return(
    <Column 
      style={{width: '100%', maxWidth: '1200px'}}
      horizontal='center'
      className={`${classes.content} ${contentShiftClasses}`}
    >
      <PageTitle title={translate('dictionaryPage.title')} ></PageTitle>
      <Row style={{width: '100%'}}>
        <DictionaryTabs />
        <DictionarySidePanel />
      </Row>
    </Column>
  );
}

export default withStyles(styles, {withTheme: true })(DictionaryPage);