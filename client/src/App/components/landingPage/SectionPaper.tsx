import React, { useState } from 'react';
import { InformationPanel } from './informationPanel/InformationPanel';
import { TeamPanel } from './teamPanel/TeamPanel';
import { ContactPanel } from './contactPanel/ContactPanel';
import { Typography, withStyles, Theme } from '@material-ui/core';
import translate from 'counterpart';
import { Column } from '../common/Flexbox';
import { useSelector } from 'react-redux';

function sectionColor(sectionName: string, theme: Theme) {
  switch (sectionName) {
    case 'contact': 
      return {
        background: 'backgroundPrimary' as 'backgroundPrimary' | 'backgroundSecondary',
        color: 'textSecondary' as 'textSecondary' | 'textPrimary'
      };
    default:
      return {
        background: 'backgroundSecondary' as 'backgroundPrimary' | 'backgroundSecondary',
        color: 'textPrimary' as 'textSecondary' | 'textPrimary'
      }
  }
}

const Section = ({sectionName}: {sectionName: string}) => {
  switch (sectionName) {
    case 'information':
      return <InformationPanel />
    case 'stat':
      return <div />
    case 'team':
      return <TeamPanel />
    case 'contact':
      return <ContactPanel />
    default:
      return <div />
  }
}

export const SectionPaper = withStyles(theme => ({
  backgroundPrimary: {
    backgroundColor: theme.palette.primary.main,
    padding: '50px 0 50px 0',
    margin: '30px 0 0 0'
  },
  backgroundSecondary: {
    backgroundColor: 'inherit',
    padding: '50px 0 50px 0'
  },
  textSecondary: {
    color: theme.palette.secondary.main,
    textTransform: 'capitalize',
    margin: '20px 0 20px 0',
    '&:after': {
      display:'block',
      content: '""',
      borderBottom: `solid 3px ${theme.palette.secondary.main}`,  
    },
  },
  textPrimary: {
    color: theme.palette.primary.main,
    textTransform: 'capitalize',
    margin: '20px 0 20px 0',
    '&:after': {
      display:'block',
      content: '""',
      borderBottom: `solid 3px ${theme.palette.primary.main}`,  
    },
  }
})) (({ sectionName, classes }: { 
  sectionName: string,
  classes: {
    backgroundPrimary: string,
    backgroundSecondary: string,
    textPrimary: string,
    textSecondary: string
  }
}) => {

  const theme = useSelector((state: any) => state.theme);
  const bgColor = sectionColor(sectionName, theme).background;
  const textColor = sectionColor(sectionName, theme).color;

  return (
    <Column className={classes[bgColor]} width='100%' horizontal='center' >
      <Typography className={classes[textColor]} variant="h3"  >
        {translate(`landingPage.sections.${sectionName}`)}
      </Typography>
      <Section sectionName={sectionName}/>
    </Column>
  )
})