var currentDeck = [];

//Creates a card and assigns it a suit, value, and valueNum 
function createCard(suitNum, valueNum){
    var suit, value;
    switch(suitNum){
        case 0:
            suit = "spades";
            break;
        case 1:
            suit = "clubs";
            break;
        case 2:
            suit = "hearts";
            break;
        case 3:
            suit = "diamonds";
    }

    switch(valueNum){
        case 9: 
            value = "nine";
            break;
        case 10:
            value = "jack";
            break;
        case 11:
            value = "queen";
            break;
        case 12:
            value = "king";
            break;
        case 13:
            value = "ten";
            break;
        case 14:
            value = "ace";
    }

    var card = {
        suit: suit,
        value: value,
        valueNum: valueNum,
        trump: false,
        displayed: false
    }

    return card;
}

//Adds all 48 cards to currentDeck by calling createCard(suitNum, valueNum)
for(var suit = 0; suit < 4; suit++){
    for(var value = 9; value < 15; value++){
        currentDeck.push(createCard(suit, value));
        currentDeck.push(createCard(suit, value));
    }
}

//Randomizes the order of currentDeck
function shuffleDeck(){
    var firstIndex, secondIndex, firstCard, secondCard;
    for(var swaps = 0; swaps < 1000; swaps++){
        firstIndex = Math.floor(Math.random() * 48);
        secondIndex = Math.floor(Math.random() * 48);

        firstCard = currentDeck[firstIndex];
        secondCard = currentDeck[secondIndex];

        currentDeck[firstIndex] = secondCard;
        currentDeck[secondIndex] = firstCard;
    }
}

var userHand, partnerHand, oneCPUHand, twoCPUHand;
//Divides deck between each of the 4 hands
function dealDeck(){
    userHand = currentDeck.slice(0, 12);
    oneCPUHand = currentDeck.slice(12, 24);
    twoCPUHand = currentDeck.slice(24, 36);
    partnerHand = currentDeck.slice(36, 48);
}

//Sorts userHand by suit and value
function sortUserHand(){
    var hearts = [],
        clubs = [],
        diamonds = [],
        spades = [],
        tempHand = [],
        secondTempHand = [];

    for(var i = 0; i < userHand.length; i++){
        var card = userHand[i];
        
        switch(card.suit){
            case 'hearts':
                hearts.push(card);
                break;
            case 'clubs':
                clubs.push(card);
                break;
            case 'diamonds':
                diamonds.push(card);
                break;
            case 'spades':
                spades.push(card);
        }
    }
    tempHand.push(hearts, clubs, diamonds, spades);

    for(var s = 0; s < tempHand.length; s++){
        var tempSuitHand = [];
        for(var v = 0; v < tempHand[s].length; v++){
            if(tempSuitHand.length === 0){
                tempSuitHand.push(tempHand[s][v]);
            }else{
                for(var l = 0; l < tempSuitHand.length; l++){
                    if(tempHand[s][v].valueNum > tempSuitHand[l].valueNum){
                        tempSuitHand.splice(l, 0, tempHand[s][v]);
                        break;
                    }else if(l === tempSuitHand.length - 1){
                        tempSuitHand.push(tempHand[s][v]);
                        break;
                    } 
                }
            }
        }
        tempHand[s] = tempSuitHand;
    }

    for(var s = 0; s < tempHand.length; s++){
        for(var v = 0; v < tempHand[s].length; v++){
            secondTempHand.push(tempHand[s][v]);
        }
    }
    userHand = secondTempHand;
}

//Displays and adds an eventListener to all the cards in userHand
function displayuserHand(){
    for(var i = 0; i < userHand.length; i++){
        var cardHTML = document.getElementById("card-" + (i+1).toString());
        cardHTML.src = "images/" + userHand[i].value + "_" + userHand[i].suit + ".jpeg";
    }

    document.getElementById("partnerHand").style.display = "block";
    document.getElementById("oneCPUHand").style.display = "block";
    document.getElementById("twoCPUHand").style.display = "block";
}

var userCard = document.getElementById("userCard");

var staticCompMsg = document.getElementById("staticCompMsg");
var activeCompMsg = document.getElementById("activeCompMsg");
activeCompMsg.addEventListener("mouseover", function(){
    activeCompMsg.style.backgroundColor = "#1e579c";
});
activeCompMsg.addEventListener("mouseleave", function(){
    activeCompMsg.style.backgroundColor = "#1c4b82";
});

var oneCPUMessage = document.getElementById("oneCPUMessage");
var partnerMessage = document.getElementById("partnerMessage");
var twoCPUMessage = document.getElementById("twoCPUMessage");
var userMessage = document.getElementById("userMessage");

var userNameTag = document.getElementById("userNameTag");
var oneCPUNameTag = document.getElementById("oneCPUNameTag");
var partnerNameTag = document.getElementById("partnerNameTag");
var twoCPUNameTag = document.getElementById("twoCPUNameTag");

var scoreTable = document.getElementById("scoreTable");
var pTScore = document.getElementById("userTeamScore");
pTScore.innerHTML = "0";
var CPUTScore = document.getElementById("CPUTeamScore");
CPUTScore.innerHTML = "0";
var pTBid = document.getElementById("userTeamBid");
pTBid.innerHTML = "--";
var CPUTBid = document.getElementById("CPUTeamBid");
CPUTBid.innerHTML = "--";

var userBidBox = document.getElementById("userBidBox");
var valueBox = document.getElementById("valueBox");

var upButton = document.getElementById("up");
upButton.addEventListener("click", function(){
    var currentValue = parseInt(valueBox.innerHTML);
    valueBox.innerHTML = (currentValue + 10).toString();
});

var downButton = document.getElementById("down");
downButton.addEventListener("click", function(){
    var currentValue = parseInt(valueBox.innerHTML);
    if(currentValue > currentBid + 10){
        valueBox.innerHTML = (currentValue - 10).toString();
    }
});

var okButton = document.getElementById("okButton");
okButton.addEventListener("click", function(){
    currentBid = parseInt(valueBox.innerHTML);
    userBidBox.style.display = "none";

    userMessage.style.display = "block";
    userMessage.innerHTML = "I bid " + currentBid.toString() + ".";
    userMessage.style.left = "47.5%";
    
    turn = 0;
    setTimeout(bid, 1000);
});

var passButton = document.getElementById("pass");
passButton.addEventListener("click", function(){
    userBidBox.style.display = "none";

    userMessage.style.display = "block";
    userMessage.innerHTML = "I pass."
    userMessage.style.left = "48%";
    
    userIsBidding = false;
    passCounter++;

    turn = 0; 
    setTimeout(bid, 1000);
});

var trumpSuitOptions = document.getElementById("trumpSuitOptions");

//Attached to eventListener of staticCompMsg
//Calls function startHand()
activeCompMsg.innerHTML = "Start Game";
activeCompMsg.addEventListener("click", startGame);
function startGame(){
    activeCompMsg.removeEventListener("click", startGame);
    activeCompMsg.style.left = "42.5%";
    staticCompMsg.style.display = "block";

    startHand();
}

var firstDealer = Math.floor(Math.random() *  3);
var turn = firstDealer;
//Starts a hand by selecting a dealer and then begins the bidding process
function startHand(){
    //Selects a dealer and displays which user has been selected
    switch(turn){
        case 0:
            staticCompMsg.innerHTML = "It's your deal.";
            staticCompMsg.style.left = "45%";
            break;
        case 1:
            staticCompMsg.innerHTML = "It's CPU #1's deal.";
            staticCompMsg.style.left = "43%";
            break;
        case 2:
            staticCompMsg.innerHTML = "It's your partner's deal.";
            staticCompMsg.style.left = "41%"; 
            break;
        case 3:
            staticCompMsg.innerHTML = "It's CPU #2's deal.";
            staticCompMsg.style.left = "43%"; 
    }

    //Displays user name tags
    userNameTag.style.display = "block";
    oneCPUNameTag.style.display = "block";
    partnerNameTag.style.display = "block";
    twoCPUNameTag.style.display = "block";

    //Displays score table
    scoreTable.style.display = "block";

    //Displays and adds an eventListener to  the continue switch
    activeCompMsg.style.display = "block";
    activeCompMsg.innerHTML = "Click to deal cards.";
    activeCompMsg.addEventListener("click", clickToDeal);
}
//Added to activeCompMsg's eventListener
function clickToDeal(){
    activeCompMsg.removeEventListener("click", clickToDeal);
    //Displays the cards in the user's hand
    displayuserHand(userHand);

    //Displays who has first bid (based on who the dealer was)
    switch(turn){
        case 0:
            oneCPUMessage.innerHTML = "It's my bid first.";
            oneCPUMessage.style.display = "block";
            break;
        case 1:
            partnerMessage.innerHTML = "It's my bid first.";
            partnerMessage.style.display = "block"; 
            break;
        case 2:
            twoCPUMessage.innerHTML = "It's my bid first.";
            twoCPUMessage.style.display = "block";
            break;
        case 3:
            userMessage.innerHTML = "It's my bid first.";
            userMessage.style.display = "block";
    }
    activeCompMsg.style.display = "none";

    //Starts the bidding process
    setTimeout(bid, 1000);
}

var currentBid = 240;
var userIsBidding = true, 
    oneCPUIsBidding = true, 
    partnerIsBidding = true, 
    twoCPUIsBidding = true;
var passCounter = 0;
var trumpSuit;
function bid(){
    staticCompMsg.style.display = "none";
    //Does this if fewer than 3 of the users stopped bidding (more than 1 are bidding)
    if(passCounter < 3){
        //Decides whose turn to bid it is
        switch(turn){
            case 0: //oneCPU
                //Displays oneCPU's message box
                oneCPUMessage.style.display = "block";
    
                //Does this if oneCPU is still bidding
                if(oneCPUIsBidding){
                    if(Math.random() > .5){
                        oneCPUMessage.innerHTML = "I pass.";
                        oneCPUIsBidding = false;
                        passCounter++;
                    }else{
                        currentBid += 10;
        
                        oneCPUMessage.innerHTML = "I bid " + (currentBid).toString() + ".";
                    }

                    //Continues the bidding process
                    turn = 1;
                    setTimeout(bid, 1000);
                }else{
                    //Continues bidding without delay
                    turn = 1;
                    bid();
                }
                //Changes the value in the user's bid box to what the current bid + 10 is (the lowest the user can bid)
                valueBox.innerHTML = (currentBid + 10).toString();
    
                break;
            case 1: //partner
                partnerMessage.style.display = "block";
    
                if(partnerIsBidding){
                    if(Math.random() > .5){
                        partnerMessage.innerHTML = "I pass.";
                        partnerMessage.style.left = "47.5%";
                        partnerIsBidding = false;
                        passCounter++;
                    }else{
                        currentBid += 10;
        
                        partnerMessage.innerHTML = "I bid " + (currentBid).toString() + ".";
                        partnerMessage.style.left = "47%";
                    }
                    valueBox.innerHTML = (currentBid + 10).toString();

                    turn = 2;
                    setTimeout(bid, 1000);
                }else{
                    turn = 2;
                    bid();
                }
    
                break;
            case 2: //twoCPU
                twoCPUMessage.style.display = "block";
    
                if(twoCPUIsBidding){
                    if(Math.random() > .5){
                        twoCPUMessage.innerHTML = "I pass.";
                        twoCPUIsBidding = false;
                        passCounter++;
                    }else{
                        currentBid += 10;
        
                        twoCPUMessage.innerHTML = "I bid " + (currentBid).toString() + ".";
                    }
                    valueBox.innerHTML = (currentBid + 10).toString();
                }
    
                turn = 3;
                bid();
                break;  
            case 3: //user
                if(userIsBidding){
                    userBidBox.style.display = "block";
                }else{
                    turn = 0;
                    bid();
                }
            }
    //Does this if 3 users stopped bidding (only one user still bidding)         
    }else{
        selectTrump();
    }
}

function selectTrump(){
    var biddingArr = [userIsBidding, oneCPUIsBidding, partnerIsBidding, twoCPUIsBidding];
    //Decides which user is still bidding
    switch(biddingArr.indexOf(true)){
        case 0://user
            userMessage.innerHTML = "I took the bid for " + currentBid + ".";
            userMessage.style.left = "44%";

            oneCPUMessage.style.display = "none";
            partnerMessage.style.display = "none";
            twoCPUMessage.style.display = "none";

            pTBid.innerHTML = currentBid;
            CPUTBid.innerHTML = "--";

            staticCompMsg.style.display = "block";
            staticCompMsg.style.left = "42%";
            staticCompMsg.innerHTML = "Select a trump suit."

            trumpSuitOptions.style.display = "block";
            //Adds an eventListener to each suit icon (allows user to select a trump suit)
            document.getElementById("hearts").addEventListener("click", function(){
                staticCompMsg.innerHTML = "Hearts is trump suit.";
                trumpSuitOptions.style.display = "none";
                trumpSuit = "hearts";
                document.getElementById("trumpSuit").innerHTML = "Hearts";

                assignTrumpValue();

                turn = 0;
                setTimeout(passCards, 1000);
            });
            document.getElementById("clubs").addEventListener("click", function(){
                staticCompMsg.innerHTML = "Clubs is trump suit.";
                trumpSuitOptions.style.display = "none";
                trumpSuit = "clubs";
                document.getElementById("trumpSuit").innerHTML = "Clubs";

                assignTrumpValue();

                turn = 0;
                setTimeout(passCards, 1000);
            });
            document.getElementById("diamonds").addEventListener("click", function(){
                staticCompMsg.innerHTML = "Diamonds is trump suit.";
                trumpSuitOptions.style.display = "none";
                trumpSuit = "diamonds";
                document.getElementById("trumpSuit").innerHTML = "Diamonds";

                assignTrumpValue();

                turn = 0;
                setTimeout(passCards, 1000);
            });
            document.getElementById("spades").addEventListener("click", function(){
                staticCompMsg.innerHTML = "Spades is trump suit.";
                trumpSuitOptions.style.display = "none";
                trumpSuit = "spades";
                document.getElementById("trumpSuit").innerHTML = "Spades";

                assignTrumpValue();

                turn = 0;
                setTimeout(passCards, 1000);
            });

            var suits = document.getElementById("trumpSuitOptions").children;
            for(var i = 0; i < suits.length; i++){
                suits[i].style.display = "block";
                suits[i].addEventListener("mouseover", function(){
                    this.style.width = "9%";
                });
                suits[i].addEventListener("mouseleave", function(){
                    this.style.width = "8%";
                })
            }

            break;
        case 1://oneCPU
            oneCPUMessage.innerHTML = "I took the bid for " + currentBid + ".";
            userMessage.style.display = "none";
            partnerMessage.style.display = "none";
            twoCPUMessage.style.display = "none";

            CPUTBid.innerHTML = currentBid;
            pTBid.innerHTML = "--";

            staticCompMsg.style.display = "block";
            CPUSelectTrump();

            turn = 1;
            setTimeout(passCards, 1000);
            break;
        case 2://partner
            partnerMessage.innerHTML = "I took the bid for " + currentBid + ".";
            userMessage.style.display = "none";
            oneCPUMessage.style.display = "none";
            twoCPUMessage.style.display = "none";

            pTBid.innerHTML = currentBid;
            CPUTBid.innerHTML = "--";

            staticCompMsg.style.display = "block";
            CPUSelectTrump();

            turn = 2;
            setTimeout(passCards, 1000);
            break;
        case 3://twoCPU
            twoCPUMessage.innerHTML = "I took the bid for " + currentBid + ".";
            userMessage.style.display = "none";
            oneCPUMessage.style.display = "none";
            partnerMessage.style.display = "none";
            
            CPUTBid.innerHTML = currentBid;
            pTBid.innerHTML = "--";

            staticCompMsg.style.display = "block";
            CPUSelectTrump();

            turn = 3;
            setTimeout(passCards, 1000);
    }


    function assignTrumpValue(){
        for(var c = 0; c < currentDeck.length; c++){
            if(currentDeck[c].suit === trumpSuit){
                currentDeck[c].trump = true;
            }
        }
    }

    function CPUSelectTrump(){
        switch(Math.floor(Math.random() * 4)){
            case 0:
                staticCompMsg.innerHTML = "Hearts is trump suit.";
                trumpSuit = "hearts";
                document.getElementById("trumpSuit").innerHTML = "Hearts";
                break;
            case 1:
                staticCompMsg.innerHTML = "Clubs is trump suit.";
                trumpSuit = "clubs";
                document.getElementById("trumpSuit").innerHTML = "Clubs";
                break; 
            case 2:
                staticCompMsg.innerHTML = "Diamonds is trump suit.";
                trumpSuit = "diamonds";
                document.getElementById("trumpSuit").innerHTML = "Diamonds";
                break; 
            case 3:
                staticCompMsg.innerHTML = "Spades is trump suit.";
                trumpSuit = "spades";
                document.getElementById("trumpSuit").innerHTML = "Spades";  
        }

        assignTrumpValue();
    }
}

var passedCards = document.getElementById("passCards");
function passCards(){
    switch(turn){
        case 0://user
            userMessage.style.display = "none";
        
            var tempHand = partnerHand;
            var passHand = [];
            var randIndex;

            //Selects 4 cards from the user's partner's hand to pass to the user
            for(var i = 0; i < 4; i++){
                randIndex = Math.floor(Math.random() * tempHand.length);
                passHand[i] = tempHand[randIndex];
                tempHand.splice(randIndex, 1);
                userHand.push(passHand[i]);

                document.getElementById("pass-" + (i+1).toString()).src = "images/" + passHand[i].value + "_" + passHand[i].suit + ".jpeg";
            }
            sortUserHand();

            passedCards.style.display = "block";

            staticCompMsg.innerHTML = "Your partner passed you these cards.";
            staticCompMsg.style.left = "35.5%";

            activeCompMsg.style.display = "block";
            activeCompMsg.style.left = "44%";
            activeCompMsg.innerHTML = "Click to accept.";
            activeCompMsg.addEventListener("click", clickToAccept);
            
            function clickToAccept(){
                activeCompMsg.style.display = "none";
                activeCompMsg.removeEventListener("click", clickToAccept);
                
                selectPassBack();
            
                function selectPassBack(){
                    //Adds eventListener to each of the cards in user's hand
                    var userCardsHTML = document.getElementById("userHand").children;
                    for(var i = 0; i < userCardsHTML.length; i++){
                        userCardsHTML[i].style.marginLeft = "-1.8%";
                        userCardsHTML[i].style.cursor = "pointer";
                        userCardsHTML[i].addEventListener("mouseover", function(){
                            this.style.width = ""
                        });
                        userCardsHTML[i].addEventListener("click", clickCardToPassBack);
                    }

                    displayuserHand();

                    document.getElementById("pass-1").src = "";
                    document.getElementById("pass-2").src = "";
                    document.getElementById("pass-3").src = "";
                    document.getElementById("pass-4").src = "";

                    staticCompMsg.innerHTML = "Select four cards to pass back to your partner.";
                    staticCompMsg.style.left = "31%";
                
                    var passedCardsArr = [],
                        passedCardCounter = 0;
                    function clickCardToPassBack(){
                        passedCardCounter++;
                        document.getElementById("pass-" + passedCardCounter.toString()).src = this.src;

                        var cardIndex = this.id.slice(this.id.indexOf("-") + 1, this.id.length) - 1;
                        var card = userHand[cardIndex];
                        userHand.splice(cardIndex, 1);
                        passedCardsArr.push(card);

                        for(var z = 0; z < userCardsHTML.length; z++){
                            var currentMarginLeft = userCardsHTML[z].style.marginLeft;
                            currentMarginLeft = currentMarginLeft.slice(0, currentMarginLeft.length - 1);
                            var newMarginLeft = (parseFloat(currentMarginLeft) + .45).toString() + "%";
                            userCardsHTML[z].style.marginLeft = newMarginLeft;
                        }

                        displayuserHand();
                        document.getElementById("card-" + (17-passedCardCounter).toString()).style.display = "none";

                        if(passedCardCounter > 3){
                            for(var j = 0; j < document.getElementById("userHand").children.length; j++){
                                document.getElementById("userHand").children[j].removeEventListener("click", clickCardToPassBack);
                                document.getElementById("userHand").children[j].style.marginLeft = "0%";
                            }

                            staticCompMsg.style.display = "none";

                            activeCompMsg.style.display = "block";
                            activeCompMsg.style.left = "42.5%";
                            activeCompMsg.innerHTML = "Click to pass cards."
                            activeCompMsg.addEventListener("click", passCardsBack);

                            function passCardsBack(){
                                activeCompMsg.removeEventListener("click", passCardsBack);
                                activeCompMsg.style.display = "none";
                                
                                passedCards.style.display = "none";

                                staticCompMsg.style.display = "block";
                                staticCompMsg.style.left = "41.5%";
                                staticCompMsg.innerHTML = "Now it's time to meld.";
                                
                                for(var q = 0; q < 4; q++){
                                    partnerHand.push(passedCardsArr[q]);
                                }

                                for(var l = 0; l < userCardsHTML.length; l++){
                                    userCardsHTML[l].style.cursor = "default";
                                }

                                setTimeout(meld, 1000);
                            }
                        }
                    }
                }
            }
            break;
        case 1:
            break;
        case 2:
            break;
        case 3:
    }
}

var meldCounter = 0,
    userMeldAmount = 0,
    CPUMeldAmount = 0;
var userTeamMeld = document.getElementById("userTeamMeld");
userTeamMeld.innerHTML = "0";
var CPUTeamMeld = document.getElementById("CPUTeamMeld");
CPUTeamMeld.innerHTML = "0";
function meld(){
    staticCompMsg.style.display = "none";

    if(meldCounter < 4){
        var hand = [];
        switch(turn){
            case 0:
                hand = userHand;
                turn = 1;
                document.getElementById("playerMelding").innerHTML = "Your meld:";
                break;
            case 1:
                hand = oneCPUHand;
                turn = 2;
                document.getElementById("playerMelding").innerHTML = "CPU #1's meld:";
                break;
            case 2:
                hand = partnerHand;
                turn = 3;
                document.getElementById("playerMelding").innerHTML = "Your partner's meld:";
                break;
            case 3:
                hand = twoCPUHand;
                turn = 0;
                document.getElementById("playerMelding").innerHTML = "CPU #2's meld:";
        }
        meldCounter++;
        
        var meldInfo = "",
            meldAmount = 0,
            marriageCount = 0,
            currentMeldCardNumber = 1,
            suitArray = ["hearts", "clubs", "diamonds", "spades"];

        var meldCards = document.getElementById("meldCards").children;
        for(var u = 0; u < meldCards.length; u++){
            meldCards[u].src = "";
        }

        //aces
        if(hand.some(card => card.value === "ace" && card.suit === "clubs") && hand.some(card => card.value === "ace" && card.suit === "diamonds") && hand.some(card => card.value === "ace" && card.suit === "hearts") && hand.some(card => card.value === "ace" && card.suit === "spades")){
            if(hand.filter(card => card.value === "ace" && card.suit === "clubs").length === 2 && hand.filter(card => card.value === "ace" && card.suit === "diamonds").length === 2 && hand.filter(card => card.value === "ace" && card.suit === "hearts").length === 2 && hand.filter(card => card.value === "ace" && card.suit === "spades").length === 2){
                meldAmount += 1000;
                meldInfo += "aces (1000), ";

                suitArray.splice(suitArray.indexOf(trumpSuit), 1);
                document.getElementById("meld-1").src = "images/ace_" + suitArray[0] + ".jpeg";
                document.getElementById("meld-2").src = "images/ace_" + suitArray[0] + ".jpeg";
                document.getElementById("meld-3").src = "images/ace_" + suitArray[1] + ".jpeg";
                document.getElementById("meld-4").src = "images/ace_" + suitArray[1] + ".jpeg";
                document.getElementById("meld-5").src = "images/ace_" + suitArray[2] + ".jpeg";
                document.getElementById("meld-6").src = "images/ace_" + suitArray[2] + ".jpeg";
                document.getElementById("meld-7").src = "images/ace_" + trumpSuit + ".jpeg";
                document.getElementById("meld-8").src = "images/ace_" + trumpSuit + ".jpeg";
                
                currentMeldCardNumber += 8;
            }else{
                meldAmount += 100;
                meldInfo += "aces (100), "

                suitArray.splice(suitArray.indexOf(trumpSuit), 1);
                document.getElementById("meld-1").src = "images/ace_" + suitArray[0] + ".jpeg";
                document.getElementById("meld-2").src = "images/ace_" + suitArray[1] + ".jpeg";
                document.getElementById("meld-3").src = "images/ace_" + suitArray[2] + ".jpeg";
                document.getElementById("meld-4").src = "images/ace_" + trumpSuit + ".jpeg";
                
                currentMeldCardNumber += 4;
            }

            var aces = hand.filter(card => card.value === "ace");
            for(var i = 0; i < aces.length; i++){
                aces[i].displayed = true;
            }
        }

        //family and marriage of trump
        if(hand.some(card => card.value === "king" && card.trump === true) && hand.some(card => card.value === "queen" && card.trump === true)){
            if(hand.some(card => card.value === "ace" && card.trump === true) && hand.some(card => card.value === "ten" && card.trump === true) && hand.some(card => card.value === "jack" && card.trump === true)){
                if(hand.filter(card => card.value === "ace" && card.trump === true).length === 2 && hand.filter(card => card.value === "ten" && card.trump === true).length === 2 && hand.filter(card => card.value === "king" && card.trump === true).length === 2 && hand.filter(card => card.value === "queen" && card.trump === true).length === 2 && hand.filter(card => card.value === "jack" && card.trump === true).length === 2){
                    meldAmount += 1500;
                    meldInfo += "2x family (1500), "

                    document.getElementById("meld-1").src = "images/ace_" + trumpSuit + ".jpeg";
                    document.getElementById("meld-2").src = "images/ace_" + trumpSuit + ".jpeg";
                    document.getElementById("meld-3").src = "images/ten_" + trumpSuit + ".jpeg";
                    document.getElementById("meld-4").src = "images/ten_" + trumpSuit + ".jpeg";
                    document.getElementById("meld-5").src = "images/king_" + trumpSuit + ".jpeg";
                    document.getElementById("meld-6").src = "images/king_" + trumpSuit + ".jpeg";
                    document.getElementById("meld-7").src = "images/queen_" + trumpSuit + ".jpeg";
                    document.getElementById("meld-8").src = "images/queen_" + trumpSuit + ".jpeg";
                    document.getElementById("meld-9").src = "images/jack_" + trumpSuit + ".jpeg";
                    document.getElementById("meld-10").src = "images/jack_" + trumpSuit + ".jpeg";

                    var jacks = hand.filter(card => card.value === "jack" && card.trump === true);
                    for(var i = 0; i < jacks.length; i++){
                        jacks[i].displayed = true;
                    }

                    currentMeldCardNumber += 10;
                }else{
                    meldAmount += 150;
                    meldInfo += "family (150), ";

                    if(hand.some(card => card.value === "ace" && card.trump === true && card.displayed === false)){
                        document.getElementById("meld-" + (currentMeldCardNumber).toString()).src = "images/ace_" + trumpSuit + ".jpeg";
                    }
                    
                    document.getElementById("meld-" + (currentMeldCardNumber+1).toString()).src = "images/ten_" + trumpSuit + ".jpeg";
            
                    document.getElementById("meld-" + (currentMeldCardNumber+2).toString()).src = "images/king_" + trumpSuit + ".jpeg";
                    if(hand.filter(card => card.value === "king" && card.trump === true).length === 2){
                        meldAmount += 20;
                        meldInfo += "extra king of trump (20), ";
                        document.getElementById("meld-" + (currentMeldCardNumber+3).toString()).src = "images/king_" + trumpSuit + ".jpeg";
                        currentMeldCardNumber++;
                    }

                    document.getElementById("meld-" + (currentMeldCardNumber+3).toString()).src = "images/queen_" + trumpSuit + ".jpeg";
                    if(hand.filter(card => card.value === "queen" && card.trump === true).length === 2){
                        meldAmount += 20;
                        meldInfo += "extra queen of trump (20), ";
                        document.getElementById("meld-" + (currentMeldCardNumber+4).toString()).src = "images/queen_" + trumpSuit + ".jpeg";
                        currentMeldCardNumber++;
                    }

                    document.getElementById("meld-" + (currentMeldCardNumber+4).toString()).src = "images/jack_" + trumpSuit + ".jpeg";
                    
                    hand.find(card => card.value === "jack" && card.trump === true).displayed = true;

                    currentMeldCardNumber += 5;
                }

                var family = hand.filter(card => card.trump === true && card.value !== "nine" && card.value !== "jack");
                for(var i = 0; i < family.length; i++){
                    family[i].displayed = true;
                }
            }else{
                if(hand.filter(card => card.value === "king" && card.trump === true).length === 2 && hand.filter(card => card.value === "queen" && card.trump === true).length === 2){
                    meldAmount += 80;
                    meldInfo += "2x marriage of trump (80), ";

                    document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/king_" + trumpSuit + ".jpeg";
                    document.getElementById("meld-" + (currentMeldCardNumber+1).toString()).src = "images/king_" + trumpSuit + ".jpeg";
                    document.getElementById("meld-" + (currentMeldCardNumber+2).toString()).src = "images/queen_" + trumpSuit + ".jpeg";
                    document.getElementById("meld-" + (currentMeldCardNumber+3).toString()).src = "images/queen_" + trumpSuit + ".jpeg";

                    currentMeldCardNumber += 4;
                }else{
                    meldAmount += 40;
                    meldInfo += "marriage of trump (40), ";

                    document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/king_" + trumpSuit + ".jpeg";
                    document.getElementById("meld-" + (currentMeldCardNumber+1).toString()).src = "images/queen_" + trumpSuit + ".jpeg";
                
                    currentMeldCardNumber += 2;
                }

                var trumpMarriage = hand.filter(card => (card.value === "king" || card.value === "queen") && card.trump === true);
                for(var i = 0; i < trumpMarriage.length; i++){
                    trumpMarriage[i].displayed = true;
                }
            }
        }

        //nine of trump
        if(hand.some(card => card.value === "nine" && card.trump === true)){
            if(hand.filter(card => card.value === "nine" && card.trump === true).length === 2){
                meldAmount += 20;
                meldInfo += "2x 9 of trump (20), ";

                document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/nine_" + trumpSuit + ".jpeg";
                document.getElementById("meld-" + (currentMeldCardNumber+1).toString()).src = "images/nine_" + trumpSuit + ".jpeg";

                currentMeldCardNumber += 2;
            }else{
                meldInfo += "9 of trump (10), ";
                meldAmount += 10;

                document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/nine_" + trumpSuit + ".jpeg";

                currentMeldCardNumber++;
            }
        }

        //marriage of hearts (not trump)
        if(hand.some(card => card.value === "king" && card.suit === "hearts" && card.trump === false) && hand.some(card => card.value === "queen" && card.suit === "hearts" && card.trump === false)){
            if(hand.filter(card => card.value === "king" && card.suit === "hearts" && card.trump === false).length === 2 && hand.filter(card => card.value === "queen" && card.suit === "hearts" && card.trump === false).length === 2){
                document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/king_hearts.jpeg";
                document.getElementById("meld-" + (currentMeldCardNumber+1).toString()).src = "images/king_hearts.jpeg";
                document.getElementById("meld-" + (currentMeldCardNumber+2).toString()).src = "images/queen_hearts.jpeg";
                document.getElementById("meld-" + (currentMeldCardNumber+3).toString()).src = "images/queen_hearts.jpeg";

                var heartMarriage = hand.filter(card => (card.value === "king" || card.value === "queen") && card.suit === "hearts");
                for(var i = 0; i < heartMarriage.length; i++){
                    heartMarriage[i].displayed = true;
                }
                marriageCount += 2;
                currentMeldCardNumber += 4;
            }else{
                document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/king_hearts.jpeg";
                document.getElementById("meld-" + (currentMeldCardNumber+1).toString()).src = "images/queen_hearts.jpeg";

                hand.find(card => card.value === "queen" && card.suit === "hearts").displayed = true;
                hand.find(card => card.value === "king" && card.suit === "hearts").displayed = true;

                marriageCount += 1;
                currentMeldCardNumber += 2;
            }
        }

        //marriage of clubs (not trump)
        if(hand.some(card => card.value === "king" && card.suit === "clubs" && card.trump === false) && hand.some(card => card.value === "queen" && card.suit === "clubs" && card.trump === false)){
            if(hand.filter(card => card.value === "king" && card.suit === "clubs" && card.trump === false).length === 2 && hand.filter(card => card.value === "queen" && card.suit === "clubs" && card.trump === false).length === 2){
                document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/king_clubs.jpeg";
                document.getElementById("meld-" + (currentMeldCardNumber+1).toString()).src = "images/king_clubs.jpeg";
                document.getElementById("meld-" + (currentMeldCardNumber+2).toString()).src = "images/queen_clubs.jpeg";
                document.getElementById("meld-" + (currentMeldCardNumber+3).toString()).src = "images/queen_clubs.jpeg";

                var clubMarriage = hand.filter(card => (card.value === "king" || card.value === "queen") && card.suit === "clubs");
                for(var i = 0; i < clubMarriage.length; i++){
                    clubMarriage[i].displayed = true;
                }
                marriageCount += 2;
                currentMeldCardNumber += 4;
            }else{
                document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/king_clubs.jpeg";
                document.getElementById("meld-" + (currentMeldCardNumber+1).toString()).src = "images/queen_clubs.jpeg";

                hand.find(card => card.value === "queen" && card.suit === "clubs").displayed = true;
                hand.find(card => card.value === "king" && card.suit === "clubs").displayed = true;

                marriageCount += 1;
                currentMeldCardNumber += 2;
            }
        }

        //marriage of diamonds (not trump)
        if(hand.some(card => card.value === "king" && card.suit === "diamonds" && card.trump === false) && hand.some(card => card.value === "queen" && card.suit === "diamonds" && card.trump === false)){
            if(hand.filter(card => card.value === "king" && card.suit === "diamonds" && card.trump === false).length === 2 && hand.filter(card => card.value === "queen" && card.suit === "diamonds" && card.trump === false).length === 2){
                document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/king_diamonds.jpeg";
                document.getElementById("meld-" + (currentMeldCardNumber+1).toString()).src = "images/king_diamonds.jpeg";
                document.getElementById("meld-" + (currentMeldCardNumber+2).toString()).src = "images/queen_diamonds.jpeg";
                document.getElementById("meld-" + (currentMeldCardNumber+3).toString()).src = "images/queen_diamonds.jpeg";
                
                var diamondMarriage = hand.filter(card => card.suit === "diamonds" && (card.value === "queen" || card.value === "king"));
                for(var i = 0; i < diamondMarriage.length; i++){
                    diamondMarriage[i].displayed = true;
                }

                marriageCount += 2;
                currentMeldCardNumber += 4;
            }else{
                document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/king_diamonds.jpeg";
                document.getElementById("meld-" + (currentMeldCardNumber+1).toString()).src = "images/queen_diamonds.jpeg";
                
                hand.find(card => card.value === "queen" && card.suit === "diamonds").displayed = true;
                hand.find(card => card.value === "king" && card.suit === "diamonds").displayed = true;

                marriageCount += 1;
                currentMeldCardNumber += 2;
            }
        }

        //marriage of spades (not trump)
        if(hand.some(card => card.value === "king" && card.suit === "spades" && card.trump === false) && hand.some(card => card.value === "queen" && card.suit === "spades" && card.trump === false)){
            if(hand.filter(card => card.value === "king" && card.suit === "spades" && card.trump === false).length === 2 && hand.filter(card => card.value === "queen" && card.suit === "spades" && card.trump === false).length === 2){
                document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/king_spades.jpeg";
                document.getElementById("meld-" + (currentMeldCardNumber+1).toString()).src = "images/king_spades.jpeg";
                document.getElementById("meld-" + (currentMeldCardNumber+2).toString()).src = "images/queen_spades.jpeg";
                document.getElementById("meld-" + (currentMeldCardNumber+3).toString()).src = "images/queen_spades.jpeg";

                var spadeMarriage = hand.filter(card => card.suit === "spades" && (card.value === "queen" || card.value === "king"));
                for(var i = 0; i < spadeMarriage.length; i++){
                    spadeMarriage[i].displayed = true;
                }

                marriageCount += 2;
                currentMeldCardNumber += 4;
            }else{
                document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/king_spades.jpeg";
                document.getElementById("meld-" + (currentMeldCardNumber+1).toString()).src = "images/queen_spades.jpeg";

                hand.find(card => card.value === "queen" && card.suit === "spades").displayed = true;
                hand.find(card => card.value === "king" && card.suit === "spades").displayed = true;

                marriageCount += 1;
                currentMeldCardNumber += 2;
            }
        }

        //counting regular marriages
        if(marriageCount > 1){
            meldAmount +=  (marriageCount * 20);
            meldInfo += marriageCount + "x marriage (" + (marriageCount * 20) + "), ";
        }else if(marriageCount === 1){
            meldAmount += 20;
            meldInfo += "marriage (20), ";
        }

        //pinochle
        if(hand.some(card => card.value === "queen" && card.suit === "spades") && hand.some(card => card.value === "jack" && card.suit === "diamonds")){
            if(hand.filter(card => card.value === "queen" && card.suit === "spades").length === 2 && hand.filter(card => card.value === "jack" && card.suit === "diamonds").length === 2){
                meldAmount += 300;
                meldInfo += "2x pinochle (300), ";

                var queensToBeDisplayed = hand.filter(card => card.value === "queen" && card.suit === "spades" && card.displayed === false).length;
                for(var i = 0; i < queensToBeDisplayed; i++){
                    document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/queen_spades.jpeg";
                    currentMeldCardNumber++;
                }
                var queenSpades = hand.filter(card => card.value === "queen" && card.suit === "spades");
                for(var i = 0; i < queenSpades.length; i++){
                    queenSpades[i].displayed = true;
                }

                var jacksToBeDisplayed = hand.filter(card => card.value === "jack" && card.suit === "diamonds" && card.displayed === false).length;
                for(var i = 0; i < jacksToBeDisplayed; i++){
                    document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/jack_diamonds.jpeg";
                    currentMeldCardNumber++;
                }
                var jackDiamonds = hand.filter(card => card.value === "jack" && card.suit === "diamonds");
                for(var i = 0; i < jackDiamonds.length; i++){
                    jackDiamonds[i].displayed = true;
                }
            }else{
                meldAmount += 40;
                meldInfo += "pinochle (40), ";

                if(!hand.some(card => card.value === "queen" && card.suit === "spades" && card.displayed === true)){
                    document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/queen_spades.jpeg";
                    currentMeldCardNumber++;
                    hand.find(card => card.value === "queen" && card.suit === "spades").displayed = true;
                }

                if(!hand.some(card => card.value === "jack" && card.suit === "diamonds" && card.displayed === true)){
                    document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/jack_diamonds.jpeg";
                    currentMeldCardNumber++;
                    hand.find(card => card.value === "jack" && card.suit === "diamonds").displayed = true;
                }
            }   
        }

        //kings
        if(hand.some(card => card.value === "king" && card.suit === "clubs") && hand.some(card => card.value === "king" && card.suit === "diamonds") && hand.some(card => card.value === "king" && card.suit === "hearts") && hand.some(card => card.value === "king" && card.suit === "spades")){
            if(hand.filter(card => card.value === "king" && card.suit === "clubs").length === 2 && hand.filter(card => card.value === "king" && card.suit === "diamonds").length === 2 && hand.filter(card => card.value === "king" && card.suit === "hearts").length === 2 && hand.filter(card => card.value === "king" && card.suit === "spades").length === 2){
                meldAmount += 800;
                meldInfo += "kings (800), ";

                var kingHeartsToBeDisplayed = hand.filter(card => card.value === "king" && card.suit === "hearts" && card.displayed === false).length;
                for(var i = 0; i < kingHeartsToBeDisplayed; i++){
                    document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/king_hearts.jpeg";
                    currentMeldCardNumber++;
                }
                
                var kingClubsToBeDisplayed = hand.filter(card => card.value === "king" && card.suit === "clubs" && card.displayed === false).length;
                for(var i = 0; i < kingClubsToBeDisplayed; i++){
                    document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/king_clubs.jpeg";
                    currentMeldCardNumber++;
                }

                var kingDiamondsToBeDisplayed = hand.filter(card => card.value === "king" && card.suit === "diamonds" && card.displayed === false).length;
                for(var i = 0; i < kingDiamondsToBeDisplayed; i++){
                    document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/king_diamonds.jpeg";
                    currentMeldCardNumber++;
                }

                var kingSpadesToBeDisplayed = hand.filter(card => card.value === "king" && card.suit === "spades" && card.displayed === false).length;
                for(var i = 0; i < kingSpadesToBeDisplayed; i++){
                    document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/king_sapde.jpeg";
                    currentMeldCardNumber++;
                }
            }else{
                meldAmount += 80;
                meldInfo += "kings (80), ";

                if(!hand.some(card => card.suit === "hearts" && card.value === "king" && card.displayed === true)){
                    document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/king_hearts.jpeg";
                    currentMeldCardNumber++;
                }
                
                if(!hand.some(card => card.suit === "clubs" && card.value === "king" && card.displayed === true)){
                    document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/king_clubs.jpeg";
                    currentMeldCardNumber++;
                }

                if(!hand.some(card => card.suit === "diamonds" && card.value === "king" && card.displayed === true)){
                    document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/king_diamonds.jpeg";
                    currentMeldCardNumber++;
                }

                if(!hand.some(card => card.suit === "spades" && card.value === "king" && card.displayed === true)){
                    document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/king_spades.jpeg";
                    currentMeldCardNumber++;
                }
            }
        }

        //queens
        if(hand.some(card => card.value === "queen" && card.suit === "clubs") && hand.some(card => card.value === "queen" && card.suit === "diamonds") && hand.some(card => card.value === "queen" && card.suit === "hearts") && hand.some(card => card.value === "queen" && card.suit === "spades")){
            if(hand.filter(card => card.value === "queen" && card.suit === "clubs").length === 2 && hand.filter(card => card.value === "queen" && card.suit === "diamonds").length === 2 && hand.filter(card => card.value === "queen" && card.suit === "hearts").length === 2 && hand.filter(card => card.value === "queen" && card.suit === "spades").length === 2){
                meldAmount += 600;
                meldInfo += "queens (600), ";

                var queenHeartsToBeDisplayed = hand.filter(card => card.value === "queen" && card.suit === "hearts" && card.displayed === false).length;
                for(var i = 0; i < queenHeartsToBeDisplayed; i++){
                    document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/queen_hearts.jpeg";
                    currentMeldCardNumber++;
                }

                var queenClubsToBeDisplayed = hand.filter(card => card.value === "queen" && card.suit === "clubs" && card.displayed === false).length;
                for(var i = 0; i < queenClubsToBeDisplayed; i++){
                    document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/queen_clubs.jpeg";
                    currentMeldCardNumber++;
                }

                var queenDiamondsToBeDisplayed = hand.filter(card => card.value === "queen" && card.suit === "diamonds" && card.displayed === false).length;
                for(var i = 0; i < queenDiamondsToBeDisplayed; i++){
                    document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/queen_diamonds.jpeg";
                    currentMeldCardNumber++;
                }

                var queenSpadesToBeDisplayed = hand.filter(card => card.value === "queen" && card.suit === "spades" && card.displayed === false).length;
                for(var i = 0; i < queenSpadesToBeDisplayed; i++){
                    document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/queen_spades.jpeg";
                    currentMeldCardNumber++;
                }
            }else{
                meldAmount += 60;
                meldInfo += "queens (60), ";

                if(!hand.some(card => card.suit === "hearts" && card.value === "queen" && card.displayed === true)){
                    document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/queen_hearts.jpeg";
                    currentMeldCardNumber++;
                }

                if(!hand.some(card => card.suit === "clubs" && card.value === "queen" && card.displayed === true)){
                    document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/queen_clubs.jpeg";
                    currentMeldCardNumber++;
                }

                if(!hand.some(card => card.suit === "diamonds" && card.value === "queen" && card.displayed === true)){
                    document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/queen_diamonds.jpeg";
                    currentMeldCardNumber++;
                }

                if(!hand.some(card => card.suit === "spades" && card.value === "queen" && card.displayed === true)){
                    document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/queen_spades.jpeg";
                    currentMeldCardNumber++;
                }
            }
        }

        //jacks
        if(hand.some(card => card.value === "jack" && card.suit === "clubs") && hand.some(card => card.value === "jack" && card.suit === "diamonds") && hand.some(card => card.value === "jack" && card.suit === "hearts") && hand.some(card => card.value === "jack" && card.suit === "spades")){
            if(hand.filter(card => card.value === "jack" && card.suit === "clubs").length === 2 && hand.filter(card => card.value === "jack" && card.suit === "diamonds").length === 2 && hand.filter(card => card.value === "jack" && card.suit === "hearts").length === 2 && hand.filter(card => card.value === "jack" && card.suit === "spades").length === 2){
                meldAmount += 400;
                meldInfo += "jacks (400), ";

                var jackHeartsToBeDisplayed = hand.filter(card => card.value === "jack" && card.suit === "hearts" && card.displayed === false).length;
                for(var i = 0; i < jackHeartsToBeDisplayed; i++){
                    document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/jack_hearts.jpeg";
                    currentMeldCardNumber++;
                }

                var jackClubsToBeDisplayed = hand.filter(card => card.value === "jack" && card.suit === "clubs" && card.displayed === false).length;
                for(var i = 0; i < jackClubsToBeDisplayed; i++){
                    document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/jack_clubs.jpeg";
                    currentMeldCardNumber++;
                }

                var jackDiamondsToBeDisplayed = hand.filter(card => card.value === "jack" && card.suit === "diamonds" && card.displayed === false).length;
                for(var i = 0; i < jackDiamondsToBeDisplayed; i++){
                    document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/jack_diamonds.jpeg";
                    currentMeldCardNumber++;
                }

                var jackSpadesToBeDisplayed = hand.filter(card => card.value === "jack" && card.suit === "spades" && card.displayed === false).length;
                for(var i = 0; i < jackSpadesToBeDisplayed; i++){
                    document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/jack_spades.jpeg";
                    currentMeldCardNumber++;
                }
            }else{
                meldAmount += 40;
                meldInfo += "jacks (40), ";

                if(!hand.some(card => card.suit === "hearts" && card.value === "jack" && card.displayed === true)){
                    document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/jack_hearts.jpeg";
                    currentMeldCardNumber++;
                }

                if(!hand.some(card => card.suit === "clubs" && card.value === "jack" && card.displayed === true)){
                    document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/jack_clubs.jpeg";
                    currentMeldCardNumber++;
                }

                if(!hand.some(card => card.suit === "diamonds" && card.value === "jack" && card.displayed === true)){
                    document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/jack_diamonds.jpeg";
                    currentMeldCardNumber++;
                }

                if(!hand.some(card => card.suit === "spades" && card.value === "jack" && card.displayed === true)){
                    document.getElementById("meld-" + currentMeldCardNumber.toString()).src = "images/jack_spades.jpeg";
                    currentMeldCardNumber++;
                }
            }
        }

        //displays meld info in meld box
        if(meldInfo === ""){
            meldInfo = "I don't have any meld."
        }
        document.getElementById("meldInfo").innerHTML = meldInfo;

        document.getElementById("meld-stuff").style.display = "block";
        
        var meldDisplayed = 0;
        for(var i = 0; i < meldCards.length; i++){
            if(meldCards[i].src.length > 75){
                meldDisplayed++;
                console.log(meldCards[i].src)
            }
        }

        for(var i = 0; i < meldDisplayed; i++){
            meldCards[i].style.width = (3 * (12-meldDisplayed)).toString() + "%";
        }

        activeCompMsg.innerHTML = "OK";
        activeCompMsg.style.display = "block";
        activeCompMsg.style.left = "48.75%";
        activeCompMsg.style.top = "35%";
        activeCompMsg.addEventListener("click", nextMeld);

        //displays proper meld amount in score table
        switch(turn){
            case 0:
            case 2:
                meldAmount += parseInt(CPUTeamMeld.innerHTML);
                CPUTeamMeld.innerHTML = meldAmount.toString();
                break;
            case 1:
            case 3:
                meldAmount += parseInt(userTeamMeld.innerHTML);
                userTeamMeld.innerHTML = meldAmount.toString();
        }

        function nextMeld(){
            activeCompMsg.removeEventListener("click", nextMeld);
            activeCompMsg.style.display = "none";
            meld();
        }
    }else{
        //start play
        document.getElementById("meld-stuff").style.display = "none";
    }
    
}

// function cardClick(){
//     var cardIndex = this.id.slice(this.id.indexOf("-") + 1, this.id.length) - 1;
//     var card = userHand[cardIndex];
//     userCard.src = "images/" + card.value + "_" + card.suit + ".jpeg";

//     var cHTML = document.getElementById("card-" + (cardIndex+1));
//     cHTML.src = "images/card_back.png";
//     cHTML.style.width = "7%";
//     cHTML.removeEventListener("click", cardClick);
// }

shuffleDeck();
dealDeck();
sortUserHand();