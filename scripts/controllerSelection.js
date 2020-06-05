const contentNavMain = document.getElementsByClassName('content-nav-item__element_main'); //основные элементы меню фильтров
const selectUser = [contentNavMain.length]; //Пользовательский выбор

/* Проверка соответсвия элемента фильтру */
let checkInItem = function (item) {
    let itemListInformation = item.getAttribute('data-about');
    let itemInformation = itemListInformation.split(' ');
    for (let i = 0; i < selectUser.length; i++) {
        if (itemInformation[i].indexOf('any') !== -1) continue; //Если "метка" в данной позиции содержит 'any' - пропуск
        if (selectUser[i].indexOf('any') !== -1) continue; //Если в фильтре есть срока 'any' - любое, то пропускаем итерацию
        if (itemInformation[i] !== selectUser[i]) return false; //Сюда цикл дойдёт, если не выполнились предыдущие условия
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
    if ((selectUser[i] = localStorage.getItem(contentNavMain[i].id)) === null) {
        selectUser[i] = 'any-' + contentNavMain[i].id;
        localStorage.setItem(contentNavMain[i].id, selectUser[i]);
    }
    contentNavMain[i].setAttribute('data-select', document.getElementById(selectUser[i]).innerHTML);
    console.log('1 --- '+selectUser.length);
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
                thisContentNavMain.dataset.select = this.innerHTML;
                selectUser[i] = this.id;
                localStorage.setItem(thisContentNavMain.id, selectUser[i]);
                updateItemList();
            });
        }
    })
}
updateItemList();
