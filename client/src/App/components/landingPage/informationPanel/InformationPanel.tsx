import React from 'react';
import { Paper } from '@material-ui/core';
import { FeatureCard } from './FeatureCard';
import { Row } from '../../common/Flexbox';
import translate from 'counterpart';

const featNames = ['exercice', 'deck', 'news', 'culture', 'discuss', 'share']


export const InformationPanel = () => {
  return (
      <Row wrap horizontal='space-around' style={{maxWidth: '1200px', paddingTop: '50px'}}>
        {featNames.map(fn => {
          return (
          <FeatureCard name={fn}/>
          )}
        )}
      </Row>
  );
}