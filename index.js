const createPlayer = (name, marker) => {
    return {name, marker};
};


const gameBoard = (() => {
    let board = Array(9).fill("");

    // function to get the board 
    const getBoard = () => board;

    // reset the board by removing all moves
    const resetBoard = () => board.fill("");

    const makeMove = (index, marker) => {
        if (index >= 0 && index < 9 && board[index] === "") {
            board[index] = marker;
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
        for (let combo of winningCombos) {
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

    
    return {getBoard, resetBoard, makeMove, checkWin, displayBoard};

})();


function game() {
    const player1 = createPlayer("Player 1", "X");
    const player2 = createPlayer("Player 2", "O");
    
    let currentPlayer = player1;

    // switch between players after each marker placement
    for (let i = 0; i < 9; i++) {
        gameBoard.displayBoard();
        console.log(currentPlayer);
        
        let userMove = parseInt(prompt(currentPlayer.name + " enter a move (0-8): "), 10);
        gameBoard.makeMove(userMove, currentPlayer.marker);
        
        // check if current player won after each marker placement
        if (gameBoard.checkWin(currentPlayer)) {
            alert(currentPlayer.name + " won!");
            break;
        } else if (i === 8) {
            alert("Tie!");
        }
        
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }
    
   
    const playAgain = confirm("Do you want to play again?");
    if (playAgain) {
        gameBoard.resetBoard();
        game(); // restart the game
    } else {
        alert("Thanks for playing!");
    }

}

game();


