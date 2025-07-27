const products = [
  { name: "Tomatoes", price: 25, supplier: "FreshFarm", rating: 4.5 },
  { name: "Onions", price: 20, supplier: "OrganicKart", rating: 4.2 },
  { name: "Flour", price: 35, supplier: "GrainTrust", rating: 4.8 },
  { name: "Spices Pack", price: 50, supplier: "SpiceVilla", rating: 4.6 },
  { name: "Cooking Oil", price: 90, supplier: "OilMart", rating: 4.0 },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productList = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");

function renderProducts(filter = "") {
  productList.innerHTML = "";

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  filtered.forEach((p, index) => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded-xl shadow hover:shadow-lg transition";

    card.innerHTML = `
      <h3 class="text-lg font-semibold">${p.name}</h3>
      <p class="text-sm text-gray-600">Supplier: ${p.supplier}</p>
      <p class="text-purple-700 font-bold text-xl">₹${p.price}/kg</p>
      <p class="text-yellow-500 text-sm">Rating: ⭐ ${p.rating}</p>
      <button class="mt-3 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700" data-index="${index}">Add to Cart</button>
    `;

    const button = card.querySelector("button");
    button.addEventListener("click", () => addToCart(index));

    productList.appendChild(card);
  });
}

function addToCart(index) {
  const product = products[index];
  const existing = cart.find(item => item.name === product.name);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}

// Cart Handling
const cartBtn = document.getElementById("cartBtn");
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const closeCart = document.getElementById("closeCart");
const checkoutBtn = document.getElementById("checkoutBtn");

cartBtn.addEventListener("click", () => {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  renderCart();
  cartModal.classList.remove("hidden");
});

closeCart.addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>No items in cart.</p>";
    cartTotal.textContent = "Total: ₹0";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "flex justify-between items-center border-b pb-2";

    div.innerHTML = `
      <div>
        <p class="font-semibold">${item.name} x ${item.quantity}</p>
        <p class="text-sm text-gray-600">₹${item.price}/kg</p>
      </div>
      <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-700">&times;</button>
    `;

    cartItems.appendChild(div);
  });

  cartTotal.textContent = `Total: ₹${total}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

checkoutBtn.addEventListener("click", () => {
  alert("Order placed successfully (simulation)!");
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  cartModal.classList.add("hidden");
});

// Initial Render
renderProducts();
searchInput.addEventListener("input", (e) => renderProducts(e.target.value));
