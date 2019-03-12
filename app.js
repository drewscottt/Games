//Generates and returns a puzzle
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

var userPuzzle = [  [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    
                    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    
                    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                    [[0, 0, 0], [0, 0, 0], [0, 0, 0]]];

//Enables user to click on and enter values into all indexes
for(var i = 1; i <= 81; i++){
    document.getElementById(indexToThreeDigit(i)).addEventListener("click", clickAnIndex);
}

//Difficulties tab stuff
var easy = document.getElementById("easy").addEventListener("click", easyClick),
    medium = document.getElementById("medium").addEventListener("click", mediumClick),
    hard = document.getElementById("hard").addEventListener("click", hardClick),
    chosenDiff = document.getElementById("chosen-diff"),
    diffInfo = document.getElementById("difficulties");   

//These functions create the original display to the user, based on difficulty (changes how many indexes are revealed)
function easyClick(){
    chosenDiff.style.display = "block";
    chosenDiff.innerHTML = "Easy";
    diffInfo.style.display = "none";
    helpInfo.style.display = "block";

    generateOriginalDisplay(30);
    puzzleToHTML(originalIndexes);
}

function mediumClick(){
    chosenDiff.style.display = "block";
    chosenDiff.innerHTML = "Medium";
    diffInfo.style.display = "none";
    helpInfo.style.display = "block";

    generateOriginalDisplay(25);
    puzzleToHTML(indexesShown);
}

function hardClick(){
    chosenDiff.style.display = "block";
    chosenDiff.innerHTML = "Hard";
    diffInfo.style.display = "none";
    helpInfo.style.display = "block";

    generateOriginalDisplay(20);
    puzzleToHTML(indexesShown);
}

//Generates the original board shown to user; used in the above functions
function generateOriginalDisplay(amount){
    var arrayIndex, puzzleIndex;  

    for(var i = 0; i < amount; i++){
        arrayIndex = Math.floor(Math.random()*availableIndexes.length);
        puzzleIndex = availableIndexes[arrayIndex];

        indexesShown.push(puzzleIndex);
        userIndexes.push(puzzleIndex);
        originalIndexes.push(puzzleIndex);
        availableIndexes.splice(arrayIndex, 1);

        //Removes user's ability to click on and enter values into this index
        document.getElementById(indexToThreeDigit(puzzleIndex)).removeEventListener("click", clickAnIndex);
    }
}

//Reveals given array of indexes to user; used in the above functions and help functions
function puzzleToHTML(indexesArray){
    var threeDigitCode, loc, value;
    for(var i = 0; i < indexesArray.length; i++){    
        threeDigitCode = indexToThreeDigit(indexesArray[i]);

        value = puzzle[threeDigitCode.substring(0,1)][threeDigitCode.substring(1,2)][threeDigitCode.substring(2,3)];

        loc = document.getElementById(threeDigitCode);
        loc.innerHTML = value;
        loc.style.color = "#ff6f3c";
        loc.style.fontSize = "150%";
        loc.style.textAlign = "left";
        loc.style.verticalAlign = "middle";
        loc.style.paddingLeft = "4%";
        loc.style.opacity = 1;

        userPuzzle[threeDigitCode.substring(0,1)][threeDigitCode.substring(1,2)][threeDigitCode.substring(2,3)] = value;
    
        checkUserBoard();
    }
}

//Converts ind (1-81) to threeDigitCode (row + sec + num); used to input values into HTML tags
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

//Converts threeDigit (row + sec + num) to ind (1-81)
function threeDigitToIndex(threeDigit){
    var row, sec, num, ind;
    row = threeDigit.substring(0,1);
    sec = threeDigit.substring(1,2);
    num = threeDigit.substring(2,3);

    ind = num + (3*sec) + (9*row);
    return ind;
}

//Help tab stuff
var hint = document.getElementById("hint").addEventListener("click", hintClick);
    solve = document.getElementById("solve").addEventListener("click", solveClick),
    reset = document.getElementById("reset").addEventListener("click", resetClick),
    newPuzzle = document.getElementById("new").addEventListener("click", newPuzzleClick),
    helpInfo = document.getElementById("help-tab");

var congrats = document.getElementById("congratulations");
//Reveals one index to user
function hintClick(){
    var arr = [],
        arrayIndex,
        puzzleIndex;
    
    //Selects location in availableIndexes array andgets that value
    arrayIndex = Math.floor(Math.random()*availableIndexes.length);
    puzzleIndex = availableIndexes[arrayIndex];
    arr.push(puzzleIndex);

    availableIndexes.splice(arrayIndex, 1);

    puzzleToHTML(arr);

    //Removes user's ability to click on and enter a value into this index
    document.getElementById(indexToThreeDigit(puzzleIndex)).removeEventListener("click", clickAnIndex);
}

//Reveals all indexes to user
function solveClick(){
    var threeDigitCode, loc;
    for(var i = 1; i <= 81; i++){
        threeDigitCode = indexToThreeDigit(i);
        loc = document.getElementById(threeDigitCode);
        loc.innerHTML = " ";
        loc.style.color = "#ff6f3c";
        clearInterval(currentBlinker);
    }
    
    for(var i = 0; i < availableIndexes.length; i++){
        indexesShown.push(availableIndexes[i]);
    }

    puzzleToHTML(indexesShown);
}

//Clears display except for original indexes
function resetClick(){
    //Clears board and refills availableIndexes
    var threeDigitCode, loc;
    availableIndexes = [];
    for(var i = 1; i <= 81; i++){
        threeDigitCode = indexToThreeDigit(i);
        loc = document.getElementById(threeDigitCode);
        loc.innerHTML = "10";
        loc.style.opacity = 0;
        loc.style.color = "#ff6f3c";
        availableIndexes.push(i);

        //Enables user to click on and enter values into all indexes
        document.getElementById(indexToThreeDigit(i)).addEventListener("click", clickAnIndex);
    }

    //Sets indexesShown to originalIndexes and removes those indexes from availableIndexes
    indexesShown = [];
    userIndexes = [],
    notes = [];
    for(var i = 0; i < originalIndexes.length; i++){
        indexesShown[i] = originalIndexes[i];
        userIndexes[i] = originalIndexes[i];
        availableIndexes.splice(availableIndexes.indexOf(originalIndexes[i]) ,1);
        
        //Removes user's ability to click on and enter values into this index
        document.getElementById(indexToThreeDigit(originalIndexes[i])).removeEventListener("click", clickAnIndex);
    }

    //Displays indexesShown (which at this point is originalIndexes)
    puzzleToHTML(indexesShown);
}

//Clears display and generates new puzzle
function newPuzzleClick(){
    //Generates new puzzle
    puzzle = generatePuzzle();
    
    //Clears board
    var threeDigitCode, loc;
    for(var i = 1; i <= 81; i++){
        threeDigitCode = indexToThreeDigit(i);
        loc = document.getElementById(threeDigitCode);
        loc.innerHTML = "10";
        loc.style.opacity = 0;
        availableIndexes.push(i);
    }

    //Displays difficulties tab and removes help tab
    diffInfo.style.display = "block";
    helpInfo.style.display = "none";
    chosenDiff.style.display = "none";
    congrats.style.display = "none";

    //RESET: Refills availableIndexes and clears displayed indexes
    availableIndexes = [];
    for(var i = 1; i <= 81; i++){
        availableIndexes.push(i);
    }
    indexesShown = [],
    userIndexes = [],
    originalIndexes = [],
    notes = [];
}

var indexesShown = [], //Contains only the indexes (1-81) revealed to user by the computer 
    userIndexes = [],  //Contains indexes (1-81) displayed to user, includes computer revealed and user input
    originalIndexes = [], //Contains only the indexes (1-81) originally revealed to the user
    availableIndexes = [], //Contains the indexes (1-81) that can still be revealed to user; compliment set of "indexesShown"
    notes = [];
for(var i = 1; i <= 81; i++){
    availableIndexes.push(i);
} 

//Ensures the boxes in the puzzle don't shrink in size if there are no revealed values in their row/column
for(var i = 1; i <= 81; i++){
    var loc = document.getElementById(indexToThreeDigit(i));
    loc.innerHTML = "10";
    loc.style.opacity = 0;
}

var currentID, lastID, currentLocation, lastLocation, lastBlinker, currentBlinker, notesBlinker, activated;
function clickAnIndex(){
    //Ensures user can't enter values in a blank or solved puzzle
    if(indexesShown.length > 0 && indexesShown.length < 81){
        //ID & Location stuff--enables referencing
        lastID = currentID; //row + sec + num
        currentID = this.id;
        currentLocation = document.getElementById(currentID);
        lastLocation = document.getElementById(lastID);
        var row = currentID.substring(0,1);
        var sec = currentID.substring(1,2);
        var num = currentID.substring(2,3);

        //Blinker stuff
        activated = false;
        lastBlinker = currentBlinker;
        currentBlinker = setInterval(function() {
            if(userPuzzle[row][sec][num] === 0 || userPuzzle[row][sec][num] === "" || userPuzzle[row][sec][num] === undefined){
                //Does this if the user HAS NOT enter anything into the box
                if(activated){
                    currentLocation.innerHTML = "|";
                    activated = false;
                }else{
                    currentLocation.innerHTML = "";
                    activated = true;
                }
            }else{
                //Does this is the user HAS entered something into the box
                if(activated){
                    currentLocation.innerHTML = userPuzzle[row][sec][num] + "|";
                    activated = false;
                }else{
                    currentLocation.innerHTML = userPuzzle[row][sec][num];
                    activated = true;
                }
            }
        }, 700);
        displayBlinker();

        //RESET: removes old keyListener and blinkers
        window.removeEventListener("keydown", enterAValue);
        clearInterval(notesBlinker);
        clearInterval(lastBlinker);

        //Listens for user key input
        window.addEventListener("keydown", enterAValue);

        var shiftClicked = false;
        function enterAValue(){
            if(event.keyCode === 16){
                //Changes to notes setting if shift is clicked
                shiftClicked = true;
                currentLocation.style.fontSize = "80%";
                currentLocation.style.textAlign = "right";
                currentLocation.style.verticalAlign = "top";
            }else if(event.keyCode === 8){

            }else{
                //Enters user's value (if it's valid (1-9)) into the box based on setting (either notes or regular)
                var input = String.fromCharCode(event.keyCode);
                if(!isNaN(input) && input > 0){
                    clearInterval(currentBlinker);
                    if(shiftClicked){
                        //Adds notes into box (using notes array) until user clicks away
                        if(notes[threeDigitToIndex(currentID)] === undefined){
                            notes[threeDigitToIndex(currentID)] = input.toString();
                        }else{
                            if(!notes[threeDigitToIndex(currentID)].includes(input.toString())){
                                notes[threeDigitToIndex(currentID)] += input.toString();
                            }
                        }
                        
                        notesBlinker = setInterval(function() {
                            var activated = true;
                            if(activated){
                                currentLocation.innerHTML = notes[threeDigitToIndex(currentID)] + "|";
                                activated = false;
                            }else{
                                currentLocation.innerHTML = notes[threeDigitToIndex(currentID)];
                                activated = true;
                            }
                        }, 700);
                    }else{
                        currentLocation.innerHTML = input;
                        userPuzzle[row][sec][num] = input;
                        checkUserBoard();
                        window.removeEventListener("keydown", enterAValue);
                    }
                }
            }    
        }
    }
}

function displayBlinker(){
    currentLocation.style.color = "#ffc93c";
    currentLocation.innerHTML = "";
    currentLocation.innerHTML += "|";
    currentLocation.style.opacity = 1;
    currentLocation.style.fontSize = "150%";
    currentLocation.style.textAlign = "left";
    currentLocation.style.verticalAlign = "middle";
    currentLocation.style.paddingLeft = "4%";
}

function checkUserBoard(){
    var equiv = true;
    for(var i = 1; i <= 81; i++){
        var threeDigits = indexToThreeDigit(i);
        var row = threeDigits.substring(0,1);
        var sec = threeDigits.substring(1,2);
        var num = threeDigits.substring(2,3);

        if(puzzle[row][sec][num] !== userPuzzle[row][sec][num]){
            equiv = false;
        }
    }

    if(equiv){
        congrats.style.display = "block";
    }
}