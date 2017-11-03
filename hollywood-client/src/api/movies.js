const CREATE_URL = (path = "") =>
  `https://hollywood-api-mariahgrey.now.sh/api/movies/${path}`;

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

export const addActor = (id, data) => {
  return fetch(CREATE_URL(`${id}/actor`), {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const removeActor = (id, data) => {
  return fetch(CREATE_URL(`${id}/actor`), {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(response => response.json())
    .catch(error => console.log(error));
};

// movies crud file
