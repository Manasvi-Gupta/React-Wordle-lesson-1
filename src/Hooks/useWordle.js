import { useState } from 'react'
//import { generateWordSet } from '../Components/WordSet'

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0)
  const [currentGuess, setCurrentGuess] = useState('')
  const [guesses, setGuesses] = useState([...Array(6)]) // each guess is an array
  const [history, setHistory] = useState([]) // each guess is a string
  const [isCorrect, setIsCorrect] = useState(false)
  const [usedKeys, setUsedKeys] = useState({}) // {a: 'grey', b: 'green', c: 'yellow'} etc
 //const [wordSet, setWordSet] = useState(new Set());
  const sols=[];
  let j=0;
  for(let i=2;i<7;i++){
    sols[j]=solution[i];
    j++;
  }
  const txt=''.concat(...sols);

  //const txt=sols.toString();
  
  /*useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      //console.log(words);
    });
  }, []);*/


  // format a guess into an array of letter objects 
  // e.g. [{key: 'a', color: 'yellow'}]
  const formatGuess = () => {
    let solutionArray = [...solution]
    //console.log(solutionArray);
    console.log(currentGuess);
    //console.log(sols);
    console.log(txt);
    let formattedGuess = [...currentGuess].map((l) => {
      return {key: l, color: "grey"}
    })

    // find any green letters
    formattedGuess.forEach((l, i) => {
      //console.log('Now cloring Green'+i);
      //console.log(l.key);
      //console.log(solution[i+2]);
      if (solution[i+2] ===l.key)
      {
        //console.log('Now cloring Green');
        formattedGuess[i].color = "green";
        solutionArray[i] = null
      }
    })
    
    // find any yellow letters
    formattedGuess.forEach((l, i) => {
      if (solution.includes(l.key) && l.color !== 'green') {
        l.color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null
      }
    })

    return formattedGuess
  }

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (formattedGuess) => {
      if(currentGuess===txt){
        setIsCorrect(true)
        //console.log('You won');
      }
      setGuesses((prevGuesses) =>{
        let newGusses=[...prevGuesses]
        newGusses[turn]=formattedGuess
        return newGusses
      })
      setHistory((prevHistory)=>{
        return[...prevHistory,currentGuess]
      })
      setTurn((prevTurn)=>{
        return prevTurn+1
      })
      setUsedKeys(prevUsedKeys => {
        formattedGuess.forEach(l => {
          const currentColor = prevUsedKeys[l.key]
  
          if (l.color === 'green') {
            prevUsedKeys[l.key] = 'green'
            return
          }
          if (l.color === 'yellow' && currentColor !== 'green') {
            prevUsedKeys[l.key] = 'yellow'
            return
          }
          if (l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
            prevUsedKeys[l.key] = 'grey'
            return
          }
        })
  
        return prevUsedKeys
      })
      setCurrentGuess('')
  }

  // handle keyup event & track current guess
  // if user presses enter, add the new guess
  const handleKeyup = ({ key }) => {
    if (key === 'Enter') {
      // only add guess if turn is less than 5
      if (turn > 5) {
        console.log('you used all your guesses!')
        return
      }
      // do not allow duplicate words
      if (history.includes(currentGuess)) {
        console.log('you already tried that word.')
        return
      }
      // check word is 5 chars
      if (currentGuess.length !== 5) {
        console.log('word must be 5 chars.')
        return
      }
       /* const type1 = typeof (currentGuess);
        console.log(type1);
      console.log(wordSet)*/
       /* if(wordSet.has(currentGuess)){
       console.log("Your word is correct");
        
        const formatted = formatGuess()
        console.log(formatted)
        addNewGuess(formatted)}
      else{
          alert("Not a word");
      }*/
      const formatted = formatGuess()
      console.log(formatted)
      addNewGuess(formatted)
    }
    if (key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1))
      return
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess(prev => prev + key)
      }
    }
  }

  return { turn, currentGuess, guesses, isCorrect,usedKeys ,handleKeyup }
}

export default useWordle