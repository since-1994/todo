const canvasContainer = document.querySelector('.app__paint .canvas__container');
const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');
ctx.lineWidth = "1";
const widthRange = document.querySelector('#jsWidthRange');
const colors = document.querySelectorAll('.colors__color');
const widths = document.querySelectorAll('.app__paint__widths .widths__width');
const drawer = document.querySelector('#jsAppPaintDrawer');
const drawerOpenBtn =document.querySelector('#jsAppPaintDrawerOpenBtn');
const drawerCloseBtn =document.querySelector('#jsAppPaintDrawerCloseBtn');

//mode
const pencilBtn = document.querySelector('#jsPencilModeBtn');
const eraserBtn = document.querySelector('#jsEraserModeBtn');
const modeName= document.querySelector('#jsAppPaintDrawerMode');

const eraser = document.querySelector('#jsAppPaintEraser');
const paintAllClear = document.querySelector('#jsAppPaintAC');

let mode = 0;

let painting = false;
let erasing = false;
let selectedColor = 0;
let selectedWidth = 0;

const handleMouseDown = (e) => {
    if(mode === 0){
        painting = true;
        const x = e.offsetX;
        const y = e.offsetY;
        ctx.beginPath();       // Start a new path
        ctx.moveTo(x, y);    // Move the pen to (30, 50)
        console.log(x, y);
    }else{
        erasing = true;
    }
}
const stopPainting = (e) => {
    painting = false;
}

const handleMousemove = (e) => {
    if(mode === 0 && painting){
        const x = e.offsetX;
        const y = e.offsetY;
        ctx.lineTo(x, y);  // Draw a line to (150, 100)
        ctx.stroke();          // Render the path
    }else if(mode === 1 && erasing){
        const x = e.offsetX;
        const y = e.offsetY;

        eraser.style.opacity = "1";
        eraser.style.left = String(x)+"px";
        eraser.style.top = String(y)+"px";
        ctx.clearRect(x-10, y-10, 20, 20);
    }
}
const handleMouseleave = (e) => {
    painting = false;
    erasing = false;
    eraser.style.opacity = '0';
}
const handleMouseup = (e) => {
    painting = false;
    erasing = false;
    eraser.style.opacity = '0';
}

const handleDrawerClose = (e) => {
    drawer.classList.remove('active');
}

const handleDrawerOpen = (e) => {
    drawer.classList.add('active');
}
const selectColor = (color, idx) => {
    color.style.backgroundColor = color.getAttribute('data-color');
    color.addEventListener('click', function(e){
        colors[selectedColor].classList.remove('selected');
        selectedColor = idx;
        color.classList.add('selected');
        ctx.strokeStyle = this.getAttribute('data-color');
    })
};


function init(){
    console.log(canvasContainer.width);
    canvas.width = 330;
    canvas.height = 660;
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMousemove);
    canvas.addEventListener('mouseleave', handleMouseleave);
    canvas.addEventListener('mouseup', handleMouseup)
    colors.forEach((color, idx) => selectColor(color, idx));
    widths.forEach((width, idx)=> {
        width.children[0].style.height = width.getAttribute('data-width');
        console.log(width.getAttribute('data-width').split('px')[0]);
        width.addEventListener('click', function(e){
            console.log(width.getAttribute('data-width').split('px')[0]);
            ctx.lineWidth = width.getAttribute('data-width').split('px')[0];
            widths[selectedWidth].classList.remove('selected');
            width.classList.add('selected');
            selectedWidth = idx;
        })
    });
    drawerOpenBtn.addEventListener('click', handleDrawerOpen);
    drawerCloseBtn.addEventListener('click', handleDrawerClose);

    eraserBtn.addEventListener('click', e => {
        pencilBtn.classList.remove('selected');
        eraserBtn.classList.add('selected');
        mode = 1
        modeName.innerText = '지우개';
    });
    pencilBtn.addEventListener('click', e => {
        eraserBtn.classList.remove('selected');
        pencilBtn.classList.add('selected');
        mode = 0
        modeName.innerText = '연필';
    });
    paintAllClear.addEventListener('click', e => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    })
}

init();

// let erasing = false;
// canvas.addEventListener('mousedown', (e) => {
//     erasing = true;
// });

// canvas.addEventListener('mousemove', e => {
//     if(erasing){
//         const x = e.offsetX;
//         const y = e.offsetY;
//         ctx.clearRect(x, y, 5, 5);
//     }
// });

// canvas.addEventListener('mouseleave', e => erasing = false );

// canvas.addEventListener('mouseup', e => {
//     erasing = false;
// })
