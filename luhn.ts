
//////////////////////////////////////////
/////////// CLASS CheckNumber ///////////
////////////////////////////////////////

/*
    METHODS ===>
    - private sumDigit(numArr: string[])
    - private check(numArrCheck: string[])
    - public runCheck()
*/

import { error, log } from "console";
import { LuhnSum } from "./sum";
import { Regex } from "./regex";

const args = process.argv.slice(2);

class CheckNumber {

    private LuhnSumCalculator: LuhnSum;
    private numberArray: string[];
    private RegexCheck: Regex;
    private inputDigits: string;

    constructor() {
        this.LuhnSumCalculator = new LuhnSum(); // Sum
        this.inputDigits = args[args.length - 1];
        this.numberArray = this.inputDigits.split(''); // Array of input digits
        this.RegexCheck = new Regex();
    }

    // Chaking the input and returning if Valide Ok | Not | key digit
    private check(numArrCheck: string[]) {

        if (this.RegexCheck.testFull(this.inputDigits)) {

            if (numArrCheck.length === 15) {

                let arrayMiss: string[] = [...numArrCheck, '0']; // ... extends numArrCheck by adding 0 in the end
                const sumDigitMiss = this.LuhnSumCalculator.calculLuhnSum(arrayMiss);
                const missingDigit = 10 - (sumDigitMiss % 10); //  Finding the key ( last digit )
                log(`Looks like you forgot a digit => ${missingDigit}`);
                log(`Try with a full 16 digits number.`);

            } else {

                const sumDigitFull = this.LuhnSumCalculator.calculLuhnSum(this.numberArray);
                switch (sumDigitFull % 10) {
                    case 0:
                        log('OK');
                        break;
                    default:
                        log('KO');
                        error('The sum is not a multiple of 10.');
                        break;
                }
            }
        }
    }

    public runCheck() {
        return this.check(this.numberArray);
    }
}

const checker = new CheckNumber();
checker.runCheck();



// node luhn.js -c 5140256942783646 | cat -e     OK
// node luhn.js -c 5140256942783546 | cat -e     KO
// node luhn.js -f 192924593889831 | cat -e      Digit missing

