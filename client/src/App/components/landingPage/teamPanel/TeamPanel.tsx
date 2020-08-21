import React from 'react'
import { Row } from '../../common/Flexbox'
import { MemberCard } from './MemberCard'
import { CardMedia } from '@material-ui/core'

import totoroPict from './ressources/totoro.jpg'
import kikiPict from './ressources/kiki.png'

export const TeamPanel = () => {
  return (
    <Row wrap horizontal='space-around' style={{maxWidth: '1200px', paddingTop: '50px'}}>
      <MemberCard name='Aurelien Martin' description='qwertgfd sfasdfasdf asfd alskdf nasf sa;d f' >
        <CardMedia style={{height: '300px', width: '300px', borderRadius: '50%' }} image={totoroPict} />
      </MemberCard>
      <MemberCard name='Aurelien Martin' description='qwertgfd sfasdfasdf asfd alskdf nasf sa;d f' >
        <CardMedia style={{height: '300px', width: '300px', borderRadius: '50%' }} image={kikiPict} />
      </MemberCard>
    </Row>
  )
} 