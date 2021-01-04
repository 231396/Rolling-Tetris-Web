const caixa_login = document.querySelector('.msg-login');
const caixa_passw = document.querySelector('.msg-passw');
const input_login = document.querySelector('.input-login');
const input_password = document.querySelector('.input-password');
const caixa_verify = document.querySelector('.msg-erro-cadastro');

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
    
	ajax.open('POST', '../php/verify_login.php', true);
	
	ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	ajax.onreadystatechange = function () {
		if (ajax.status === 200 && ajax.readyState === 4) {
			console.log(ajax.responseText)
			if (ajax.responseText === "false"){
				caixa_verify.innerHTML = "Username ou senha incorreto";
				caixa_verify.style.display = "block";
				caixa_verify.style.color = "red";				
		    }else{
                //window.location.href = "../php_pages/game.php";
            }
		}
	};

	ajax.send(params);

}

function verify() {
	var username = form_login.login.value;
	var password = form_login.password.value;

	var isValidLogin = true;

	if (username.length < 6) {
		caixa_login.innerHTML = "O campo username precisa ao menos de 6 caracteres";
		caixa_login.style.display = "block";
		caixa_login.style.borderColor = "red";
		input_login.style.borderColor = "red";
		isValidLogin = false;
	}
	else if (username.length > 16) {
		caixa_login.innerHTML = "O campo username possui mais que 16 caracteres";
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

	if (password.length < 6) {
		caixa_passw.innerHTML = "O campo password precisa ao menos de 6 caracteres";
		caixa_passw.style.display = "block";
		caixa_passw.style.borderColor = "red";
		input_password.style.borderColor = "red";
		isValidLogin = false;
	}
	else if (password.length > 16) {
		caixa_passw.innerHTML = "O campo password possui mais que 16 caracteres";
		caixa_passw.style.display = "block";
		caixa_passw.style.borderColor = "red";
		input_password.style.borderColor = "red";
		isValidLogin = false;
	} else {
		caixa_passw.innerHTML = "";
		caixa_passw.style.borderColor = "";
		input_password.style.borderColor = "";
	}

	return isValidLogin;
}