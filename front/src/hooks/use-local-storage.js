export function useLocalStorage(key) {
  const set = (value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const get = () => {
    return JSONSafeParse(localStorage.getItem(key));
  };

  return { set, get };
}

function JSONSafeParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}
