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
    searchInList(requestSearch,listNameProject)
})
searchInList = function (requestSearch, list){
    for (let i = 0; i < list.length; i++){
        console.log(list[i].textContent)
        if (list[i].textContent.toLowerCase().indexOf(requestSearch.toLowerCase()) === -1){
            list[i].parentElement.parentElement.style.display = 'none';
        } else {
            list[i].parentElement.parentElement.style.display = 'flex';
        }
    }
}
