let canvas26 = document.getElementById("canvas-gen26");
let ctx26 = canvas26.getContext("2d");
let isPlaying26 = false;

let frames26 = 0; // Frame counter
let fps26 = 60; // Frames per second

let position26 = {
    x: 0,
    y: 0,
    vx: 5,
    vy: 3,
};

draw26(); // Start drawing!

// ===== Canvas helpers ========================================================

// Set the canvas back to default white background
function resetCanvas26() {
    ctx26.fillStyle = "white";
    ctx26.fillRect(0, 0, canvas26.width, canvas26.height);
}

// Draw a play button (triangle pointing right) on the center of the canvas
function drawPlayButton26() {
    ctx26.fillStyle = "black";
    ctx26.beginPath();
    ctx26.moveTo(canvas26.width / 2 - 10, canvas26.height / 2 - 10);
    ctx26.lineTo(canvas26.width / 2 - 10, canvas26.height / 2 + 10);
    ctx26.lineTo(canvas26.width / 2 + 10, canvas26.height / 2);
    ctx26.fill();

    ctx26.fillStyle = "white";
    ctx26.beginPath();
    ctx26.moveTo(canvas26.width / 2 - 8, canvas26.height / 2 - 8);
    ctx26.lineTo(canvas26.width / 2 - 8, canvas26.height / 2 + 8);
    ctx26.lineTo(canvas26.width / 2 + 8, canvas26.height / 2);
    ctx26.fill();
}

// ===== Cat code ==============================================================

// Draw the cat on the canvas given a particular position
function drawCat26() {
    // Load the cat from a URL
    let cat = new Image();
    cat.src =
        "https://en.scratch-wiki.info/w/images/thumb/ScratchCat-Small.png/200px-ScratchCat-Small.png";

    // Draw the cat on the canvas
    ctx26.drawImage(cat, position26.x, position26.y);
}

// ===== Driver code ===========================================================

function draw26loop() {
    // Clear the canvas
    resetCanvas26();

    // Draw the cat
    drawCat26();

    // Move the position
    position26.x += position26.vx;
    position26.y += position26.vy;

    // Check for a collision with the walls
    if (position26.x + 200 >= canvas26.width || position26.x <= 0) {
        position26.vx *= -1;
    }

    if (position26.y + 200 >= canvas26.height || position26.y <= 0) {
        position26.vy *= -1;
    }

    // Increment the frame counter
    frames26 += 1;
}

function draw26() {
    // Reset the canvas
    resetCanvas26();

    log05info("26", "Reset canvas 26.");

    // Start the draw loop (60 fps) WITHOUT BLOCKING
    setTimeout(function a26() {
        if (isPlaying26) {
            draw26loop();
        } else {
            drawPlayButton26();
        }

        setTimeout(a26, 1000 / fps26);
    }, 1000 / fps26);
}

function playPause26() {
    isPlaying26 = !isPlaying26;

    if (isPlaying26) {
        log05info("26", "Playing animation.");
    } else {
        log05info("26", "Paused animation.");
    }
}
