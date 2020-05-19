window.addEventListener("scroll",function () {
    if (document.documentElement.clientWidth > 768){
        /* Изменяет меню при сколле */
        setScrollElement(document.getElementById("header"),0);
    }
})