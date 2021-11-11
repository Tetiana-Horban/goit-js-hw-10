import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/services/fetchCountries';
import countryCard from './js/templates/country-card.hbs';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryCardConteiner = document.querySelector('.country-info');
const countryListConteiner = document.querySelector('.country-list');

input.addEventListener(
  'input',
  debounce(() => {
    const valueInput = input.value.trim();
    fetchCountries(valueInput)
      .then(data => {
        if (data.length > 10) {
          return Notiflix.Notify.warning(
            'Too many matches found. Please enter a more specific name.',
          );
        } else if (data.length === 1) {
          clearConteiner();
          createCountryCard(data);
          return;
        } else if (data.length >= 2 && data.length <= 10) {
          clearConteiner();
          createCountryList(data);
          return;
        } else if (data.status === 404) {
          showError();
        }
      })
      .catch(error => showError(error));
  }, DEBOUNCE_DELAY),
);

function showError() {
  Notiflix.Notify.failure(`Oops, there is no country with that name`);
}

function createCountryCard(country) {
  countryCardConteiner.innerHTML = countryCard(country);
}

function createCountryList(country) {
  const countryList = country
    .map(({ flags, name }) => {
      return `<li class='country-list__info list'>
    <img
     src='${flags.svg}'
     width='60'
     height='40'
     alt='${name.official}'
     class='country-list__img'
   />
    ${name.official}</li>`;
    })
    .join('');
  countryListConteiner.innerHTML = countryList;
}

function clearConteiner() {
  countryCardConteiner.innerHTML = '';
  countryListConteiner.innerHTML = '';
}
