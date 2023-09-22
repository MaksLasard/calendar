import React from 'react'

import { IPostItemProps } from './PostItem.types'

import style from './PostItem.module.scss'

const PostItem: React.FC<IPostItemProps> = ({ post, remove, update }) => {
	const handleRemove = (event: React.MouseEvent) => {
		event.stopPropagation()
		remove(post)
	}

	const handleUpdate = () => {
		const title = prompt() || ''
		update({ ...post, title })
	}

	return (
		<div className={style.wrapper}>
			{post.id}. {post.title}: {post.body}
			<button type="button" onClick={handleUpdate} onKeyDown={handleUpdate}>
				Update
			</button>
			<button type="button" onClick={handleRemove}>
				Delete
			</button>
		</div>
	)
}

export default PostItem
