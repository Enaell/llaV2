import React from 'react';
import { Paper } from '@material-ui/core';
import { FeatureCard } from './FeatureCard';
import { Row } from '../../common/Flexbox';
import translate from 'counterpart';
import LayersOutlinedIcon from '@material-ui/icons/LayersOutlined';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ForumIcon from '@material-ui/icons/Forum';
import ShareIcon from '@material-ui/icons/Share';

const featCard = 'landingPage.featureCards';
const featNames = ['exercice', 'deck', 'news', 'culture', 'discuss', 'share']

const getFeatureCardIcon = (featureName: string) => {
  switch(featureName) {
    case 'exercice':
      return <CardTravelIcon color='primary' style={{fontSize: '3.1875rem'}} />
    case 'deck':
      return <LayersOutlinedIcon color='primary' style={{fontSize: '3.1875rem'}} />
    case 'news':
      return <LibraryBooksIcon color='primary' style={{fontSize: '3.1875rem'}} />
      case 'culture':
      return <MenuBookIcon color='primary' style={{fontSize: '3.1875rem'}} />
    case 'discuss':
      return <ForumIcon color='primary' style={{fontSize: '3.1875rem'}} />
    case 'share':
      return <ShareIcon color='primary' style={{fontSize: '3.1875rem'}} />
  }
} 

export const InformationPanel = () => {
  return (
      <Row wrap horizontal='space-around' style={{maxWidth: '1200px', paddingTop: '50px'}}>
        {featNames.map(fn => {
          console.log(`${featCard}.${fn}.title)`);
          return (
          <FeatureCard title={translate(`${featCard}.${fn}.title`)} text={translate(`${featCard}.${fn}.text`)}>
            {getFeatureCardIcon(fn)}
          </FeatureCard>
          )}
        )}
      </Row>
  );
}