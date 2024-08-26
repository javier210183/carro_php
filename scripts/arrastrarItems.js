'use strict';

(function () {
    window.addEventListener('load', function (event) {
        const carrito = document.getElementById('cart_items');
        const items = document.querySelectorAll('.item');
        let moviendo = false;
        let selectedItem = null;

        // Función para actualizar el precio total y número de items del carrito
        const actualizarCarrito = () => {
            const itemsEnCarrito = carrito.querySelectorAll('.cart_item');
            let numItems = itemsEnCarrito.length;
            let precioTotal = 0;
            itemsEnCarrito.forEach(item => {
                const precioString = item.querySelector('.price').textContent;
                const precio = parseFloat(precioString.substring(0, precioString.length - 2));
                precioTotal += precio;
            });
            document.getElementById('cprice').value = precioTotal.toFixed(2) + ' €';
            document.getElementById('citem').value = numItems;
        };

        // Función para vaciar el carrito y restablecer el stock original
        const vaciarCarrito = () => {
            const itemsEnCarrito = carrito.querySelectorAll('.cart_item');
            itemsEnCarrito.forEach(item => {
                item.remove();
            });

            // Restablecer el stock original de todos los artículos
            const itemsOriginales = document.querySelectorAll('#item_container .item');
            itemsOriginales.forEach(item => {
                const originalStock = item.getAttribute('data-original-stock');
                const stockElement = item.querySelector('.stock');
                stockElement.textContent = originalStock + ' en stock';

                // Remover la clase 'agotado' si estaba presente
                item.classList.remove('agotado');
                item.style.pointerEvents = ''; // Reactivar la interacción
            });

            actualizarCarrito(); // Actualizar el carrito después de vaciar
        };

        // Función para eliminar un artículo individual del carrito
        const eliminarItemDelCarrito = (event) => {
            const item = event.target.parentElement; // Eliminar el elemento padre del botón "x"
            const originalItemId = item.getAttribute('data-original-id');
            const originalItem = document.getElementById(originalItemId);
            const stockElement = originalItem.querySelector('.stock');
            let stock = parseInt(stockElement.textContent.match(/\d+/)[0]);

            // Incrementar el stock en la tarjeta del producto original
            stock++;
            stockElement.textContent = stock + ' en stock';
            originalItem.classList.remove('agotado');
            originalItem.style.pointerEvents = '';

            // Eliminar el artículo del carrito
            item.remove();
            actualizarCarrito(); // Actualizar el carrito
        };

        items.forEach(item => {
            item.addEventListener('mousedown', (event) => {
                moviendo = true;

                // Crear un contenedor para el artículo en el carrito
                selectedItem = document.createElement('div');
                selectedItem.classList.add('cart_item');
                selectedItem.setAttribute('data-original-id', item.id);

                // Clonar y agregar los elementos necesarios
                const imgClone = item.querySelector('img').cloneNode();
                const titleClone = item.querySelector('.title').cloneNode(true);
                const priceClone = item.querySelector('.price').cloneNode(true);

                // Crear y agregar el botón "x" para eliminar
                const removeButton = document.createElement('span');
                removeButton.textContent = 'x';
                removeButton.classList.add('remove-button');
                removeButton.addEventListener('click', eliminarItemDelCarrito);

                // Armar el contenedor del artículo en el carrito
                selectedItem.appendChild(removeButton);
                selectedItem.appendChild(imgClone);
                selectedItem.appendChild(titleClone);
                selectedItem.appendChild(priceClone);

                // Posicionar para arrastrar
                selectedItem.style.position = 'absolute';
                selectedItem.style.left = event.pageX - 10 + 'px';
                selectedItem.style.top = event.pageY - 10 + 'px';
                selectedItem.style.zIndex = 1000;
                document.body.appendChild(selectedItem);
            });

            document.addEventListener('mousemove', (event) => {
                if (moviendo && selectedItem) {
                    selectedItem.style.left = event.pageX - 10 + 'px';
                    selectedItem.style.top = event.pageY - 10 + 'px';
                }
            });

            document.addEventListener('mouseup', (event) => {
                if (moviendo && selectedItem) {
                    const rectCarrito = carrito.getBoundingClientRect();
                    const rectItem = selectedItem.getBoundingClientRect();
                    if (rectItem.left >= rectCarrito.left && 
                        rectItem.left <= rectCarrito.right && 
                        rectItem.top >= rectCarrito.top && 
                        rectItem.top <= rectCarrito.bottom) {

                        const originalItem = document.getElementById(selectedItem.getAttribute('data-original-id'));
                        const stockElement = originalItem.querySelector('.stock');
                        let stock = parseInt(stockElement.textContent.match(/\d+/)[0]);

                        if (stock > 0) {
                            stock--;
                            stockElement.textContent = stock + ' en stock';

                            if (stock === 0) {
                                originalItem.classList.add('agotado');
                                originalItem.style.pointerEvents = 'none';
                            }

                            // Añadir el artículo al carrito
                            selectedItem.style.position = 'relative';
                            selectedItem.style.left = '0px';
                            selectedItem.style.top = '0px';
                            carrito.appendChild(selectedItem);
                            actualizarCarrito();
                        } else {
                            selectedItem.remove();
                        }
                    } else {
                        selectedItem.remove();
                    }
                    moviendo = false;
                    selectedItem = null;
                }
            });
        });

        const btnVaciar = document.getElementById('btn_clear');
        btnVaciar.addEventListener('click', vaciarCarrito);
    });
})();
