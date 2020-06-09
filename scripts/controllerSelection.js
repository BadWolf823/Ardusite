const contentNavMain = document.getElementsByClassName('content-nav-item__element_main'); //основные элементы меню фильтров

/* Проверка соответсвия элемента фильтру */
let checkInItem = function (item) {
    let aboutItem = item.getAttribute('data-about');
    for (let i = 0; i < contentNavMain.length; i++) {
        if (aboutItem.indexOf('any-'+contentNavMain[i].id) !== -1) continue;
        if (localStorage.getItem(contentNavMain[i].id).indexOf('any') !== -1) continue; //Если в фильтре есть срока 'any' - любое, то пропускаем итерацию
        if (aboutItem.indexOf(localStorage.getItem(contentNavMain[i].id)) === -1) return false; //Сюда цикл дойдёт, если не выполнились предыдущие условия
    }
    return true;
}
/* Обовление списка элементов */
let updateItemList = function () {
    let itemList = document.getElementsByClassName('content-item');
    for (let i = 0; i < itemList.length; i++) {
        if (checkInItem(itemList[i])) {
            itemList[i].style.display = '';
        } else {
            itemList[i].style.display = 'none';
        }
    }
}

for (let i = 0; i < contentNavMain.length; i++) {
    contentNavMain[i].parentElement.tabIndex = 1;
    if (localStorage.getItem(contentNavMain[i].id) === null) { //Если пусто хранилище
        localStorage.setItem(contentNavMain[i].id, 'any-'+contentNavMain[i].id);
    }
    let thisSelectUser = localStorage.getItem(contentNavMain[i].id);
    contentNavMain[i].setAttribute('data-select', document.getElementById(thisSelectUser).innerHTML);
    contentNavMain[i].addEventListener('click', function () {
        this.parentElement.addEventListener('blur', function () {
            this.classList.remove(this.classList[0] + '_open');
        });
        toggleClassNameParent(this, 'open');
        let menu = this.nextElementSibling.getElementsByClassName('content-nav-item__element');
        for (let j = 0; j < menu.length; j++) {
            menu[j].addEventListener('click', function (){
                let thisContentNavMain = this.parentElement.previousElementSibling;
                thisContentNavMain.parentElement.classList.remove('content-nav-item_open');
                thisContentNavMain.setAttribute('data-select',this.innerHTML);
                localStorage.setItem(thisContentNavMain.id, this.id);
                updateItemList();
            });
        }
    })
}
updateItemList();
