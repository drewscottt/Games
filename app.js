var sudoku = document.getElementById("sudoku"),
    threex = document.getElementById("threex"),
    twox = document.getElementById("twox"),
    chosenType = document.getElementById("chosen-type");

sudoku.addEventListener("click", sudokuClick);
threex.addEventListener("click", threexClick);
twox.addEventListener("click", twoxClick);

function sudokuClick(){
    chosenType.style.display = "block";
    chosenType.innerHTML = "Sudoku Cube";
}

function threexClick(){
    chosenType.style.display = "block";
    chosenType.innerHTML = "3x3";
}

function twoxClick(){
    chosenType.style.display = "block";
    chosenType.innerHTML = "2x2";
}