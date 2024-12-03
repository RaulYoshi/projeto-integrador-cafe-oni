async function listarPedidos() {
    try {
        const response = await fetch('/pedido/listar');
        const pedidos = await response.json();
        const tbody = document.getElementById('pedidosTable').querySelector('tbody');
        tbody.innerHTML = ''; 

        pedidos.forEach(pedido => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${pedido.id}</td>
                <td>${new Date(pedido.data_pedido).toLocaleDateString()}</td>
                <td>r$ ${pedido.total}</td>
                <td>${pedido.status}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao listar pedidos', error);
    }
}

document.addEventListener('DOMContentLoaded', listarPedidos);