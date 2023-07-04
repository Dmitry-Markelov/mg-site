function calculate() {
    function operandHandler(e) {
        const calc = new Calculator();
        const num1 = document.getElementById('num1');
        const num2 = document.getElementById('num2');
        const a = calc.getEntity(num1.value);
        const b = calc.getEntity(num2.value);
        const operand = e.target.dataset.operand;
        const c = calc[operand](a, b);
        document.getElementById('calc-result').innerHTML = c.toString();
    }

    document.querySelectorAll('.operand').
        forEach(e => e.addEventListener('click', operandHandler));
}