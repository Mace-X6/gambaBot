class xp {

    constructor(interaction) {
        this.interaction = interaction;
        this.userData = JSON.parse(fs.readFileSync("./userData.json"));
        this.execute();
    }

    execute() {
        if (!this.userData.map(user => user.id).includes(this.interaction.user.id)) {
            var xp = this.userData.filter(user => user.id === this.interaction.user.id)[0].xp;
            this.interaction.reply(`You have ${xp} xp🤑`);
        }
        else {
            var userId = this.interaction.options.filter(option => { return option.name === 'user' })[0].user.id;
            var xp = this.userData.filter(user => user.id === userId)[0].xp;
            this.interaction.reply(`<@${userId}> has ${xp} xp🤑`);
        }
    }
}
module.exports = xp;