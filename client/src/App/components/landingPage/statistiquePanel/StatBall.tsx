import React from 'react';
import { Column } from '../../common/Flexbox';

export const StatBall = ({ size, top, left, title, value, color }: {
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
}