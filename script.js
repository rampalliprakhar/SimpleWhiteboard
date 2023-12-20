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
        if(!painting) return;
        ctx.lineWidth = 12;
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
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width, canvas.height);
}
