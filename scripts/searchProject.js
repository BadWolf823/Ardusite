/* Поисковая строка */
window.addEventListener("scroll",function () {
    setScrollElement(document.getElementById("project-communication"),45);
})
let listNameProject = document.querySelectorAll('.project__name');
const search = document.getElementById('search-project');
let requestSearch;
search.addEventListener("input",function (event) {
    event.preventDefault();
    requestSearch = this.value;
    let hasElement = searchInList(requestSearch,listNameProject);
    if (!hasElement){
        document.getElementById('no-found').style.display = 'block';
    } else document.getElementById('no-found').style.display = 'none';
})
searchInList = function (requestSearch, list){
    let hasElement = false;
    for (let i = 0; i < list.length; i++){
        if (list[i].textContent.toLowerCase().indexOf(requestSearch.toLowerCase()) === -1){
            list[i].parentElement.parentElement.style.display = 'none';
        } else {
            hasElement = true;
            list[i].parentElement.parentElement.style.display = 'flex';
        }
    }
    return hasElement;
}
document.getElementById('myproject').onclick = function () {
    this.parentElement.parentElement.classList.remove('user_open');
    document.getElementById('title').textContent = 'Мои проекты';
    document.getElementById('title-text').textContent = 'Здесь вы можете посмотреть список своих проектов'
    document.getElementById('project-communication').style.display = 'none';
    let listMakerProject = document.getElementsByClassName('project__maker');
    let userName = localStorage.getItem('username');
    let countProject = 0;
    for (let i = 0; i < listMakerProject.length; i++){
        if (('@'+userName) === listMakerProject[i].innerHTML){
            countProject++;
            listMakerProject[i].parentElement.parentElement.style.display = 'flex';
        } else listMakerProject[i].parentElement.parentElement.style.display = 'none';
    }
    if (countProject === 0){
        document.querySelector('.project-noFound__text').textContent = 'Увы, вы не добавляли свои проекты';
        document.getElementById('no-found').style.display = 'flex';
    }
}