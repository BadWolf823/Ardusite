window.addEventListener("load",function () {
    /* Открытие команды */
    addEventOpenElementByClass("command__name","click");
    addEventOpenElementByClass("side-nav-item__link_main","click");
})
function addEventOpenElementByClass(classname, typeEvent) {
    for (let i = 0; i < document.getElementsByClassName(classname).length; i++){
        document.getElementsByClassName(classname).item(i).addEventListener(typeEvent,function () {
            openParentElement(this);
        })
    }
}