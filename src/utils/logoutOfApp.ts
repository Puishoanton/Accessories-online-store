import { auth } from '../Firebase'
import { useAppDispatch } from '../hooks/redux'
import { logout } from '../store/reducers/userSlice'
export const logoutOfApp = (dispatch: any) => {
  dispatch(logout())
  auth.signOut()
}
