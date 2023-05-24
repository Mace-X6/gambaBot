const Discord = require('discord.js');
const fs : any = require('fs');
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
    checkArgs();

    async function checkArgs() {
        if (myArgs.includes('refreshCommands')) {
            new slashCommandFactory(client);
        }
        else if (myArgs.includes('help')) {
            console.log('refreshCommands: refreshes commands');
        }
    }
});

client.on('messageCreate', (message: any) => {
    if (message.author.bot) return;
    message.content.includes('🤑') || message.content.includes('💰') || message.content.includes('💸') ? message.reply('🤑'.repeat(Math.random() * 100)) : null;
});

client.on('interactionCreate', async (interaction: any) => {
    var commands = JSON.parse(fs.readFileSync("./commands.json")).map((command: any) => { return command.name });
    if (!interaction.isCommand() || !commands.includes(interaction.commandName)) return;
    await interaction.deferReply({ ephemeral: true });
    new commandPipeline(interaction);
});

client.login(token);