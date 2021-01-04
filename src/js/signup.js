function validateForm()
{
	var signup_form = document.forms["signup_form"];
	var nome = signup_form["name"].value;
	var datanascimento = signup_form["datebirth"].value;
	var cpf = signup_form["cpf"].value;
	var telefone = signup_form["phone"].value;
	var email = signup_form["email"].value;
	var username = signup_form["username"].value;
	var senha = signup_form["password"].value;

	if(!nome || nome === ""){
		alert("O campo Nome deve ser preenchido");
		return false;
	}

	if(!datanascimento || datanascimento === ""){
		alert("O campo Data de Nascimento deve ser preenchido");
		return false;
	}

	if(!cpf || cpf === ""){
		alert("O campo CPF deve ser preenchido");
		return false;
	}else{
		if(cpf.length !== 11){
			alert("O campo CPF deve ter 11 caracteres");
			return false;
		}
	}

	if(!telefone || telefone === ""){
		alert("O campo Telefone deve ser preenchido");
		return false;
	}else{
		if(telefone.length < 10 ||  telefone.length > 11){
			alert("O campo Telefone deve 10 ou 11 caracteres no formato DD12345678 ou DD123456789");
			return false;
		}
	}

	if(!email || email === ""){
		alert("O campo E-mail deve ser preenchido");
		return false;
	}else{
		if(email.indexOf('@')===-1 || email.indexOf('.')===-1){
			alert("Informe um endereço de E-mail válido");
			return false;
		}
	}

	if(!username || username === ""){
		alert("O campo Username deve ser preenchido");
		return false;
	}else{
		if(username.length > 16 || username.length < 6){
			alert("Username deve deve ter no mínimo 6 e no máximo 16 caracteres");
			return false;
		}
	}

	if(!senha || senha === ""){
		alert("O campo Senha deve ser preenchido");
		return false;
	}else{
		if((senha.length > 16) || (senha.length < 6)){
			alert("Senha deve ter no mínimo 6 e no máximo 16 caracteres");
			return false;
		}
	}
	
}
