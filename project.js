
let playButton = document.querySelector('button');
let cardImg = document.createElement('img');
document.body.appendChild(cardImg);

let choice1 = document.querySelector('#high');
let choice2 = document.querySelector('#low');
let choice3 = document.querySelector('#same');

let userChoice = null;

let deck = null;
let scoreBoard = document.querySelector('.score-count');
let score = scoreBoard.innerHTML;

let currCard = null;
let nextCard = null;

choice1.addEventListener('click', function () {
    makeChoice(-1);
});
choice2.addEventListener('click', function () {
    makeChoice(1);
});
choice3.addEventListener('click', function () {
    makeChoice(0);
});

playButton.addEventListener('click', async function () {
    // TODO: Disable play after first click
    deck = await createDeck();
    currCard = deck.pop();
    startRound();
});

async function createDeck() {
    // let deck = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=0');
    // deckID = deck.data.deck_id
    let cards = await axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`);
    cardObj = cards.data.cards;
    // console.log(cards.data.cards[0].images.svg);
    // console.log(cardObj.length);
    // console.log(cardObj)
    for (let i = 0; i < cardObj.length; i++) {
        if (cardObj[i].value === 'KING') {
            cardObj[i].value = 13;
        } else if (cardObj[i].value === 'QUEEN') {
            cardObj[i].value = 12;
        } else if (cardObj[i].value === 'JACK') {
            cardObj[i].value = 11;
        } else if (cardObj[i].value === 'ACE') {
            cardObj[i].value = 1;
        } else {
            cardObj[i].value = Number(cardObj[i].value)
        }
    }
    return cardObj;
}

async function renderCards(card) {
    // for (i = 0; i < deck.length; i++) {
    let pic = card.images.svg;
    // console.log("image");
    cardImg.setAttribute("src", pic);
    cardImg.setAttribute("width", "200");
    cardImg.setAttribute("height", "300");
    // console.log("end");
    // }
}
// let card1 = deckVal[i];
// let card2 = deckVal[i + 1];
// console.log(card1);
// console.log(cardVal[0].suit);
// // makeGuess(card1, card2)
// makeChoice(card1, card2)

// renderCards();

function compare(card1, card2) {
    return card1.value - card2.value;
}

function makeChoice(option) {
    // will the next card be higher or lower than current card?
    userChoice = option;
    // let currScore = 0;
    if (option === correctChoice(currCard, nextCard)) {
        score++;
        console.log(score);
        scoreBoard.innerHTML = score;
        console.log("Right!");
    } else if (score === 0) {
        score -= 0;
        scoreBoard.innerHTML = score;
        console.log('zero points, no subtraction')
    } else {
        score--;
        scoreBoard.innerHTML = score;
        console.log("Wrong!");
    }
    currCard = nextCard;
    userChoice = null;
    startRound();
}

function correctChoice(card1, card2) {
    let val = compare(card1, card2);
    if (val > 0) {
        return 1;
    } else if (val === 0) {
        return 0;
    } else if (val < 0) {
        return -1;
    }
}


function startRound() {
    if (deck.length === 0) {
        endGame();
    }
    else {
        renderCards(currCard);
        nextCard = deck.pop();
    }

    function endGame() {
        if (score >= 23) {
            alert('You son of a BET-CH, you won! Thanks for playing')
        } else {
            alert('You lost! Better luck next time!')
        }
    }
}

