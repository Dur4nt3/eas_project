// Etch-a-Sketch Logic
function draw(e) {
    if (e.buttons == 1){
        let target = e.target;
        target.style.opacity = +(target.style.opacity) + 0.1;
    }
}

function clear() {
    let boxes = document.querySelectorAll(".draw-box");
    boxes.forEach((box) => { box.style.opacity = 0; });
}

function checkValidity(size) {
// Check if selected size is valid and customize input element accordingly
    if (created) {
        let text = "A board is already created; creating a new one will discard the current session, are you sure you want to continue?"
        if (confirm(text)){
            location.reload()
        }
    }

    if (Number.isInteger(size)) {
        if (16 <= size && size <= 120){
            input.value = "";
            input.placeholder = `Displaying a ${size}x${size} grid`;
            input.classList.remove("declined");
            input.classList.add("accepted");
            created = true;
            return true;
        }
        else {
            input.value = "";
            input.placeholder = "Please enter a number between 16 and 120"
            input.classList.remove("accepted");
            input.classList.add("declined");
            return false;
        }
    }
    input.value = "";
    input.placeholder = "Please enter a number between 16 and 120"
    input.classList.remove("accepted");
    input.classList.add("declined");
    return false;
}

function createGrid(size) {
    if(!checkValidity(size)) {
        return -1;
    }
    for (let i = 0; i < size; i++){
        for (let j = 0; j < size; j++){
            div = document.createElement("div");
            div.classList.add("draw-box");
            div.addEventListener("mouseenter", function(e) { draw(e); })
            drawingCont.appendChild(div);
        }
    }

    // Formula for individual drawing box size
    finalWidth = `${960/size}px`;
    finalHeight = `${(960/size) * (3/4)}px`;
    rootVar.style.setProperty("--divWidth", finalWidth);
    rootVar.style.setProperty("--divHeight", finalHeight);
    
    return 1;
}


const submit = document.querySelector(".submit-size");
const input = document.querySelector(".insert-size");
const drawingCont = document.querySelector(".drawing-cont");

const rootVar = document.querySelector(":root");
let finalWidth = 0;
let finalHeight = 0;

const clearBoard = document.querySelector(".clear-board");

let created = false;

submit.addEventListener("click", function () { createGrid(+(input.value)); });
clearBoard.addEventListener("click", function (){
    let text = "Are you sure you want to clear the board?";
    if (confirm(text) == true){
        clear();
    }
});