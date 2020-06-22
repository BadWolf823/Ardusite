if (localStorage.getItem('username') === null) document.location.href = '../sign-in.html';
document.getElementById('form').addEventListener('submit', function (event) {
    alert('Проект добавлен');
})
function addPart(element) {
    let item = document.createElement('li');
    item.classList.add('fieldset-part');
    let inputName = document.createElement("input");
    inputName.classList.add("fieldset-part__input-name");
    inputName.type = 'text';
    let inputNumber = document.createElement("input");
    inputNumber.classList.add('fieldset-part__input-number');
    inputNumber.type = 'number';
    inputNumber.value = '0';
    let remove = document.createElement('div');
    remove.classList.add("fieldset-part__del");
    remove.addEventListener('click',function () {
        removeItem(this);
    })
    item.appendChild(inputName);
    item.appendChild(inputNumber);
    item.append(remove);
    element.before(item);
}