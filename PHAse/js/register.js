const step1 = document.getElementById('register-step1');
const step2 = document.getElementById('register-step2');
const usernameInput = document.getElementById('reg-username');
const passwordInput = document.getElementById('reg-password');
const password2Input = document.getElementById('reg-password2');

step2.style.display='none';

step1.addEventListener('submit', e=>{
  e.preventDefault();
  const username = usernameInput.value.trim();
  if(!username){alert('Digite seu login ou email!'); return;}
  if(validaUsername(username)){alert('Usuário já existe!'); return;}
  step1.style.display='none';
  step2.style.display='flex';
  passwordInput.focus();
});

step2.addEventListener('submit', e=>{
  e.preventDefault();
  const username=usernameInput.value;
  const password=passwordInput.value;
  const password2=password2Input.value;
  if(!password||!password2){alert('Preencha os dois campos de senha!'); return;}
  if(password!==password2){alert('Senhas não conferem!'); return;}
  addUsuario(username,password);
  alert('Cadastro realizado com sucesso!');
  window.location.href='login.html';
});
