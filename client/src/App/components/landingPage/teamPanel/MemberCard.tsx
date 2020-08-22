import React from 'react'
import { Column } from '../../common/Flexbox'
import { Card, Typography, CardContent, CardMedia } from '@material-ui/core'

export const MemberCard = ({ image, name, description }: { image: string, name: string, description: string }) => {
  return (
    <Card style={{width: '300px', paddingTop: '150px', marginTop: '150px'}}>
      <CardMedia style={{height: '300px', width: '304px', borderRadius: '50%', position: 'absolute', margin:'-300px 0 0 -2px', boxShadow:'0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)' }} image={image} />
      <CardContent>
        <Column>
          <Typography>{name}</Typography>
          <Typography>{description}</Typography>
        </Column>
      </CardContent>
    </Card>
  )
}