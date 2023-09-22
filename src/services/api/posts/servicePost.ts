import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IPosts } from '../../../models/IPosts'

const API_URL = 'http://localhost:5000/'

export const postApi = createApi({
	reducerPath: 'postApi',
	tagTypes: ['Post'],
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
	}),
	endpoints: (build) => ({
		getAllPosts: build.query<IPosts[], number>({
			query: (limit = 5) => ({
				url: `/posts`,
				params: {
					_limit: limit,
				},
			}),
			providesTags: (result) => ['Post'],
		}),
		createPost: build.mutation<IPosts, IPosts>({
			query: (post) => ({
				url: `/posts`,
				method: 'POST',
				body: post,
			}),
			invalidatesTags: ['Post'],
		}),
		updatePost: build.mutation<IPosts, IPosts>({
			query: (post) => ({
				url: `/posts/${post.id}`,
				method: 'PUT',
				body: post,
			}),
			invalidatesTags: ['Post'],
		}),
		deletePost: build.mutation<IPosts, IPosts>({
			query: (post) => ({
				url: `/posts/${post.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Post'],
		}),
	}),
})
