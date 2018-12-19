// Custom Game class for OOJS Game Project\
// globally declard variable for access by multiple methods
const overlay = document.getElementById('#overlay');

class Game {
    constructor(phrases, missed = 0, activePhrase = null) {
        /* used to track the number of missed guesses by the player.
        The initial value is 0, since no guesses have been made at the start of the game. */
        this.missed = missed;

        /* an array of five Phrase objects to use with the game.
        A phrase should only include letters and spaces— no numbers,
        punctuation or other special characters. */
        this.phrases = phrases;

        /* This is the Phrase object that’s currently in play.The initial value is null.
        Within the startGame() method, this property will be set to the Phrase object 
        returned from a call to the getRandomPhrase() method. */
        this.activePhrase = activePhrase;
    }
    
    // method to randomly choose one of the phrases for the game
    getRandomPhrase() {
        // generates a random number 0-4 to be used as the index for accessing one of the phrases 
        return this.phrases[Math.floor(Math.random() * 4)];
    }

    overlayVisibilty(state = 'show') {
        if (state === 'hide') {
            overlay.style.display = 'none';
        } else {
            overlay.style.display = 'block';
        }
    }
    // method to start the game
    startGame() {
        // hiding the initial overlay
        this.overlayVisibilty('hide');

        // setting the active phrase to a randomly chosen phrase
        this.activePhrase = this.getRandomPhrase();

        /* TODO: Build Phrase class, then call addPhraseToDisplay on the active phrase; Might have to refactor so that
        the phrases are Phrase class objects */
    }
    checkForWin() {
        // method to check if the game has been won
        const hideRegExp = /hide/;
        const phraseLetters = document.querySelectorAll('.letter');
        
        phraseLetters.filter((letter) => hideRegExp.test(letter.className));
        if (phraseLetters.length > 0) {
            return false;
        }else{
            return true;
        }
    }
    gameOver(reason = 'lost') {
        // method to end the game, and make changes accordingly based on the reason
        // declaring the overlay message element
        const overlayMessage = document.getElementById('#game-over-message');
        // showing the overlay
        this.overlayVisibilty();

        // conditional for changes based on if the games was lost or won
        if (reason === 'won') {
            overlayMessage.innerHTML('Nice Work! Keep It Up!');
            overlay.className = 'win';
        } else {
            overlayMessage.innerHTML('You got this! Give It Another Try!');
            overlay.className = 'lose';
        }

        
    }
    removeLife() {
        // method for removing a life if a miss occurs, and ending the game if no lives are left
        /* selects the first element with the liveHeart.png, and replaces it with the
        lostHeart.png */
        document.querySelector('.tries[src=images/liveHeart.png]')
            .setAttribute('src', 'images/lostHeart.png');
        
        // incrementing the missed lives 
        this.missed += 1;

        // ending the game if 5 misses have occures
        if (this.missed === 5) {
            this.gameOver();
        }
    }
    // method for managing user interaction/input
    handleInteraction(inputLetter) {
        let letterGuess = inputLetter.innerHTML;

        // disabling the chosen letter TODO: Build disabled class for letters
        inputLetter.classList.add('disabled');

        //  .indexOf is used rather than .includes for browser compatability
        if (this.activePhrase.indexOf(letterGuess, 0) !== -1) {
            inputLetter.classList.add('chosen');
            if (this.checkForWin()) {
                this.gameOver('won');
            }else;
        }else{
            inputLetter.classList.add('wrong');
            this.removeLife();
        }
    }
}