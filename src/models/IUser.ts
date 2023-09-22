export interface IUser {
	id: number
	name: string
	email: string
}

interface IUserCompany {
	name: string
	catchPhrase: string
	bs: string
}

interface IUserGeo {
	lat: string
	lng: string
}

interface IUserAddress {
	street: string
	suite: string
	city: string
	zipcode: number
	geo: IUserGeo
}

export interface IUsersData {
	id: number
	name: string
	username: string
	email: string
	address: IUserAddress
	phone: string
	website: string
	company: IUserCompany
}
