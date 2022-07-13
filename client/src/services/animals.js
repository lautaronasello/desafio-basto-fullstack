import Axios from '../utils/axios';
import { URL_ANIMAL, URL_CREATE_ANIMAL } from '../utils/urlApis';

export async function getAnimales(body, orderBy = null, order = null) {
  const response = await Axios(`${URL_ANIMAL}?sortBy=${orderBy}:${order}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Autorization: '*',
    },
    body,
  });
  return response;
}

export async function createAnimal(body) {
  const response = await Axios(`${URL_CREATE_ANIMAL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  return response;
}

export async function getAnimalById(id) {
  const response = await Axios(`${URL_ANIMAL}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response;
}

export async function deleteAnimalById(id) {
  const response = await Axios(`${URL_ANIMAL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response;
}

export async function editAnimalById(id, body) {
  const response = await Axios(`${URL_ANIMAL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  return response;
}

export async function getAnimalSearch(body) {
  const response = await Axios(`${URL_ANIMAL}/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  });
  return response;
}
