fetch('/produtos')
  .then(response => response.json())
  .then(data => {
    const productList = document.getElementById('product-list');

    data.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('col', 'mb-5', 'product-card');

      productCard.setAttribute('data-category-id', product.categoria_id);

      productCard.innerHTML = `
        <div class="card h-100">
            <!-- Imagem do produto -->
            <img class="card-img-top" src="${product.imagem_url || 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg'}" alt="${product.nome}" />
            
            <!-- Corpo do cartão -->
            <div class="card-body p-4">
                <div class="text-center">
                    <h5 class="fw-bolder">${product.nome}</h5>
                    <p>${product.descricao}</p>
                    <p>r$${product.preco}</p>
                </div>
            </div>
            
            <!-- Rodapé com ações -->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                <div class="d-flex justify-content-between align-items-center">
                    <!-- Controle de quantidade -->
                    <div class="quantity-control d-flex align-items-center">
                        <button class="btn btn-outline-secondary btn-sm" onclick="decreaseQuantity(this)">-</button>
                        <span class="quantity-display mx-2">1</span>
                        <button class="btn btn-outline-secondary btn-sm" onclick="increaseQuantity(this)">+</button>
                    </div>
                    <!-- Botão de compra -->
                    <button class="btn btn-primary btn-sm" onclick="addProductToCart(${product.id}, '${product.nome}', ${product.preco}, this)">Comprar</button>
                </div>
            </div>
        </div>
      `;

      productList.appendChild(productCard);
    });
  })
  .catch(error => console.error('Erro ao carregar os produtos:', error));

function decreaseQuantity(button) {
  const quantityDisplay = button.nextElementSibling;
  let currentValue = parseInt(quantityDisplay.textContent);
  if (currentValue > 1) {
    currentValue -= 1;
    quantityDisplay.textContent = currentValue;
  }
}

function increaseQuantity(button) {
  const quantityDisplay = button.previousElementSibling;
  let currentValue = parseInt(quantityDisplay.textContent);
  currentValue += 1;
  quantityDisplay.textContent = currentValue;
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('/categorias')
        .then(response => response.json())
        .then(categorias => {
            const categoryFilter = document.getElementById('category-filter');
            categorias.forEach(categoria => {
                const option = document.createElement('option');
                option.value = categoria.id;
                option.textContent = categoria.descricao;
                categoryFilter.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao carregar categorias:', error));

    document.getElementById('category-filter').addEventListener('change', event => {
        const selectedCategory = event.target.value;
        const products = document.querySelectorAll('#product-list .product-card');

        products.forEach(product => {
            const productCategoryId = product.dataset.categoryId;
            if (selectedCategory === '' || productCategoryId === selectedCategory) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });

    document.getElementById('search-bar').addEventListener('input', event => {
        const searchTerm = event.target.value.toLowerCase();
        const products = document.querySelectorAll('#product-list .product-card');

        products.forEach(product => {
            const productName = product.querySelector('h5').textContent.toLowerCase();
            if (productName.includes(searchTerm)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
});