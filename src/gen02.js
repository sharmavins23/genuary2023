let canvas02 = document.getElementById("canvas-gen02");
let ctx02 = canvas02.getContext("2d");

let time02_s = 0; // Time in seconds

draw02(); // Start drawing!

// ===== Canvas helpers ========================================================

// Set the canvas back to default white background
function resetCanvas02() {
    ctx02.fillStyle = "white";
    ctx02.fillRect(0, 0, canvas02.width, canvas02.height);
}

// Iterate through all pixels, and compute a convolutional blur
function blur02() {
    // Get the image data
    let imageData = ctx02.getImageData(0, 0, canvas02.width, canvas02.height);
    let data = imageData.data;

    // Create a new array to store the new pixel values
    let newData = new Uint8ClampedArray(data.length);

    // Iterate through all pixels
    for (let y = 0; y < canvas02.height; y++) {
        for (let x = 0; x < canvas02.width; x++) {
            // Get the pixel index
            let i = (y * canvas02.width + x) * 4;

            // Get the pixel values
            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];
            let a = data[i + 3];

            // Compute the average of the surrounding pixels
            let count = 0;
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    // Get the pixel index
                    let i2 = ((y + dy) * canvas02.width + (x + dx)) * 4;

                    // Check if the pixel is in the image
                    if (i2 >= 0 && i2 < data.length) {
                        // Add the pixel values to the average
                        r += data[i2];
                        g += data[i2 + 1];
                        b += data[i2 + 2];
                        a += data[i2 + 3];
                        count++;
                    }
                }
            }

            // Divide by the number of pixels
            r /= count;
            g /= count;
            b /= count;
            a /= count;

            // Set the new pixel value
            newData[i] = r;
            newData[i + 1] = g;
            newData[i + 2] = b;
            newData[i + 3] = a;
        }
    }

    // Put the new image data back into the canvas
    imageData.data.set(newData);
    ctx02.putImageData(imageData, 0, 0);
}

// Place a circle at a random location
function placeCircle02() {
    // Get a random location
    let x = Math.random() * canvas02.width;
    let y = Math.random() * canvas02.height;

    // Get a random radius
    let minRadius = 10;
    let maxRadius = 100 + minRadius;
    let r = Math.random() * maxRadius + minRadius;

    // Get a random color
    let rColor = Math.random() * 255;
    let gColor = Math.random() * 255;
    let bColor = Math.random() * 255;

    // Draw the circle
    ctx02.beginPath();
    ctx02.arc(x, y, r, 0, 2 * Math.PI);
    ctx02.fillStyle = "rgb(" + rColor + "," + gColor + "," + bColor + ")";
    ctx02.fill();
}

// ===== Driver code ===========================================================

function draw02loop() {
    // Increment the time
    time02_s += 1 / 60;

    // Blur the canvas
    blur02();

    // Every n seconds, place a circle
    let n = 0.25;
    if (time02_s % n < 1 / 60) {
        placeCircle02();
    }
}

function draw02() {
    // Reset the canvas
    resetCanvas02();

    // Start the draw loop (60 fps) WITHOUT BLOCKING
    setTimeout(function a02() {
        draw02loop();
        setTimeout(a02, 1000 / 60);
    }, 1000 / 60);
}
