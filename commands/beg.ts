import { SlashCommand } from "../slashCommand";
class beg extends SlashCommand {

    execute() {
        if (this.userData.filter(user => user.id === this.interaction.user.id)[0].begTimeOut <= Date.now()) {
            var amount = Math.floor(Math.random() * (this.userData.filter(user => user.id === this.interaction.user.id)[0].xp / 100) + 1);
            this.userData.filter(user => user.id === this.interaction.user.id)[0].balance += amount;
            this.userData.filter(user => user.id === this.interaction.user.id)[0].begTimeOut = Date.now() + 3 * 10 ** 5;
            this.interaction.followUp({ embeds: this.generateEmbed(amount) });
            fs.writeFileSync("./userData.json", JSON.stringify(this.userData));
        }
        else {
            var timeLeft = this.userData.filter(user => user.id === this.interaction.user.id)[0].begTimeOut - Date.now();
            this.interaction.followUp({ content: `You have to wait ${this.timeToString(timeLeft)} before you can beg again!`, ephemeral: true });
        }
    }

    private timeToString(time: number): string {
        var minutes = Math.floor(time / 60000);
        var seconds = ((time % 60000) / 1000).toFixed(0);
        return minutes === 0 ? seconds + 's' : minutes + 'm ' + seconds + 's';
    }

    private generateEmbed(begAmt: number): object {
        return {
            embeds: [
                {
                    title: `<@${this.interaction.user.id}> begged and got ${begAmt} 🤑`,
                    color: 0x00ff00,
                    timestamp: new Date(),
                    thumbnail: {
                        url: this.interaction.user.avatarURL()
                    },
                }
            ]
        }
    }
}
module.exports = beg;