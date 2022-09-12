import * as React from 'react';
import { useEffect, useState } from 'react';

export default function UsersPage() {
  const [UserArray, setUserArray] = useState([]);
  useEffect(() => {
			getUsers()
					.then((data: any) => { setUserArray(data) })
					.catch((err: any) => {
							window.alert(`An error occured when I tried to get users.
Please ensure the server is running.
For advanced users: ${err}`)});
  }, [UserArray]);
  return (
    <ul>
      {UserArray.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

async function getUsers() {
  const response = await fetch("http://localhost:3000/users/",
																 { method: 'get' });
  const body = await response.text();
  return body as unknown as [any];
}
