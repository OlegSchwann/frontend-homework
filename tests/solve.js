'use strict';

QUnit.module('Тестируем функцию solve', () => {
    QUnit.test("Возращает корректное простое значение.", (assert) => {
        assert.strictEqual(solve("1"), 1, "solve('1', x=1) === 1");
    });

    QUnit.test("Корректное вычисление простых выражений.", (assert) => {
        assert.strictEqual(solve("2 + 2"), 4, "solve('2 + 2') === 4");
        assert.strictEqual(solve("4 + 2 - 3 * 10"), -24, "solve('4 + 2 - 3 * 10') === -24");
    });

    QUnit.test("Корректная работа со скобками.", (assert) => {
        assert.strictEqual(solve("(1 + 5) * (8 - 3)"), 30, "solve('(1 + 5) * (8 - 3)') == 30");
        assert.strictEqual(solve("((1) + ((2)) * ((3) + (4)))"), 15, "solve(((1) + ((2)) * ((3) + (4)))) === 15");
    });

    QUnit.test("Работа с вычислением 'х'.", (assert) => {
        assert.strictEqual(solve("x + 1", 1), 2, "solve('x + 1', 1) === 2");
        assert.strictEqual(solve("2 + x - 1", 5), 6, "solve('2 + x - 1', 5) === 6");
        assert.strictEqual(solve("2 * x - 1", 5), 9, "solve('2 * x - 1', 5) === 9");
        assert.strictEqual(solve("2 * ( x - 1 )", 5), 8, "solve('2 * ( x - 1 )', 5) === 8");
        assert.strictEqual(solve("(5 - x) * (x + 5)", 3), 16, "solve('(5 - x) * (x + 5)', 3) === 16");
        assert.strictEqual(solve("((5 - x) * (x + 5)) * x * x", 3), 144, "solve('((5 - x) * (x + 5)) * x * x', 3) === 144");
    });

    QUnit.test("Работает правильно со специальными константами", (assert) => {
        assert.strictEqual(solve("x + 23", Infinity), Infinity, "solve('x + 23') === Infinity");
        assert.strictEqual(solve("-x-1000000000", -Infinity), Infinity, "solve('-x-1000000000', -Infinity) === Infinity");
        assert.deepEqual(solve("x + 124", NaN), NaN, "solve('x + 124', NaN) === NaN");
    });

    QUnit.test("Отлавливает попытки инъекции JavaScript кода.", (assert) => {
        assert.throws(solve.bind(this, "Math.abs(x)", -1), SyntaxError, "Выпонен javascript.");
        assert.throws(solve.bind(this, "x(-1)", Math.abs), SyntaxError, "Выпонен javascript.");
    });
});
