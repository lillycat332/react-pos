// WILL YOU SHUT UP MAN
/* eslint-disable @typescript-eslint/no-unused-vars */
export type User = {
	userId: number,
	userName: string,
	userPassword: string,
	userPrivilege: number
}

export type CensoredUser = {
	cuserId: number,
	cuserName: string,
	cuserPrivilege: number
}

export type Product = {
	productId: number,
	productName: string,
	productPrice: number,
}

const Nothing = Symbol('nothing');
// Because it will NOT shut up about this irrelevant redeclaration error
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Nothing = typeof Nothing;
export type Maybe<T> = T | Nothing

export type ProductDisplay = {
	p: Product
	handler: Maybe<Function>
	currency: String
}

export type SessionToken = {
	sessionUUID: String
	sessionUser: CensoredUser
	sessionHash: String
}

export type ProductWithStock = { prod: Product, pInStock: number }

// TODO: add these into the actual app
export type GBP = { kind: 'GBP', symbol: '£' }
export type EUR = { kind: 'EUR', symbol: '€' }
export type USD = { kind: 'USD', symbol: '$' }

export type Currency =
	| GBP
	| USD
	| EUR

export type LoginRequest = {
	requestName: string
	, requestPass: string
}

const UserCols = [{ name: 'userId', label: 'ID' }
	, { name: 'userName', label: 'Name' }
	, { name: 'userPrivilege', label: 'Privilege' }]
