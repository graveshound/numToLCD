console.log("Num to LCD");

const TOP = [' _ ', '   ', ' _ ', ' _ ', '   ', ' _ ', ' _ ', ' _ ', ' _ ', ' _ '];
const MID = ['| |', '  |', ' _|', ' _|', '|_|', '|_ ', '|_ ', '  |', '|_|', '|_|'];
const BOT = ['|_|', '  |', '|_ ', ' _|', '  |', ' _|', '|_|', '  |', '|_|', ' _|'];
const JUMP = '\n';

let numToArray = (num)=>{
    let digits = Array.from(num.toString());
    return digits;
}
let addJump = (row)=>{
    if (row.length>0){
        row+=JUMP;
    }
    return row;
}
let digitIndex = (digit)=>{
    let index = 0;
    if (!Number.isNaN(digit) && digit >= 1 && digit <= 9) {
        index = digit;
    } 
    return index;
}

let getRow = (rowPos, width, fill)=>{
    let result = '';
    let firstChar = rowPos[0];
    let middleChar = rowPos[1];
    if (fill) {
        middleChar = ' ';
    }
    let lastChar = rowPos[2];
    let middleCharCount = width - 2;
    
    result = result + firstChar;
    for (let i = 0; i < middleCharCount; i++) {
        result = result + middleChar;
    }
    result = result + lastChar;
    
    return result;
}

let defRow=(arrayNum,pos,width,fill)=>{
    let result = arrayNum.reduce((partial,actual)=>{
        let index = digitIndex(actual);           
        return partial + getRow(pos[index],width,fill);           
    }, '');
    return addJump(result);
}

let lcd=(num,width,height)=>{
    let arrayNum=numToArray(num);
    let middle=parseInt(height/2,10);
    let result;

    for (let i = 0; i < height; i++) {
        if (i === 0) { 
            result = defRow(arrayNum, TOP, width, false);
        } else if (i === height - 1) {
            result = result + defRow(arrayNum, BOT, width, false);
        } else if (i === middle) {
            result = result + defRow(arrayNum, MID, width, false);
        } else if (i < middle) {
            result = result + defRow(arrayNum, MID, width, true);
        } else {
            result = result + defRow(arrayNum, BOT, width, true);
        }
    }
    
    return result;
}

console.log(lcd(789,3,3))
console.log(lcd(789,5,5))
console.log(lcd(789,7,7))
console.log(lcd(9824123123214213213213,3,3))

