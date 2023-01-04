let canvas04 = document.getElementById("canvas-gen04");
let ctx04 = canvas04.getContext("2d");
let isPlaying04 = false;

let n04 = 2; // Number of points to draw
let n04Max = 23; // Maximum number of points to draw
let points04 = []; // Array of points to draw
let vMag04 = 3; // Magnitude of velocity

let frames04 = 0; // Number of frames drawn
let fps04 = 30; // Frames per second

draw04(); // Start drawing!

// ===== Canvas helpers ========================================================

// Set the canvas back to default white background
function resetCanvas04() {
    ctx04.fillStyle = "black";
    ctx04.fillRect(0, 0, canvas04.width, canvas04.height);
}

// Draw a play button (triangle pointing right) on the center of the canvas
function drawPlayButton04() {
    ctx04.fillStyle = "black";
    ctx04.beginPath();
    ctx04.moveTo(canvas04.width / 2 - 10, canvas04.height / 2 - 10);
    ctx04.lineTo(canvas04.width / 2 - 10, canvas04.height / 2 + 10);
    ctx04.lineTo(canvas04.width / 2 + 10, canvas04.height / 2);
    ctx04.fill();

    ctx04.fillStyle = "white";
    ctx04.beginPath();
    ctx04.moveTo(canvas04.width / 2 - 8, canvas04.height / 2 - 8);
    ctx04.lineTo(canvas04.width / 2 - 8, canvas04.height / 2 + 8);
    ctx04.lineTo(canvas04.width / 2 + 8, canvas04.height / 2);
    ctx04.fill();
}

// ===== Intersection code =====================================================

// Generate a point with random velocity
function generatePoint04() {
    let point = {
        x: Math.random() * canvas04.width,
        y: Math.random() * canvas04.height,
        // Get a random velocity magnitude between -vMag and vMag
        // Make sure this velocity is greater than 2
        vx: Math.random() * (vMag04 * 2) - vMag04,
        vy: Math.random() * (vMag04 * 2) - vMag04,
    };

    return point;
}

// Check for a wall collision
function checkWallCollisions04(point) {
    if (point.x < 0 || point.x > canvas04.width) {
        point.vx *= -1;
    }

    if (point.y < 0 || point.y > canvas04.height) {
        point.vy *= -1;
    }

    return point;
}

// Check for a collision between a point and a line
function checkLineCollision04(point) {
    // Check if the point's position will be on a white pixel
    let nextX = point.x + point.vx;
    let nextY = point.y + point.vy;

    // Get the pixel data at the next position
    let pixelData = ctx04.getImageData(nextX, nextY, 1, 1).data;

    // If the pixel is white, then we have a collision
    if (pixelData[0] == 255 && pixelData[1] == 255 && pixelData[2] == 255) {
        // Make a random colored dot at that position'
        let r = Math.random() * 255,
            g = Math.random() * 255,
            b = Math.random() * 255;
        ctx04.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx04.beginPath();
        let radius = Math.random() * 10 + 5;
        ctx04.arc(nextX, nextY, radius, 0, 2 * Math.PI);
        ctx04.fill();

        if (n04 <= n04Max) {
            // On a line collision, increment the number of points
            n04++;
            points04.push(generatePoint04());
        }
    }
}

// ===== Driver code ===========================================================

function draw04loop() {
    // On each loop, draw the points
    for (let i = 0; i < n04; i++) {
        ctx04.fillStyle = "white";
        ctx04.beginPath();
        ctx04.arc(points04[i].x, points04[i].y, 2, 0, 2 * Math.PI); // Dots
        ctx04.fill();
    }

    // Then, update their positions based on their current velocities
    for (let i = 0; i < n04; i++) {
        points04[i].x += points04[i].vx;
        points04[i].y += points04[i].vy;
    }

    // Check for a wall collision
    for (let i = 0; i < n04; i++) {
        points04[i] = checkWallCollisions04(points04[i]);
    }

    // Check for line collisions
    for (let i = 0; i < n04; i++) {
        checkLineCollision04(points04[i]);
    }

    // After 20 seconds, clear the board and reset
    if (frames04 > 20 * 60) {
        n04 = 2;
        points04 = [];
        frames04 = 0;
        resetCanvas04();
        for (let i = 0; i < n04; i++) {
            points04.push(generatePoint04());
        }
    }

    // Increment the frame counter
    frames04++;
}

function draw04() {
    // Reset the canvas
    resetCanvas04();

    // Generate the points initially
    for (let i = 0; i < n04; i++) {
        points04.push(generatePoint04());
    }

    // Start the draw loop (60 fps) WITHOUT BLOCKING
    setTimeout(function a04() {
        if (isPlaying04) {
            draw04loop();
        } else {
            drawPlayButton04();
        }

        setTimeout(a04, 1000 / fps04);
    }, 1000 / fps04);
}

function playPause04() {
    isPlaying04 = !isPlaying04;
}
