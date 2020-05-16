function openMenuByClass(id, classElement){
    alert(id);
    document.getElementById(id).classList.toggle(classElement+"_open");
}
function openMenu(id) {
    document.getElementById(id).classList.toggle(id+"_open");
}