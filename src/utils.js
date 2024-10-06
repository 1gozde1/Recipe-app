export async function fetchData(url, idMeal) {
  const response = await fetch(`${url}${idMeal}`);
  if (!response.ok) {
    throw Error(`An error occurred when fetching data from ${url}.`);
  }
  return await response.json();
}

// Kimlik doğrulama ile ilgili fonksiyonlar
export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

export const login = () => {
  localStorage.setItem("token", "fake-token");
};

export const logout = () => {
  localStorage.removeItem("token");
};
