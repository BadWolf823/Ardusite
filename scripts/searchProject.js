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
        console.log(list[i].textContent)
        if (list[i].textContent.toLowerCase().indexOf(requestSearch.toLowerCase()) === -1){
            list[i].parentElement.parentElement.style.display = 'none';
        } else {
            hasElement = true;
            list[i].parentElement.parentElement.style.display = 'flex';
        }
    }
    return hasElement;
}
