<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <style>
        /* Estilos generales */
        body {
            font-family: 'Nunito', sans-serif;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        /* Estilos del footer */
        .footer {
            background-color: #2d3748;
            color: #e2e8f0;
            padding: 40px;
            font-size: 0.875rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 30px;
            border-top: 1px solid #4a5568;
        }

        .footer-content {
            max-width: 1200px;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: flex-start;
        }

        .footer .footer-title {
            font-size: 1.5rem;
            font-weight: bold;
            color: #94b43b;
            margin-bottom: 20px;
            text-align: center;
            width: 100%;
        }

        .developer-info,
        .supervisor-info,
        .contact-info {
            flex: 1;
            margin: 10px;
            min-width: 250px;
        }

        .developer-info strong,
        .supervisor-info strong {
            color: #94b43b;
            font-size: 1.125rem;
        }

        .contact-info p,
        .supervisor-info p,
        .developer-info p {
            margin: 5px 0;
            line-height: 1.5;
        }

        .footer a {
            color: #94b43b;
            text-decoration: none;
        }

        .footer a:hover {
            text-decoration: underline;
        }

        /* Redes sociales */
        .social-icons {
            display: flex;
            gap: 20px;
            margin-top: 15px;
            justify-content: center;
            width: 100%;
        }

        .social-icons a {
            color: #e2e8f0;
            font-size: 1.8rem;
            transition: color 0.3s ease;
        }

        .social-icons a:hover {
            color: #94b43b;
        }

        /* Derechos de autor */
        .copyright {
            font-size: 0.75rem;
            color: #718096;
            margin-top: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
        }

        .copyright svg {
            margin-left: 5px;
            width: 16px;
            height: 16px;
        }
    </style>

    <!-- Font Awesome para iconos de redes sociales -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        integrity="sha384-k6RqeWeci5ZR/Lv4MR0sA0FfDOMVZ9dE2XUR6UMuXppCezQJZEnYd/nEZ56Ow2OF" crossorigin="anonymous">
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free/css/all.min.css" rel="stylesheet">

</head>

<body>

    <!-- Footer Section -->
    <footer class="footer">


        <div class="footer-content">
            <!-- Developer Info -->
            <div class="developer-info">
                <strong>Desarrollado por:</strong><br> <b>Adrian Camilo Ledezma </b><br>
                <span>(Administrador de Sistemas Informáticos)</span><br>
                <br>
                <p>Director (a):
                    <b>Dra. Valentina Tabares Morales
                </p></b>
                <p>Codirector (a):
                    <b>Mgtr. Albeiro Montes Gil
                </p></b>
            </div>

            <!-- Supervisors Info -->
            <div class="supervisor-info">

                <p>Correo: <a href="mailto:aledezma@unal.edu.co">aledezma@unal.edu.co</a><br> Teléfono: <a
                        href="tel:+573167383112">316 738 3112</a></p>
                <br>
                <br>
                <br>
                <p>Universidad Nacional de Colombia - Sede Manizales</p>

            </div>

            <!-- Contact Info -->
            <div class="contact-info">
                <p>Para más información, puedes seguirnos en nuestras redes sociales:</p>
                <!-- Social Icons -->
                <div class="social-icons">
                    <a href="https://github.com/aledezma25" target="_blank" aria-label="GitHub">
                        <i class="fab fa-github-square"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/ac-chami/" target="_blank" aria-label="LinkedIn">
                        <i class="fab fa-linkedin"></i>
                    </a>
                    <a href="https://x.com/ac_ledezma" target="_blank" aria-label="Twitter">
                        <i class="fab fa-twitter-square"></i>
                    </a>
                    
                </div>
            </div>
        </div>



        <!-- Copyright -->
        <div class="copyright">
            &copy; {{ date('Y') }} Park UN. Todos los derechos reservados.
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1zM7 6v4h1V6H7zm2.5 1.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
        </div>
    </footer>

</body>

</html>
