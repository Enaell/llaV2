import React, { useState } from 'react';
import { makeStyles, Theme, CardMedia, Box } from '@material-ui/core';
import { Row, Column } from '../../common/Flexbox';
import { LanguageType, MetricName } from '../../common/types';
import frPict from '../ressources/Fr.jpg';
import enPict from '../ressources/En.jpg';
import cnPict from '../ressources/Cn.jpg';
import { arrayOfInt, shuffleArray } from '../../common/utils';
import { StatBall } from './StatBall';


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


// function statBallSize(title: MetricName, value: number) {
//   const maxRatio = {
//     wordNumber: 500,
//     deckNumber: 100,
//     natives: 10,
//     learners: 10,
//     cultureArticles: 5,
//   }
//   const ratio = Math.min(value / maxRatio[title], 1);

//   return `${ballMaxSize * ratio}px`;
// }

// function statBallPosition(index: number, ballsByColumn: number, ballsByRow: number, ballMaxSize: number) {
//    const top = (ballMaxSize * (index % ballsByRow)) + (((Math.random() - 0.5) * ballMaxSize) / 4);
//    const left = (ballMaxSize * Math.floor(index / (ballsByColumn))) + (((Math.random() - 0.5) * ballMaxSize) / 4);
//   return {
//     top: `${top}px`,
//     left: `${left}px`
//     // top: `${ballMaxSize * ((Math.random() - 0.5) / 4 + (index % ballsByRow))}px`,
//     // left: `${ballMaxSize * ((Math.random() - 0.5) / 4 + Math.floor(index / ballsByColumn))}px`,
//   }
// }

function statBallSize(title: MetricName, value: number) {
  const maxRatio = {
    wordNumber: 500,
    deckNumber: 100,
    natives: 10,
    learners: 10,
    cultureArticles: 5,
  }
  const ratio = Math.min(value / maxRatio[title], 1);

  return ballMaxSize * ratio
}

function getGap(radius: number, minGap: number){
  const gap = (Math.random() - 0.5) * radius;
  return gap + (gap > 0 ? 1 : -1) * minGap
}

function statBallPosition(index: number, ballsByColumn: number, ballsByRow: number, ballMaxSize: number) {
  const top = (ballMaxSize * (index % ballsByRow)) + (((Math.random() - 0.5) * ballMaxSize) / 4);
  const left = (ballMaxSize * Math.floor(index / (ballsByColumn))) + (((Math.random() - 0.5) * ballMaxSize) / 4);
 return {
   top: `${top}px`,
   left: `${left}px`
   // top: `${ballMaxSize * ((Math.random() - 0.5) / 4 + (index % ballsByRow))}px`,
   // left: `${ballMaxSize * ((Math.random() - 0.5) / 4 + Math.floor(index / ballsByColumn))}px`,
 }
}

const statColumnNumber = 3;
const statRowNumber = 2;
const ballMaxSize = 250;

const StatBalls = ({balls}: {balls: {value: number, title: MetricName, color: string }[]}) => {
  console.log('enter statballs')
  const pos = shuffleArray(arrayOfInt(1, statColumnNumber * statRowNumber))
    .slice(0, Math.min(balls.length, statColumnNumber * statRowNumber));
console.log(pos);
  // const computedBalls = balls.map((ball, index) => {
  //   const b1Size = statBallSize(ball.title, ball.value);
  //   const { top, left } = statBallPosition(pos[index], statColumnNumber, statRowNumber, ballMaxSize);
  //   return {
  //     size: b1Size,
  //     top,
  //     left,
  //     title: ball.title,
  //     value: ball.value,
  //     color: ball.color
  //   }
  // });

  const b1Size = statBallSize(balls[0].title, balls[0].value);
  const b1Radius = b1Size /2;
  const b1TopGap = getGap(b1Radius, 50);
  const b1LeftGap = (Math.random() - 0.5) * b1Radius;
  const firstBall = {
    size: b1Size,
    top: 240 - b1Radius + b1TopGap,
    left: 300 - b1Size / 2 + b1LeftGap,
    title: balls[0].title,
    value: balls[0].value,
    color: balls[0].color
  };

  const b2DirectionTop = b1TopGap > 0 ? -1 : 1;
  const b2DirectionLeft = b1LeftGap > 0 ? -1 : 1;

  const b1PointX = (Math.random() * b1Size / 2) * b2DirectionLeft;
  const b1PointY = (Math.sqrt(b1Radius * b1Radius - b1PointX * b1PointX)) * b2DirectionTop;

  const b2Size = statBallSize(balls[1].title, balls[1].value);
  const b2Radius = b2Size / 2;

  const ratio = b2Size / b1Size;

  const b2Gap = getGap(b2Radius, 0);

  const b2XPos = (b1PointX + b2Gap) * ratio + b1PointX - b2Radius; 
  const b2YPos = (b1PointY + b2Gap) * ratio + b1PointY - b2Radius;


  const secondBall = { 
    size: b2Size,
    top: firstBall.top + b1Radius + b2YPos,
    left: firstBall.left + b1Radius + b2XPos,
    title: balls[1].title,
    value: balls[1].value,
    color: balls[1].color
  }

  const computedBalls = [firstBall, secondBall]

  console.log(computedBalls);
  return (
    <>
      {computedBalls.map((ball) =><StatBall key={ball.title} size={`${ball.size}px`} top={`${ball.top}px`} left={`${ball.left}px`} title={ball.title} value={ball.value} color={ball.color} />)}
    </>
  )
}

export const TabPanel = ({ language, value, index }: TabPanelProps) => {
console.log('coucous')
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
        color: '#1e42a78f'
      },
      {
        value: 60,
        title: 'deckNumber' as MetricName,
        color: '#1e42a78f'
      },
      {
        value: 20,
        title: 'natives' as MetricName,
        color: '#1e42a78f'
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
            {/* <Column horizontal='center' vertical='center' width='200px' height='200px' style={{borderRadius: '50%', backgroundColor: '#1e42a78f', position: 'absolute', marginTop: '50px', marginLeft: '50px'}}> COUCOU </Column>
            <Column horizontal='center' vertical='center' width='200px' height='200px' style={{borderRadius: '50%', backgroundColor: '#60a71e8f', position: 'absolute', marginTop: '200px', marginLeft: '130px'}}> COUCOU </Column>
            <Column horizontal='center' vertical='center' width='200px' height='200px' style={{borderRadius: '50%', backgroundColor: '#a71e448f', position: 'absolute', marginTop: '350px', marginLeft: '300px'}}> COUCOU </Column>
            <Column horizontal='center' vertical='center' width='200px' height='200px' style={{borderRadius: '50%', backgroundColor: '#1ea7818f', position: 'absolute', marginTop: '120px', marginLeft: '400px'}}> COUCOU </Column> */}
          </Box>
        </Column>)}
      </Row>
    </div>
  );
}
