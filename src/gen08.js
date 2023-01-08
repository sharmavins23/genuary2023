let canvas08 = document.getElementById("canvas-gen08");
let ctx08 = canvas08.getContext("2d");
let isPlaying08 = false;

// The point moving around the canvas
let pointPos08 = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
};
let destPointPos08 = {
    x: 0,
    y: 0,
};
let pointTrail08 = [];
let trailLength08 = 500;
let pointRadius08 = 3;
let circleRadius08 = 150;
let isPointPicked08 = false;

let frames08 = 0; // Frame counter
let fps08 = 60; // Frames per second

draw08(); // Start drawing!

// ===== Canvas helpers ========================================================

// Set the canvas back to default white background
function resetCanvas08() {
    ctx08.fillStyle = "white";
    ctx08.fillRect(0, 0, canvas08.width, canvas08.height);
}

// Draw a play button (triangle pointing right) on the center of the canvas
function drawPlayButton08() {
    ctx08.fillStyle = "black";
    ctx08.beginPath();
    ctx08.moveTo(canvas08.width / 2 - 10, canvas08.height / 2 - 10);
    ctx08.lineTo(canvas08.width / 2 - 10, canvas08.height / 2 + 10);
    ctx08.lineTo(canvas08.width / 2 + 10, canvas08.height / 2);
    ctx08.fill();

    ctx08.fillStyle = "white";
    ctx08.beginPath();
    ctx08.moveTo(canvas08.width / 2 - 8, canvas08.height / 2 - 8);
    ctx08.lineTo(canvas08.width / 2 - 8, canvas08.height / 2 + 8);
    ctx08.lineTo(canvas08.width / 2 + 8, canvas08.height / 2);
    ctx08.fill();
}

// Draw the large black circle
function drawCircle08() {
    ctx08.strokeStyle = "black";
    ctx08.lineWidth = 2;
    ctx08.beginPath();
    ctx08.arc(
        canvas08.width / 2,
        canvas08.height / 2,
        circleRadius08,
        0,
        2 * Math.PI
    );
    ctx08.stroke();
}

// ===== Math functions ========================================================

// Get the circle radius given the x and y coordinates
function getCircleRadius08(x, y) {
    return Math.sqrt(x * x + y * y);
}

// Get the radius of a circle given by the point, normalized to the canvas size
function getNormalizedRadius08(x, y) {
    let newX = x - canvas08.width / 2,
        newY = y - canvas08.height / 2;

    return getCircleRadius08(newX, newY);
}

// Check if the point collides with a wall, and if it does, bounce it off
function checkWallCollision08() {
    // Check if the point is colliding with the left or right wall
    if (pointPos08.x <= 0 || pointPos08.x >= canvas08.width) {
        pointPos08.vx *= -1;
    }

    // Check if the point is colliding with the top or bottom wall
    if (pointPos08.y <= 0 || pointPos08.y >= canvas08.height) {
        pointPos08.vy *= -1;
    }

    if (pointPos08.x <= 0) pointPos08.x = 0;
    if (pointPos08.x >= canvas08.width) pointPos08.x = canvas08.width;
    if (pointPos08.y <= 0) pointPos08.y = 0;
    if (pointPos08.y >= canvas08.height) pointPos08.y = canvas08.height;
}

// ===== Driver code ===========================================================

function draw08loop() {
    let vCap = 1;
    let normFactor = 0.01;

    // Clear the canvas
    resetCanvas08();
    // Redraw the circle
    drawCircle08();

    // If there isn't a point picked, pick a random point
    if (!isPointPicked08) {
        destPointPos08.x = Math.random() * canvas08.width;
        destPointPos08.y = Math.random() * canvas08.height;
        isPointPicked08 = true;
    }

    // If the point is near the point picked, flag a point as not picked
    let cutoff = 50;
    if (
        Math.abs(pointPos08.x - destPointPos08.x) <= cutoff &&
        Math.abs(pointPos08.y - destPointPos08.y) <= cutoff
    ) {
        isPointPicked08 = false;
    }

    // Compute the direction vector from the point's current position to the destination
    let dirX = destPointPos08.x - pointPos08.x,
        dirY = destPointPos08.y - pointPos08.y;

    dirX *= normFactor;
    dirY *= normFactor;

    // Modify the point's velocity
    pointPos08.vx += dirX;
    pointPos08.vy += dirY;
    if (pointPos08.vx >= vCap) pointPos08.vx = vCap;
    if (pointPos08.vy >= vCap) pointPos08.vy = vCap;

    // Modify the point's position based on the direction vector
    pointPos08.x += pointPos08.vx;
    pointPos08.y += pointPos08.vy;

    // Check if the point is colliding with a wall
    checkWallCollision08();

    // Draw the point
    // If the point is within the circle, fill it with blue
    // Otherwise, fill it with red
    if (getNormalizedRadius08(pointPos08.x, pointPos08.y) <= circleRadius08) {
        ctx08.fillStyle = "blue";
    } else {
        ctx08.fillStyle = "red";
    }
    ctx08.beginPath();
    ctx08.arc(pointPos08.x, pointPos08.y, pointRadius08, 0, 2 * Math.PI);
    ctx08.fill();

    // Add the position to the point trail history, in the front
    pointTrail08.unshift({ x: pointPos08.x, y: pointPos08.y });
    // Check the size of the point trail history
    if (pointTrail08.length > trailLength08) {
        // If it's too long, remove the last element
        pointTrail08.pop();
    }

    // Draw the point trail
    ctx08.lineWidth = pointRadius08;
    for (let i = 0; i < pointTrail08.length; i++) {
        let trailPoint = pointTrail08[i];

        // Compute the opacity of this point
        let alpha = 1 - i / pointTrail08.length;
        // Set the color of the point
        if (
            getNormalizedRadius08(trailPoint.x, trailPoint.y) <= circleRadius08
        ) {
            ctx08.strokeStyle = "rgba(0, 0, 255, " + alpha + ")";
        } else {
            ctx08.strokeStyle = "rgba(255, 0, 0, " + alpha + ")";
        }

        // Draw the point
        ctx08.beginPath();
        ctx08.arc(trailPoint.x, trailPoint.y, pointRadius08, 0, 2 * Math.PI);
        ctx08.stroke();
    }

    // Increment the frame counter
    frames08 += 1;

    // Every 10 seconds, reset the canvas
    if (frames08 >= fps08 * 20) {
        resetCanvas08();
        frames08 = 0;
    }
}

function draw08() {
    // Reset the canvas
    resetCanvas08();

    // Compute a random position for the point
    pointPos08.x = Math.random() * canvas08.width;
    pointPos08.y = Math.random() * canvas08.height;

    log05info("08", "Reset canvas 08.");

    // Start the draw loop (60 fps) WITHOUT BLOCKING
    setTimeout(function a08() {
        if (isPlaying08) {
            draw08loop();
        } else {
            drawPlayButton08();
        }

        setTimeout(a08, 1000 / fps08);
    }, 1000 / fps08);
}

function playPause08() {
    isPlaying08 = !isPlaying08;

    if (isPlaying08) {
        log05info("08", "Playing animation.");
    } else {
        log05info("08", "Paused animation.");
    }
}
