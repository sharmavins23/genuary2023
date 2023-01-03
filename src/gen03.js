// An example for a draw function - Find and replace 03 with number
let canvas03 = document.getElementById("canvas-gen03");
let ctx03 = canvas03.getContext("2d");
let isPlaying03 = false;
let canvasClearedPlayButton03 = false;
let buildings03Locations = [];
let indexToRemove03 = -1;

let frameCount03 = 0;

draw03(); // Start drawing!

// ===== Canvas helpers ========================================================

// Set the canvas back to default white background
function resetCanvas03() {
    ctx03.fillStyle = `rgb(${23}, 0, ${23})`;
    ctx03.fillRect(0, 0, canvas03.width, canvas03.height);

    // Fill the top half with a gradient from black (top) to navy blue (bottom)
    let gradient = ctx03.createLinearGradient(0, 0, 0, canvas03.height / 2);
    gradient.addColorStop(0, "black");
    gradient.addColorStop(1, "rgb(0, 0, 23)");
    ctx03.fillStyle = gradient;
    ctx03.fillRect(0, 0, canvas03.width, canvas03.height / 2);
}

// Draw a play button (triangle pointing right) on the center of the canvas
function drawPlayButton03() {
    ctx03.fillStyle = "black";
    ctx03.beginPath();
    ctx03.moveTo(canvas03.width / 2 - 10, canvas03.height / 2 - 10);
    ctx03.lineTo(canvas03.width / 2 - 10, canvas03.height / 2 + 10);
    ctx03.lineTo(canvas03.width / 2 + 10, canvas03.height / 2);
    ctx03.fill();

    ctx03.fillStyle = "white";
    ctx03.beginPath();
    ctx03.moveTo(canvas03.width / 2 - 8, canvas03.height / 2 - 8);
    ctx03.lineTo(canvas03.width / 2 - 8, canvas03.height / 2 + 8);
    ctx03.lineTo(canvas03.width / 2 + 8, canvas03.height / 2);
    ctx03.fill();
}

// ===== Glitch effects ========================================================

// Draw random gray scanlines on the canvas, once every 90 frames or so
function drawScanlines03() {
    for (let i = 0; i < canvas03.height; i += 0) {
        ctx03.fillStyle = "rgba(0, 0, 0, " + Math.random() + ")";
        ctx03.fillRect(0, i, canvas03.width, 1);

        // Iterate by some random amount
        i += Math.floor(Math.random() * 50);
    }
}

// Create random noise on the canvas
function drawNoise03() {
    if (Math.random() < 0.05) {
        for (let i = 0; i < canvas03.width * canvas03.height; i++) {
            ctx03.fillStyle = "rgba(0, 0, 0, " + Math.random() + ")";
            ctx03.fillRect(
                Math.floor(Math.random() * canvas03.width),
                Math.floor(Math.random() * canvas03.height),
                1,
                1
            );
        }
    }
}

// ===== Outrun effects ========================================================

// Draw a grid zooming towards the center of the canvas
function drawGrid03() {
    let gridWidth = 50;
    let gridHeight = 50;

    // Draw horizon
    ctx03.fillStyle = "white";
    ctx03.fillRect(0, canvas03.height / 2, canvas03.width, 1);

    // Draw horizontal grid
    for (let y = canvas03.height / 2; y < canvas03.height; y += gridHeight) {
        ctx03.fillStyle = "rgba(255, 0, 255, 0.5)";
        ctx03.fillRect(0, y, canvas03.width, 1);
    }

    // Iterate through the line, drawing a grid at varying angles
    for (
        let dx = 0, iDegOffset = -50;
        dx < canvas03.width;
        dx += 25, iDegOffset += 5
    ) {
        // Compute the hypotenuse of this triangle
        let hyp = 250 / Math.cos((iDegOffset * Math.PI) / 180);
        // Compute the bottom leg of the triangle
        let leg = hyp * Math.sin((iDegOffset * Math.PI) / 180);

        ctx03.beginPath();
        ctx03.moveTo(dx, canvas03.height / 2);
        ctx03.lineTo(dx + leg, canvas03.height);
        ctx03.strokeStyle = "rgba(255, 0, 255, 0.5)";
        ctx03.stroke();
        ctx03.closePath();
    }
}

// Draw random stars on the top half of the canvas
function drawStars03() {
    let n = 200;
    for (let i = 0; i < n; i++) {
        ctx03.fillStyle = "rgba(255, 255, 255, " + Math.random() + ")";
        ctx03.fillRect(
            Math.floor(Math.random() * canvas03.width),
            Math.floor((Math.random() * canvas03.height) / 2),
            1,
            1
        );
    }
}

// Draw a giant sun (semicircle) on the top half of the canvas
function drawSun03() {
    let sunRadius = 150;
    // Draw a pink radial gradient behind the sun
    let gradientRadius = sunRadius + 50;
    let radialGradient = ctx03.createRadialGradient(
        canvas03.width / 2,
        canvas03.height / 2,
        0,
        canvas03.width / 2,
        canvas03.height / 2,
        gradientRadius
    );

    radialGradient.addColorStop(0, "rgba(255, 0, 255, 0.5)");
    radialGradient.addColorStop(1, "rgba(255, 0, 255, 0)");
    ctx03.fillStyle = radialGradient;
    ctx03.beginPath();
    ctx03.arc(
        canvas03.width / 2,
        canvas03.height / 2,
        gradientRadius,
        Math.PI,
        0
    );
    ctx03.fill();
    ctx03.closePath();

    // Draw the sun
    ctx03.beginPath();
    ctx03.arc(canvas03.width / 2, canvas03.height / 2, sunRadius, Math.PI, 0);
    let gradient = ctx03.createLinearGradient(0, 0, 0, canvas03.height - 150);
    gradient.addColorStop(0, "rgb(255, 255, 255)");
    gradient.addColorStop(0.2, "rgb(255, 255, 50)");
    gradient.addColorStop(0.6, "rgb(255, 50, 50)");
    ctx03.fillStyle = gradient;
    ctx03.fill();
    ctx03.closePath();

    // Add a blur effect on top of the sun
    ctx03.beginPath();
    ctx03.arc(canvas03.width / 2, canvas03.height / 2, sunRadius, Math.PI, 0);
    ctx03.fillStyle = "rgba(255, 255, 255, 0.15)";
    ctx03.fill();
    ctx03.closePath();

    // Add a small gradient on top of the bottom half of the canvas
    let fgSize = 50;
    let flatGradient = ctx03.createLinearGradient(
        0,
        canvas03.height / 2,
        0,
        canvas03.height / 2 + fgSize
    );

    flatGradient.addColorStop(0, "rgba(255, 50, 50, 0.4)");
    flatGradient.addColorStop(0.5, "rgba(255, 100, 100, 0.2)");
    flatGradient.addColorStop(1, "rgba(255, 50, 50, 0)");
    ctx03.fillStyle = flatGradient;
    ctx03.fillRect(0, canvas03.height / 2, canvas03.width, fgSize);
}

// Place random buildings on the bottom half of the canvas
function drawBuildings03() {
    // If there's an index to remove, remove it
    if (indexToRemove03 > -1 && indexToRemove03 < buildings03Locations.length) {
        buildings03Locations.splice(indexToRemove03, 1);
        indexToRemove03 = -1;
    } else {
        // If it's out of bounds, set it back to -1
        indexToRemove03 = -1;
    }

    if (buildings03Locations.length === 0) {
        let n = 30;
        for (let i = 0; i < n; i++) {
            buildings03Locations.push({
                leftside: Math.random() < 0.5 ? false : true, // Is it on the left?
                x: Math.floor((Math.random() * canvas03.width) / 5),
                y: Math.floor((Math.random() * canvas03.height) / 2) + 250,
                width: Math.floor(Math.random() * 50) + 20,
                height: Math.floor(Math.random() * 100) + 100,
            });
        }

        // Sort the buildings based on their y position
        buildings03Locations.sort((a, b) => {
            return a.y - b.y;
        });
    }

    // Iterate through all of the x-y positions and draw the buildings
    for (let i = 0; i < buildings03Locations.length; i++) {
        let building = buildings03Locations[i];
        let posX = building.x;

        if (!building.leftside) {
            posX = canvas03.width - building.x;
        }

        // Randomly and rarely, pop out the buildings
        if (Math.random() < 0.95) {
            // Make the outside border
            ctx03.fillStyle = "rgb(23, 0, 255)";
            ctx03.fillRect(
                posX,
                building.y - building.height,
                building.width,
                building.height
            );

            // Make the inside black box
            ctx03.fillStyle = "rgba(0, 0, 0, 0.95)";
            ctx03.fillRect(
                posX + 1,
                building.y - building.height + 1,
                building.width - 2,
                building.height - 2
            );
        }

        // Randomly and extremely rarely, add a strange glitch artifact
        if (Math.random() < 0.005) {
            ctx03.fillStyle = "rgb(255, 0, 0)";
            ctx03.fillRect(
                posX,
                building.y - building.height,
                building.width,
                building.height
            );
            ctx03.fillStyle = "rgb(255, 255, 0)";
            ctx03.fillRect(
                posX + building.width,
                building.y - building.height,
                building.width,
                building.height
            );
            ctx03.fillStyle = "rgb(255, 255, 255)";
            ctx03.fillRect(
                posX + building.width,
                building.y - building.height,
                building.width,
                building.height / 2
            );

            // When this glitch artifact occurs, remove a random building
            indexToRemove03 = Math.floor(
                Math.random() * buildings03Locations.length
            );
        }
    }
}

// ===== Driver code ===========================================================

function draw03loop() {
    resetCanvas03();

    // Draw the grid
    drawGrid03();

    // Draw the stars
    drawStars03();

    // Draw the sun
    drawSun03();

    // Draw the buildings
    drawBuildings03();

    // Draw random scanlines
    drawScanlines03();

    // Draw random noise
    drawNoise03();

    frameCount03 += 1;
}

function draw03() {
    // Reset the canvas
    resetCanvas03();

    // Start the draw loop (60 fps) WITHOUT BLOCKING
    setTimeout(function a03() {
        if (isPlaying03) {
            if (!canvasClearedPlayButton03) {
                resetCanvas03();
                canvasClearedPlayButton03 = true;
            }
            draw03loop();
        } else {
            drawPlayButton03();
            canvasClearedPlayButton03 = false;
        }

        // Let's turn the FPS down to 8 for that retro feel
        setTimeout(a03, 1000 / 8);
    }, 1000 / 8);
}

function playPause03() {
    isPlaying03 = !isPlaying03;
}
