// Selecting main elements
let newer = document.getElementById("new-btn");
let msg = document.querySelector(".msg-container");
let ms = document.getElementById("msg");
let con = document.querySelector(".buttons");
let boxes = document.querySelectorAll(".box");
let reset = document.getElementById("reset");

// All possible winning combinations
const arr = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

// 'true' → X's turn, 'false' → O's turn
let turn = true;

// Function to start the game (shows board, hides start button)
function few() {
  con.classList.remove("hide");
  newer.style.display = "none";
}

// Function to reset boxes and hide message
function lew() {
  msg.classList.add("hide");
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
}

// Event listeners for buttons
newer.addEventListener("click", few);
reset.addEventListener("click", lew);

// Each box click logic
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // Toggle between X and O
    if (turn) {
      box.innerText = "X";
      turn = false;
      box.style.color = "red";
    } else {
      box.innerText = "O";
      turn = true;
      box.style.color = "blue";
    }

    // Disable box after one click
    box.disabled = true;

    // Check for winner after each move
    checkwinner();
  });
});

// Function to display the winner
const showwinner = (winner) => {
  msg.classList.remove("hide");
  ms.innerText = `🎉 Congratulations! Winner is ${winner}`;
  boxes.forEach((box) => {
    box.disabled = true;
  });
};

// Function to check all possible win combinations
const checkwinner = () => {
  for (let pat of arr) {
    let pos1 = boxes[pat[0]].innerText;
    let pos2 = boxes[pat[1]].innerText;
    let pos3 = boxes[pat[2]].innerText;

    // Check if the boxes are not empty and match
    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        console.log("Winner is:", pos1);
        showwinner(pos1);
         return;
      }
    }
  }

  // Check for draw (if all boxes are filled)
  let allFilled = [...boxes].every((box) => box.innerText !== "");
  if (allFilled) {
    showDraw();
  }
};

// Function to display draw message
const showDraw = () => {
  msg.classList.remove("hide");
  ms.innerText = `😐 It's a Draw!`;

  // Disable all boxes when draw occurs
  boxes.forEach((box) => {
    box.disabled = true;
  });
};
