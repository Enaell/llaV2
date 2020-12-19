import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Badge from '@material-ui/core/Badge';
import {getLogMenu, getLogMobileMenu} from './logMenu.js'
import { useStyles } from './styles'
import { useDispatch, useSelector } from 'react-redux';
import { UserType } from '../../common/types.js';



export const UserBar = () => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);;
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);;
  
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
  const user = useSelector((state: any) => state.user as UserType | any);
  const dispatch = useDispatch();

  function handleProfileMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }
  
  function handleMobileMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
  }
    
  function handleLogout(event: React.MouseEvent<HTMLElement>){
    handleMenuClose();
    dispatch({type:'LOGOUT'});
  }

  const LogMenu = getLogMenu(anchorEl, isMenuOpen, handleMenuClose, handleLogout);

  const LogMobileMenu = getLogMobileMenu(mobileMoreAnchorEl, isMobileMenuOpen, handleProfileMenuOpen, handleMenuClose, user);
  
  const classes = useStyles();

  return (
    <div>
      <div className={classes.sectionDesktop}>
        {user.messages &&
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
        }
        {user.notifications &&  
          <IconButton color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          }
        <IconButton
          aria-owns={isMenuOpen ? 'material-appbar' : undefined}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        {LogMenu}
      </div>
      <div className={classes.sectionMobile}>
        <IconButton aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
          <MoreIcon />
        </IconButton>
          {LogMobileMenu}
      </div>
    </div>
  )}