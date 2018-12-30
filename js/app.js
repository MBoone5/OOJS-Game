// Custom JavaScript for OOJS Game Project
// adding the phrases
let phraseArray = ['A Dime A Dozen', 'Call It A Day', 'Easy Does It', 'Go For Broke', 'In A Pickle'];
let phraseObjects = phraseArray.map(phrase => new Phrase(phrase));

// instantiating the Game class
const game = new Game(phraseObjects);

// handling the on-screen keyboard
document.getElementById('qwerty').addEventListener('click', (event) => {
    game.activePhrase.checkLetter(`${event.target.innerHTML}`);
    game.handleInteraction('dom', event.target);
});

// handling the physical keyboard
document.addEventListener('keypress', (event) => {
    // only fire on alphabetical characters && overlay is hidden
    if (/[a-z]/i.test(event.key) && document.getElementById('overlay').style.display === 'none') {
        game.activePhrase.checkLetter(event.key);
        game.handleInteraction('keyboard', event.key);
    }
});