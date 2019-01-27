//Generates puzzle
function generatePuzzle(){
    var available = [];
    var value, ind;
    var col, blk;
    var unsolvedPuzzle = true;
    var failure;
    
    //Adds valid numbers to puzzle
    while(unsolvedPuzzle){
        failure = 0;
    
        puzzle = [  [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    
                    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    
                    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                    [[0, 0, 0], [0, 0, 0], [0, 0, 0]]];
    
        columns = [ [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1]];
    
        blocks =  [ [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1]];
    
        rows =  [   [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1]];
    
        outer_loop:
        for(var row = 0; row < 9; row++){
            for(var sec = 0; sec < 3; sec++){
                for(var num = 0; num < 3; num++){
                    col = num+(3*sec);
                    blk = sec+(3*Math.floor(row/3));
        
                    //Creates available array
                    for(var j = 0; j < 9; j++){
                        if(rows[row][j] === -1 && columns[col][j] === -1 && blocks[blk][j] === -1){
                            available.push(j);
                        }
                    }
        
                    //Checks if there are any available values; chooses one if there is
                    if(available.length === 0){
                        //Does this if there aren't any available values
                        failure = 1;
                        break outer_loop;
                    }else{
                        //Does this if there are available values
                        ind = Math.floor(Math.random()*available.length);
                        value = available[ind];
                    }
        
                    //Adds selected value to puzzle, rows, columns, and blocks matricies
                    rows[row][value] = 1;
                    columns[col][value] = 1;
                    blocks[blk][value] = 1;
                    puzzle[row][sec][num] = value + 1;
        
                    //Resets available values
                    available = [];
                }
            }
        }
    
        if(failure === 0){
            unsolvedPuzzle = false;
        }
    }

    return puzzle;
}

var puzzle = generatePuzzle();

//Converts ind (0-80) to threeDigitCode (row + sec + num)
function indexToThreeDigit(ind){
    var threeDigit, num, sec, row, multiple;
    
    if(ind%3 === 0){
        num = "2";
    }else if((ind+1)%3 === 0){
        num = "1";
    }else{
        num = "0";
    }
    threeDigit = num;

    multiple = Math.floor((ind-1)/9);
    sec = ind - (9*multiple);
    sec = Math.floor((sec-1)/3);

    threeDigit = sec + threeDigit;

    row = Math.floor((ind-1)/9).toString();
    threeDigit = row + threeDigit;

    return threeDigit;
}

var indexes = [],
    indexesShown = [];
//Populates indexes with 0-81
for(var i = 1; i <= 81; i++){
    indexes.push(i);
}

//Puts values from puzzle matrix into HTML
//Param: how many values to be shown
function puzzleToHTML(amountShown){
    var threeDigitCode, index, number;

    //Adds specificed amount of indexes to indexesShown[] and removes from indexes[]
    for(var i = 0; i < amountShown; i++){
        index = Math.floor(Math.random()*indexes.length);
        number = indexes.splice(indexes.indexOf(index), 1);
        indexesShown.push(number[0]);
    }

    for(var i = 0; i < indexesShown.length; i++){    
        threeDigitCode = indexToThreeDigit(indexesShown[i]);
        object = document.getElementById(threeDigitCode);
        object.innerHTML = puzzle[threeDigitCode.substring(0,1)][threeDigitCode.substring(1,2)][threeDigitCode.substring(2,3)];
    }
}

var easy = document.getElementById("easy").addEventListener("click", easyClick),
    medium = document.getElementById("medium").addEventListener("click", mediumClick),
    hard = document.getElementById("hard").addEventListener("click", hardClick),
    chosenDiff = document.getElementById("chosen-diff"),
    diffInfo = document.getElementById("difficulties"),
    helpInfo = document.getElementById("help-tab");   

var hint = document.getElementById("hint").addEventListener("click", hintClick);
    solve = document.getElementById("solve").addEventListener("click", solveClick),
    reset = document.getElementById("reset").addEventListener("click", resetClick),
    newPuzzle = document.getElementById("new").addEventListener("click", newPuzzleClick);
    
function easyClick(){
    chosenDiff.style.display = "block";
    chosenDiff.innerHTML = "Easy";
    diffInfo.style.display = "none";
    helpInfo.style.display = "block";

    puzzleToHTML(30);
}

function mediumClick(){
    chosenDiff.style.display = "block";
    chosenDiff.innerHTML = "Medium";
    diffInfo.style.display = "none";
    helpInfo.style.display = "block";

    puzzleToHTML(25);
}

function hardClick(){
    chosenDiff.style.display = "block";
    chosenDiff.innerHTML = "Hard";
    diffInfo.style.display = "none";
    helpInfo.style.display = "block";

    puzzleToHTML(20);
}

function hintClick(){
    puzzleToHTML(1);
}

function solveClick(){
    puzzleToHTML(81);
}

function resetClick(){

}

function newPuzzleClick(){
    var threeDigitCode, object;
    
    puzzle = generatePuzzle();
    
    for(var i = 1; i <= 81; i++){
        threeDigitCode = indexToThreeDigit(i);
        object = document.getElementById(threeDigitCode);
        object.innerHTML = " ";
    }

    diffInfo.style.display = "block";
    helpInfo.style.display = "none";
    chosenDiff.style.display = "none";

    indexes = [];
    for(var i = 1; i <= 81; i++){
        indexes.push(i);
    }
    indexesShown = [];
}