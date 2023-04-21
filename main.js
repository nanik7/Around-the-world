(function() {
    const htmlEl = document.querySelector("html");
    const rootEl = document.getElementById("countries-container");
    const themeBtn = document.getElementById("theme-btn");
    const searchBtnEl = document.getElementById("search-btn");
    const searchInputEl = document.getElementById("search-input");
    const filterByContintensEl = document.getElementById("filter-container");
    const API_URI = "https://restcountries.com/v3.1/all";
  
    themeBtn.addEventListener("click", () => {
      const mode = htmlEl.getAttribute("data-theme");
      if (mode === "light") {
        themeBtn.innerText = "🌑 Dark Mode";
        htmlEl.setAttribute("data-theme", "dark");
      } else {
        themeBtn.innerText = "🌕 Light Mode";
        htmlEl.setAttribute("data-theme", "light");
      }
    });
  
    const fetchCountries = async () => {
      try {
        const response = await fetch(API_URI);
        const countries = await response.json();
        render(countries);
  
        searchBtnEl.addEventListener("click", () => {
          const filterData = countries.filter((country) => {
            return country.name.common
              .toLowerCase()
              .includes(searchInputEl.value.toLowerCase());
          });
          render(filterData);
        });
  
        searchInputEl.addEventListener("keyup", (event) => {
          return !event.target.value && render(countries);
        });
  
        filterByContintensEl.addEventListener("change", (event) => {
          if (event.target.value === "none") render(countries);
          else {
            const filterData = countries.filter((country) => {
              return country.continents[0] === event.target.value;
            });
            render(filterData);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchCountries();
  
    const render = (data) => {
      rootEl.innerHTML = null;
      for (let i = 0; i < data.length; i++) {
        const containerEl = document.createElement("div");
        containerEl.className = "card";
        containerEl.innerHTML = `
          <img src=${data[i].flags.png} />
          <h2>${data[i].name.common}</h2>
          <div class="flex flex-column">
            <span>Population: ${data[i].population}</span>
            <span>Region: ${data[i].region}</span>
            <span>Capital: ${data[i].capital}</span>
        </div>`;
  
        rootEl.append(containerEl);
      }
    };
  })();
  