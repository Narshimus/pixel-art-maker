//let brushColors = ['black','navy','#0080C0','powderblue','darkred','crimson','papayawhip','white'];
const BRUSH_ICONS = 14;
let brush = 'black';

//populates header with icons for changing current brush color
function createBrushButtons() {
  let header = document.querySelector('header');
  for (let i = 0; i < BRUSH_ICONS; i++) {
    let new_div = document.createElement("div");
    new_div.className = ('palette');
    new_div.style.backgroundColor = (`rgb(${getRandom()}, ${getRandom()}, ${getRandom()})`)
    new_div.addEventListener('click', function() {
      brush = this.style.backgroundColor;
    });
    header.appendChild(new_div);
  }
}
//populates canvas with cells
function populateCanvas(size) {
  let canvas = document.querySelector('.canvas')
  for (let i = 0; i < (size * size); i++) {
    let new_div = document.createElement("div");
    new_div.className = ('cell');
    new_div.style.height = `${100/size}%`, new_div.style.width = `${100/size}%`;
    new_div.addEventListener('click', function() {
      this.style.backgroundColor = brush;
    });
    canvas.appendChild(new_div);
  }
}
//get random rgb value
function getRandom() {
  return Math.floor(Math.random() * 256)
}
//toggle for displaying canvas grid lines
function createGridToggle() {
  let canvas = document.querySelector('.canvas');
  let toggle = document.querySelector('.toggle-grid');
  toggle.addEventListener('click', function() {
    for (let i = 0; i < canvas.childNodes.length; i++) {
      if (toggle.textContent === 'Grid: On') {
        canvas.childNodes[i].style.borderStyle = 'hidden';
      } else {
        canvas.childNodes[i].style.borderStyle = 'solid';
      }
    }
    toggle.textContent === 'Grid: On' ? toggle.textContent = 'Grid: Off' : toggle.textContent = 'Grid: On'
  });
}
//set color of all div elements on canvas to white
function createClearGrid() {
  let clear = document.querySelector('.clear-canvas')
  clear.addEventListener('click', function() {
    let canvas = document.querySelector('.canvas')
    for (let i = 0; i < canvas.childNodes.length; i++) {
      canvas.childNodes[i].style.backgroundColor = 'white';
    }
    canvas.childNodes[0].style.backgroundColor = 'white';
  });
}
//remove div elements from canvas
function depopulateCanvas() {
  let canvas = document.querySelector('.canvas');
  let size = canvas.childNodes.length;
  for (let i = 1; i <= size; i++) {
    canvas.removeChild(canvas.childNodes[0]);
  }
}
//Add event listeners to size buttons
function sizeButtons() {
  let buttons = document.getElementsByClassName('button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      depopulateCanvas();
      populateCanvas(parseInt(buttons[i].getAttribute('grid-size')));
      resetGridButtonText();
    });
  }
}
//helper function to reset button Ui when grid change occurs
function resetGridButtonText() {
  let toggle = document.querySelector('.toggle-grid');
  toggle.textContent = 'Grid: On'
}

populateCanvas(16);
createBrushButtons();
createGridToggle();
createClearGrid();
sizeButtons();
