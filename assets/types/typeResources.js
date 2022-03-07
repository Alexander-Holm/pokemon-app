
function isTypeValid(type){
    if(typeResources[type] != null)
        return true;
    else return false;
}

// pokemon måste vara json-objektet från pokeapi
// Returnerar bara types som finns definierade i typeResources
export  function getTypes(pokemon){
    const types = [];

    let type1 = pokemon.types[0]?.type.name;
    if(isTypeValid(type1) == false){
        type1 = pokemon.past_types[0]?.types[0].type.name;
        if(isTypeValid(type1 == false))
            return types;
    }
    types.push(type1);

    let type2 = pokemon.types[1]?.type.name;    
    if(isTypeValid(type2))
        types.push(type2);

    return types;
};

// Bortkommenterad {color} är orginalfärg tagen från ikonerna
export const typeResources = {
    all: {
        color: "white",
        image: require("./icons/GO_All.webp"),
    },
    bug: {
        color: "#9ac42f",
        image: require("./icons/GO_Bug.webp"),
    },
    dragon:{
        color: "#0975bf",
        image: require("./icons/GO_Dragon.webp"),
    },
    electric:{
        color: "#f4d546",
        image: require("./icons/GO_Electric.webp"),
    },    
    fighting:{
        color: "#df4454",
        image: require("./icons/GO_Fighting.webp"),
    },
    fire:{
        color: "#fca052",
        image: require("./icons/GO_Fire.webp"),
    },
    flying:{
        color: "#94aee0",
        image: require("./icons/GO_Flying.webp"),
    },
    ghost:{
        color: "#5a6cb5",
        image: require("./icons/GO_Ghost.webp"),
    },
    grass:{
        // color: "#5ebc5a",
        color: "#4fa14c",
        image: require("./icons/GO_Grass.webp"),
    },
    ground:{
        color: "#d97c4b",
        image: require("./icons/GO_Ground.webp"),
    },
    ice:{
        color: "#7bd1c6",
        image: require("./icons/GO_Ice.webp"),
    },
    normal:{
        // color: "#9a9fa2",
        color: "#ababab",
        image: require("./icons/GO_Normal.webp"),
    },
    poison:{
        color: "#b364cd",
        image: require("./icons/GO_Poison.webp"),
    },
    psychic:{
        color: "#fc7378",
        image: require("./icons/GO_Psychic.webp"),
    },
    rock:{
        color: "#cfc28f",
        image: require("./icons/GO_Rock.webp"),
    },
    water:{
        color: "#549bd8",
        image: require("./icons/GO_Water.webp"),
    },
    
    // Inte gen-1    
    // dark:{
    //     color: "#646374",
    //     image: require("./icons/GO_Dark.webp"),
    // },
    // steel:{
    //     color: "#5491a0",
    //     image: require("./icons/GO_Steel.webp"),
    // },
    // fairy:{
    //     color: "#f4a1e4",
    //     image: require("./icons/GO_Fairy.webp"),
    // },
};