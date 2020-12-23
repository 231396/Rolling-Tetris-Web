const caixa_login = document.querySelector('.msg-login');
const caixa_passw = document.querySelector('.msg-passw');
const input_login = document.querySelector('.input-login');
const input_password = document.querySelector('.input-password');

/** @type {HTMLFormElement} */
const form_login = document.querySelector('#form_login');
form_login.onsubmit = submit;

function submit(event) {
	event.preventDefault();

	var username = form_login.login.value;
	var password = form_login.password.value;

	if (verify()) {
		canLogin(username, password);
	}

}

function canLogin(username, password) {


	let ajax = new XMLHttpRequest();
	let params = `name=${username}&pass=${password}`;
	console.log(params);

	ajax.open('POST', '../php/verify_login.php', true);
	
	ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	ajax.onreadystatechange = function () {
		if (ajax.status === 200 && ajax.readyState === 4) {
			console.log(ajax.responseText);
			if (ajax.responseText == "false") {
				alert('usuario errado');
			}

		}
	};

	ajax.send(params);

}

function verify() {
	var username = form_login.login.value;
	var password = form_login.password.value;

	var isValidLogin = true;

	if (username.length <= 6) {
		caixa_login.innerHTML = "O campo username precisa de mais que 6 caracteres";
		caixa_login.style.display = "block";
		caixa_login.style.borderColor = "red";
		input_login.style.borderColor = "red";
		isValidLogin = false;
	}
	else {
		caixa_login.innerHTML = "";
		caixa_login.style.borderColor = "";
		input_login.style.borderColor = "";
	}

	if (username.length > 16) {
		caixa_login.innerHTML = "O campo username possui mais que 16 caracteres";
		caixa_login.style.display = "block";
		caixa_login.style.borderColor = "red";
		input_login.style.borderColor = "red";
		isValidLogin = false;
	}

	if (password.length <= 6) {
		caixa_passw.innerHTML = "O campo password precisa de mais que 6 caracteres";
		caixa_passw.style.display = "block";
		caixa_passw.style.borderColor = "red";
		input_password.style.borderColor = "red";
		isValidLogin = false;
	} else {

		caixa_passw.innerHTML = "";
		input_password.style.borderColor = "";

	}

	if (password.length > 16) {
		caixa_passw.innerHTML = "O campo password não pode esta vazio";
		caixa_passw.style.display = "block";
		caixa_passw.style.borderColor = "red";
		input_password.style.borderColor = "red";
		isValidLogin = false;
	}

	return isValidLogin;
}