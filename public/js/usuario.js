async function getUserInfo() {
    try {
      const response = await fetch('usuario/info', {
        method: 'GET',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const user = await response.json();  
        return user;
      } else {
        throw new Error('Erro ao obter as informações do usuário');
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async function updateUserInfo() {
    const user = await getUserInfo();
    const userNameElement = document.getElementById('userName');
    const userDropdownMenu = document.getElementById('userDropdownMenu');
    const userDropdownButton = document.getElementById('userDropdownButton');

    if (user) {
        userNameElement.textContent = user.nome; 
        userDropdownMenu.style.display = 'none';

        userDropdownButton.onclick = () => {
            const isDropdownVisible = userDropdownMenu.style.display === 'block';
            userDropdownMenu.style.display = isDropdownVisible ? 'none' : 'block';
        };
    } else {
        userNameElement.textContent = 'Login';
        userDropdownMenu.style.display = 'none'; 
        userDropdownButton.onclick = () => {
            window.location.href = '/login'; 
        };
    }
}
  
  updateUserInfo();