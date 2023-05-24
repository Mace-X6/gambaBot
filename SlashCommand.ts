export abstract class SlashCommand {
    
    protected interaction: any;
    protected userData: Array<User>;
    constructor(interaction: any, userData: Array<User>) {
        this.interaction = interaction;
        this.userData = userData;
        this.execute();
    }
    abstract execute(): void;
}