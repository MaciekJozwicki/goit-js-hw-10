
import Notiflix from 'notiflix';
const listEl = document.querySelector('.country-list');
const divEl = document.querySelector('.country-info');
const API_URL = "https://restcountries.com/v3.1/name";



export const fetchCountries = (name) => {
    name = name.trim();

    fetch(`${API_URL}/${name}?fields=name,capital,population,flags,languages`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } if (!res.ok) {
                throw new Error(res.status);
            }
        })
        .then(country => {
            if (country.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
            }
            else if (country.length >= 2 && country.length <= 10) {
                
                fewCountries(country);
            } else if (country.length = 1) {
            
                oneCountry(country);
            }
        })
        .catch(err => {
            Notiflix.Notify.failure('Oops, there is no country with that name');
            clearEls();
        });
}

const fewCountries = country => {
  clearEls();

  const countries = country
    .map(countryName => {
        return `<li>
        <img src="${countryName.flags.svg}" alt="${countryName.flags.alt}" width="25" height="auto"><p> ${countryName.name.official}</p></li>`;
    })
    .join(' ');

  listEl.innerHTML = countries;
};

const oneCountry = country => {
    clearEls();

    const countries = country.map(countryName => {
        return `<h2 style="font-size: 40px"><img src="${countryName.flags.svg}" alt="${countryName.flags.alt} width="60" height="60"> ${countryName.name.official}</h2>
        <p><span style="font-weight: bold">Capital:</span> ${countryName.capital}</p>
        <p><span style="font-weight: bold">Population:</span> ${countryName.population.toLocaleString()}</p>
        <p><span style="font-weight: bold">Languages:</span> ${Object.values(
            countryName.languages
        ).join(', ')}</p>`;
    }).join(' ');
    divEl.innerHTML = countries;
}



const clearEls = () => {
  listEl.innerHTML = '';
  divEl.innerHTML = '';
};