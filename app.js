/* =========================================================
   FAMOUSGUESS — APP.JS
   Smart guessing engine
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const homeScreen = document.getElementById("homeScreen");
const gameScreen = document.getElementById("gameScreen");
const guessScreen = document.getElementById("guessScreen");
const successScreen = document.getElementById("successScreen");

const startGameBtn = document.getElementById("startGameBtn");
const quitGameBtn = document.getElementById("quitGameBtn");
const playAgainBtn = document.getElementById("playAgainBtn");

const correctGuessBtn = document.getElementById("correctGuessBtn");
const wrongGuessBtn = document.getElementById("wrongGuessBtn");

const questionText = document.getElementById("questionText");
const questionNumber = document.getElementById("questionNumber");
const progressBar = document.getElementById("progressBar");

const characterName = document.getElementById("characterName");
const characterDescription = document.getElementById(
    "characterDescription"
);

const characterImage = document.querySelector(".character-image");

const answerButtons = document.querySelectorAll(
    ".answer-button"
);


/* =========================================================
   GAME STATE
========================================================= */

let scores = {};

let askedQuestions = [];

let currentQuestion = null;

let currentGuess = null;

let rejectedCharacters = [];

let totalAnswers = 0;

const MAX_QUESTIONS_BEFORE_GUESS = 12;

const MIN_QUESTIONS_BEFORE_GUESS = 4;


/* =========================================================
   SCREEN MANAGER
========================================================= */

function showScreen(screen) {

    document
        .querySelectorAll(".screen")
        .forEach(item => {
            item.classList.remove("active");
        });

    screen.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   START GAME
========================================================= */

function startGame() {

    scores = {};

    askedQuestions = [];

    rejectedCharacters = [];

    currentQuestion = null;

    currentGuess = null;

    totalAnswers = 0;


    /* Every character starts equally */

    characters.forEach(character => {

        scores[character.name] = 100;

    });


    showScreen(gameScreen);

    askNextQuestion();
}


/* =========================================================
   GET AVAILABLE CHARACTERS
========================================================= */

function getAvailableCharacters() {

    return characters.filter(character => {

        return !rejectedCharacters.includes(
            character.name
        );

    });

}


/* =========================================================
   SORT CHARACTERS BY SCORE
========================================================= */

function getRankedCharacters() {

    return getAvailableCharacters()
        .map(character => {

            return {

                character: character,

                score:
                    scores[character.name] || 0

            };

        })
        .sort((a, b) => {

            return b.score - a.score;

        });

}


/* =========================================================
   CHOOSE BEST QUESTION

   Instead of asking questions randomly, we find a question
   that divides the strongest candidates as evenly as possible.
========================================================= */

function chooseBestQuestion() {

    const availableQuestions =
        questions.filter(question => {

            return !askedQuestions.includes(
                question.id
            );

        });


    if (availableQuestions.length === 0) {

        return null;

    }


    const ranked = getRankedCharacters();

    /*
       Only use the strongest candidates when deciding
       what question to ask next.
    */

    const candidates =
        ranked
            .slice(
                0,
                Math.min(
                    ranked.length,
                    12
                )
            )
            .map(item => item.character);


    let bestQuestion = null;

    let bestValue = Infinity;


    availableQuestions.forEach(question => {

        let yesCount = 0;

        let noCount = 0;

        let middleCount = 0;


        candidates.forEach(character => {

            const value =
                character.traits[
                    question.id
                ];


            if (value >= 0.75) {

                yesCount++;

            }

            else if (value <= 0.25) {

                noCount++;

            }

            else {

                middleCount++;

            }

        });


        /*
           A useful question should divide candidates
           close to 50 / 50.
        */

        const difference =
            Math.abs(
                yesCount - noCount
            );


        /*
           Penalize questions where almost everyone
           has an uncertain value.
        */

        const uncertaintyPenalty =
            middleCount * 0.8;


        const questionValue =
            difference +
            uncertaintyPenalty;


        if (
            yesCount > 0 &&
            noCount > 0 &&
            questionValue < bestValue
        ) {

            bestValue =
                questionValue;

            bestQuestion =
                question;

        }

    });


    /*
       Fallback if no ideal question exists
    */

    if (!bestQuestion) {

        bestQuestion =
            availableQuestions[0];

    }


    return bestQuestion;

}


/* =========================================================
   ASK NEXT QUESTION
========================================================= */

function askNextQuestion() {

    const ranked =
        getRankedCharacters();


    if (ranked.length === 0) {

        showFailure();

        return;

    }


    /*
       Check if FamousGuess is confident enough.
    */

    if (
        totalAnswers >=
        MIN_QUESTIONS_BEFORE_GUESS
    ) {

        const first =
            ranked[0];

        const second =
            ranked[1];


        if (!second) {

            makeGuess(
                first.character
            );

            return;

        }


        const lead =
            first.score -
            second.score;


        /*
           Large lead means one character is
           clearly more likely.
        */

        if (lead >= 70) {

            makeGuess(
                first.character
            );

            return;

        }

    }


    /*
       Don't make the player answer forever.
    */

    if (
        totalAnswers >=
        MAX_QUESTIONS_BEFORE_GUESS
    ) {

        makeGuess(
            ranked[0].character
        );

        return;

    }


    currentQuestion =
        chooseBestQuestion();


    if (!currentQuestion) {

        makeGuess(
            ranked[0].character
        );

        return;

    }


    askedQuestions.push(
        currentQuestion.id
    );


    questionText.textContent =
        currentQuestion.text;


    questionNumber.textContent =
        totalAnswers + 1;


    updateProgress();

}


/* =========================================================
   HANDLE ANSWER
========================================================= */

function handleAnswer(answerType) {

    if (!currentQuestion) {

        return;

    }


    const answer =
        answerValues[
            answerType
        ];


    /*
       Don't Know doesn't affect scores.
    */

    if (answer !== null) {

        characters.forEach(character => {

            if (
                rejectedCharacters.includes(
                    character.name
                )
            ) {

                return;

            }


            const traitValue =
                character.traits[
                    currentQuestion.id
                ];


            /*
               Difference between user's answer
               and database value.

               0 difference = perfect match.
               1 difference = complete mismatch.
            */

            const difference =
                Math.abs(
                    traitValue -
                    answer
                );


            let scoreChange;


            if (difference <= 0.1) {

                scoreChange = 35;

            }

            else if (
                difference <= 0.3
            ) {

                scoreChange = 15;

            }

            else if (
                difference <= 0.55
            ) {

                scoreChange = -15;

            }

            else {

                scoreChange = -45;

            }


            scores[
                character.name
            ] += scoreChange;

        });

    }


    totalAnswers++;

    animateQuestionChange();

}


/* =========================================================
   QUESTION TRANSITION
========================================================= */

function animateQuestionChange() {

    const card =
        document.querySelector(
            ".question-card"
        );


    card.style.opacity = "0";

    card.style.transform =
        "translateY(10px)";


    setTimeout(() => {

        askNextQuestion();


        card.style.transition =
            "0.3s ease";

        card.style.opacity = "1";

        card.style.transform =
            "translateY(0)";

    }, 180);

}


/* =========================================================
   UPDATE PROGRESS
========================================================= */

function updateProgress() {

    const percentage =
        Math.min(
            (
                totalAnswers /
                MAX_QUESTIONS_BEFORE_GUESS
            ) * 100,
            100
        );


    progressBar.style.width =
        Math.max(
            percentage,
            5
        ) + "%";

}


/* =========================================================
   MAKE GUESS
========================================================= */

function makeGuess(character) {

    currentGuess =
        character;


    characterName.textContent =
        character.name;


    characterDescription.textContent =
        character.description;


    /*
       Images will be added later.
    */

    if (character.image) {

        characterImage.innerHTML =
            `<img
                src="${character.image}"
                alt="${character.name}"
             >`;

    }

    else {

        characterImage.innerHTML =
            "<span>?</span>";

    }


    showScreen(
        guessScreen
    );

}


/* =========================================================
   CORRECT GUESS
========================================================= */

function correctGuess() {

    showScreen(
        successScreen
    );

}


/* =========================================================
   WRONG GUESS
========================================================= */

function wrongGuess() {

    if (!currentGuess) {

        return;

    }


    /*
       Remove the incorrect guess.
    */

    rejectedCharacters.push(
        currentGuess.name
    );


    scores[
        currentGuess.name
    ] =
        -999999;


    currentGuess = null;


    /*
       Continue questioning if possible.
    */

    const remainingQuestions =
        questions.filter(question => {

            return !askedQuestions.includes(
                question.id
            );

        });


    if (
        remainingQuestions.length > 0
    ) {

        /*
           Allow extra questions after
           an incorrect guess.
        */

        totalAnswers =
            Math.min(
                totalAnswers,
                MAX_QUESTIONS_BEFORE_GUESS - 2
            );


        showScreen(
            gameScreen
        );


        askNextQuestion();

    }

    else {

        /*
           No questions left.
           Guess the next best character.
        */

        const ranked =
            getRankedCharacters();


        if (ranked.length > 0) {

            makeGuess(
                ranked[0].character
            );

        }

        else {

            showFailure();

        }

    }

}


/* =========================================================
   FAILURE
========================================================= */

function showFailure() {

    characterName.textContent =
        "You beat me!";

    characterDescription.textContent =
        "I couldn't figure out who you were thinking of.";

    characterImage.innerHTML =
        "<span>!</span>";


    correctGuessBtn.style.display =
        "none";


    wrongGuessBtn.textContent =
        "Play Again";


    wrongGuessBtn.onclick =
        resetGame;


    showScreen(
        guessScreen
    );

}


/* =========================================================
   RESET
========================================================= */

function resetGame() {

    /*
       Restore buttons in case failure screen
       modified them.
    */

    correctGuessBtn.style.display =
        "";

    wrongGuessBtn.textContent =
        "✕ No, keep guessing";

    wrongGuessBtn.onclick =
        wrongGuess;


    showScreen(
        homeScreen
    );

}


/* =========================================================
   ANSWER BUTTON EVENTS
========================================================= */

answerButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const answer =
                button.dataset.answer;

            handleAnswer(
                answer
            );

        }
    );

});


/* =========================================================
   MAIN BUTTON EVENTS
========================================================= */

startGameBtn.addEventListener(
    "click",
    startGame
);


quitGameBtn.addEventListener(
    "click",
    resetGame
);


playAgainBtn.addEventListener(
    "click",
    startGame
);


correctGuessBtn.addEventListener(
    "click",
    correctGuess
);


wrongGuessBtn.addEventListener(
    "click",
    wrongGuess
);


/* =========================================================
   HOW TO PLAY
========================================================= */

const howToPlayBtn =
    document.getElementById(
        "howToPlayBtn"
    );


howToPlayBtn.addEventListener(
    "click",
    () => {

        alert(
            "HOW TO PLAY\n\n" +
            "1. Think of a famous person or fictional character.\n\n" +
            "2. Don't tell FamousGuess who it is.\n\n" +
            "3. Answer each question honestly.\n\n" +
            "4. FamousGuess will narrow down the possibilities.\n\n" +
            "5. See if it can guess who you're thinking of!"
        );

    }
);


/* =========================================================
   INITIAL SCREEN
========================================================= */

showScreen(
    homeScreen
);
