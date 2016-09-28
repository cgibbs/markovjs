const Markov = require('./markov.js');
const fs = require('fs');

const names = fs.readFileSync('greek_names.txt', 'utf-8').replace(/\r/g, '').split('\n');
let m = Markov.markovReadChars(names);
console.log(Markov.markovGenerate(m, 25));
