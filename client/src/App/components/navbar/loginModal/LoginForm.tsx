import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Column, Row } from '../../common/Flexbox';
import TextField from '@material-ui/core/TextField';
import translate from 'counterpart';

type LoginFormType = {
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, 
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, 
  passwordError: boolean, 
  emailAddressError: boolean
};


const LoginForm = ({
  handleEmailChange, 
  handlePasswordChange, 
  passwordError, 
  emailAddressError
}: LoginFormType) => {
  return(
    <Column>
      <Row>
        <TextField
          error = { emailAddressError }
          helperText = { emailAddressError ? translate('connection.emailInvalidError') : null } 
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