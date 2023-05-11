import './css/styles.css';
import { fetchCountries } from './fetchCountries';
const debounce = require('lodash.debounce')

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');




inputEl.addEventListener('input',
    debounce(name => {
        name = inputEl.value;
        fetchCountries(name);
    }, DEBOUNCE_DELAY)
)
