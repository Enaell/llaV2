import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, CardMedia, Box } from '@material-ui/core';
import { Row, Column } from '../../common/Flexbox';
import { LanguageType, MetricName } from '../../common/types';
import frPict from '../ressources/Fr.jpg';
import enPict from '../ressources/En.jpg';
import cnPict from '../ressources/Cn.jpg';
import { shuffleArray, plusOrMinus } from '../../common/utils';
import { StatBall } from './StatBall';
import { useStatBalls } from './statisticHooks';


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

const StatBalls = ({balls}: {balls: {value: number, title: MetricName, color: string }[]}) => {

  const shappedBalls = useStatBalls(balls);

  return (
    <>
      {shappedBalls.map((ball) => (
        <StatBall 
          key={ball.title}
          size={`${ball.size}px`}
          top={`${ball.pos.top + ball.gap.top}px`}
          left={`${ball.pos.left + ball.gap.left}px`}
          title={ball.title}
          value={ball.value}
          color={ball.color}
        />
      ))}
    </>
  )
}

export const TabPanel = ({ language, value, index }: TabPanelProps) => {
  const classes = useStyles()
  const [statballs, setStatballs] = useState(
    [
      {
        value: 558,
        title: 'wordNumber' as MetricName,
        color: '#1e42a78f'
      },
      {
        value: 3,
        title: 'cultureArticles' as MetricName,
        color: '#1e9aa78f'
      },
      {
        value: 2,
        title: 'learners' as MetricName,
        color: '#b423348f'
      },
      {
        value: 60,
        title: 'deckNumber' as MetricName,
        color: '#72a71e8f'
      },
      {
        value: 20,
        title: 'natives' as MetricName,
        color: '#a75d1e8f'
      },
    ]
  )

  return (
    <div
      role="tabpanel"
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
    >
      <Row width='100%'>
        <Box hidden={value !== index} style={{width: '50%'}}>
          <CardMedia className={value === index ? classes.pictCardActive : classes.pictCard} image={getPicture(language)} />
       </Box>
        {value === index && (
        <Column horizontal='center' vertical='center' width='50%'>
          <Box width={`100%`} height={`100%`}>
            <StatBalls balls={statballs} />
          </Box>
        </Column>)}
      </Row>
    </div>
  );
}
