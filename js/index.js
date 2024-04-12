//Fetching data that i will use to display on the page
const baseUrl = 'http://localhost:3000/drinks';

document.addEventListener('DOMContentLoaded', () => {
  fetchCocktails();
  const form = document.querySelector('#search-form');
  form.addEventListener('submit' , (e) => {

    e.preventDefault()
    const input = document.querySelector('#search')
    if (input.value) {
      fetchCocktails(input.value);
    }
  });
});

function fetchCocktails(searchResult = '') {
  fetch(`${baseUrl}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((cocktails) => {
     
      document.querySelector('#cocktail').innerHTML = '';
      
      if (searchResult) {
       


         cocktails
            .filter((cocktails) =>
            cocktails.title.toLowerCase()
                  .includes(searchResult.toLowerCase())
            )
     .forEach((cocktails) => renderCocktails(cocktails));
    } else {
        cocktails.forEach((cocktails) => renderCocktails(cocktails));
      }
    })   
    .catch((err) => console.log(err));
}

function renderCocktails(cocktails) {
  const cocktailContainer = document.querySelector('#cocktail');
  const cocktailList = document.createElement('div');
  cocktailList.classList.add('card')

  const image = document.createElement('img');
  image.classList.add('card-img-top', 'mt-2');
  image.height = 200;
  image.src = cocktails.strDrinkThumb;
  // image.alt = cocktails.strDrink;
  image.style.display = 'block';
  image.style.unicodeBidi = 'isolate';

  cocktailList.appendChild(image);

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const title = document.createElement('h5');
  title.classList.add('card-title');
  title.textContent = cocktails.strDrink;

  const description = document.createElement('p');
  description.classList.add('card-text');
  description.textContent = cocktails.strInstructions;

  const button = document.createElement('button');
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Order Now';

  
  cardBody.append(title, description, button);
  cocktailList.appendChild(cardBody);

    //Calling the function to display the data on the page
  cocktailContainer.appendChild(cocktailList);

}


