class balance extends SlashCommand{
    
    execute() {
        if (!this.interaction.options.getUser('user')) {
            var balance = this.userData.filter(user => user.id === this.interaction.user.id)[0].balance;
            this.interaction.reply(`Your balance is ${balance} 🤑`);
        }
        else {
            var userId = this.interaction.options.getUser('user').id;
            var balance = this.userData.filter(user => user.id === userId)[0].balance;
            this.interaction.reply(`<@${userId}>'s balance is ${balance} 🤑`);
        }
    }
}
module.exports = balance;