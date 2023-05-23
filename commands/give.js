class give {
    constructor(interaction) {
        this.interaction = interaction;
        this.userData = JSON.parse(fs.readFileSync("./userData.json"));
        this.execute();
    }
    execute() {
        var user = this.interaction.options.filter(option => { return option.name === 'user' })
        var amount = this.interaction.options.filter(option => { return option.name === 'amount' })
        if (userData.filter(user => user.id === this.interaction.user.id).balance >= amount) {
            userData.filter(user => user.id === this.interaction.user.id).balance -= amount
            userData.filter(user => user.id === user).balance += amount
            this.interaction.reply(`<@${this.interaction.user.id}> gave ${amount} to <@${user.id}>`)
        }
        else {
            this.interaction.reply(`You too poor to give that much!`)
        }
        fs.writeFileSync("./userData.json", JSON.stringify(this.userData));
    }
}
module.exports = give;