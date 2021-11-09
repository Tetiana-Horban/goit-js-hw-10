import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './services/fetchCountries';
import countryCard from './templates/country-card.hbs';
import countryList from './templates/country-list.hbs';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

// name.official - полное имя страны
// capital - столица
// population - население
// flags.svg - ссылка на изображение флага
// languages

const input = document.querySelector('#search-box');
const countryCardConteiner = document.querySelector('.country-info');
const countryListConteiner = document.querySelector('.country-list');

input.addEventListener(
  'input',
  debounce(() => {
    fetchCountries(input.value)
      .then(countrydata => showCountryCard(countrydata))
      .catch(error => showError(error));
  }, DEBOUNCE_DELAY),
);

function showError(error) {
  console.log(error);
  countryCardConteiner.innerHTML = Notiflix.Notify.failure(
    `Oops, there is no country with that name`,
  );
}
