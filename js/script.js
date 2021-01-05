const main = document.querySelector(".pop-header");
const switchPlayer = document.querySelector(".switch");
const button = document.querySelector(".button");
const buttonContent = document.querySelector(".button h2");
const popUpHeader = document.querySelector(".pop-header");
const popUp = document.querySelector(".pop-up");
const mainPage = document.querySelector('.main-page');
const mainPageGame = document.querySelector(".main");
const btnPrimary = document.querySelector('.btn-primary');
const input = document.querySelector(".input-name");
const mainGame = document.querySelector(".main-game");

const allBoard = document.querySelector('.game-board');
const boards = document.querySelectorAll('.board');

const playerWins = document.querySelector('.player-wins')
const whoWins = document.querySelector('.player-wins h1')
const nextTextContent = document.querySelector('#next-round-cont')

const scoreTrialsX = document.querySelector('.update-score-x');
const scoreTrialsO = document.querySelector('.update-score-o');
const turnX = document.querySelector('.turn-x')
const turnO = document.querySelector('.turn-o')

let optionOne = document.querySelector('.option-one')

let gameMode;

let playerNameOne;
let isChange = false;
switchPlayer.addEventListener('click', () => {

    //translate
    button.classList.toggle('button-js')
    switchPlayer.classList.toggle('switch-js');
    if (isChange == false) {
        buttonContent.textContent = "multi player";
        isChange = true;
    } else {
        buttonContent.textContent = "single player";
        isChange = false;
    }

})

buttonContent.addEventListener('click', (e) => {
    if (!isChange) {
        gameMode = "computer"
        main.style.cursorEvents = "none";
        popUp.style.transition = `all ${.3}s ease`;
        popUp.style.opacity = "1"
        popUpHeader.classList.add("fade-bg");
    }
    if (isChange) {
        switchPage(mainPage, mainGame);
        gameMode = "";
    }
    recentPlayer = playerOne;
    // if()

})


// switchPage
function switchPage(closePage, openPage) {
    setTimeout(() => {
        closePage.style.display = "none";
        openPage.style.transition = `${.3}s all ease`;
        openPage.style.animation = `animation: popUp ${.3}s linear`;
        openPage.style.opacity = 1;
        openPage.style.display = "block";
    }, 300)
}
// popUp.addEventListener('click', )


btnPrimary.addEventListener('click', () => {

    if (input.value === "") {
        alert("please fill your name");
        return;
    }
    optionOne.textContent = input.value;
    switchPage(mainPage, mainGame)

})


popUpHeader.addEventListener('click', (e) => {

    main.style.cursorEvents = "fill";
    popUp.style.transition = `all ${.3}s ease`;
    popUp.style.opacity = "0"
    popUpHeader.classList.remove("fade-bg");
    input.value = "";

});



const nextRound = document.querySelector('.next-round');
const load = document.querySelector('.load');




// game display 

const gameBoard = document.querySelector('.game-board');



// create a board 
let boardDisplay = ['', '', '',
    '', '', '',
    '', '', ''
];

// rounds
let wins = {
    x: 0,
    o: 0
}

//score board
let scoreBoardPlayerOne;
let scoreBoardPlayerTwo;



// player turn
let playerOne = "X";
let playerTwo = "O";

let recentPlayer = playerOne;

function toPlay(player) {
    if (player == playerOne) {
        return "x-color-js"
    }
    return "o-color-js"
}

//play game 


for (let i = 1; i < boards.length + 1; i++) {
    boards[i - 1].value = i;
    // console.log(boards[i].value);
}

if (recentPlayer == "X") {
    turnX.classList.add("display-turn");
} else turnO.classList.add("display-turn");

//check for emptied array
function checkBoard(boardDisplay) {

    let isEmpty = false;
    boardDisplay.forEach(element => {
        if (element == "") {
            isEmpty = true;
            return
        }
    })
    if (isEmpty) {
        return true
    }

    return false
};

//function

let isWin = false;
allBoard.addEventListener('click', function(e) {
    currentPosition = e.target.value;
    if (boardDisplay[currentPosition - 1] == '') {
        boardDisplay[currentPosition - 1] = recentPlayer;
        eachBoardDisplay(e.target, recentPlayer)

        if (winningOptions(recentPlayer)) {
            allBoard.style.pointerEvents = "none";
            return
        };

        //change turns
        changeTurn(recentPlayer);
        //computer playing mode (EASY)



        recentPlayer = (recentPlayer == playerOne) ? playerTwo : playerOne;

        if (gameMode == 'computer' && recentPlayer == playerTwo && (isWin == false)) {
            changeTurn(recentPlayer);
            allBoard.style.pointerEvents = "none";
            if (checkBoard(boardDisplay) == true) {
                setTimeout(function() {
                    let isPlay = false

                    while (isPlay == false)
                        if (randomRow(boardDisplay, boards, recentPlayer) == true) isPlay = true;

                    allBoard.style.pointerEvents = "fill";
                    winningOptions(recentPlayer);
                    recentPlayer = (recentPlayer == playerOne) ? playerTwo : playerOne;
                    changeTurn(recentPlayer);
                }, 1000)

            }
        }
    }

})

nextRound.addEventListener('click', function() {
    load.classList.add('load-anim');
    setTimeout(() => {
        load.classList.remove('load-anim');
        clearBoard(boards, allBoard);
        if (nextTextContent.textContent == "New Battle!") {
            clearScore(wins);
            nextTextContent.textContent = "Next Round!";
        }
    }, 1900)
})

const exit = document.querySelector("#close");
exit.addEventListener('click', () => {
    clearBoard(boards, allBoard);
    clearScore(wins);
    switchPage(mainGame, mainPage)

})

//change turn
function changeTurn(recentPlayer) {

    if (recentPlayer == "X") {
        turnX.classList.add("display-turn");
        turnO.classList.remove("display-turn")
    } else {
        turnX.classList.remove("display-turn");
        turnO.classList.add("display-turn");
    }
}

//clearAll for next round
function clearBoard(allBoard, playBoard) {
    boardDisplay = ['', '', '',
        '', '', '',
        '', '', ''
    ];

    allBoard.forEach(element => {
        element.classList.remove("x-color-js");
        element.classList.remove("o-color-js");
        element.classList.remove('blink-win');
    })
    playBoard.style.pointerEvents = "fill";
    playerWins.classList.remove('wins');
}




//check for winning
function winningOptions(option) {
    if (equals(0, 1, 2, option, boardDisplay)) { checkWinningSides(option, 0, 1, 2); return true };
    if (equals(3, 4, 5, option, boardDisplay)) { checkWinningSides(option, 3, 4, 5); return true };
    if (equals(6, 7, 8, option, boardDisplay)) { checkWinningSides(option, 6, 7, 8); return true };

    if (equals(0, 3, 6, option, boardDisplay)) { checkWinningSides(option, 0, 3, 6); return true };
    if (equals(1, 4, 7, option, boardDisplay)) { checkWinningSides(option, 1, 4, 7); return true };
    if (equals(2, 5, 8, option, boardDisplay)) { checkWinningSides(option, 2, 5, 8); return true };

    if (equals(0, 4, 8, option, boardDisplay)) { checkWinningSides(option, 0, 4, 8); return true };
    if (equals(2, 4, 6, option, boardDisplay)) { checkWinningSides(option, 2, 4, 6); return true };


    if (!ties(boardDisplay)) {
        return setTimeout(function() {
            whoWins.innerHTML = `<h1>Oh! You Draw</h1>`;
            playerWins.classList.add('wins');
        }, 500)

    };
    return false;


}

function checkWinningSides(option, num1, num2, num3) {

    arrayNew = [num1, num2, num3];

    //update score
    addScores(option);

    // add animation for winning
    arrayNew.forEach(element => {
        boards[element].classList.add('blink-win');
    });

    setTimeout(function() {
        if ((wins["x"] == 3) || (wins["o"] == 3)) {
            whoWins.innerHTML = `<h1>${checkOverallWinner(wins["x"])}</h1>`;
            nextTextContent.textContent = "New Battle!"
        } else {
            whoWins.innerHTML = `<h1>${option} WINS</h1>`
        }
        playerWins.classList.add('wins');
    }, 500)
}


function addScores(option) {

    if ((wins["x"] == 3) || (wins["o"] == 3)) {

        return
    }

    if (option == "X") {
        wins["x"]++;
        scoreTrialsX.innerHTML += `<img src="vendor/xgamewhite.png" class="score-x" alt="" >`;
        console.log(wins["x"]);
        return
    }

    wins["o"]++;
    scoreTrialsO.innerHTML += `<img src="vendor/ogame.png" class="score-o" alt="" >`;


}

function equals(num1, num2, num3, compare, array) {
    if (compare == array[num1] && array[num1] == array[num2] && array[num2] == array[num3]) return true
    else return false

}


//check if all element filled 
function ties(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == "") return true
    }

}

//check the overallwinner 
function checkOverallWinner(playerOne) {
    if (playerOne == 3) return "x wins overall"
    return "o wins overall";

}
//clear scores
function clearScore(dict) {
    let scoreX = document.querySelectorAll('.score-x');
    let scoreO = document.querySelectorAll('.score-o');
    dict["x"] = 0;
    dict["o"] = 0;
    scoreX.forEach(element => {
        element.remove()
    })
    scoreO.forEach(element => {
        element.remove();
    })
}



// //computer logic EASY MODE
// function computerPlay() {
//     let boardDisplayss = ['', '', '',
//         '', '', '',
//         '', '', ''
//     ];

//     while (boardDisplayss)

// }





function eachBoardDisplay(board, recentPlayer) {
    board.style.transition = `all ${.3}s ease`
    board.classList.add(toPlay(recentPlayer));
}

//row random
function randomRow(boardDisplay, board, recentPlayer) {

    let array = [0, 3, 6]
    let picked = Math.floor(Math.random() * (3 - 0) + 0);
    let randomIsEmpty;
    range = array[picked] + 2;
    let emptied = [];
    for (let i = array[picked]; i <= range; i++) {
        if (boardDisplay[i] == "") {
            emptied.push(i);
        }
    }
    if (emptied.length == 0) return false

    if (emptied.length == 1) {
        randomIsEmpty = emptied[0];
        boardDisplay[randomIsEmpty] = recentPlayer;


    } else if (emptied.length == 2) {
        random = Math.floor(Math.random() * (1 - 0) + 0);
        randomIsEmpty = emptied[random];
        boardDisplay[randomIsEmpty] = recentPlayer;

    } else if (emptied.length == 3) {
        random = Math.floor(Math.random() * (2 - 0) + 0);
        randomIsEmpty = emptied[random];
        boardDisplay[randomIsEmpty] = recentPlayer;

    }
    eachBoardDisplay(board[randomIsEmpty], recentPlayer)
    return true

}


//random individual
function randomColumn(num1, num2, num3) {
    if (boardDisplayss[0] || boardDisplayss[1] || boardDisplayss[2]) {
        Math.floor(Math.random() * (3 - 0) + 0);
    }
}