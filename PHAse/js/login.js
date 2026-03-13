// login.js
const step1 = document.getElementById('login-step1');
const step2 = document.getElementById('login-step2');

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

step2.style.display = 'none';

// Funções do banco
function validaUsername(username){
    const db = JSON.parse(localStorage.getItem('usuarios')) || [];
    return db.some(user => user.username === username);
}

function validaSenha(username, password){
    const db = JSON.parse(localStorage.getItem('usuarios')) || [];
    const user = db.find(u => u.username === username);
    if(!user) return false;
    return user.password === password;
}

// Step 1 -> valida username
step1.addEventListener('submit', e => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    if(!username){
        alert('Digite seu usuário ou email.');
        return;
    }
    if(!validaUsername(username)){
        alert('Usuário não encontrado. Verifique ou cadastre-se.');
        return;
    }
    step1.style.display = 'none';
    step2.style.display = 'flex';
    passwordInput.focus();
});

// Step 2 -> valida senha e faz login
step2.addEventListener('submit', e => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    if(!password){
        alert('Digite sua senha.');
        return;
    }
    if(!validaSenha(username, password)){
        alert('Senha incorreta.');
        return;
    }

    // Login bem-sucedido
    localStorage.setItem('usuarioLogado', username); // SALVA usuário logado
    alert(`Bem-vindo, ${username}!`);
    window.location.href = 'index.html'; // Redireciona para o portal
});
