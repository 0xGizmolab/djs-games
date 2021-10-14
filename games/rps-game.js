const { MessageEmbed } = require('discord.js')

class RockPaperScissors {

    constructor(options) {

        if (!options.message) throw new TypeError('Missing argument: message')
        /*
                if (typeof options.winFooter !== 'string') throw new TypeError('embedFooter must be a string')
                if (typeof options.winColor !== 'string') throw new TypeError('embedColor must be a string')
        
                if (typeof options.lostFooter !== 'string') throw new TypeError('embedFooter must be a string')
                if (typeof options.lostColor !== 'string') throw new TypeError('embedColor must be a string')
        
                if (typeof options.questionFooter !== 'string') throw new TypeError('embedFooter must be a string')
                if (typeof options.questionColor !== 'string') throw new TypeError('embedColor must be a string')
                */
        this.message = options.message;

    }
    start = async () => {

        var challenger = this.message.author;
        var opponent = this.message.mentions.users.first()
        if (!opponent) return message.channel.send(`**Who do you wanna play Rock Paper Scissors with?(You have to tag the person with the command)**`)

        this.message.channel.send(`**${challenger.username} and ${opponent.username}, take a look in your DM's to play the RPS game!**`)

        const startEmbed1 = new MessageEmbed()
            .setTitle(`It's ${challenger.username}'s turn! Waiting...`)
        var waitingEmoji = await opponent.send({ embeds: [startEmbed1] })

        const startEmbed = new MessageEmbed()
            .setTitle(`It's your turn, ${challenger.username}!`)
            .setDescription(`What move will you make?
        
        🪨 = Rock
        🧻 = Paper
        ✂️ = Scissors`)
        var startEmoji = await challenger.send({ embeds: [startEmbed] })

        await startEmoji.react('🪨')
        await startEmoji.react('🧻')
        await startEmoji.react('✂️')

        const filter1 = (reaction, user) => ["🪨", "🧻", "✂️"].includes(reaction.emoji.name) && user.id === challenger.id;
        const response1 = await startEmoji.awaitReactions({ filter: filter1, max: 1 });

        const reaction1 = response1.first();

        var cResult = "";
        var oResult = "";

        if (reaction1.emoji.name === "🪨") {

            cResult = "rock"

            const rockEmbed = new MessageEmbed()
                .setTitle(`It's ${opponent.username}'s turn! Waiting...`)
            var waitingEmoji1 = await startEmoji.edit({ embeds: [rockEmbed] })

            const oppenentEmbed = new MessageEmbed()
                .setTitle(`It's your turn, ${challenger.username}!`)
                .setDescription(`What move will you make?
        
            🪨 = Rock
            🧻 = Paper
            ✂️ = Scissors`)
            var endEmoji = await waitingEmoji.edit({ embeds: [oppenentEmbed] })

            await endEmoji.react('🪨')
            await endEmoji.react('🧻')
            await endEmoji.react('✂️')

            const filter2 = (reaction, user) => ["🪨", "🧻", "✂️"].includes(reaction.emoji.name) && user.id === opponent.id;
            const response2 = await endEmoji.awaitReactions({ filter: filter2, max: 1 });

            const reaction2 = response2.first();

            if (reaction2.emoji.name === "🪨") {

                oResult = "rock"

                if (cResult === "rock") {
                    if (oResult === "rock") {
                        const drawEmbed = new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle(`Its a Draw!`)
                            .setDescription(`You played: 🪨
                        ${opponent.username} played: 🪨`)
                        waitingEmoji1.edit({ embeds: [drawEmbed] })

                        const drawEmbed1 = new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle(`Its a Draw!`)
                            .setDescription(`You played: 🪨
                        ${challenger.username} played: 🪨`)
                        return endEmoji.edit({ embeds: [drawEmbed1] })
                    } else if (oResult === "paper") {
                        const loseEmbed = new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle(`${opponent.username} won!`)
                            .setDescription(`You played: 🪨
                        ${opponent.username} played: 🧻`)
                        waitingEmoji1.edit({ embeds: [loseEmbed] })

                        const winEmbed = new MessageEmbed()
                            .setColor("RANDOM")
                            .setTitle(`You won!`)
                            .setDescription(`You played: 🧻
                        ${challenger.username} played: 🪨`)
                        return endEmoji.edit({ embeds: [winEmbed] })
                    }
                }

            } else if (reaction2.emoji.name === "🧻") {

                oResult = "paper"

            } else if (reaction2.emoji.name === "✂️") {

                oResult = "scissors"



            }

        } else if (reaction1.emoji.name === "🧻") {

            cResult = "paper"

            const paperEmbed = new MessageEmbed()
                .setTitle(`It's ${opponent.username}'s turn! Waiting...`)
            var waitingEmoji1 = await startEmoji.edit(paperEmbed)

            const oppenentEmbed = new MessageEmbed()
                .setTitle(`It's your turn, ${opponent.username}!`)
                .setDescription(`What move will you make?
        
            🪨 = Rock
            🧻 = Paper
            ✂️ = Scissors`)
            var endEmoji = await waitingEmoji.edit({ embeds: [oppenentEmbed] })

            await endEmoji.react('🪨')
            await endEmoji.react('🧻')
            await endEmoji.react('✂️')

            const filter2 = (reaction, user) => ["🪨", "🧻", "✂️"].includes(reaction.emoji.name) && user.id === opponent.id;
            const response2 = await endEmoji.awaitReactions(filter2, { max: 1 });

            const reaction2 = response2.first();

            if (reaction2.emoji.name === "🪨") {

                oResult = "rock"

            } else if (reaction2.emoji.name === "🧻") {

                oResult = "paper"

            } else if (reaction2.emoji.name === "✂️") {

                oResult = "scissors"



            }

        } else if (reaction1.emoji.name === "✂️") {

            cResult = "scissors"

            const scissorsEmbed = new MessageEmbed()
                .setTitle(`It's ${opponent.username}'s turn! Waiting...`)
            var waitingEmoji1 = await startEmoji.edit(scissorsEmbed)

            const oppenentEmbed = new MessageEmbed()
                .setTitle(`It's your turn, ${opponent.username}!`)
                .setDescription(`What move will you make?
        
            🪨 = Rock
            🧻 = Paper
            ✂️ = Scissors`)
            var endEmoji = await waitingEmoji.edit({ embeds: [oppenentEmbed] })

            await endEmoji.react('🪨')
            await endEmoji.react('🧻')
            await endEmoji.react('✂️')

            const filter2 = (reaction, user) => ["🪨", "🧻", "✂️"].includes(reaction.emoji.name) && user.id === opponent.id;
            const response2 = await endEmoji.awaitReactions(filter2, { max: 1 });

            const reaction2 = response2.first();

            if (reaction2.emoji.name === "🪨") {

                oResult = "rock"

            } else if (reaction2.emoji.name === "🧻") {

                oResult = "paper"

            } else if (reaction2.emoji.name === "✂️") {

                oResult = "scissors"

            }
        }

        if (cResult === "rock") {
            if (oResult === "rock") {
                const drawEmbed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`Its a Draw!`)
                    .setDescription(`You played: 🪨
                    ${opponent.username} played: 🪨`)
                waitingEmoji1.edit({ embeds: [drawEmbed] })

                const drawEmbed1 = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`Its a Draw!`)
                    .setDescription(`You played: 🪨
                    ${challenger.username} played: 🪨`)
                return endEmoji.edit({ embeds: [drawEmbed1] })
            } else if (oResult === "paper") {
                const loseEmbed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`${opponent.username} won!`)
                    .setDescription(`You played: 🪨
                    ${opponent.username} played: 🧻`)
                waitingEmoji1.edit({ embeds: [loseEmbed] })

                const winEmbed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`You won!`)
                    .setDescription(`You played: 🧻
                    ${challenger.username} played: 🪨`)
                return endEmoji.edit({ embeds: [winEmbed] })
            } else if (oResult === "scissors") {

                const loseEmbed1 = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`You won!`)
                    .setDescription(`You played: 🪨
                    ${opponent.username} played: ✂️`)
                waitingEmoji1.edit({ embeds: [loseEmbed1] })

                const winEmbed1 = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`${challenger.username} won!`)
                    .setDescription(`You played: ✂️
                    ${challenger.username} played: 🪨`)
                return endEmoji.edit({ embeds: [winEmbed1] })
            }
        } else if (cResult === "paper") {
            if (oResult === "paper") {
                const drawEmbed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`Its a Draw!`)
                    .setDescription(`You played: 🧻
                    ${opponent.username} played: 🧻`)
                waitingEmoji1.edit({ embeds: [drawEmbed] })

                const drawEmbed1 = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`Its a Draw!`)
                    .setDescription(`You played: 🧻
                    ${challenger.username} played: 🧻`)
                return endEmoji.edit({ embeds: [drawEmbed1] })
            } else if (oResult === "rock") {
                const loseEmbed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`You won!`)
                    .setDescription(`You played: 🧻
                    ${opponent.username} played: 🪨`)
                waitingEmoji1.edit({ embeds: [loseEmbed] })

                const winEmbed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`${challenger.username} won!`)
                    .setDescription(`You played: 🪨
                    ${challenger.username} played: 🧻`)
                return endEmoji.edit({ embeds: [winEmbed] })
            } else if (oResult === "scissors") {

                const loseEmbed1 = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`${opponent.username} won!`)
                    .setDescription(`You played: 🧻
                    ${opponent.username} played: ✂️`)
                waitingEmoji1.edit({ embeds: [loseEmbed1] })

                const winEmbed1 = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`You won!`)
                    .setDescription(`You played: ✂️
                    ${challenger.username} played: 🧻`)
                endEmoji.edit({ embeds: [winEmbed1] })
            }
        } else if (cResult === "scissors") {
            if (oResult === "scissors") {
                const drawEmbed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`Its a Draw!`)
                    .setDescription(`You played: ✂️
                    ${opponent.username} played: ✂️`)
                waitingEmoji1.edit({ embeds: [drawEmbed] })

                const drawEmbed1 = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`Its a Draw!`)
                    .setDescription(`You played: ✂️
                    ${challenger.username} played: ✂️`)
                return endEmoji.edit({ embeds: [drawEmbed1] })
            } else if (oResult === "paper") {
                const loseEmbed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`You won!`)
                    .setDescription(`You played: ✂️
                    ${opponent.username} played: 🧻`)
                waitingEmoji1.edit({ embeds: [loseEmbed] })

                const winEmbed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`${challenger.username} won!`)
                    .setDescription(`You played: 🧻 
                    ${challenger.username} played: ✂️`)
                return endEmoji.edit({ embeds: [winEmbed] })
            } else if (oResult === "rock") {
                const winEmbed1 = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`${challenger.username} won!`)
                    .setDescription(`You played: ✂️
                    ${challenger.username} played: 🪨`)
                endEmoji.edit({ embeds: [winEmbed1] })

                const loseEmbed1 = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`You won!`)
                    .setDescription(`You played: 🪨
                    ${opponent.username} played: ✂️`)
                return waitingEmoji1.edit({ embeds: [loseEmbed1] })
            }
        }


    }
}

module.exports = RockPaperScissors
