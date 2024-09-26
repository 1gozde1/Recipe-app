

export async function fetchData (url, idMeal) {
    const response = await fetch(`${url}${idMeal}`);
    if (!response.ok) {
        throw Error(`An error occured when fetching data from ${url}.`)
    }
    return await response.json();
  }