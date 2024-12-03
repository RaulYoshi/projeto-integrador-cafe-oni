document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('usuario/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        const data = await response.json();

        const cookies = document.cookie;
        console.log('Cookies recebidos:', cookies);

        if (response.ok) {

            document.getElementById('loginMessage').innerHTML = `<p class="text-success">${data.message}</p>`;
            
            localStorage.setItem('token', data.token);

            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        } else {
            document.getElementById('loginMessage').innerHTML = `<p class="text-danger">${data.message}</p>`;
        }
    } catch (error) {
        console.error('Erro durante o login:', error);
        document.getElementById('loginMessage').innerHTML = `<p class="text-danger">Erro ao realizar login. Tente novamente mais tarde.</p>`;
    }
});