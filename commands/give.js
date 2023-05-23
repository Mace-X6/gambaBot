const fs = require("fs");
class give {
    constructor(interaction) {
        this.interaction = interaction;
        this.userData = JSON.parse(fs.readFileSync("./userData.json"));
        this.execute();
    }
    execute() {
        if (this.interaction.options.getInteger('amount') > 0) {
            var targetUser = this.interaction.options.getUser('user');
            var amount = this.interaction.options.getInteger('amount');
            if (this.userData.filter(user => user.id === this.interaction.user.id)[0].balance >= amount) {
                this.userData.filter(user => user.id === this.interaction.user.id)[0].balance -= amount
                this.userData.filter(user => user.id === targetUser.id)[0].balance += amount
                this.interaction.reply(`<@${this.interaction.user.id}> gave ${amount} 🤑 to <@${targetUser.id}>`)
            }
            else {
                this.interaction.reply(`You too poor to give that much!`)
            }
            fs.writeFileSync("./userData.json", JSON.stringify(this.userData));
        }
        else {
            this.interaction.reply({ content: `You need to specify a valid amount! (amount > 0)`, ephemeral: true });
        }
    }
}
module.exports = give;