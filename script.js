// const Gameboard = (() => {
    let boardArr = ['', '', '', '', '', '', '', '', ''];
    let osTurn = false;  // Boolean(Math.floor(Math.random()*2));

    // cache DOM
    const $squares = document.querySelectorAll('.square');
    const $resetBtn = document.querySelector('button');

    // event handlers
    $squares.forEach(sq => sq.addEventListener('click', (e) => getSqIndex(e)))
    $resetBtn.addEventListener('click', resetBoard)

    // methods
    function resetBoard() {
        boardArr = ['', '', '', '', '', '', '', '', ''];
        render();
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
    }

    function checkPatterns() {
        let extractedRows = [];
        let winningPatterns = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
        
        winningPatterns.forEach(pattern => extractedRows.push(pattern.map(index => boardArr[index])));

        let winStatus = extractedRows.some(arr => arr[0] !== '' && arr[0] === arr[1] && arr[1] === arr[2]);

        winStatus ? announceWin() : pass();
    }
    
    function announceWin() {
        osTurn ? console.log('O wins') : console.log('X wins');
        // remove event listener
    }



    
// })()
