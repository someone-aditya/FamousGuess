/* =========================================================
   FAMOUSGUESS V2 — APP.JS
   Intelligent adaptive guessing engine
========================================================= */


/* =========================================================
   DOM
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
const characterDescription =
    document.getElementById("characterDescription");

const characterImage =
    document.querySelector(".character-image");

const answerButtons =
    document.querySelectorAll(".answer-button");

const howToPlayBtn =
    document.getElementById("howToPlayBtn");


/* =========================================================
   SETTINGS
========================================================= */

const SETTINGS = {

    minQuestionsBeforeGuess: 5,

    normalGuessPoint: 10,

    hardGuessPoint: 16,

    absoluteMaximumQuestions: 24,

    confidenceToGuess: 0.72,

    minimumLeadToGuess: 0.16,

    topCandidatesForQuestions: 14
};


/* =========================================================
   GAME STATE
========================================================= */

let candidates = [];

let askedQuestions = [];

let answerHistory = [];

let currentQuestion = null;

let currentGuess = null;

let rejectedCharacters = [];

let questionCount = 0;

let gameFinished = false;


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
   CREATE CANDIDATES
========================================================= */

function createCandidates() {

    return characters.map(character => ({

        character: character,

        /*
           We use log scores instead of constantly
           multiplying tiny probabilities.

           Every candidate begins equally likely.
        */

        score: 0

    }));

}


/* =========================================================
   START GAME
========================================================= */

function startGame() {

    candidates = createCandidates();

    askedQuestions = [];

    answerHistory = [];

    rejectedCharacters = [];

    currentQuestion = null;

    currentGuess = null;

    questionCount = 0;

    gameFinished = false;


    restoreGuessButtons();


    showScreen(gameScreen);


    askNextQuestion();
}


/* =========================================================
   GET ACTIVE CANDIDATES
========================================================= */

function getActiveCandidates() {

    return candidates.filter(candidate => {

        return !rejectedCharacters.includes(
            candidate.character.id
        );

    });

}


/* =========================================================
   SORT CANDIDATES
========================================================= */

function getRankedCandidates() {

    return getActiveCandidates()
        .slice()
        .sort(
            (a, b) =>
                b.score - a.score
        );

}


/* =========================================================
   SOFTMAX CONFIDENCE

   Converts raw scores into probabilities.
========================================================= */

function calculateProbabilities() {

    const ranked =
        getRankedCandidates();


    if (!ranked.length) {

        return [];

    }


    const maxScore =
        ranked[0].score;


    const exponentials =
        ranked.map(candidate => {

            /*
               Temperature prevents FamousGuess
               becoming overconfident too quickly.
            */

            const temperature = 2.2;


            return Math.exp(
                (
                    candidate.score -
                    maxScore
                ) /
                temperature
            );

        });


    const total =
        exponentials.reduce(
            (sum, value) =>
                sum + value,
            0
        );


    return ranked.map(
        (candidate, index) => ({

            ...candidate,

            probability:
                exponentials[index] /
                total

        })
    );

}


/* =========================================================
   ANSWER LIKELIHOOD

   How compatible is a user's answer with
   a character's known trait?
========================================================= */

function getAnswerLikelihood(
    traitValue,
    answerValue
) {

    if (answerValue === null) {

        return 1;

    }


    const difference =
        Math.abs(
            traitValue -
            answerValue
        );


    /*
       Perfect match
    */

    if (difference <= 0.05) {

        return 0.94;

    }


    /*
       Strong match
    */

    if (difference <= 0.25) {

        return 0.76;

    }


    /*
       Uncertain match
    */

    if (difference <= 0.5) {

        return 0.42;

    }


    /*
       Strong disagreement
    */

    if (difference <= 0.75) {

        return 0.16;

    }


    /*
       Complete disagreement
    */

    return 0.045;

}


/* =========================================================
   APPLY ANSWER
========================================================= */

function applyAnswer(answerType) {

    if (!currentQuestion) {

        return;

    }


    const answerValue =
        answerValues[answerType];


    answerHistory.push({

        question:
            currentQuestion.id,

        answer:
            answerType

    });


    /*
       Don't Know provides no evidence.
    */

    if (answerValue !== null) {

        candidates.forEach(candidate => {

            if (
                rejectedCharacters.includes(
                    candidate.character.id
                )
            ) {

                return;

            }


            const traitValue =
                getTraitValue(
                    candidate.character,
                    currentQuestion.id
                );


            const likelihood =
                getAnswerLikelihood(
                    traitValue,
                    answerValue
                );


            /*
               Bayesian-style scoring.

               Log likelihoods make scores stable.
            */

            candidate.score +=
                Math.log(likelihood);

        });

    }


    questionCount++;


    transitionToNextQuestion();
}


/* =========================================================
   ENTROPY
========================================================= */

function binaryEntropy(probability) {

    if (
        probability <= 0 ||
        probability >= 1
    ) {

        return 0;

    }


    return -(
        probability *
            Math.log2(probability)
        +
        (1 - probability) *
            Math.log2(
                1 - probability
            )
    );

}


/* =========================================================
   CHOOSE BEST QUESTION
========================================================= */

function chooseBestQuestion() {

    const availableQuestions =
        questions.filter(question => {

            return !askedQuestions.includes(
                question.id
            );

        });


    if (!availableQuestions.length) {

        return null;

    }


    const probabilityCandidates =
        calculateProbabilities();


    /*
       Focus mostly on candidates that are still
       reasonably possible.
    */

    const strongest =
        probabilityCandidates
            .slice(
                0,
                SETTINGS
                    .topCandidatesForQuestions
            );


    if (!strongest.length) {

        return availableQuestions[0];

    }


    let bestQuestion = null;

    let bestScore = -Infinity;


    availableQuestions.forEach(question => {

        let weightedYes = 0;

        let weightedNo = 0;

        let weightedUncertain = 0;

        let totalWeight = 0;


        strongest.forEach(candidate => {

            const trait =
                getTraitValue(
                    candidate.character,
                    question.id
                );


            const weight =
                candidate.probability;


            totalWeight += weight;


            if (trait >= 0.75) {

                weightedYes += weight;

            }

            else if (trait <= 0.25) {

                weightedNo += weight;

            }

            else {

                weightedUncertain += weight;

            }

        });


        if (totalWeight <= 0) {

            return;

        }


        weightedYes /= totalWeight;
        weightedNo /= totalWeight;
        weightedUncertain /= totalWeight;


        /*
           Questions are useful when candidates
           disagree about the answer.

           50% yes / 50% no is excellent.
           100% yes is useless.
        */

        const yesProbability =
            weightedYes +
            weightedUncertain * 0.5;


        let informationScore =
            binaryEntropy(
                yesProbability
            );


        /*
           Too many uncertain characters makes a
           question less trustworthy.
        */

        informationScore -=
            weightedUncertain * 0.25;


        /*
           Priority from data.js gives important
           questions a small bonus.
        */

        informationScore +=
            (
                question.priority || 5
            ) * 0.012;


        /*
           Don't ask a question when almost every
           remaining candidate has the same answer.
        */

        if (
            weightedYes > 0.96 ||
            weightedNo > 0.96
        ) {

            informationScore -= 1;

        }


        if (
            informationScore >
            bestScore
        ) {

            bestScore =
                informationScore;

            bestQuestion =
                question;

        }

    });


    return bestQuestion;

}


/* =========================================================
   SHOULD WE GUESS?
========================================================= */

function shouldMakeGuess() {

    if (
        questionCount <
        SETTINGS.minQuestionsBeforeGuess
    ) {

        return false;

    }


    const ranked =
        calculateProbabilities();


    if (!ranked.length) {

        return true;

    }


    if (ranked.length === 1) {

        return true;

    }


    const first =
        ranked[0];

    const second =
        ranked[1];


    const lead =
        first.probability -
        second.probability;


    /*
       Very confident.
    */

    if (
        first.probability >=
            SETTINGS.confidenceToGuess
        &&
        lead >=
            SETTINGS.minimumLeadToGuess
    ) {

        return true;

    }


    /*
       At 10 questions we can guess if confidence
       is reasonably strong.
    */

    if (
        questionCount >=
            SETTINGS.normalGuessPoint
        &&
        first.probability >= 0.52
    ) {

        return true;

    }


    /*
       Don't make the player wait forever.
    */

    if (
        questionCount >=
        SETTINGS.hardGuessPoint
    ) {

        return true;

    }


    return false;

}


/* =========================================================
   ASK NEXT QUESTION
========================================================= */

function askNextQuestion() {

    if (gameFinished) {

        return;

    }


    const ranked =
        calculateProbabilities();


    if (!ranked.length) {

        showFailure();

        return;

    }


    if (shouldMakeGuess()) {

        makeGuess(
            ranked[0].character
        );

        return;

    }


    if (
        questionCount >=
        SETTINGS.absoluteMaximumQuestions
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
        questionCount + 1;


    updateProgress();

}


/* =========================================================
   QUESTION TRANSITION
========================================================= */

function transitionToNextQuestion() {

    const card =
        document.querySelector(
            ".question-card"
        );


    card.style.transition =
        "0.18s ease";


    card.style.opacity = "0";

    card.style.transform =
        "translateY(8px) scale(0.99)";


    setTimeout(() => {

        askNextQuestion();


        requestAnimationFrame(() => {

            card.style.transition =
                "0.28s ease";

            card.style.opacity = "1";

            card.style.transform =
                "translateY(0) scale(1)";

        });

    }, 180);

}


/* =========================================================
   PROGRESS
========================================================= */

function updateProgress() {

    const percentage =
        Math.min(
            (
                questionCount /
                SETTINGS.hardGuessPoint
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


    if (character.image) {

        characterImage.innerHTML = `
            <img
                src="${character.image}"
                alt="${character.name}"
                style="
                    width:100%;
                    height:100%;
                    object-fit:cover;
                    border-radius:50%;
                "
            >
        `;

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

    gameFinished = true;


    saveGameStatistics(true);


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


    rejectedCharacters.push(
        currentGuess.id
    );


    /*
       Give rejected candidate effectively
       zero probability.
    */

    const rejected =
        candidates.find(
            candidate =>
                candidate.character.id ===
                currentGuess.id
        );


    if (rejected) {

        rejected.score = -9999;

    }


    currentGuess = null;


    const remaining =
        getActiveCandidates();


    if (!remaining.length) {

        showFailure();

        return;

    }


    /*
       If questions remain, continue thinking.
    */

    const questionsRemaining =
        questions.some(question => {

            return !askedQuestions.includes(
                question.id
            );

        });


    if (questionsRemaining) {

        showScreen(
            gameScreen
        );


        /*
           We don't immediately trigger the normal
           forced-guess rule after being wrong.
        */

        currentQuestion =
            chooseBestQuestion();


        if (currentQuestion) {

            askedQuestions.push(
                currentQuestion.id
            );


            questionText.textContent =
                currentQuestion.text;


            questionNumber.textContent =
                questionCount + 1;


            updateProgress();

        }

        else {

            guessNextCandidate();

        }

    }

    else {

        guessNextCandidate();

    }

}


/* =========================================================
   GUESS NEXT CANDIDATE
========================================================= */

function guessNextCandidate() {

    const ranked =
        calculateProbabilities();


    if (!ranked.length) {

        showFailure();

        return;

    }


    makeGuess(
        ranked[0].character
    );

}


/* =========================================================
   FAILURE
========================================================= */

function showFailure() {

    gameFinished = true;


    saveGameStatistics(false);


    currentGuess = null;


    characterName.textContent =
        "You beat FamousGuess!";


    characterDescription.textContent =
        "I couldn't figure out who you were thinking of.";


    characterImage.innerHTML =
        "<span>!</span>";


    correctGuessBtn.style.display =
        "none";


    wrongGuessBtn.textContent =
        "↻ Play Again";


    wrongGuessBtn.onclick =
        startGame;


    showScreen(
        guessScreen
    );

}


/* =========================================================
   RESTORE GUESS BUTTONS
========================================================= */

function restoreGuessButtons() {

    correctGuessBtn.style.display =
        "";


    wrongGuessBtn.textContent =
        "✕ No, keep guessing";


    wrongGuessBtn.onclick =
        wrongGuess;

}


/* =========================================================
   STATISTICS
========================================================= */

function saveGameStatistics(won) {

    let stats;


    try {

        stats =
            JSON.parse(
                localStorage.getItem(
                    "famousGuessStats"
                )
            ) || {};

    }

    catch {

        stats = {};

    }


    stats.gamesPlayed =
        (stats.gamesPlayed || 0) + 1;


    if (won) {

        stats.correctGuesses =
            (stats.correctGuesses || 0) + 1;

    }

    else {

        stats.playerWins =
            (stats.playerWins || 0) + 1;

    }


    stats.totalQuestions =
        (stats.totalQuestions || 0) +
        questionCount;


    localStorage.setItem(
        "famousGuessStats",
        JSON.stringify(stats)
    );

}


/* =========================================================
   RESET TO HOME
========================================================= */

function resetToHome() {

    gameFinished = true;

    restoreGuessButtons();

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

            if (!currentQuestion) {

                return;

            }


            const answerType =
                button.dataset.answer;


            applyAnswer(
                answerType
            );

        }
    );

});


/* =========================================================
   BUTTON EVENTS
========================================================= */

startGameBtn.addEventListener(
    "click",
    startGame
);


quitGameBtn.addEventListener(
    "click",
    resetToHome
);


playAgainBtn.addEventListener(
    "click",
    startGame
);


correctGuessBtn.addEventListener(
    "click",
    correctGuess
);


/*
   IMPORTANT:

   We use onclick here because failure mode can
   temporarily change what this button does.
*/

wrongGuessBtn.onclick =
    wrongGuess;


/* =========================================================
   HOW TO PLAY
========================================================= */

howToPlayBtn.addEventListener(
    "click",
    () => {

        alert(
            "HOW TO PLAY\n\n" +

            "1. Think of a famous person or fictional character.\n\n" +

            "2. Keep their identity secret.\n\n" +

            "3. Answer FamousGuess honestly.\n\n" +

            "4. Use Probably or Probably Not if you aren't completely sure.\n\n" +

            "5. Choose Don't Know when you genuinely don't know the answer.\n\n" +

            "6. FamousGuess will use your answers to narrow down the possibilities and make a prediction."
        );

    }
);


/* =========================================================
   DEBUGGING

   Open browser console and type:

       FamousGuessDebug()

   to see the current ranking.
========================================================= */

window.FamousGuessDebug =
    function () {

        const ranking =
            calculateProbabilities()
                .slice(0, 10)
                .map(candidate => ({

                    name:
                        candidate.character.name,

                    confidence:
                        (
                            candidate.probability *
                            100
                        ).toFixed(2) + "%",

                    score:
                        candidate.score.toFixed(3)

                }));


        console.table(
            ranking
        );

    };


/* =========================================================
   INITIALIZE
========================================================= */

showScreen(
    homeScreen
);


console.log(
    "🧠 FamousGuess V2 engine ready."
);
