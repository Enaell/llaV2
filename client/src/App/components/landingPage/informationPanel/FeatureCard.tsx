import React from 'react';
import { Card, Typography, CardContent } from '@material-ui/core';
import { Column } from '../../common/Flexbox';

export const FeatureCard = ({title, text, children}: {title: string, text: string, children: any}) => {
  return (
    <Card style={{width: '350px', margin: '20px'}} variant='elevation'>
      <Column width='100%' horizontal='center'>
        <CardContent style={{width: '280px'}}>
          <Column horizontal='center'>
            {children}
            <Typography variant='h6' color='textPrimary' align='center' style={{marginTop: '15px'}}> { title } </Typography>
          </Column>
          <Column horizontal='center' style={{paddingTop: '20px'}}>
            <Typography variant='body2' align='justify' >{ text }</Typography>
          </Column>
        </CardContent>
      </Column>
    </Card>
  )
}