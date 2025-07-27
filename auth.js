const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

// Toggle Tabs
loginTab.addEventListener("click", () => {
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
  loginTab.classList.add("border-purple-700", "text-purple-700");
  registerTab.classList.remove("border-purple-700", "text-purple-700");
});

registerTab.addEventListener("click", () => {
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
  registerTab.classList.add("border-purple-700", "text-purple-700");
  loginTab.classList.remove("border-purple-700", "text-purple-700");
});

// Register
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const role = document.getElementById("regRole").value;

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const exists = users.find(u => u.email === email);

  if (exists) {
    message.textContent = "User already exists.";
    return;
  }

  users.push({ name, email, password, role });
  localStorage.setItem("users", JSON.stringify(users));
  message.textContent = "Registered successfully. You can now login.";
  registerForm.reset();
});

// Login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    message.textContent = "Invalid credentials.";
    return;
  }

  message.textContent = "";
  // Redirect based on role
  if (user.role === "vendor") {
    window.location.href = "vendor.html";
  } else if (user.role === "supplier") {
    window.location.href = "supplier.html";
  }
});
