/* =========================================================
   FAMOUSGUESS V3
   Adaptive large-scale guessing engine

   RULES
   ---------------------------------------------------------
   • Never guess before question 30
   • Dynamically choose useful questions
   • Wrong guess = eliminate candidate and continue
   • Keep all previous answers
   • Maximum 100 questions
   • If FamousGuess still fails -> player wins
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
   ENGINE SETTINGS
========================================================= */

const SETTINGS = {

    /*
       FamousGuess cannot guess before this.
    */

    minimumQuestionsBeforeGuess: 30,


    /*
       Absolute maximum.
    */

    maximumQuestions: 100,


    /*
       After a wrong guess, ask at least this many
       new questions before trying again.
    */

    questionsBetweenGuesses: 5,


    /*
       Confidence required after Q30.
    */

    confidenceThreshold: 0.68,


    /*
       Difference between first and second candidate.
    */

    leadThreshold: 0.12,


    /*
       How many likely candidates influence
       question selection.
    */

    questionCandidateLimit: 100
};


/* =========================================================
   GAME STATE
========================================================= */

let candidates = [];

let askedQuestions = new Set();

let answerHistory = [];

let rejectedCharacters = new Set();

let currentQuestion = null;

let currentGuess = null;

let questionCount = 0;

let lastGuessQuestion = 0;

let guessesMade = 0;

let gameFinished = false;


/* =========================================================
   SCREEN
========================================================= */

function showScreen(screen) {

    document
        .querySelectorAll(".screen")
        .forEach(element => {

            element.classList.remove("active");

        });


    screen.classList.add("active");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   TRAIT READER

   Supports V2 structure:

   traits: ["real", "male", ...]
   uncertain: ["actor", ...]

========================================================= */

/* =========================================================
   TRAIT READER V4

   Returns:

   1    = YES
   0.5  = MAYBE / PARTLY TRUE
   0    = NO
   null = DATABASE DOESN'T KNOW
========================================================= */

function traitValue(character, trait) {

    if (
        character.yes &&
        character.yes.includes(trait)
    ) {
        return 1;
    }


    if (
        character.maybe &&
        character.maybe.includes(trait)
    ) {
        return 0.5;
    }


    if (
        character.no &&
        character.no.includes(trait)
    ) {
        return 0;
    }


    /*
       Compatibility with our older V2 records.
    */

    if (
        character.traits &&
        character.traits.includes(trait)
    ) {
        return 1;
    }


    if (
        character.uncertain &&
        character.uncertain.includes(trait)
    ) {
        return 0.5;
    }


    /*
       CRITICAL:
       Missing data does NOT mean No.
    */

    return null;
}


/* =========================================================
   CREATE CANDIDATES
========================================================= */

function createCandidates() {

    return characters.map(character => ({

        character,

        /*
           Log probability score.
        */

        score: 0

    }));

}


/* =========================================================
   START
========================================================= */

function startGame() {

    candidates =
        createCandidates();


    askedQuestions =
        new Set();


    answerHistory = [];


    rejectedCharacters =
        new Set();


    currentQuestion = null;

    currentGuess = null;

    questionCount = 0;

    lastGuessQuestion = 0;

    guessesMade = 0;

    gameFinished = false;


    restoreGuessButtons();


    showScreen(
        gameScreen
    );


    askNextQuestion();
}


/* =========================================================
   ACTIVE CANDIDATES
========================================================= */

function activeCandidates() {

    return candidates.filter(candidate => {

        return !rejectedCharacters.has(
            candidate.character.id
        );

    });
}


/* =========================================================
   RANK
========================================================= */

function rankedCandidates() {

    return activeCandidates()
        .slice()
        .sort(
            (a, b) =>
                b.score - a.score
        );

}


/* =========================================================
   PROBABILITIES
========================================================= */

function probabilities() {

    const ranked =
        rankedCandidates();


    if (!ranked.length) {

        return [];

    }


    const maximum =
        ranked[0].score;


    /*
       Temperature keeps probabilities from becoming
       unrealistically certain too early.
    */

    const temperature = 3;


    const weights =
        ranked.map(candidate => {

            const difference =
                (
                    candidate.score -
                    maximum
                ) /
                temperature;


            /*
               Prevent numerical underflow.
            */

            if (difference < -50) {

                return 0;

            }


            return Math.exp(
                difference
            );

        });


    const total =
        weights.reduce(
            (sum, weight) =>
                sum + weight,
            0
        );


    if (!total) {

        return ranked.map(
            candidate => ({

                ...candidate,

                probability: 0

            })
        );

    }


    return ranked.map(
        (candidate, index) => ({

            ...candidate,

            probability:
                weights[index] /
                total

        })
    );
}


/* =========================================================
   LIKELIHOOD
========================================================= */
function likelihood(expected, answer) {

    /*
       Player selected Don't Know.
       This gives us no evidence.
    */

    if (answer === null) {
        return 1;
    }


    /*
       FamousGuess itself doesn't know this trait.

       Do NOT reward or punish the candidate.
    */

    if (expected === null) {
        return 1;
    }


    const difference =
        Math.abs(
            expected - answer
        );


    if (difference <= 0.05) {
        return 0.97;
    }


    if (difference <= 0.25) {
        return 0.82;
    }


    if (difference <= 0.5) {
        return 0.50;
    }


    if (difference <= 0.75) {
        return 0.18;
    }


    return 0.035;
}{

    if (answer === null) {

        return 1;

    }


    const difference =
        Math.abs(
            expected -
            answer
        );


    if (difference <= 0.05) {

        return 0.97;

    }


    if (difference <= 0.25) {

        return 0.80;

    }


    if (difference <= 0.5) {

        return 0.48;

    }


    if (difference <= 0.75) {

        return 0.18;

    }


    return 0.035;
}


/* =========================================================
   ANSWER
========================================================= */

function processAnswer(type) {

    if (
        gameFinished ||
        !currentQuestion
    ) {

        return;

    }


    const answer =
        answerValues[type];


    answerHistory.push({

        question:
            currentQuestion.id,

        answer:
            type

    });


    if (answer !== null) {

        activeCandidates()
            .forEach(candidate => {

                const expected =
                    traitValue(
                        candidate.character,
                        currentQuestion.id
                    );


                const probability =
                    likelihood(
                        expected,
                        answer
                    );


                candidate.score +=
                    Math.log(
                        Math.max(
                            probability,
                            0.000001
                        )
                    );

            });

    }


    questionCount++;


    currentQuestion = null;


    animateNext();
}


/* =========================================================
   ENTROPY
========================================================= */

function entropy(p) {

    if (
        p <= 0 ||
        p >= 1
    ) {

        return 0;

    }


    return -(
        p * Math.log2(p)
        +
        (1 - p) *
        Math.log2(1 - p)
    );
}


/* =========================================================
   BEST QUESTION
========================================================= */

function chooseQuestion() {

    const available =
        questions.filter(question => {

            return !askedQuestions.has(
                question.id
            );

        });


    if (!available.length) {

        return null;

    }


    const ranked =
        probabilities();


    const importantCandidates =
        ranked.slice(
            0,
            Math.min(
                SETTINGS.questionCandidateLimit,
                ranked.length
            )
        );


    if (!importantCandidates.length) {

        return available[0];

    }


    /*
       Renormalize probability among candidates used
       for question selection.
    */

    const selectedProbability =
        importantCandidates.reduce(
            (sum, candidate) =>
                sum + candidate.probability,
            0
        );


    let bestQuestion = null;

    let bestInformation = -Infinity;


    available.forEach(question => {

        let yes = 0;
        let no = 0;
        let uncertain = 0;
        let unknown = 0;


        importantCandidates.forEach(
            candidate => {

                const weight =
                    selectedProbability > 0
                        ?
                        candidate.probability /
                        selectedProbability
                        :
                        1 /
                        importantCandidates.length;


                const value =
    traitValue(
        candidate.character,
        question.id
    );


/*
   Missing knowledge is different from
   a Maybe answer.
*/

if (value === null) {

    unknown += weight;

}

else if (value >= 0.75) {

    yes += weight;

}

else if (value <= 0.25) {

    no += weight;

}

else {

    uncertain += weight;

}

            }
        );


        /*
           Uncertain traits contribute half to
           each side.
        */

        const effectiveYes =
            yes +
            uncertain * 0.5;


        let information =
            entropy(
                effectiveYes
            );


        /*
           Reward high-priority questions.
        */

        information +=
            (
                question.priority || 5
            ) * 0.01;


        /*
           Penalize uncertainty.
        */
/*
   Questions with lots of unknown database
   information are less useful.

   This stops FamousGuess asking questions
   that only 2% of its database understands.
*/

information -=
    uncertain * 0.15;

information -=
    unknown * 0.70;


        /*
           A question almost everyone answers
           identically is not useful.
        */

        if (
            effectiveYes < 0.025 ||
            effectiveYes > 0.975
        ) {

            information -= 2;

        }


        if (
            information >
            bestInformation
        ) {

            bestInformation =
                information;

            bestQuestion =
                question;

        }

    });


    return bestQuestion;
}


/* =========================================================
   GUESS DECISION
========================================================= */

function canGuessNow() {

    /*
       NEVER guess before Q30.
    */

    if (
        questionCount <
        SETTINGS.minimumQuestionsBeforeGuess
    ) {

        return false;

    }


    /*
       Don't guess repeatedly without learning
       anything new.
    */

    if (
        guessesMade > 0 &&
        questionCount -
        lastGuessQuestion <
        SETTINGS.questionsBetweenGuesses
    ) {

        return false;

    }


    const ranked =
        probabilities();


    if (!ranked.length) {

        return false;

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
       High confidence.
    */

    if (
        first.probability >=
            SETTINGS.confidenceThreshold
        &&
        lead >=
            SETTINGS.leadThreshold
    ) {

        return true;

    }


    /*
       Later in the game FamousGuess should take
       reasonable attempts even if confidence isn't
       extremely high.
    */

    if (
        questionCount >= 40 &&
        first.probability >= 0.45
    ) {

        return true;

    }


    if (
        questionCount >= 55 &&
        first.probability >= 0.25
    ) {

        return true;

    }


    if (
        questionCount >= 70
    ) {

        return true;

    }


    return false;
}


/* =========================================================
   NEXT QUESTION
========================================================= */

function askNextQuestion() {

    if (gameFinished) {

        return;

    }


    /*
       HARD STOP.
    */

    if (
        questionCount >=
        SETTINGS.maximumQuestions
    ) {

        playerWins();

        return;

    }


    const ranked =
        probabilities();


    if (!ranked.length) {

        playerWins();

        return;

    }


    /*
       Guess if intelligent enough to do so.
    */

    if (canGuessNow()) {

        makeGuess(
            ranked[0].character
        );

        return;

    }


    currentQuestion =
        chooseQuestion();


    /*
       If our database runs out of questions before
       100, we cannot learn anything else.

       Guess remaining candidates instead.
    */

    if (!currentQuestion) {

        makeGuess(
            ranked[0].character
        );

        return;

    }


    askedQuestions.add(
        currentQuestion.id
    );


    questionText.textContent =
        currentQuestion.text;


    questionNumber.textContent =
        questionCount + 1;


    updateProgress();
}


/* =========================================================
   TRANSITION
========================================================= */

function animateNext() {

    const card =
        document.querySelector(
            ".question-card"
        );


    card.style.transition =
        "0.15s ease";


    card.style.opacity =
        "0";


    card.style.transform =
        "translateY(8px)";


    setTimeout(() => {

        askNextQuestion();


        requestAnimationFrame(() => {

            card.style.transition =
                "0.25s ease";


            card.style.opacity =
                "1";


            card.style.transform =
                "translateY(0)";

        });

    }, 150);
}


/* =========================================================
   PROGRESS
========================================================= */

function updateProgress() {

    const progress =
        Math.min(
            questionCount /
            SETTINGS.maximumQuestions *
            100,
            100
        );


    progressBar.style.width =
        Math.max(
            progress,
            1
        ) + "%";
}


/* =========================================================
   MAKE GUESS
========================================================= */

function makeGuess(character) {

    if (!character) {

        playerWins();

        return;

    }


    currentGuess =
        character;


    guessesMade++;


    lastGuessQuestion =
        questionCount;


    characterName.textContent =
        character.name;


    characterDescription.textContent =
        character.description || "";


    if (character.image) {

        characterImage.innerHTML = `
            <img
                src="${character.image}"
                alt=""
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


    restoreGuessButtons();


    showScreen(
        guessScreen
    );
}


/* =========================================================
   CORRECT
========================================================= */

function correctGuess() {

    if (!currentGuess) {

        return;

    }


    gameFinished = true;


    saveStatistics(
        true
    );


    showScreen(
        successScreen
    );
}


/* =========================================================
   WRONG
========================================================= */

function wrongGuess() {

    if (!currentGuess) {

        return;

    }


    rejectedCharacters.add(
        currentGuess.id
    );


    const rejected =
        candidates.find(candidate => {

            return (
                candidate.character.id ===
                currentGuess.id
            );

        });


    if (rejected) {

        rejected.score =
            -999999;

    }


    currentGuess = null;


    /*
       If we hit 100, player wins immediately.
    */

    if (
        questionCount >=
        SETTINGS.maximumQuestions
    ) {

        playerWins();

        return;

    }


    /*
       Return to questioning.
    */

    showScreen(
        gameScreen
    );


    askNextQuestion();
}


/* =========================================================
   PLAYER WINS
========================================================= */

function playerWins() {

    gameFinished = true;


    saveStatistics(
        false
    );


    currentGuess = null;


    characterName.textContent =
        "You won!";


    characterDescription.textContent =
        "You reached the end of my knowledge. I couldn't guess your character.";


    characterImage.innerHTML =
        "<span>🏆</span>";


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
   RESTORE BUTTONS
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

function saveStatistics(
    famousGuessWon
) {

    let stats = {};


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


    if (famousGuessWon) {

        stats.famousGuessWins =
            (
                stats.famousGuessWins ||
                0
            ) + 1;

    }

    else {

        stats.playerWins =
            (
                stats.playerWins ||
                0
            ) + 1;

    }


    stats.questionsAnswered =
        (
            stats.questionsAnswered ||
            0
        ) +
        questionCount;


    localStorage.setItem(
        "famousGuessStats",
        JSON.stringify(stats)
    );
}


/* =========================================================
   HOME
========================================================= */

function goHome() {

    gameFinished = true;


    restoreGuessButtons();


    showScreen(
        homeScreen
    );
}


/* =========================================================
   ANSWER EVENTS
========================================================= */

answerButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const type =
                button.dataset.answer;


            processAnswer(
                type
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
    goHome
);


playAgainBtn.addEventListener(
    "click",
    startGame
);


correctGuessBtn.addEventListener(
    "click",
    correctGuess
);


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

            "Think of any famous person or fictional character.\n\n" +

            "Answer Yes, Probably, Don't Know, Probably Not or No.\n\n" +

            "FamousGuess will ask at least 30 questions before its first guess.\n\n" +

            "If the guess is wrong, choose No and FamousGuess will continue investigating.\n\n" +

            "If FamousGuess cannot identify your character after 100 questions, you win!"
        );

    }
);


/* =========================================================
   DEBUG
========================================================= */

window.FamousGuessDebug =
    function () {

        const results =
            probabilities()
                .slice(0, 20)
                .map(
                    (candidate, index) => ({

                        rank:
                            index + 1,

                        name:
                            candidate
                                .character
                                .name,

                        confidence:
                            (
                                candidate
                                    .probability *
                                100
                            ).toFixed(3) + "%",

                        score:
                            candidate
                                .score
                                .toFixed(3)

                    })
                );


        console.table(
            results
        );

    };


/* =========================================================
   INIT
========================================================= */

showScreen(
    homeScreen
);


console.log(
    "🧠 FamousGuess V3 loaded"
);
