
function username(){
    var validaForm = true;
	var username = form_login.login.value;
	var password = form_login.password.value;
    
    var caixa_login = document.querySelector('.msg-login');
	var caixa_passw = document.querySelector('.msg-passw');
	var input_login = document.querySelector('.input-login');
	var input_password = document.querySelector('.input-password');

/* 	if(username == ""){
		caixa_login.innerHTML = "O campo username não pode esta vazio";
		caixa_login.style.display = "block";
		caixa_login.style.borderColor = "red";
		validaForm = false;
	}
	else{
		caixa_login.innerHTML = "";
		caixa_login.style.borderColor = "";

	} */
	if(username.length <= 6){
		caixa_login.innerHTML = "O campo username precisa de mais que 6 caracteres";
		caixa_login.style.display = "block";
		caixa_login.style.borderColor = "red";
		input_login.style.borderColor = "red";
		validaForm = false;
	}
    else{
    	caixa_login.innerHTML = "";
		caixa_login.style.borderColor = "";
		input_login.style.borderColor = "";

	}

	if(username.length >16){
	    caixa_login.innerHTML = "O campo username possui mais que 16 caracteres";
		caixa_login.style.display = "block";
		caixa_login.style.borderColor = "red";
		input_login.style.borderColor = "red";
		validaForm = false;
	}


/* 	if(password  == ""){
		caixa_passw.innerHTML = "O campo password não pode esta vazio";
		caixa_passw.style.display = "block";
		validaForm = false;
	} */
	if(password.length <= 6){
		caixa_passw.innerHTML = "O campo password precisa de mais que 6 caracteres";
		caixa_passw.style.display = "block";
		caixa_passw.style.borderColor = "red";
		input_password.style.borderColor = "red";
		validaForm = false;
	}else{

    	caixa_passw.innerHTML = "";
		input_password.style.borderColor = "";

	}

	if(password.length >16){
		caixa_passw.innerHTML = "O campo password não pode esta vazio";
		caixa_passw.style.display = "block";
		caixa_passw.style.borderColor = "red";
		input_password.style.borderColor = "red";
		validaForm = false;
	}

	return validaForm;


}

function toLimit(string = ""){
	string.value = string.value.substring(0,10);
}