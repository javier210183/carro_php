const itemWidth = 120; // Ancho de cada elemento
const cartItemsWrapper = document.getElementById('cart_items'); 
const btnPrev = document.getElementById('btn_prev');
const btnNext = document.getElementById('btn_next');

// Usamos MutationObserver en lugar de eventos obsoletos
const observer = new MutationObserver(() => {
    updateButtons(); // Cada vez que se inserta o elimina un nodo, se actualizan los botones
});

observer.observe(cartItemsWrapper, { childList: true });

window.addEventListener('DOMContentLoaded', () => {
    updateButtons(); // Llamada inicial para ajustar el estado de los botones
});

btnPrev.addEventListener('click', () => {
    cartItemsWrapper.scrollBy({ left: -itemWidth, behavior: 'smooth' });
    setTimeout(updateButtons, 300);
});

btnNext.addEventListener('click', () => {
    cartItemsWrapper.scrollBy({ left: itemWidth, behavior: 'smooth' });
    setTimeout(updateButtons, 300);
});

function updateButtons() {
    const maxScrollLeft = cartItemsWrapper.scrollWidth - cartItemsWrapper.clientWidth;

    if (cartItemsWrapper.scrollLeft <= 0) {
        btnPrev.disabled = true;
    } else {
        btnPrev.disabled = false;
    }

    if (cartItemsWrapper.scrollLeft >= maxScrollLeft) {
        btnNext.disabled = true;
    } else {
        btnNext.disabled = false;
    }

    if (cartItemsWrapper.scrollWidth <= cartItemsWrapper.clientWidth) {
        btnPrev.disabled = true;
        btnNext.disabled = true;
    }
}
