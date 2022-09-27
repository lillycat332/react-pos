import { Product, SessionToken, LoginRequest } from './types';

export async function sendObject<A extends {}>(toSend: A, location: string) {
	await fetch(`${global.window.location.href}${location}`,
		{
			method: 'post',
			body: JSON.stringify(toSend)
		})
}

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

export async function makeSale(prod: Product) {
		const d = new Date()
		const response = await fetch(`${global.window.location.href}sales/${d.getFullYear()}/${d.getMonth()}/${d.getDay()}`, { method: 'post', body: JSON.stringify(prod) });
		
}

export async function purge() {
		const isOk = prompt("Are you ABSOLUTELY SURE you want to wipe the database? If so, type 'I am absolutely sure' verbatim (without speech marks)")
		if (isOk === "I am absolutely sure") {
				await fetch(`${global.window.location.href}UNSAFE-PURGE-ALL-CHECK-FIRST-IM-SERIOUS/`, {method: 'delete'})
		}
}

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

export function setToken(userToken: SessionToken) {
	sessionStorage.setItem('token', JSON.stringify(userToken));
}

export function getToken(): SessionToken {
	const tokenString = sessionStorage.getItem('token');
	const userToken = JSON.parse(tokenString);
	return userToken
} 
