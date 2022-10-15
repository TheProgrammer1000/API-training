
// Hålla koll på vilken sida det är
if(window.location.href === 'http://127.0.0.1:5500/index.html') {
  FetchCitiesHTML();
}
else if (window.location.href === 'http://127.0.0.1:5500/change.html') {
  const buttonElement = document.querySelector('#btn')
  const idElement = document.querySelector('#textInput');
  const nameElement = document.querySelector('#inputName')
  const populationElement = document.querySelector('#inputPopulation')

  console.log(idElement)
  console.log(nameElement)
  console.log(populationElement)
  console.log(buttonElement)
  buttonElement.disabled = true;

  addEventListener('input', event => {
    // Checkar att användaren skriver in något i de 3 fälten
    if(idElement.value !== '' && nameElement.value !== '' && populationElement.value !== '') {
      // Checkar så att det är rätt typ av sträng de skriver in
      if(nameInput = /[a-öA-Ö]+/g.exec(nameElement.value) !== null &&
         (idInput = /[a-öA-Ö0-9-][^%/£/$}!" ]+/.exec(idElement.value) !== null &&
         (populationInput = /[0-9]{1,13}/.exec(populationElement.value)) !== null)){

          buttonElement.disabled = false;
          buttonElement.onclick = () => {
            //Denna kollar om det användaren skriver in stämmer överrens med API:ET
          CityChange({id: idElement.value, name: nameElement.value, population: populationElement.value});

          }
      }
      else {
        buttonElement.disabled = true;
      }
    }
    else {
      buttonElement.disabled = true;
    }
  })

  if(idElement.value !== '') {
    console.log("sant")
  }
}

async function CityChange(cityObject) {

  let response = await fetch('https://avancera.app/cities')
  let result = await response.json();
  const cities = result;

  sessionStorage.setItem('citys', JSON.stringify(result));
  console.log(JSON.parse(sessionStorage.getItem('citys')))

  for(let i = 0; i < cities.length; i++) {
    if(cities[i].id === cityObject.id)
    {
      console.log('https://avancera.app/cities/' + cityObject.id + '?cityList=' + sessionStorage.getItem('citys'))

      fetch('https://avancera.app/cities/' + cityObject.id + '?cityList=' + sessionStorage.getItem('citys'), {

      body: JSON.stringify({id: cityObject.id, name: cityObject.name, population: Number(cityObject.population)}),

      headers: {
        'Content-Type': 'application/json'
      },

      method: 'PUT'
      })
      .then(response => console.log(response))
      alert("Uppdateras!")
      break;
    }
    else if (i === cities.length - 1 && cities[i].id !== cityObject.id) {
      alert("Fel ID!")
    }
  }
}


async function FetchCitiesHTML () {
  let response = await fetch('https://avancera.app/cities')
  let result = await response.json();
  const cities = result;

  let citiesContainer = document.querySelector('#cocktail-container')
  for(let i = 0; i < cities.length; i++) {
    let cardElement = document.createElement('div')
    cardElement.classList.add("cocktail-item")
    cardElement.setAttribute('id', (i + 1));
    console.log(cardElement.getAttribute('id'))

    cardElement.innerHTML = `
        <div class="cocktail-header">
          <div class="header-text-container"><h2 id="header-cocktail">${cities[i].name}</h2></div>
        </div>
        <div class="cocktail-main">
        </div>
        <div class="cocktail-footer">
          <p class="text-cocktail-footer">${cities[i].population}</p>
        </div>
    `
    citiesContainer.appendChild(cardElement);
  }
  console.log(cities)
}
