// Máscara para telefone
$(document).ready(() => {
    $('#telefone').mask('(00) 00000-0000');
  });
  

  document.getElementById('cadastroForm').addEventListener('submit', async function (event) {
    event.preventDefault(); 

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();    
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    if (!nome) {
      alert('O campo "Nome" é obrigatório.');
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Insira um email válido.');
      return;
    }
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }
  
    try {
      const response = await fetch('usuario/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, telefone, senha }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        window.location.href = '/login'; 
      } else {
        alert(data.message || 'Erro ao realizar cadastro.');
      }
    } catch (error) {
      console.error('Erro ao realizar a requisição:', error);
      alert('Erro ao realizar cadastro. Tente novamente mais tarde.');
    }
  });
