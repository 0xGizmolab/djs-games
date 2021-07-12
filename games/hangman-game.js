const discord = require('discord.js');

const possible_themes = ['sport', 'coding', 'nature', 'popular game', 'phone brand', 'color', 'camping', 'music instrument']

const sport_theme = ['tennis', 'football', 'rugby', 'golf', 'hockey', 'badminton', 'boxing', 'cricket', 'karate', 'judo', 'baseball', 'basketball', 'dodgeball', 'cycling']
const coding_theme = ['javascript', 'html', 'css', 'python', 'typescript', 'sql', 'java', 'json', 'php']
const nature_theme = ['tree', 'forest', 'wildlife', 'river', 'island', 'hill', 'animal', 'plant', 'rock', 'waterfall', 'grass', 'flower', 'summer', 'sun', 'bush', 'jungle']
const games_theme = ['minecraft', 'grand theft auto', 'fortnite', 'counter strike', 'apex legends', 'rocket league', 'overwatch', 'roblox', 'call of duty', 'ark', 'among us', 'mario', 'star wars']
const phone_theme = ['samsung', 'iphone', 'oppo', 'huawei', 'nokia', 'xiaomi', 'vivo', 'lg', 'lenovo', 'oneplus', 'sony', 'asus']
const color_theme = ['red', 'blue', 'green', 'cyan', 'black', 'white', 'pink', 'purple', 'gray', 'brown', 'dark green', 'light green', 'dark blue', 'light blue', 'dark red', 'light red', 'magenta', 'gold', 'silver']
const camping_theme = ['marshmellow', 'barbeque', 'sticks', 'tent', 'campfire', 'camper', 'caravan', 'flashlight', 'fishing', 'insect', 'park', 'outdoors', 'walking', 'trip']
const music_theme = ['keyboard', 'piano', 'guitar', 'banjo', 'saxophone', 'clarinet', 'horn', 'pipes', 'drums', 'violin', 'flute', 'trumpet', 'harp', 'trumpet', 'voice']

const letterEmojisMap = {
    "🇦": "A", "🇧": "B", "🇨": "C", "🇩": "D", "🇪": "E",
    "🇫": "F", "🇬": "G", "🇭": "H", "🇮": "I", "🇯": "J", "🇰": "K", "🇱": "L",
    "🇲": "M", "🇳": "N", "🇴": "O","🇵": "P", "🇶": "Q", "🇷": "R", "🇸": "S", 
    "🇹": "T", "🇺": "U", "🇻": "V", "🇼": "W", "🇽": "X", "🇾": "Y", "🇿": "Z"
}

class HangMan {


    startGame = async(message) => {

        const theme = possible_themes[Math.floor(Math.random() * possible_themes.length)]

        let words;
        if(theme === 'sport') words = sport_theme
        if(theme === 'coding') words = coding_theme
        if(theme === 'nature') words = nature_theme
        if(theme === 'popular game') words = games_theme
        if(theme === 'phone brand') words = phone_theme
        if(theme === 'color') words = color_theme
        if(theme === 'camping') words = camping_theme
        if(theme === 'music instrument') words = music_theme

        const word = words[Math.floor(Math.random() * words.length)]

        let guessed = [];
        let wrongs = 0;

        const embed = new discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`Hangman Game`)
        .setDescription("```" 
        + "|‾‾‾‾‾‾|   \n|     " 
        + (wrongs > 0 ? "🎩" : " ") 
        + "   \n|     " 
        + (wrongs > 1 ? "😟" : " ")
        + "   \n|     "
        + (wrongs > 2 ? "👕" : " ")
        + "   \n|     "
        + (wrongs > 3 ? "🩳" : " ")
        + "   \n|    "
        + (wrongs > 4 ? "👞👞" : " ")
        + "   \n|     \n|__________\n\n"
        + word.split("").map(l => guessed.includes(l) ? l : "_").join(" ")
        + "```")
        .addField(`Letters Guessed`, '\u200b')
        .addField(`The theme is...`, `A ${theme}!`)
        .addField(`How to play?`, `React to this message with a letter emoji! Example: 🇦, 🇧`)
        const gameMessage = await message.channel.send(embed)

        const filter = (reaction, user) => ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯", "🇰", "🇱", "🇲", "🇳", "🇴", "🇵", "🇶", "🇷", "🇸", "🇹", "🇺", "🇻", "🇼", "🇽", "🇾", "🇿"].includes(reaction.emoji.name)

        const gameCollector = gameMessage.createReactionCollector(filter);

        gameCollector.on("collect", async (reaction, user) => {

            reaction.message.reactions.cache.get(reaction.emoji.name).remove();

            if(!guessed.includes(letterEmojisMap[reaction.emoji.name])) {

                guessed.push(letterEmojisMap[reaction.emoji.name])

                if(word.toUpperCase().indexOf(letterEmojisMap[reaction.emoji.name]) == -1) {
                    wrongs++

                    if(wrongs == 6) {
                    
                        gameCollector.stop()
                        const stopEmbed = new discord.MessageEmbed()
                        .setColor("RED")
                        .setTitle(`Hangman Game`)
                        .setDescription("```" 
                        + "|‾‾‾‾‾‾|   \n|     " 
                        + (wrongs > 0 ? "🎩" : " ") 
                        + "   \n|     " 
                        + (wrongs > 1 ? "😟" : " ")
                        + "   \n|     "
                        + (wrongs > 2 ? "👕" : " ")
                        + "   \n|     "
                        + (wrongs > 3 ? "🩳" : " ")
                        + "   \n|    "
                        + (wrongs > 4 ? "👞👞" : " ")
                        + "   \n|     \n|__________\n\n"
                        + word.toUpperCase().split("").map(l => guessed.includes(l) ? l : "_").join(" ")
                        + "```")
                        .addField(`Letters Guessed`, guessed.join(" "))
                        .addField(`The theme is...`, `A ${theme}!`)
                        .addField(`How to play?`, `React to this message with a letter emoji! Example: 🇦, 🇧`)
                        .addField(`Game Over`, `You losed this Hangman Game! The word was... **${word}**`)
                        return gameMessage.edit(stopEmbed)
                    }
                } else if(!word.toUpperCase().split("").map(l => guessed.includes(l) ? l : "_").includes("_")) {

                    gameCollector.stop()
                        const winEmbed = new discord.MessageEmbed()
                        .setColor("GREEN")
                        .setTitle(`Hangman Game`)
                        .setDescription("```" 
                        + "|‾‾‾‾‾‾|   \n|     " 
                        + (wrongs > 0 ? "🎩" : " ") 
                        + "   \n|     " 
                        + (wrongs > 1 ? "😟" : " ")
                        + "   \n|     "
                        + (wrongs > 2 ? "👕" : " ")
                        + "   \n|     "
                        + (wrongs > 3 ? "🩳" : " ")
                        + "   \n|    "
                        + (wrongs > 4 ? "👞👞" : " ")
                        + "   \n|     \n|__________\n\n"
                        + word.toUpperCase().split("").map(l => guessed.includes(l) ? l : "_").join(" ")
                        + "```")
                        .addField(`Letters Guessed`, guessed.join(" "))
                        .addField(`The theme is...`, `A ${theme}!`)
                        .addField(`How to play?`, `React to this message with a letter emoji! Example: 🇦, 🇧`)
                        .addField(`Game Over`, `You winned this Hangman Game! The word was... **${word}**`)
                        return gameMessage.edit(winEmbed)
                }

            }

            const editEmbed = new discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`Hangman Game`)
            .setDescription("```" 
            + "|‾‾‾‾‾‾|   \n|     " 
            + (wrongs > 0 ? "🎩" : " ") 
            + "   \n|     " 
            + (wrongs > 1 ? "😟" : " ")
            + "   \n|     "
            + (wrongs > 2 ? "👕" : " ")
            + "   \n|     "
            + (wrongs > 3 ? "🩳" : " ")
            + "   \n|    "
            + (wrongs > 4 ? "👞👞" : " ")
            + "   \n|     \n|__________\n\n"
            + word.toUpperCase().split("").map(l => guessed.includes(l) ? l : "_").join(" ")
            + "```")
            .addField(`Letters Guessed`, guessed.length == 0 ? '\u200b' : guessed.join(" "))
            .addField(`The theme is...`, `A ${theme}!`)
            .addField(`How to play?`, `React to this message with a letter emoji! Example: 🇦, 🇧`)
            gameMessage.edit(editEmbed)

        })
    }
}

module.exports = HangMan;