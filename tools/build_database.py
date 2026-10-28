import json
import re
import hashlib
from pathlib import Path


# ==========================================================
# FAMOUSGUESS DATABASE BUILDER
# ==========================================================

ROOT = Path(__file__).resolve().parent.parent

SOURCE_DIR = ROOT / "source_data"

OUTPUT_DIR = ROOT / "data" / "generated"

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


# ==========================================================
# SETTINGS
# ==========================================================

PACK_SIZE = 5000

SUPPORTED_TYPES = {
    "person",
    "fictional"
}


# ==========================================================
# TEXT HELPERS
# ==========================================================

def clean_text(value):
    if value is None:
        return ""

    return str(value).strip()


def slugify(value):
    value = clean_text(value).lower()

    value = re.sub(
        r"[^a-z0-9]+",
        "-",
        value
    )

    return value.strip("-")


def make_id(name, extra=""):
    base = slugify(name)

    fingerprint = hashlib.md5(
        f"{name}|{extra}".encode("utf-8")
    ).hexdigest()[:8]

    return f"{base}-{fingerprint}"


# ==========================================================
# NORMALIZATION
# ==========================================================

def normalize_list(value):
    if value is None:
        return []

    if isinstance(value, list):
        return [
            clean_text(item)
            for item in value
            if clean_text(item)
        ]

    value = clean_text(value)

    if not value:
        return []

    return [value]


# ==========================================================
# TRAIT HELPERS
# ==========================================================

def add_yes(character, trait):
    if trait not in character["yes"]:
        character["yes"].append(trait)


def add_no(character, trait):
    if trait not in character["no"]:
        character["no"].append(trait)


def add_maybe(character, trait):
    if (
        trait not in character["yes"]
        and trait not in character["no"]
        and trait not in character["maybe"]
    ):
        character["maybe"].append(trait)


# ==========================================================
# OCCUPATION MAP
# ==========================================================

OCCUPATION_TRAITS = {

    "actor": "actor",
    "actress": "actor",

    "film actor": "actor",
    "television actor": "actor",

    "singer": "singer",
    "musician": "musician",
    "rapper": "rapper",

    "comedian": "comedian",

    "film director": "director",
    "director": "director",

    "writer": "writer",
    "author": "author",
    "novelist": "author",

    "footballer": "footballer",
    "association football player": "footballer",

    "cricketer": "cricketer",

    "basketball player": "basketball",

    "tennis player": "tennis",

    "professional wrestler": "wrestler",
    "wrestler": "wrestler",

    "boxer": "boxer",

    "mixed martial artist": "mma",

    "racing driver": "racing",
    "formula one driver": "racing",

    "golfer": "golfer",

    "swimmer": "swimmer",

    "youtuber": "youtuber",
    "youtube personality": "youtuber",

    "streamer": "streamer",

    "businessperson": "business",
    "entrepreneur": "business",

    "computer scientist": "technology",
    "software engineer": "technology",

    "scientist": "scientist",
    "physicist": "scientist",
    "chemist": "scientist",
    "biologist": "scientist",

    "inventor": "inventor",

    "politician": "politician",

    "military officer": "military",

    "activist": "activist"
}


# ==========================================================
# NATIONALITY MAP
# ==========================================================

NATIONALITY_TRAITS = {

    "india": "indian",
    "indian": "indian",

    "united states": "american",
    "united states of america": "american",
    "american": "american",

    "united kingdom": "british",
    "british": "british",
    "england": "british",
    "english": "british",

    "canada": "canadian",
    "canadian": "canadian",

    "australia": "australian",
    "australian": "australian",

    "portugal": "portuguese",
    "portuguese": "portuguese",

    "argentina": "argentine",
    "argentine": "argentine",

    "brazil": "brazilian",
    "brazilian": "brazilian",

    "france": "french",
    "french": "french",

    "germany": "german",
    "german": "german",

    "spain": "spanish",
    "spanish": "spanish",

    "italy": "italian",
    "italian": "italian",

    "japan": "japanese",
    "japanese": "japanese",

    "south korea": "korean",
    "korean": "korean"
}


# ==========================================================
# SPORT TRAITS
# ==========================================================

SPORT_TRAITS = {
    "footballer",
    "cricketer",
    "basketball",
    "tennis",
    "wrestler",
    "boxer",
    "mma",
    "racing",
    "golfer",
    "swimmer"
}


# ==========================================================
# CREATOR TRAITS
# ==========================================================

CREATOR_TRAITS = {
    "youtuber",
    "streamer"
}


# ==========================================================
# ENTERTAINMENT TRAITS
# ==========================================================

ENTERTAINMENT_TRAITS = {
    "actor",
    "singer",
    "musician",
    "rapper",
    "comedian",
    "director"
}


# ==========================================================
# BUILD REAL PERSON
# ==========================================================

def build_person(raw):

    name = clean_text(
        raw.get("name")
    )

    if not name:
        return None

    description = clean_text(
        raw.get("description")
    )

    occupations = [
        item.lower()
        for item in normalize_list(
            raw.get("occupations")
        )
    ]

    nationalities = [
        item.lower()
        for item in normalize_list(
            raw.get("nationality")
        )
    ]

    gender = clean_text(
        raw.get("gender")
    ).lower()

    birth_year = raw.get(
        "birthYear"
    )

    death_year = raw.get(
        "deathYear"
    )

    image = clean_text(
        raw.get("image")
    )


    character = {

        "id": make_id(
            name,
            birth_year or ""
        ),

        "name": name,

        "description":
            description,

        "category":
            "Real Person",

        "image":
            image,

        "yes": [],

        "maybe": [],

        "no": []

    }


    # ------------------------------------------------------
    # REAL / FICTIONAL
    # ------------------------------------------------------

    add_yes(
        character,
        "real"
    )

    add_yes(
        character,
        "human"
    )

    add_no(
        character,
        "fictional"
    )


    # ------------------------------------------------------
    # GENDER
    # ------------------------------------------------------

    if gender == "male":

        add_yes(
            character,
            "male"
        )

        add_no(
            character,
            "female"
        )

    elif gender == "female":

        add_yes(
            character,
            "female"
        )

        add_no(
            character,
            "male"
        )


    # ------------------------------------------------------
    # ALIVE
    # ------------------------------------------------------

    if death_year:

        add_no(
            character,
            "alive"
        )

    else:

        add_yes(
            character,
            "alive"
        )


    # ------------------------------------------------------
    # BIRTH YEAR
    # ------------------------------------------------------

    try:

        year = int(
            birth_year
        )

        if year < 1950:

            add_yes(
                character,
                "bornBefore1950"
            )

        else:

            add_no(
                character,
                "bornBefore1950"
            )


        if year < 1980:

            add_yes(
                character,
                "bornBefore1980"
            )

        else:

            add_no(
                character,
                "bornBefore1980"
            )


        if year > 2000:

            add_yes(
                character,
                "bornAfter2000"
            )

        else:

            add_no(
                character,
                "bornAfter2000"
            )


        if year >= 1980:

            add_yes(
                character,
                "modern"
            )

    except (TypeError, ValueError):
        pass


    # ------------------------------------------------------
    # OCCUPATIONS
    # ------------------------------------------------------

    discovered_traits = set()


    for occupation in occupations:

        for phrase, trait in OCCUPATION_TRAITS.items():

            if phrase in occupation:

                discovered_traits.add(
                    trait
                )


    for trait in discovered_traits:

        add_yes(
            character,
            trait
        )


    # ------------------------------------------------------
    # BROAD CAREERS
    # ------------------------------------------------------

    if (
        discovered_traits
        & SPORT_TRAITS
    ):

        add_yes(
            character,
            "athlete"
        )


    if (
        discovered_traits
        & CREATOR_TRAITS
    ):

        add_yes(
            character,
            "creator"
        )


    if (
        discovered_traits
        & ENTERTAINMENT_TRAITS
    ):

        add_yes(
            character,
            "entertainer"
        )


    # ------------------------------------------------------
    # NATIONALITY
    # ------------------------------------------------------

    for nationality in nationalities:

        for phrase, trait in NATIONALITY_TRAITS.items():

            if phrase == nationality:

                add_yes(
                    character,
                    trait
                )


    return character


# ==========================================================
# BUILD FICTIONAL CHARACTER
# ==========================================================

def build_fictional(raw):

    name = clean_text(
        raw.get("name")
    )

    if not name:
        return None


    description = clean_text(
        raw.get("description")
    )


    source_traits = [
        slugify(item).replace("-", "")
        for item in normalize_list(
            raw.get("traits")
        )
    ]


    character = {

        "id": make_id(
            name,
            raw.get(
                "universe",
                ""
            )
        ),

        "name":
            name,

        "description":
            description,

        "category":
            "Fictional Character",

        "image":
            clean_text(
                raw.get("image")
            ),

        "yes": [
            "fictional"
        ],

        "maybe": [],

        "no": [
            "real"
        ]
    }


    gender = clean_text(
        raw.get("gender")
    ).lower()


    if gender == "male":

        add_yes(
            character,
            "male"
        )

        add_no(
            character,
            "female"
        )


    elif gender == "female":

        add_yes(
            character,
            "female"
        )

        add_no(
            character,
            "male"
        )


    # ------------------------------------------------------
    # COPY KNOWN TRAITS
    # ------------------------------------------------------

    known_question_ids = {
        "human",
        "superhero",
        "supervillain",
        "anime",
        "cartoon",
        "videoGame",
        "movieCharacter",
        "tvCharacter",
        "bookCharacter",
        "comicCharacter",
        "marvel",
        "dc",
        "disney",
        "starWars",
        "harryPotter",
        "pokemon",
        "dragonBall",
        "narutoUniverse",
        "onePiece",
        "minecraft",
        "mario",
        "sonic",
        "animal",
        "robot",
        "alien",
        "monster",
        "god",
        "wizard",
        "vampire",
        "zombie",
        "powers",
        "magic",
        "fly",
        "superStrength",
        "superSpeed",
        "teleport",
        "telepathy",
        "shapeShift",
        "regeneration",
        "elementalPowers",
        "mask",
        "cape",
        "armor",
        "helmet",
        "weapon",
        "sword",
        "glasses",
        "hero",
        "villain",
        "antihero",
        "mainCharacter",
        "royal",
        "leader",
        "detective",
        "student"
    }


    normalized_lookup = {
        slugify(item).replace("-", ""):
            item
        for item in known_question_ids
    }


    for source_trait in source_traits:

        if source_trait in normalized_lookup:

            add_yes(
                character,
                normalized_lookup[
                    source_trait
                ]
            )


    # ------------------------------------------------------
    # UNIVERSE
    # ------------------------------------------------------

    universe = clean_text(
        raw.get("universe")
    ).lower()


    universe_mapping = {

        "marvel":
            "marvel",

        "dc":
            "dc",

        "disney":
            "disney",

        "star wars":
            "starWars",

        "harry potter":
            "harryPotter",

        "pokemon":
            "pokemon",

        "dragon ball":
            "dragonBall",

        "naruto":
            "narutoUniverse",

        "one piece":
            "onePiece",

        "minecraft":
            "minecraft",

        "mario":
            "mario",

        "sonic":
            "sonic"
    }


    if universe in universe_mapping:

        add_yes(
            character,
            universe_mapping[
                universe
            ]
        )


    return character


# ==========================================================
# BUILD CHARACTER
# ==========================================================

def build_character(raw):

    character_type = clean_text(
        raw.get("type")
    ).lower()


    if character_type == "person":

        return build_person(
            raw
        )


    if character_type == "fictional":

        return build_fictional(
            raw
        )


    return None


# ==========================================================
# LOAD SOURCE FILES
# ==========================================================

def load_source_records():

    records = []


    if not SOURCE_DIR.exists():

        print(
            "source_data folder does not exist."
        )

        return records


    for path in SOURCE_DIR.rglob(
        "*.json"
    ):

        print(
            f"Reading {path.name}"
        )


        try:

            with open(
                path,
                "r",
                encoding="utf-8"
            ) as file:

                data = json.load(
                    file
                )


            if isinstance(data, list):

                records.extend(
                    data
                )


            elif isinstance(data, dict):

                if isinstance(
                    data.get("characters"),
                    list
                ):

                    records.extend(
                        data["characters"]
                    )

                else:

                    records.append(
                        data
                    )


        except Exception as error:

            print(
                f"ERROR reading {path}: {error}"
            )


    return records


# ==========================================================
# REMOVE DUPLICATES
# ==========================================================

def deduplicate(characters):

    unique = {}

    for character in characters:

        key = character["id"]

        if key not in unique:

            unique[key] = character

            continue


        # Keep record with more knowledge.

        old = unique[key]

        old_knowledge = (
            len(old["yes"])
            +
            len(old["maybe"])
            +
            len(old["no"])
        )

        new_knowledge = (
            len(character["yes"])
            +
            len(character["maybe"])
            +
            len(character["no"])
        )


        if (
            new_knowledge >
            old_knowledge
        ):

            unique[key] = character


    return list(
        unique.values()
    )


# ==========================================================
# SAVE PACKS
# ==========================================================

def save_packs(characters):

    # Delete old generated packs.

    for old_file in OUTPUT_DIR.glob(
        "characters-*.json"
    ):

        old_file.unlink()


    packs = []


    for start in range(
        0,
        len(characters),
        PACK_SIZE
    ):

        pack = characters[
            start:
            start + PACK_SIZE
        ]


        pack_number = (
            start //
            PACK_SIZE
        ) + 1


        filename = (
            f"characters-"
            f"{pack_number:04d}.json"
        )


        path = (
            OUTPUT_DIR /
            filename
        )


        with open(
            path,
            "w",
            encoding="utf-8"
        ) as file:

            json.dump(
                pack,
                file,
                ensure_ascii=False,
                separators=(",", ":")
            )


        packs.append({

            "file":
                filename,

            "characters":
                len(pack)

        })


        print(
            f"Created {filename}: "
            f"{len(pack):,} characters"
        )


    return packs


# ==========================================================
# SAVE INDEX
# ==========================================================

def save_index(
    characters,
    packs
):

    index = {

        "version":
            1,

        "totalCharacters":
            len(characters),

        "packSize":
            PACK_SIZE,

        "totalPacks":
            len(packs),

        "packs":
            packs

    }


    path = (
        OUTPUT_DIR /
        "index.json"
    )


    with open(
        path,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            index,
            file,
            ensure_ascii=False,
            indent=2
        )


# ==========================================================
# MAIN
# ==========================================================

def main():

    print()
    print("=" * 60)
    print("FAMOUSGUESS DATABASE BUILDER")
    print("=" * 60)
    print()


    raw_records =
        load_source_records()


    print()
    print(
        f"Raw records: "
        f"{len(raw_records):,}"
    )


    characters = []


    for raw in raw_records:

        try:

            character =
                build_character(
                    raw
                )


            if character:

                characters.append(
                    character
                )


        except Exception as error:

            print(
                "Failed record:",
                raw.get(
                    "name",
                    "Unknown"
                ),
                error
            )


    characters =
        deduplicate(
            characters
        )


    characters.sort(
        key=lambda item:
            item["name"].lower()
    )


    print(
        f"Valid unique characters: "
        f"{len(characters):,}"
    )


    packs =
        save_packs(
            characters
        )


    save_index(
        characters,
        packs
    )


    print()
    print("=" * 60)
    print(
        f"DONE — {len(characters):,} "
        "characters generated"
    )
    print("=" * 60)
    print()


if __name__ == "__main__":
    main()
