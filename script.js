const currentWord = document.querySelector('.current-word')
const startBtn = document.querySelector('.start-btn')
const guessBtns = document.querySelectorAll('.letter')
const letters = document.querySelector('.letters')
const hangmanImg = document.querySelector('.hangman-img')
const main = document.querySelector('.main')
const results = document.querySelector('.results')
const resultsMessage = document.querySelector('.results-message')
const playAgain = document.querySelector('.play-again')
/* console.log(letters) */

const wordList = ['apple', 'orange', 'banana', 'pear', 'grape']

let randomWord = ''
let displayedWord = []

let incorrectGuesses = 0

let result = ''

function generateWord() {
    return wordList[Math.floor(Math.random() * wordList.length)];
}

function startGame() {
    randomWord = generateWord()
    console.log(randomWord)
    for (let i = 0; i < randomWord.length; i++) {
        displayedWord.push('-')
    }
    currentWord.innerHTML = displayedWord.join(' ')
    startBtn.classList.add('hide')
    currentWord.classList.remove('hide')
    letters.classList.remove('disabled')
}

startBtn.addEventListener('click', startGame)

function addEventListener(nodeList) {
    nodeList.forEach(node => {
        node.addEventListener('click', event => {
            const eventBtn = event.target
            const btnLetter = event.target.innerText.toLowerCase()
            letterGuess(btnLetter, eventBtn)
        })
    });
}
addEventListener(guessBtns)

function letterGuess(btnLetter, eventBtn) {
    let index = randomWord.indexOf(btnLetter)
    if (index == -1) {
        console.log('No!!')
        eventBtn.classList.add('incorrect')
        incorrectGuesses++
        hangmanImg.setAttribute('src', `IMG/hangman${incorrectGuesses}.png`)
        if (incorrectGuesses == 11) {
            result = 'YOU LOSE!'
            endGame()
        }
    } else {
        console.log('Yes!')
        eventBtn.classList.add('correct')
        while (index != -1) {
            displayedWord[index] = btnLetter.toUpperCase()
            currentWord.innerHTML = displayedWord.join(' ')
            index = randomWord.indexOf(btnLetter, (index + 1))
        }
        if (!displayedWord.includes('-')) {
            result = 'YOU WIN!'
            endGame()
        }
    }
}

function endGame() {
    letters.classList.add('disabled')
    main.style.opacity = '0.4'
    main.style.filter = 'blur(.9px)'

    if (result === 'YOU WIN!') {
        resultsMessage.innerHTML = result
    } else {
        resultsMessage.innerHTML = `${result}<br>CORRECT WORD: ${randomWord.toUpperCase()}`
    }
    
    results.classList.remove('hide')
}

playAgain.addEventListener('click', () => {
    letters.classList.remove('disabled')
    main.style.opacity = ''
    main.style.filter = ''

    guessBtns.forEach(button => {
        button.classList.remove('correct', 'incorrect')
    })
    
    result = ''
    resultsMessage.innerText = ''
    results.classList.add('hide')

    displayedWord = []
    incorrectGuesses = 0
    hangmanImg.setAttribute('src', `IMG/hangman0.png`)
    startGame()
})

// add a random word generatir API (if there is such a thing). ex. https://random-word-api.herokuapp.com/word returns one random word
// (https://random-word-api.herokuapp.com/all if you want to fetch all words. may take a long time to load though)

// Mobilanpassa sidan!!