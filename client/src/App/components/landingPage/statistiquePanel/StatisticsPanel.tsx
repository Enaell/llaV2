import React from 'react';
import { Column, Row } from '../../common/Flexbox';
import { Box, Typography, Theme, makeStyles, AppBar, Tabs, Tab, CardMedia, Card, CardContent } from '@material-ui/core';
import { LanguageType } from '../../common/types';
import { languages } from '../../common/utils';

import frPict from '../ressources/Fr.jpg';
import enPict from '../ressources/En.jpg';
import cnPict from '../ressources/Cn.jpg';

type TabPanelProps = {
  children?: React.ReactNode;
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

function a11yProps(language: LanguageType) {
  return {
    id: `scrollable-auto-tab-${language}`,
    'aria-controls': `scrollable-auto-tabpanel-${language}`,
  };
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
  }
}));

const TabPanel = ({ children, value, index }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
    >
      {value === index && (
        <Card>
          <Row width='100%'>
            {children}
            <Column width='50%' height='100%'>

            </Column>
          </Row>
        </Card>
      )}
    </div>
  );
}

export const StatisticsPanel = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      {/* <div className={classes.background} style={{backgroundImage: `url(${getPicture(languages[value])})`}} /> */}
      <Column className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {languages.map(language => <Tab key={language} label={language} {...a11yProps(language)} />)}          
          </Tabs>
        </AppBar>
        {languages.map((language, index) =>  <TabPanel key={language} value={value} index={index}>
          <CardMedia style={{width: '50%', height: 0, paddingTop: '40% '}} image={getPicture(language)} />
        </TabPanel>)}

      </Column>
    </>
  );
}
