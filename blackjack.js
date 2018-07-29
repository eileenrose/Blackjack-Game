
////////////////////
function deckBuild(){
  
  const card = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
  const suit = ["Diamonds", "Spades", "Clubs", "Hearts"]
  
  function makeDeck(){
  const finalDeck = []
  suit.forEach(function(suits){
    card.forEach(function(cards){
      if (typeof cards === 'number') {
        let temp = {}
        temp[cards + " " + suits] = cards
        finalDeck.push(temp)
      }
			else if(cards === "A"){
       let temp = {}
        temp[cards + " " + suits] = 11
        finalDeck.push(temp)
        
      }
        else{
        let temp = {}
        temp[cards + " " + suits] = 10
        finalDeck.push(temp)
        }
      
    })  
  })
 	return finalDeck
 }
  return makeDeck()
}
/////////////////////////////////////////



// function that creates an array of Player objects
function createPlayers(num){
  const players = [];
  for (let i = 0; i < num; i++){
    let temp = {hand:[], total:0, money:1000}
    players.push(temp)
  }
  return players;
}



// function that randomizes deck
function randomizeDeck(finalDeck){
for (let i = 0; i < finalDeck.length; i++){
  let rando = Math.floor((Math.random() * 52))
  let temp = finalDeck[i]
  finalDeck[i] = finalDeck[rando]
  finalDeck[rando] = temp
}
}



// function that deals out two cards in the beginning
function deal(playas, finalDeck){
  for (let i = 0; i < 2 * (playas.length); i++){
      let temp = finalDeck.pop()
      if (i % 2 === 0){
        playas[1].hand.push(temp)
        playas[1].total += temp[Object.keys(temp)]
      }
      else {
        playas[0].hand.push(temp)
        playas[0].total+= temp[Object.keys(temp)]
      }
  }
}



// function that gets user name
function getUser(players){
  console.clear()
  let name = prompt("What is your name?")
  players[1].name = name
  players[0].name = "Dealer"
  
  console.log("Hello " + name + "!")
  
}



// function that simulates most of the game
// includes calculating bets and win/losses

function hit(players, finalDeck){
  let bet = parseInt(prompt("You have " + players[1].money + " chips! How much would you like to bet?"))
  if (bet > players[1].money || isNaN(bet)){
    bet = players[1].money
  }
  console.log(players[1].name + " has " + JSON.stringify(Object.keys((players[1].hand[0]))) + JSON.stringify(Object.keys((players[1].hand[1]))) + ' Total: ' + players[1].total)
  console.log("The dealer has " + JSON.stringify(Object.keys((players[0].hand[0]))))
  
  let winner = checkDeals(players).toUpperCase()
  if (winner !== "NOTHING"){
    if (winner === "PLAYER WINS"){
      dealResults(winner, players, bet*1.5)
    }
    else { 
      dealResults(winner, players, bet)
    }
    return
  }
  let playerHitting = true;
  let count = 0;
  let input = prompt("hit or stand or double")
  while ((input === "hit" || input === "h") || (input == "double" || input === "d")){
    if (input == "double" || input === "d"){
    bet *= 2
    count++
  }
    playerHitting = playerHit(players, finalDeck)
    if (players[1].total === 21){
      dealResults("PLAYER WINS", players, bet)
      return
    }
    if (!playerHitting){
      dealResults("DEALER WINS", players, bet)
      return
    }
    if (count === 1){
      dealResults(compareHands(players).toUpperCase(), players, bet)
      return
    }
    input = prompt("hit or stand")
  }
  winner = dealerHit(players, finalDeck)
   if (winner !== "NOTHING"){
    dealResults(winner, players, bet)
    return
  }
  winner = compareHands(players).toUpperCase()
  dealResults(winner, players, bet)
}



// function that mimics the dealer hitting
function dealerHit(players, finalDeck){
    while (players[0].total <= 17){
    let temp = finalDeck.pop()
    playas[0].hand.push(temp)
    players[0].total += temp[Object.keys(temp)]
  }
  if (players[0].total > 21){
    return "PLAYER WINS"
  }
  return "NOTHING"
}



// function that mimics the player hitting
function playerHit(players, finalDeck){
  let temp = finalDeck.pop()
    players[1].hand.push(temp)
    players[1].total += temp[Object.keys(temp)]
    console.log("Player's Total: " + players[1].total)
    if (players[1].total > 21) {
      console.log('You Bust AHAHA')
      return false;
    } 
    return true;
}



// function that checks the state of cards before player can hit
function checkDeals(players){
  if (players[0].total === 21 && players[1].total === 21) {
    console.log("Double BlackJack, draw")
    return "it's a draw";
  }
  if (players[0].total === 21) {
    console.log("Dealer BlackJack, YOU LOSE!!")
    return "dealer wins";
  }
    if (players[1].total === 21) {
    return "player wins";
  }
  if (JSON.stringify(Object.keys((players[1].hand[0]))).charAt(2) === 'A' && players[1].hand[1][Object.keys(players[1].hand[1])] === 10) {
    console.log('BlackJack!!!! You Win 1.5 times your bet!!!!')
    return "player wins";
  }
    if (JSON.stringify(Object.keys((players[1].hand[1]))).charAt(2) === 'A' && players[1].hand[0][Object.keys(players[1].hand[0])] === 10) {
    console.log('BlackJack!!!! You Win 1.5 times your bet!!!!')
    return "player wins";
  }
  if (Object.keys(players[0].hand[0]).toString().charAt(0) === 'A' && players[0].hand[1][Object.keys(players[0].hand[1])] === 10) {
    console.log('Dealer BlackJack, YOU LOSE!!')
    return "dealer wins";
  }
    if (Object.keys(players[0].hand[1]).toString().charAt(0) === 'A' && players[0].hand[0][Object.keys(players[0].hand[0])] === 10) {
    console.log('Dealer BlackJack, YOU LOSE!!')
    return "dealer wins";
  }
  return "nothing"
}



// function that calculates the bets 
function dealResults(str, players, bet){
  console.log(str)
  if (str === "DEALER WINS"){
    console.log(bet + " chips were lost")
    players[1].money -= bet;
  }
  else if (str === "IT'S A DRAW"){
}
else {
  console.log(bet + " chips were won")
  players[1].money += bet
}
}



// function that compares each player's hand
function compareHands(players){
  if (players[1].total > players[0].total && players[1].total <= 21){
    return "Player wins"
  }
  else if (players[0].total > players[1].total && players[0].total <= 21){
    return "Dealer wins"
  }
  else if (players[0].total === players[1].total){
    return "It's a draw"
  }
  else if (players[1].total> 21){
    return "Dealer wins"
  }
  else if (players[0].total > 21){
    return "Player wins"
  }
}



// function that resets the totals and hands, as well as deal
function reset(players, finalDeck){
   players[0].total = 0;
  players[1].total = 0;
  players[0].hand = []
  players[1].hand = []
   deal(players, finalDeck)
}



// function that repeats each method to simulate a full round
function repeater(players, finalDeck){
  let quit = ''
  do {
    if (finalDeck.length <= 6){
      console.log("Deck has no more cards")
      return true
    }
 reset(players, finalDeck)
    hit(players, finalDeck)
    if (players[1].money <= 0){
      console.log("You're broke lol")
      return false;
    }
    quit = prompt("Quit?")
  } while (!(quit.toLowerCase() === "y" || quit.toLowerCase() === 'yes'));
  return false;
}



// function that allows multiple decks to be played
function mainGame(play, deck){
  let repeat = true;
  while (deck.length > 6){
    repeat = repeater(play, deck)
    if (!repeat){
      return
    }
  }
  let newRound = prompt("New deck?")
  if (newRound.toLowerCase() === "y" || newRound.toLowerCase() === "yes"){
    let d = deckBuild()
    randomizeDeck(d)
    return mainGame(play, d)
  }
  else {
    return
  }
}



const playas = createPlayers(2)
let finalDeck = deckBuild()
randomizeDeck(finalDeck)
getUser(playas)
mainGame(playas, finalDeck)