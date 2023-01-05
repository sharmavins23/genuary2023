// An example for a draw function - Find and replace XX with number
let canvasXX = document.getElementById("canvas-genXX");
let ctxXX = canvasXX.getContext("2d");
let isPlayingXX = false;

let framesXX = 0; // Frame counter
let fpsXX = 60; // Frames per second

drawXX(); // Start drawing!

// ===== Canvas helpers ========================================================

// Set the canvas back to default white background
function resetCanvasXX() {
    ctxXX.fillStyle = "white";
    ctxXX.fillRect(0, 0, canvasXX.width, canvasXX.height);
}

// Draw a play button (triangle pointing right) on the center of the canvas
function drawPlayButtonXX() {
    ctxXX.fillStyle = "black";
    ctxXX.beginPath();
    ctxXX.moveTo(canvasXX.width / 2 - 10, canvasXX.height / 2 - 10);
    ctxXX.lineTo(canvasXX.width / 2 - 10, canvasXX.height / 2 + 10);
    ctxXX.lineTo(canvasXX.width / 2 + 10, canvasXX.height / 2);
    ctxXX.fill();

    ctxXX.fillStyle = "white";
    ctxXX.beginPath();
    ctxXX.moveTo(canvasXX.width / 2 - 8, canvasXX.height / 2 - 8);
    ctxXX.lineTo(canvasXX.width / 2 - 8, canvasXX.height / 2 + 8);
    ctxXX.lineTo(canvasXX.width / 2 + 8, canvasXX.height / 2);
    ctxXX.fill();
}

// ===== Driver code ===========================================================

function drawXXloop() {
    // Increment the frame counter
    framesXX += 1;
}

function drawXX() {
    // Reset the canvas
    resetCanvasXX();

    logXXinfo("Reset canvas XX.");

    // Start the draw loop (60 fps) WITHOUT BLOCKING
    setTimeout(function aXX() {
        if (isPlayingXX) {
            drawXXloop();
        } else {
            drawPlayButtonXX();
        }

        setTimeout(aXX, 1000 / fpsXX);
    }, 1000 / fpsXX);
}

function playPauseXX() {
    isPlayingXX = !isPlayingXX;

    if (isPlayingXX) {
        log05info("XX", "Playing animation.");
    } else {
        log05info("XX", "Paused animation.");
    }
}
