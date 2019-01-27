var easy = document.getElementById("easy"),
    medium = document.getElementById("medium"),
    hard = document.getElementById("hard"),
    chosenDiff = document.getElementById("chosen-diff");   

easy.addEventListener("click", easyClick);
medium.addEventListener("click", mediumClick);
hard.addEventListener("click", hardClick);

function easyClick(){
    chosenDiff.style.display = "block";
    chosenDiff.innerHTML = "Easy";
}

function mediumClick(){
    chosenDiff.style.display = "block";
    chosenDiff.innerHTML = "Medium";
}

function hardClick(){
    chosenDiff.style.display = "block";
    chosenDiff.innerHTML = "Hard";
}

var puzzle = [  [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                [[0, 0, 0], [0, 0, 0], [0, 0, 0]],

                [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                [[0, 0, 0], [0, 0, 0], [0, 0, 0]],

                [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                [[0, 0, 0], [0, 0, 0], [0, 0, 0]]];

var columns = [ [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1]];

var blocks =  [ [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1]];

var rows =  [   [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                [-1, -1, -1, -1, -1, -1, -1, -1, -1]];

var available = [];

var value, index, threeDigitCode, ind;
var row, sec, num;
var col, blk;

var indexes = [];
var unsolvedPuzzle = true;

for(var i = 0; i < 81; i++){
    indexes.push(i);
}

//Adds valid numbers to puzzle
while(unsolvedPuzzle){    
    index = Math.floor(Math.random()*indexes.length);
    index = indexes[index];
    indexes.splice(indexes.indexOf(index), 1);

    console.log(index);

    threeDigitCode = indexToThreeDigit(index+1);

    row = parseInt(threeDigitCode.substring(0,1));
    sec = parseInt(threeDigitCode.substring(1,2));
    num = parseInt(threeDigitCode.substring(2,3));

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
        value = -1;
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

    if(indexes.length === 0){
        unsolvedPuzzle = false;
    }
}

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

//Puts each value from puzzle matrix into HTML
function puzzleToHTML(){
    var threeDigitCode;

    for(var number = 1; number <= 81; number++){    
        threeDigitCode = indexToThreeDigit(number);

        object = document.getElementById(threeDigitCode);
        object.innerHTML = puzzle[threeDigitCode.substring(0,1)][threeDigitCode.substring(1,2)][threeDigitCode.substring(2,3)];
    }
}

puzzleToHTML();