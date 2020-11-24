
    
const fullName = document.querySelector('#full_name');
const birthDate = document.querySelector('#birth_date');
const cpf = document.querySelector('#cpf');
const phoneNumber = document.querySelector('#phone_number');
const username = document.querySelector('#username');
const password = document.querySelector('#password');

getDatabaseData();
function getDatabaseData(){
    var login = localStorage.getItem("login");
    var password = localStorage.getItem("password");

    //TODO - REQUEST PLAYER DATA FROM PHP
}

function fillData(_fullName, _birthDate, _cpf, _phoneNumber, _username, _password){
    fullName.innerHTML = _fullName;
    birthDate.innerHTML = _birthDate;
    cpf.innerHTML = _cpf;
    phoneNumber.innerHTML = _phoneNumber;
    username.innerHTML = _username;
    password.innerHTML = _password;
}

function saveChanges(){
    //TODO - SEND CHANGED DATA TO PHP
}