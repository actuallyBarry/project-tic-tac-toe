// const Gameboard = (() => {
    let boardArr = ['', '', '', '', '', '', '', '', ''];
    let osGame = false;
    let osTurn = false;
    let scoreX = 0;
    let scoreO = 0;

    // cache DOM
    const $squares = document.querySelectorAll('.square');
    const $resetBtn = document.querySelector('button');
    const $playerX = document.querySelector('.x');
    const $playerO = document.querySelector('.o');
    const $scoreX = document.querySelector('.x .score');
    const $scoreO = document.querySelector('.o .score');
    const $announcement = document.querySelector('#announcement');

    // event handlers
    $squares.forEach(sq => sq.addEventListener('click', (e) => getSqIndex(e)))
    $resetBtn.addEventListener('click', resetGame)

    /* ============================ METHODS ============================ */
    function resetGame() {
        $announcement.textContent = '';
        scoreX = 0;
        scoreO = 0;
        updateScores();
        osGame = true;
        resetBoard();
        render();
        displayTurn();
    }

    function getSqIndex(e) {
        let sqrArr = Array.from($squares);
        let index = sqrArr.findIndex(sq => sq === e.target);
        (boardArr[index] === '') && putMark(index);
    }

    function putMark(index) {
        boardArr[index] = osTurn ? 'O' : 'X';
        render();
        checkPatterns();
    }

    function render() {
        for (let i = 0; i < 9; i++) {
            $squares[i].textContent = boardArr[i]; 
        }
    }

    function pass() {
        osTurn = osTurn ? false : true;
        displayTurn();
    }

    function checkPatterns() {
        let extractedRows = [];
        let winningPatterns = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
        
        winningPatterns.forEach(pattern => extractedRows.push(pattern.map(index => boardArr[index])));

        let winStatus = extractedRows.some(arr => arr[0] !== '' && arr[0] === arr[1] && arr[1] === arr[2]);

        winStatus ? announceWin() : pass();
    }
    
    function announceWin() {
        let winner = osTurn ? 'O' : 'X';
        (winner === 'O') ? ++scoreO : ++scoreX;
        $announcement.textContent = winner + ' wins!';
        updateScores();
        resetBoard();
    }

    function resetBoard() {
        boardArr = ['', '', '', '', '', '', '', '', ''];
        osGame = osGame ? false : true;
        osTurn = osGame;
    }

    function displayTurn() {
        if(osTurn) {
            $playerO.classList.add('myTurn');
            $playerX.classList.remove('myTurn');
        } else {
            $playerO.classList.remove('myTurn');
            $playerX.classList.add('myTurn');
        }
    }
    displayTurn();

    function updateScores() {
        $scoreX.textContent = scoreX;
        $scoreO.textContent = scoreO;
    }
    updateScores();

// })()
