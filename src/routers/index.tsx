import React from 'react'
import Login from '../pages/Login/Login'
import UserProfile from '../pages/UserProfile/UserProfile'
import Home from '../pages/Home/Home'
import Registration from '../pages/Registration/Registration'

export enum RoutersNames {
	HOME = '/',
	LOGIN = '/login',
	REGISTRATION = '/registration',
	USER_PROFILE = '/user_profile',
}

export const privateRoutes = [
	{ path: RoutersNames.HOME, component: <Home /> },
	{ path: RoutersNames.USER_PROFILE, component: <UserProfile /> },
]

export const publicRoutes = [
	{ path: RoutersNames.HOME, component: <Home /> },
	{ path: RoutersNames.LOGIN, component: <Login /> },
	{ path: RoutersNames.REGISTRATION, component: <Registration /> },
]
