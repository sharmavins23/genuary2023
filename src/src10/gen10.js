let canvas10 = document.getElementById("canvas-gen10");
let ctx10 = canvas10.getContext("2d");
let isPlaying10 = false;

let radius10 = 150;

let audioElement10 = document.getElementById("audio10");
let audioCtx10 = new (window.AudioContext || window.webkitAudioContext)();
let audioSrc10 = audioCtx10.createMediaElementSource(audioElement10);
let analyser10 = audioCtx10.createAnalyser();

// Bind our analyser to the media element source
audioSrc10.connect(analyser10);
audioSrc10.connect(audioCtx10.destination);

let frames10 = 0; // Frame counter
let fps10 = 15; // Frames per second

draw10(); // Start drawing!

// ===== Canvas helpers ========================================================

// Set the canvas back to default white background
function resetCanvas10() {
    ctx10.fillStyle = "black";
    ctx10.fillRect(0, 0, canvas10.width, canvas10.height);
}

// Draw a play button (triangle pointing right) on the center of the canvas
function drawPlayButton10() {
    ctx10.fillStyle = "black";
    ctx10.beginPath();
    ctx10.moveTo(canvas10.width / 2 - 10, canvas10.height / 2 - 10);
    ctx10.lineTo(canvas10.width / 2 - 10, canvas10.height / 2 + 10);
    ctx10.lineTo(canvas10.width / 2 + 10, canvas10.height / 2);
    ctx10.fill();

    ctx10.fillStyle = "white";
    ctx10.beginPath();
    ctx10.moveTo(canvas10.width / 2 - 8, canvas10.height / 2 - 8);
    ctx10.lineTo(canvas10.width / 2 - 8, canvas10.height / 2 + 8);
    ctx10.lineTo(canvas10.width / 2 + 8, canvas10.height / 2);
    ctx10.fill();
}

// Draw the circle for the waveform
function drawCircle10() {
    let x = canvas10.width / 2,
        y = canvas10.height / 2,
        color = "white";

    ctx10.lineWidth = 2;
    ctx10.strokeStyle = color;
    ctx10.beginPath();
    ctx10.arc(x, y, radius10, 0, 2 * Math.PI);
    ctx10.stroke();
}

// ===== Math helpers ==========================================================

// Get the frequencies of the waveforms as a list, and return them
function getFrequencies10() {
    // Get the number of frequencies
    let frequencyBinCount = analyser10.frequencyBinCount;

    // Get the scale of each frequency
    let frequencyData = new Uint8Array(frequencyBinCount);
    analyser10.getByteFrequencyData(frequencyData);

    // Pair each value with a frequency
    let frequencyValues = [];
    for (let i = 0; i < frequencyBinCount; i++) {
        frequencyValues.push({
            frequency: i,
            value: frequencyData[i],
        });
    }

    // Get the max and min values
    let max = Math.max(...frequencyValues.map((o) => o.value));
    let min = Math.min(...frequencyValues.map((o) => o.value));

    // Normalize these to 0<value<1, on a quadratic scale
    let normalizedValues = frequencyValues.map((o) => {
        let normalized = (o.value + min) / (max - min);
        let normSqr = normalized * normalized;
        return {
            frequency: o.frequency,
            value: normSqr,
        };
    });

    // Sort the values by ascending frequency
    normalizedValues.sort((a, b) => a.frequency - b.frequency);

    return normalizedValues;
}

// Given a sizing value and "scale", place it on the circle
function placeOnCircle10(scale, percentage) {
    let lineHeightMax = 550; // 10 pixel line height
    let appliedScale = (scale - 1) ** 2; // Apply some quadratic scale to it
    let lineHeight = lineHeightMax * scale * appliedScale;

    // Sample the color from a linear gradient from blue to red
    let color = ctx10.createLinearGradient(0, 0, canvas10.width, 0);
    color.addColorStop(0, "blue");
    color.addColorStop(1, "red");
    ctx10.lineWidth = 1;
    ctx10.strokeStyle = color;

    // Find the starting point on the circle of r=radius10
    // First, compute the angle of this point
    let angle = -1 * percentage * 2 * Math.PI + Math.PI / 4;

    // Then, compute the x and y coordinates of this point
    let x = canvas10.width / 2 + radius10 * Math.cos(angle);
    let y = canvas10.height / 2 + radius10 * Math.sin(angle);

    // Compute a newX and newY, such that they are "lineHeight" pixels away from the circle
    let newX = x + lineHeight * Math.cos(angle);
    let newY = y + lineHeight * Math.sin(angle);

    // Draw a line
    ctx10.beginPath();
    ctx10.moveTo(x, y);
    ctx10.lineTo(newX, newY);
    ctx10.stroke();
}

// ===== Driver code ===========================================================

function draw10loop() {
    resetCanvas10();

    // Get the frequencies of the waveforms
    let frequencies = getFrequencies10();

    // Draw the waveforms
    for (let i = 0; i < frequencies.length; i++) {
        let frequency = frequencies[i];
        let scale = frequency.value;
        let percentage = i / frequencies.length;
        placeOnCircle10(scale, percentage);
    }

    // Draw the circle
    drawCircle10();

    // Increment the frame counter
    frames10 += 1;
}

function draw10() {
    // Reset the canvas
    resetCanvas10();

    log05info("10", "Reset canvas 10.");

    // Start the draw loop (60 fps) WITHOUT BLOCKING
    setTimeout(function a10() {
        if (isPlaying10) {
            draw10loop();
        } else {
            drawPlayButton10();
        }

        setTimeout(a10, 1000 / fps10);
    }, 1000 / fps10);
}

function playPause10(e) {
    if (isPlaying10) {
        audioElement10.pause();
    } else {
        audioElement10.play();
    }
    isPlaying10 = !isPlaying10;

    if (isPlaying10) {
        log05info("10", "Playing animation.");
    } else {
        log05info("10", "Paused animation.");
    }
}
