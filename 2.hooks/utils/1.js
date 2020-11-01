/**
 * 纯函数
 * 副作用
 * 1.相同的参数返回相同的结果
 * 2.不能修改作用域外的变量
 */
function sum(a,b){
    return a+b;
}
function sum2(a,b){
    window.a = 'c';
    return a+b;
}