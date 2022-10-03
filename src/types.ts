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

export type ProductSale = {
	saleProduct: Product,
	saleDate: Date | string,
	saleQuantity: number,
}

export enum MaybeType {
	Just = 'maybe-type__just',
	Nothing = 'maybe-type__nothing',
}

export interface Just<T> {
	type: typeof MaybeType.Just
	value: T
}

export interface Nothing {
	type: typeof MaybeType.Nothing
}

export type Maybe<T>
	= Just<T>
	| Nothing

// eslint-disable-next-line @typescript-eslint/no-redeclare
const Nothing = (): Nothing => ({
	type: MaybeType.Nothing,
})

// eslint-disable-next-line @typescript-eslint/no-redeclare
const Just = <T>(value: T): Just<T> => ({
	type: MaybeType.Just,
	value,
})

export type ProductDisplay = {
	p: Product
	handler: Function | undefined
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
