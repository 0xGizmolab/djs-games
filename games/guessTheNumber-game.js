class GuessTheNumber {

    constructor(options) {
        if (!options.message) throw new TypeError('Missing argument: message')
        this.message = options.message
        this.wrongGuess = options.wrongGuess
        this.correctGuess = options.correctGuess


    }

    start() {

        var options = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
        var result = options[Math.floor(Math.random() * options.length)];

        this.message.channel.send(`**Guess a number from 1 to 10!**`).then(async msg => {
            const filter = m => m.author.id == this.message.author.id
            this.message.channel.awaitMessages({ filter, max: 1 })

                .then(collected => {
                    var guess = collected.first().content
                    if (isNaN(guess)) {

                        this.message.channel.send(`**🤦‍♂️ You dimmadumbass, I need a number. Not that alphabet shit!** *Use the command again to play again*`)

                    } else if (guess != result) {

                        this.message.channel.send(this.wrongGuess || `**Nope, that isn't the number. You only have 2 chances left**`)

                        this.message.channel.awaitMessages({ filter, max: 1 })
                            .then(collected => {
                                var guess = collected.first().content
                                if (isNaN(guess)) {
                                    this.message.channel.send(`**🤦‍♂️ You You dimmadumbass, I need a number. Not that alphabet shit!** *Use the command again to play again*`)

                                } else if (guess === result) {

                                    this.message.channel.send(this.correctGuess || `**🎉 You guessed the number in your second try!** *Number was ${result}*`)


                                } else if (guess != result) {

                                    this.message.channel.send(this.wrongGuess || `**Nope, that isn't the number. You only have 1 chance left**`)

                                    this.message.channel.awaitMessages({ filter, max: 1 })
                                        .then(collected => {
                                            var guess = collected.first().content
                                            if (isNaN(guess)) {

                                                this.message.channel.send(`**🤦‍♂️ You You dimmadumbass, I need a number. Not that alphabet shit!** *Use the command again to play again*`)
                                            } else if (guess != result) {

                                                this.message.channel.send(this.wrongGuess || `**Nope, that isn't the number. You only have 0 chances left.** *Number was ${result}*`)


                                            } else if (guess === result) {

                                                this.message.channel.send(this.correctGuess || `**🎉 You guessed the number in your last try!** *Number was ${result}*`)
                                            }
                                        })
                                } else if (guess === result) {

                                    this.message.channel.send(this.correctGuess || `**🎉 You guessed the number in your second try!** *Number was ${result}*`)
                                }
                            })
                    } else if (guess === result) {

                        this.message.channel.send(this.correctGuess || `**🎉 You guessed the number in your first try!** *Number was ${result}*`)
                    }
                })
        })
    }

}

module.exports = GuessTheNumber;