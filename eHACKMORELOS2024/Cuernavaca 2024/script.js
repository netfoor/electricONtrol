document.addEventListener("DOMContentLoaded", function() {
    // Placeholder for any initialization code
});

function registerUser() {
    const serviceNumber = document.getElementById("service-number").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ serviceNumber, email, password })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function loginUser() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Inicio de sesión exitoso');
            // Redirigir a la página principal o cargar datos adicionales
        } else {
            alert('Inicio de sesión fallido');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
