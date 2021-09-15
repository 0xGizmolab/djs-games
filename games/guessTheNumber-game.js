const discord = require('discord.js')

class GuessTheNumber {

    constructor() {

    }

    startGame(message) {

        var options = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
        var result = options[Math.floor(Math.random() * options.length)];
    
        message.channel.send(`**Guess a number from 1 to 10!**`).then(async msg => {
            const filter = m => m.author.id == message.author.id
            message.channel.awaitMessages({filter, max: 1})
                
                .then(collected => {
                    var guess = collected.first().content
                    if(isNaN(guess)) {
    
                        message.channel.send(`**🤦‍♂️ You dimmadumbass, I need a number. Not that alphabet shit!** *Use the command again to play again*`)
    
                    } else if(guess != result) {
    
                        message.channel.send(`**Nope, that isn't the number. You only have 2 chances left**`)
    
                        message.channel.awaitMessages({filter, max: 1})
                            .then(collected => {
                                var guess = collected.first().content
                                if(isNaN(guess)) {
                                    message.channel.send(`**🤦‍♂️ You You dimmadumbass, I need a number. Not that alphabet shit!** *Use the command again to play again*`)
    
                                } else if(guess === result) {
    
                                    message.channel.send(`**🎉 You guessed the number in your second try!** *Number was ${result}*`)
                            
                            
                                } else if(guess != result) {
    
                                    message.channel.send(`**Nope, that isn't the number. You only have 1 chance left**`)
                
                                    message.channel.awaitMessages({filter, max: 1})
                                    .then(collected => {
                                            var guess = collected.first().content
                                            if(isNaN(guess)) {
    
                                                message.channel.send(`**🤦‍♂️ You You dimmadumbass, I need a number. Not that alphabet shit!** *Use the command again to play again*`)
                                            } else if(guess != result) {
    
                                                message.channel.send(`**Nope, that isn't the number. You only have 0 chances left.** *Number was ${result}*`)
                            
                                                
                                            } else if(guess === result) {
    
                                                message.channel.send(`**🎉 You guessed the number in your last try!** *Number was ${result}*`)
                                            }
                                        })
                                } else if(guess === result) {
    
                                    message.channel.send(`**🎉 You guessed the number in your second try!** *Number was ${result}*`)
                                }
                            })
                    } else if(guess === result) {
    
                        message.channel.send(`**🎉 You guessed the number in your first try!** *Number was ${result}*`)
                    }
                })
        })
    }

}

module.exports = GuessTheNumber;