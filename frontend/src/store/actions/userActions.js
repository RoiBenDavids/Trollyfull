import { userService } from '../../services/userService';

export function login(userCreds) {
  return async dispatch => {
    try{
      const user = await userService.login(userCreds);
      dispatch({ type: 'SET_USER', user });
      return user
    }catch(err){
      console.log(err,'actionsuser');
      dispatch({type:'LOGIN_PROBLEM'})
    }
  };
}
export function signup(userCreds) {
  return async dispatch => {
    const user = await userService.signup(userCreds);
    dispatch({ type: 'SET_USER', user });
    return user
  };
}
export function logout() {
  return async dispatch => {
    await userService.logout();
    dispatch({ type: 'SET_USER', user: null });
  };
}
