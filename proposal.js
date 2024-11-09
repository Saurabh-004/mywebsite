const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let animationStep = 0;
const maxStep = 500;
let glowIntensity = 0;
let glowDirection = 1; // 1 for glowing, -1 for fading

// Function to draw the animated heart using polar coordinates
function drawHeart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Center the heart on the canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Heart size scale factor
    const size = 15;

    // Set the glowing effect for the heart
    ctx.shadowColor = "red";
    ctx.shadowBlur = glowIntensity;

    // Draw heart by plotting points in polar coordinates
    ctx.fillStyle = "red";
    ctx.beginPath();
    for (let i = 0; i < animationStep; i++) {
        const t = i * 0.05;
        const x = size * (16 * Math.sin(t) ** 3);
        const y = -size * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

        ctx.lineTo(centerX + x, centerY + y);
    }
    ctx.closePath();
    ctx.fill();

    // Reset shadow after drawing the heart to avoid affecting the text
    ctx.shadowBlur = 0;
}

// Function to draw glowing text centered within the heart
function drawMessageGlow() {
    ctx.font = "30px Arial";
    ctx.shadowColor = "white";
    ctx.shadowBlur = 10;
    ctx.fillStyle = "white";

    // Calculate text width and height to center it
    const text = "Bur debu ka ?";
    const textWidth = ctx.measureText(text).width;
    const textX = canvas.width / 2 - textWidth / 2;  // Center horizontally
    const textY = canvas.height / 2 + 50;  // Adjust vertically to be inside the heart

    // Draw the text at the calculated position
    ctx.fillText(text, textX, textY);
    ctx.shadowBlur = 0; // Reset shadow
}

// Function to update the glowing effect for the heart
function updateGlow() {
    // Increase or decrease the glow intensity based on the direction
    glowIntensity += glowDirection * 2; 

    // If glow intensity reaches a maximum or minimum, reverse the direction
    if (glowIntensity >= 30 || glowIntensity <= 0) {
        glowDirection *= -1;
    }
}

// Animation loop
function animate() {
    if (animationStep < maxStep) {
        animationStep += 2; // Increase the step to draw more points gradually
        drawHeart();
    }
    drawMessageGlow();
    updateGlow(); // Update glow effect on each frame
    requestAnimationFrame(animate); // Repeat the animation
}

// Start the animation
animate();
