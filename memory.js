//var snd = new Audio("alarm1.wav"); 
var myAlarm = "1";
var allCards = ["card1b","card2b","card3b","card4b","card5b","card6b","card7b","card8b","card9b","card10b","card11b","card12b","card13b","card14b","card15b","card16b","card17b","card18b","card19b","card20b"];
var allImages = ["images/pattern0.jpg", "images/pattern2.jpg", "images/pattern3.jpg", "images/pattern4.jpg", "images/pattern5.jpg", "images/pattern6.jpg", "images/pattern7.jpg", "images/pattern8.jpg", "images/pattern9.jpg", "images/pattern10.jpg"];
var openCards = [];
var openCardCounter = 0;
var hasGameStarted = false;
var cardPairs = 10;

function pickCard(chosenCard){
	//gameWon();
	//console.log(document.getElementById(allCards[0]));			
	//console.log(allCards[0]);
	//document.querySelector("#card1").classList.toggle("endanimation");
	// das b am ende abschneiden...ugh ^^
	var cardFinder = allCards[0].slice(0,allCards[0].length-1);
	//console.log(cardFinder);
	
	//document.getElementById(cardFinder).style.visibility = "hidden";
	//document.getElementById(openCards[0]).style.visibility = "hidden";
	//console.log(cardFinder);
	if(chosenCard == openCards[0] || chosenCard == openCards[1] || !hasGameStarted){
		return;
		}
	document.querySelector("#"+chosenCard).classList.toggle("flip");
	console.log(openCards); 
	console.log(openCardCounter);

	// add Card to openCards
	if(chosenCard != openCards[0] && chosenCard != openCards[1]){
		openCardCounter++;
		} 
		// if third card is flipped, flip back first and second cards
		if(openCardCounter % 3 == 0){
		 openCardCounter = 1;
		 document.querySelector("#"+openCards[0]).classList.toggle("flip");
		 document.querySelector("#"+openCards[1]).classList.toggle("flip");
		 openCards = [];
		}
		// add new card to the end of openCards
		openCards.push(chosenCard);
		console.log(openCards); 
		
		if(openCards.length > 2){
		// remove third card from openCards (might be unnecessary now)
		openCards.shift();		
		}
	 
	
	if(openCards.length == 2){
	// check if the openCards are identical
	var correspondingImage1 = openCards[0] + "b";
	var correspondingImage2 = openCards[1] + "b";
	correspondingImage1 = document.getElementById(correspondingImage1).src;
	correspondingImage2 = document.getElementById(correspondingImage2).src;
	
	// if identical: remove those cards
	if(correspondingImage1 == correspondingImage2){
		document.querySelector("#"+openCards[0]).classList.toggle("shake");
		//document.querySelector("#"+openCards[1]).classList.toggle("flip");
		document.querySelector("#"+openCards[1]).classList.toggle("shakeandflip");
		
		//var toSend = "#"+openCards[1];
		var toSendAndRemove = openCards[0];
		var toSend = openCards[1];
		setTimeout(function() {
		secondCardShake(toSend, toSendAndRemove);
		}, 5000);
		document.getElementById(openCards[0]).style.visibility = "hidden";
		//document.getElementById(openCards[1]).style.visibility = "hidden";		
		
		// empty openCards
		openCards = [];
		openCardCounter = 0;
		cardPairs--;
		
		if(cardPairs == 0){
		setTimeout(gameWon, 6800);
		}
	} 		
	}	
}

// Random number between 1 and 10
var someRando = Math.floor((Math.random() * 10) + 1);

function secondCardShake(whatCard, whatCardToRemove){
//alert(whatCard);
//document.querySelector(whatCard).style.visibility = "hidden";	
document.getElementById(whatCard).style.visibility = "hidden";
//document.querySelector("#"+whatCardToRemove).classList.toggle("shake");
}


// according to w3schools
function arrayShuffle(anyGivenArray){
	anyGivenArray.sort(function(a, b){return 0.5 - Math.random()});
	return anyGivenArray;
}

function assignImagesToCards(){
	hasGameStarted = true;
	// Make Button invisible or disable...
	//document.getElementById("startButton").style.visibility = "hidden";
	document.getElementById("startButton").disabled = true; 
	document.getElementById("startButton").innerText = "Game has started!"; 
	document.getElementById("startButton").classList.toggle("disabled-btn");

	// assign all cards, kyaa!

	allCardsPairNo = allCards.length / 2;
	// randomize images
	allImagesCopy = arrayShuffle(allImages);
	allCardsCopy = arrayShuffle(allCards);
	
	for(i=0; i < allCardsPairNo; i++){	
	// assign first image
	document.getElementById(allCardsCopy[i]).src = allImagesCopy[allImagesCopy.length-1];
	//	karte entfernen | shift() entfernt das erste Element und shiftet den rest nach vorn
	allCardsCopy.shift();
	
	// assign second image (this card in allCards will be skipped in the next iteration)
	document.getElementById(allCardsCopy[i]).src = allImagesCopy[allImagesCopy.length-1];
	
	// remove image from array, so that it won't get assigned again
	allImagesCopy.pop();
	}
}

function chooseAlarmSound(myAlarm){
	snd = new Audio("alarm" + myAlarm.toString() + ".wav"); 
	snd.play();
}

function gameWon(){
	document.getElementById("startButton").innerText = "Congratulations!";
	
	var x = document.getElementsByClassName("card");
	var i;
	for (i = 0; i < x.length; i++) {
    
	x[i].classList.toggle("endanimation");
	x[i].style.visibility = "visible";
	} 	

	/*
	for(i=0; i < allCards.length; i++){
	// remove "b" at the end of the card name to get the correct id
	var cardFinder = allCards[i].slice(0,allCards[i].length-1);
	document.getElementById(cardFinder).style.visibility = "visible";
	document.querySelector("#"+cardFinder).classList.toggle("endanimation");
	}
	*/
}

