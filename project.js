//button I am accessing from HTML
playButton = document.querySelector('button');
//total score
let score = 0;

// when you press this button, the playRound function starts
playButton.addEventListener('click', async function () {
    playRound();
});

//pulls up a card from an array of cards, makes a loop through all the cards, 
async function playRound() {
    let deck = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
    deckID = deck.data.deck_id
    let card = await axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=52`)
    let cardVal = card.data.cards
    let deckVal = [];


    //this loop checks if the value of the card is either KING QUEEN JACK OR ACE and changes them to a number value, otherwise, everything else is pushed into a new array because the current one its in is immutable.
    for (let i = 0; i < cardVal.length; i++) {
        // let newCardValue;
        if (cardVal[i].value === "KING") {
            // const mutatedKing = { ...cardVal[i], ...{ value: "13" } }
            deckVal.push(13);
            // deckVal.push(mutatedKing)
        } else if (cardVal[i].value === "QUEEN") {
            // const mutatedQueen = { ...cardVal[i], ...{ value: "12" } }
            // deckVal.push(mutatedQueen)
            deckVal.push(12);


        } else if (cardVal[i].value === "JACK") {
            // const mutatedJack = { ...cardVal[i], ...{ value: "11" } }
            // deckVal.push(mutatedJack)
            deckVal.push(11);


        } else if (cardVal[i].value === "ACE") {
            // const mutatedAce = { ...cardVal[i], ...{ value: "1" } }
            // deckVal.push(mutatedAce)
            deckVal.push(1);


        } else {
            deckVal.push(Number(cardVal[i].value));
        }
        // console.log(cardVal)

        // console.log(card1.suit);



    }
    let card1 = deckVal[0];
    let card2 = deckVal[1];
    // console.log(deckVal)
    console.log(card1);
    console.log(cardVal[0].suit)
    checkBet(card1, card2);
    
    console.log(card2);
    console.log(cardVal[1].suit);

}

function compare(card1, card2) {
    return card1 - card2;

}

function makeGuess(card1, card2) {
    let bet = (window.prompt(`Will the next card be higher(h), lower(l), or the same(s)`));
    switch (bet) {
        case 'h':
            return compare(card1, card2) < 0;
        case 'l':
            return compare(card1, card2) > 0;
        case 's':
            return compare(card1, card2) === 0;
        default:
            alert('Pick from the choices I gave you!');
    }
}

function checkBet(card1, card2) {
    let guess = makeGuess(card1, card2);
    if (guess === true) {
        score++;
        alert('Nice! You now have ' + score + ' points')
    } else if (guess === false) {
        score--;
        alert('Nope! Score is now ' + score)
    }
}


function gameEnd() {
    if (score >= 13) {
        alert('Congrats, you won! Thanks for playing')
    } else {
        alert('You lose! Try again?')
    }
}
