import config from '../configuration';

async function getAll() {
  return fetch(config.TEMPLATE_COLLECTION_URL)
    .then(response => response.json())
    .then(json => {
      console.log('data', json);
      return json;
    })
    .catch(error => {
      console.log('getAll error', error);
    });
}

async function get(id) {
  return fetch(config.TEMPLATE_COLLECTION_URL + '/' + id)
    .then(response => {
      if (!response.ok) {
          console.log(response);
      }
      return response.json();
    })
    .then(item => {
        return item;
      }
    )
    .catch(error => {
      console.log(error);
    });
}

async function create(template) {
  console.log(template);
  return fetch(config.TEMPLATE_COLLECTION_URL, {
    method: "POST",
    mode: "cors",
    headers: {
          "Content-Type": "application/json"
      },
    body: JSON.stringify(template)
  })
    .then(response => {
      if (!response.ok) {
          console.log(response);
      }
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
}

async function update(id, template) {
  return fetch(config.TEMPLATE_COLLECTION_URL + id, {
    method: "PUT",
    mode: "cors",
    headers: {
          "Content-Type": "application/json"
        },
    body: JSON.stringify(template)
  })
    .then(response => {
      if (!response.ok) {
        console.log(response);
      }
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
}

async function remove(id) {
  return fetch(config.TEMPLATE_COLLECTION_URL + id, {
    method: "DELETE",
    mode: "cors"
  })
    .then(response => {
      if (!response.ok) {
          console.log(response);
      }
    })
    .catch(error => {
      console.log(error);
    });
}

async function findByEmail(email) {
  return fetch(config.CUSTOMER_COLLECTION_URL)
    .then(response => response.json())
    .then(json => {
      console.log('findByEmail', email, json);
      if (!email) {
        return json;
      }

      return json.filter(d => d.email === email);
    })
    .catch(error => {
      console.log('findByName error', error);
    });
}

export default {
  getAll,
  get,
  create,
  update,
  remove,
  findByEmail,
};