// Genel fetchData fonksiyonu sadece URL kabul eder
export async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw Error(`An error occurred when fetching data from ${url}.`);
  }
  return await response.json();
}

// Wrapper fonksiyonu: URL ve idMeal'i birleştirir ve fetchData'yı çağırır
export const fetchRecipeById = (url, idMeal) => {
  const fullUrl = `${url}${idMeal}`;
  return fetchData(fullUrl);
};


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
