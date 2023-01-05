import wordBank from "./Wordle-Bank.txt";
export const generateWordSet = async () => {
    let wordSet;
    await fetch(wordBank)
        .then((response) => response.text())
        .then((result) => {
            const wordArr = result.split("\n");
            //console.log(wordArr);
            wordSet = new Set(wordArr);
            //const type1 = typeof (wordSet);
            //console.log(type1);
            console.log(wordSet);
        });
    return { wordSet };
};