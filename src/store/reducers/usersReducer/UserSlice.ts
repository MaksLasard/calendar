import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { fetchUsers } from './ActionCreators'
import { IUser } from '../../../models/IUser'

interface IUserState {
	users: IUser[]
	isLoading: boolean
	error: string
}

const initialState: IUserState = {
	users: [],
	isLoading: false,
	error: '',
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
			state.isLoading = false
			state.error = ''
			state.users = action.payload
		},
		[fetchUsers.pending.type]: (state) => {
			state.isLoading = true
		},
		[fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
			state.isLoading = false
			state.error = action.payload
		},
	},
})

export const { reducer: userReducers, actions: userActions } = userSlice
