import React, { useEffect, useState } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import { Row } from '../common/Flexbox';
import { NavButton } from '../common/GenericComponents';

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

  const user = useSelector((state: any) => state.user) as UserType;
  const {discover, sections} = useSelector((state: any) => state.landing) as {discover: number, sections: string[]};
  const dispatch = useDispatch();

  const handleOnMainPageRedirectionClick = () => {
    discover ? dispatch({type: 'SCROLL_TO_SECTION', payload: 'top'}) : history.push('/');
  }

   return(
    <div className={classes.root}>
      <AppBar elevation={user.token ? 4: 0} position='fixed' color={ discover ? 'primary' : 'transparent'}>
        <Toolbar>
          <Row width='100%' vertical='center' horizontal='space-between'>
            <Row  className={classes.grow}>
              {user.token &&
              <IconButton onClick={handleSideMenuClick} className={classes.menuButton} color="primary" aria-label="Open drawer">
                <MenuIcon />
              </IconButton>}
              <Button className={classes.homeButton} onClick={handleOnMainPageRedirectionClick}>
                <Typography color={ discover ? 'secondary' : 'primary'}  variant="h6" noWrap>
                  {translate('application-name')}
                </Typography>
              </Button>
            </Row>
            {discover ? <Row horizontal='center' className={classes.grow}>
              { sections.map(section => 
                <NavButton onClick={()=> dispatch({type: 'SCROLL_TO_SECTION', payload: section})} key={section}>
                  {section} 
                </NavButton>)}
            </Row>
            : <Row className={classes.grow}>
            </Row>}
            <Row horizontal='end' className={classes.grow}>
              {user.token ? <UserBar/>
              : <>
                  <Button color='primary' onClick={openSigninModal}>
                    <Typography variant='body2' color={ discover ? 'secondary' : 'primary'} noWrap>
                      {translate('connection.signin')}
                    </Typography>
                  </Button>
                  <Button color="primary" onClick={openLoginModal}>
                    <Typography variant='body2' color={ discover ? 'secondary' : 'primary'} noWrap>
                      {translate('connection.login')}
                    </Typography>
                  </Button>
                  <LoginModal/>
                </>
              }
            </Row>
          </Row>
        </Toolbar>
      </AppBar>
      <NavSnackBar></NavSnackBar>
    </div>
  );
}

