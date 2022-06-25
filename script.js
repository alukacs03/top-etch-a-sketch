const grid = document.getElementById('etcha');
console.log(grid)

let size = 16;

function createGrid (size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement("div");
        gridElement.classList.add('grid-element');
        gridElement.addEventListener('mouseover', console.log('nice'));
        gridElement.addEventListener('mousedown', console.log('nice'));
        grid.appendChild(gridElement);
    }
}

window.onload = () => {
    createGrid(size);
}