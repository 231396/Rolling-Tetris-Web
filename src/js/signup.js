function validateForm()
{
	var nome = document.forms["signup_form"]["name"].value;
	var datanascimento = document.forms["signup_form"]["datebirth"].value;
	var cpf = document.forms["signup_form"]["cpf"].value;
	var telefone = document.forms["signup_form"]["phone"].value;
	var email = document.forms["signup_form"]["email"].value;
	var username = document.forms["signup_form"]["username"].value;
	var senha = document.forms["signup_form"]["password"].value;





	if(nome == null || nome == ""){
		alert("O campo Nome deve ser preenchido");
		return false;
	}


	if(datanascimento == null || datanascimento == ""){
		alert("O campo Data de Nascimento deve ser preenchido");
		return false;
	}else{
		if((datanascimento.length > 8) || (datanascimento.length < 8)){
			alert("O campo Data de Nascimento deve 8 caracteres");
			return false;
		}
	}


	if(cpf == null || cpf == ""){
		alert("O campo CPF deve ser preenchido");
		return false;
	}else{
		if((cpf.length > 11) || (cpf.length < 11)){
			alert("O campo CPF deve ter 11 caracteres");
			return false;
		}
	}

	if(telefone == null || telefone == ""){
		alert("O campo Telefone deve ser preenchido");
		return false;
	}else{
		if((telefone.length > 11) || (telefone.length < 11)){
			alert("O campo Telefone deve 11 caracteres");
			return false;
		}
	}

	if(email == null || email == ""){
		alert("O campo E-mail deve ser preenchido");
		return false;
	}else{
		if(email.indexOf('@')==-1 || email.indexOf('.')==-1){
			alert("Informe um endereço de E-mail válido");
			return false;
		}
	}

	if(username == null || username == ""){
		alert("O campo Username deve ser preenchido");
		return false;
	}else{
		if(username.length > 16){
			alert("Username deve ter no máximo 16 caracteres");
			return false;
		}
	}

	if(senha == null || senha == ""){
		alert("O campo Senha deve ser preenchido");
		return false;
	}else{
		if((senha.length > 16) || (senha.length < 8)){
			alert("Senha deve ter no mínimo 8 e no máximo 16 caracteres");
			return false;
		}
	}
	
}
