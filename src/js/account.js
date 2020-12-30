
    
const fullName = document.querySelector('#full_name');
const birthDate = document.querySelector('#birth_date');
const cpf = document.querySelector('#cpf');
const email = document.querySelector('#email');
const phoneNumber = document.querySelector('#phone_number');
const username = document.querySelector('#username');
const password = document.querySelector('#password');

getDatabaseData();
function getDatabaseData(){
    var login = localStorage.getItem("login");
    var password = localStorage.getItem("password");

    let ajax = new XMLHttpRequest();
    let params = `name=${login}&pass=${password}`;
    
	ajax.open('POST', '../php/fill_account.php', true);
	
	ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	ajax.onreadystatechange = function () {
		if (ajax.status === 200 && ajax.readyState === 4) {
			console.log(ajax.responseText);
		}
	};

	ajax.send(params);
}

function fillData(_fullName, _birthDate, _cpf, _phoneNumber, _email, _username, _password){
    fullName.innerHTML = _fullName;
    birthDate.innerHTML = _birthDate;
    cpf.innerHTML = _cpf;
    phoneNumber.innerHTML = _phoneNumber;
    email.innerHTML = _email;
    username.innerHTML = _username;
    password.innerHTML = _password;
}

function saveChanges(){
    var fullName_value = fullName.innerHTML;
    var email_value = email.innerHTML;
    var phoneNumber_value = phoneNumber.innerHTML;
    var username_value = username.innerHTML;
    var password_value = password.innerHTML;

    let ajax = new XMLHttpRequest();
    let params = `fullName=${fullName_value}&email=${email_value}&phoneNumber=${phoneNumber_value}&username=${username_value}&password=${password_value}`;
    
	ajax.open('POST', '../php/save_account.php', true);
	
	ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	ajax.onreadystatechange = function () {
		if (ajax.status === 200 && ajax.readyState === 4) {
            console.log(ajax.responseText);
            if (ajax.responseText == "true")
                alert('informações salvas com sucesso');
            else{
                alert('erro ao salvar');
            }
		}
	};

	ajax.send(params);
}