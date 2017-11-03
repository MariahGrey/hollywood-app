const CREATE_URL = (path = "") =>
  `https://hollywood-api-mariahgrey.now.sh/api/actors/${path}`;

export const getById = id => {
  return fetch(CREATE_URL(id))
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const getAll = () => {
  return fetch(CREATE_URL())
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const create = data => {
  return fetch(CREATE_URL(), {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const update = (id, data) => {
  return fetch(CREATE_URL(id), {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const remove = id => {
  return fetch(CREATE_URL(id), {
    method: "DELETE"
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

// actors crud file
