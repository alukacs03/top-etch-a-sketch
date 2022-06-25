const grid = document.getElementById('etcha');

let size = 10;
let brushColor = 'black';

function createGrid (size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement("div");
        gridElement.classList.add('grid-element');
        gridElement.addEventListener('mouseover', changeColor)
        gridElement.addEventListener('click', changeColor)
        gridElement.addEventListener('dragstart', (e) => {
            e.preventDefault()
        })
        gridElement.addEventListener('drop', (e) => {
            e.preventDefault()
        })
        grid.appendChild(gridElement);
    }
}

function changeColor(e) {
    if (e.buttons >= 1 || e.type == "click") {
        if (e.altKey == true) {
            e.target.style.backgroundColor = 'white';
        } else {
            e.target.style.backgroundColor = `${brushColor}`
        }
    }
}

const clearBtn = document.querySelector('.clear')
clearBtn.addEventListener('click', clearGrid)
const colorPicker = document.querySelector('.colorPicker')
colorPicker.addEventListener("change", watchColorPicker, false);
const gridSizeSlider = document.querySelector('.gridSizeSlider');
gridSizeSlider.addEventListener("change", watchGridSizeSlider, false);
const newGridBtn = document.querySelector("#createNewGrid");
newGridBtn.addEventListener("click", createNewGrid);
const sizeMeter = document.querySelector("#gridSizeMeter");
sizeMeter.textContent = size + "x" + size;

function watchColorPicker(e) {
    brushColor = e.target.value;
}

function watchGridSizeSlider(e) {
    size = e.target.value;
    sizeMeter.textContent = size + "x" + size;
}



function clearGrid() {
    let gridItems = document.querySelectorAll('.grid-element');
    gridItems.forEach(e => e.style.backgroundColor = 'white');
}

function createNewGrid() {
    let gridItems = document.querySelectorAll('.grid-element');
    gridItems.forEach(e => e.remove());
    createGrid(size);
}

window.onload = () => {
    createGrid(size);
}