import { UserFormType } from 'src/@types/user-form.type';
import { UserType } from '../@types/user.type';

const baseUrl = 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data';

export async function getUsersList() {
  const response = await fetch(baseUrl);

  return response.json();
}

export async function deleteUser() {
  const response = await fetch(`${baseUrl}/1`, {
    method: 'DELETE',
  });

  return response;
}

export async function createUser(user: UserFormType) {
  const response = await fetch(baseUrl, {
    method: 'POST',
    body: JSON.stringify({
      name: user.name,
      username: user.username,
      city: user.city,
      email: user.email,
    }),
  });

  return response.json();
}

export async function updateUser(user: UserType) {
  const response = await fetch(`${baseUrl}/${user.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      id: user.id,
      name: user.name,
      username: user.username,
      city: user.city,
      email: user.email,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  return response;
}
