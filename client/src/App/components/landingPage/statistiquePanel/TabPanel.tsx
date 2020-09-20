import React from 'react';
import { makeStyles, Theme, CardMedia } from '@material-ui/core';
import { Row, Column } from '../../common/Flexbox';
import { LanguageType } from '../../common/types';
import frPict from '../ressources/Fr.jpg';
import enPict from '../ressources/En.jpg';
import cnPict from '../ressources/Cn.jpg';


type TabPanelProps = {
  language: LanguageType;
  index: any;
  value: any;
}

function getPicture(language: LanguageType) {
  switch (language) {
    case 'Fr':
      return frPict;
    case 'Cn':
      return cnPict;
    case 'En':
      return enPict;
    default:
      return frPict;
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
    maxWidth: '1200px',
    marginTop: '60px',
    zIndex: 2
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    filter: 'blur(20px)',
    backgroundSize: '100% 100%'
  },
  pictCard: {
    width: '100%',
    height: 0,
    paddingTop: '80% ',
    transition: 'opacity 500ms ease-in-out',
    opacity: 0
  },
  pictCardActive: {
    width: '100%',
    height: 0,
    paddingTop: '80% ',
    transition: 'opacity 500ms ease-in-out',
    opacity: 1
  }
}));


export const TabPanel = ({ language, value, index }: TabPanelProps) => {

  const classes = useStyles()

  return (
    <div
      role="tabpanel"
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
    >
      <Row width='100%'>
        <div hidden={value !== index} style={{width: '50%'}}>
          <CardMedia className={value === index ? classes.pictCardActive : classes.pictCard} image={getPicture(language)} />
       </div>
        {value === index && (
        <Column width='50%' height='100%'>
        </Column>)}
      </Row>
    </div>
  );
}
