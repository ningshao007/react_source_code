//正向继承的话
class Parent{
    constructor(){
        console.log('Parent constructor');
    }
}

class Child extends Parent{
    constructor(){
        super();
        console.log('Child constructor');
    }
}
let child = new Child();
console.log(child);