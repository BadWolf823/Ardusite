document.getElementById('username').value = localStorage.getItem('username');
document.getElementById('user').onclick = function(event){
    event.preventDefault();
}
document.querySelector('.regform').onsubmit = function () {
    alert(user+' , изменения сохранены успешно');
}