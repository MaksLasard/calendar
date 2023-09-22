export interface IAuthDataUsers {
	username: string
	password: string
}

export interface IAuthState {
	isAuth: boolean
	authDateUsers: IAuthDataUsers[]
	isLoading: boolean
	errorMessage: string
}
