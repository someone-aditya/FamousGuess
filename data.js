/* =========================================================
   FAMOUSGUESS — DATA.JS
   Character database + question database

   ATTRIBUTE VALUES:
   1  = Yes
   0  = No
   0.5 = Sometimes / unclear
========================================================= */


/* =========================================================
   QUESTIONS
========================================================= */

const questions = [

    {
        id: "real",
        text: "Is your character a real person?"
    },

    {
        id: "male",
        text: "Is your character male?"
    },

    {
        id: "alive",
        text: "Is your character alive today?"
    },

    {
        id: "indian",
        text: "Is your character from India?"
    },

    {
        id: "american",
        text: "Is your character from the United States?"
    },

    {
        id: "actor",
        text: "Is your character famous for acting?"
    },

    {
        id: "singer",
        text: "Is your character famous for music or singing?"
    },

    {
        id: "athlete",
        text: "Is your character famous for sports?"
    },

    {
        id: "youtuber",
        text: "Is your character famous on YouTube?"
    },

    {
        id: "politician",
        text: "Is your character involved in politics?"
    },

    {
        id: "business",
        text: "Is your character famous for business or technology?"
    },

    {
        id: "football",
        text: "Is your character associated with football?"
    },

    {
        id: "cricket",
        text: "Is your character associated with cricket?"
    },

    {
        id: "superhero",
        text: "Is your character a superhero?"
    },

    {
        id: "marvel",
        text: "Is your character associated with Marvel?"
    },

    {
        id: "dc",
        text: "Is your character associated with DC?"
    },

    {
        id: "anime",
        text: "Is your character from anime?"
    },

    {
        id: "cartoon",
        text: "Is your character animated?"
    },

    {
        id: "movie",
        text: "Is your character strongly associated with movies?"
    },

    {
        id: "magic",
        text: "Does your character use magic or supernatural powers?"
    },

    {
        id: "mask",
        text: "Does your character often hide their identity or wear a mask?"
    },

    {
        id: "royal",
        text: "Is your character royalty?"
    }

];


/* =========================================================
   CHARACTER DATABASE
========================================================= */

const characters = [

    /* =========================
       SPORTS
    ========================== */

    {
        name: "Cristiano Ronaldo",
        description: "Portuguese footballer",
        image: "",
        traits: {
            real: 1,
            male: 1,
            alive: 1,
            indian: 0,
            american: 0,
            actor: 0,
            singer: 0,
            athlete: 1,
            youtuber: 0,
            politician: 0,
            business: 0.5,
            football: 1,
            cricket: 0,
            superhero: 0,
            marvel: 0,
            dc: 0,
            anime: 0,
            cartoon: 0,
            movie: 0,
            magic: 0,
            mask: 0,
            royal: 0
        }
    },


    {
        name: "Lionel Messi",
        description: "Argentine footballer",
        image: "",
        traits: {
            real: 1,
            male: 1,
            alive: 1,
            indian: 0,
            american: 0,
            actor: 0,
            singer: 0,
            athlete: 1,
            youtuber: 0,
            politician: 0,
            business: 0,
            football: 1,
            cricket: 0,
            superhero: 0,
            marvel: 0,
            dc: 0,
            anime: 0,
            cartoon: 0,
            movie: 0,
            magic: 0,
            mask: 0,
            royal: 0
        }
    },


    {
        name: "Virat Kohli",
        description: "Indian cricketer",
        image: "",
        traits: {
            real: 1,
            male: 1,
            alive: 1,
            indian: 1,
            american: 0,
            actor: 0,
            singer: 0,
            athlete: 1,
            youtuber: 0,
            politician: 0,
            business: 0.5,
            football: 0,
            cricket: 1,
            superhero: 0,
            marvel: 0,
            dc: 0,
            anime: 0,
            cartoon: 0,
            movie: 0,
            magic: 0,
            mask: 0,
            royal: 0
        }
    },


    {
        name: "MS Dhoni",
        description: "Indian cricketer",
        image: "",
        traits: {
            real: 1,
            male: 1,
            alive: 1,
            indian: 1,
            american: 0,
            actor: 0,
            singer: 0,
            athlete: 1,
            youtuber: 0,
            politician: 0,
            business: 0.5,
            football: 0,
            cricket: 1,
            superhero: 0,
            marvel: 0,
            dc: 0,
            anime: 0,
            cartoon: 0,
            movie: 0,
            magic: 0,
            mask: 0,
            royal: 0
        }
    },


    /* =========================
       YOUTUBE / INTERNET
    ========================== */

    {
        name: "MrBeast",
        description: "American YouTuber",
        image: "",
        traits: {
            real: 1,
            male: 1,
            alive: 1,
            indian: 0,
            american: 1,
            actor: 0,
            singer: 0,
            athlete: 0,
            youtuber: 1,
            politician: 0,
            business: 1,
            football: 0,
            cricket: 0,
            superhero: 0,
            marvel: 0,
            dc: 0,
            anime: 0,
            cartoon: 0,
            movie: 0,
            magic: 0,
            mask: 0,
            royal: 0
        }
    },


    {
        name: "CarryMinati",
        description: "Indian YouTuber",
        image: "",
        traits: {
            real: 1,
            male: 1,
            alive: 1,
            indian: 1,
            american: 0,
            actor: 0,
            singer: 0.5,
            athlete: 0,
            youtuber: 1,
            politician: 0,
            business: 0,
            football: 0,
            cricket: 0,
            superhero: 0,
            marvel: 0,
            dc: 0,
            anime: 0,
            cartoon: 0,
            movie: 0,
            magic: 0,
            mask: 0,
            royal: 0
        }
    },


    /* =========================
       ACTORS
    ========================== */

    {
        name: "Shah Rukh Khan",
        description: "Indian actor",
        image: "",
        traits: {
            real: 1,
            male: 1,
            alive: 1,
            indian: 1,
            american: 0,
            actor: 1,
            singer: 0,
            athlete: 0,
            youtuber: 0,
            politician: 0,
            business: 0.5,
            football: 0,
            cricket: 0,
            superhero: 0,
            marvel: 0,
            dc: 0,
            anime: 0,
            cartoon: 0,
            movie: 1,
            magic: 0,
            mask: 0,
            royal: 0
        }
    },


    {
        name: "Dwayne Johnson",
        description: "American actor and former wrestler",
        image: "",
        traits: {
            real: 1,
            male: 1,
            alive: 1,
            indian: 0,
            american: 1,
            actor: 1,
            singer: 0,
            athlete: 0.5,
            youtuber: 0,
            politician: 0,
            business: 0.5,
            football: 0,
            cricket: 0,
            superhero: 0,
            marvel: 0,
            dc: 0,
            anime: 0,
            cartoon: 0,
            movie: 1,
            magic: 0,
            mask: 0,
            royal: 0
        }
    },


    {
        name: "Tom Cruise",
        description: "American actor",
        image: "",
        traits: {
            real: 1,
            male: 1,
            alive: 1,
            indian: 0,
            american: 1,
            actor: 1,
            singer: 0,
            athlete: 0,
            youtuber: 0,
            politician: 0,
            business: 0,
            football: 0,
            cricket: 0,
            superhero: 0,
            marvel: 0,
            dc: 0,
            anime: 0,
            cartoon: 0,
            movie: 1,
            magic: 0,
            mask: 0,
            royal: 0
        }
    },


    {
        name: "Taylor Swift",
        description: "American singer-songwriter",
        image: "",
        traits: {
            real: 1,
            male: 0,
            alive: 1,
            indian: 0,
            american: 1,
            actor: 0.5,
            singer: 1,
            athlete: 0,
            youtuber: 0,
            politician: 0,
            business: 0.5,
            football: 0,
            cricket: 0,
            superhero: 0,
            marvel: 0,
            dc: 0,
            anime: 0,
            cartoon: 0,
            movie: 0.5,
            magic: 0,
            mask: 0,
            royal: 0
        }
    },


    /* =========================
       BUSINESS / TECHNOLOGY
    ========================== */

    {
        name: "Elon Musk",
        description: "Technology entrepreneur",
        image: "",
        traits: {
            real: 1,
            male: 1,
            alive: 1,
            indian: 0,
            american: 0.5,
            actor: 0,
            singer: 0,
            athlete: 0,
            youtuber: 0,
            politician: 0.5,
            business: 1,
            football: 0,
            cricket: 0,
            superhero: 0,
            marvel: 0,
            dc: 0,
            anime: 0,
            cartoon: 0,
            movie: 0,
            magic: 0,
            mask: 0,
            royal: 0
        }
    },


    /* =========================
       FICTIONAL CHARACTERS
    ========================== */

    {
        name: "Spider-Man",
        description: "Marvel superhero",
        image: "",
        traits: {
            real: 0,
            male: 1,
            alive: 1,
            indian: 0,
            american: 1,
            actor: 0,
            singer: 0,
            athlete: 0,
            youtuber: 0,
            politician: 0,
            business: 0,
            football: 0,
            cricket: 0,
            superhero: 1,
            marvel: 1,
            dc: 0,
            anime: 0,
            cartoon: 0.5,
            movie: 1,
            magic: 0,
            mask: 1,
            royal: 0
        }
    },


    {
        name: "Iron Man",
        description: "Marvel superhero",
        image: "",
        traits: {
            real: 0,
            male: 1,
            alive: 0,
            indian: 0,
            american: 1,
            actor: 0,
            singer: 0,
            athlete: 0,
            youtuber: 0,
            politician: 0,
            business: 1,
            football: 0,
            cricket: 0,
            superhero: 1,
            marvel: 1,
            dc: 0,
            anime: 0,
            cartoon: 0.5,
            movie: 1,
            magic: 0,
            mask: 1,
            royal: 0
        }
    },


    {
        name: "Thor",
        description: "Marvel superhero and God of Thunder",
        image: "",
        traits: {
            real: 0,
            male: 1,
            alive: 1,
            indian: 0,
            american: 0,
            actor: 0,
            singer: 0,
            athlete: 0,
            youtuber: 0,
            politician: 0,
            business: 0,
            football: 0,
            cricket: 0,
            superhero: 1,
            marvel: 1,
            dc: 0,
            anime: 0,
            cartoon: 0.5,
            movie: 1,
            magic: 1,
            mask: 0,
            royal: 1
        }
    },


    {
        name: "Batman",
        description: "DC superhero",
        image: "",
        traits: {
            real: 0,
            male: 1,
            alive: 1,
            indian: 0,
            american: 1,
            actor: 0,
            singer: 0,
            athlete: 0,
            youtuber: 0,
            politician: 0,
            business: 1,
            football: 0,
            cricket: 0,
            superhero: 1,
            marvel: 0,
            dc: 1,
            anime: 0,
            cartoon: 0.5,
            movie: 1,
            magic: 0,
            mask: 1,
            royal: 0
        }
    },


    {
        name: "Superman",
        description: "DC superhero",
        image: "",
        traits: {
            real: 0,
            male: 1,
            alive: 1,
            indian: 0,
            american: 0.5,
            actor: 0,
            singer: 0,
            athlete: 0,
            youtuber: 0,
            politician: 0,
            business: 0,
            football: 0,
            cricket: 0,
            superhero: 1,
            marvel: 0,
            dc: 1,
            anime: 0,
            cartoon: 0.5,
            movie: 1,
            magic: 0,
            mask: 0,
            royal: 0
        }
    },


    {
        name: "Wonder Woman",
        description: "DC superhero",
        image: "",
        traits: {
            real: 0,
            male: 0,
            alive: 1,
            indian: 0,
            american: 0,
            actor: 0,
            singer: 0,
            athlete: 0,
            youtuber: 0,
            politician: 0,
            business: 0,
            football: 0,
            cricket: 0,
            superhero: 1,
            marvel: 0,
            dc: 1,
            anime: 0,
            cartoon: 0.5,
            movie: 1,
            magic: 1,
            mask: 0,
            royal: 1
        }
    },


    {
        name: "Harry Potter",
        description: "Wizard from the Harry Potter series",
        image: "",
        traits: {
            real: 0,
            male: 1,
            alive: 1,
            indian: 0,
            american: 0,
            actor: 0,
            singer: 0,
            athlete: 0,
            youtuber: 0,
            politician: 0,
            business: 0,
            football: 0,
            cricket: 0,
            superhero: 0,
            marvel: 0,
            dc: 0,
            anime: 0,
            cartoon: 0,
            movie: 1,
            magic: 1,
            mask: 0,
            royal: 0
        }
    },


    {
        name: "Naruto Uzumaki",
        description: "Anime ninja",
        image: "",
        traits: {
            real: 0,
            male: 1,
            alive: 1,
            indian: 0,
            american: 0,
            actor: 0,
            singer: 0,
            athlete: 0,
            youtuber: 0,
            politician: 0,
            business: 0,
            football: 0,
            cricket: 0,
            superhero: 0.5,
            marvel: 0,
            dc: 0,
            anime: 1,
            cartoon: 1,
            movie: 0.5,
            magic: 1,
            mask: 0,
            royal: 0
        }
    },


    {
        name: "Goku",
        description: "Dragon Ball character",
        image: "",
        traits: {
            real: 0,
            male: 1,
            alive: 1,
            indian: 0,
            american: 0,
            actor: 0,
            singer: 0,
            athlete: 0,
            youtuber: 0,
            politician: 0,
            business: 0,
            football: 0,
            cricket: 0,
            superhero: 0.5,
            marvel: 0,
            dc: 0,
            anime: 1,
            cartoon: 1,
            movie: 0.5,
            magic: 1,
            mask: 0,
            royal: 0
        }
    },


    {
        name: "Mickey Mouse",
        description: "Disney animated character",
        image: "",
        traits: {
            real: 0,
            male: 1,
            alive: 1,
            indian: 0,
            american: 1,
            actor: 0,
            singer: 0.5,
            athlete: 0,
            youtuber: 0,
            politician: 0,
            business: 0,
            football: 0,
            cricket: 0,
            superhero: 0,
            marvel: 0,
            dc: 0,
            anime: 0,
            cartoon: 1,
            movie: 0.5,
            magic: 0.5,
            mask: 0,
            royal: 0
        }
    }

];


/* =========================================================
   ANSWER VALUES

   These values will be used by app.js.

   YES            = 1
   PROBABLY       = 0.75
   DON'T KNOW     = null
   PROBABLY NOT   = 0.25
   NO             = 0
========================================================= */

const answerValues = {

    yes: 1,

    probably: 0.75,

    unknown: null,

    "probably-not": 0.25,

    no: 0

};
