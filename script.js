const canvas = document.querySelector("#drawingBoard");
const ctx = canvas.getContext("2d");

ctx.lineWidth = 4;
ctx.strokeStyle = "black";
ctx.lineCap = "round";
ctx.lineJoin = "round";

let animationId;
let currentAction = "idle";
let animationFrame = 0;

function drawStickman() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = 300;
    const headY = 100;

    let leftArmMovement = 0;
    let rightArmMovement = 0;
    let leftLegMovement = 0;
    let rightLegMovement = 0;
    let bodyY = 0;

    if (currentAction === "walk") {
        const walkCycle = animationFrame * 0.12;

        leftArmMovement = Math.sin(walkCycle) * 35;
        rightArmMovement = Math.sin(walkCycle + Math.PI) * 35;

        leftLegMovement = Math.sin(walkCycle + Math.PI) * 35;
        rightLegMovement = Math.sin(walkCycle) * 35;
    }

    if (currentAction === "dance") {
        const danceCycle = animationFrame * 0.12;

        leftArmMovement = Math.sin(danceCycle) * 70;
        rightArmMovement = Math.sin(danceCycle + Math.PI / 2) * 70;

        leftLegMovement = Math.sin(danceCycle + Math.PI / 3) * 35;
        rightLegMovement = Math.cos(danceCycle) * 35;

        bodyY = Math.sin(danceCycle * 2) * 12;
    }

    if (currentAction === "jump") {
        const jumpCycle = animationFrame * 0.08;

        // The entire body moves together during the jump.
        bodyY = -Math.abs(Math.sin(jumpCycle)) * 100;
    }


    ctx.beginPath();
    ctx.arc(
        centerX,
        headY + bodyY,
        40,
        0,
        Math.PI * 2
    );
    ctx.stroke();


    ctx.beginPath();
    ctx.arc(
        centerX - 15,
        headY - 8 + bodyY,
        3,
        0,
        Math.PI * 2
    );
    ctx.fill();

    ctx.beginPath();
    ctx.arc(
        centerX + 15,
        headY - 8 + bodyY,
        3,
        0,
        Math.PI * 2
    );
    ctx.fill();


    ctx.beginPath();
    ctx.moveTo(
        centerX,
        headY - 3 + bodyY
    );
    ctx.lineTo(
        centerX - 5,
        headY + 8 + bodyY
    );
    ctx.stroke();


    ctx.beginPath();
    ctx.arc(
        centerX,
        headY + 15 + bodyY,
        10,
        0,
        Math.PI
    );
    ctx.stroke();


    ctx.beginPath();
    ctx.moveTo(
        centerX,
        140 + bodyY
    );
    ctx.lineTo(
        centerX,
        250 + bodyY
    );
    ctx.stroke();


    ctx.beginPath();
    ctx.moveTo(
        centerX,
        160 + bodyY
    );
    ctx.lineTo(
        centerX - 60 + leftArmMovement,
        210 + bodyY
    );
    ctx.stroke();


    ctx.beginPath();
    ctx.moveTo(
        centerX,
        160 + bodyY
    );
    ctx.lineTo(
        centerX + 60 + rightArmMovement,
        210 + bodyY
    );
    ctx.stroke();


    ctx.beginPath();
    ctx.moveTo(
        centerX,
        250 + bodyY
    );
    ctx.lineTo(
        centerX - 50 + leftLegMovement,
        330 + bodyY
    );
    ctx.stroke();


    ctx.beginPath();
    ctx.moveTo(
        centerX,
        250 + bodyY
    );
    ctx.lineTo(
        centerX + 50 + rightLegMovement,
        330 + bodyY
    );
    ctx.stroke();
}


function animate() {
    animationFrame++;

    drawStickman();

    animationId = requestAnimationFrame(animate);
}


function startAnimation(action) {
    currentAction = action;
    animationFrame = 0;

    cancelAnimationFrame(animationId);

    animate();
}


function stopAnimation() {
    cancelAnimationFrame(animationId);

    currentAction = "idle";
    animationFrame = 0;

    drawStickman();
}


const walkButton = document.querySelector("#walkButton");
const danceButton = document.querySelector("#danceButton");
const jumpButton = document.querySelector("#jumpButton");
const stopButton = document.querySelector("#stopButton");


walkButton.addEventListener("click", () => {
    startAnimation("walk");
});

danceButton.addEventListener("click", () => {
    startAnimation("dance");
});

jumpButton.addEventListener("click", () => {
    startAnimation("jump");
});

stopButton.addEventListener("click", () => {
    stopAnimation();
});

drawStickman();
