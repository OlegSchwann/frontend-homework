/*
Напишите функцию `solve`, которая принимает на вход строку с математическим выражением,
зависящим от переменной x и значение этой переменной, а возвращает вычисленное значение этого выражения.
В выражении фигурируют операции сложения, вычитания, умножения. Используются только целые числа и скобки.

Если выражение содержит только допустимые символы 0123456789+-*x() и нет использования x как функции:
    создаём функцию от x с переданным выражением в виде тела
    возвращаем результат вызова этой функции от х
иначе кидаем ошибку распознования выражения.

Можно было и без eval(), но алгоритм сортировочной станции я уже писал.
'https://github.com/OlegSchwann/course_C/blob/master/Задача B-6 калькулятор для строк/main.c'
Xотелось решить за наименьшее число строк кода.
*/

"use strict";

let AllowedSymbols = RegExp(/^[\d\-+*x()\s]+$/);
let FunctionCalls = RegExp(/x\d*\s*\(/);

const solve = (expression, x) => {
    if (!AllowedSymbols.test(expression)) {
        throw SyntaxError(`Only 0123456789+-*x() characters can be in an expression, but got ${expression}.`);
    }
    if (FunctionCalls.test(expression)) {
        throw SyntaxError(`'x' ca't be a function, but got ${expression}.`);
    }
    if (typeof(x) !== 'number' && typeof(x) !== 'undefined') {
        throw SyntaxError(`'x' mast be a number or undefined, got ${typeof(x)}.`);
    }
    return Function("x", `return ${expression};`)(x);
};
