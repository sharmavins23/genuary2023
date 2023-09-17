let canvas12 = document.getElementById("canvas-gen12");
let ctx12 = canvas12.getContext("2d");
let isPlaying12 = false;

let frames12 = 0; // Frame counter
let fps12 = 120; // Frames per second

// The randomly selected point within the triangle
let currentPoint12 = {
    x: 250,
    y: 250,
};

let pointVariance = 100;

let basePoints12 = [
    { x: 0, y: 500, color: "red" },
    { x: 500, y: 500, color: "green" },
    { x: 250, y: 0, color: "blue" },
];

let maxDistance12 = 0;

draw12(); // Start drawing!

// ===== Canvas helpers ========================================================

// Set the canvas back to default white background
function resetCanvas12() {
    ctx12.fillStyle = "black";
    ctx12.fillRect(0, 0, canvas12.width, canvas12.height);
}

// Draw a play button (triangle pointing right) on the center of the canvas
function drawPlayButton12() {
    ctx12.fillStyle = "black";
    ctx12.beginPath();
    ctx12.moveTo(canvas12.width / 2 - 10, canvas12.height / 2 - 10);
    ctx12.lineTo(canvas12.width / 2 - 10, canvas12.height / 2 + 10);
    ctx12.lineTo(canvas12.width / 2 + 10, canvas12.height / 2);
    ctx12.fill();

    ctx12.fillStyle = "white";
    ctx12.beginPath();
    ctx12.moveTo(canvas12.width / 2 - 8, canvas12.height / 2 - 8);
    ctx12.lineTo(canvas12.width / 2 - 8, canvas12.height / 2 + 8);
    ctx12.lineTo(canvas12.width / 2 + 8, canvas12.height / 2);
    ctx12.fill();
}

// Draw a point at a particular x, y coordinate
function drawPoint12(x, y) {
    ctx12.fillRect(x, y, 1, 1);
}

// Re-generate the randomly selected point and the chosen base points
function resetBases12() {
    // Start with picking a new random base point
    currentPoint12 = pickRandomPoint12();

    // Now pick the bases
    // Base 0 is somewhere in the bottom left quarter of the canvas (x < 250, y > 250)
    basePoints12[0] = {
        x: Math.random() * 250,
        y: 250 + Math.random() * 250,
        color: "red",
    };
    // Base 1 is somewhere in the bottom right quarter of the canvas (x > 250, y > 250)
    basePoints12[1] = {
        x: 250 + Math.random() * 250,
        y: 250 + Math.random() * 250,
        color: "green",
    };
    // Base 2 is somewhere in the top half of the canvas (y < 250)
    basePoints12[2] = {
        x: Math.random() * 500,
        y: Math.random() * 250,
        color: "blue",
    };

    // Compute the maximal distance between the base points
    maxDistance12 = Math.max(
        Math.sqrt(
            Math.pow(basePoints12[0].x - basePoints12[1].x, 2) +
                Math.pow(basePoints12[0].y - basePoints12[1].y, 2)
        ),
        Math.sqrt(
            Math.pow(basePoints12[0].x - basePoints12[2].x, 2) +
                Math.pow(basePoints12[0].y - basePoints12[2].y, 2)
        ),
        Math.sqrt(
            Math.pow(basePoints12[1].x - basePoints12[2].x, 2) +
                Math.pow(basePoints12[1].y - basePoints12[2].y, 2)
        )
    );
}

// Pick a point at random from the base three points
function pickRandomPoint12() {
    // The random point must be within the triangle formed from the 3 bases
    let randomPoint = {
        x: 0,
        y: 0,
    };

    // Pick a random point within the triangle
    let r1 = Math.random();
    let r2 = Math.random();

    randomPoint.x =
        (1 - Math.sqrt(r1)) * basePoints12[0].x +
        Math.sqrt(r1) * (1 - r2) * basePoints12[1].x +
        Math.sqrt(r1) * r2 * basePoints12[2].x;
    randomPoint.y =
        (1 - Math.sqrt(r1)) * basePoints12[0].y +
        Math.sqrt(r1) * (1 - r2) * basePoints12[1].y +
        Math.sqrt(r1) * r2 * basePoints12[2].y;

    return randomPoint;
}

// ===== Driver code ===========================================================

function draw12loop() {
    // Increment the frame counter
    frames12 += 1;

    // Draw the 3 base points
    ctx12.fillStyle = basePoints12[0].color;
    ctx12.fillRect(basePoints12[0].x, basePoints12[0].y, 1, 1);
    ctx12.fillStyle = basePoints12[1].color;
    ctx12.fillRect(basePoints12[1].x, basePoints12[1].y, 1, 1);
    ctx12.fillStyle = basePoints12[2].color;
    ctx12.fillRect(basePoints12[2].x, basePoints12[2].y, 1, 1);

    // Draw the current point
    // Compute the distance between the current point and the base points
    let distance0 = Math.sqrt(
        Math.pow(currentPoint12.x - basePoints12[0].x, 2) +
            Math.pow(currentPoint12.y - basePoints12[0].y, 2)
    );
    let distance1 = Math.sqrt(
        Math.pow(currentPoint12.x - basePoints12[1].x, 2) +
            Math.pow(currentPoint12.y - basePoints12[1].y, 2)
    );
    let distance2 = Math.sqrt(
        Math.pow(currentPoint12.x - basePoints12[2].x, 2) +
            Math.pow(currentPoint12.y - basePoints12[2].y, 2)
    );
    // Compute scalars for the colors
    let scalar0 = 1 - distance0 / maxDistance12;
    let scalar1 = 1 - distance1 / maxDistance12;
    let scalar2 = 1 - distance2 / maxDistance12;
    // Now change the color R for 0, G for 1, B for 2
    ctx12.fillStyle =
        "rgb(" +
        Math.floor(255 * scalar0) +
        "," +
        Math.floor(255 * scalar1) +
        "," +
        Math.floor(255 * scalar2) +
        ")";
    drawPoint12(currentPoint12.x, currentPoint12.y);

    // Pick one of the three base points at random
    let randomBasePoint = Math.floor(Math.random() * 3);

    // Calculate the midpoint between the current point and the random base
    let midPoint = {
        x: (currentPoint12.x + basePoints12[randomBasePoint].x) / 2,
        y: (currentPoint12.y + basePoints12[randomBasePoint].y) / 2,
    };

    // Update the current point to this midpoint
    currentPoint12 = midPoint;

    // If we get to 1 million points, maybe redraw?
    if (frames12 > 1000000) {
        log05info("12", "Reached Sierpinski limit, resetting.");
        frames12 = 0;
        resetBases12();
        resetCanvas12();
    }
}

function draw12() {
    // Reset the canvas
    resetCanvas12();

    log05info("12", "Reset canvas 12.");

    // Start the draw loop (60 fps) WITHOUT BLOCKING
    setTimeout(function a12() {
        if (isPlaying12) {
            draw12loop();
        } else {
            drawPlayButton12();
        }

        setTimeout(a12, 1000 / fps12);
    }, 1000 / fps12);
}

function playPause12() {
    isPlaying12 = !isPlaying12;

    if (isPlaying12) {
        log05info("12", "Playing animation.");

        // Reset the canvas
        resetCanvas12();
        // Reset the bases
        resetBases12();
    } else {
        log05info("12", "Paused animation.");
    }
}
