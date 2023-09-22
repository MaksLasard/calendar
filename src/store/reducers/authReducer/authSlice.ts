import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IAuthDataUsers, IAuthState } from './auth.types'
import { getAuthDateUsers } from './authThunk'

const initialState: IAuthState = {
	isAuth: true,
	authDateUsers: [
		{ username: 'user', password: '123' },
		{ username: 'admin', password: '123' },
		{ username: 'max', password: '123' },
	],
	isLoading: false,
	errorMessage: '',
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<IAuthDataUsers>) => {
			const isUserInArray = state.authDateUsers.some(
				(user) =>
					user.username === action.payload.username &&
					user.password === action.payload.password
			)
			if (isUserInArray) {
				state.isAuth = true
			}
		},
		logout: (state, action: PayloadAction<boolean>) => {
			state.isAuth = action.payload
		},
	},
	extraReducers: {
		[getAuthDateUsers.fulfilled.type]: (state, action: PayloadAction<IAuthDataUsers[]>) => {
			state.isLoading = false
			state.errorMessage = ''
			state.authDateUsers = action.payload
		},
		[getAuthDateUsers.pending.type]: (state) => {
			state.isLoading = true
		},
		[getAuthDateUsers.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false
			state.errorMessage = action.payload
		},
	},
})

export const { reducer: authReducer, actions: authActions } = authSlice
