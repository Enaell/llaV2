import React from 'react'
import { Row, Column } from '../../common/Flexbox'
import { TextField } from '@material-ui/core';
import translate from 'counterpart';
import { WhiteButton } from '../../common/GenericComponents';
import { useSelector } from 'react-redux';

export const ContactPanel = () => {

  const theme = useSelector((state: any) => state.theme);

  return (
    <Row wrap horizontal='space-around' width='100%' style={ { padding: '50px 0 50px 0', backgroundColor: theme.palette.primary.main } }>
      <Column vertical={'space-between'} horizontal={'center'} style={{minWidth: '75%', maxWidth: '1200px', padding: '20px', backgroundColor: 'white', borderRadius: '30px'}}>
        <Column>
          <TextField
            required
            margin="dense"
            id="name"
            label={translate('connection.username')}
            type="text"
            onChange={()=>{}}
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="email"
            label={translate('connection.email')}
            type="email"
            onChange={()=>{}}
            fullWidth
          />
          <TextField
            required
            margin="dense"
            id="comments"
            label={'Comments'}
            type="text"
            onChange={()=>{}}
            fullWidth
          />
        </Column>
        <WhiteButton variant='outlined' type='submit' onClick={(e)=> {e.preventDefault();}}> {translate('connection.signin')}</WhiteButton>
      </Column>
    </Row>
  );
}