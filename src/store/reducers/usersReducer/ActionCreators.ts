import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { IUser } from '../../../models/IUser'

// export const fetchUsers = () => async (dispatсh: AppDispatch) => {
// 	try {
// 		dispatсh(userSlice.actions.usersFetching())
// 		const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/userss')
// 		dispatсh(userSlice.actions.usersFetchingSuccess(response.data))
// 	} catch (e) {
// 		dispatсh(userSlice.actions.usersFetchingError('Произошла ошибка!'))
// 	}
// }

export const fetchUsers = createAsyncThunk('user/fetchAll', async (_, thunkAPI) => {
	try {
		const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
		return response.data
	} catch (e) {
		return thunkAPI.rejectWithValue('Не удалось загрузить пользователей!')
	}
})
