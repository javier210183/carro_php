'use strict';

let timerId;

const cambiarColorFondoCarrito = () => {
    const carrito = document.getElementById('cart_items');
    const carrito_toolbar = document.getElementById('cart_toolbar');
    const carritoVacio = carrito.children.length === 0;
    const nuevoColor = carritoVacio ? 
        (carrito.style.backgroundColor === 'red' ? 'yellow' : 'red') : 
        carrito.style.backgroundColor;
    
    carrito.style.backgroundColor = nuevoColor;
    carrito_toolbar.style.backgroundColor = nuevoColor;
};

const iniciarParpadeoColorFondoCarrito = () => {
    if (timerId) clearInterval(timerId);
    timerId = setInterval(cambiarColorFondoCarrito, 1000);
};

const detenerParpadeoColorFondoCarrito = () => {
    if (timerId) clearInterval(timerId);
};

// Obtener la referencia al carrito antes de usarla
const carrito = document.getElementById('cart_items');

// Configurar MutationObserver para observar cambios en el carrito
const cartObserver = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            if (mutation.addedNodes.length > 0) {
                detenerParpadeoColorFondoCarrito();
            }
            if (mutation.removedNodes.length > 0) {
                iniciarParpadeoColorFondoCarrito();
            }
        }
    }
});

// Configurar el observador para escuchar los cambios en los nodos hijos
cartObserver.observe(carrito, { childList: true });

window.addEventListener('load', iniciarParpadeoColorFondoCarrito);
