// Custom Phrase class for OOJS Game

class Phrase {
    constructor(phrase) {
        // initializing the phrase propety and setting it to lowercase
        this.phrase = phrase.toLowerCase();

        // breaking the phrase down into letters
        this.letters = this.phrase.split('');
    }
    addPhraseToDisplay() {
        // method to add the phrase to the game display
        // string containing the elements for the phrase
        let phraseElements = '';

        /* for each letter in the phrase, create an li with specefic classes depending on if 
        it's a letter or a space, and addit to the str variable which will later be added to the DOM */
        this.letters.forEach(letter => {
            if (letter !== ' ') {
                phraseElements += `<li class="hide letter ${letter}">${letter}</li>`;
            } else {
                phraseElements += '<li class="hide space"> </li>';
            }
        });

        // adding the elements to the innerHTML of the ul
        document.querySelector('div#phrase>ul').innerHTML = phraseElements;
    }
    // reveals the letter(s) on the board that matches player's selection
    showMatchedLetter(letterToShow) {
        // Node object list of the matching lis with the class that matches the letter
        let matchingLetterElements = [...document.getElementsByClassName(`${letterToShow}`)];
        
        /* even though getElementsByClassName returns a node object list, 
        .forEach functions the same as it does on arrays 
        iterating through each element and removing the hide class
        .replace is used instead of .remove for cross-browser use */
        matchingLetterElements.forEach(element => element.className = element.className.replace(/\bhide\b/g, 'show'));
        

    }
    // method to see if letter selected by player matches a letter in the phrase.
    checkLetter(input) {
        // if there is at least one mathching letter, show the matching letter
        // indexOf used for cross-browser use
        if (this.letters.indexOf(input) !== -1) {
            this.showMatchedLetter(input);
        }else; 
    }  
}
