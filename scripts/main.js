/* С загрузкой страницы назначаем обработку события на элемент с id = "menu-btn" на нажатие
    т.к. скрипт объявляю в head, до загрузки body, а тем более menu-btn, использую событие загрузки
    страницы
     */
/* Открытие меню по кнопке */
document.getElementById("menu-btn").addEventListener("click", function () {
    toggleClassNameParent(this,'open');
    this.tabIndex = 2;
    this.onblur = function () {
        this.parentElement.classList.remove('menu_open');
    }
});

/* Переход по якорным ссылкам */
const links = document.getElementsByClassName('anker-link');
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (e) {
        e.preventDefault();
        const elementId = this.getAttribute('href');
        document.querySelector(elementId).scrollIntoView({
            block: 'center',
            behavior: 'smooth'
        });
    });
}

/* События на скролл страницы */

window.addEventListener("scroll", function () {
    if (document.documentElement.clientWidth > 768) {// короче, если не с мобильного устройства (планшет/смартфон)
        /* Изменяет меню при сколле */
        setScrollElement(document.getElementById("header"), 0);
    }
    if (pageYOffset > 0){
        document.querySelector('.goup').classList.add('goup_scroll');
    } else {
        document.querySelector('.goup').classList.remove('goup_scroll');
    }
})
/* "Учётка" */
let user = document.getElementById('user');
if (localStorage.getItem('username') !== null){
    user.innerHTML = '@'+localStorage.getItem('username');
    user.removeAttribute('href');
    user.tabIndex = 1;
    user.onclick = function(event){
        userMenu();
        user.addEventListener('blur',function () {
            user.parentElement.classList.remove('user_open');
        })
    }

}

/******************* ФУНКЦИИ **********************/
function userMenu() { //менюшка пользователя
    toggleClassNameParent(user,'open');
    document.getElementById('log-out').addEventListener('click', function () {
        localStorage.removeItem('username');
        window.location.reload();
    })
}
function setScrollElement(element, top) {
    let positionInWindow = element.getBoundingClientRect();
    if (positionInWindow.top < top) {
        element.classList.add(element.classList.item(0) + "_scroll");
    } else {
        element.classList.remove(element.classList.item(0) + "_scroll");
    }
}

function removeItem(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
}
function toggleClassNameParent(element, mod) {
    element.parentElement.classList.toggle(element.parentElement.classList[0] + '_'+ mod);
}