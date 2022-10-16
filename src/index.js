import './css/styles.css';

import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchForm: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchForm.addEventListener(
  'input',
  debounce(searchCountrie, DEBOUNCE_DELAY)
);

////////////////// Fetch countntries (REST Countries) ////////////

function searchCountrie(evt) {
  const countryName = evt.target.value.trim();

  fetchCountries(countryName)
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        clearMarkup();
        return;
      }
      renderMarkup(data);
    })
    .catch(err => {
      clearMarkup();
      Notiflix.Notify.failure(`Oops, there is no country with that name`);
    });
}

////////////////////// Render markup /////////////////////////

function renderMarkup(el) {
  let markup;
  let refsMarkup;
  clearMarkup();

  if (el.length === 1) {
    markup = itemMarkup(el);
    refsMarkup = refs.countryInfo;
  } else {
    markup = listMarkup(el);
    refsMarkup = refs.countryList;
  }

  createMarkup(refsMarkup, markup);
}

////////////////////// Function for one country /////////////////////

function itemMarkup(el) {
  return el.map(
    ({ name, capital, population, flags, languages }) => ` <img
        src="${flags.svg}" 
        alt="${name.official}" 
        width="120" 
        height="80">
      <h1 class="country-info__title">${name.official}</h1>
      <ul class="country-info__list">
          <li class="country-info__item">
          <span>Capital:</span>
        ${capital}
          </li>
          <li class="country-info__item">
          <span>Population:</span>
          ${population}
          </li>
          <li class="country-info__item">
          <span>Lenguages:</span>
          ${Object.values(languages)}
          </li>
      </ul>`
  );
}

/////////////////////// Function for list of countries /////////////////////

function listMarkup(el) {
  return el
    .map(
      ({ name, flags }) => `<li class="country-list__item">
        <img class="country-list__img" 
          src="${flags.svg}" 
          alt="${name.official}" 
          width="60" 
          height="40">
        ${name.official}
        </li>`
    )
    .join('');
}

/////////////////////// Additional functions /////////////////////////////

function clearMarkup() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}

function createMarkup(refs, markup) {
  refs.innerHTML = markup;
}
