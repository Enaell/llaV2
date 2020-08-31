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
import { useSelector } from 'react-redux';
import { Row } from '../common/Flexbox';

type NavbarType = {
  openLoginModal: () => void, 
  openSigninModal: () => void, 
  classes: any, 
  history: any
}

export const Navbar = ({
  openLoginModal, 
  openSigninModal, 
  classes, 
  history
}: NavbarType) => {

  const handleSideMenuClick = () => {}

  const handleOnMainPageRedirectionClick = () => {
    history.push('/');  
  }

  const user = useSelector((state: any) => state.user) as UserType;
  const discover = useSelector((state: any) => state.landing.discover) as number;


   return(
    <div className={classes.root}>
      <AppBar elevation={user.token ? 4: 0} position='fixed' color={ discover ? 'primary' : 'transparent'}>
        <Toolbar>
          {user.token && <>
            <IconButton onClick={handleSideMenuClick} className={classes.menuButton} color="primary" aria-label="Open drawer">
              <MenuIcon />
            </IconButton>
            <Button className={classes.homeButton} onClick={handleOnMainPageRedirectionClick}>
              <Typography color={ discover ? 'textSecondary' : 'primary'}  variant="h6" noWrap>
                {translate('application-name')}
              </Typography>
            </Button>
          </>}
          <Row  className={classes.grow}>
            Coucou
          </Row>
          {user.token ?
            <UserBar/>
          :
            <div>
              <Button color='primary' onClick={openSigninModal}>
                <Typography variant='body2' color={ discover ? 'secondary' : 'primary'}>
                  {translate('connection.signin')}
                </Typography>
              </Button>
              <Button color="primary" onClick={openLoginModal}>
                <Typography variant='body2' color={ discover ? 'secondary' : 'primary'}>
                  {translate('connection.login')}
                </Typography>
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

