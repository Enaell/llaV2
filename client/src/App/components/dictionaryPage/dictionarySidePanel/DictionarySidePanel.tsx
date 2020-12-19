import React from 'react';
import { WordCard, TranslationList } from '../../common/CardsComponents'
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
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
    top:'250px',
    width: 300,
    position: 'absolute' as "absolute",
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

    <Accordion expanded={openWordPreview} onChange={toggleWordPreview}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Word Preview</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ padding: '0' }}>
        <Column style={{ width: '100%' }}>
          <WordCard
            targetLanguage={'Cn'}
            style={{margin: '0 30px', overflow: 'initial'}} 
            word={word}
            align='left' 
            wordDetailAlign='center'
          />
          {/* <TranslationList word={word} language='Cn'/> */}
        </Column>    
      </AccordionDetails>
    </Accordion>
    <Accordion expanded={openSelectedWords} onChange={toggleSelectedWords}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Selected Words</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <SelectedWords wordList={selectedWords} handleWordPreview={setWordPreview} />
      </AccordionDetails>
    </Accordion>
  </Drawer>
  )
}

export default withStyles(styles, {withTheme: true })(DictionarySidePanel);