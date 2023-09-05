const Discord = require('discord.js');
const fs: any = require('fs');
const token: string = require('./config.json').token;
const myArgs = process.argv.slice(2);
const client = new Discord.Client({
    intents: 130571
});
const slashCommandFactory = require('./slashCommandFactory.ts');
const commandPipeline = require('./commandPipeline');

interface User {
    tag: string,
    id: string,
    xp: number,
    balance: number,
    begTimeOut: number
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    // checkArgs();

    // async function checkArgs() {
    //     if (myArgs.includes('refreshCommands')) {
    //         console.log("refreshing commands...");
    //         new slashCommandFactory(client);
    //     }
    //     else if (myArgs.includes('help')) {
    //         console.log('refreshCommands: refreshes commands');
    //     }
    // }
});

client.on('messageCreate', (message: any) => {
    if (message.author.bot) return;
    else {
        message.content.includes('🤑') || message.content.includes('💰') || message.content.includes('💸') ? message.reply('🤑'.repeat(Math.random() * 100)) : null;
    }
});
client.on('messageUpdate', (oldMessage: any, newMessage: any) => {
    if (newMessage.author.id === '478202666355523585') {
        if (newMessage.embeds[0]) {
            let description = newMessage.embeds[0].description;
            let loseRegex = /You lost ([\d,]+)/;
            let winRegex = /You won ([\d,]+)/;
            if (description.match(loseRegex)?.[1] > 10000) {
                let random: number = Math.floor(Math.random() * 10);
                newMessage.reply({ files: [{ attachment: `./gambas/sad/${random}.png`, name: 'sadgamba.png' }] });
            }
            if (description.match(winRegex)?.[1] > 10000) {
                let random: number = Math.floor(Math.random() * 5);
                newMessage.reply({ files: [{ attachment: `./gambas/happy/${random}.png`, name: 'happygamba.png' }] });
            }
        }
    }
});

// client.on('interactionCreate', async (interaction: any) => {
//     var commands = JSON.parse(fs.readFileSync("./commands.json")).map((command: any) => { return command.name });
//     if (!interaction.isCommand() || !commands.includes(interaction.commandName)) return;
//     await interaction.deferReply({ ephemeral: true });
//     new commandPipeline(interaction);
// });

client.login(token);