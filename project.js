    let test = document.querySelector('#test')
    event.preventDefault();
    test.addEventListener('click', async function(){
        let cards = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        console.log(cards);
    });