import { expect } from 'chai';
import 'jest-circus';
import { SlashCommand } from '../slashCommand';

describe('getAmount_should_return_correctly', () => {


    class itCommand extends SlashCommand {
        execute(){
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
                expect(this.getAmount('9b', { balance: 9000000000 })).equal(9*10**9);
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