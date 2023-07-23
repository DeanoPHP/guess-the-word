const global = {
    wordsArr: ['position', 'possess', 'possession', 'possible', 'potatoes', 'pressure', 'probably', 'promise', 'purpose', 'quarter', 'question', 'recent', 'regular', 'reign', 'remember', 'sentence', 'separet', 'special', 'straight', 'strange', 'strength', 'suppose', 'surprise', 'therefor', 'though', 'thought', 'varius', 'weight', 'women', 'accident', 'actual', 'address', 'answer', 'appear', 'arrive', 'believe', 'bicyle', 'breath', 'build', 'busy', 'business', 'calendar', 'caught', 'centre', 'century', 'certain', 'circle', 'complete', 'consider', 'continue', 'decide', 'describe', 'different', 'difficult', 'disappear', 'early', 'earth', 'eight', 'eighth', 'enough', 'exercise', 'experiment', 'experience', 'extreme', 'famous', 'favourite', 'february', 'forward', 'fruit', 'grammar', 'group', 'guard', 'guide', 'heard', 'heart', 'height', 'history', 'imagine', 'increase', 'important', 'interest', 'island', 'knowledge', 'learn', 'length', 'library', 'marerial', 'medicine', 'mention', 'minute', 'natural', 'naughty', 'notice', 'occation', 'often', 'opposite','ordinary', 'particular', 'peculiar', 'perhaps', 'popular'],
    correctWord: [], 
    guessedLetters: [], 
    gameWord: '', 
    showWord: document.querySelector('.display-word'),
    message: document.querySelector('.message'),
    lettersContainer: document.querySelector('.letters-container'),
    counter: 3,
}

startGame = (e) => {
    e.preventDefault();

    if (global.gameWord === '') {
        global.gameWord = randomWord();
    }

    displayWord();
    outputTheBoxesForWord();
    global.message.innerHTML = '';
}

function randomWord() {
    let words = global.wordsArr;

    const selectWord = words[Math.floor(Math.random() * words.length)];

    return selectWord;
}

function checkLetterInWord(e) {
    e.preventDefault()

    const guessletter = document.getElementById('get-letter').value.toLowerCase();
    const gameWord = global.gameWord.split('');

    if (!gameWord.includes(guessletter)) {
        global.counter--;
        global.message.innerHTML = `Try again you only have ${global.counter} lives left`;
        setTimeout(() => global.message.innerHTML = '', 4000);
        if (global.counter === 0) {
            endOfLives();
        }    
    } else if (global.guessedLetters.includes(guessletter)) {
        alert('You have already tried that letter');
        return;
    } else {
        global.guessedLetters.push(guessletter.toLowerCase());
    }

    outputTheBoxesForWord();

    const splitSelectedWord = global.gameWord.split('')

    document.querySelector('.getWord').reset();

    return splitSelectedWord.includes(guessletter)
        ? correctOutput(guessletter) 
        : incorrectOutput();
}

displayWord = () => {
    global.showWord.innerHTML = global.gameWord;

    setTimeout(() => global.showWord.innerHTML = '', 5000);
}

outputTheBoxesForWord = () => {
    global.lettersContainer.innerHTML = '';
    const globalGameWord = global.gameWord.split('');

    globalGameWord.forEach((letter) => {
        const lettersContainer = document.querySelector('.letters-container');

        const div = document.createElement('div');
        div.classList.add('box');
 
        if (global.guessedLetters.includes(letter)) {    
           div.innerHTML = letter;
        }

        lettersContainer.appendChild(div);
    });
}

correctOutput = (guessletter) => {
    global.correctWord.push(guessletter.toLowerCase());

    const sortCorrectWord = global.correctWord.sort();
    const sortGameWord = global.gameWord.split('').sort();
    
    // this code removes duplicate letters
    const result = sortGameWord.filter((item, index) => {
        return sortGameWord.indexOf(item) === index;
    });

    return sortCorrectWord.join(',') === result.join(',')
        ? winner()
        : alert('Correct letter');
}

incorrectOutput = () => {
    console.log('Incoreect from function');
}

winner = () => {
    alert('You are a Winner');
    global.message.innerHTML = `congratulations you spelt <b style="color: rgb(247, 152, 10)">${global.gameWord}</b> correctly.`;

    global.correctWord = [];
    global.guessedLetters = [];
    global.gameWord = '';

    setTimeout(() => location.reload(), 4000);
}

endOfLives = () => {
    global.message.innerHTML = `You are out of lives. You did not get the word <b style="color: rgb(247, 152, 10)">${global.gameWord}</b>`;

    global.correctWord = [];
    global.guessedLetters = [];
    global.gameWord = '';

    setTimeout(() => location.reload(), 3000);
}

function init() {
    document.getElementById('start-game').addEventListener('click', startGame);
    document.getElementById('submit-letter').addEventListener('click', checkLetterInWord);
}

init();

