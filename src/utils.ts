// Genel fetchData fonksiyonu sadece URL kabul eder
export async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`An error occurred when fetching data from ${url}.`);
  }
  return await response.json();
}

// Kimlik doğrulama ile ilgili fonksiyonlar
export const isAuthenticated = (): boolean => {
  return localStorage.getItem("token") !== null;
};

export const login = (): void => {
  localStorage.setItem("token", "fake-token");
};

export const logout = (): void => {
  localStorage.removeItem("token");
};
