// takes in strList, which is a list of example strings.
// generates on a char basis, so it makes new words, not sentences
markovReadChars = function markovReadChars(strList) {
  let markov = {}
  markov.starts = []


  strList.forEach(word => {
    let splitWord = word;
    splitWord += '.';
    markov.starts.push(splitWord[0] + splitWord[1]);
    for (let i = 0; i < splitWord.length - 2; i++) {
      const chunk = splitWord[i] + splitWord[i+1];
      if (chunk in markov)
        markov[chunk].push(splitWord[i+2]);
      else
        markov[chunk] = [splitWord[i+2]];
    }
  });
  return markov;
}

markovGenerate = function markovGenerate(marObj, times) {
  let words = [];
  let i = 0;
  while (i < times) {
    let next = ''
    const start = marObj.starts[Math.floor(Math.random() * marObj.starts.length)];;
    // console.log(start);
    if (start in marObj) {
      next = marObj[start][Math.floor(Math.random() * marObj[start].length)];;
    } else {
      continue;
    }
    let s = start + next;
    let k = s[1] + s[2];
    while (k[1] != '.') {
      // console.log('test');
      let temp = next;
      if (k in marObj) {
        next = marObj[k][Math.floor(Math.random() * marObj[k].length)];;
      } else {
        // s = "";
        break;
      }
      s += (next || '.');
      k = temp + next;
    }
    if (!!s) {
      words.push(s.slice(0,-1));
      i++;
    }
  }
  return words;
}

function gen() {
  let words = markovGenerate(markovReadChars($("#names")[0].value.split('\n')), 25);
  $("#generatedNames")[0].value = words.join('\n');
}

window.onload = function() {
  document.getElementById("genButton").addEventListener("click", function(event) {
      gen();
  }, false);
}
