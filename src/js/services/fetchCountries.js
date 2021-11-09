export function fetchCountries(country) {
  return fetch('https://restcountries.com/v3.1/name/${country}').then(r => {
    if (!r.ok) {
      throw Error(r.statusText);
    }
    return r.json();
  });
}
