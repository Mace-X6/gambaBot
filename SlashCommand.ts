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
        number = number.toLowerCase().replace(/ /g, '').replace(/,/g, '');

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
                if (number.includes('k') || number.includes('m') || number.includes('b')) {
                    switch (number.slice(-1)) {
                        case 'k':
                            out = parseInt(number.slice(0, -1)) * 10**3;
                            break;
                        case 'm':
                            out = parseInt(number.slice(0, -1)) * 10**6;
                            break;
                        case 'b':
                            out = parseInt(number.slice(0, -1)) * 10**9;
                            break;
                        default:
                            out = parseInt(number);
                            break;
                    }
                }
                //check if number only contains numbers
                else if (number.match(/^[0-9]+$/)) {
                    out = parseInt(number);
                }
                else {
                    out = 0;
                }
                break;
        }
        return out;
    }
}
