

let states = [];
let index = 0;

function useState(number){

    states[index]=number;
    let currentIndex = index;
    index++;
    return states[currentIndex];
}

let r1= useState(1);
let r2= useState(2);
let r3= useState(3);
console.log(states);
console.log(r1,r2,r3);
//永远不要循环和if判断中使用hooks