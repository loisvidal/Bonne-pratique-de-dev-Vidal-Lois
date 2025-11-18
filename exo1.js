const products = [
  { name: 'Clavier gaming', price: 79, inStock: true, onSale: false },
  { name: 'Souris sans fil', price: 49, inStock: true, onSale: true },
  { name: 'Écran 27"', price: 249, inStock: false, onSale: true },
  { name: 'Casque audio', price: 129, inStock: true, onSale: false }
];

const listEl = document.querySelector('#products-list');
const emptyStateEl = document.querySelector('#empty-state');

function render(filterFn, emptyMsg) {
  const filtered = products.filter(filterFn);
  listEl.innerHTML = '';

  if (filtered.length === 0) {
    emptyStateEl.textContent = emptyMsg;
    emptyStateEl.style.display = 'block';
    return;
  }

  emptyStateEl.style.display = 'none';

  filtered.forEach(p => {
    listEl.innerHTML += `
      <li class="product-card">
        <h3>${p.name}</h3>
        <p>Prix : ${p.price} €</p>
      </li>
    `;
  });
}

document.querySelector('#show-all-btn').onclick = () =>
  render(() => true, "Aucun produit à afficher.");

document.querySelector('#in-stock-btn').onclick = () =>
  render(p => p.inStock, "Aucun produit en stock.");

document.querySelector('#on-sale-btn').onclick = () =>
  render(p => p.onSale, "Aucun produit en promotion.");
