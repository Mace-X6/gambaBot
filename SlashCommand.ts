export abstract class SlashCommand {

    protected interaction: any;
    protected userData: Array<User>;
    constructor(interaction: any, userData: Array<User>) {
        this.interaction = interaction;
        this.userData = userData;
        this.execute();
    }
    abstract execute(): void;

    protected getAmount(number: string, user: any): number {
        let out: number = 0;
        console.log(number)
        switch (number) {
            case 'all':
                out = user.balance;
                break;
            case 'half':
                out = Math.floor(user.balance / 2);
                break;
            case 'quarter':
                out = Math.floor(user.balance / 4);
                break;
            default:
                if (RegExp('^\d+(?:[kmb])?$').test(number)) {
                    switch (number.slice(-1)) {
                        case 'k':
                            out = parseInt(number.slice(0, -1)) * 1000;
                            break;
                        case 'm':
                            out = parseInt(number.slice(0, -1)) * 1000000;
                            break;
                        case 'b':
                            out = parseInt(number.slice(0, -1)) * 1000000000;
                            break;
                        default:
                            out = parseInt(number);
                            break;
                    }
                }
                else if (RegExp('^-?\d+$').test(number)) {
                    out = parseInt(number);
                }
                break;
        }
        return out;
    }
}
