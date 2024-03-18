document.getElementById('loginForm').addEventListener('submit', function(event) {
event.preventDefault();
    
const username = document.getElementById('username').value;
const password = document.getElementById('password').value;

if (username.trim() === '' || password.trim() === '') {
  alert('Por favor, preencha todos os campos.');
return;
}
  redirectToPresentationPage();
});
  
function redirectToPresentationPage() {
  window.location.href = 'personagens.html';
  
}
