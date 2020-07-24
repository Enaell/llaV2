import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button } from '@material-ui/core';
import LoginModal from './loginModal';
import NavSnackBar from './navSnackBar';
import UserBar from './userBar'
import translate from 'counterpart';
import { UserType } from '../common/types';

type NavbarType = {
  user: UserType,
  openLoginModal: () => void, 
  openSigninModal: () => void, 
  classes: any, 
  history: any
}

export const Navbar = ({
  user, 
  openLoginModal, 
  openSigninModal, 
  classes, 
  history
}: NavbarType) => {

  const handleSideMenuClick = () => {}

  const handleOnMainPageRedirectionClick = () => {
    history.push('/');  
  }

   return(
    <div className={classes.root}>
      <AppBar elevation={user.token ? 4: 0} position='fixed' color='transparent'>
        <Toolbar>
          {user.token && <>
            <IconButton onClick={handleSideMenuClick} className={classes.menuButton} color="primary" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Button className={classes.homeButton} onClick={handleOnMainPageRedirectionClick}>
              <Typography style={{color: '#fff'}} variant="h6" noWrap>
                {translate('application-name')}
              </Typography>
            </Button>
          </>}
          <div className={classes.grow} />
          {user.token ?
            <UserBar/>
          :
            <div>
              <Button color="primary" onClick={openLoginModal}>
                {translate('connection.login')}
              </Button>
              <Button color="primary" onClick={openSigninModal}>
                {translate('connection.signin')}
              </Button>
              <LoginModal/>
            </div>
          }
        </Toolbar>
      </AppBar>
      <NavSnackBar></NavSnackBar>
    </div>
  );
}

