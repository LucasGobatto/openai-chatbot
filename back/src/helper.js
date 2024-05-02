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

  return missingFields;
}
