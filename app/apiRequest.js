
const API_URL = 'https://slatedemoapi.herokuapp.com';

export default async (options) => {
  if (!options.method) {
    return Promise.reject(new Error('Method type must be set.'));
  }
  if (!options.url) {
    return Promise.reject(new Error('Url must be set.'));
  }

  let method;
  try {
    method = options.method.toLowerCase();
  } catch (e) {
    return Promise.reject(new Error('Method must be a string'));
  }

  if (!options.body && (method !== 'get')) {
    options.body = {};
  }

  if (!options.query) {
    options.query = {};
  }

  const idToken = await AsyncStorage.getItem('id_token');
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}${optios.url}`, {
      method  : options.method,
      body: options.body || {},
    })
    .then((response) => {
      if (response.ok) {
        return response.json().then((data) => {
          resolve(data);
        });
      } else if (response._bodyBlob && response._bodyBlob.length) {
        return response.json().then(data => reject(data));
      }
      return reject(new Error('API request error'));
    })
    .catch((e) => {
      reject(e);
    });
  });
};