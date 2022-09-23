import { Product } from './types';

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
		console.log(jsoned);
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
