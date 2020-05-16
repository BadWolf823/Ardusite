window.addEventListener("scroll",function () {
    if (document.documentElement.clientWidth > 768){
        let header = document.querySelector(".header");
        if (window.scrollY - 30 > 0){
            header.classList.add(header.classList.item(0)+"_scroll");
        } else header.classList.remove(header.classList.item(0)+"_scroll");
    }
})