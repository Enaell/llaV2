import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Column, Row } from '../../common/Flexbox';
import TextField from '@material-ui/core/TextField';
import translate from 'counterpart';

type LoginFormType = {
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, 
  handleUserNameChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, 
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, 
  passwordError: boolean, 
  usernameError: boolean, 
  emailAddressError: boolean
};


const LoginForm = ({
  handleEmailChange, 
  handleUserNameChange, 
  handlePasswordChange, 
  passwordError, 
  usernameError, 
  emailAddressError
}: LoginFormType) => {
  
  const emailMessage = usernameError ? translate('connection.usernameOrEmailError') : (emailAddressError ? translate('connection.emailInvalidError') : null)
  return(
    <Column>
      <Row>
      <TextField
          error = {usernameError}
          helperText = {usernameError ? translate('connection.usernameOrEmailError') : null} 
          margin="dense"
          id="userName"
          label={translate("connection.username")}
          type="text"
          onChange={handleUserNameChange}
        />
        <Column vertical="end">
          <Typography gutterBottom variant="body1" style={{paddingBottom: '5px', paddingRight:'15px', paddingLeft:'15px'}}> {translate('connection.or')} </Typography>
        </Column>
        <TextField
          error = {usernameError || emailAddressError}
          helperText = {emailMessage} 
          margin="dense"
          id="email"
          label={translate('connection.email')}
          type="email"
          onChange={handleEmailChange}
        />
      </Row>
      <Row>
        <TextField
          error = {passwordError}
          helperText = {passwordError ? translate('connection.passwordError') : null} 
          required
          margin="dense"
          id="password"
          label={translate('connection.password')}
          type="password"
          onChange={handlePasswordChange}
          fullWidth
        />
      </Row>
    </Column>
  );
}

export default LoginForm;