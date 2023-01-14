// The guide I followed for neural style transfer within the browser:
// https://spltech.co.uk/a-tutorial-on-how-to-convert-a-tensorflow-model-to-tensorflow-js/

// ===== Image processing functions ============================================

// Get the content and style images from the parent content06 and style06 divs
function loadImages06() {
    const contentImages = document.getElementById("content06").children;
    const styleImages = document.getElementById("style06").children;

    log05info(
        "06",
        `Loaded ${contentImages.length} content image(s) and ${styleImages.length} style image(s).`
    );

    return {
        content: contentImages,
        style: styleImages,
    };
}

// Given an images library, pick a random image and style image
function pickRandomImages06(images) {
    // Pick a random image
    let contentImageIndex = Math.floor(Math.random() * images.content.length);
    let contentImage = images.content[contentImageIndex];

    // Pick a random style image
    let styleImageIndex = Math.floor(Math.random() * images.style.length);
    let styleImage = images.style[styleImageIndex];

    log05info(
        "06",
        `Picked content image ${contentImageIndex} and style image ${styleImageIndex}.`
    );

    return {
        contentImage: contentImage,
        styleImage: styleImage,
    };
}

// Preprocess an image, converting it to a normalized tensor
function preprocess06(imageData) {
    return tf.tidy(() => {
        // Convert the image to a Tensor
        let imageTensor = tf.browser.fromPixels(imageData, (numChannels = 3));

        const resized = tf.image
            .resizeBilinear(imageTensor, [256, 256])
            .toFloat();

        // Normalize the image
        const offset = tf.scalar(255.0);
        const normalized = resized.div(offset);

        // Add a dimension to get a batched shape
        const batched = normalized.expandDims(0);
        return batched;
    });
}

// ===== Driver functions ======================================================

function draw06(outputImageTensor) {
    let canvas06out = document.getElementById("canvas06out");

    // Convert the output image tensor to a canvas object
    tf.browser.toPixels(outputImageTensor, canvas06out);

    log05info("06", "Image style transfer complete.");
}

function placeImages06(contentImage, styleImage) {
    let canvas06content = document.getElementById("canvas06content");
    let canvas06style = document.getElementById("canvas06style");

    // Draw the images to the canvas, scaling them down to 248x248
    let contentCtx = canvas06content.getContext("2d");
    let styleCtx = canvas06style.getContext("2d");

    contentCtx.drawImage(contentImage, 0, 0, 248, 248);
    styleCtx.drawImage(styleImage, 0, 0, 248, 248);
}

function executeModel06(contentImageTensor, styleImageTensor) {
    // TensorFlow Hub page for the style model:
    // https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2
    tf.loadGraphModel("src/src06/model06/model.json").then(
        (model) => {
            log05info("06", "Model successfully loaded.");

            // Run the model
            log05info("06", "Running the model...");
            let outputTensor = model.execute([
                styleImageTensor,
                contentImageTensor,
            ]);

            // Remove the output fourth dimension
            outputTensor = tf.squeeze(outputTensor);

            // Draw the finalized image
            log05info("06", "Drawing the finalized image...");
            draw06(outputTensor);
        },
        (err) => {
            log05error("06", `Error loading model: ${err}`);
        }
    );
}

function regenerate06() {
    // Reload the images
    let images = loadImages06();

    // Pick a random image and style image
    let { contentImage, styleImage } = pickRandomImages06(images);
    // Place these images in their respective divs
    placeImages06(contentImage, styleImage);

    log05info("06", "Content and style images placed.");

    // Preprocess images into tensors
    log05info("06", "Preprocessing images into tensors...");
    let contentImageTensor = preprocess06(contentImage);
    let styleImageTensor = preprocess06(styleImage);

    // Run the model
    log05warn("06", "Loading TF model (this may take a while!)...");
    executeModel06(contentImageTensor, styleImageTensor);
}
