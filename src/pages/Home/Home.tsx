import React from 'react'
import { postApi } from '../../services/api/posts/servicePost'
import PostItem from '../../components/UI/Post/PostItem/PostItem'
import { IPosts } from '../../models/IPosts'

const Home: React.FC = () => {
	const { data: posts, error, isLoading } = postApi.useGetAllPostsQuery(100)
	const [createPost, { error: createError, isLoading: isCreateLoading }] =
		postApi.useCreatePostMutation()
	const [updatePost, { error: updateError }] = postApi.useUpdatePostMutation()
	const [deletePost, { error: deleteError }] = postApi.useDeletePostMutation()

	const handleCreate = async () => {
		const title = prompt()
		await createPost({ title, body: title } as IPosts)
	}

	const handleRemove = (post: IPosts) => {
		deletePost(post)
	}
	const handleUpdate = (post: IPosts) => {
		updatePost(post)
	}

	return (
		<div>
			<h1>Home</h1>
			<button type="button" onClick={handleCreate}>
				Add new post
			</button>
			{isLoading && <h1>Идет загрузка...</h1>}
			{error && <h1>Произошла ошибка загрузки...</h1>}
			{posts &&
				posts.map((post) => (
					<PostItem
						key={post.id}
						post={post}
						remove={handleRemove}
						update={handleUpdate}
					/>
				))}
		</div>
	)
}

export default Home
