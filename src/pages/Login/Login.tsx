import React from 'react'
import Layout from 'antd/es/layout/layout'
import Row from 'antd/es/grid/row'

import LoginForm from './LoginForm/LoginForm'

import './Login.module.scss'

const Login: React.FC = () => {
	return (
		<Layout>
			<Row justify="center" align="middle" style={{ height: '100vh' }}>
				<LoginForm />
			</Row>
		</Layout>
	)
}

export default Login
