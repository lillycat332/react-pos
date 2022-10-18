/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Product
	, SessionToken
	, LoginRequest
	, User
	, ProductWithStock
	, ProductSale
} from './types';

/**
 * Shorthand for printing to the console.
 */
export const log = console.log.bind(console)

/**
 * Sends any object to the server.
 * @param toSend - an object to send to the server
 * @param location a string representing the route to send the request to
 */
export async function sendObject<A extends {}>(toSend: A, location: string) {
	await fetch('${location}',
		{
			method: 'post',
			body: JSON.stringify(toSend)
		})
}
/**
 * Fetches the product list from the server, then gives it to the callback to deal with.
 * @param callback - a function that takes a product object and does something with it.
 */
export async function fetchProds(callback: (json: object) => void) {
	try {
		const response = await fetch('/prods/all',
			{ method: 'get' });
		const jsoned = await response.json();
		callback(jsoned);
	}
	catch (err) {
		window.alert(`An error occured when I tried to get products.
Please ensure the server is running.
For advanced users: ${err}`)
	}
}

export async function sendUser(user: User) {
	const response = await fetch('users',
		{
			method: 'post',
			body: JSON.stringify(user)
		})
	return response
}


/**
 * Make a sale, sending the sale to the server.
 * @param prod - the product to sell
 */
export async function makeSale(prod: Product) {
	const d = new Date()
	const offset = d.getTimezoneOffset()
	// Hack to work around the fact that JS automatically converts dates to UTC.
	// (thanks Brendan Eich -_-)
	const d2 = new Date(d.getTime() - (offset * 60 * 1000))
	const sale: ProductSale = {
		saleProduct: prod,
		saleDate: d.toISOString().split('T')[0],
		saleQuantity: 1
	}

	await fetch(
		'/sales/',
		{ method: 'post', body: JSON.stringify(sale) }
	);
}

const MalformedProd = 'Malformed Request - The data provided was not a valid product.';

/**
 * Sends a request to the server to add a product.
 * @param toSend The product to send to the server
 * @param location The endpoint to send the product to (e.g. /prods)
 */
export async function sendProd(toSend: Product, location: string): Promise<void> {
	try {
		const response = await fetch(`/${location}`,
			{
				method: 'post',
				body: JSON.stringify(toSend)
			})
		const code = response.status
		if (code === 400) { throw MalformedProd }
	}
	catch (err) {
		window.alert(`An error occured when I tried to add product.
Please ensure the server is running.
For advanced users: ${err}`)
	}
}


/**
* Fetches the stock data for a given product, adds it to the product object 
* and returns it
* @param prod - a Product
* @returns - a Promise<ProductWithStock>, a Product with the stock data added
*/
export async function getStockData(prod: Product): Promise<ProductWithStock> {
	return await fetch(`//stock/${prod.productId}`)
		.then(data => data.json() as unknown as number)
		.then(data => addStockData(prod, data))
}

/**
* Add stock data to a product object.
* @param prod - a Product
* @param stock - a number, the stock data to add to the product
* @returns - a ProductWithStock, a Product with the stock data added
*/
export function addStockData(prod: Product, stock: number): ProductWithStock {
	return {
		prod: prod,
		pInStock: stock
	}
}

/**
 * @param prod - a Product
 * @param callback - a function that takes a ProductWithStock and does something with it
 */
export function fetchProdWithStock(prod: Product, callback: (json: object) => void) {
	fetch(`/stock${prod.productId}`)
		.then(data => data.json() as unknown as ProductWithStock)
		.then(data => callback(data))
}

/**
 * @param callback - a function that takes a ProductWithStock and does something with it
 */
export function fetchProdsWithStock(callback: (json: object) => void) {
	fetch(`/stock/all/`)
		.then(data => data.json() as unknown as ProductWithStock[])
		.then(data => callback(data))
}

/**
 * Want to factory reset the whole damn thing? This is the function for you.
 * @returns - nothing. but the page will reload!
 */
export async function purge() {
	// We wanna make pretty damn sure the user wants to do this
	//const isOk = prompt('Are you ABSOLUTELY SURE you want to wipe the database? If so, type "I am absolutely sure" verbatim (without speech marks)')
	//if (isOk === 'I am absolutely sure') {
	// In case you missed it, this is a very dangerous function.
	// Maybe I should make the URL longer. Wouldn't that be funny.
	await fetch(`/UNSAFE-PURGE-ALL-CHECK-FIRST-IM-SERIOUS/`, { method: 'delete' })
	// Reload the page so the user can set up a new database.
	window.location.reload()
	//}
}

/**
 * Tests our copy of the session token to see if it's valid
 * against the master copy in the database.
 * @param sesh - a session token
 * @returns Boolean - whether the session token is valid
 */
export async function testToken(sesh: SessionToken) {
	const response = await fetch(`/session/`
		, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(sesh)
		})
	const code = response.status
	if (code === 200) { return true }
	return false
}

/**
 * Logs in a user.
 * @param creds - a login request object, containing the username and password to log in with
 * @returns should return a session token
 */
export async function loginUser(creds: LoginRequest) {
	return fetch(`/tawa-insa/`
		, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(creds)
		})
		.then(data => data.json())
}

/** 
 * Sets the session token in session storage.
 * @param userToken - a session token
 * @returns nothing
*/
export function setToken(userToken: SessionToken) {
	sessionStorage.setItem('token', JSON.stringify(userToken));
}

/**
 * Get the token currently stored in session storage.
 * @returns the session token from session storage
 */
export function getToken(): SessionToken {
	const tokenString = sessionStorage.getItem('token');
	const userToken = JSON.parse(tokenString);
	return userToken
}

/**
 * fetchUsers - fetches all users from the server.
 * @param callback - a function that takes an array product object and does something with it.
 */
export async function fetchUsers(callback: (json: object[]) => void) {
	try {
		const response = await fetch(`/users/all`,
			{ method: 'get' });
		const jsoned: User[] = await response.json();
		callback(jsoned);
	}
	catch (err) {
		window.alert(`An error occured when I tried to get users.
Please ensure the server is running.
For advanced users: ${err}`)
	}
}