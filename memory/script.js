const cardColors = ["red", "red", "green", "green", "blue", "blue", "brown", "brown", "yellow", "yellow", "violet", "violet", "pink", "pink", "lightBlue", "lightBlue", "orange", "orange"];

let cards = document.querySelectorAll("div");

cards = [...cards];

let activeCard = "";
const activeCards = [];

const startTime = new Date().getTime();

const gamePairs = cards.length / 2;
let gameResult = 0;

const clickCard = function() {
    activeCard = this;
    
    if(activeCard == activeCards[0]) return;
    
    activeCard.classList.remove("hidden");
    
    if(activeCards.length == 0) {
        activeCards[0] = activeCard;
        return;
    } else {
        activeCards[1] = activeCard;
        cards.forEach(card => card.removeEventListener("click", clickCard));
        setTimeout(function() {
            if(activeCards[0].className === activeCards[1].className) {
                activeCards.forEach(card => card.classList.add("off"));
                cards = cards.filter(card => !card.classList.contains("off"));
                gameResult++;
                if(gameResult == gamePairs) {
                    const endTime = new Date().getTime();
                    const gameTime = (endTime - startTime) / 1000;
                    alert(`Wygrałeś! Twój wynik to: ${gameTime}.`);
                    location.reload();
                }
            } else {
                activeCards.forEach(card => card.classList.add("hidden"))
            }
            activeCard = "";
            activeCards.length = 0;
            cards.forEach(card => card.addEventListener("click", clickCard))
        }, 500)
        
    }
}

const init = function() {
    cards.forEach(card => {
        const position = Math.floor(Math.random() * cardColors.length);
        card.classList.add(cardColors[position]);
        cardColors.splice(position, 1);
    });
    setTimeout(function() {
        cards.forEach(card => {
            card.classList.add("hidden");
            card.addEventListener("click", clickCard)
        });
    }, 2000);
}

init();