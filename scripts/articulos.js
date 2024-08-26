const getArticulos = function() {
    return [
        {
            "id": "i1",
            "title": "Camiseta 1",
            "price": 20.0,
            "stock": 10,
            "img": {
                "url": "img/camiseta1.jpg",
                "desc": "descripción i1"
            }
        },
        {
            "id": "i2",
            "title": "Reloj 2",
            "price": 24.0,
            "stock": 12,
            "img": {
                "url": "img/reloj2.jpg",
                "desc": "descripción i2"
            }
        },
        // Otros artículos...
    ];
};

const mis_articulos = getArticulos();
const contenedorDeArticulos = document.getElementById('item_container');

mis_articulos.forEach(articulo => {
    const htmlString = `
        <div class='item' id="${articulo.id}">
            <img src='${articulo.img.url}' alt='${articulo.img.desc}'>
            <label class='title'>${articulo.title}</label>
            <label class='price'>${articulo.price} €</label>
            <label class='stock'>Stock ${articulo.stock}</label>
        </div>`;
    contenedorDeArticulos.insertAdjacentHTML('beforeend', htmlString);
});
