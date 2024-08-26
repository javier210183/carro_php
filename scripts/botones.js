

// Selecciona los elementos del DOM que necesitamos
const container = document.querySelector('#item_container');
//console.log(container);
const articles = document.querySelectorAll('.article');
//console.log(articles);
const prevButton = document.querySelector('#btn_prev');
const nextButton = document.querySelector("#btn_next");
//const rangeInput = document.querySelector('input[type="range"]');

// Establece el índice actual de la página en 0
let currentPageIndex = 0;

// Muestra los artículos en la página actual
function showCurrentPage() {
// Oculta todos los artículos primero
articles.forEach(article => {
article.style.display = 'none';
});
// Agrega manejadores de eventos a los botones de dirección
/*prevButton.addEventListener('click', () => {
  // Verifica que el índice actual no sea 0 antes de disminuirlo
  if (currentPageIndex > 0) {
    currentPageIndex--;
    showCurrentPage();
  }
});*/

/*nextButton.addEventListener('click', () => {
  // Verifica que el índice actual no sea el último antes de aumentarlo
  if (currentPageIndex < Math.ceil(articles.length / 10) - 1) {
    currentPageIndex++;
    showCurrentPage();
  }
  currentPageIndex++;
  console.log(currentPageIndex);
  carrito.style.left=currentPageIndex*(-50);

});*/


// Muestra solo los artículos en la página actual
const startIndex = currentPageIndex * 10;
const endIndex = startIndex + 10;

for (let i = startIndex; i < endIndex && i < articles.length; i++) {
articles[i].style.display = 'block';
}
}

// Establece el estado inicial de la página
showCurrentPage();

// Agrega manejadores de eventos a los botones de dirección
prevButton.addEventListener('click', () => {
if (currentPageIndex > 0) {
currentPageIndex--;
showCurrentPage();
}
});

nextButton.addEventListener('click', () => {
if (currentPageIndex < Math.ceil(articles.length / 10) - 1) {
currentPageIndex++;
showCurrentPage();
}
});

