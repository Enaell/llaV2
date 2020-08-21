import React from 'react'
import { Column } from '../../common/Flexbox'
import { Card, Typography, CardContent } from '@material-ui/core'

export const MemberCard = ({ name, description, children }: { name: string, description: string, children: any }) => {
  return (
    <Card>
      <CardContent>
        <Column>
          {children}
          <Typography>{name}</Typography>
          <Typography>{description}</Typography>
        </Column>
      </CardContent>
    </Card>
  )
}