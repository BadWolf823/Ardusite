document.getElementById('form').addEventListener('submit', function (event) {
    uploadProject(event);
})
function uploadProject(event) {
    event.preventDefault()
    let uploadProject = document.createElement('div');
    let text = document.createElement('p')
    text.innerHTML = 'ПРОЕКТ ДОБАВЛЕН';
    let buttonEnd = document.createElement('button');
    buttonEnd.type = 'submit';
    buttonEnd.innerHTML = 'ОК';
    buttonEnd.form = 'form';
    text.classList.add('uploadProject__text')
    buttonEnd.classList.add('uploadProject__buttonEnd');
    uploadProject.classList.add('uploadProject');
    uploadProject.appendChild(text);
    buttonEnd.addEventListener('click',function () {
        document.location.href = '../projects/project-list.html';
    },true)
    uploadProject.appendChild(buttonEnd);
    document.querySelector('.main').appendChild(uploadProject);
}
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