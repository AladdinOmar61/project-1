playButton = document.querySelector('button');
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
    // let cardsRemaining = card.data.remaining;
    let cardVal = card.data.cards
    console.log(cardVal[0].value)
    let deckVal = [];
    // let suit = card.data.cards
    // console.log(cardsRemaining)

    //this loop checks if the value of the card is either KING QUEEN JACK OR ACE and changes them to a number value, otherwise, everything else is pushed into a new array because the current one its in is immutable.
    for (let i = 0; i < cardVal.length; i++) {
        // let newCardValue;
        if (cardVal[i].value === "KING") {
            const mutatedKing = {...cardVal[i].value, value: "13"}
            deckVal.push(mutatedKing)
        } else if (cardVal[i].value === "QUEEN") {
            const mutatedQueen = {...cardVal[i].value, value: "12"}
            deckVal.push(mutatedQueen)

        } else if (cardVal[i].value === "JACK") {
            const mutatedJack = {...cardVal[i].value, value: "11"}
            deckVal.push(mutatedJack)

        } else if (cardVal[i].value === "ACE") {
            const mutatedAce = {...cardVal[i].value, value: "1"}
            deckVal.push(mutatedAce)

        } else {
            deckVal.push(cardVal[i].value)
        }

        // switch (cardVal[i].value) {
        //     case 'KING':
        //     cardVal[i].value = '13';
        //     case 'QUEEN':
        //     cardVal[i].value = '12';
        //     case 'JACK':
        //     cardVal[i].value = '11';
        //     case 'ACE':
        //     cardVal[i].value = '1';
        // }
        console.log(deckVal);
        let card1 = deckVal[i];
        let card2 = deckVal[i + 1];
        console.log(card1);
        console.log(card2);
        checkBet(card1.value, card1.suit, card2.value);
    }

}



function compare(card1, card2) {
    return card1.value - card2.value;
}

function makeGuess(card1, suit, card2) {
    let bet = window.prompt(`Current card is ${card1} of ${suit} selected. Next card is ${card2}. Will the next card be higher(h), lower(l), or the same(s)?`);
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

function checkBet(card1, suit, card2) {
    let guess = makeGuess(card1, suit, card2)
    if (guess === true) {
        score++;
        alert('Nice! You now have ' + score + ' points')
    } else if (guess === false) {
        score--;
        alert('Nope! Score is now ' + score)
    }
}
// // roundStart();

// function gameEnd() {
//     if (score >= 13) {
//         alert('Congrats, you won! Thanks for playing')
//     } else {
//         alert('You lose! Try again?')
//     }
// }
//     // roundEnd();
