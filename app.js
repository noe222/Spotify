document.addEventListener('DOMContentLoaded', () => {
    // Variables globales
    let isLoggedIn = false;
    let textos = {};
    let usuarios = [];
    let canciones = [];

    // Elementos del DOM
    const modalLogin = document.getElementById('modal-login');
    const loginForm = document.getElementById('login-form');
    const btnLoginHeader = document.getElementById('btn-login-header');
    const btnCrearLista = document.getElementById('btn-crear-lista');
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    const errorEmail = document.getElementById('error-email');
    const errorPassword = document.getElementById('error-password');
    const errorGeneral = document.getElementById('error-general');
    const btnContinuar = document.getElementById('btn-continuar');


    async function cargarTextos() {
        try {
            const response = await fetch('textos.json');
            textos = await response.json();
            aplicarTextos();
        } catch (error) {
            console.error('Error al cargar textos:', error);
        }
    }

    async function cargarUsuarios() {
        try {
            const response = await fetch('usuarios.json');
            const data = await response.json();
            usuarios = data.usuarios;
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
        }
    }

    async function cargarCanciones() {
        try {
            const response = await fetch('canciones.json');
            const data = await response.json();
            canciones = data.canciones;
            renderizarCanciones();
        } catch (error) {
            console.error('Error al cargar canciones:', error);
        }
    }

    function aplicarTextos() {
        document.getElementById('modal-titulo').textContent = textos.titulo || 'Iniciar sesión en Spotify';
        document.getElementById('label-email').textContent = textos.emailLabel || 'Correo electrónico';
        document.getElementById('label-password').textContent = textos.passwordLabel || 'Contraseña';
        emailInput.placeholder = textos.emailPlaceholder || 'Introduce tu correo electrónico';
        passwordInput.placeholder = textos.passwordPlaceholder || 'Introduce tu contraseña';
        btnContinuar.textContent = textos.botonContinuar || 'Continuar';
    }


    function renderizarCanciones() {
        const cardsGrid = document.querySelector('.content-section:first-child .cards-grid');
        if (!cardsGrid) return;

        cardsGrid.innerHTML = '';

        canciones.forEach((cancion, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-image">
                    <img src="${cancion.imagen}" alt="${cancion.titulo}">
                    <button class="play-btn btn-play-song" data-index="${index}"></button>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${cancion.titulo}</h3>
                    <p class="card-subtitle">${cancion.artista}</p>
                </div>
            `;
            cardsGrid.appendChild(card);
        });

        document.querySelectorAll('.btn-play-song').forEach(btn => {
            btn.addEventListener('click', abrirModal);
        });
    }

    function abrirModal() {
        modalLogin.classList.add('active');
        limpiarErrores();
    }

    function cerrarModal() {
        modalLogin.classList.remove('active');
        limpiarErrores();
        emailInput.value = '';
        passwordInput.value = '';
    }

    function limpiarErrores() {
        errorEmail.textContent = '';
        errorPassword.textContent = '';
        errorGeneral.textContent = '';
        emailInput.style.borderColor = '';
        passwordInput.style.borderColor = '';
    }

    function validarCampos() {
        let valido = true;
        limpiarErrores();

        if (!emailInput.value.trim()) {
            errorEmail.textContent = textos.errorCamposVacios || 'Por favor, completa todos los campos';
            emailInput.style.borderColor = '#f55';
            valido = false;
        }

        if (!passwordInput.value.trim()) {
            errorPassword.textContent = textos.errorCamposVacios || 'Por favor, completa todos los campos';
            passwordInput.style.borderColor = '#f55';
            valido = false;
        }

        return valido;
    }

    function verificarCredenciales(email, password) {
        return usuarios.some(usuario => 
            usuario.email.toLowerCase() === email.toLowerCase() && 
            usuario.password === password
        );
    }

    function iniciarSesion() {
        if (!validarCampos()) return;

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (verificarCredenciales(email, password)) {

            isLoggedIn = true;
            cerrarModal();
            actualizarBotonLogin();
        } else {

            errorGeneral.textContent = textos.errorCredenciales || 'Correo electrónico o contraseña incorrectos';
        }
    }

    function cerrarSesion() {
        isLoggedIn = false;
        actualizarBotonLogin();
    }

    function actualizarBotonLogin() {
        if (isLoggedIn) {
            btnLoginHeader.textContent = textos.botonCerrarSesion || 'Cerrar sesión';
            btnLoginHeader.onclick = cerrarSesion;
        } else {
            btnLoginHeader.textContent = textos.botonIniciarSesion || 'Iniciar sesión';
            btnLoginHeader.onclick = abrirModal;
        }
    }


    btnLoginHeader.addEventListener('click', () => {
        if (isLoggedIn) {
            cerrarSesion();
        } else {
            abrirModal();
        }
    });

    btnCrearLista.addEventListener('click', abrirModal);

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        iniciarSesion();
    });

    modalLogin.addEventListener('click', (e) => {
        if (e.target === modalLogin) {
            cerrarModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalLogin.classList.contains('active')) {
            cerrarModal();
        }
    });

    async function init() {
        await Promise.all([cargarTextos(), cargarUsuarios(), cargarCanciones()]);
        actualizarBotonLogin();
    }

    init();
});