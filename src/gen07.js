// An example for a draw function - Find and replace 07 with number
let canvas07 = document.getElementById("canvas-gen07");
let ctx07 = canvas07.getContext("2d");

draw07(); // Start drawing!

// ===== Canvas helpers ========================================================

// Set the canvas back to default background
function resetCanvas07(colors) {
    // Draw the background
    ctx07.fillStyle = colors.background.str;
    ctx07.fillRect(0, 0, canvas07.width, canvas07.height);

    // Add random noise to the album cover
    for (let i = 0; i < 2500; i++) {
        // Get a random color between black and white
        let noiseColor = Math.floor(Math.random() * 255);
        ctx07.fillStyle = `rgb(${noiseColor}, ${noiseColor}, ${noiseColor})`;
        ctx07.fillRect(
            Math.random() * canvas07.width,
            Math.random() * canvas07.height,
            1,
            1
        );
    }

    // Add random lines to the album cover
    for (let i = 0; i < 20; i++) {
        // Get a random color between black and white
        let noiseColor = Math.floor(Math.random() * 25);
        ctx07.strokeStyle = `rgb(255, 255, 255, ${noiseColor / 100})`;
        ctx07.beginPath();
        ctx07.moveTo(
            Math.random() * canvas07.width,
            Math.random() * canvas07.height
        );
        ctx07.lineTo(
            Math.random() * canvas07.width,
            Math.random() * canvas07.height
        );
        ctx07.stroke();
    }
}

// Draw a play button (triangle pointing right) on the center of the canvas
function drawPlayButton07() {
    ctx07.fillStyle = "black";
    ctx07.beginPath();
    ctx07.moveTo(canvas07.width / 2 - 10, canvas07.height / 2 - 10);
    ctx07.lineTo(canvas07.width / 2 - 10, canvas07.height / 2 + 10);
    ctx07.lineTo(canvas07.width / 2 + 10, canvas07.height / 2);
    ctx07.fill();

    ctx07.fillStyle = "white";
    ctx07.beginPath();
    ctx07.moveTo(canvas07.width / 2 - 8, canvas07.height / 2 - 8);
    ctx07.lineTo(canvas07.width / 2 - 8, canvas07.height / 2 + 8);
    ctx07.lineTo(canvas07.width / 2 + 8, canvas07.height / 2);
    ctx07.fill();
}

// ===== Album code ============================================================

// Draw the stitched picture on the background
function drawStitchedPicture07(colors) {
    let highlightR = colors.highlight.r,
        highlightG = colors.highlight.g,
        highlightB = colors.highlight.b;

    let canvasInternal = document.getElementById(
        "canvasInternalStitched-gen07"
    );
    let ctxInternal = canvasInternal.getContext("2d");

    // Get the pixels of the image
    let image = document.getElementById("stitchedImage07");
    // Draw this image, scaled, onto the canvas
    ctxInternal.drawImage(
        image,
        0,
        0,
        canvasInternal.width,
        canvasInternal.height
    );

    // Iterate through the pixels of the image and draw them on the canvas
    let imageData = ctxInternal.getImageData(
        0,
        0,
        canvasInternal.width,
        canvasInternal.height
    );
    let pixels = imageData.data;
    let pixelCount = pixels.length / 4;
    for (let i = 0; i < pixelCount; i++) {
        let x = i % canvasInternal.width,
            y = Math.floor(i / canvasInternal.width);
        // Get the new X and Y coordinates
        let newX = x + 80,
            newY = y + 125;

        // Get the color of the pixel
        let r = 255 - pixels[i * 4],
            g = 255 - pixels[i * 4 + 1],
            b = 255 - pixels[i * 4 + 2];

        // Get their magnitude as a grayscale value
        let magnitude = (r + g + b) / 3 / 255;

        // Draw the pixel
        ctx07.fillStyle = `rgba(${highlightR}, ${highlightG}, ${highlightB}, ${magnitude})`;
        ctx07.fillRect(newX, newY, 1, 1);
    }

    // Set the stroke style to a vertical linear gradient
    let gradient = ctx07.createLinearGradient(0, 0, 0, canvas07.height);
    gradient.addColorStop(
        0,
        `rgba(${highlightR}, ${highlightG}, ${highlightB}, 1)`
    );
    gradient.addColorStop(
        1,
        `rgba(${highlightR}, ${highlightG}, ${highlightB}, 0)`
    );
    ctx07.strokeStyle = gradient;
    // Draw a bounding box on top of the stitched picture
    ctx07.strokeRect(80, 125, canvasInternal.width, canvasInternal.height);
}

// Draw the two strange circles on the album
function drawStrangeCircles07(colors) {
    // First, get the positions of the circles
    let circles = [
        {
            x: 100,
            y: canvas07.height / 2,
        },
        {
            x: canvas07.width,
            y: canvas07.height / 2,
        },
    ];
    let circleR = 50;

    // Lotta circle math!!!
    for (let i = 0; i < 2; i++) {
        let circle = circles[i];

        // Draw a circle of radius 50 on each point, with color background.color.str
        ctx07.fillStyle = colors.background.str;
        ctx07.beginPath();
        ctx07.arc(circle.x, circle.y, 50, 0, 2 * Math.PI);
        ctx07.fill();

        // Draw the stroke circle of radius 50 with color.text.str
        ctx07.strokeStyle = colors.text.str;
        ctx07.beginPath();
        ctx07.arc(circle.x, circle.y, 50, 0, 2 * Math.PI);
        ctx07.stroke();

        // Draw a white diameter bisecting the circles vertically
        ctx07.strokeStyle = "white";
        ctx07.beginPath();
        ctx07.moveTo(circle.x, circle.y - circleR);
        ctx07.lineTo(circle.x, circle.y + circleR);
        ctx07.stroke();

        // Compute the circle's intercept points at pi/4 and 5pi/4
        let interceptpi4 = {
            x: circle.x + circleR * Math.cos(Math.PI / 4),
            y: circle.y + circleR * Math.sin(Math.PI / 4),
        };
        let intercept5pi4 = {
            x: circle.x + circleR * Math.cos((5 * Math.PI) / 4),
            y: circle.y + circleR * Math.sin((5 * Math.PI) / 4),
        };

        // Draw a line between the intercepts
        ctx07.strokeStyle = colors.text.str;
        ctx07.beginPath();
        ctx07.moveTo(interceptpi4.x, interceptpi4.y);
        ctx07.lineTo(intercept5pi4.x, intercept5pi4.y);
        ctx07.stroke();

        // Get the intercepts for pi/8, 3pi/8, 9pi/8, 11pi/8
        let interceptpi8 = {
            x: circle.x + circleR * Math.cos(Math.PI / 8),
            y: circle.y + circleR * Math.sin(Math.PI / 8),
        };
        let intercept3pi8 = {
            x: circle.x + circleR * Math.cos((3 * Math.PI) / 8),
            y: circle.y + circleR * Math.sin((3 * Math.PI) / 8),
        };
        let intercept9pi8 = {
            x: circle.x + circleR * Math.cos((9 * Math.PI) / 8),
            y: circle.y + circleR * Math.sin((9 * Math.PI) / 8),
        };
        let intercept11pi8 = {
            x: circle.x + circleR * Math.cos((11 * Math.PI) / 8),
            y: circle.y + circleR * Math.sin((11 * Math.PI) / 8),
        };

        // Draw a line between the intercepts
        ctx07.strokeStyle = colors.text.str;
        ctx07.beginPath();
        ctx07.moveTo(interceptpi8.x, interceptpi8.y);
        ctx07.lineTo(intercept11pi8.x, intercept11pi8.y);
        ctx07.stroke();
        ctx07.beginPath();
        ctx07.moveTo(intercept3pi8.x, intercept3pi8.y);
        ctx07.lineTo(intercept9pi8.x, intercept9pi8.y);
        ctx07.stroke();

        // Find the intercepts at 3pi/4 and 7pi/4
        let intercept3pi4 = {
            x: circle.x + circleR * Math.cos((3 * Math.PI) / 4),
            y: circle.y + circleR * Math.sin((3 * Math.PI) / 4),
        };
        let intercept7pi4 = {
            x: circle.x + circleR * Math.cos((7 * Math.PI) / 4),
            y: circle.y + circleR * Math.sin((7 * Math.PI) / 4),
        };

        let lineThroughStrokeOffset = 35;
        // Draw a line through the stroke circle at 3pi/4 and 7pi/4
        ctx07.strokeStyle = colors.text.str;
        ctx07.beginPath();
        ctx07.moveTo(
            // I hate coordinate differences from Canvas
            intercept3pi4.x - lineThroughStrokeOffset,
            intercept3pi4.y + lineThroughStrokeOffset
        );
        ctx07.lineTo(
            intercept7pi4.x + lineThroughStrokeOffset,
            intercept7pi4.y - lineThroughStrokeOffset
        );
        ctx07.stroke();
    }
}

// Draw the tree squares onto the album
function drawTreeSquares07(colors) {
    // Get the two images
    let leaves = document.getElementById("leaves07");
    let forest = document.getElementById("forest07");

    // Get the new canvas
    let canvasInternal = document.getElementById("canvasInternalTrees-gen07");
    let ctxInternal = canvasInternal.getContext("2d");

    // Draw the leaves image to the canvas
    ctxInternal.drawImage(
        leaves,
        0,
        0,
        canvasInternal.width,
        canvasInternal.height
    );

    // Draw the white square behind it
    ctx07.fillStyle = colors.text.str;
    let xOffset1 = 50,
        yOffset1 = 50;
    ctx07.fillRect(
        xOffset1,
        yOffset1,
        canvasInternal.width,
        canvasInternal.height
    );
    // Iterate through the pixels of the leaves image
    let imageData = ctxInternal.getImageData(
        0,
        0,
        canvasInternal.width,
        canvasInternal.height
    );
    for (let i = 0; i < imageData.data.length; i += 4) {
        // Get the average pixel magnitude
        let r = 255 - imageData.data[i],
            g = 255 - imageData.data[i + 1],
            b = 255 - imageData.data[i + 2];
        let magnitude = (r + g + b) / 3 / 255;

        // Draw the pixel onto the main canvas
        ctx07.fillStyle = `rgba(${colors.highlight.r}, ${colors.highlight.g}, ${colors.highlight.b}, ${magnitude})`;
        ctx07.fillRect(
            xOffset1 + ((i / 4) % canvasInternal.width),
            yOffset1 + Math.floor(i / 4 / canvasInternal.width),
            1,
            1
        );
    }

    // Draw the forest image to the canvas
    ctxInternal.drawImage(
        forest,
        0,
        0,
        canvasInternal.width,
        canvasInternal.height
    );

    // Draw the white square behind it
    ctx07.fillStyle = colors.text.str;
    let xOffset2 = 50,
        yOffset2 = 340;
    ctx07.fillRect(
        xOffset2,
        yOffset2,
        canvasInternal.width,
        canvasInternal.height
    );
    // Iterate through the pixels of the forest image
    imageData = ctxInternal.getImageData(
        0,
        0,
        canvasInternal.width,
        canvasInternal.height
    );
    for (let i = 0; i < imageData.data.length; i += 4) {
        let r = 255 - imageData.data[i],
            g = 255 - imageData.data[i + 1],
            b = 255 - imageData.data[i + 2];
        // Get the average pixel magnitude
        let magnitude = (r + g + b) / 3 / 255;

        // Draw the pixel onto the main canvas
        ctx07.fillStyle = `rgba(${colors.highlight.r}, ${colors.highlight.g}, ${colors.highlight.b}, ${magnitude})`;
        ctx07.fillRect(
            xOffset2 + ((i / 4) % canvasInternal.width),
            yOffset2 + Math.floor(i / 4 / canvasInternal.width),
            1,
            1
        );
    }
}

// Draw the text on the album cover
function drawText07(colors) {
    // Take a snapshot of all pixels
    let imageData = ctx07.getImageData(0, 0, canvas07.width, canvas07.height);

    let letters = "2GENUARY3";
    let fontSize = 30;
    ctx07.font = `bold ${fontSize}px Courier New`;

    let xOffset = canvas07.width / 2 + 100;
    let initialOffset = 40;
    let letterSpacing = 55;
    // Draw all letters
    for (let i = 0; i < letters.length; i++) {
        if (i == 0 || i == letters.length - 1) {
            ctx07.fillStyle = colors.highlight.str;
        } else {
            ctx07.fillStyle = colors.text.str;
        }
        ctx07.fillText(letters[i], xOffset, initialOffset + i * letterSpacing);
    }

    ctx07.fillStyle = colors.text.str;
    let letterShift = 40;
    let reverseLetters = letters.split("").reverse().join("");
    // Draw the letters upside down, shifted left and right
    for (let i = 0; i < reverseLetters.length; i++) {
        if (i == 0 || i == reverseLetters.length - 1) continue;
        ctx07.fillText(
            reverseLetters[i],
            xOffset + letterShift,
            initialOffset + i * letterSpacing
        );
        ctx07.fillText(
            reverseLetters[i],
            xOffset - letterShift,
            initialOffset + i * letterSpacing
        );
    }

    let leftBorderX = xOffset - 32;
    let rightBorderX = xOffset + 49;
    // Re-fill in all pixels, but do not update the pixels around the text
    for (let i = 0; i < imageData.data.length; i += 4) {
        let x = (i / 4) % canvas07.width;
        let y = Math.floor(i / 4 / canvas07.width);

        // Do not re-update pixels with the text in them
        if (x > leftBorderX && x < rightBorderX) continue;

        // For other pixels, simply redraw the old snapshot
        ctx07.fillStyle = `rgb(${imageData.data[i]}, ${
            imageData.data[i + 1]
        }, ${imageData.data[i + 2]})`;
        ctx07.fillRect(x, y, 1, 1);
    }
}

// Draw the Chronologist album, with the passed in color palette.
function drawAlbum07(colors) {
    // Draw the background
    resetCanvas07(colors);

    // Add the background stitched picture
    drawStitchedPicture07(colors);

    // Create the circles
    drawStrangeCircles07(colors);

    // Add the tree squares
    drawTreeSquares07(colors);

    // Add the text
    drawText07(colors);
}

// ===== Driver code ===========================================================

// Get a color palette from an image
function getColorPalette07(file) {
    let canvasInternal = document.getElementById("canvasInternal-gen07");
    let ctxInternal = canvasInternal.getContext("2d");
    let reader = new FileReader();
    reader.onload = function (e) {
        let img = new Image();
        img.onload = function () {
            canvasInternal.width = img.width;
            canvasInternal.height = img.height;
            ctxInternal.drawImage(img, 0, 0);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);

    // Get the average color of the image
    let imageData = ctxInternal.getImageData(
        0,
        0,
        canvasInternal.width,
        canvasInternal.height
    );

    // Check if the image is a default garbage thing?
    if (imageData.width == 300 && imageData.height == 150) {
        // Iterate through all pixels
        let isGarbage = true;
        for (let i = 0; i < imageData.data.length; i += 4) {
            // If every value is 0, then it's a default image
            if (imageData.data[i] != 0) {
                isGarbage = false;
                break;
            }
        }
        if (isGarbage) {
            log05error(
                "07",
                "No image found - Try resubmitting. Using default colormap."
            );
            return {
                background: { r: 23, g: 23, b: 23, str: `rgb(23, 23, 23)` },
                highlight: { r: 23, g: 120, b: 80, str: `rgb(23, 120, 80)` },
                text: { r: 255, g: 255, b: 255, str: `rgb(255, 255, 255)` },
            };
        }
    }

    // Iterate through all of the pixels, getting an average "dark" color, "light" color, and a "highlight" color
    let backgroundColor = { r: 0, g: 0, b: 0 };
    let textColor = { r: 0, g: 0, b: 0 };
    let highlightColor = { r: 0, g: 0, b: 0 };
    let numPixels = 0;
    for (let i = 0; i < imageData.data.length; i += 4) {
        // Get the pixel's color
        let r = imageData.data[i];
        let g = imageData.data[i + 1];
        let b = imageData.data[i + 2];

        let darkCutoff = 50;

        // If the pixel is too dark, then it's probably part of the background
        if (r < darkCutoff || g < darkCutoff || b < darkCutoff) {
            backgroundColor.r += r;
            backgroundColor.g += g;
            backgroundColor.b += b;
        } else {
            // Otherwise, it's probably part of the highlight
            highlightColor.r += r;
            highlightColor.g += g;
            highlightColor.b += b;
        }

        // Find the lightest color for the text
        let colorOverall = r + g + b;
        let textOverall = textColor.r + textColor.g + textColor.b;
        if (colorOverall > textOverall) {
            textColor.r = r;
            textColor.g = g;
            textColor.b = b;
        }

        numPixels++;
    }
    // Divide out the numPixels to get the averages
    backgroundColor.r = Math.floor(backgroundColor.r / numPixels);
    backgroundColor.g = Math.floor(backgroundColor.g / numPixels);
    backgroundColor.b = Math.floor(backgroundColor.b / numPixels);
    highlightColor.r = Math.floor(highlightColor.r / numPixels);
    highlightColor.g = Math.floor(highlightColor.g / numPixels);
    highlightColor.b = Math.floor(highlightColor.b / numPixels);

    return {
        background: {
            r: backgroundColor.r,
            g: backgroundColor.g,
            b: backgroundColor.b,
            str: `rgb(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b})`,
        },
        text: {
            r: textColor.r,
            g: textColor.g,
            b: textColor.b,
            str: `rgb(${textColor.r}, ${textColor.g}, ${textColor.b})`,
        },
        highlight: {
            r: highlightColor.r,
            g: highlightColor.g,
            b: highlightColor.b,
            str: `rgb(${highlightColor.r}, ${highlightColor.g}, ${highlightColor.b})`,
        },
    };
}

function draw07() {
    // Consume the image upload from the form element
    let formInput = document.getElementById("imgIn07");
    let file = formInput.files[0];
    if (file) {
        // Read the image's file name
        let fileName = file.name;
        log05info("07", `Image upload detected: ${fileName}`);

        let colorPalette = getColorPalette07(file);
        drawAlbum07(colorPalette);
    } else {
        log05warn("07", "No image upload detected. Using default colormap.");
        // Draw the album
        drawAlbum07({
            background: { r: 23, g: 23, b: 23, str: `rgb(23, 23, 23)` },
            highlight: { r: 23, g: 120, b: 80, str: `rgb(23, 120, 80)` },
            text: { r: 255, g: 255, b: 255, str: `rgb(255, 255, 255)` },
        });
    }
}

function regenerate07() {
    log05warn("07", "Regenerating album drawing.");
    // Regenerate the album drawing
    draw07();
}
