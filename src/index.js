import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/services/fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryCardConteiner = document.querySelector('.country-info');
const countryListConteiner = document.querySelector('.country-list');

input.addEventListener(
  'input',
  debounce(() => {
    const valueInput = input.value.trim();
    fetchCountries(valueInput).then(data => {
      if (data.length > 10) {
        return Notiflix.Notify.warning(
          'Too many matches found. Please enter a more specific name.',
        );
      }
      if (data.length >= 2 && data.length <= 10) {
        return createCountryList(data);
      }
      if (data.status === 404) {
        showError();
      }
      createCountryCard(data);
    });
  }, DEBOUNCE_DELAY),
);

function showError() {
  Notiflix.Notify.failure(`Oops, there is no country with that name`);
}

function createCountryCard({ name, flags, capital, languages, population }) {
  countryCardConteiner.insertAdjacentHTML(
    'beforeend',
    `<div class='country-info__box'>
  <img
    src='${flags.svg}'
    alt='${name.official}'
    width='40'
    height='20'
    class='country-info__img'
  />
  <h2 class='country-info__title'>${name.official}</h2>
  <ul class='country-info__list'>
    <li class='country-info__item'>Capital:
      <p class='country-info__text'>${capital}</p>
    </li>
    <li class='country-info__item'>Population:
      <p class='country-info__text'>${population}</p>
    </li>
    <li class='country-info__item'>Languages:
      <p class="country-info__text">${languages}</p>
      </ul>
    </li>
  </ul>
</div>
`,
  );
}

function createCountryList({ name, flags }) {
  countryListConteiner.insertAdjacentHTML(
    'beforeend',
    `<li class='country-list__info'>
  // <img
  //   src='${flags.svg}'
  //   width='40'
  //   height='20'
  //   alt='${name.official}'
  //   class='country-list__img'
  // />
  // ${name.official}</li>`,
  );
}

function clearConteiner() {
  countryCardConteiner.innerHTML = '';
  countryListConteiner.innerHTML = '';
}
