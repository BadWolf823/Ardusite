window.addEventListener("load",function () {
    /* С загрузкой страницы назначаем на элемент с id = "menu-btn" на нажатие
    т.к. скрипт объявляю в head, до загрузки body, а тем более menu-btn, использую событие загрузки
    страницы
     */
    document.getElementById("menu-btn").addEventListener("click",function () {
        this.parentElement.classList.toggle(this.parentElement.classList.item(0)+"_open");
    })
})

