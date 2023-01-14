let canvas09 = document.getElementById("canvas-gen09");
let ctx09 = canvas09.getContext("2d");
let isGenerated09 = false;

let branchPoints09 = [
    {
        x: 0,
        y: 0,
        t: 0,
    },
];
let maxX09 = 0;
let xStep09 = 0.01;
let colors09 = {
    green: {
        r: 23,
        g: 100,
        b: 23,
        str: `rgb(23, 100, 23)`,
    },
    white: {
        r: 240,
        g: 255,
        b: 240,
        str: `rgb(240, 255, 240)`,
    },
};

let frames09 = 0; // Frame counter
let fps09 = 60; // Frames per second

draw09(); // Start drawing!

// ===== Canvas helpers ========================================================

// Set the canvas back to default white background
function resetCanvas09() {
    ctx09.fillStyle = colors09.white.str;
    ctx09.fillRect(0, 0, canvas09.width, canvas09.height);
}

// ===== Math helpers ==========================================================

// Given a set of n points, return the coefficients for an n-1 degree interpolation
// https://en.wikibooks.org/wiki/Algorithm_Implementation/Mathematics/Polynomial_interpolation
function computeNthDegreePolynomial(x) {
    let p = 0;
    for (let i = 0; i < branchPoints09.length; i++) {
        let point = branchPoints09[i];

        let temp = 1;
        // Compute the bottom product of the temp variable
        for (let j = 0; j < branchPoints09.length; j++) {
            if (j == i) continue;

            temp *= point.x - branchPoints09[j].x;
        }
        // Then, the division step
        temp = point.y / temp;

        // Then, compute the term
        let term = 1;
        // Compute the bottom product of the term variable
        for (let j = 0; j < branchPoints09.length; j++) {
            if (j == i) continue;

            term *= x - branchPoints09[j].x;
        }
        // Then, the multiplication step
        term *= temp;

        // Finally, sum it
        p += term;
    }

    return p;
}

// ===== Plant drawing functions ===============================================

// Pick random points, and draw a branch
function pickPointsAndBranch(opacity) {
    let n = 5;
    let branchWidth = 3;
    let goodBranch;

    while (true) {
        goodBranch = true;
        // Reset branchPoints09
        branchPoints09 = [
            {
                x: 0,
                y: 0,
            },
        ];
        // Pick n random points to add to branchPoints09
        for (let i = 0; i < n; i++) {
            branchPoints09.push({
                x: Math.floor(Math.random() * canvas09.width),
                y: Math.floor(Math.random() * canvas09.height),
            });
        }
        // Sort the branch points by increasing x value
        branchPoints09.sort((a, b) => a.x - b.x);

        // Saving these for now, as they'll be available in the next loop
        maxX09 = branchPoints09[branchPoints09.length - 1].x;

        // Iterate through the points, and check if they're within bounds
        for (let newX = 0; newX <= maxX09; newX += xStep09) {
            let newY = computeNthDegreePolynomial(newX);
            if (newY < 0 || newY > canvas09.height) {
                goodBranch = false;
            }
        }

        if (goodBranch) break;
    }

    // Iterate through all x values to the maximal and draw
    for (let newX = 0; newX <= maxX09; newX += xStep09) {
        let newY = computeNthDegreePolynomial(newX);

        // Draw this pixel
        let r = colors09.green.r,
            g = colors09.green.g,
            b = colors09.green.b;
        ctx09.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx09.fillRect(newX, newY, branchWidth, branchWidth);
        ctx09.fill();
    }
    ctx09.closePath();

    return;
}

// Go through the branch, and add a leaf randomly
function addRandomLeaves(opacity) {
    let arcR = 35;
    let leafX = 100,
        leafY = 50;
    // Variance for leaf generation
    let leafVar = 25;
    // Variance for color generation
    let colorVar = 100;
    let leafRate = 0.001;

    // Iterate through the function
    for (let newX = 0; newX < maxX09; newX += xStep09) {
        // On a very low random chance, draw a leaf
        if (Math.random() < leafRate) {
            newY = computeNthDegreePolynomial(newX);

            // Compute a mildly random leaf size
            let newArcR = Math.random() * leafVar + arcR,
                newLeafX = Math.random() * leafVar + leafX,
                newLeafY = Math.random() * leafVar + leafY;
            // Compute a mildly random color
            let r = colors09.green.r + (Math.random() - 0.5) * colorVar,
                g = colors09.green.g + (Math.random() - 0.5) * colorVar,
                b = colors09.green.b + (Math.random() - 0.5) * colorVar;
            let randomColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;

            ctx09.beginPath();
            ctx09.fillStyle = randomColor;
            ctx09.lineWidth = 3;
            ctx09.moveTo(newX, newY);

            // Get a direction (top or bottom)
            if (Math.random() - 0.5 <= 0) {
                // Draw a leaf to the bottom
                ctx09.arcTo(
                    newX,
                    newY + newLeafY,
                    newX + newLeafX,
                    newY + newLeafY,
                    newArcR
                );
            } else {
                // Draw a leaf to the top
                ctx09.arcTo(
                    newX,
                    newY - newLeafY,
                    newX + newLeafX,
                    newY - newLeafY,
                    newArcR
                );
            }

            ctx09.fill();
            ctx09.closePath();
        }
    }
}

// ===== Driver code ===========================================================

function draw09() {
    // Reset the canvas
    resetCanvas09();

    log05info("09", "Reset canvas 09.");

    let n = 10;
    for (let i = 0; i < n; i++) {
        let opacity = i / n;

        // Draw a tree branch
        pickPointsAndBranch(opacity);

        // Draw leaves, randomly, on the branch
        addRandomLeaves(opacity);
    }
}
