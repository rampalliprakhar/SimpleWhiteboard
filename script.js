// DOM
const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
// Body
const body = document.querySelector('body');
// Size of the pen
//let brushSize = ctx.lineWidth;
var brushSize = 5;
// Drawing tools
let tools = 'pen';
// Background color variable
var colorChoice ='';
// Coordinates
let endX = 0;
let endY = 0;
// Array of variable shapes
let shapes = [];
// Drag objects along with its value
let draggable = false;
let dragStartX, dragStartY;

// Body background change by user choice
var bgColor = document.getElementById("usercolor");

bgColor.addEventListener("input", function(){
  colorChoice = bgColor.value;
  body.style.backgroundColor = colorChoice;
}, false);



window.addEventListener('load', ()=>{
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext('2d');
    //Resizing
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    // variables
    let paint = false;
    // starting point of the stroke
    function startPosition(e){
        paint = true;
        draw(e);
    }
    // ending point of the stroke
    function endPosition(){
        paint = false;
        ctx.beginPath();
    }
    // drawing function
    function draw(e){
        if(!paint) return;
        brushSize;
        ctx.lineCap = "round";
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    }
    // EventListeners
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);
});
// Erase the whiteboard
function erase(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
}
// slider value
document.getElementById("slider").oninput = function() {
    paint = null;
    brushSize = document.getElementById("slider").value;
    document.getElementById("sliderMax").innerHTML = brushSize;
    ctx.lineWidth = brushSize;
}; 
// Change the color type
function changeColorType(color, colorName) {
    ctx.strokeStyle = color;
    document.getElementById('colorDropdownBtn').textContent = colorName;
}
