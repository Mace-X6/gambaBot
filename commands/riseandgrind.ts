import { SlashCommand } from "../slashCommand";
class riseandgrind extends SlashCommand{

    execute() {
        const fs = require('fs');
        if (!this.userData.map( user => user.id ).includes(this.interaction.user.id)) {
            let user : User = {tag: this.interaction.user.tag, id: this.interaction.user.id, balance: 0, begTimeOut: 0, xp: 1 };
            this.userData.push(user);
            this.interaction.followUp({content:`<@${this.interaction.user.id}> HAS RISEN AND GRINDED!🤑`, ephemeral: false});

            fs.writeFileSync("./userData.json", JSON.stringify(this.userData));
        }
        else {
            this.interaction.followUp({content: `<@${this.interaction.user.id}> HAS ALREADY RISEN AND GRINDED!🤑`, ephemeral: false});
        }
    }
}
module.exports = riseandgrind;