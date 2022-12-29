const Gameboard = (() => {
    let boardArr = ['', '', '', '', '', '', '', '', ''];
    let osRound = false;
    let osTurn = false;
    let scoreX = 0;
    let scoreO = 0;

    // cache DOM
    const $squares = document.querySelectorAll('.square');
    const $resetBtn = document.querySelector('button');
    const $board = document.querySelector('.board');
    const $playerX = document.querySelector('div#x');
    const $playerO = document.querySelector('div#o');
    const $scoreX = document.querySelector('#x p.score');
    const $scoreO = document.querySelector('#o p.score');
    const $announcement = document.querySelector('#announcement');
    const paras = $announcement.children;
    
    // event handlers
    $squares.forEach(sq => sq.addEventListener('click', (e) => getSqIndex(e)))
    $resetBtn.addEventListener('click', resetGame)

    /* ============================ METHODS ============================ */
    function resetGame() {
        scoreX = 0;
        scoreO = 0;
        updateScores();
        osRound = true;
        resetRound();
        render();
        displayTurn();
    }

    function getSqIndex(e) {
        let sqrArr = Array.from($squares);
        let index = sqrArr.findIndex(sq => sq === e.target);
        (boardArr[index] == '' && $board.classList[1] != 'minimized') && putMark(index);
    }

    function putMark(index) {
        boardArr[index] = osTurn ? 'O' : 'X';
        render();
        checkForWin();
    }

    function render() {
        for (let i = 0; i < 9; i++) {
            if (boardArr[i] == 'X') $squares[i].innerHTML = '<div class="cross"></div>';
            if (boardArr[i] == 'O') $squares[i].innerHTML = "<svg><circle></svg>";
            if (boardArr[i] == '') $squares[i].innerHTML = boardArr[i];
        }
    }

    function pass() {
        osTurn = osTurn ? false : true;
        displayTurn();
    }

    function displayTurn() {
        if(osTurn) {
            $playerO.classList.add('myTurn');
            $playerX.classList.remove('myTurn');
            paras[0].setAttribute('style', 'opacity:0;');
            paras[1].setAttribute('style', 'opacity:1;');
            paras[2].setAttribute('style', 'opacity:0;');
        } else {
            $playerO.classList.remove('myTurn');
            $playerX.classList.add('myTurn');
            paras[0].setAttribute('style', 'opacity:1;');
            paras[1].setAttribute('style', 'opacity:0;');
            paras[2].setAttribute('style', 'opacity:0;');
        }
    }
    displayTurn();

    function checkForWin() {
        let extractedRows = [];
        let winningPatterns = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
        
        winningPatterns.forEach(pattern => extractedRows.push(pattern.map(index => boardArr[index])));

        let winStatus = extractedRows.some(arr => arr[0] !== '' && arr[0] === arr[1] && arr[1] === arr[2]);

        winStatus ? announce.win() : checkForDraw();
    }

    function resetRound() {
        boardArr = ['', '', '', '', '', '', '', '', ''];
        osRound = osRound ? false : true;
        osTurn = osRound;
    }

    function updateScores() {
        $scoreX.textContent = scoreX;
        $scoreO.textContent = scoreO;
    }
    updateScores();

    function checkForDraw() {
        let drawStatus = boardArr.every(sq => sq !== '');
        drawStatus ? announce.draw() : pass();
    }

    const announce = (() => {
        const win = () => {
            paras[0].setAttribute('style', 'opacity:0;');
            paras[1].setAttribute('style', 'opacity:0;');
            paras[2].setAttribute('style', 'opacity:1;');
            osTurn ? ++scoreO : ++scoreX;
            osTurn ? animate.oWins() : animate.xWins();
            updateScores();
            resetRound();
        }
        const draw = () => {
            paras[0].setAttribute('style', 'opacity:0;');
            paras[1].setAttribute('style', 'opacity:0;');
            paras[2].setAttribute('style', 'opacity:1;');
            animate.draw();
            resetRound();
        }
        return { win, draw }
    })()

    const animate = (() => {
        const xWinner = document.querySelector('#winnerX');
        const oWinner = document.querySelector('#winnerO');
        const xoDraw = document.querySelector('#draw');

        // =========================================================
        const xWins = () => {
            $board.classList.add('minimized');
            $resetBtn.classList.add('hidden');
            setTimeout(() => {
                xWinner.classList.add('appear')}, 300)
            setTimeout(() => {
                xWinner.firstChild.classList.add('xWinsEmerge');
                xWinner.lastChild.classList.add('xWinsHeading');
            }, 1100)
            setTimeout(() => {
                document.addEventListener('mousedown', () => {
                    $board.classList.remove('minimized');
                    $resetBtn.classList.remove('hidden');
                    xWinner.classList.remove('appear');
                    xWinner.firstChild.classList.remove('xWinsEmerge');
                    xWinner.lastChild.classList.remove('xWinsHeading');
                    render();
                    displayTurn();
                }, { once: true })
            }, 1300)

        }   // =====================================================
        const oWins = () => {
            $board.classList.add('minimized');
            $resetBtn.classList.add('hidden');
            setTimeout(() => {
                oWinner.classList.add('appear')}, 300)
            setTimeout(() => {
                oWinner.firstChild.classList.add('oWinsEmerge');
                oWinner.lastChild.classList.add('oWinsHeading');
            }, 1100)
            setTimeout(() => {
                document.addEventListener('mousedown', () => {
                    $board.classList.remove('minimized');
                    $resetBtn.classList.remove('hidden');
                    oWinner.classList.remove('appear');
                    oWinner.firstChild.classList.remove('oWinsEmerge');
                    oWinner.lastChild.classList.remove('oWinsHeading');
                    render();
                    displayTurn();
                }, { once: true })
            }, 1300)
            
        }   // =====================================================
        const draw = () => {
            $board.classList.add('minimized');
            $resetBtn.classList.add('hidden');
            setTimeout(() => {
                xoDraw.classList.add('drawAppear')}, 300)
            setTimeout(() => {
                xoDraw.classList.add('drawAnimate')
                xoDraw.lastChild.classList.add('turn-head')
                xoDraw.firstChild.classList.add('drawHeading');
            }, 1300)
            setTimeout(() => {
                document.addEventListener('mousedown', () => {
                    $board.classList.remove('minimized');
                    $resetBtn.classList.remove('hidden');
                    xoDraw.classList.remove('drawAppear');
                    xoDraw.classList.remove('drawAnimate');
                    xoDraw.lastChild.classList.remove('turn-head');
                    xoDraw.firstChild.classList.remove('drawHeading');
                    render();
                    displayTurn();
                }, { once: true })
            }, 1400)
        }
        return { xWins, oWins, draw }
    })()
})()
