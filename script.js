const grid = document.getElementById('etcha');

let size = 10;
let brushColor = 'black';
let rainbowMode = false;
let grayScaleMode = false;
let normalMode = true;
let isGridOn = true;


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
        if (e.ctrlKey == true) {
            e.target.style.backgroundColor = 'white';
        } else if (normalMode) {
            e.target.style.backgroundColor = `${brushColor}`
        } else if (rainbowMode) {
            const ranRed = Math.floor(Math.random() * 256)
            const ranGreen = Math.floor(Math.random() * 256)
            const ranBlue = Math.floor(Math.random() * 256)
            e.target.style.backgroundColor = `rgb(${ranRed}, ${ranGreen}, ${ranBlue})`
        }
    }
}

const clearBtn = document.querySelector('.clear')
clearBtn.addEventListener('click', clearGrid)
const colorPicker = document.querySelector('.colorPicker')
colorPicker.addEventListener("change", watchColorPicker, false);
const gridSizeSlider = document.querySelector('.gridSizeSlider');
const newGridBtn = document.querySelector("#createNewGrid");
newGridBtn.addEventListener("click", createNewGrid);
const sizeMeter = document.querySelector("#gridSizeMeter");
const rainbowBtn = document.querySelector(".rainbowBtn");
rainbowBtn.addEventListener("click", changeMode);
const normalBtn = document.querySelector(".normalBtn");
normalBtn.addEventListener("click", changeMode);
const downloadBtn = document.querySelector(".downloadBtn");
downloadBtn.addEventListener("click", downloadImage);
const toggleGridBtn = document.querySelector(".toggleGridBtn");
toggleGridBtn.addEventListener("click", toggleGrid);
const xBtn = document.querySelector(".xBtn");
xBtn.addEventListener("click", closeWindow);
const etchaIcon = document.querySelector("#etchaIcon");
etchaIcon.addEventListener("click", closeWindow);

function closeWindow() {
    let progWindow = document.querySelector(".etchadiv");
    progWindow.classList.toggle('hidden')
}

function toggleGrid() {
    let gridItems = document.querySelectorAll('.grid-element');
    gridItems.forEach(e => e.classList.toggle('unbordered'));
}

function changeMode() {
    if (this.className === "rainbowBtn") {
        normalMode = false;
        grayScaleMode = false;
        rainbowMode = true;
    } else if (this.className === "normalBtn") {
        rainbowMode = false;
        grayScaleMode = false;
        normalMode = true;
    }
}

function downloadImage () {
    html2canvas(document.querySelector(".etcha"), {
        onrendered: function(canvas)
        {
        canvas.toBlob(function(blob) {
        saveAs(blob, "etchasketch95_image.png");
        });
        }
        });
}


gridSizeSlider.oninput = function () {
    size = this.value;
    sizeMeter.textContent = size + "x" + size;
}
sizeMeter.textContent = size + "x" + size;

function watchColorPicker(e) {
    brushColor = e.target.value;
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