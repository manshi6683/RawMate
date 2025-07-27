// Sample script.js to handle basic login redirection
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('form');

  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const role = document.querySelector('select').value;

      if (role === 'vendor') {
        window.location.href = 'vendor.html';
      } else if (role === 'supplier') {
        window.location.href = 'supplier.html';
      } else if (role === 'admin') {
        window.location.href = 'admin.html';
      } else {
        alert('Please select a valid role.');
      }
    });
  }
});
