let canvas01 = document.getElementById("canvas-gen01");
let ctx01 = canvas01.getContext("2d");
let isPlaying01 = false;

let time01 = 0; // Time in frames
// Store a list of points to draw. Initial positions are radial from the center
let points01 = [
    {
        color: "red",
    },
    {
        color: "orange",
    },
    {
        color: "yellow",
    },
    {
        color: "green",
    },
    {
        color: "cyan",
    },
    {
        color: "blue",
    },
    {
        color: "indigo",
    },
    {
        color: "violet",
    },
];

draw01(); // Start drawing!

// ===== Math helpers ==========================================================

// Custom sine function, to calculate offset based on time
function customSine01(t) {
    return -1 * Math.cos(t / 60) + 1;
}

// ===== Canvas helpers ========================================================

// Set the canvas back to default white background
function resetCanvas01() {
    ctx01.fillStyle = "white";
    ctx01.fillRect(0, 0, canvas01.width, canvas01.height);

    // Place n dots around the circle
    let n = 16;
    ctx01.fillStyle = "black";
    for (let i = 0; i < n; i++) {
        let angle = (i / n) * 2 * Math.PI;
        let x = 500 / 2 + (500 / 2 - 25) * Math.cos(angle);
        let y = 500 / 2 + (500 / 2 - 25) * Math.sin(angle);
        ctx01.beginPath();
        ctx01.arc(x, y, 5, 0, 2 * Math.PI);
        ctx01.fill();
    }
}

// Draw a play button (triangle pointing right) on the center of the canvas
function drawPlayButton01() {
    ctx01.fillStyle = "black";
    ctx01.beginPath();
    ctx01.moveTo(canvas01.width / 2 - 10, canvas01.height / 2 - 10);
    ctx01.lineTo(canvas01.width / 2 - 10, canvas01.height / 2 + 10);
    ctx01.lineTo(canvas01.width / 2 + 10, canvas01.height / 2);
    ctx01.fill();

    ctx01.fillStyle = "white";
    ctx01.beginPath();
    ctx01.moveTo(canvas01.width / 2 - 8, canvas01.height / 2 - 8);
    ctx01.lineTo(canvas01.width / 2 - 8, canvas01.height / 2 + 8);
    ctx01.lineTo(canvas01.width / 2 + 8, canvas01.height / 2);
    ctx01.fill();
}

// ===== Driver code ===========================================================

function draw01loop() {
    // Clear the canvas
    resetCanvas01();

    // Iterate through all of the points and draw them
    for (let i = 0; i < points01.length; i++) {
        let p = points01[i];

        // Compute the new position of the point, based on the time
        let enabled = true;
        if (enabled) {
            p.x = p.x0 - 225 * p.dx * customSine01(time01 + p.offset);
            p.y = p.y0 - 225 * p.dy * customSine01(time01 + p.offset);
        } else {
            p.x = p.x0;
            p.y = p.y0;
        }

        // Draw the point as a small circle
        ctx01.fillStyle = p.color;
        ctx01.beginPath();
        ctx01.arc(p.x, p.y, 15, 0, 2 * Math.PI);
        ctx01.fill();
    }

    time01 += 1; // Increment the time
}

function draw01() {
    // Reset the canvas back to white
    resetCanvas01();

    // Set all the initial positions and offsets incrementally
    for (let i = 0; i < points01.length; i++) {
        let p = points01[i];

        // Set the initial position
        let angle = (i / 16) * 2 * Math.PI;
        p.x0 = 500 / 2 + (500 / 2 - 25) * Math.cos(angle);
        p.y0 = 500 / 2 + (500 / 2 - 25) * Math.sin(angle);

        // Compute the direction vector towards the center from the point
        p.dx = (-1 * (500 / 2 - p.x0)) / 225;
        p.dy = (-1 * (500 / 2 - p.y0)) / 225;

        // * This offset can be changed to make special patterns
        p.offset = i * 15;
    }

    // Start the draw loop (60 fps) WITHOUT BLOCKING
    setTimeout(function a01() {
        if (isPlaying01) {
            draw01loop();
        } else {
            drawPlayButton01();
        }

        setTimeout(a01, 1000 / 60);
    }, 1000 / 60);
}

function playPause01() {
    isPlaying01 = !isPlaying01;

    if (isPlaying01) {
        log05info("01", "Playing animation.");
    } else {
        log05info("01", "Paused animation.");
    }
}
