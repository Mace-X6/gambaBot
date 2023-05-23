const fs = require("fs");
class riseandgrind {

    constructor(interaction) {
        this.interaction = interaction;
        this.userData = JSON.parse(fs.readFileSync("./userData.json"));
        this.execute();
    }

    execute() {
        if (!this.userData.map( user => user.id ).includes(this.interaction.user.id)) {

            this.userData.push({tag: this.interaction.user.tag, id: this.interaction.user.id, balance: 0, begTimeOut: 0, xp: 1 });
            this.interaction.reply({content:`<@${this.interaction.user.id}> HAS RISEN AND GRINDED!🤑`, ephemeral: false});

            fs.writeFileSync("./userData.json", JSON.stringify(this.userData));
        }
        else {
            this.interaction.reply({content: `<@${this.interaction.user.id}> HAS ALREADY RISEN AND GRINDED!🤑`, ephemeral: false});
        }
    }
}
module.exports = riseandgrind;