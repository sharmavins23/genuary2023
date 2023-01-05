// ===== Helper functions ======================================================

// Convert an RGB value into a Hex string
function rgbToHex05(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// ===== HTML injection ========================================================

// Inject a div into the page's div.gen05console element
function inject05div(element) {
    // Inject into the top of the console div
    let consoleDiv = document.querySelector("div.gen05consoleInner");
    consoleDiv.insertBefore(element, consoleDiv.firstChild);
}

// Format the message portion of the text
function format05message(msg) {
    let nums = "0123456789.";

    // Wrap any OUTERMOST parentheses in a span tag
    let formattedMsg = "";
    let parenLevel = 0;
    for (let i = 0; i < msg.length; i++) {
        // Check if we're entering or exiting parentheses
        if (msg[i] == "(") {
            parenLevel += 1;
            if (parenLevel == 1) {
                formattedMsg += "<span class='parentheses'>(";
            } else {
                formattedMsg += "(";
            }
        } else if (msg[i] == ")") {
            parenLevel -= 1;
            if (parenLevel == 0) {
                formattedMsg += ")</span>";
            } else {
                formattedMsg += ")";
            }
        } else if (nums.includes(msg[i])) {
            if (parenLevel > 0) {
                formattedMsg +=
                    "</span>" +
                    "<span class='number'>" +
                    msg[i] +
                    "</span>" +
                    "<span class='parentheses'>";
            } else {
                formattedMsg += "<span class='number'>" + msg[i] + "</span>";
            }
        } else if (msg[i] == "<") {
            formattedMsg += "&lt;";
        } else if (msg[i] == ">") {
            formattedMsg += "&gt;";
        } else if (msg[i] == "&") {
            formattedMsg += "&amp;";
        } else {
            formattedMsg += msg[i];
        }
    }

    return formattedMsg;
}

// ===== Logging functions =====================================================

// Custom logging function for the console
function log05info(gen, msg, level = 0) {
    if (level != 0) {
        console.log(msg);
    }

    let elementToInsert = document.createElement("div");

    // Add a span tag for INFO with green text
    let infoSpan = document.createElement("span");
    infoSpan.classList.add("info");
    infoSpan.innerHTML = `[INFO-${gen}]`;
    elementToInsert.appendChild(infoSpan);

    // Add the message
    elementToInsert.innerHTML += format05message(msg);

    // Inject the div into the page
    inject05div(elementToInsert);
}

function log05error(gen, msg, level = 0) {
    if (level != 0) {
        console.warn(msg);
    }

    let elementToInsert = document.createElement("div");

    // Add a span tag for INFO with green text
    let infoSpan = document.createElement("span");
    infoSpan.classList.add("error");
    infoSpan.innerHTML = `[ERR!-${gen}]`;
    elementToInsert.appendChild(infoSpan);

    // Add the message
    elementToInsert.innerHTML += format05message(msg);

    // Inject the div into the page
    inject05div(elementToInsert);
}

function log05warn(gen, msg, level = 0) {
    if (level != 0) {
        console.error(msg);
    }

    let elementToInsert = document.createElement("div");

    // Add a span tag for INFO with green text
    let infoSpan = document.createElement("span");
    infoSpan.classList.add("warning");
    infoSpan.innerHTML = `[WARN-${gen}]`;
    elementToInsert.appendChild(infoSpan);

    // Add the message
    elementToInsert.innerHTML += format05message(msg);

    // Inject the div into the page
    inject05div(elementToInsert);
}
