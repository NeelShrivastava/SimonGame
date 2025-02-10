// Selecting required elements
const countValue = document.querySelector(".levelcss"); // Level display
const colorPart = document.querySelectorAll(".red, .green, .blue, .yellow"); // Color buttons
const startButton = document.querySelector("button"); // Start button
const result = document.querySelector(".Level"); // Result display

// Mapping colors with their original and flash colors
const colors = {
  red: {
    current: "#950303",
    new: "#fd2a2a",
  },
  green: {
    current: "#068e06",
    new: "#11e711",
  },
  blue: {
    current: "#01018a",
    new: "#2062fc",
  },
  yellow: {
    current: "#919102",
    new: "#fafa18",
  },
};

let randomColors = [];
let pathGeneratorBool = false;
let count = 0, clickCount = 0;

// Function to start the game
startButton.addEventListener("click", () => {
  count = 1; // Start from level 1
  clickCount = 0;
  randomColors = [];
  pathGeneratorBool = false;
  countValue.innerText = "01"; // Display Level 1
  pathGenerate();
});

// Function to generate the color sequence
const pathGenerate = () => {
  randomColors.push(generateRandomValue(colors));
  count = randomColors.length; // Update count based on sequence length
  countValue.innerText = count < 10 ? "0" + count : count; // Update UI
  pathGeneratorBool = true;
  pathDecide();
};

// Function to get a random color
const generateRandomValue = (obj) => {
  let arr = Object.keys(obj);
  return arr[Math.floor(Math.random() * arr.length)];
};

// Function to display the color sequence
const pathDecide = async () => {
  for (let i of randomColors) {
    let currentColor = document.querySelector(`.${i}`);
    await delay(500);
    currentColor.style.backgroundColor = colors[i]["new"];
    await delay(600);
    currentColor.style.backgroundColor = colors[i]["current"];
    await delay(600);
  }
  pathGeneratorBool = false; // Allow user to click after sequence is shown
};

// Function for delay (blinking effect)
async function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

// Event listener for user clicks
colorPart.forEach((element) => {
  element.addEventListener("click", async (e) => {
    if (pathGeneratorBool) return false; // Prevent clicking during sequence display

    if (e.target.classList.contains(randomColors[clickCount])) {
      // Blink effect on click
      e.target.style.backgroundColor = colors[randomColors[clickCount]]["new"];
      await delay(500);
      e.target.style.backgroundColor = colors[randomColors[clickCount]]["current"];

      // Move to next step in sequence
      clickCount += 1;

      // If user correctly follows sequence, start next level
      if (clickCount === count) {
        clickCount = 0; // Reset for next round
        await delay(1000); // Small delay before next sequence
        pathGenerate(); // Generate new sequence
      }
    } else {
      lose();
    }
  });
});

// Function when player makes a mistake
const lose = () => {
  result.innerHTML = `<span> Your Score: </span> ${count - 1}`; // Show last completed level
  startButton.innerText = "Play Again";
};
