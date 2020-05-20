window.addEventListener("load",function () {
    /* С загрузкой страницы назначаем обработку события на элемент с id = "menu-btn" на нажатие
    т.к. скрипт объявляю в head, до загрузки body, а тем более menu-btn, использую событие загрузки
    страницы
     */
    /* Открытие меню по кнопке */
    document.getElementById("menu-btn").addEventListener("click",function () {
        openCloseMenu(this);
    });
})
window.addEventListener("scroll",function () {
    if (document.documentElement.clientWidth > 768){
        /* Изменяет меню при сколле */
        setScrollElement(document.getElementById("header"),0);
    }
})
function openCloseMenu(element) {
    element.parentElement.classList.toggle(element.parentElement.classList.item(0)+"_open");
}

function setScrollElement(element, top) {
    let positionInWindow = element.getBoundingClientRect();
    if (positionInWindow.top < top){
        element.classList.add(element.classList.item(0)+"_scroll");
    } else {
        element.classList.remove(element.classList.item(0)+"_scroll")
    }
}
function addItem(element) {
    let item = element.querySelector(".fieldset-part").cloneNode(true);
    element.before(item);
}
function removeItem(element) {
    element.parentElement.remove();
}
function openFirstChildElement(element) {
    element.firstElementChild.classList.toggle(element.firstElementChild.classList[0]+'_open');
}
function openParentElement(element) {
    element.parentElement.classList.toggle(element.parentElement.classList[0]+'_open');
}
