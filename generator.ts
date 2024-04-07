//////////////////////////////////////////
/////////// CLASS CheckNumber ///////////
////////////////////////////////////////

/*
    METHODS ===>
    - private sumDigit(numArr: string[])
    - private check(numArrCheck: string[])
    - public runCheck()
*/

import { log } from "console";
import { Regex } from "./regex";
import { LuhnSum } from "./sum";


const args = process.argv.slice(2);

class GenerateCard {
    private sum: LuhnSum;
    private regexCheck: Regex;
    private inputType: string;
    private inputBank: string;
    private isValidBankInput;
    private isValidTypeInput;

    constructor() {
        this.sum = new LuhnSum();
        this.regexCheck = new Regex();
        this.inputType = args[0];
        this.inputBank = args[1];
        this.isValidBankInput = this.regexCheck.testInputBank(this.inputBank);
        this.isValidTypeInput = this.regexCheck.testInputType(this.inputType);
    }

    public runCheck(): void {
        if (this.isValidBankInput && this.isValidTypeInput) { // Use '&&' for logical AND
            this.generateCardNumber(this.inputBank, this.inputType);
        }
    }

    private generateCardNumber(bank: string, type: string) {
        const banksList = {
            "CREDIT LYONNAIS - LCL": ["415055", "598768"],
            "BNP PARIBAS": ["406714", "597687"],
            "CREDIT AGRICOLE, S.A.": ["453315", "597687"]
        };

        let bankNames = Object.keys(banksList);
        let bankBinNumber = Object.values(banksList);
        let firstSix = '';
        let nameChoice = '';

        bank = bank.toUpperCase(); // Update bank variable

        switch (bank) {
            case 'L':
                nameChoice = bankNames[0];
                firstSix = type === '-v' ? bankBinNumber[0][0] : bankBinNumber[0][1];
                break;
            case 'B':
                nameChoice = bankNames[1];
                firstSix = type === '-v' ? bankBinNumber[1][0] : bankBinNumber[1][1];
                break;
            case 'A':
                nameChoice = bankNames[2];
                firstSix = type === '-v' ? bankBinNumber[2][0] : bankBinNumber[2][1];
                break;
            default:
                console.log('\x1b[31m%s\x1b[0m', 'Bank not supported.');
                return;
        }

        const randomAccountNumber = this.generateRandomAccountNumber();
        const visaOrMaster = type === '-v' ? 'Visa Card' : 'Master Card';
        const fullNumber = firstSix + randomAccountNumber;
        const sumLuhn = this.sum.calculLuhnSum(fullNumber.split(''));
        const key = (10 - (sumLuhn % 10)) % 10;
        const bankAccountNumber = fullNumber + key;

        const isValidCardNumber = this.regexCheck.testCard(bankAccountNumber);

        if (isValidCardNumber) {

            log(``);

            log('\x1b[33m%s\x1b[0m', `The number ${bankAccountNumber} was generated for your Card`);
            log('\x1b[33m%s\x1b[0m', `You have chosen ${nameChoice} BANK`);

            DETAILS:
            log('==========================================');
            log('\x1b[33m%s\x1b[0m', `Type : ${visaOrMaster}`);
            log('\x1b[33m%s\x1b[0m', `Bank BIN number : ${firstSix}`);
            log('\x1b[33m%s\x1b[0m', `Account unique number : ${randomAccountNumber}`);
            log('\x1b[33m%s\x1b[0m', `Luhn key digit : ${key}`);
            log('==========================================');
            log('\x1b[35m%s\x1b[0m', 'Done, now TEA TIME.');

            log(``);

        }
    }

    private generateRandomAccountNumber() {
        let longNumber = '';
        for (let i = 0; i < 9; i++) {
            longNumber += Math.floor(Math.random() * 10);
        }
        return longNumber;
    }

}

// Let's run the check
const generator = new GenerateCard();
generator.runCheck();



//node generator.js -v A
//node generator.js -m B