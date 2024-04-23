const loadDrinks = (searchText) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`;
  //   console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDrinks(data.drinks));
};

const displayDrinks = (drinks) => {
  //   console.log(drinks);
  const cocktailContainer = document.getElementById("cocktail-container");
  cocktailContainer.textContent = "";
  drinks.forEach((drink) => {
    // console.log(drink);
    const drinksDiv = document.createElement("div");
    drinksDiv.classList.add("col");
    drinksDiv.innerHTML = `
    <div class="card">
    <img src="${drink.strDrinkThumb}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${drink.strDrink}</h5>
      <p class="card-text">${drink.strAlcoholic}</p>
      <p class="card-text">${drink.strCategory}</p>
      <p class="card-text">${drink.strGlass}</p>
      <p class="card-text">
        ${drink.strInstructions.slice(0, 120)}
      </p>
      <button onclick="loadDrinksDetails('${
        drink.idDrink
      }')" class="btn btn-success">Details</button>
    </div>
  </div>
    `;
    cocktailContainer.appendChild(drinksDiv);
  });
};

const searchDrinks = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  //   console.log(searchText);
  loadDrinks(searchText);
  searchField.value = "";
};

const loadDrinksDetails = (idDrink) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
  //   console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDrinksDetails(data.drinks[0]));
};

const displayDrinksDetails = (drink) => {
  const drinkDetails = document.getElementById("drink-details");
  drinkDetails.textContent = "";
  //   console.log(drink);
  const drinksDiv = document.createElement("div");
  drinksDiv.classList.add("card");
  drinksDiv.innerHTML = `
  <img src="${drink.strDrinkThumb}" class="card-img-top" alt="..." />
<div class="card-body">
<h5 class="card-title">${drink.strDrink}</h5>
<p class="card-text">${drink.strAlcoholic}</p>
<p class="card-text">${drink.strCategory}</p>
<p class="card-text">${drink.strGlass}</p>
<p class="card-text">
  ${drink.strInstructions.slice(0, 120)}
</p>
</div>
`;
  drinkDetails.appendChild(drinksDiv);
};

loadDrinks("A");
