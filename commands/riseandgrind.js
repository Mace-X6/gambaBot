class riseandgrind {

    constructor(interaction) {
        this.interaction = interaction;
        this.userData = JSON.parse(fs.readFileSync("./userData.json"));
        this.execute();
    }

    execute() {
        if (!this.userData.map( user => user.id ).includes(this.interaction.user.id)) {

            this.userData.push({ id: this.interaction.user.id, balance: 0, begTimeOut: 0, xp: 1 });
            this.interaction.reply(`<@${this.interaction.user.id}> HAS RISEN AND GRINDED!🤑`);

            fs.writeFileSync("./userData.json", JSON.stringify(this.userData));
        }
        else {
            this.interaction.reply(`<@${this.interaction.user.id}> HAS ALREADY RISEN AND GRINDED!🤑`);
        }
    }
}
module.exports = riseandgrind;