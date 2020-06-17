if (localStorage.getItem('username')!== null) document.location.href = '../index.html';
document.querySelector('.regform').onsubmit = function () {
    let userName = document.getElementById('username').value;
    localStorage.setItem('username', userName);
    alert('Регистрация прошла успешно. Добро пожаловать ' + userName);
}