const array = [1, 2, 4, 5];
const result = array.reduce((e, a, i, array) => {
    return e*a;
});

console.log(result);
Promise.all()
// const { Observable } = require("rxjs");

// // });
// let arr1= [1,2,3,[4,[5,6,7,[8]]]];

// const result = [];
// function flat(arr) {
// arr.forEach(e => {
//     // console.log(e);
//     // console.log(e.length);
//     if(!e.length){
//         result.push(e);
//     } else {
//         flat(e);
//     }
// });
// }
// flat(arr1);

// console.log(result);

// const temp = new Observable(observer => {
//     observer.next({data:'1'});
// });

// temp.subscribe(res => {
//     console.log(res);
// })

// function customObservable(func) {
//     prototype.func(data){
        
//     }
// }

// function func1 () {
// }

// var fun1 = new func1();

// var fun1 = 1;
// a
// let a = 1;
// const c = 1;
// c= 3;

// setTimeout(()=> {}, 1000)

// for(var i = 1; i<=10; i++) {
//     setTimeout(() => {
//         console.log(i);
//     }, 0);
// }