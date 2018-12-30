// Custom JavaScript for OOJS Game Project
// dom refrences
const overlay = document.getElementById('overlay');

// adding the phrases
let phraseArray = ['A Dime A Dozen', 'Call It A Day', 'Easy Does It', 'Go For Broke', 'In A Pickle'];
let phraseObjects = phraseArray.map(phrase => new Phrase(phrase));

// instantiating the Game class
const game = new Game(phraseObjects);


function resetDisplay(state = 'hide') {
    if (state === 'hide') {
        overlay.style.display = 'none';
    } else {
        overlay.style.display = 'flex';
    }
}

function markButton(method, input){
    // refrence for the mathcing element and string of the guess
    let element;
    let guess;
    
    if (method === 'dom') {
        // element of guessed letter
        element = input;
        
        // string of guess
        guess = element.innerHTML;
    } else { // if the input comes from the physical keyboard
        // element of guessed letter
        element = keyboard.filter(element => element.textContent === input)[0];
        
        // string of guess
        guess = input;
    }
    // stopping the event occuring on the spaces around the letters
    if (/^[a-z]$/i.test(guess)) {
        if (element.disabled !== true) {
            // disabling the chosen letter
            element.setAttribute('disabled', true);

            //  .indexOf is used rather than .includes for browser compatability
            if (game.activePhrase.phrase.indexOf(guess, 0) !== -1) {
                element.classList.add('chosen');
            } else {
                element.classList.add('wrong');
                game.removeLife();
            }
        } else;
    } else;
    
    // handling the rest of the interactions
    game.handleInteraction(guess);
}
// handling the on-screen keyboard
document.getElementById('qwerty').addEventListener('click', (event) => {
    markButton('dom', event.target);
});

// handling the physical keyboard
document.addEventListener('keypress', (event) => {
    // only fire on alphabetical characters && overlay is hidden
    if (/[a-z]/i.test(event.key) && overlay.style.display === 'none') {
        markButton('keyboard', event.key);
    }
});
