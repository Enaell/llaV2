import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { UserType } from "../common/types";
import { useStyles } from "./styles";

export function useNavbar() {
  const { user, discover } = useSelector((state: any) => ({ user: {...state.user}, discover: state.landing?.discover })) as {user: UserType, discover: number};
  const dispatch = useDispatch();
  const classes = useStyles();

  const history = useHistory();

  const handleOnMainPageRedirectionClick = () => {
    discover ? dispatch({type: 'SCROLL_TO_SECTION', payload: 'top'}) : history.push('/');
  }

  const openLoginModal = () => {
    dispatch({type: 'CHANGE_LOGIN_MODAL_TAB', payload: 2})
    dispatch({type: 'TOGGLE_LOGIN_MODAL'})
  }

  const openSigninModal = () => {
    dispatch({type: 'CHANGE_LOGIN_MODAL_TAB', payload: 1})
    dispatch({type: 'TOGGLE_LOGIN_MODAL'})
  }

  const scrollToSection = (section: string) => dispatch({type: 'SCROLL_TO_SECTION', payload: section})

  return { user, discover, classes, handleOnMainPageRedirectionClick, openLoginModal, openSigninModal, scrollToSection }
}