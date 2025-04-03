const createPlayer = (name, marker) => {
    return {name, marker};
};

const gameBoard = (() => {
    let board = Array(9).fill("");

    // function to get the board 
    const getBoard = () => board;

    // reset the board by removing all moves
    const resetBoard = () => board.fill("");

    // play again
    const playAgain = () => {
        resetBoard(); // Clear the board
        const tiles = document.querySelectorAll(".tile");
        tiles.forEach(tile => (tile.textContent = "")); // Clear the UI
        displayResults("none");
    };

    const makeMove = (index, marker) => {
        if (index >= 0 && index < 9 && board[index] === "") {
            board[index] = marker;
            const tile = document.querySelector(`[data-index="${index}"]`); 
            if (tile) { // check if the tile exists in the DOM
                tile.textContent = marker; // update the tile's text content with the marker
            }
            return true;
        } else {
            alert("Invalid move. Please place your marker in an empty slot.");
            return false;
        }      
        
    };

    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    const checkWin = (player) => {
        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (board[a] === player.marker && board[b] === player.marker && board[c] === player.marker){
                return true;
            }
        }
        return false;
    }

    const displayBoard = () => {
        console.clear(); // Clears the console before displaying the board
        console.log(`
        ${board[0] || "0"} | ${board[1] || "1"} | ${board[2] || "2"}
        ---------
        ${board[3] || "3"} | ${board[4] || "4"} | ${board[5] || "5"}
        ---------
        ${board[6] || "6"} | ${board[7] || "7"} | ${board[8] || "8"}
        `);
    };

    
    return {getBoard, playAgain, makeMove, checkWin, displayBoard};

})();


// display names of each player
function displayNames (name1, name2) {
    let player1 = document.querySelector(".player-one");
    let player2 = document.querySelector(".player-two");

    player1.textContent = name1 + " (X)";
    player2.textContent = name2 + " (O)";
}


// display results in modal after the game is finished
function displayResults(result, playerName = "") {
    const resultModal = document.getElementById("result-modal");
    let modalMessage = document.querySelector(".modal-message");
    if (result === "none") {
        resultModal.style.display = "none";
    } else if (result === "win") {
        modalMessage.textContent = playerName + " Wins!";
        resultModal.style.display = "flex";
    } else if (result === "tie") {
        modalMessage.textContent = "It's A Tie!";
        resultModal.style.display = "flex";
    }  

}


function game() {
    let player1;
    let player2;
    let currentPlayer;

    const playAgainBtn = document.getElementById("play-again");
    const welcomeModal = document.getElementById("welcome-modal");
    const playerOneIcon = document.getElementById("player-one-img");
    const playerTwoIcon = document.getElementById("player-two-img");
    welcomeModal.showModal();

    // highlight the icon of the current player
    const updateCurrentPlayerUI = () => {
        if (currentPlayer === player1) {
            playerOneIcon.classList.add("active");
            playerTwoIcon.classList.remove("active");
        } else {
            playerOneIcon.classList.remove("active");
            playerTwoIcon.classList.add("active");
        }
    };

 
    let form = document.getElementById("playerNames");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let player1Name = document.getElementById("player1").value;
        let player2Name = document.getElementById("player2").value;

        // create player objects and display their names
        player1 = createPlayer(player1Name, "X");
        player2 = createPlayer(player2Name, "O");
        displayNames(player1Name, player2Name);

        // X goes first
        currentPlayer = player1;
        updateCurrentPlayerUI();

        // Close dialog window after submission
        welcomeModal.close();

        document.addEventListener("click", (e) => {
            if (e.target.matches(".tile")) {
                gameBoard.displayBoard();

                let userMove = Number(e.target.dataset.index);

                gameBoard.makeMove(userMove, currentPlayer.marker);

                // delay alerts to allow winning marker to be placed
                if (gameBoard.checkWin(currentPlayer)) {
                    setTimeout(() => {
                        displayResults("win", currentPlayer.name);
                        playAgainBtn.addEventListener("click", gameBoard.playAgain);
                    }, 150);
                    return;
                } 
                
                if (gameBoard.getBoard().every(cell => cell !== "")) {
                    setTimeout(() => {
                        displayResults("tie");
                    }, 150);
                    return;
                    
                }
                // switch between players after a valid move
                currentPlayer = currentPlayer === player1 ? player2 : player1;
                updateCurrentPlayerUI();

            }
        })
        
    });
}

game();



