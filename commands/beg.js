const fs = require("fs");
class beg {
    constructor(interaction) {
        this.interaction = interaction;
        this.userData = JSON.parse(fs.readFileSync("./userData.json"));
        this.execute();
    }

    execute() {
        if (this.userData.filter(user => user.id === this.interaction.user.id)[0].begTimeOut <= Date.now()) {
            var amount = Math.floor(Math.random() * (this.userData.filter(user => user.id === this.interaction.user.id)[0].xp / 100) + 1);
            this.userData.filter(user => user.id === this.interaction.user.id)[0].balance += amount;
            this.userData.filter(user => user.id === this.interaction.user.id)[0].begTimeOut = Date.now() + 3*10**5;
            this.interaction.reply(`<@${this.interaction.user.id}> begged and got ${amount} 🤑`);
            fs.writeFileSync("./userData.json", JSON.stringify(this.userData));
        }
        else {
            var timeLeft = this.userData.filter(user => user.id === this.interaction.user.id)[0].begTimeOut - Date.now();
            this.interaction.reply({ content: `You have to wait ${this.timeToString(timeLeft)} before you can beg again!`, ephemeral: true});
        }
    }

    timeToString(time) {
        var minutes = Math.floor(time / 60000);
        var seconds = ((time % 60000) / 1000).toFixed(0);
        return minutes === 0 ? seconds + 's' : minutes + 'm ' + seconds + 's';
    }
}
module.exports = beg;