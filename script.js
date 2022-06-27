const grid = document.getElementById('etcha');

// creating and setting default values to variables

let size = 10;
let brushColor = 'black';
let rainbowMode = false;
let normalMode = true;
let isGridOn = true;


// function used to create the grid
function createGrid (size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement("div");
        gridElement.classList.add('grid-element');
        gridElement.addEventListener('mouseover', changeColor)
        gridElement.addEventListener('click', changeColor)
        gridElement.addEventListener('dragstart', (e) => { // used so that when dragging the mouse over the grid, the annoying dragging icon doesn't show up
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
        if (e.ctrlKey == true) { // while ctrl is pressed, eraser is activated
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

// button declarations, adding eventlisteners and triggering the respective functions
const clearBtn = document.querySelector('.clear')
clearBtn.addEventListener('click', clearGrid)
const colorPicker = document.querySelector('.colorPicker')
colorPicker.addEventListener("change", watchColorPicker, false);
const gridSizeSlider = document.querySelector('.gridSizeSlider');
const newGridBtn = document.querySelector("#createNewGrid");
newGridBtn.addEventListener("click", createNewGrid);
const sizeMeter = document.querySelector("#gridSizeMeter");
sizeMeter.textContent = size + "x" + size;
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
    if (progWindow.style.display === "none") {
        progWindow.style.display = "flex";
    } else {
        progWindow.style.display = "none";
    }
}

// toggles the class "unbordered" on all the grid items, which is set up in CSS to set border to 0
function toggleGrid() {
    let gridItems = document.querySelectorAll('.grid-element');
    gridItems.forEach(e => e.classList.toggle('unbordered'));
}

// triggered  by thte Rainbow and Normal mode buttons
function changeMode() {
    if (this.className === "rainbowBtn") {
        normalMode = false;
        rainbowMode = true;
    } else if (this.className === "normalBtn") {
        rainbowMode = false;
        normalMode = true;
    }
}

// image downloader
function downloadImage () { 
    html2canvas(document.querySelector(".etcha"), {
        onrendered: function(canvas) {
            canvas.toBlob(function(blob) {
            saveAs(blob, "etchasketch95_image.png");
            });
        }
    });
}

// set size based on slider, as well as display it under it
gridSizeSlider.oninput = function () {
    size = this.value;
    sizeMeter.textContent = size + "x" + size;
}

// set brush color based on color picker
function watchColorPicker(e) {
    brushColor = e.target.value;
}

// clear the grid by setting all the grid-elemnt backgrounds to white
function clearGrid() {
    let gridItems = document.querySelectorAll('.grid-element');
    gridItems.forEach(e => e.style.backgroundColor = 'white');
}

// create a new grid based on the size set with the slider
// removes the previous grid then triggers the createGrid function
function createNewGrid() {
    let gridItems = document.querySelectorAll('.grid-element');
    gridItems.forEach(e => e.remove());
    createGrid(size);
}

window.onload = () => {
    createGrid(size);
}