// An example for a draw function - Find and replace XX with number
let canvasXX = document.getElementById("canvas-genXX");
let ctxXX = canvas02.getContext("2d");

drawXX(); // Start drawing!

// ===== Canvas helpers ========================================================

// Set the canvas back to default white background
function resetCanvasXX() {
    ctxXX.fillStyle = "white";
    ctxXX.fillRect(0, 0, canvasXX.width, canvasXX.height);
}

// ===== Driver code ===========================================================

function drawXXloop() {}

function drawXX() {
    // Reset the canvas
    resetCanvasXX();

    // Start the draw loop (60 fps) WITHOUT BLOCKING
    setTimeout(function aXX() {
        drawXXloop();
        setTimeout(aXX, 1000 / 60);
    }, 1000 / 60);
}
