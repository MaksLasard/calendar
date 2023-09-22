import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { publicRoutes, privateRoutes } from '../../routers'
import { useAppSelector } from '../../hooks/redux'

import style from './AppRouter.module.scss'

const AppRouter: React.FC = () => {
	const isAuth = useAppSelector((state) => state.auth.isAuth)

	return (
		<div className={style.wrapper}>
			{isAuth ? (
				<div>
					<Routes>
						{privateRoutes.map((router) => (
							<Route
								path={router.path}
								element={router.component}
								key={router.path}
							/>
						))}
					</Routes>
				</div>
			) : (
				<div>
					<Routes>
						{publicRoutes.map((router) => (
							<Route
								path={router.path}
								element={router.component}
								key={router.path}
							/>
						))}
					</Routes>
				</div>
			)}
		</div>
	)
}

export default AppRouter
