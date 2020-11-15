import React from 'react';
import { Box } from '@material-ui/core';
import { Column } from '../../common/Flexbox';
import { LanguageType } from '../../common/types';
import { useStatBalls } from './statisticHooks';

const StatBall = ({ size, top, left, title, value, color }: {
  size: string, top: string, left: string, title: string, value: number, color: string 
}) => {
  return (
    <Column
      horizontal='center'
      vertical='center'
      width={size}
      height={size}
      style={{ 
        borderRadius: '50%',
        backgroundColor: color,
        position: 'absolute',
        marginTop: top,
        marginLeft: left
      }}>
        { title }
        { value }
      </Column>
  )
};

export const StatBalls = ({language}: {language: LanguageType}) => {

  const balls = useStatBalls(language);

  return (
    <Box width={`600px`} height={`480px`}>
      {balls.map((ball) => (
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
    </Box>
  );
}