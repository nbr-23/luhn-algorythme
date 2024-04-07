# Luhn-algorythme
Luhn algorythme - numbers validity check |  credit card number generator

### Credit card number generator

To run the files you need to have node.js installed

In the generator.ts file we have a code to generate a credit card number that you can call with two options : 
- first option is -v or -m, where -v for visa and -m for master card number generation.
- second option is B  , A or L  where : A for  "CREDIT AGRICOLE, S.A." bank security fist 6 digits, B  for  "BNP PARIBAS" and L for "CREDIT LYONNAIS - LCL".

So the code will generate a number with 6 fist bank identifier digits + 9 random digits for account unique number + Luhn key as a 16 th digit.

For exemple : 
- node generator.js -v A
- node generator.js -m B

### Luhn algorythme - numbers validity check

The file luhn.ts will check if the input number is a valid number by checkig the Luhn key.

This code is for 16 digits numbers only.

If the input number is 15 numbers , the code will generate the 6th number ( Luhn key ) to return a valide number !

Exemple of inputs : 
- node luhn.js -c 5140256942783646   => will return =  OK for valide number
- node luhn.js -c 5140256942783546   => will return =  KO for unvalide number
- node luhn.js -f 192924593889831    => will return a number with valid number as a digit is missing

=================

And that's it ! Tea Time now ☕️ :p

======
<center>

```
TTTTT  EEEEE  AAAAAA     TTTTT  III  MMMM MMMM  EEEEE
  T    E      A    A       T     I   M  M M  M  E    
  T    EEE    AAAAAA       T     I   M   M   M  EEE  
  T    E      A    A       T     I   M       M  E    
  T    EEEEE  A    A       T    III  M       M  EEEEE
```
</center>
