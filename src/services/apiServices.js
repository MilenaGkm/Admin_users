
const apiUrl = process.env.NODE_ENV == "production" ? `https://shift-publisher-nest.herokuapp.com/users` : 'http://localhost:3000/users';

export function getApi() {
  return fetch(apiUrl, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',

      }
  }).then(response => response.json())
    .catch((error) => {throw error})
}

export function postApi(userToAdd) {
 const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( userToAdd )
    };
    return fetch(apiUrl, requestOptions)  .catch((error) => {throw error})
 

}

