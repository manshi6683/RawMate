const form = document.getElementById('materialForm');
const tableBody = document.getElementById('materialsTable');

let materials = JSON.parse(localStorage.getItem('supplierMaterials')) || [];

function renderTable() {
  tableBody.innerHTML = "";

  materials.forEach((mat, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td class="p-3">${mat.name}</td>
      <td class="p-3">₹${mat.price}</td>
      <td class="p-3">${mat.quantity}</td>
      <td class="p-3">
        <button onclick="deleteMaterial(${index})" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const price = parseFloat(document.getElementById('price').value);
  const quantity = parseFloat(document.getElementById('quantity').value);

  if (name && price > 0 && quantity > 0) {
    materials.push({ name, price, quantity });
    localStorage.setItem('supplierMaterials', JSON.stringify(materials));
    form.reset();
    renderTable();
  }
});

function deleteMaterial(index) {
  materials.splice(index, 1);
  localStorage.setItem('supplierMaterials', JSON.stringify(materials));
  renderTable();
}

renderTable();
