const gridCellElems     = document.getElementsByClassName('sudoku-grid__box__cell');
const startElem         = document.getElementById('buttons__start');
const startDiffElem     = document.getElementById('buttons__start-different');
const resetElem         = document.getElementById('buttons__reset');
const timerElem         = document.getElementById('timer');
const timerWrapperElem  = document.getElementById('timer-wrapper');
const gameAreaElem      = document.getElementById('game-area');
const menuElem          = document.getElementById('menu');
const menuTitleElem     = document.getElementById('menu-title');
const menuTextElem      = document.getElementById('menu-text');
const menuOptionElem    = document.getElementById('menu-option');
const menuOptionStElem  = document.getElementById('menu-option__start');

let gameStarted = false;

let problemGrid = [];

let solutionGrid = [];

/**
 * Padds numbers with a single leading zero (for displaying hours, minutes
 * and seconds in the timer).
 * 
 * @param {number} num 
 */
const padZero = (num) => {
    if (num < 10) {
        return '0' + num;
    } else {
        return num;
    }
}

/**
 * Initializes the sudoku grid with numbers in `grid` array.
 * 
 * @param {Array<number>} grid - A 2d array of representing sudoku cells.
 * @param {Boolean} problem - Whether the given grid is a sudoku problem or not. 
 */
const initSudokuGrid = (grid, problem = false) => {
    // sudokuEls = getSudokuGridElems();
    
    for (let i=0; i<9; ++i) {
        for(let j=0; j<9; ++j) {
            sudokuEls[i][j].querySelector('.sudoku-grid__box__cell__display').innerHTML = grid[i][j];
            sudokuEls[i][j].querySelector('.sudoku-grid__box__cell__input').value = grid[i][j];

            // If it's a problem, make the problem numbers uneditable (input field disabled!),
            // and make the background grey.
            if (problem === true) {
                if (grid[i][j] === 0) {
                    sudokuEls[i][j].querySelector('.sudoku-grid__box__cell__display').innerHTML = '';
                } else {
                    sudokuEls[i][j].style.background = '#dddddd';
                    sudokuEls[i][j].setAttribute('readonly', 'true')
                    sudokuEls[i][j].querySelector('.sudoku-grid__box__cell__input').disabled = true;
                }
            }
        }
    }
};

/**
 * Contains all the cell dom elements in the sudoku grid in a 2d grid.
 */
const sudokuEls = [[
        document.getElementById('cell-00-00'), document.getElementById('cell-01-01'), document.getElementById('cell-02-02'),
        document.getElementById('cell-03-10'), document.getElementById('cell-04-11'), document.getElementById('cell-05-12'),
        document.getElementById('cell-06-20'), document.getElementById('cell-07-21'), document.getElementById('cell-08-22'),
    ], [
        document.getElementById('cell-10-03'), document.getElementById('cell-11-04'), document.getElementById('cell-12-05'),
        document.getElementById('cell-13-13'), document.getElementById('cell-14-14'), document.getElementById('cell-15-15'),
        document.getElementById('cell-16-23'), document.getElementById('cell-17-24'), document.getElementById('cell-18-25'),
    ], [
        document.getElementById('cell-20-06'), document.getElementById('cell-21-07'), document.getElementById('cell-22-08'),
        document.getElementById('cell-23-16'), document.getElementById('cell-24-17'), document.getElementById('cell-25-18'),
        document.getElementById('cell-26-26'), document.getElementById('cell-27-27'), document.getElementById('cell-28-28'),
    ], [
        document.getElementById('cell-30-30'), document.getElementById('cell-31-31'), document.getElementById('cell-32-32'),
        document.getElementById('cell-33-40'), document.getElementById('cell-34-41'), document.getElementById('cell-35-42'),
        document.getElementById('cell-36-50'), document.getElementById('cell-37-51'), document.getElementById('cell-38-52'),
    ], [
        document.getElementById('cell-40-33'), document.getElementById('cell-41-34'), document.getElementById('cell-42-35'),
        document.getElementById('cell-43-43'), document.getElementById('cell-44-44'), document.getElementById('cell-45-45'),
        document.getElementById('cell-46-53'), document.getElementById('cell-47-54'), document.getElementById('cell-48-55'),
    ], [
        document.getElementById('cell-50-36'), document.getElementById('cell-51-37'), document.getElementById('cell-52-38'),
        document.getElementById('cell-53-46'), document.getElementById('cell-54-47'), document.getElementById('cell-55-48'),
        document.getElementById('cell-56-56'), document.getElementById('cell-57-57'), document.getElementById('cell-58-58'),
    ], [
        document.getElementById('cell-60-60'), document.getElementById('cell-61-61'), document.getElementById('cell-62-62'),
        document.getElementById('cell-63-70'), document.getElementById('cell-64-71'), document.getElementById('cell-65-72'),
        document.getElementById('cell-66-80'), document.getElementById('cell-67-81'), document.getElementById('cell-68-82'),
    ], [
        document.getElementById('cell-70-63'), document.getElementById('cell-71-64'), document.getElementById('cell-72-65'),
        document.getElementById('cell-73-73'), document.getElementById('cell-74-74'), document.getElementById('cell-75-75'),
        document.getElementById('cell-76-83'), document.getElementById('cell-77-84'), document.getElementById('cell-78-85'),
    ], [
        document.getElementById('cell-80-66'), document.getElementById('cell-81-67'), document.getElementById('cell-82-68'),
        document.getElementById('cell-83-76'), document.getElementById('cell-84-77'), document.getElementById('cell-85-78'),
        document.getElementById('cell-86-86'), document.getElementById('cell-87-87'), document.getElementById('cell-88-88'),
]];

/**
 * All the sudoku cell dom elements arranged in a 2d array box-wise!
 */
sudokuBoxWiseEls = [[
        document.getElementById('cell-00-00'), document.getElementById('cell-01-01'), document.getElementById('cell-02-02'),
        document.getElementById('cell-10-03'), document.getElementById('cell-11-04'), document.getElementById('cell-12-05'),
        document.getElementById('cell-20-06'), document.getElementById('cell-21-07'), document.getElementById('cell-22-08'),
    ], [
        document.getElementById('cell-03-10'), document.getElementById('cell-04-11'), document.getElementById('cell-05-12'),
        document.getElementById('cell-13-13'), document.getElementById('cell-14-14'), document.getElementById('cell-15-15'),
        document.getElementById('cell-23-16'), document.getElementById('cell-24-17'), document.getElementById('cell-25-18'),
    ], [
        document.getElementById('cell-06-20'), document.getElementById('cell-07-21'), document.getElementById('cell-08-22'),
        document.getElementById('cell-16-23'), document.getElementById('cell-17-24'), document.getElementById('cell-18-25'),
        document.getElementById('cell-26-26'), document.getElementById('cell-27-27'), document.getElementById('cell-28-28'),
    ], [
        document.getElementById('cell-30-30'), document.getElementById('cell-31-31'), document.getElementById('cell-32-32'),
        document.getElementById('cell-40-33'), document.getElementById('cell-41-34'), document.getElementById('cell-42-35'),
        document.getElementById('cell-50-36'), document.getElementById('cell-51-37'), document.getElementById('cell-52-38'),
    ], [
        document.getElementById('cell-33-40'), document.getElementById('cell-34-41'), document.getElementById('cell-35-42'),
        document.getElementById('cell-43-43'), document.getElementById('cell-44-44'), document.getElementById('cell-45-45'),
        document.getElementById('cell-53-46'), document.getElementById('cell-54-47'), document.getElementById('cell-55-48'),
    ], [
        document.getElementById('cell-36-50'), document.getElementById('cell-37-51'), document.getElementById('cell-38-52'),
        document.getElementById('cell-46-53'), document.getElementById('cell-47-54'), document.getElementById('cell-48-55'),
        document.getElementById('cell-56-56'), document.getElementById('cell-57-57'), document.getElementById('cell-58-58'),
    ], [
        document.getElementById('cell-60-60'), document.getElementById('cell-61-61'), document.getElementById('cell-62-62'),
        document.getElementById('cell-70-63'), document.getElementById('cell-71-64'), document.getElementById('cell-72-65'),
        document.getElementById('cell-80-66'), document.getElementById('cell-81-67'), document.getElementById('cell-82-68'),
    ], [
        document.getElementById('cell-63-70'), document.getElementById('cell-64-71'), document.getElementById('cell-65-72'),
        document.getElementById('cell-73-73'), document.getElementById('cell-74-74'), document.getElementById('cell-75-75'),
        document.getElementById('cell-83-76'), document.getElementById('cell-84-77'), document.getElementById('cell-85-78'),
    ], [
        document.getElementById('cell-66-80'), document.getElementById('cell-67-81'), document.getElementById('cell-68-82'),
        document.getElementById('cell-76-83'), document.getElementById('cell-77-84'), document.getElementById('cell-78-85'),
        document.getElementById('cell-86-86'), document.getElementById('cell-87-87'), document.getElementById('cell-88-88'),
]];

/**
 * Called by the "Start" button.
 * Starts the game by selecting a sudoku problem, rendering it on the
 * screen and starts the timer from 00:00:00.
 * 
 * @param {Boolean} freshGrid - Whether to start game with a fresh grid (problem).
 */
const startGame = (freshGrid = false) => {
    if (gameStarted) {
        return;
    }

    console.log('Starting game...');

    if (freshGrid) {
        // Generate a grid here
        problemGrid = [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 0, 3, 0, 0, 1],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 7, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9],
        ];

        solutionGrid = [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9],
        ];
    }

    // Render the sudoku problem
    initSudokuGrid(problemGrid, true);

    // Start the timer
    let startDate = new Date();
    let currentDate = new Date();
    let dateDiff = null;
    let dateDiffMin = 0;
    let dateDiffHrs = 0;

    window.gameTimerInterval = setInterval(() => {
        currentDate = new Date();
        
        dateDiff = Math.ceil((currentDate.getTime() - startDate.getTime())/1000);
        dateDiffMin = Math.floor(dateDiff/60);
        dateDiffHrs = Math.floor(dateDiff/3600);

        timerElem.innerHTML = padZero(dateDiffHrs)
            + ':' + padZero(dateDiffMin)
            + ':' + padZero(dateDiff - dateDiffMin * 60 - dateDiffHrs * 3600);
    }, 250);

    timerWrapperElem.style.display = 'block';
    // startElem.style.display = 'none';
    resetElem.style.display = 'block';
    startDiffElem.style.display = 'block';
    
    gameStarted = true;
}

/**
 * Resets the timer to 0, and the grid to the initial state
 */
const resetGame = () => {
    if (gameStarted) {
        clearInterval(window.gameTimerInterval);
    }

    gameStarted = false;
    timerElem.innerHTML = 'Resetting...';

    startGame(false);
}

/**
 * Resets the timer and also the problem grid.
 */
const startGameWithDiffGrid = () => {
    if (gameStarted) {
        clearInterval(window.gameTimerInterval);
    }

    gameStarted = false;
    timerElem.innerHTML = 'Resetting...';

    startGame(true);
};

/**
 * Ends the game timer, hides the sudoku grid and shows the
 * user that the game is finished.
 */
const finishGame = () => {
    menuElem.style.display = 'block';
    gameAreaElem.style.display = 'none';

    clearInterval(window.gameTimerInterval);
    document.querySelector('#menu-text').innerHTML = 'Congratz! you finished the game in ' + timerElem.innerHTML;
    gameStarted = false;
};

const markCellsMatchingValueInArr = (arr) => {
    let valueArr = [];
    let errors = false;

    arr.forEach ((elem) => {
        let cellInputElem = elem.querySelector('.sudoku-grid__box__cell__input');
        let cellInputVal = cellInputElem.value;

        let matchesFound = false;

        if(!elem.dataset.error){
            elem.querySelector('.sudoku-grid__box__cell__display').style.color = '#000000';
        }

        valueArr.forEach ((valElem) => {
            if (cellInputVal == valElem.value && cellInputVal != 0) {
                if (elem.querySelector('.sudoku-grid__box__cell__input').disabled == false) {
                    elem.querySelector('.sudoku-grid__box__cell__display').style.color = '#ff0000';
                    elem.setAttribute('data-error', true);
                }

                // If there is already an element in the elements array,
                // mark it red.
                if (
                    valElem.elements.length == 1
                    && valElem.elements[0].querySelector('.sudoku-grid__box__cell__input').disabled == false) {
                    valElem.elements[0].querySelector('.sudoku-grid__box__cell__display').style.color = '#ff0000';
                    valElem.elements[0].setAttribute('data-error', true);
                }

                valElem.elements.push(elem);
                matchesFound = true;
                errors = true;

                return;
            }
        });

        if (!matchesFound) {
            valueArr.push({
                value: cellInputVal,
                elements: [elem]
            });
        }
    });

    return errors;
};

/**
 * Used for checking whether the present user input is a valid entry according
 * to the progress so far.
 * 
 * @param {HTMLElement} elem - The element with the user input, that is to be checked 
 * 
 * @returns {Boolean} whether the input is valid or not.
 */
const checkSolution = () => {
    let emptyCells = 0;
    let boxError = false;
    let rowError = false;
    let colError = false;

    sudokuEls.forEach((row) => {
        row.forEach((elem) => {
            elem.removeAttribute('data-error');

            let val = elem.querySelector('.sudoku-grid__box__cell__input').value;

            if (val == undefined || val == null || val == '' || val == '0') {
                ++emptyCells;
            }
        });
    });
    
    for (let i=0; i<9; ++i) {
        let colArr = [];

        // box
        boxError = markCellsMatchingValueInArr(sudokuBoxWiseEls[i]);

        // row
        rowError = markCellsMatchingValueInArr(sudokuEls[i]);

        // column
        sudokuEls.forEach((row) => {
            colArr.push(row[i]);
        });

        colError = markCellsMatchingValueInArr(colArr);
    }

    if (emptyCells == 0 && !(boxError || rowError || colError)) {
        finishGame();
    }
}

window.addEventListener('mousedown', (event) => {
    const sudokuCellDisplay = document.querySelectorAll('.sudoku-grid__box__cell');
    
    if (sudokuCellDisplay.length) {
        sudokuCellDisplay.forEach((cell) => {
            let cellId = event.target.getAttribute('id');
            if (cellId == null) {
                cellId = event.target.parentNode.getAttribute('id');
            }

            // If the current element is the one that was clicked,
            // then do nothing!
            if (cell.getAttribute('id') === cellId){
                return;
            }

            const cellDisplay = cell.querySelector('.sudoku-grid__box__cell__display');
            const cellInput = cell.querySelector('input.sudoku-grid__box__cell__input');

            cellDisplay.style.display = 'block';
            cellInput.style.display = 'none';
        });
    }
})

for (let i=0; i<gridCellElems.length; ++i) {
    let gridCellElem =  gridCellElems[i];
    let cellDisplay = gridCellElem.querySelector('.sudoku-grid__box__cell__display');
    let cellInput = gridCellElem.querySelector('input.sudoku-grid__box__cell__input');

    gridCellElem.addEventListener('click', (event) => {
        // If the input is disabled, don't do anything!
        if (event.currentTarget.querySelector('input.sudoku-grid__box__cell__input').disabled){
            return;
        }

        if (cellDisplay.style.display === 'none') {
            cellDisplay.style.display = 'block';
            cellInput.style.display = 'none';
        } else {
            cellDisplay.style.display = 'none';
            cellInput.style.display = 'inline';
            cellInput.select();
        }
        
        cellInput.setAttribute('oldValue', cellInput.value);
    });

    cellInput.addEventListener('change', (event) => {
        let oldValue = cellInput.getAttribute('oldValue');

        if (event.target.value == null || event.target.value == 0){
            cellDisplay.innerHTML = '';
            checkSolution();

            return;
        }

        if (event.target.value >= 1 && event.target.value <= 9 || event.target.value == ''){
            cellDisplay.innerHTML = cellInput.value;
        } else {
            cellInput.value = oldValue;
        }

        // check if the inputs are valid or not
        checkSolution();
    });
}

menuOptionStElem.addEventListener('click', () => {
    menuElem.style.display = 'none';
    gameAreaElem.style.display = 'flex';
    startGame(true);
});
resetElem.addEventListener('click', () => { resetGame() });
startDiffElem.addEventListener('click', () => { startGameWithDiffGrid() });