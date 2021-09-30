const { MessageEmbed } = require('discord.js');

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
    "🇲": "M", "🇳": "N", "🇴": "O", "🇵": "P", "🇶": "Q", "🇷": "R", "🇸": "S",
    "🇹": "T", "🇺": "U", "🇻": "V", "🇼": "W", "🇽": "X", "🇾": "Y", "🇿": "Z"
}

class HangMan {
    constructor(options) {
        if (!options.message) throw new TypeError('Missing argument: message')
        this.message = options.message;
        this.theme = options.theme || possible_themes[Math.floor(Math.random() * possible_themes.length)]
        this.embedColor = options.embedColor || 'RANDOM'
        this.hangManHat = options.hangManHat || '🎩'
        this.hangManHead = options.hangManHead || '😟'
        this.hangManShirt = options.hangManShirt || '👕'
        this.hangManPants = options.hangManPants || '🩳'
        this.hangManBoots = options.hangManBoots || '👞👞'


    }


    start = async () => {

        const theme = this.theme

        let words;
        if (theme === 'sport') words = sport_theme
        if (theme === 'coding') words = coding_theme
        if (theme === 'nature') words = nature_theme
        if (theme === 'popular game') words = games_theme
        if (theme === 'phone brand') words = phone_theme
        if (theme === 'color') words = color_theme
        if (theme === 'camping') words = camping_theme
        if (theme === 'music instrument') words = music_theme

        const word = words[Math.floor(Math.random() * words.length)]

        let guessed = [];
        let wrongs = 0;

        const embed = new MessageEmbed()
            .setColor(this.embedColor)
            .setTitle(`Hangman Game`)
            .setDescription("```"
                + "|‾‾‾‾‾‾|   \n|     "
                + (wrongs > 0 ? this.hangManHat : " ")
                + "   \n|     "
                + (wrongs > 1 ? this.hangManHead : " ")
                + "   \n|     "
                + (wrongs > 2 ? this.hangManShirt : " ")
                + "   \n|     "
                + (wrongs > 3 ? this.hangManPants : " ")
                + "   \n|    "
                + (wrongs > 4 ? this.hangManBoots : " ")
                + "   \n|     \n|__________\n\n"
                + word.split("").map(l => guessed.includes(l) ? l : "_").join(" ")
                + "```")
            .addField(`Letters Guessed`, '\u200b')
            .addField(`The theme is...`, `A ${theme}!`)
            .addField(`How to play?`, `React to this message with a letter emoji! Example: 🇦, 🇧`)
        const gameMessage = await this.message.channel.send({ embeds: [embed] })

        const filter = (reaction, user) => ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯", "🇰", "🇱", "🇲", "🇳", "🇴", "🇵", "🇶", "🇷", "🇸", "🇹", "🇺", "🇻", "🇼", "🇽", "🇾", "🇿"].includes(reaction.emoji.name) && user.id === this.message.author.id

        const gameCollector = gameMessage.createReactionCollector({ filter });

        gameCollector.on("collect", async (reaction, user) => {

            if (user.id != this.message.author.id) {
                reaction.users.remove(user)
                return
            }
            reaction.message.reactions.cache.get(reaction.emoji.name).remove();

            if (!guessed.includes(letterEmojisMap[reaction.emoji.name])) {

                guessed.push(letterEmojisMap[reaction.emoji.name])

                if (word.toUpperCase().indexOf(letterEmojisMap[reaction.emoji.name]) == -1) {
                    wrongs++

                    if (wrongs == 6) {

                        gameCollector.stop()
                        const stopEmbed = new MessageEmbed()
                            .setColor(this.embedColor)
                            .setTitle(`Hangman Game`)
                            .setDescription("```"
                                + "|‾‾‾‾‾‾|   \n|     "
                                + (wrongs > 0 ? this.hangManHat : " ")
                                + "   \n|     "
                                + (wrongs > 1 ? this.hangManHead : " ")
                                + "   \n|     "
                                + (wrongs > 2 ? this.hangManShirt : " ")
                                + "   \n|     "
                                + (wrongs > 3 ? this.hangManPants : " ")
                                + "   \n|    "
                                + (wrongs > 4 ? this.hangManBoots : " ")
                                + "   \n|     \n|__________\n\n"
                                + word.toUpperCase().split("").map(l => guessed.includes(l) ? l : "_").join(" ")
                                + "```")
                            .addField(`Letters Guessed`, guessed.join(" "))
                            .addField(`The theme is...`, `A ${theme}!`)
                            .addField(`How to play?`, `React to this message with a letter emoji! Example: 🇦, 🇧`)
                            .addField(`Game Over`, `You lost this Hangman Game! The word was... **${word}**`)
                        return gameMessage.edit({ embeds: [stopEmbed] })
                    }
                } else if (!word.toUpperCase().split("").map(l => guessed.includes(l) ? l : "_").includes("_")) {

                    gameCollector.stop()
                    const winEmbed = new MessageEmbed()
                        .setColor(this.embedColor)
                        .setTitle(`Hangman Game`)
                        .setDescription("```"
                            + "|‾‾‾‾‾‾|   \n|     "
                            + (wrongs > 0 ? this.hangManHat : " ")
                            + "   \n|     "
                            + (wrongs > 1 ? this.hangManHead : " ")
                            + "   \n|     "
                            + (wrongs > 2 ? this.hangManShirt : " ")
                            + "   \n|     "
                            + (wrongs > 3 ? this.hangManPants : " ")
                            + "   \n|    "
                            + (wrongs > 4 ? this.hangManBoots : " ")
                            + "   \n|     \n|__________\n\n"
                            + word.toUpperCase().split("").map(l => guessed.includes(l) ? l : "_").join(" ")
                            + "```")
                        .addField(`Letters Guessed`, guessed.join(" "))
                        .addField(`The theme is...`, `A ${theme}!`)
                        .addField(`How to play?`, `React to this message with a letter emoji! Example: 🇦, 🇧`)
                        .addField(`Game Over`, `You won this Hangman Game! The word was... **${word}**`)
                    return gameMessage.edit({ embeds: [winEmbed] })
                }

            }

            const editEmbed = new MessageEmbed()
                .setColor(this.embedColor)
                .setTitle(`Hangman Game`)
                .setDescription("```"
                    + "|‾‾‾‾‾‾|   \n|     "
                    + (wrongs > 0 ? this.hangManHat : " ")
                    + "   \n|     "
                    + (wrongs > 1 ? this.hangManHead : " ")
                    + "   \n|     "
                    + (wrongs > 2 ? this.hangManShirt : " ")
                    + "   \n|     "
                    + (wrongs > 3 ? this.hangManPants : " ")
                    + "   \n|    "
                    + (wrongs > 4 ? this.hangManBoots : " ")
                    + "   \n|     \n|__________\n\n"
                    + word.toUpperCase().split("").map(l => guessed.includes(l) ? l : "_").join(" ")
                    + "```")
                .addField(`Letters Guessed`, guessed.length == 0 ? '\u200b' : guessed.join(" "))
                .addField(`The theme is...`, `A ${theme}!`)
                .addField(`How to play?`, `React to this message with a letter emoji! Example: 🇦, 🇧`)
            gameMessage.edit({ embeds: [editEmbed] })

        })
    }
}

module.exports = HangMan;