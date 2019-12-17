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

const Navbar = ({
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
      <AppBar position='fixed' color='primary'>
        <Toolbar>
          <IconButton onClick={handleSideMenuClick} className={classes.menuButton} color="inherit" aria-label="Open drawer">
            <MenuIcon />
          </IconButton>
          <Button color='inherit' className={classes.homeButton} onClick={handleOnMainPageRedirectionClick}>
            <Typography style={{color: '#fff'}} variant="h6" noWrap>
              {translate('application-name')}
            </Typography>
          </Button>
          <div className={classes.grow} />
          {user.id ?
            <UserBar/>
          :
            <div>
              <Button color="inherit" onClick={openLoginModal}>
                {translate('connection.login')}
              </Button>
              <Button color="inherit" onClick={openSigninModal}>
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

export default Navbar;