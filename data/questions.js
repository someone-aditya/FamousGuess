/* =========================================================
   FAMOUSGUESS — QUESTIONS.JS
   Large adaptive question bank
========================================================= */

const questions = [

    /* =====================================================
       CORE IDENTITY
    ===================================================== */

    { id: "real", text: "Is your character a real person?", group: "core", priority: 10 },
    { id: "fictional", text: "Is your character fictional?", group: "core", priority: 10 },

    { id: "male", text: "Is your character male?", group: "core", priority: 10 },
    { id: "female", text: "Is your character female?", group: "core", priority: 9 },

    { id: "human", text: "Is your character human?", group: "core", priority: 9 },
    { id: "alive", text: "Is your character alive today?", group: "core", priority: 8 },

    { id: "historical", text: "Is your character mainly known as a historical figure?", group: "core", priority: 7 },

    { id: "modern", text: "Did your character become famous mainly in the 21st century?", group: "era", priority: 7 },

    { id: "bornBefore1950", text: "Was this person born before 1950?", group: "era", priority: 6 },
    { id: "bornBefore1980", text: "Was this person born before 1980?", group: "era", priority: 6 },
    { id: "bornAfter2000", text: "Was this person born after 2000?", group: "era", priority: 6 },


    /* =====================================================
       REAL PERSON — GENERAL CAREER
    ===================================================== */

    { id: "entertainer", text: "Is this person mainly famous for entertainment?", group: "career", priority: 9 },

    { id: "actor", text: "Is this person famous for acting?", group: "career", priority: 9 },

    { id: "singer", text: "Is this person famous for singing or music?", group: "career", priority: 9 },

    { id: "rapper", text: "Is this person known for rap music?", group: "music", priority: 7 },

    { id: "musician", text: "Does this person play or create music professionally?", group: "music", priority: 7 },

    { id: "comedian", text: "Is this person famous for comedy?", group: "career", priority: 7 },

    { id: "director", text: "Is this person a film or television director?", group: "career", priority: 6 },

    { id: "writer", text: "Is this person famous for writing?", group: "career", priority: 7 },

    { id: "author", text: "Is this person a well-known book author?", group: "career", priority: 7 },

    { id: "athlete", text: "Is this person famous for sports?", group: "career", priority: 10 },

    { id: "creator", text: "Is this person mainly famous from the internet?", group: "career", priority: 9 },

    { id: "business", text: "Is this person famous for business or entrepreneurship?", group: "career", priority: 8 },

    { id: "technology", text: "Is this person strongly associated with technology?", group: "career", priority: 8 },

    { id: "scientist", text: "Is this person famous for science?", group: "career", priority: 8 },

    { id: "inventor", text: "Is this person famous for inventing something?", group: "career", priority: 6 },

    { id: "politician", text: "Is this person famous for politics?", group: "career", priority: 9 },

    { id: "military", text: "Is this person famous for military leadership?", group: "career", priority: 6 },

    { id: "activist", text: "Is this person known for activism?", group: "career", priority: 6 },

    { id: "royalReal", text: "Is this real person a member of royalty?", group: "career", priority: 7 },


    /* =====================================================
       INTERNET / CREATORS
    ===================================================== */

    { id: "youtuber", text: "Is this person famous on YouTube?", group: "creator", priority: 9 },

    { id: "streamer", text: "Is this person famous for livestreaming?", group: "creator", priority: 8 },

    { id: "gamer", text: "Is this person known for gaming content?", group: "creator", priority: 8 },

    { id: "vlogger", text: "Is this person known for vlogs?", group: "creator", priority: 6 },

    { id: "internetComedy", text: "Is this person known for comedy content online?", group: "creator", priority: 6 },

    { id: "techCreator", text: "Is this person known for technology content online?", group: "creator", priority: 6 },

    { id: "gamingYouTuber", text: "Is this person mainly a gaming YouTuber?", group: "creator", priority: 8 },

    { id: "indianCreator", text: "Is this internet creator from India?", group: "creator", priority: 8 },


    /* =====================================================
       SPORTS
    ===================================================== */

    { id: "footballer", text: "Is this person famous for football?", group: "sports", priority: 10 },

    { id: "cricketer", text: "Is this person famous for cricket?", group: "sports", priority: 10 },

    { id: "basketball", text: "Is this person famous for basketball?", group: "sports", priority: 9 },

    { id: "tennis", text: "Is this person famous for tennis?", group: "sports", priority: 9 },

    { id: "wrestler", text: "Is this person known for professional wrestling?", group: "sports", priority: 8 },

    { id: "boxer", text: "Is this person famous for boxing?", group: "sports", priority: 8 },

    { id: "mma", text: "Is this person famous for mixed martial arts?", group: "sports", priority: 8 },

    { id: "racing", text: "Is this person famous for motor racing?", group: "sports", priority: 8 },

    { id: "golfer", text: "Is this person famous for golf?", group: "sports", priority: 7 },

    { id: "swimmer", text: "Is this person famous for swimming?", group: "sports", priority: 7 },

    { id: "olympian", text: "Is this person well known for competing at the Olympics?", group: "sports", priority: 7 },


    /* =====================================================
       FOOTBALL DETAILS
    ===================================================== */

    { id: "footballForward", text: "Does this footballer mainly play as an attacker or forward?", group: "football", priority: 7 },

    { id: "footballGoalkeeper", text: "Is this footballer a goalkeeper?", group: "football", priority: 8 },

    { id: "footballDefender", text: "Does this footballer mainly play in defence?", group: "football", priority: 7 },

    { id: "footballMidfielder", text: "Does this footballer mainly play in midfield?", group: "football", priority: 7 },

    { id: "ballonDor", text: "Has this person won the Ballon d'Or?", group: "football", priority: 8 },

    { id: "worldCupWinner", text: "Has this person won the FIFA World Cup?", group: "football", priority: 8 },

    { id: "premierLeague", text: "Has this footballer played in the English Premier League?", group: "football", priority: 6 },

    { id: "laLiga", text: "Has this footballer played in La Liga?", group: "football", priority: 6 },

    { id: "realMadrid", text: "Has this footballer played for Real Madrid?", group: "football", priority: 7 },

    { id: "barcelona", text: "Has this footballer played for Barcelona?", group: "football", priority: 7 },


    /* =====================================================
       CRICKET DETAILS
    ===================================================== */

    { id: "batsman", text: "Is this cricketer mainly known for batting?", group: "cricket", priority: 8 },

    { id: "bowler", text: "Is this cricketer mainly known for bowling?", group: "cricket", priority: 8 },

    { id: "allRounder", text: "Is this cricketer known as an all-rounder?", group: "cricket", priority: 8 },

    { id: "wicketkeeper", text: "Is this cricketer a wicketkeeper?", group: "cricket", priority: 9 },

    { id: "cricketCaptain", text: "Has this person captained their national cricket team?", group: "cricket", priority: 7 },

    { id: "ipl", text: "Has this cricketer played in the IPL?", group: "cricket", priority: 6 },

    { id: "worldCupCricket", text: "Has this person won a senior Cricket World Cup?", group: "cricket", priority: 7 },


    /* =====================================================
       FILM / TELEVISION
    ===================================================== */

    { id: "movieActor", text: "Is this person mainly known for movies?", group: "acting", priority: 8 },

    { id: "tvActor", text: "Is this person strongly associated with television?", group: "acting", priority: 7 },

    { id: "bollywood", text: "Is this person strongly associated with Hindi cinema?", group: "acting", priority: 9 },

    { id: "hollywood", text: "Is this person strongly associated with Hollywood?", group: "acting", priority: 9 },

    { id: "southIndianCinema", text: "Is this person strongly associated with South Indian cinema?", group: "acting", priority: 8 },

    { id: "actionActor", text: "Is this person particularly famous for action roles?", group: "acting", priority: 6 },

    { id: "comedyActor", text: "Is this person particularly famous for comedy roles?", group: "acting", priority: 6 },

    { id: "superheroActor", text: "Is this person famous for playing a superhero?", group: "acting", priority: 7 },

    { id: "oscarWinner", text: "Has this person won an acting Academy Award?", group: "acting", priority: 7 },


    /* =====================================================
       MUSIC
    ===================================================== */

    { id: "popSinger", text: "Is this person mainly known for pop music?", group: "music", priority: 7 },

    { id: "rockArtist", text: "Is this person associated with rock music?", group: "music", priority: 7 },

    { id: "hipHop", text: "Is this person associated with hip-hop?", group: "music", priority: 7 },

    { id: "kpop", text: "Is this person associated with K-pop?", group: "music", priority: 8 },

    { id: "musicGroup", text: "Is this person famous as a member of a music group or band?", group: "music", priority: 7 },

    { id: "soloArtist", text: "Is this person mainly known as a solo music artist?", group: "music", priority: 6 },

    { id: "grammyWinner", text: "Has this person won a Grammy Award?", group: "music", priority: 6 },


    /* =====================================================
       NATIONALITY / REGION
    ===================================================== */

    { id: "indian", text: "Is this person from India?", group: "location", priority: 9 },

    { id: "american", text: "Is this person from the United States?", group: "location", priority: 8 },

    { id: "british", text: "Is this person from the United Kingdom?", group: "location", priority: 8 },

    { id: "canadian", text: "Is this person from Canada?", group: "location", priority: 6 },

    { id: "australian", text: "Is this person from Australia?", group: "location", priority: 6 },

    { id: "portuguese", text: "Is this person from Portugal?", group: "location", priority: 6 },

    { id: "argentine", text: "Is this person from Argentina?", group: "location", priority: 6 },

    { id: "brazilian", text: "Is this person from Brazil?", group: "location", priority: 6 },

    { id: "french", text: "Is this person from France?", group: "location", priority: 6 },

    { id: "german", text: "Is this person from Germany?", group: "location", priority: 6 },

    { id: "spanish", text: "Is this person from Spain?", group: "location", priority: 6 },

    { id: "italian", text: "Is this person from Italy?", group: "location", priority: 6 },

    { id: "japanese", text: "Is this person or character associated with Japan?", group: "location", priority: 7 },

    { id: "korean", text: "Is this person from South Korea?", group: "location", priority: 7 },


    /* =====================================================
       FICTION — ORIGIN
    ===================================================== */

    { id: "superhero", text: "Is your character a superhero?", group: "fiction", priority: 10 },

    { id: "supervillain", text: "Is your character mainly a supervillain?", group: "fiction", priority: 9 },

    { id: "anime", text: "Is your character from anime or manga?", group: "fiction", priority: 10 },

    { id: "cartoon", text: "Is your character mainly known from animation?", group: "fiction", priority: 9 },

    { id: "videoGame", text: "Did your character originate from a video game?", group: "fiction", priority: 10 },

    { id: "movieCharacter", text: "Is your character strongly associated with movies?", group: "fiction", priority: 8 },

    { id: "tvCharacter", text: "Is your character strongly associated with a TV series?", group: "fiction", priority: 8 },

    { id: "bookCharacter", text: "Did your character originate from books or literature?", group: "fiction", priority: 8 },

    { id: "comicCharacter", text: "Did your character originate from comics?", group: "fiction", priority: 8 },


    /* =====================================================
       FICTION — UNIVERSES
    ===================================================== */

    { id: "marvel", text: "Is your character associated with Marvel?", group: "universe", priority: 10 },

    { id: "dc", text: "Is your character associated with DC?", group: "universe", priority: 10 },

    { id: "disney", text: "Is your character associated with Disney?", group: "universe", priority: 9 },

    { id: "starWars", text: "Is your character from Star Wars?", group: "universe", priority: 9 },

    { id: "harryPotter", text: "Is your character from the Harry Potter universe?", group: "universe", priority: 9 },

    { id: "pokemon", text: "Is your character associated with Pokémon?", group: "universe", priority: 9 },

    { id: "dragonBall", text: "Is your character from Dragon Ball?", group: "universe", priority: 9 },

    { id: "narutoUniverse", text: "Is your character from Naruto?", group: "universe", priority: 9 },

    { id: "onePiece", text: "Is your character from One Piece?", group: "universe", priority: 9 },

    { id: "minecraft", text: "Is your character associated with Minecraft?", group: "universe", priority: 8 },

    { id: "mario", text: "Is your character associated with the Mario series?", group: "universe", priority: 8 },

    { id: "sonic", text: "Is your character associated with Sonic the Hedgehog?", group: "universe", priority: 8 },


    /* =====================================================
       FICTION — SPECIES
    ===================================================== */

    { id: "animal", text: "Is your character an animal or animal-like creature?", group: "species", priority: 8 },

    { id: "robot", text: "Is your character a robot or machine?", group: "species", priority: 8 },

    { id: "alien", text: "Is your character an alien?", group: "species", priority: 8 },

    { id: "monster", text: "Is your character a monster or creature?", group: "species", priority: 7 },

    { id: "god", text: "Is your character a god or deity?", group: "species", priority: 7 },

    { id: "wizard", text: "Is your character a wizard, witch, or magical user?", group: "species", priority: 8 },

    { id: "vampire", text: "Is your character a vampire?", group: "species", priority: 7 },

    { id: "zombie", text: "Is your character a zombie or undead creature?", group: "species", priority: 6 },


    /* =====================================================
       POWERS
    ===================================================== */

    { id: "powers", text: "Does your character have superhuman or supernatural powers?", group: "powers", priority: 9 },

    { id: "magic", text: "Can your character use magic?", group: "powers", priority: 8 },

    { id: "fly", text: "Can your character fly without using a normal aircraft?", group: "powers", priority: 7 },

    { id: "superStrength", text: "Does your character have superhuman strength?", group: "powers", priority: 7 },

    { id: "superSpeed", text: "Does your character have superhuman speed?", group: "powers", priority: 7 },

    { id: "teleport", text: "Can your character teleport?", group: "powers", priority: 6 },

    { id: "telepathy", text: "Can your character read or influence minds?", group: "powers", priority: 6 },

    { id: "shapeShift", text: "Can your character change their physical form?", group: "powers", priority: 6 },

    { id: "regeneration", text: "Can your character heal unusually quickly?", group: "powers", priority: 6 },

    { id: "elementalPowers", text: "Does your character control an element such as fire, water, ice, or lightning?", group: "powers", priority: 7 },


    /* =====================================================
       APPEARANCE
    ===================================================== */

    { id: "mask", text: "Does your character commonly wear a mask or conceal their identity?", group: "appearance", priority: 8 },

    { id: "cape", text: "Is your character famous for wearing a cape?", group: "appearance", priority: 7 },

    { id: "armor", text: "Does your character commonly wear armor?", group: "appearance", priority: 7 },

    { id: "helmet", text: "Does your character commonly wear a helmet?", group: "appearance", priority: 6 },

    { id: "weapon", text: "Is your character strongly associated with a weapon?", group: "appearance", priority: 7 },

    { id: "sword", text: "Is your character strongly associated with a sword?", group: "appearance", priority: 7 },

    { id: "glasses", text: "Is your character well known for wearing glasses?", group: "appearance", priority: 5 },

    { id: "nonHumanSkin", text: "Does your character have an unusual non-human skin color?", group: "appearance", priority: 5 },


    /* =====================================================
       CHARACTER ROLE
    ===================================================== */

    { id: "hero", text: "Is your character mainly considered a hero?", group: "role", priority: 8 },

    { id: "villain", text: "Is your character mainly considered a villain?", group: "role", priority: 8 },

    { id: "antihero", text: "Is your character commonly considered an antihero?", group: "role", priority: 6 },

    { id: "mainCharacter", text: "Is your character one of the main protagonists of their story?", group: "role", priority: 7 },

    { id: "royal", text: "Is your fictional character royalty?", group: "role", priority: 6 },

    { id: "leader", text: "Is your character a leader of a major group or team?", group: "role", priority: 6 },

    { id: "detective", text: "Is your character a detective or investigator?", group: "role", priority: 7 },

    { id: "student", text: "Is your character a student for a significant part of their story?", group: "role", priority: 5 },


    /* =====================================================
       VIDEO GAMES
    ===================================================== */

    { id: "nintendo", text: "Is your character strongly associated with Nintendo?", group: "games", priority: 8 },

    { id: "playstation", text: "Is your character strongly associated with PlayStation?", group: "games", priority: 7 },

    { id: "xbox", text: "Is your character strongly associated with Xbox?", group: "games", priority: 7 },

    { id: "pcGame", text: "Is your character strongly associated with PC gaming?", group: "games", priority: 6 },

    { id: "shooterGame", text: "Is your character from a shooting game?", group: "games", priority: 7 },

    { id: "battleRoyale", text: "Is your character associated with a battle royale game?", group: "games", priority: 7 },

    { id: "sandboxGame", text: "Is your character associated with a sandbox game?", group: "games", priority: 6 },


    /* =====================================================
       ANIME DETAILS
    ===================================================== */

    { id: "animeHero", text: "Is your character one of the main heroes of their anime?", group: "anime", priority: 7 },

    { id: "animeVillain", text: "Is your character primarily an anime villain?", group: "anime", priority: 7 },

    { id: "animeFighter", text: "Is fighting a major part of your character's story?", group: "anime", priority: 7 },

    { id: "animeStudent", text: "Is your anime character a student?", group: "anime", priority: 6 },

    { id: "animePowers", text: "Does your anime character have supernatural abilities?", group: "anime", priority: 8 },


    /* =====================================================
       BROAD IDENTIFIERS
    ===================================================== */

    { id: "famousWorldwide", text: "Is your character or person famous worldwide?", group: "general", priority: 5 },

    { id: "knownByNickname", text: "Is this person or character commonly known by a nickname or alias?", group: "general", priority: 5 },

    { id: "teamMember", text: "Is your character or person strongly associated with a team or group?", group: "general", priority: 5 },

    { id: "familyFamous", text: "Are other members of this person's family also famous?", group: "general", priority: 4 }

];


console.log(
    `🧠 FamousGuess loaded ${questions.length} questions`
);
