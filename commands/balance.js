class balance {

    constructor(interaction) {
        this.interaction = interaction;
        this.userData = JSON.parse(fs.readFileSync("./userData.json"));
        this.execute();
    }

    execute() {
        if (!this.userData.map(user => user.id).includes(this.interaction.user.id)) {
            var balance = this.userData.filter(user => user.id === this.interaction.user.id)[0].balance;
            this.interaction.reply(`Your balance is ${balance}🤑`);
        }
        else {
            var userId = this.interaction.options.filter(option => { return option.name === 'user' })[0].user.id;
            var balance = this.userData.filter(user => user.id === userId)[0].balance;
            this.interaction.reply(`<@${userId}>'s balance is ${balance}🤑`);
        }
    }
}
module.exports = balance;