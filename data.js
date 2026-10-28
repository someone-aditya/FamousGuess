/* =========================================================
   FAMOUSGUESS V2 — DATA.JS
   Scalable knowledge database
========================================================= */


/* =========================================================
   QUESTION DATABASE

   id       = trait checked
   text     = question shown to player
   group    = category used by smart engine
   priority = usefulness of question
========================================================= */

const questions = [

    /* =========================
       BASIC
    ========================== */

    {
        id: "real",
        text: "Is this person or character real?",
        group: "basic",
        priority: 10
    },

    {
        id: "male",
        text: "Is this person or character male?",
        group: "basic",
        priority: 9
    },

    {
        id: "alive",
        text: "Is this person alive today?",
        group: "basic",
        priority: 7
    },

    {
        id: "human",
        text: "Is your character human?",
        group: "basic",
        priority: 8
    },


    /* =========================
       LOCATION
    ========================== */

    {
        id: "indian",
        text: "Is this person associated with India?",
        group: "location",
        priority: 8
    },

    {
        id: "american",
        text: "Is this person associated with the United States?",
        group: "location",
        priority: 7
    },

    {
        id: "british",
        text: "Is this person associated with the United Kingdom?",
        group: "location",
        priority: 6
    },

    {
        id: "korean",
        text: "Is this person associated with South Korea?",
        group: "location",
        priority: 5
    },

    {
        id: "japanese",
        text: "Is this person or character associated with Japan?",
        group: "location",
        priority: 5
    },


    /* =========================
       PROFESSION
    ========================== */

    {
        id: "actor",
        text: "Is this person famous for acting?",
        group: "career",
        priority: 8
    },

    {
        id: "singer",
        text: "Is this person famous for music?",
        group: "career",
        priority: 8
    },

    {
        id: "athlete",
        text: "Is this person famous for sports?",
        group: "career",
        priority: 9
    },

    {
        id: "creator",
        text: "Is this person mainly famous on the internet?",
        group: "career",
        priority: 8
    },

    {
        id: "business",
        text: "Is this person famous for business or technology?",
        group: "career",
        priority: 7
    },

    {
        id: "politician",
        text: "Is this person famous for politics?",
        group: "career",
        priority: 7
    },


    /* =========================
       SPORTS
    ========================== */

    {
        id: "footballer",
        text: "Is this person famous for football?",
        group: "sports",
        priority: 9
    },

    {
        id: "cricketer",
        text: "Is this person famous for cricket?",
        group: "sports",
        priority: 9
    },

    {
        id: "basketball",
        text: "Is this person famous for basketball?",
        group: "sports",
        priority: 7
    },

    {
        id: "tennis",
        text: "Is this person famous for tennis?",
        group: "sports",
        priority: 7
    },

    {
        id: "wrestler",
        text: "Is this person associated with professional wrestling?",
        group: "sports",
        priority: 6
    },

    {
        id: "wicketkeeper",
        text: "Is this cricketer known as a wicketkeeper?",
        group: "cricket",
        priority: 10
    },

    {
        id: "cricketCaptain",
        text: "Has this person captained their national cricket team?",
        group: "cricket",
        priority: 7
    },


    /* =========================
       INTERNET
    ========================== */

    {
        id: "youtuber",
        text: "Is this person a famous YouTuber?",
        group: "internet",
        priority: 9
    },

    {
        id: "gamer",
        text: "Is this person known for gaming content?",
        group: "internet",
        priority: 7
    },


    /* =========================
       FICTION
    ========================== */

    {
        id: "fictional",
        text: "Is your character fictional?",
        group: "fiction",
        priority: 10
    },

    {
        id: "superhero",
        text: "Is your character a superhero?",
        group: "fiction",
        priority: 9
    },

    {
        id: "marvel",
        text: "Is your character from Marvel?",
        group: "fiction",
        priority: 10
    },

    {
        id: "dc",
        text: "Is your character from DC?",
        group: "fiction",
        priority: 10
    },

    {
        id: "anime",
        text: "Is your character from anime or manga?",
        group: "fiction",
        priority: 9
    },

    {
        id: "disney",
        text: "Is your character associated with Disney?",
        group: "fiction",
        priority: 7
    },

    {
        id: "videoGame",
        text: "Is your character originally from a video game?",
        group: "fiction",
        priority: 8
    },

    {
        id: "movieCharacter",
        text: "Is your character strongly associated with movies?",
        group: "fiction",
        priority: 6
    },


    /* =========================
       POWERS / CHARACTERISTICS
    ========================== */

    {
        id: "powers",
        text: "Does your character have superhuman or supernatural powers?",
        group: "powers",
        priority: 8
    },

    {
        id: "magic",
        text: "Can your character use magic?",
        group: "powers",
        priority: 7
    },

    {
        id: "mask",
        text: "Does your character usually wear a mask or hide their identity?",
        group: "appearance",
        priority: 6
    },

    {
        id: "cape",
        text: "Is your character famous for wearing a cape?",
        group: "appearance",
        priority: 5
    },

    {
        id: "royal",
        text: "Is your character royalty?",
        group: "identity",
        priority: 5
    },

    {
        id: "villain",
        text: "Is your character mainly considered a villain?",
        group: "identity",
        priority: 7
    },

    {
        id: "robot",
        text: "Is your character a robot or machine?",
        group: "identity",
        priority: 6
    },

    {
        id: "animal",
        text: "Is your character an animal or animal-like creature?",
        group: "identity",
        priority: 7
    }
];


/* =========================================================
   CHARACTER DATABASE

   IMPORTANT:

   traits = things that ARE TRUE.

   Anything not listed is treated as false by the V2 engine.

   uncertain = traits that are partly true / ambiguous.
========================================================= */

const characters = [

    /* =====================================================
       CRICKET
    ===================================================== */

    {
        id: "virat-kohli",
        name: "Virat Kohli",
        description: "Indian international cricketer",
        category: "Sports",
        image: "",
        traits: [
            "real",
            "male",
            "alive",
            "human",
            "indian",
            "athlete",
            "cricketer",
            "cricketCaptain"
        ],
        uncertain: []
    },

    {
        id: "ms-dhoni",
        name: "MS Dhoni",
        description: "Indian cricketer and former captain",
        category: "Sports",
        image: "",
        traits: [
            "real",
            "male",
            "alive",
            "human",
            "indian",
            "athlete",
            "cricketer",
            "wicketkeeper",
            "cricketCaptain"
        ],
        uncertain: []
    },

    {
        id: "rohit-sharma",
        name: "Rohit Sharma",
        description: "Indian international cricketer",
        category: "Sports",
        image: "",
        traits: [
            "real",
            "male",
            "alive",
            "human",
            "indian",
            "athlete",
            "cricketer",
            "cricketCaptain"
        ],
        uncertain: []
    },

    {
        id: "sachin-tendulkar",
        name: "Sachin Tendulkar",
        description: "Legendary Indian cricketer",
        category: "Sports",
        image: "",
        traits: [
            "real",
            "male",
            "alive",
            "human",
            "indian",
            "athlete",
            "cricketer"
        ],
        uncertain: []
    },


    /* =====================================================
       FOOTBALL
    ===================================================== */

    {
        id: "cristiano-ronaldo",
        name: "Cristiano Ronaldo",
        description: "Portuguese footballer",
        category: "Sports",
        image: "",
        traits: [
            "real",
            "male",
            "alive",
            "human",
            "athlete",
            "footballer"
        ],
        uncertain: []
    },

    {
        id: "lionel-messi",
        name: "Lionel Messi",
        description: "Argentine footballer",
        category: "Sports",
        image: "",
        traits: [
            "real",
            "male",
            "alive",
            "human",
            "athlete",
            "footballer"
        ],
        uncertain: []
    },


    /* =====================================================
       INTERNET
    ===================================================== */

    {
        id: "mrbeast",
        name: "MrBeast",
        description: "American YouTube creator",
        category: "Creator",
        image: "",
        traits: [
            "real",
            "male",
            "alive",
            "human",
            "american",
            "creator",
            "youtuber",
            "business"
        ],
        uncertain: []
    },

    {
        id: "carryminati",
        name: "CarryMinati",
        description: "Indian YouTube creator",
        category: "Creator",
        image: "",
        traits: [
            "real",
            "male",
            "alive",
            "human",
            "indian",
            "creator",
            "youtuber",
            "gamer"
        ],
        uncertain: ["singer"]
    },


    /* =====================================================
       FILM / MUSIC
    ===================================================== */

    {
        id: "shah-rukh-khan",
        name: "Shah Rukh Khan",
        description: "Indian film actor",
        category: "Actor",
        image: "",
        traits: [
            "real",
            "male",
            "alive",
            "human",
            "indian",
            "actor"
        ],
        uncertain: ["business"]
    },

    {
        id: "tom-cruise",
        name: "Tom Cruise",
        description: "American film actor",
        category: "Actor",
        image: "",
        traits: [
            "real",
            "male",
            "alive",
            "human",
            "american",
            "actor"
        ],
        uncertain: []
    },

    {
        id: "taylor-swift",
        name: "Taylor Swift",
        description: "American singer-songwriter",
        category: "Musician",
        image: "",
        traits: [
            "real",
            "alive",
            "human",
            "american",
            "singer"
        ],
        uncertain: ["actor", "business"]
    },


    /* =====================================================
       TECHNOLOGY
    ===================================================== */

    {
        id: "elon-musk",
        name: "Elon Musk",
        description: "Technology entrepreneur",
        category: "Business",
        image: "",
        traits: [
            "real",
            "male",
            "alive",
            "human",
            "business"
        ],
        uncertain: ["american", "politician"]
    },


    /* =====================================================
       MARVEL
    ===================================================== */

    {
        id: "spider-man",
        name: "Spider-Man",
        description: "Marvel superhero",
        category: "Fictional Character",
        image: "",
        traits: [
            "male",
            "human",
            "american",
            "fictional",
            "superhero",
            "marvel",
            "movieCharacter",
            "powers",
            "mask"
        ],
        uncertain: []
    },

    {
        id: "iron-man",
        name: "Iron Man",
        description: "Marvel superhero",
        category: "Fictional Character",
        image: "",
        traits: [
            "male",
            "human",
            "american",
            "fictional",
            "superhero",
            "marvel",
            "movieCharacter",
            "business",
            "mask"
        ],
        uncertain: ["powers"]
    },

    {
        id: "thor",
        name: "Thor",
        description: "Marvel's God of Thunder",
        category: "Fictional Character",
        image: "",
        traits: [
            "male",
            "fictional",
            "superhero",
            "marvel",
            "movieCharacter",
            "powers",
            "royal"
        ],
        uncertain: ["magic", "cape"]
    },

    {
        id: "hulk",
        name: "Hulk",
        description: "Marvel superhero",
        category: "Fictional Character",
        image: "",
        traits: [
            "male",
            "human",
            "american",
            "fictional",
            "superhero",
            "marvel",
            "movieCharacter",
            "powers"
        ],
        uncertain: []
    },

    {
        id: "black-panther",
        name: "Black Panther",
        description: "Marvel superhero and king of Wakanda",
        category: "Fictional Character",
        image: "",
        traits: [
            "male",
            "human",
            "fictional",
            "superhero",
            "marvel",
            "movieCharacter",
            "powers",
            "mask",
            "royal"
        ],
        uncertain: []
    },


    /* =====================================================
       DC
    ===================================================== */

    {
        id: "batman",
        name: "Batman",
        description: "DC superhero",
        category: "Fictional Character",
        image: "",
        traits: [
            "male",
            "human",
            "american",
            "fictional",
            "superhero",
            "dc",
            "movieCharacter",
            "mask",
            "cape",
            "business"
        ],
        uncertain: []
    },

    {
        id: "superman",
        name: "Superman",
        description: "DC superhero",
        category: "Fictional Character",
        image: "",
        traits: [
            "male",
            "american",
            "fictional",
            "superhero",
            "dc",
            "movieCharacter",
            "powers",
            "cape"
        ],
        uncertain: ["human"]
    },

    {
        id: "wonder-woman",
        name: "Wonder Woman",
        description: "DC superhero",
        category: "Fictional Character",
        image: "",
        traits: [
            "fictional",
            "superhero",
            "dc",
            "movieCharacter",
            "powers",
            "royal"
        ],
        uncertain: []
    },

    {
        id: "joker",
        name: "The Joker",
        description: "DC supervillain",
        category: "Fictional Character",
        image: "",
        traits: [
            "male",
            "human",
            "fictional",
            "dc",
            "movieCharacter",
            "villain"
        ],
        uncertain: []
    },


    /* =====================================================
       ANIME
    ===================================================== */

    {
        id: "naruto",
        name: "Naruto Uzumaki",
        description: "Ninja from Naruto",
        category: "Anime",
        image: "",
        traits: [
            "male",
            "human",
            "fictional",
            "anime",
            "japanese",
            "powers"
        ],
        uncertain: ["magic"]
    },

    {
        id: "goku",
        name: "Goku",
        description: "Saiyan warrior from Dragon Ball",
        category: "Anime",
        image: "",
        traits: [
            "male",
            "fictional",
            "anime",
            "japanese",
            "powers"
        ],
        uncertain: ["human"]
    },


    /* =====================================================
       OTHER FICTION
    ===================================================== */

    {
        id: "harry-potter",
        name: "Harry Potter",
        description: "Wizard from the Harry Potter series",
        category: "Fictional Character",
        image: "",
        traits: [
            "male",
            "human",
            "british",
            "fictional",
            "movieCharacter",
            "powers",
            "magic"
        ],
        uncertain: []
    },

    {
        id: "mickey-mouse",
        name: "Mickey Mouse",
        description: "Disney animated character",
        category: "Animated Character",
        image: "",
        traits: [
            "male",
            "american",
            "fictional",
            "disney",
            "animal"
        ],
        uncertain: ["magic", "movieCharacter"]
    }

];


/* =========================================================
   ANSWER CONFIGURATION
========================================================= */

const answerValues = {

    yes: 1,

    probably: 0.75,

    unknown: null,

    "probably-not": 0.25,

    no: 0

};


/* =========================================================
   DATABASE HELPERS
========================================================= */


/*
   Return how strongly a character matches a trait.

   1   = true
   0.5 = uncertain
   0   = false
*/

function getTraitValue(character, trait) {

    if (
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


    return 0;

}


/*
   Find character by ID.
*/

function getCharacterById(id) {

    return characters.find(
        character =>
            character.id === id
    );

}


/*
   Database information.
*/

const FamousGuessDB = {

    version: "2.0",

    characters: characters,

    questions: questions,

    totalCharacters:
        characters.length,

    totalQuestions:
        questions.length

};


console.log(
    `FamousGuess V${FamousGuessDB.version}`
);

console.log(
    `${FamousGuessDB.totalCharacters} characters loaded`
);

console.log(
    `${FamousGuessDB.totalQuestions} questions loaded`
);
