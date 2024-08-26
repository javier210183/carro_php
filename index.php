<?php
$productos = 
[
    [
        "id"=>"i1",
        "title"=>"Camiseta 1",
        "price"=>20.0,
        "stock"=>3,
        "img_url"=>"img/camiseta1.jpg",
        "img_desc"=>"descripción i1"
    ],
    [
        "id"=>"i2",
        "title"=>"Reloj 2",
        "price"=>24.0,
        "stock"=>4,
        "img_url"=>"img/reloj2.jpg",
        "img_desc"=>"descripción i2"
    ],
    [
        "id"=>"i3",
        "title"=>"Dart Vader",
        "price"=>120.0,
        "stock"=>2,
        "img_url"=>"img/darvater.jpg",
        "img_desc"=>"descripción i3"
    ],
    [
        "id"=>"i4",
        "title"=>"Camiseta",
        "price"=>26.0,
        "stock"=>3,
        "img_url"=>"img/camiseta10.jpg",
        "img_desc"=>"descripción i4"
    ],
    [
        "id"=>"i5",
        "title"=>"Reloj 5",
        "price"=>28.0,
        "stock"=>2,
        "img_url"=>"img/reloj5.jpg",
        "img_desc"=>"descripción i5"  
    ],
];

function filter_products($products, $title, $price_min, $price_max) {
    $filtered_products = [];

    foreach ($products as $product) {
        $title_match = empty($title) || strpos(strtolower($product["title"]), strtolower($title)) !== false;
        $price_match = $product["price"] >= $price_min && $product["price"] <= $price_max;

        if ($title_match && $price_match) {
            $filtered_products[] = $product;
        }
    }

    return $filtered_products;
}

if (isset($_POST['submit'])) {
    $title = isset($_POST['search_title']) ? $_POST['search_title'] : '';
    $price_min = isset($_POST['price_min']) ? floatval($_POST['price_min']) : 0;
    $price_max = isset($_POST['price_max']) ? floatval($_POST['price_max']) : INF;

    // Debugging: Verifica los valores que se están enviando
    echo "<script>console.log('Título buscado: " . $title . "');</script>";
    echo "<script>console.log('Precio mínimo: " . $price_min . "');</script>";
    echo "<script>console.log('Precio máximo: " . $price_max . "');</script>";

    $productos = filter_products($productos, $title, $price_min, $price_max);
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <title>Carro de la compra con Javascript</title>
    <meta charset="utf-8">
    <link rel="stylesheet" title="normal" href="css/carro.css" type="text/css" media="screen" >
</head>
<body>
    <div id="item_container">
    <?php
        foreach($productos as $producto){
            echo '<div class="item" id="'. $producto['id'] .'" data-original-stock="'. $producto['stock'] .'">';
            echo '<img src="'. $producto['img_url'] .'" alt="'. $producto['img_desc'] .'">';
            echo '<span class="title">'. $producto['title'] .'</span>';
            echo '<span class="price">'. $producto['price'] .' €</span>';
            echo '<span class="stock">'. $producto['stock'] .' en stock</span>';
            echo '</div>';
        }
        ?>

    </div>
    <div class="clear"></div>
    <div id="cart"></div>

	</div>
	<div class="clear"></div>
	<div id="cart_container">
		<div id="cart_title">
			<span>Carrito</span>
			<div class="clear"></div>
		</div>
		<div id="cart_toolbar">
			<div id="cart_items" class="back"></div>
		</div>
		<div class="navigate">
			<div id="nav_left">
				<button id="btn_comprar" title="Confirma la compra de los artículos">Comprar</button>
				<button id="btn_prev" title="Desplaza el carrito hacia la izquierda">&lt;</button>
				<button id="btn_next" title="Desplaza el carrito hacia la derecha">&gt;</button>
				<button id="btn_clear" title="Vacia el carrito">Vaciar</button>
			</div>
			<div id="nav_right">
				<span class="sptext">
					<label>Compras </label><input id="citem" value="0" readonly title="Número de productos comprados">
				</span>
				<span class="sptext">
					<label>Precio </label><input id="cprice" value="0 €" readonly  title="Precio total de los productos comprados">
				</span>
			</div>
			<div class="clear"></div>
      <form method="post" action="">
        <label  for="search_title">Buscar por título:</label>
        <input type="text" id="search_title" name="search_title" value="<?php echo isset($_POST['search_title']) ? $_POST['search_title'] : '' ?>">

        <label id="mine" for="price_min"> Precio mínimo:</label>
        <input type="number" id="price_min" name="price_min" step="0.01" min="0" value="<?php echo isset($_POST['price_min']) ? $_POST['price_min'] : '' ?>">

        <label for="price_max">Precio máximo:</label>
        <input type="number" id="price_max" name="price_max" step="0.01" min="0" value="<?php echo isset($_POST['price_max']) ? $_POST['price_max'] : '' ?>">


        <input type="submit" name="submit" value="Buscar">
      </form>
		</div>
		<div id="cart">
			<div id="cart_items">
			  <!-- Aquí se agregarán los elementos del carrito -->
			</div>
	</div>
	<script src="scripts/arrastrarItems.js"></script>
	<script src="scripts/cambiocolor.js"></script>
	<script src="scripts/botones.js"></script>
	<script src="scripts/movimiento.js"></script>
    <script>
        var productos = <?php echo json_encode($productos); ?>;
        console.log(productos);  // contenido del array en la consola
    </script>
</body>
</html>
