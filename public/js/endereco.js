document.getElementById('novoEnderecoBtn').addEventListener('click', () => {
    const form = document.getElementById('novoEnderecoForm');
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }

    document.getElementById('editarEnderecoForm').style.display = 'none';
});

async function listarEnderecos() {
    try {
        const response = await fetch('/endereco/listar');
        const enderecos = await response.json();
        const tbody = document.getElementById('enderecosTable').querySelector('tbody');
        tbody.innerHTML = ''; 

        enderecos.forEach(endereco => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${endereco.rua}</td>
                <td>${endereco.numero}</td>
                <td>${endereco.bairro}</td>
                <td>${endereco.cidade}</td>
                <td>${endereco.estado}</td>
                <td>${endereco.cep}</td>
                <td>${endereco.tipo_endereco}</td>
                <td>
                    <button class="btn btn-info" onclick="editarEndereco(${endereco.id})">
                        <i class="bi bi-pencil-square"></i> Editar
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao listar endereços', error);
    }
}

async function editarEndereco(id) {
    try {
        const response = await fetch(`/endereco/${id}`);
        const endereco = await response.json();

        document.getElementById('editarEnderecoId').value = endereco.id;
        document.getElementById('editarRua').value = endereco.rua;
        document.getElementById('editarNumero').value = endereco.numero;
        document.getElementById('editarBairro').value = endereco.bairro;
        document.getElementById('editarCidade').value = endereco.cidade;
        document.getElementById('editarEstado').value = endereco.estado;
        document.getElementById('editarCep').value = endereco.cep;
        document.getElementById('editarTipoEndereco').value = endereco.tipo_endereco;

        document.getElementById('novoEnderecoForm').style.display = 'none';
        document.getElementById('editarEnderecoForm').style.display = 'block';
    } catch (error) {
        console.error('Erro ao editar endereço', error);
    }
}


document.getElementById('formEditarEndereco').addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = document.getElementById('editarEnderecoId').value;
    const endereco = {
        rua: document.getElementById('editarRua').value,
        numero: document.getElementById('editarNumero').value,
        bairro: document.getElementById('editarBairro').value,
        cidade: document.getElementById('editarCidade').value,
        estado: document.getElementById('editarEstado').value,
        cep: document.getElementById('editarCep').value,
        tipo_endereco: document.getElementById('editarTipoEndereco').value,
    };

    try {
        const response = await fetch(`/endereco/editar/${id}`, {
            method: 'PUT',            
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(endereco),
        });
        const result = await response.json();
        alert(result.message);
        listarEnderecos(); 
        document.getElementById('editarEnderecoForm').style.display = 'none'; 
    } catch (error) {
        console.error('Erro ao atualizar endereço', error);
    }
});

document.getElementById('formEndereco').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const endereco = {
        rua: document.getElementById('rua').value,
        numero: document.getElementById('numero').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        cep: document.getElementById('cep').value,
        tipo_endereco: document.getElementById('tipo_endereco').value,
    };

    try {
        const response = await fetch('/endereco/cadastrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(endereco)
        });
        const result = await response.json();
        alert(result.message);
        listarEnderecos(); 
        document.getElementById('formEndereco').style.display = 'none'; 
    } catch (error) {
        console.error('Erro ao cadastrar o endereço', error);
    }
});


listarEnderecos();
