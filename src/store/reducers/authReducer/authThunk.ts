import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { IAuthDataUsers } from './auth.types'

export const getAuthDateUsers = createAsyncThunk('auth/getAuthData', async (_, thunkApi) => {
	try {
		const response = await axios.get<IAuthDataUsers[]>('/public/users.json')
		return response.data
	} catch (e) {
		return thunkApi.rejectWithValue('Данные базы данных не получены!')
	}
})
