const { random } = require("random-unicode-emoji")
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")

let emojiChoosen;

class findEmoji {
  constructor(options){
    if(!options.message) throw new TypeError("Message is not provided. ")


    this.message = options.message
    this.winMessage = options.winMessage ? options.winMessage : "WoW! You won."
    this.loseMessage = options.loseMessage ? options.loseMessage : "Oops! thats wrong."
    this.timeOutMessage = options.timeOutMessage ? options.timeOutMessage : "Timeout :()"

    this.emojiUsed = []
  }

  //Start Game

  async start(){

    let buttons = createButtons(this.emojiUsed)  
      
    let msg = await this.message.channel.send({content:"here's your board i will edit buttons after 5 sec...", components: [
      {
        type: 1,
        components: [
          buttons[0],
          buttons[1],
          buttons[2]
        ]
      },
      {
        type: 1,
        components: [
          buttons[3],
          buttons[4],
          buttons[5],
        ]
      },
      {
        type: 1,
        components: [
          buttons[6],
          buttons[7],
          buttons[8]
        ]
      }
    ]})


    setTimeout(async() => {
      await editButtons(msg, this.message, this.winMessage, this.loseMessage, this.timeOutMessage, this.emojiUsed)
      console.log(this.emojiUsed)
    }, 5000)
  }
}

function createButtons(emojiUsed){
  let buttons = []
  
  for(let i = 0; i < 9; i++){
    let emoji = random({count: 1})
    emojiUsed.push(emoji)
    
    const button = new MessageButton()
    .setLabel(`${emoji}`)
    .setCustomId(`${emoji}`)
    .setStyle("PRIMARY")

    buttons.push(button)
  }

  return buttons;
}

async function editButtons(msg, message, winMessage, loseMessage, timeOutMessage, emojiUsed) {
  const buttons = []

  msg.components.map(c => {
      c.components.map(c => {
        c.label = "~"

        buttons.push(c)
      })
  })

  let emoji = emojiUsed[Math.floor(Math.random() * emojiUsed.length)]

  emojiChoosen = emoji
  
  await msg.edit({content: `Find \\${emoji} u have just 1 min.`, components: [
      {
        type: 1,
        components: [
          buttons[0],
          buttons[1],
          buttons[2]
        ]
      },
      {
        type: 1,
        components: [
          buttons[3],
          buttons[4],
          buttons[5],
        ]
      },
      {
        type: 1,
        components: [
          buttons[6],
          buttons[7],
          buttons[8]
        ]
      }
    ]})

  await handleGame(msg, message, winMessage, loseMessage, timeOutMessage)
}

async function handleGame(msg, message, winMessage, loseMessage, timeOutMessage){

  const filter = i => {
		return i.user.id === message.author.id
  }

msg.awaitMessageComponent({ filter, componentType: 'BUTTON', time: 60000 })
	.then(interaction => {
    if(interaction.customId === `${emojiChoosen}`){
      interaction.reply(winMessage)
    } else {
      interaction.reply(loseMessage)
    }
  })
	.catch(err => {
    msg.edit({content: timeOutMessage, 
components: [] })
  })
} 

module.exports = findEmoji
