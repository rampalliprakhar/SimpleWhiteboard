// DOM
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Size of the pen
let brushSize = 5; 
// Drawing tools
let tools = 'pen'; // Default tool
// Background color variable
let colorChoice = ''; 
// Array of shapes
let shapes = [];
// Variables for dragging
let draggable = false;
let dragStartX, dragStartY;
let draggedShape = null; 
let paint = false; // To track if the user is currently drawing

// Function to resize the canvas
function resizeCanvas() {
    // Save the current canvas state as an image
    const savedImageURL = canvas.toDataURL('image/png');

    // Set the canvas dimensions to the window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Restore the saved image to the canvas
    const img = new Image();
    img.src = savedImageURL;
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
    };
}

// Call resizeCanvas on window load
window.addEventListener('load', () => {
    resizeCanvas(); // Initial resize
});

// Call resizeCanvas on window resize
window.addEventListener('resize', resizeCanvas);

// Function to get mouse position relative to the canvas
function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// Function to start drawing
function startPosition(e) {
    if (draggable) return; // Prevent drawing if dragging
    paint = true;
    draw(e);
}

// Function to end drawing
function endPosition() {
    paint = false;
    ctx.beginPath();
}

// Function to draw on the canvas
function draw(e) {
    if (!paint) return;
    const pos = getMousePos(canvas, e); // Get adjusted mouse position
    ctx.lineCap = "round";
    ctx.lineWidth = brushSize; 
    ctx.strokeStyle = tools === 'eraser' ? '#ffffff' : document.getElementById('usercolor').value; // Use white for eraser
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
}

// Function to start dragging
function startDrag(e) {
    const pos = getMousePos(canvas, e); // Get adjusted mouse position
    dragStartX = pos.x;
    dragStartY = pos.y;
    draggable = true;

    // Check if a shape is clicked
    draggedShape = shapes.find(shape => isInsideShape(shape, dragStartX, dragStartY));
}

// Function to end dragging
function endDrag() {
    draggable = false;
    ctx.beginPath();
}

// Function to handle dragging
function drag(e) {
    if (!draggable || !draggedShape) return;

    const pos = getMousePos(canvas, e); // Get adjusted mouse position
    const dx = pos.x - dragStartX;
    const dy = pos.y - dragStartY;

    // Update the shape's position
    draggedShape.x += dx;
    draggedShape.y += dy;

    // Redraw the canvas
    redrawCanvas();

    // Update the starting point for the next drag
    dragStartX = pos.x;
    dragStartY = pos.y;
}

// Function to check if the mouse is inside a shape
function isInsideShape(shape, x, y) {
    return x >= shape.x && x <= shape.x + shape.width && y >= shape.y && y <= shape.y + shape.height;
}

// Function to redraw the canvas
function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Redraw all shapes
    shapes.forEach(shape => {
        ctx.fillStyle = shape.color; 
        ctx.fillRect(shape.x, shape.y, shape.width, shape.height); 
    });
};

// EventListeners for drawing
canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);

// EventListeners for dragging
canvas.addEventListener("mousedown", startDrag);
canvas.addEventListener("mouseup", endDrag);
canvas.addEventListener("mousemove", drag);

// Erase the whiteboard
function erase() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes = []; // Clear shapes array if needed
}

// Pen thickness value
document.getElementById("slider").oninput = function() {
    brushSize = this.value; 
    document.getElementById("sliderMax").innerHTML = brushSize;
    ctx.lineWidth = brushSize; 
}; 

// Change the color type
function changeColorType(color, colorName) {
    ctx.strokeStyle = color;
    document.getElementById('colorDropdownBtn').textContent = colorName;
}

// Saving image
function saveImage() {
    const imgURL = canvas.toDataURL('image/png');
    const imgLink = document.createElement('a');
    imgLink.href = imgURL;
    imgLink.download = "image.png";
    imgLink.click();
}

// Update tool selection
document.getElementById('toolSelect').addEventListener('change', function() {
    tools = this.value; // Update the current tool based on selection
});