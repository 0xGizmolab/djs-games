const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

class RockPaperScissors {

    constructor(options) {

        if (!options.message) throw new TypeError('Missing argument: message')
        


        this.winMessage = options.Winmessage ? options.winMessage : "{winner} is the winner!"
        this.AI = options.AI ? options.AI : true
        this.message = options.message;
        this.opponent = options.opponent || this.message.mentions.members.first()
        this.embedColor = options.embedColor ? options.embedColor : "RANDOM"
      this.tieMessage = options.tieMessage ? options.tieMessage : "Its a tie." 
      this.timeOutMessage = options.timeOutMessage ? options.timeOutMessage : "Times Up!"

    }

  async start() {
    let player1Choosed;
    let player2Choosed;
    let winner;      
    
    let button1 = new MessageButton()
    .setLabel("🪨")
    .setCustomId("rock")
    .setStyle("PRIMARY")

    let button2 = new MessageButton()
    .setLabel("🧻")
    .setCustomId("paper")
    .setStyle("PRIMARY")

    let button3 = new MessageButton()
    .setLabel("✂️")
    .setCustomId("scissors")
    .setStyle("PRIMARY")

    const row = new MessageActionRow().addComponents(button1, button2, button3)

    if(!this.opponent && !this.AI) return this.message.channel.send("Mention the user you want to play with. ")


    if(!this.opponent && this.AI){

      let msg = await this.message.channel.send({embeds: [{
       title: `${this.message.author.username} V/S AI`,
       color: this.embedColor                                    }],    components: [row]})

      
      let filter = i => {return i.user.id === this.message.author.id}

      msg.awaitMessageComponent({filter, componentType: "BUTTON" , time: 60000, max: 1, errors: ["time"]}).then(interaction => {
        let player1Choosed = interaction.customId
          
        let botChoosed = ["rock", "paper", "scissors"]

         player2Choosed = botChoosed[Math.floor(Math.random() * botChoosed.length)]
           
        if(player1Choosed === "rock" && player2Choosed === "scissors"){
          winner = this.message.author.id
        }
        if(player1Choosed === "scissors" && player2Choosed === "paper"){
          winner = this.message.author.id
        }
        if(player1Choosed === "paper" && player2Choosed === "rock"){
          winner = this.message.author.id
        }
        if(player1Choosed === "paper" && player2Choosed === "scissors"){
          winner = "AI"
        }
        if(player1Choosed === "scissors" && player2Choosed === "rock"){
          winner = "AI"
        }
        if(player1Choosed === "rock" && player2Choosed === "paper"){
          winner = "AI"
        }

        if(winner === "AI"){
          interaction.reply(this.winMessage.replace("{winner}", "AI"))
            
          msg.edit({embeds: [{
            title: `Your Answer: ${player1Choosed}\nAI: ${player2Choosed}\n\nWinner: AI`,
            color: this.embedColor
          }], 
            components: []})
          
        } else if(winner === this.message.author.id){
          interaction.reply(this.winMessage.replace("{winner}", this.message.author.username))
            
          msg.edit({embeds: [{
             title: `Your Answer: ${player1Choosed}\nAI: ${player2Choosed}\n\nWinner: ${this.message.author.username}`, 
            color: this.embedColor}], 
            components: []})
          
        } else {
          interaction.reply(this.tieMessage)
            
          msg.edit({embeds: [{
            title: `Your Answer: ${player1Choosed}\nAI: ${player2Choosed}\n\nWinner: NoOne`, 
            color: this.embedColor}], 
            components: []})
        }
        
      }).catch((e) => {
        this.message.channel.send(this.timeOutMessage)
        console.log(e)
      })
    } else if(this.opponent){
      
       let msg = await this.message.channel.send({embeds: [{
       title: `${this.message.author.username} V/S ${this.opponent.user.username}`,
       color: this.embedColor                                    }],    components: [row]})


      const collector = msg.createMessageComponentCollector({ componentType: 'BUTTON', time: 60000 });

      collector.on('collect', i => {
	if (i.user.id === this.message.author.id || i.user.id === this.opponent.user.id) {

     if(i.user.id === this.message.author.id){
       if(player1Choosed) return i.reply({content: "You have already chosen your answer.", ephemeral: true})
       
       player1Choosed = i.customId 
       i.reply({content: `You choosed ${i.customId} `, ephemeral: true})
     } else {
       if(player2Choosed) return i.reply({content: "You have already chosen your answer.", ephemeral: true})
       
       player2Choosed = i.customId
      i.reply({content: `You choosed ${i.customId}`, ephemeral: true})
     }

    if(player1Choosed && player2Choosed){
      if(player1Choosed === "rock" && player2Choosed === "scissors"){
          winner = this.message.author.id
        }
        if(player1Choosed === "scissors" && player2Choosed === "paper"){
          winner = this.message.author.id
        }
        if(player1Choosed === "paper" && player2Choosed === "rock"){
          winner = this.message.author.id
        }
        if(player1Choosed === "paper" && player2Choosed === "scissors"){
          winner = this.opponent.user.id
        }
        if(player1Choosed === "scissors" && player2Choosed === "rock"){
          winner = this.opponent.user.id
        }
        if(player1Choosed === "rock" && player2Choosed === "paper"){
          winner = this.opponent.user.id
        }

        if(winner === this.opponent.user.id){
          this.message.reply(this.winMessage.replace("{winner}", this.opponent.user.username))
            
          msg.edit({embeds: [{
            title: `${this.message.author.username}'s Answer: ${player1Choosed}\n${this.opponent.user.username}'s Answer: ${player2Choosed}\n\nWinner: ${this.opponent.user.username}`,
            color: this.embedColor
          }], 
            components: []})
          
        } else if(winner === this.message.author.id){
          this.message.reply(this.winMessage.replace("{winner}", this.message.author.username))
            
          msg.edit({embeds: [{
            title: `${this.message.author.username}'s Answer: ${player1Choosed}\n${this.opponent.user.username}'s Answer: ${player2Choosed}\n\nWinner: ${this.message.author.username}`,
            color: this.embedColor
          }], 
            components: []})
          
        } else {
          this.message.reply(this.tieMessage)
            
          msg.edit({embeds: [{
            title: `${this.message.author.username}'s Answer: ${player1Choosed}\n${this.opponent.user.username}'s Answer: ${player2Choosed}\n\nWinner: NoOne`,
            color: this.embedColor
          }], 
            components: []})
        }
    }
	} else {
		i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
	}
});

collector.on('end', collected => {
	    msg.edit({embeds: [{
        title: "Game Ended", 
        color: this.embedColor
      }]})
     })
    
  }
    
 }
}

module.exports = RockPaperScissors
