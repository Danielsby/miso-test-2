#!/usr/bin/env node

// IMPORTANT
// Because the print does not fully work ill use constants as a work-around for now, please write two random numbers.
// I'll try to solve it later if I've time. I might simplify the numbers a bit as well.
// I left some comments for displaying how I was thinking and planning in the process.

// Requires yargs
const yargs = require("yargs");
const utf8 = require('utf8');

// TODO: This method also needs to do it reversed (back to korean)
function identifyNumber(koreanStringNumber) {
  const koreanNumber0To9 = ["영", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"]; // 0 - 9
  const koreanNumbers100to10000 = ["십", "백", "천", "만"]; // 10, 100, 1000, 10 000
  let numbers = [];

  for (let i = 0; i < koreanStringNumber.length; i++) {
    if (koreanNumber0To9.includes(koreanStringNumber[i])) {
      for (let j = 0; j < koreanNumber0To9.length; j++) {
        if (koreanNumber0To9[j] === koreanStringNumber[i]) {
          numbers[i] = j;
        }
      }
    } else if (koreanNumbers100to10000.includes(koreanStringNumber[i])) {
      for (let j = 0; j < koreanNumbers100to10000.length; j++) {
        if (koreanNumbers100to10000[j] === koreanStringNumber[i]) {
          numbers[i] = 10 ** (j+1); // Return
        }
      }
    }
  }

  return numbers;
}

function findCompleteDigits(firstNumberDigits) {
  const completeDigits = [];

  let removeNumberLocation;
  for(let i = 0; i < firstNumberDigits.length; i++) {
    if (firstNumberDigits[i] === 10 && i !== 0) {
      completeDigits[i] = firstNumberDigits[i] * firstNumberDigits[i-1]
      removeNumberLocation = i - 1;
    } else {
      completeDigits[i] = firstNumberDigits[i];
    }
  }

  completeDigits.splice(removeNumberLocation, 1);
  return completeDigits;
}

function getCompleteNumber(digits) {
  let i, finalNumber = 0;
  for (i = 0; i < digits.length; i++) {
    finalNumber = finalNumber + digits[i];
  }

  return finalNumber;
}

// FIXME: terminal print fails when sending the arguments. Currently not in use.
const myArgs = process.argv.slice(2);
// const firstStringNumber = myArgs[0];
// const secondStringNumber = myArgs[1];
// const someEncodedString = Buffer.from(firstStringNumber, 'utf-8');

const firstKoreanNumber = "삼십사"; // 34 (the working number)
// const secondKoreanNumber = '십백천만억조'; // 10^12 (trillion)
const thirdKoreanNumber = "백"; // Simplified test number - tests the scale and details later.
const koreanNumbers100to10000 = ["십", "백", "천", "만"]; // 10, 100, 1000, 10 000

const re = /[\u3131-\uD79D]/ugi
const splitFirstNumber = (firstKoreanNumber.match(re));
// const splitThirdNumber = (thirdKoreanNumber.match(re)); // FIXME
const firstNumberDigits = identifyNumber(splitFirstNumber);

// firstKoreanNumber (삼십사) works!
const firstOfficialDigits = findCompleteDigits(firstNumberDigits);
const completeNumber = getCompleteNumber(firstOfficialDigits);

// Expected end result: firstKoreanWord (삼십사) + thirdKoreanWord (십) = 사십사
// TODO (work left): do the same with the second number. Find the right number. Reverse it back to korean. Print.
console.log("The first number (converted from korean) to calculate is: ", completeNumber);