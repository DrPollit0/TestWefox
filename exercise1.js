// Execute with: node exercise1.js

const nth = 383; // nth from 1 to 500

let numbers = [];
for(let i=0 ; i<500 ; i+=1) numbers.push(Math.random());
numbers.sort();
console.log(numbers[nth-1]);
