let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let sizeSlide = document.getElementById("cursorSize");
let brushSize = (ctx.lineWidth);

window.addEventListener('load', ()=>{
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext('2d');

    //Resizing
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    // variables
    let paint = false;

    function startPosition(){
        paint = true;
        draw(e);
    }
    function endPosition(){
        paint = false;
        ctx.beginPath();
    }
    function draw(e){
        if(!paint) return;
        //ctx.lineWidth = 12;
        brushSize;
        ctx.lineCap = "round";

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }
    // EventListeners
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);
});
function erase(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
}
function changeColorType(){
    ctx.strokeStyle = document.getElementById("Colors").value;
}
/*
function changeShape(){
    canvas.add(rectangleDraw(e));
}
const rectangleDraw = (e) => {
    ctx.strokeRect(e.clientX, e.clientY, prevMouseX - e.clientX, prevMouseY - e.clientY);
}
const triangleDraw = (e) => {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.lineTo(prevMouseX * 2 - e.clientX, e.clientY);
    ctx.closePath();
}
const circleDraw = (e) => {
    ctx.beginPath();
    let radius = Math.sqrt(Math.pow(prevMouseX - e.clientX), 2) + (Math.pow(prevMouseY - e.clientY),2);
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
}*/
sizeSlide.addEventListener("change", () => brushSize = sizeSlide.value());