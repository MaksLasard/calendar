import React from 'react'
import { publicRoutes } from '../../routers'
import { Route, Routes } from 'react-router-dom'

const AppRouter: React.FC = () => {
	return (
		<>
			<Routes>
				{publicRoutes.map((router) => (
					<Route path={router.path} element={router.component} />
				))}
			</Routes>
		</>
	)
}

export default AppRouter
