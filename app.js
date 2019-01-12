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

var fullRow = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

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

var options = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var newOptions = [];
var section = [0, 0, 0];
var value, blockRow, index, ind;

for(var row = 0; row < 9; row++){

    for(var sec = 0; sec < 3; sec++){

        for(var num = 0; num < 3; num++){

            for(var i = 0; i < 9; i++){
                if(!(checkWithinRow(i, row)) || !(checkWithinBlock(i, row, sec)) || !(checkWithinColumn(i, num, sec))){                
                    ind = options.indexOf(i);
                    options.splice(ind, 1);
                }
            }
            
            if(options.length === 0){
                value = -1;
            }else{
                index = Math.floor(Math.random()*options.length);
                value = options[index];
            }

            section[num] = value + 1;

            blockRow = Math.floor(row/3);

            rows[row][value] = value;
            columns[num+(3*sec)][value] = value;
            blocks[(blockRow*2)+blockRow+sec][value] = value;

            options = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        }
    
        fullRow[sec] = section;
        section = [0, 0, 0];
    }

    puzzle[row] = fullRow;
    fullRow = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
}

function checkWithinRow(value, row){
    if(rows[row][value] === -1){
        return true;
    }

    return false;
}

function checkWithinBlock(value, row, sec){
    blockRow = Math.floor(row/3);
    
    if(blocks[(blockRow*2)+blockRow+sec][value] === -1){
        return true;
    }

    return false;
}

function checkWithinColumn(value, num, sec){
    if(columns[num+(3*sec)][value] === -1){
        return true;
    }

    return false;
}

for(var number = 1; number <= 81; number++){    
    var threeDigit, object, first, second, third;

    if(number%3 === 0){
        first = "2";
    }else if((number+1)%3 === 0){
        first = "1";
    }else{
        first = "0";
    }
    threeDigit = first;

    var multiple = Math.floor((number-1)/9);
    second = number - (9*multiple);
    second = Math.floor((second-1)/3);

    threeDigit = second + threeDigit;

    third = Math.floor((number-1)/9).toString();
    threeDigit = third + threeDigit;

    object = document.getElementById(threeDigit);
    object.innerHTML = puzzle[third][second][first];
}