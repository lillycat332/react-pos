import * as React from 'react';
import { useEffect, useState } from 'react';

export default function UsersPage() {
  const [Users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
	const response = await fetch(`${global.window.location.href}users/all`,
		    { method: 'get' });
	const jsoned   = await response.json();
	console.log(jsoned);
	setUsers(jsoned);
      }
      catch (err) {
	window.alert(`An error occured when I tried to get users.
Please ensure the server is running.
For advanced users: ${err}`)
      }
    }
    fetchUsers();
  }, []);
  return (
    <ul>
      {Users.map((user) => (
        <li key={user.cuser_id}>
	    {user.cuser_name} - Privilege: {user.cuser_privilege}
	</li>
      ))}
    </ul>
  );
}
