import { combineReducers } from 'redux'
import { userReducers } from './usersReducer/UserSlice'
import { authReducer } from './authReducer/authSlice'
import { userApi } from '../../services/api/users/serviceUsers'
import { postApi } from '../../services/api/posts/servicePost'

export const rootReducer = combineReducers({
	user: userReducers,
	auth: authReducer,
	[userApi.reducerPath]: userApi.reducer,
	[postApi.reducerPath]: postApi.reducer,
})
