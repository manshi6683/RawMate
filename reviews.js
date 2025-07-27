const form = document.getElementById("reviewForm");
const reviewList = document.getElementById("reviewList");

let reviews = JSON.parse(localStorage.getItem("reviews") || "[]");

// Submit Review
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const supplier = document.getElementById("supplierSelect").value;
  const rating = parseInt(document.getElementById("rating").value);
  const comment = document.getElementById("comment").value.trim();

  if (supplier && rating >= 1 && rating <= 5 && comment) {
    reviews.push({ supplier, rating, comment });
    localStorage.setItem("reviews", JSON.stringify(reviews));
    form.reset();
    renderReviews();
  }
});

// Render All Reviews
function renderReviews() {
  reviewList.innerHTML = "";

  reviews.forEach((r) => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded-xl shadow";

    card.innerHTML = `
      <h4 class="font-semibold text-purple-700">${r.supplier}</h4>
      <p class="text-yellow-500">Rating: ⭐ ${r.rating}</p>
      <p class="text-gray-700 mt-2">"${r.comment}"</p>
    `;

    reviewList.appendChild(card);
  });
}

renderReviews();
