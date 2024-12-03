 async function getUserAddresses() {
    try {
        const response = await fetch('/endereco/listar', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Erro ao obter os endereços do usuário');
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function updateCartPage() {
    const user = await getUserInfo();
    const enderecoSection = document.getElementById('endereco-section');
    const paymentSection = document.getElementById('payment-section');
    const loginButton = document.getElementById('login-button');

    if (user) {
        loginButton.style.display = 'none';
        enderecoSection.style.display = 'block';
        paymentSection.style.display = 'block';

        const enderecos = await getUserAddresses();
        const enderecoList = document.getElementById('enderecos-list');

        if (enderecos.length > 0) {
            enderecos.forEach(endereco => {
                const card = document.createElement('div');
                card.className = 'card p-3';
                card.style.width = '18rem';
                card.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">${endereco.tipo_endereco}</h5>
                        <p class="card-text">
                            ${endereco.rua}, ${endereco.numero} <br>
                            ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado} <br>
                            CEP: ${endereco.cep}
                        </p>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="enderecoSelecionado" value="${endereco.id}">
                            <label class="form-check-label">Selecionar</label>
                        </div>
                    </div>
                `;
                enderecoList.appendChild(card);
            });
        } else {
            enderecoList.innerHTML = '<p>Nenhum endereço cadastrado.</p>';
        }
    } else {
        enderecoSection.style.display = 'none';
        paymentSection.style.display = 'none';
        loginButton.style.display = 'inline-block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartPage();

    const loginButton = document.getElementById('login-button');
    loginButton.addEventListener('click', () => {
        window.location.href = '/login';
    });
});

document.getElementById('finalize-order').addEventListener('click', async () => {
   
    const user = await getUserInfo();
    if (!user) {
        alert('Por favor, faça login para finalizar o pedido.');
        return;
    }

    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cartItems.length === 0) {
        alert('Seu carrinho está vazio.');
        return;
    }

    const enderecoSelecionado = document.querySelector('input[name="enderecoSelecionado"]:checked');
    if (!enderecoSelecionado) {
        alert('Por favor, selecione um endereço para entrega.');
        return;
    }

    const metodoPagamento = document.getElementById('payment-method').value;

    const pedidoData = {
        clienteId: user.id,
        itens: cartItems.map(item => ({
            produtoId: item.productId,
            quantidade: item.quantity,
            precoUnitario: item.productPrice
        })),
        enderecoId: enderecoSelecionado.value,
        metodoPagamento: metodoPagamento
    };

    try {
        console.log(pedidoData);
        const response = await fetch('/pedido', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(pedidoData)
        });

        if (response.ok) {
            const data = await response.json();
            alert(`Pedido finalizado com sucesso! ID do pedido: ${data.pedidoId}`);
            
            localStorage.removeItem('cart');
            window.location.reload();
        } else {
            const error = await response.json();
            alert(`Erro ao finalizar o pedido: ${error.message}`);
        }
    } catch (error) {
        console.error('Erro ao finalizar o pedido:', error);
        alert('Ocorreu um erro ao finalizar o pedido.');
    }
});

