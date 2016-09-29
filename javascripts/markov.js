// takes in strList, which is a list of example strings.
// generates on a char basis, so it makes new words, not sentences
markovReadChars = function markovReadChars(strList, depth=2, delimiter="") {
  if (depth < 2) return;
  let markov = {}
  markov.starts = []


  strList.forEach(word => {
    let splitWord = word;
    if(delimiter) splitWord = splitWord.split(delimiter);
    splitWord += '@';
    markov.starts.push(splitWord.slice(0, depth));
    for (let i = 0; i < splitWord.length - depth; i++) {
      const chunk = splitWord.slice(i, i+depth);
      if (chunk in markov)
        markov[chunk].push(splitWord[i+depth]);
      else
        markov[chunk] = [splitWord[i+depth]];
    }
  });
  return markov;
}

markovGenerate = function markovGenerate(marObj, times, depth=2) {
  if (depth < 2) return;
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
    let k = s.slice(0,depth);
    while (k[depth-1] != '.') {
      // console.log('test');
      let temp = next;
      if (k in marObj) {
        next = marObj[k][Math.floor(Math.random() * marObj[k].length)];;
      } else {
        // s = "";
        break;
      }
      s += (next || '@');
      k = temp + next;
    }
    // depth + 1 is used because of the newline
    if (!!s && s.length) {
      words.push(s.slice(0,-1));
      i++;
    }
  }
  return words;
}

function replacePunctuation(corpus) {
  let re = /(\.|\?)/;
  return corpus.replace(re, "$1\n");
}

function gen(times=25, depth=2) {
  if ($("#names")[0].value === "") return;
  let names = replacePunctuation($("#names")[0].value).split('\n');
  let words = markovGenerate(markovReadChars(names, depth), times, depth);
  $("#generatedNames")[0].value = words.join('\n');
}

window.onload = function() {
  document.getElementById("genButton").addEventListener("click", function(event) {
      gen($("#times")[0].value);
  }, false);
}
