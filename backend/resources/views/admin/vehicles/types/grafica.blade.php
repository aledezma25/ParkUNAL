<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">

    <!-- Incluye el CDN de Plotly -->
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>

    <title>Gráfico de Pastel - Distribución de Categorías</title>
    <style>
        body {
            padding: 20px;
            background-color: #f8f9fa;
            /* Color de fondo Bootstrap */
        }

        .container {
            background-color: #ffffff;
            /* Color de fondo del contenedor Bootstrap */
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            /* Sombra Bootstrap */
        }
    </style>
</head>

<body>
    <div class="container">
        <a href="{{ route('administrador') }}" class="btn btn-primary">Regresar</a>
        <br>
        <br>

        <h1>Gráfico de Pastel - Distribución de Categorías</h1>

        <div id="pie-chart"></div>

        <script>
            // Recupera los datos del controlador
            var categories = @json($categoriesWithCount->pluck('name')->toArray());
            var productCount = @json($categoriesWithCount->pluck('products_count')->toArray());

            // Configuración del gráfico de pastel
            var data = [{
                labels: categories,
                values: productCount,
                type: 'pie'
            }];

            var layout = {
                title: 'Distribución de Productos por Categoría'
            };

            // Crea el gráfico de pastel
            Plotly.newPlot('pie-chart', data, layout);
        </script>
    </div>
</body>

</html>
