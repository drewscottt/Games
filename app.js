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

//Difficulties tab
var easy = document.getElementById("easy").addEventListener("click", easyClick),
    medium = document.getElementById("medium").addEventListener("click", mediumClick),
    hard = document.getElementById("hard").addEventListener("click", hardClick),
    chosenDiff = document.getElementById("chosen-diff"),
    diffInfo = document.getElementById("difficulties");   

//Help tab
var hint = document.getElementById("hint").addEventListener("click", hintClick);
    solve = document.getElementById("solve").addEventListener("click", solveClick),
    reset = document.getElementById("reset").addEventListener("click", resetClick),
    newPuzzle = document.getElementById("new").addEventListener("click", newPuzzleClick),
    helpInfo = document.getElementById("help-tab");


var indexesShown = [],
    originalIndexes = [],
    availableIndexes = [];

for(var i = 1; i <= 81; i++){
    availableIndexes.push(i);
}  

//Converts ind (1-81) to threeDigitCode (row + sec + num)
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

//Puts values from indexesArray array into HTML
function puzzleToHTML(indexesArray){
    var threeDigitCode;
    for(var i = 0; i < indexesArray.length; i++){    
        threeDigitCode = indexToThreeDigit(indexesArray[i]);
        object = document.getElementById(threeDigitCode);
        object.innerHTML = puzzle[threeDigitCode.substring(0,1)][threeDigitCode.substring(1,2)][threeDigitCode.substring(2,3)];
    }
}

function generateOriginalHints(amount){
    var index;  

    for(var i = 0; i < amount; i++){
        index = Math.floor(Math.random()*availableIndexes.length);

        indexesShown.push(availableIndexes[index]);
        originalIndexes.push(availableIndexes[index]);

        availableIndexes.splice(index, 1);
    }
}

function easyClick(){
    chosenDiff.style.display = "block";
    chosenDiff.innerHTML = "Easy";
    diffInfo.style.display = "none";
    helpInfo.style.display = "block";

    generateOriginalHints(30);
    puzzleToHTML(originalIndexes);
}

function mediumClick(){
    chosenDiff.style.display = "block";
    chosenDiff.innerHTML = "Medium";
    diffInfo.style.display = "none";
    helpInfo.style.display = "block";

    generateOriginalHints(25);
    puzzleToHTML(indexesShown);
}

function hardClick(){
    chosenDiff.style.display = "block";
    chosenDiff.innerHTML = "Hard";
    diffInfo.style.display = "none";
    helpInfo.style.display = "block";

    generateOriginalHints(20);
    puzzleToHTML(indexesShown);
}

function hintClick(){
    var indexArr = [],
        index,
        location;
    
    //Selects location in availableIndexes array andgets that value
    location = Math.floor(Math.random()*availableIndexes.length);
    index = availableIndexes[location];
    indexArr.push(index);

    availableIndexes.splice(location, 1);

    puzzleToHTML(indexArr);
}

function solveClick(){
    for(var i = 0; i < availableIndexes.length; i++){
        indexesShown.push(availableIndexes[i]);
    }

    puzzleToHTML(indexesShown);
}

function resetClick(){
    //Clears board and refills availableIndexes
    availableIndexes = [];
    for(var i = 1; i <= 81; i++){
        threeDigitCode = indexToThreeDigit(i);
        object = document.getElementById(threeDigitCode);
        object.innerHTML = " ";
        availableIndexes.push(i);
    }

    //Sets indexesShown to originalIndexes and removes those indexes from availableIndexes
    indexesShown = [];
    for(var i = 0; i < originalIndexes.length; i++){
        indexesShown[i] = originalIndexes[i];
        availableIndexes.splice(availableIndexes.indexOf(originalIndexes[i]) ,1);
    }

    //Displays indexesShown (which at this point is originalIndexes)
    puzzleToHTML(indexesShown);
}

function newPuzzleClick(){
    var threeDigitCode, object;
    
    //Generates new puzzle
    puzzle = generatePuzzle();
    
    //Clears board
    for(var i = 1; i <= 81; i++){
        threeDigitCode = indexToThreeDigit(i);
        object = document.getElementById(threeDigitCode);
        object.innerHTML = " ";
    }

    //Displays difficulties tab and removes help tab
    diffInfo.style.display = "block";
    helpInfo.style.display = "none";
    chosenDiff.style.display = "none";

    //RESET: Refills availableIndexes and clears displayed indexes
    availableIndexes = [];
    for(var i = 1; i <= 81; i++){
        availableIndexes.push(i);
    }
    indexesShown = [],
    originalIndexes = [];
}