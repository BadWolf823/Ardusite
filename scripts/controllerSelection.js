const contentNavMain = document.getElementsByClassName('content-nav-item__element_main'); //основные элементы меню фильтров

/* Проверка соответсвия элемента фильтру */
let checkInItem = function (item) {
    let aboutItem = item.getAttribute('data-about');
    for (let i = 0; i < contentNavMain.length; i++) {
        if (aboutItem.indexOf('any-'+contentNavMain[i].id) !== -1) continue; //Если в теге вещи есть any-"данная категория фильтра", то пропускаем итерацию
        if (localStorage.getItem(contentNavMain[i].id).indexOf('any') !== -1) continue; //Если в фильтре есть срока 'any' - любое, то пропускаем итерацию
        if (aboutItem.indexOf(localStorage.getItem(contentNavMain[i].id)) === -1) return false; //Сюда цикл дойдёт, если не выполнились предыдущие условия
    }
    return true; // если дошло до этого места, значит всё хорошо
}
/* Обовление списка элементов */
let updateItemList = function () {
    let itemList = document.getElementsByClassName('content-item');
    for (let i = 0; i < itemList.length; i++) {
        if (checkInItem(itemList[i])) {// проверяем соответствие фильтру
            itemList[i].style.display = '';
        } else {
            itemList[i].style.display = 'none';
        }
    }
}

for (let i = 0; i < contentNavMain.length; i++) {
    contentNavMain[i].parentElement.tabIndex = 1;
    if (localStorage.getItem(contentNavMain[i].id) === null) { //Если пусто хранилище
        localStorage.setItem(contentNavMain[i].id, 'any-'+contentNavMain[i].id); //Устанавливаем занчение "любое"
    }
    let thisSelectUser = localStorage.getItem(contentNavMain[i].id); // кидаем значение фильтра по данной категории в "буфер"
    contentNavMain[i].setAttribute('data-select', document.getElementById(thisSelectUser).innerHTML); //устанавливаем внешнее отображение фильтра
    contentNavMain[i].addEventListener('click', function () { //событие открытия списка фильтров
        this.parentElement.addEventListener('blur', function () { //Если список потерял фокус, то закрываем его
            this.classList.remove(this.classList[0] + '_open');
        });
        toggleClassNameParent(this, 'open'); //отрыли/закрыл список
        let menu = this.nextElementSibling.getElementsByClassName('content-nav-item__element'); //коллекция фильтров
        for (let j = 0; j < menu.length; j++) {
            menu[j].addEventListener('click', function (){ //если нажался какой-то фильтр
                let thisContentNavMain = this.parentElement.previousElementSibling;
                thisContentNavMain.parentElement.classList.remove('content-nav-item_open'); //закрываем список
                thisContentNavMain.setAttribute('data-select',this.innerHTML); //записываем в атрибут категории данный фильтр
                localStorage.setItem(thisContentNavMain.id, this.id);//и в localStorage
                updateItemList();//обновляем список вещей с учётом фильтра
            });
        }
    })
}
updateItemList();// начальное обновление списка вещей с учётом начального фильтра
