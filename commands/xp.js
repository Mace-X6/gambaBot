const fs = require("fs");
class xp {

    constructor(interaction) {
        this.interaction = interaction;
        this.userData = JSON.parse(fs.readFileSync("./userData.json"));
        this.execute();
    }

    execute() {
        if (!this.interaction.options.getUser('user')) {
            var xp = this.userData.filter(user => user.id === this.interaction.user.id)[0].xp;
            this.interaction.reply({content: `You have ${xp} xp 🤑`, ephemeral: false});
        }
        else {
            var userId = this.interaction.options.getUser('user').id;
            var xp = this.userData.filter(user => user.id === userId)[0].xp;
            this.interaction.reply({content: `<@${userId}> has ${xp} xp 🤑`, ephemeral: false});
        }
    }
}
module.exports = xp;