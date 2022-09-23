export type User = {
	user_id: number,
	user_name: string,
	user_password: string,
	user_privilege: number
}

export type Product = {
	product_id: number,
	product_name: string,
	product_price: number,
}

export type Maybe<T> = T | undefined

export type ProductDisplay = {
	p: Product
	handler: Maybe<Function>
	currency: String
}
