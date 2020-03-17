const gridCellElems = document.getElementsByClassName('sudoku-grid__box__cell');

window.addEventListener('click', (event) => {
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
        if (event.target.value >= 1 && event.target.value <= 9){
            cellDisplay.innerHTML = cellInput.value;
        } else {
            cellInput.value = oldValue;
        }
    });
}