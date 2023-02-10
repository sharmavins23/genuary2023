let canvas11 = document.getElementById("canvas-gen11");
let ctx11 = canvas11.getContext("2d");

let colors11 = {
    background: `rgb(200, 160, 120)`,
    black: `rgb(0, 23, 23)`,
    red: `rgb(150, 50, 50)`,
    gray: `rgb(100, 100, 123)`,
    yellow: `rgb(200, 160, 80)`,
};

draw11(); // Start drawing!

// ===== Canvas helpers ========================================================

// Set the canvas back to default white background
function resetCanvas11() {
    ctx11.fillStyle = colors11.background;
    ctx11.fillRect(0, 0, canvas11.width, canvas11.height);
}

// Add paint flecks to the canvas
function addPaintFlecks() {
    // Get the canvas pixel data
    let imageData = ctx11.getImageData(0, 0, canvas11.width, canvas11.height);
    let noiseMargin = 10;

    // Iterate through each pixel, applying a random opacity of black and white
    for (let x = 0; x < canvas11.width; x++) {
        for (let y = 0; y < canvas11.height; y++) {
            // Choose between black and white
            let noiseValue =
                Math.random() * (2 * noiseMargin) - 2 * noiseMargin;

            // Get the pixel's color at that point
            let r = imageData.data[(y * canvas11.width + x) * 4 + 0],
                g = imageData.data[(y * canvas11.width + x) * 4 + 1],
                b = imageData.data[(y * canvas11.width + x) * 4 + 2];

            // Apply some noise
            r += noiseValue;
            g += noiseValue;
            b += noiseValue;

            // Repaint the pixel
            ctx11.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx11.fillRect(x, y, 1, 1);
        }
    }
}

// ===== Painting ==============================================================

// Add a background yellow circle to the canvas
function addBackgroundCircle() {
    // The background circle is at the following coordinates
    let x = 150,
        y = 150,
        r = 200;

    // Draw the circle
    ctx11.fillStyle = colors11.yellow;
    ctx11.beginPath();
    ctx11.arc(x, y, r, 0, 2 * Math.PI);
    ctx11.fill();
}

// Add a wheel shape to the canvas
function addWheel() {
    // The wheel is radius r1, with inner radius r2
    let r1 = 150;
    let r2 = r1 - 20;

    // The wheel is centered at (x, y)
    let x = canvas11.width / 2,
        y = canvas11.height / 2;

    // Draw the wheel
    ctx11.fillStyle = colors11.black;
    ctx11.beginPath();
    ctx11.arc(x, y, r1, 0, 2 * Math.PI);
    ctx11.fill();
    // Cut out the inner circle
    ctx11.fillStyle = colors11.background;
    ctx11.beginPath();
    ctx11.arc(x, y, r2, 0, 2 * Math.PI);
    ctx11.fill();

    // The wheel is made of 8 spokes
    let numberOfSpokes = 8;
    let spokeHeight = 100;
    let spokeWidth = 20;
    // The spokes are inset by this amount
    let spokeInset = 35;

    // Draw the spokes
    for (let i = 0; i < numberOfSpokes; i++) {
        // First, compute the angle
        let angle = (i / numberOfSpokes) * 2 * Math.PI;

        // Compute the spoke's endpoints
        let x1 = x + (r1 - spokeInset) * Math.cos(angle),
            y1 = y + (r1 - spokeInset) * Math.sin(angle);
        let x2 = x + (r1 + spokeHeight - spokeInset) * Math.cos(angle),
            y2 = y + (r1 + spokeHeight - spokeInset) * Math.sin(angle);

        // Draw the spoke
        ctx11.strokeStyle = colors11.black;
        ctx11.lineWidth = spokeWidth;
        ctx11.beginPath();
        ctx11.moveTo(x1, y1);
        ctx11.lineTo(x2, y2);
        ctx11.stroke();
    }
}

// Add some random red lines to the canvas
function addRedLines() {
    let lineCount = 5;
    let lineLengthMax = 250,
        lineLengthMin = 100;
    let lineWidthMax = 40,
        lineWidthMin = 10;

    for (let i = 0; i < lineCount; i++) {
        // Choose a random angle, such that the lines are vaguely parallel
        let angle = Math.random() * 0.2 - 0.1;

        // Choose a random starting point
        let x = Math.random() * canvas11.width,
            y = Math.random() * canvas11.height;

        // Choose a random line length
        let lineLength =
            Math.random() * (lineLengthMax - lineLengthMin) + lineLengthMin;

        // Compute the line's endpoint
        let x2 = x + lineLength * Math.cos(angle),
            y2 = y + lineLength * Math.sin(angle);

        // Draw the line
        ctx11.strokeStyle = colors11.red;
        ctx11.lineWidth =
            Math.random() * (lineWidthMax - lineWidthMin) + lineWidthMin;
        ctx11.beginPath();
        ctx11.moveTo(x, y);
        ctx11.lineTo(x2, y2);
        ctx11.stroke();
    }
}

// Add some gray flecks to the canvas
function addGrayLines() {
    let lineCount = 5;
    let lineLengthMax = 350,
        lineLengthMin = 200;
    let lineWidthMax = 20,
        lineWidthMin = 10;

    let baseAngle = Math.PI / 2;

    for (let i = 0; i < lineCount; i++) {
        // Choose a random sharp angle, such that the lines are vaguely parallel
        let angle = baseAngle + Math.random() * 0.2 - 0.1;

        // Choose a random starting point
        let x = Math.random() * canvas11.width,
            y = Math.random() * canvas11.height;

        // Choose a random line length
        let lineLength =
            Math.random() * (lineLengthMax - lineLengthMin) + lineLengthMin;

        // Compute the line's endpoint
        let x2 = x + lineLength * Math.cos(angle),
            y2 = y + lineLength * Math.sin(angle);

        // Draw the line
        ctx11.strokeStyle = colors11.gray;
        ctx11.lineWidth =
            Math.random() * (lineWidthMax - lineWidthMin) + lineWidthMin;
        ctx11.beginPath();
        ctx11.moveTo(x, y);
        ctx11.lineTo(x2, y2);
        ctx11.stroke();
    }
}

// Add a center spoke passing through the wheel
function addCenterSpoke() {
    // The spoke is 5/8 of the canvas width
    let spokeLength = (5 * canvas11.width) / 8;
    // The spoke has the following width
    let spokeWidth = 5;

    // Pick a random angle
    let angle = Math.random() * 2 * Math.PI;

    // Compute the spoke's endpoints
    let x1 = canvas11.width / 2 + spokeLength * Math.cos(angle),
        y1 = canvas11.height / 2 + spokeLength * Math.sin(angle);
    let x2 = canvas11.width / 2 - spokeLength * Math.cos(angle),
        y2 = canvas11.height / 2 - spokeLength * Math.sin(angle);

    // Draw the spoke
    ctx11.strokeStyle = colors11.black;
    ctx11.lineWidth = spokeWidth;
    ctx11.beginPath();
    ctx11.moveTo(x1, y1);
    ctx11.lineTo(x2, y2);
    ctx11.stroke();
}

// ===== Driver code ===========================================================

function draw11() {
    // Reset the canvas
    resetCanvas11();

    addBackgroundCircle();

    addWheel();

    addRedLines();

    addGrayLines();

    addCenterSpoke();

    addPaintFlecks();

    log05info("11", "Reset canvas 11.");
}
