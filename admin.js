const supplierData = [
  { name: "SpiceVilla", product: "Masala Pack", approved: false },
  { name: "FreshFarm", product: "Tomatoes", approved: true },
  { name: "GrainTrust", product: "Wheat Flour", approved: false },
];

const table = document.getElementById("supplierTable");

function renderTable() {
  table.innerHTML = "";
  supplierData.forEach((s, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td class="border px-4 py-2">${s.name}</td>
      <td class="border px-4 py-2">${s.product}</td>
      <td class="border px-4 py-2 ${s.approved ? 'text-green-600' : 'text-red-600'}">
        ${s.approved ? "Approved" : "Pending"}
      </td>
      <td class="border px-4 py-2">
        <button onclick="toggleApproval(${index})" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
          ${s.approved ? "Revoke" : "Approve"}
        </button>
      </td>
    `;

    table.appendChild(tr);
  });
}

function toggleApproval(index) {
  supplierData[index].approved = !supplierData[index].approved;
  renderTable();
}

renderTable();
