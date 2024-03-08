
// const toggleElm = document.getElementsByClassName("toggle_button")
const toggleElm = document.querySelector("div.toggle_button")


// let changToggle = true;
// toggleElm[0].addEventListener("click",function(){
//     if(changToggle == true){
//         toggleElm[0].classList.add("active")
//         changToggle = false;
//     }else{
//         toggleElm[0].classList.remove("active")
//         changToggle = true;
//     }
// })

toggleElm.addEventListener("click",function(){
    toggleElm.classList.toggle("active")
})