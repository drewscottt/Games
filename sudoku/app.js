//Generates and returns a puzzle
function generatePuzzle(){
    var available = [];
    var value, ind;
    var col, blk;
    var unsolvedPuzzle = true;
    var noFailure;
    
    //Adds valid numbers to puzzle
    while(unsolvedPuzzle){
        noFailure = true;
    
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
                        //Restarts all generation if there aren't any available values
                        noFailure = false;
                        break outer_loop;
                    }else{
                        //Selects random value if there are available values
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
    
        if(noFailure){
            unsolvedPuzzle = false;
        }
    }

    return puzzle;
}

var puzzle, userPuzzle;
var indexesShown = [], //Contains only the indexes (1-81) revealed to user by the computer 
    userIndexes = [],  //Contains indexes (1-81) displayed to user, includes computer revealed and user input
    originalIndexes = [], //Contains only the indexes (1-81) originally revealed to the user
    availableIndexes = []; //Contains the indexes (1-81) that can still be revealed to user; compliment set of "indexesShown"

//Difficulties tab stuff
var easy = document.getElementById("easy").addEventListener("click", function(){
        chosenDiff.style.display = "block";
        chosenDiff.innerHTML = "Easy";
        diffInfo.style.display = "none";
        helpInfo.style.display = "block";

        generateOriginalDisplay(30);
        puzzleToHTML(originalIndexes);
    }),
    medium = document.getElementById("medium").addEventListener("click", function(){
        chosenDiff.style.display = "block";
        chosenDiff.innerHTML = "Medium";
        diffInfo.style.display = "none";
        helpInfo.style.display = "block";

        generateOriginalDisplay(25);
        puzzleToHTML(indexesShown);
    }),
    hard = document.getElementById("hard").addEventListener("click", function(){
        chosenDiff.style.display = "block";
        chosenDiff.innerHTML = "Hard";
        diffInfo.style.display = "none";
        helpInfo.style.display = "block";

        generateOriginalDisplay(20);
        puzzleToHTML(indexesShown);
    }),
    chosenDiff = document.getElementById("chosen-diff"),
    diffInfo = document.getElementById("difficulties");

//Help tab stuff
var hint = document.getElementById("hint").addEventListener("click", function(){
        var arr = [],
            arrayIndex,
            puzzleIndex;
        
        //Selects location in availableIndexes array andgets that value
        arrayIndex = Math.floor(Math.random()*availableIndexes.length);
        puzzleIndex = availableIndexes[arrayIndex];
        arr.push(puzzleIndex);

        indexesShown.push(arrayIndex);
        availableIndexes.splice(arrayIndex, 1);

        puzzleToHTML(arr);

        //Removes user's ability to click on and enter a value into this index
        document.getElementById(indexToThreeDigit(puzzleIndex)).removeEventListener("click", clickAnIndex);
        });
    solve = document.getElementById("solve").addEventListener("click", function(){
        var threeDigitCode, loc;
        var arr = [];
        for(var i = 1; i <= 81; i++){
            threeDigitCode = indexToThreeDigit(i);
            loc = document.getElementById(threeDigitCode);
            loc.innerHTML = "";
            loc.style.color = "#ff6f3c";
            clearInterval(currentBlinker);
            arr.push(i);
        }
        puzzleToHTML(arr);
        }),
    reset = document.getElementById("reset").addEventListener("click", function(){
        //Clears board and refills availableIndexes
        userPuzzle = [  [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
        
                        [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
        
                        [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                        [[0, 0, 0], [0, 0, 0], [0, 0, 0]]];

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
            var ind = originalIndexes[i];
            indexesShown[i] = ind;
            userIndexes[i] = ind;
            availableIndexes.splice(availableIndexes.indexOf(originalIndexes[i]) ,1);
            
            var row = indexToThreeDigit(ind).substring(0,1);
            var sec = indexToThreeDigit(ind).substring(1,2);
            var num = indexToThreeDigit(ind).substring(2,3);
            userPuzzle[row][sec][num] = puzzle[row][sec][num];

            //Removes user's ability to click on and enter values into this index
            document.getElementById(indexToThreeDigit(originalIndexes[i])).removeEventListener("click", clickAnIndex);
        }

        //Displays indexesShown (which at this point is originalIndexes)
        puzzleToHTML(indexesShown);
        }),
    newPuzzleTab = document.getElementById("new").addEventListener("click", newPuzzle),
    helpInfo = document.getElementById("help-tab");
    
var congrats = document.getElementById("congratulations");

//Clears display, resets variables and generates new puzzle
function newPuzzle(){
    //Generates new puzzle
    puzzle = generatePuzzle();
    
    //Values displayed to user
    userPuzzle = [  [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    
                    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    
                    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
                    [[0, 0, 0], [0, 0, 0], [0, 0, 0]]];

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
    originalIndexes = [];

    //Enables user to click on and enter values into all indexes
    for(var i = 1; i <= 81; i++){
        document.getElementById(indexToThreeDigit(i)).addEventListener("click", clickAnIndex);
    }

    clearInterval(currentBlinker);
}

//Generates the original board shown to user
function generateOriginalDisplay(amount){
    console.log("p");
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

//Reveals given array of indexes to user
function puzzleToHTML(indexesArray){
    var threeDigitCode, loc, value;
    for(var i = 0; i < indexesArray.length; i++){    
        threeDigitCode = indexToThreeDigit(indexesArray[i]);

        value = puzzle[threeDigitCode.substring(0,1)][threeDigitCode.substring(1,2)][threeDigitCode.substring(2,3)];

        loc = document.getElementById(threeDigitCode);
        loc.innerHTML = value;
        loc.style.color = "#ff6f3c";
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

//Ensures the boxes in the puzzle don't shrink in size if there are no revealed values in their row/column
for(var i = 1; i <= 81; i++){
    var loc = document.getElementById(indexToThreeDigit(i));
    loc.innerHTML = "10";
    loc.style.opacity = 0;
}

var currentID, lastID, currentLocation, lastLocation, lastBlinker, currentBlinker, activated;
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

        //Prepares current box for blinker
        currentLocation.style.color = "#ffc93c";
        currentLocation.style.opacity = 1;
        
        if(userPuzzle[row][sec][num] === 0 || userPuzzle[row][sec][num] === "" || userPuzzle[row][sec][num] === undefined){
            currentLocation.innerHTML = "|";
        }else{
            currentLocation.innerHTML = userPuzzle[row][sec][num] + "|";     
        }

        //RESET: removes old keyListener and clears blinker from last box
        window.removeEventListener("keydown", enterAValue);

        lastBlinker = currentBlinker;
        clearInterval(lastBlinker);
        if(!isNaN(lastID) && lastLocation.innerHTML.includes("|")){
            lastRow = lastID.substring(0,1);
            lastSec = lastID.substring(1,2);
            lastNum = lastID.substring(2,3);

            if(userPuzzle[lastRow][lastSec][lastNum] === 0 || userPuzzle[lastRow][lastSec][lastNum] === "" || userPuzzle[lastRow][lastSec][lastNum] === undefined){
                lastLocation.innerHTML = "";
            }else{
                lastLocation.innerHTML = userPuzzle[lastRow][lastSec][lastNum];
            }
        }

        //Displays real blinker in current box
        activated = false;
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

        //Listens for key input
        window.addEventListener("keydown", enterAValue);

        function enterAValue(){
            //Enters user's value (if it's valid (1-9)) into the box
            var input = String.fromCharCode(event.keyCode);
            if(!isNaN(input) && input > 0){
                clearInterval(currentBlinker);
                currentLocation.innerHTML = input;
                userPuzzle[row][sec][num] = input;
                checkUserBoard();
                window.removeEventListener("keydown", enterAValue);
            }
        }
    }
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

newPuzzle();   