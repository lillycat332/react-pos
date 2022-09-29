import { Product, SessionToken, LoginRequest, User } from './types';

/**
 * Sends any object to the server.
 * @param toSend - an object to send to the server
 * @param location a string representing the route to send the request to
 */
export async function sendObject<A extends {}>(toSend: A, location: string) {
	await fetch(`${global.window.location.href}${location}`,
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
		const response = await fetch(`${global.window.location.href}prods/all`,
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

/**
 * Make a sale, sending the sale to the server.
 * @param prod - the product to sell
 */
export async function makeSale(prod: Product) {
	const d = new Date()
	await fetch(
		`${global.window.location.href}sales/${d.getFullYear()}/${d.getMonth()}/${d.getDay()}`,
		{ method: 'post', body: JSON.stringify(prod) }
	);
}

/**
 * Want to factory reset the whole damn thing? This is the function for you.
 * @returns - nothing. because the page will reload.
 */
export async function purge() {
	// We wanna make pretty damn sure the user wants to do this
	const isOk = prompt("Are you ABSOLUTELY SURE you want to wipe the database? If so, type 'I am absolutely sure' verbatim (without speech marks)")
	if (isOk === "I am absolutely sure") {
		// In case you missed it, this is a very dangerous function.
		// Maybe I should make the URL longer. Wouldn't that be funny.
		await fetch(`${global.window.location.href}UNSAFE-PURGE-ALL-CHECK-FIRST-IM-SERIOUS/`, { method: 'delete' })
	}
}

/**
 * Tests our copy of the session token to see if it's valid
 * against the master copy in the database.
 * @param sesh - a session token
 * @returns Boolean - whether the session token is valid
 */
export async function testToken(sesh: SessionToken) {
	const response = await fetch(`${global.window.location.href}session/`
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
	return fetch(`${global.window.location.href}tawa-insa/`
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
		const response = await fetch(`${global.window.location.href}users/all`,
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