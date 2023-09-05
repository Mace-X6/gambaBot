import { expect } from 'chai';
import 'jest-circus';
import { SlashCommand } from '../slashCommand';
import exp from 'constants';
const fs = require('fs');

describe('getAmount_should_return_correctly', () => {


    class itCommand extends SlashCommand {
        execute() {
            it('all should equal 1000', () => {
                expect(this.getAmount('all', { balance: 1000 })).equal(1000);
            })
            it('half should equal 500', () => {
                expect(this.getAmount('half', { balance: 1000 })).equal(500);
            })
            it('quarter should equal 250', () => {
                expect(this.getAmount('quarter', { balance: 1000 })).equal(250);
            })
            it('1k should equal 1000', () => {
                expect(this.getAmount('1k', { balance: 1000 })).equal(1000);
            })
            it('1m should equal 1000000', () => {
                expect(this.getAmount('1m', { balance: 1000000 })).equal(1000000);
            })
            it('1b should equal 1000000000', () => {
                expect(this.getAmount('1b', { balance: 1000000000 })).equal(1000000000);
            })
            it('4k should equal 4000', () => {
                expect(this.getAmount('4k', { balance: 4000 })).equal(4000);
            })
            it('3m should equal 3000000', () => {
                expect(this.getAmount('3m', { balance: 3000000 })).equal(3000000);
            });
            it('9b should equal 9000000000', () => {
                expect(this.getAmount('9b', { balance: 9000000000 })).equal(9 * 10 ** 9);
            });
            it('100 should equal 100', () => {
                expect(this.getAmount('100', { balance: 1000 })).equal(100);
            });
            it('100,000,000 should equal 100000000', () => {
                expect(this.getAmount('100,000,000', { balance: 1000 })).equal(100000000);
            });
            it('100 K should equal 100000', () => {
                expect(this.getAmount('100 K', { balance: 1000 })).equal(100000);
            });

        }
    }

    let itInstance = new itCommand(undefined, []);

});

// let interaction: any = {
//     commandName: 'beg',
//     user: {
//         id: '000000000000',
//         tag: 'user#0000',
//     },
//     followUp: (object: any) => {
//         something
//     },
// options: {
//     getUser: (string: string) => {
//         return {
//             id: '000000000001',
//             tag: 'otherUser#0000',
//         }
//     }
//     getString: (string: string) => {
//         return 'value';
//     }
// },
// }

describe('SlashCommand', () => {
    let commandPipeline = require('../commandPipeline');
    it('beg should send the correct request', () => {
        let userData = JSON.parse(fs.readFileSync('../userData.json'));
        userData.filter((user: any) => user.id === '000000000000')[0] = { tag: 'user#0000', id: '000000000000', balance: 1000, begTimeOut: 0, xp: 0 };
        fs.writeFileSync('../userData.json', JSON.stringify(userData));

        let interaction: any = {
            commandName: 'beg',
            user: {
                id: '000000000000',
                tag: 'user#0000',
            },
            followUp: (object: any) => {
                expect(object.content).not.exist;
            },
            options: []
        }

        new commandPipeline(interaction);
    });
    it('balance should send the correct request', () => {
        let userData = JSON.parse(fs.readFileSync('../userData.json'));
        userData.filter((user: any) => user.id === '000000000000')[0] = { tag: 'user#0000', id: '000000000000', balance: 1000, begTimeOut: 0, xp: 0 };
        userData.filter((user: any) => user.id === '000000000001')[0] = { tag: 'otherUser#0000', id: '000000000001', balance: 2000, begTimeOut: 0, xp: 0 };
        fs.writeFileSync('../userData.json', JSON.stringify(userData));

        let interaction: any = {
            commandName: 'balance',
            user: {
                id: '000000000000',
                tag: 'user#0000',
                avatarURL: () => {
                    return 'https://cdn.discordapp.com/avatars/000000000000/000000000000.png';
                }
            },
            followUp: (object: any) => {
                expect(object.embeds[0].description).to.contain('1000');
            },
            options: {
                length: 0,
                getUser: (string: string) => {
                    return null;
                }

            }
        }

        new commandPipeline(interaction);

        interaction = {
            commandName: 'balance',
            user: {
                id: '000000000000',
                tag: 'user#0000',
                avatarURL: () => {
                    return 'https://cdn.discordapp.com/avatars/000000000000/000000000000.png';
                }
            },
            followUp: (object: any) => {
                expect(object.embeds[0].description).to.contain('2000');
            },
            options: {
                length: 1,
                getUser: (string: string) => {
                    return {
                        id: '000000000001',
                        tag: 'otherUser#0000',
                        avatarURL: () => {
                            return 'https://cdn.discordapp.com/avatars/000000000001/000000000001.png';
                        }
                    };
                }

            }
        }
    });

    it('coinflip should send the correct request', () => {
        let userData = JSON.parse(fs.readFileSync('../userData.json'));
        userData.filter((user: any) => user.id === '000000000000').length ? userData.filter((user: any) => user.id === '000000000000')[0].balance = 1000 : userData.push({ tag: 'user#0000', id: '000000000000', balance: 1000, begTimeOut: 0, xp: 0 });
        userData.filter((user: any) => user.id === '000000000000').begTimeOut = 0;
        fs.writeFileSync('../userData.json', JSON.stringify(userData));

        let interaction: any = {
            commandName: 'coinflip',
            user: {
                id: '000000000000',
                tag: 'user#0000',
                avatarURL: () => {
                    return 'https://cdn.discordapp.com/avatars/000000000000/000000000000.png';
                }
            },
            followUp: (object: any) => {
                let userData = JSON.parse(fs.readFileSync('../userData.json'));
                if (object.embeds[0].description.includes('won')) {
                    expect(object.embeds[0].description).to.contain('2000');
                    expect(userData.filter((user: any) => user.id === '000000000000')[0].balance).to.equal(2000);
                }
                else {
                    expect(object.embeds[0].description).to.contain('0');
                    expect(userData.filter((user: any) => user.id === '000000000000')[0].balance).to.equal(0);
                }
            },
            options: {
                length: 1,
                getUser: (string: string) => {
                    return null;
                },
                getString: (string: string) => {
                    if (string === 'bet') {
                        return 'all';
                    }
                    else if (string === 'side') {
                        return 'heads';
                    }
                }
            }
        }

        new commandPipeline(interaction);

        userData = JSON.parse(fs.readFileSync('../userData.json'));
        userData.filter((user: any) => user.id === '000000000000').length ? userData.filter((user: any) => user.id === '000000000000')[0].balance = 1000 : userData.push({ tag: 'user#0000', id: '000000000000', balance: 1000, begTimeOut: 0, xp: 0 });
        fs.writeFileSync('../userData.json', JSON.stringify(userData));

        interaction = {
            commandName: 'coinflip',
            user: {
                id: '000000000000',
                tag: 'user#0000',
                avatarURL: () => {
                    return 'https://cdn.discordapp.com/avatars/000000000000/000000000000.png';
                }
            },
            followUp: (object: any) => {
                expect(object.content).to.contain('You too poor to bet that much!');
            },
            options: {
                length: 1,
                getUser: (string: string) => {
                    return null;
                },
                getString: (string: string) => {
                    if (string === 'bet') {
                        return 'deez';
                    }
                    else if (string === 'side') {
                        return 'nuts';
                    }
                }
            }
        }

        new commandPipeline(interaction);
    });
    it('dice should send the correct request', () => {
        let userData = JSON.parse(fs.readFileSync('../userData.json'));
        userData.filter((user: any) => user.id === '000000000000')[0] = { tag: 'user#0000', id: '000000000000', balance: 1000, begTimeOut: 0, xp: 0 };
        fs.writeFileSync('../userData.json', JSON.stringify(userData));

        let interaction: any = {
            commandName: 'dice',
            user: {
                id: '000000000000',
                tag: 'user#0000',
                avatarURL: () => {
                    return 'https://cdn.discordapp.com/avatars/000000000000/000000000000.png';
                }
            },
            followUp: (object: any) => {
                if (object.embeds[0].description.includes('won')) {
                    expect(object.embeds[0].description).to.contain('6000');
                }
            },
            options: {
                length: 1,
                getUser: (string: string) => {
                    return null;
                },
                getString: (string: string) => {
                    if (string === 'bet') {
                        return 'all';
                    }
                }
            }
        }
        new commandPipeline(interaction);

        userData = JSON.parse(fs.readFileSync('../userData.json'));
        userData.filter((user: any) => user.id === '000000000000')[0] = { tag: 'user#0000', id: '000000000000', balance: 1000, begTimeOut: 0, xp: 0 };
        fs.writeFileSync('../userData.json', JSON.stringify(userData));

        interaction = {
            commandName: 'dice',
            user: {
                id: '000000000000',
                tag: 'user#0000',
                avatarURL: () => {
                    return 'https://cdn.discordapp.com/avatars/000000000000/000000000000.png';
                }
            },
            followUp: (object: any) => {
                if (object.embeds[0].description.includes('won')) {
                    expect(object.embeds[0].description).to.contain('6000');
                }
                else {
                    expect(object.embeds[0].description).to.contain('0')
                }
            },
            options: {
                length: 1,
                getUser: (string: string) => {
                    return null;
                },
                getString: (string: string) => {
                    if (string === 'bet') {
                        return '10000000';
                    }
                }
            }
        }
        new commandPipeline(interaction);
    });

    it('give should send the correct request & make correct changes', () => {
        let userData = JSON.parse(fs.readFileSync('../userData.json'));
        userData.filter((user: any) => user.id === '000000000000')[0] = { tag: 'user#0000', id: '000000000000', balance: 1000, begTimeOut: 0, xp: 0 };
        userData.filter((user: any) => user.id === '000000000001')[0] = { tag: 'otherUser#0000', id: '000000000001', balance: 1000, begTimeOut: 0, xp: 0 };
        fs.writeFileSync('../userData.json', JSON.stringify(userData));

        let interaction: any = {
            commandName: 'give',
            user: {
                id: '000000000000',
                tag: 'user#0000',
                avatarURL: () => {
                    return 'https://cdn.discordapp.com/avatars/000000000000/000000000000.png';
                }
            },
            followUp: (object: any) => {
                userData = JSON.parse(fs.readFileSync('../userData.json'));
                let thisUser = userData.filter((user: any) => user.id === '000000000000')[0];
                let thatUser = userData.filter((user: any) => user.id === '000000000001')[0];

                expect(thisUser.balance).to.equal(900);
                expect(thatUser.balance).to.equal(1100);
            },
            options: {
                length: 1,
                getUser: (string: string) => {
                    return {
                        id: '000000000001',
                        tag: 'otherUser#0000',
                        avatarURL: () => {
                            return 'https://cdn.discordapp.com/avatars/000000000001/000000000001.png';
                        }
                    }
                },
                getString: (string: string) => {
                    if (string === 'amount') {
                        return '100';
                    }
                }
            }
        }

        new commandPipeline(interaction);
    });
});