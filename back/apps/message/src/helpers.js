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

export function validateBody(body) {
  const missingFields = [];

  if (!body || !body.question) {
    missingFields.push('question');
  }

  if (!body || !body.vacancyContext || !body.vacancyContext.role) {
    missingFields.push('vacancyContext.role');
  }

  if (!body || !body.vacancyContext || !body.vacancyContext.description) {
    missingFields.push('vacancyContext.description');
  }

  if (!body || !body.contextType) {
    missingFields.push('contextType');
  }

  if (!body || (body.contextType === 'resume' && !body.vacancyContext.resume)) {
    missingFields.push('vacancyContext.resume');
  }

  return missingFields;
}
