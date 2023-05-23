abstract class SlashCommand {
    
    protected interaction: any;
    protected userData: Array<User>;
    constructor(interaction) {
        this.interaction = interaction;
        this.userData = JSON.parse(fs.readFileSync("./userData.json"));
        this.execute();
    }
    abstract execute(): void;
}