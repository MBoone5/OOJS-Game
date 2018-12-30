// Custom Game class for OOJS Game Project\
// global variables for access by multiple methods
const overlay = document.getElementById('overlay');
let lifeElements = [...document.querySelectorAll('.tries>img')];
let keyboard = [...document.querySelectorAll('.key')];

class Game {
    constructor(phrases) {
        /* used to track the number of missed guesses by the player.
        The initial value is 0, since no guesses have been made at the start of the game. */
        this.missed = 0;

        /* an array of five Phrase objects to use with the game.
        A phrase should only include letters and spaces— no numbers,
        punctuation or other special characters. */
        this.phrases = phrases;

        /* This is the Phrase object that’s currently in play.The initial value is null.
        Within the startGame() method, this property will be set to the Phrase object 
        returned from a call to the getRandomPhrase() method. */
        this.activePhrase = null;
    }
    // method to randomly choose one of the phrases for the game
    getRandomPhrase() {
        // generates a random number 0-4 to be used as the index for accessing one of the phrases
        return this.phrases[Math.floor(Math.random() * 5)];
    }
    // method for changing overlay visibilty
    overlayVisibilty(state = 'show') {
        if (state === 'hide') {
            overlay.style.display = 'none';
        } else {
            overlay.style.display = 'flex';
        }
    }
    // method to reset the game functionality
    resetGame(){
        // resetting the keyboard
        keyboard.forEach(key => {
            key.className = 'key';
            key.removeAttribute('disabled');
        });

        // resetting the life
        lifeElements.forEach(life => life.src = 'images/liveHeart.png');

        this.missed = 0;

    }
    // method to start the game
    startGame() {
        // hiding the initial overlay
        this.overlayVisibilty('hide');

        // setting the active phrase to a randomly chosen phrase
        this.activePhrase = this.getRandomPhrase();

        // adding the phrase to the display
        this.activePhrase.addPhraseToDisplay();

        if (document.getElementById('overlay').className !== 'start'){
            this.resetGame();  
        }
    }
    // method to check if the game has been won
    checkForWin() {
        // regexp to test if hide is in the class list of the letter element
        const hideRegExp = /hide/;

        // creating an array of the hidden letter elements
        const hiddenLetters = [...document.querySelectorAll('.letter')]
            .filter((letter) => hideRegExp.test(letter.className));

        // checking if there are any more hidden letters
        if (hiddenLetters.length > 0) {
            // returns false if there are still some letters hidden
            return false;
        }else{
            return true;
        }
    }
    // method to end the game, and make changes accordingly based on the reason
    gameOver(reason = 'lost') {
        // TODO: Reset game by removing the phrase, setting missed to 0 etc.
        
        // declaring the overlay message element
        const overlayMessage = document.getElementById('game-over-message');
        // showing the overlay
        this.overlayVisibilty();

        // conditional for changes based on if the games was lost or won
        if (reason === 'won') {
            overlayMessage.innerHTML = 'Nice Work! Keep It Up!';
            overlay.className = 'win';
        } else {
            overlayMessage.innerHTML = 'You got this! Give It Another Try!';
            overlay.className = 'lose';
        }
        
        // changing 'start game' to 'reset game'
        document.getElementById('btn__reset').innerHTML = 'Reset Game';
    }
    // method for removing a life if a miss occurs, and ending the game if no lives are left
    removeLife() {
        /* selects the an element with the liveHeart.png, selects it using the index of the misses, and replaces it with the
        lostHeart.png */
        lifeElements[this.missed].src = 'images/lostHeart.png';
        
        // incrementing the missed lives 
        this.missed += 1;

        // ending the game if 5 misses have occures
        if (this.missed === 5) {
            this.gameOver();
        }
    }
    keyboardInteraction(element, guess){
        // stopping the event occuring on the spaces around the letters
        if (/^[a-z]$/i.test(guess)) {
            // disabling the chosen letter
            element.setAttribute('disabled', true);

            //  .indexOf is used rather than .includes for browser compatability
            if (this.activePhrase.phrase.indexOf(guess, 0) !== -1) {
                element.classList.add('chosen');
            } else {
                element.classList.add('wrong');
                this.removeLife();
            }
        } else;
    }
    // method for managing user interaction/input
    // TODO: Build functionality for keyboard input
    handleInteraction(method, input) {
        // if the input comes from the key elements
        if (method === 'dom') {
            // element(s) representing the guessed letter
            let inputLetter = input;
           
            // string value of the guessed letter
            let letterGuess = input.innerHTML;
            
            // qwerty functionality + life counter
            this.keyboardInteraction(inputLetter, letterGuess);

        } else { // if the input comes from the physical keyboard
            // finding the matching input letter element through traversal
            let inputLetter = keyboard.filter(element => element.textContent === input)[0];
            // string value of the guessed letter
            let letterGuess = input;


            // qwerty functionality + life counter
            this.keyboardInteraction(inputLetter, letterGuess);
        }



        // checking for a win
        if (this.checkForWin()) {
            this.gameOver('won');
        } else;

    }
}