const root = $('#root');
const clickMe = $('#add-card');

let deckRef;
let cardArr = [];
let angle = 0;

async function getDeck() {
    const response = await axios.get('http://deckofcardsapi.com/api/deck/new/');
    const { deck_id } = response.data;
    
    deckRef = deck_id;
    await drawCard();
}

async function drawCard () {
    await axios.get(`http://deckofcardsapi.com/api/deck/${deckRef}/shuffle/`);  
    
    const response = await axios.get(`http://deckofcardsapi.com/api/deck/${deckRef}/draw/?count=1`);
    
    const { cards, remaining } = response.data;
    
    const { image } = cards[0];

    addCard({ image, remaining });
}

clickMe.on('click', getDeck);

function addCard ({image, remaining}) {
    if(remaining > 0) {
        const cardBody = `<div class="card" style="transform: rotate(${angle}deg);"><img alt="card-img" src="${image}"</div>`;
        let newCard = $(cardBody);
        root.append(newCard);
        angle += 10;
    }
}

