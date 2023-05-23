const Discord = require('discord.js');
const fs = require('fs');
const { token } = require('./config.json');
const myArgs = process.argv.slice(2);
const client = new Discord.Client({
    intents: 130571
});
const slashCommandFactory = require('./slashCommandFactory.js');
const commandHandler = require('./commandHandler');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    checkArgs();

    async function checkArgs() {
        if (myArgs.includes('refreshCommands') && myArgs.includes('guild')) {
            new slashCommandFactory(client, '512952764431859713');
        }
        else if (myArgs.includes('refreshCommands')) {
            new slashCommandFactory(client);
        }
        else if (myArgs.includes('help')) {
            console.log('refreshCommands: refreshes commands');
            console.log('refreshCommands guild: refreshes commands for a specific guild');
        }
    }
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    message.content.includes('🤑') || message.content.includes('💰') || message.content.includes('💸') ? message.reply('🤑'.repeat(Math.random() * 100)) : null;
});

client.on('interactionCreate', async (interaction) => {
    commands = JSON.parse(fs.readFileSync("./commands.json")).map(command => { return command.name });
    if (!interaction.isCommand() || !commands.includes(interaction.commandName)) return;
    new commandHandler(interaction);
});

client.login(token);