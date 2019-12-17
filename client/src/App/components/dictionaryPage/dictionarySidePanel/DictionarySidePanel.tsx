import React from 'react';
import { WordCard, TranslationList } from '../../common/CardsComponents'
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { Column } from '../../common/Flexbox';
import { SelectedWords } from './SelectedWords';
import { WordType } from '../../common/types';

type DictionarySidePanelType = { 
  word: WordType,
  open: boolean,
  selectedWords: WordType[],
  toggleSidePanel: (event: any) => void,
  setWordPreview: (word: WordType) => void,
  openWordPreview: boolean,
  openSelectedWords: boolean,
  toggleSelectedWords: () => void,
  toggleWordPreview: () => void,
  classes: any,
  theme: any 
}

const styles = (theme: any) => ({
  drawer: {
    flexShrink: 0,
  },
  drawerPaper: {
    top:'70px',
    width: 300,
    paddingBottom: '70px'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
});

const DictionarySidePanel = ({ 
  word,
  open,
  selectedWords,
  toggleSidePanel,
  setWordPreview,
  openWordPreview,
  openSelectedWords,
  toggleSelectedWords,
  toggleWordPreview,
  classes,
  theme
} : DictionarySidePanelType) => {
  
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
    <div className={classes.drawerHeader}>
      <IconButton onClick={toggleSidePanel}>
        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </div>

    <ExpansionPanel expanded={openWordPreview} onChange={toggleWordPreview}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Word Preview</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{ padding: '0' }}>
        <Column style={{ width: '100%' }}>
          <WordCard
            style={{margin: '0 30px', overflow: 'initial'}} 
            word={word}
            align='left' 
            wordDetailAlign='center'
          />
          <TranslationList word={word}/>
        </Column>    
      </ExpansionPanelDetails>
    </ExpansionPanel>
    <ExpansionPanel expanded={openSelectedWords} onChange={toggleSelectedWords}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Selected Words</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <SelectedWords wordList={selectedWords} handleWordPreview={setWordPreview} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  </Drawer>
  )
}

export default withStyles(styles, {withTheme: true })(DictionarySidePanel);