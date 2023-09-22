import { IPosts } from '../../../../models/IPosts'

export interface IPostItemProps {
	post: IPosts
	remove: (post: IPosts) => void
	update: (post: IPosts) => void
}
