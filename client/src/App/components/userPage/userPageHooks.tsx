import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LanguageType, UserModulesType, UserType } from '../common/types';


export function useUserPage() {

  const history = useHistory();
  const user = useSelector((state: any) => state.user as UserType | undefined)

  const dispatch = useDispatch();

  function goToPage (url: string) {
    history.push(url)
  }

  async function updateUserBoard (userBoard: UserModulesType) {
    if (user?.token) {      
      await fetch("http://localhost:5000/api/usergridBlocks",
      {
          headers: {
            'Authorization': `Token ${user.token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
              },
          method: "PATCH",
          body: JSON.stringify(userBoard)
      })
    }
    dispatch({type: 'UPDATE_USERBOARD', payload: userBoard})
  };


  return { user, updateUserBoard, goToPage };
}
