document.querySelectorAll('a').forEach(item => {
    item.onclick = function(){
        alert(`You clicked the "${item.innerText}" menu item.`)
    }
})