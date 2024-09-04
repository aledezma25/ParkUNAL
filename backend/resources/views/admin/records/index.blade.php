@extends('layouts.app')

@section('css')
    <link href="https://cdn.datatables.net/2.1.3/css/dataTables.bootstrap5.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
@endsection

@section('content')

<div class="container">
    <h2>Gestión de visitantes</h2>
    <div class="row justify-content-center">
        <div class="">
            <div class="card">
                <div class="card-body">
                    <a href="/administrador" class="btn btn-primary">Regresar</a>
                    <a href="/recordsvisitor" class="btn btn-success">Nuevo visitante</a>
                    <table id="myTable" class="table table-striped table-bordered shadow-lg mt-4">
                        <thead class="table-success">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellido</th>
                                <th scope="col">Cédula</th>
                                <th scope="col">Teléfono</th>
                                <th scope="col">Hora de entrada</th>
                                <th scope="col">Vehículo</th>
                                <th scope="col">Color</th>
                                <th scope="col">Marca</th>
                                <th scope="col">Hora de salida</th>
                                <th scope="col">Placa</th>
                                {{-- <th scope="col">Acciones</th> --}}
                            </tr>
                        </thead>
                        <tbody id="visitorTableBody">
                            <!-- Los datos se llenarán aquí mediante JavaScript -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

@section('js')
<script src="https://code.jquery.com/jquery-3.7.1.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.datatables.net/2.1.3/js/dataTables.js"></script>
<script src="https://cdn.datatables.net/2.1.3/js/dataTables.bootstrap5.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', function () {
        // Fetch the data from the API
        fetch('http://localhost:3000/obtenerVisitors')
            .then(response => response.json())
            .then(data => {
                const tableBody = document.getElementById('visitorTableBody');

                // Clear any existing rows
                tableBody.innerHTML = '';

                // Populate the table with data
                data.forEach(record => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${record.id}</td>
                        <td>${record.name}</td>
                        <td>${record.lastName}</td>
                        <td>${record.documentNumber}</td>
                        <td>${record.phone}</td>
                        <td>${record.entryDate}</td>
                        <td>${record.typeVehicle}</td>
                        <td>${record.color}</td>
                        <td>${record.mark}</td>
                        <td>${record.exitDate}</td>
                        <td>${record.plate}</td>
                        
                       
                    `;
                    tableBody.appendChild(row);
                });

                // Initialize DataTables
                $('#myTable').DataTable({
                    "lengthMenu": [[5, 10, 20, 50, -1], [5, 10, 20, 50, "All"]],
                    "order": [[0, "desc"]],
                    "responsive": true
                });
            })
            .catch(error => console.error('Error al obtener los datos:', error));
    });
</script>
@endsection
@endsection
