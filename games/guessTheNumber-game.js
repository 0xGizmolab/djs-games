const discord = require('discord.js')

class GuessTheNumber {

    constructor() {

    }

    startGame(message) {

        var options = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
        var result = options[Math.floor(Math.random() * options.length)];
    
        message.channel.send(`**I have a number in my mind, GUESS IT!**`).then(async msg => {
    
            message.channel.awaitMessages(m => m.author.id == message.author.id,
                {max: 1}).then(collected => {
                    var guess = collected.first().content
                    if(isNaN(guess)) {
    
                        message.channel.send(`**🤦‍♂️ You stupid... It is guess the NUMBER!** *Use the command again to play again*`)
    
                    } else if(guess != result) {
    
                        message.channel.send(`**😥 Nope, that isn't the number. You only have 2 chances left**`)
    
                        message.channel.awaitMessages(m => m.author.id == message.author.id,
                            {max: 1}).then(collected => {
                                var guess = collected.first().content
                                if(isNaN(guess)) {
                                    message.channel.send(`**🤦‍♂️ You stupid... It is guess the NUMBER!** *Use the command again to play again*`)
    
                                } else if(guess === result) {
    
                                    message.channel.send(`**🎉 You guessed the number in your second try!** *Number was ${result}*`)
                            
                            
                                } else if(guess != result) {
    
                                    message.channel.send(`**😥 Nope, that isn't the number. You only have 1 chance left**`)
                
                                    message.channel.awaitMessages(m => m.author.id == message.author.id,
                                        {max: 1}).then(collected => {
                                            var guess = collected.first().content
                                            if(isNaN(guess)) {
    
                                                message.channel.send(`**🤦‍♂️ You stupid... It is guess the NUMBER!** *Use the command again to play again*`)
                                            } else if(guess != result) {
    
                                                message.channel.send(`**😥 Nope, that isn't the number. You only have 0 chances left.** *Number was ${result}*`)
                            
                                                
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