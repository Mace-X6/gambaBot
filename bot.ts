const Discord = require('discord.js');
const fs = require('fs');
const { token } = require('./config.json');
const myArgs = process.argv.slice(2);
const client = new Discord.Client({
    intents: 130571
});
const slashCommandFactory = require('./slashCommandFactory.js');
const commandHandler = require('./commandHandler');

interface User {
    tag: string,
    id: string,
    xp: number,
    balance: number,
    begTimeOut: number    
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    checkArgs();

    async function checkArgs() {
        if (myArgs.includes('refreshCommands')) {
            new SlashCommandFactory(client);
        }
        else if (myArgs.includes('help')) {
            console.log('refreshCommands: refreshes commands');
        }
    }
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    message.content.includes('🤑') || message.content.includes('💰') || message.content.includes('💸') ? message.reply('🤑'.repeat(Math.random() * 100)) : null;
});

client.on('interactionCreate', async (interaction) => {
    var commands = JSON.parse(fs.readFileSync("./commands.json")).map(command => { return command.name });
    if (!interaction.isCommand() || !commands.includes(interaction.commandName)) return;
    new CommandHandler(interaction);
});

client.login(token);