import { Checkbox, Button, Form, Input } from 'antd'
import React from 'react'
import { rules } from '../../../utils/rules'
import { useAppDispatch } from '../../../hooks/redux'
import { authSlice } from '../../../store/reducers/authReducer/authSlice'
import { IAuthDataUsers } from '../../../store/reducers/authReducer/auth.types'

const LoginForm: React.FC = () => {
	const dispatch = useAppDispatch()

	const onFinish = (values: IAuthDataUsers) => {
		dispatch(authSlice.actions.login(values))
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<div>
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 800 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off">
				<Form.Item
					label="Username"
					name="username"
					rules={[rules.required('Please input your username!')]}>
					<Input />
				</Form.Item>
				<Form.Item
					label="Password"
					name="password"
					rules={[rules.required('Please input your passrord!')]}>
					<Input.Password />
				</Form.Item>
				<Form.Item
					name="remember"
					valuePropName="checked"
					wrapperCol={{ offset: 8, span: 16 }}>
					<Checkbox>Remember me</Checkbox>
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default LoginForm
