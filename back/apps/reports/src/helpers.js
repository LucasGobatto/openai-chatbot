import axios from 'axios';

export function jsonSafeParse(obj) {
  try {
    return JSON.parse(obj);
  } catch {
    return obj;
  }
}

export function sendEvent(event) {
  return axios({
    url: 'http://localhost:10000/eventos',
    method: 'post',
    data: event,
  });
}
