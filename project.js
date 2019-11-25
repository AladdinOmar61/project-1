playButton = document.querySelector('button');

async function buildDeck() {
    let deck = await axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
    deckID = deck.data.deck_id
}
buildDeck();


    playButton.addEventListener('click', async function () {

        let card = await axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`)
    });

    let cardsRemaining = card.data.remaining;
    let cardVal = card.data.cards[0].value;
    let suit = card.data.cards[0].suit;
    console.log(cardVal);
    console.log(suit);
    console.log(cardsRemaining)
    makeGuess();
    let cardVal2 = card.data.cards[1].value;
    let suit2 = card.data.cards[1].suit;
    console.log(cardVal2);
    console.log(suit2);
    console.log(cardsRemaining - 1)

  

function compare() {
    cardVal - cardVal2;
}

function makeGuess() {
    let bet = window.prompt(`${cardVal} of ${suit} selected. Will the next card be higher(h), lower(l), or the same(s)?`);
    switch (bet) {
        case 'h':
            return compare() > 0;
        case 'l':
            return compare() < 0;
        case 's':
            return compare() === 0;
        default:
            alert('Pick from the choices I gave you!');
    }

    function roundStart() {
        let score = 0;
        if (makeGuess() === true) {
            score++;
            alert('Nice! Score is now ' + score);
        } else if (makeGuess() === false) {
            score--;
            alert("Nope! Score is now " + score);
        }
    }
    roundStart();

    function roundEnd() {
        if (score >= 13) {
            alert('Congrats, you won! Thanks for playing')
        } else {
            alert('You lose! Try again?')
        }
    }
    roundEnd();
}
