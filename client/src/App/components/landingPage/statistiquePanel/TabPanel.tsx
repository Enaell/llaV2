import React, { useState } from 'react';
import { makeStyles, Theme, CardMedia, Box } from '@material-ui/core';
import { Row, Column } from '../../common/Flexbox';
import { LanguageType, MetricName } from '../../common/types';
import frPict from '../ressources/Fr.jpg';
import enPict from '../ressources/En.jpg';
import cnPict from '../ressources/Cn.jpg';
import { shuffleArray } from '../../common/utils';
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

function statBallSize(title: MetricName, value: number) {
  const maxRatio = {
    wordNumber: 500,
    deckNumber: 100,
    natives: 10,
    learners: 5,
    cultureArticles: 5,
  }
  const ratio = Math.min(value / maxRatio[title], 1);

  const size = ballMaxSize * ratio;

  return size > ballMinSize ? size : ballMinSize;
}

function plusOrMinus(){
  return Math.random() >  0.5 ? 1 : -1;
}

function shapePadding(balls: Ball[], width: number, height: number){

  const border = balls.reduce((acc, ball) => {
    const min = {
      x: acc.min.x < ball.pos.left ? acc.min.x : ball.pos.left,
      y: acc.min.y < ball.pos.top ? acc.min.y : ball.pos.top
    };
    const max = {
      x: acc.max.x > (ball.pos.left + ball.size) ? acc.max.x : ball.pos.left + ball.size,
      y: acc.max.y > (ball.pos.top + ball.size) ? acc.max.y : ball.pos.top + ball.size
    }
    console.log(max);
    return {min, max};
  }, {min: {x: 0, y: 0}, max: {x: 0, y: 0}});

  return {
    left: (width - (border.max.x - border.min.x)) / 2 - border.min.x,
    top: (height - (border.max.y - border.min.y)) / 2 - border.min.y
  }
}

function getGap( minGap: number, maxGap: number){
  if (maxGap < minGap)
    maxGap = minGap;
  const radius = maxGap > minGap ? Math.random() * (maxGap - minGap) + minGap : minGap
  const x =  Math.random()  * radius * plusOrMinus();
  const y = Math.sqrt(radius * radius - x * x) * plusOrMinus();

  return {left : x, top: y}
}

function statBallPosition(index: number, ballsByColumn: number, ballsByRow: number, ballMaxSize: number) {
  const top = (ballMaxSize * (index % ballsByRow)) + (((Math.random() - 0.5) * ballMaxSize) / 4);
  const left = (ballMaxSize * Math.floor(index / (ballsByColumn))) + (((Math.random() - 0.5) * ballMaxSize) / 4);
 return {
   left: `${left}px`,
   top: `${top}px`
   // top: `${ballMaxSize * ((Math.random() - 0.5) / 4 + (index % ballsByRow))}px`,
   // left: `${ballMaxSize * ((Math.random() - 0.5) / 4 + Math.floor(index / ballsByColumn))}px`,
 }
}

type Circle = {
  x: number;
  y: number;
  radius: number;
}

type Ball = {
  size: number;
  radius: number;
  center: {
    x: number,
    y: number
  }
  pos: {
    top: number;
    left: number;
  }
  gap: {
    left: number;
    top: number;
  };
  title: MetricName;
  value: number;
  color: string;
}

function ballIntersections(c1: Circle,c2: Circle) // c = [abscisse,ordonnée,rayon]
{
    if (c1.y === c2.y) // Pythagore
    {
        const distance = Math.abs(c1.x - c2.x);
        const x = (Math.pow(c2.radius, 2)-Math.pow(distance,2)-Math.pow(c1.radius, 2))/(-2 * distance);
        const y = Math.sqrt(Math.pow(c2.radius,2)-Math.pow(distance - x, 2));
        return [{x, y}, {x, y: - y}]
    }

    const a = (Math.pow(c2.x, 2) + Math.pow(c2.y, 2) - Math.pow(c2.radius, 2) - Math.pow(c1.x, 2) - Math.pow(c1.y, 2) + Math.pow(c1.radius,2)) / (2 * (c2.y - c1.y));
    const d = (c2.x - c1.x) / (c2.y - c1.y);
    const A = Math.pow(d, 2) + 1;
    const B = -2 * c1.x + 2 * c1.y * d - 2 * a * d;
    const C = Math.pow(c1.x, 2) + Math.pow(c1.y, 2) - 2 * c1.y * a + Math.pow(a,2) - Math.pow(c1.radius,2);
    const delta = Math.pow(B, 2) - 4 * A * C;
    const x1 = (Math.sqrt(delta) - B) / (2 * A);
    const x2 = (-Math.sqrt(delta) - B) / (2 * A);
    const y1 = a - ((Math.sqrt(delta) -B) / ( 2 * A )) * d;
    const y2 = a - ((-Math.sqrt(delta) -B) / (2 * A)) * d;
    
    return [{x: x1, y: y1}, {x: x2, y: y2}]; // coordonnées des deux points d'intersection [abscisse,ordonnée] (nb : seront identiques si les cercles ne se touchent qu'en un seul point)
}

function computeBalls(initialBalls: Ball[], balls: { value: number;  title: MetricName; color: string;}[]){

  let computedBalls = [...initialBalls]

  balls.forEach((ball, index) => {
    const bRadius =  statBallSize(ball.title, ball.value) / 2;

    const b3Center = ballIntersections({
      x: computedBalls[index].pos.left + computedBalls[index].radius,
      y: computedBalls[index].pos.top + computedBalls[index].radius,
      radius: bRadius + computedBalls[index].radius
    },
    {
      x: computedBalls[index + 1].pos.left + computedBalls[index + 1].radius,
      y: computedBalls[index + 1].pos.top + computedBalls[index + 1].radius,
      radius: bRadius + computedBalls[index + 1].radius
    })[0]
  
    computedBalls = [...computedBalls, {
      size: bRadius * 2,
      radius: bRadius,
      center: {...b3Center},
      pos: {
        left: b3Center.x - bRadius,
        top: b3Center.y - bRadius,
      },
      gap: getGap(10, 25),
      title: ball.title,
      value: ball.value,
      color: ball.color
    }]
  })

  return computedBalls;
}

function generateBalls(balls: { value: number;  title: MetricName; color: string;}[]) {

  const shuffledBalls = shuffleArray(balls);

  const b1Radius = statBallSize(shuffledBalls[0].title, shuffledBalls[0].value) /2;
  const firstBall: Ball = {
    size: b1Radius * 2,
    radius: b1Radius,
    pos: {
      left: 0,
      top: 0
    },
    center: {
      x: b1Radius,
      y: b1Radius,
    },
    gap: {
      ...getGap(0, 0)
    },
    title: shuffledBalls[0].title,
    value: shuffledBalls[0].value,
    color: shuffledBalls[0].color
  };

  const b2Radius = statBallSize(shuffledBalls[1].title, shuffledBalls[1].value) / 2;
  const b2CenterX = Math.random() * (firstBall.radius + b2Radius) * plusOrMinus();
  const b2CenterY = Math.sqrt(Math.pow(b1Radius + b2Radius, 2) - Math.pow(b2CenterX, 2)) * plusOrMinus();

  const secondBall: Ball = { 
    size: b2Radius * 2,
    radius: b2Radius,
    center: {
      x: firstBall.center.x + b2CenterX,
      y: firstBall.center.y + b2CenterY
    },
    pos: {
      left: firstBall.center.x + b2CenterX - b2Radius,
      top: firstBall.center.y + b2CenterY - b2Radius
    },
    gap: getGap(10, 25),
    title: shuffledBalls[1].title,
    value: shuffledBalls[1].value,
    color: shuffledBalls[1].color
  }

  return computeBalls([firstBall, secondBall], shuffledBalls.slice(2));
}

const panelWidth = 600;
const panelHeight = 480;
const ballMaxSize = 250;
const ballMinSize = 100;

const StatBalls = ({balls}: {balls: {value: number, title: MetricName, color: string }[]}) => {

  const computedBalls = generateBalls(balls);

  const padding = shapePadding(computedBalls, panelWidth, panelHeight);

  return (
    <>
      {computedBalls.map((ball) => (
        <StatBall 
          key={ball.title}
          size={`${ball.size}px`}
          top={`${ball.pos.top + ball.gap.top + padding.top}px`}
          left={`${ball.pos.left + ball.gap.left + padding.left}px`}
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
