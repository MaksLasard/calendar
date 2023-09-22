import React from 'react'
import { Layout, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import { RoutersNames } from '../../routers'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { authSlice } from '../../store/reducers/authReducer/authSlice'

import style from './Navbar.module.scss'

const Navbar: React.FC = () => {
	const isAuth = useAppSelector((state) => state.auth.isAuth)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const logout = () => {
		navigate(RoutersNames.HOME)
		dispatch(authSlice.actions.logout(false))
	}

	return (
		<Layout>
			<Layout.Header className={style.layout_header}>
				{isAuth ? (
					<div className={style.wrapper_menu}>
						<div className={style.menu_user}>Пользователь: Максим</div>
						<Menu theme="dark" mode="horizontal" selectable={false} disabledOverflow>
							<Menu.Item
								key="1"
								onClick={() => navigate(RoutersNames.USER_PROFILE)}
								className={style.menu_item}>
								<p>Профиль</p>
							</Menu.Item>
							<Menu.Item key="2" onClick={() => logout()} className={style.menu_item}>
								<p>Выйти</p>
							</Menu.Item>
						</Menu>
					</div>
				) : (
					<div>
						<Menu
							theme="dark"
							mode="horizontal"
							selectable={false}
							disabledOverflow
							style={{ backgroundColor: 'teal' }}>
							<Menu.Item key="1" onClick={() => navigate(RoutersNames.HOME)}>
								Главная
							</Menu.Item>
							<Menu.Item key="2" onClick={() => navigate(RoutersNames.LOGIN)}>
								Логин
							</Menu.Item>
							<Menu.Item key="3" onClick={() => navigate(RoutersNames.REGISTRATION)}>
								Регистрация
							</Menu.Item>
						</Menu>
					</div>
				)}
			</Layout.Header>
		</Layout>
	)
}

export default Navbar
