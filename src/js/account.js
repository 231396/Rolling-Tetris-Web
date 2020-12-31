
const fullName = document.querySelector('#full_name');
const birthDate = document.querySelector('#birth_date');
const cpf = document.querySelector('#cpf');
const email = document.querySelector('#email');
const phoneNumber = document.querySelector('#phone_number');
const username = document.querySelector('#username');
const password = document.querySelector('#password');

getDatabaseData();
function getDatabaseData(){

    let ajax = new XMLHttpRequest();
    let params = `id=${session_id}`;
    
	ajax.open('POST', '../php/fill_account.php', true);
	
    ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
	ajax.onreadystatechange = function () {
		if (ajax.status === 200 && ajax.readyState === 4) {
            let acc = JSON.parse(ajax.responseText);

            fillData(acc.nome, acc.dtNascimento, acc.cpf, acc.telefone, acc.email, acc.username, acc.password);
		}
	};

	ajax.send(params);
}

function fillData(_fullName, _birthDate, _cpf, _phoneNumber, _email, _username, _password){
    fullName.value = _fullName;
    birthDate.value = _birthDate;
    cpf.value = _cpf;
    phoneNumber.value = _phoneNumber;
    email.value = _email;
    username.value = _username;
    password.value = _password;
}

function saveChanges(){
    let id = session_id;
    let fullName_value = fullName.value;
    let email_value = email.value;
    let phoneNumber_value = phoneNumber.value;
    let username_value = username.value;
    let password_value = password.value;

    let ajax = new XMLHttpRequest();
    let params = `id=${session_id}&fullName=${fullName_value}&email=${email_value}&phoneNumber=${phoneNumber_value}&username=${username_value}&password=${password_value}`;

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