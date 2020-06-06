document.querySelector('.form__submit').addEventListener('click',function (event) {
    event.preventDefault();
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
    buttonEnd.addEventListener('click',function (event) {
        document.location.href = '../projects/project-list.html';
    },true)
    uploadProject.appendChild(buttonEnd);
    document.querySelector('.main').appendChild(uploadProject);
},true);