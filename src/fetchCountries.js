export { fetchCountries };

const BASE_URL = 'https://restcountries.com/v3.1/';

function fetchCountries(name) {
  const resp = fetch(
    `${BASE_URL}name/${name}?fields=name,capital,population,flags,languages`
  );

  return resp.then(response => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });
}
