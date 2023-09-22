import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IUsersData } from '../../../models/IUser'

const API_URL = 'http://localhost:5000'

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
	}),
	endpoints: (build) => ({
		getAllUsers: build.query<IUsersData[], string>({
			query: () => ({
				url: `/users`,
			}),
		}),
	}),
})
