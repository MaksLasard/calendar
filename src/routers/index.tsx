import Event from '../pages/Event/Event'
import Login from '../pages/Login/Login'

export const publicRoutes = [
	{ path: '/', component: <Login /> },
	{ path: '/event', component: <Event /> },
]
