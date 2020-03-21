const gridCellElems = document.getElementsByClassName('sudoku-grid__box__cell');

const initSudokuGrid = (grid) => {
    sudokuEls = getSudokuGridElems();
    
    for (let i=0; i<9; ++i) {
        for(let j=0; j<9; ++j) {
            sudokuEls[i][j].querySelector('.sudoku-grid__box__cell__display').innerHTML = grid[i][j];
            sudokuEls[i][j].querySelector('.sudoku-grid__box__cell__input').value = grid[i][j]
        }
    }
};

const getSudokuGridElems = () => {
    return [[
            document.getElementById('cell-00-00'),
            document.getElementById('cell-01-01'),
            document.getElementById('cell-02-02'),
            document.getElementById('cell-03-10'),
            document.getElementById('cell-04-11'),
            document.getElementById('cell-05-12'),
            document.getElementById('cell-06-20'),
            document.getElementById('cell-07-21'),
            document.getElementById('cell-08-22'),
        ], [
            document.getElementById('cell-10-03'),
            document.getElementById('cell-11-04'),
            document.getElementById('cell-12-05'),
            document.getElementById('cell-13-13'),
            document.getElementById('cell-14-14'),
            document.getElementById('cell-15-15'),
            document.getElementById('cell-16-23'),
            document.getElementById('cell-17-24'),
            document.getElementById('cell-18-25'),
        ], [
            document.getElementById('cell-20-06'),
            document.getElementById('cell-21-07'),
            document.getElementById('cell-22-08'),
            document.getElementById('cell-23-16'),
            document.getElementById('cell-24-17'),
            document.getElementById('cell-25-18'),
            document.getElementById('cell-26-26'),
            document.getElementById('cell-27-27'),
            document.getElementById('cell-28-28'),
        ], [
            document.getElementById('cell-30-30'),
            document.getElementById('cell-31-31'),
            document.getElementById('cell-32-32'),
            document.getElementById('cell-33-40'),
            document.getElementById('cell-34-41'),
            document.getElementById('cell-35-42'),
            document.getElementById('cell-36-50'),
            document.getElementById('cell-37-51'),
            document.getElementById('cell-38-52'),
        ], [
            document.getElementById('cell-40-33'),
            document.getElementById('cell-41-34'),
            document.getElementById('cell-42-35'),
            document.getElementById('cell-43-43'),
            document.getElementById('cell-44-44'),
            document.getElementById('cell-45-45'),
            document.getElementById('cell-46-53'),
            document.getElementById('cell-47-54'),
            document.getElementById('cell-48-55'),
        ], [
            document.getElementById('cell-50-36'),
            document.getElementById('cell-51-37'),
            document.getElementById('cell-52-38'),
            document.getElementById('cell-53-46'),
            document.getElementById('cell-54-47'),
            document.getElementById('cell-55-48'),
            document.getElementById('cell-56-56'),
            document.getElementById('cell-57-57'),
            document.getElementById('cell-58-58'),
        ], [
            document.getElementById('cell-60-60'),
            document.getElementById('cell-61-61'),
            document.getElementById('cell-62-62'),
            document.getElementById('cell-63-70'),
            document.getElementById('cell-64-71'),
            document.getElementById('cell-65-72'),
            document.getElementById('cell-66-80'),
            document.getElementById('cell-67-81'),
            document.getElementById('cell-68-82'),
        ], [
            document.getElementById('cell-70-63'),
            document.getElementById('cell-71-64'),
            document.getElementById('cell-72-65'),
            document.getElementById('cell-73-73'),
            document.getElementById('cell-74-74'),
            document.getElementById('cell-75-75'),
            document.getElementById('cell-76-83'),
            document.getElementById('cell-77-84'),
            document.getElementById('cell-78-85'),
        ], [
            document.getElementById('cell-80-66'),
            document.getElementById('cell-81-67'),
            document.getElementById('cell-82-68'),
            document.getElementById('cell-83-76'),
            document.getElementById('cell-84-77'),
            document.getElementById('cell-85-78'),
            document.getElementById('cell-86-86'),
            document.getElementById('cell-87-87'),
            document.getElementById('cell-88-88'),
    ]];
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
            return;
        }

        if (event.target.value >= 1 && event.target.value <= 9 || event.target.value == ''){
            cellDisplay.innerHTML = cellInput.value;
        } else {
            cellInput.value = oldValue;
        }
    });
}