function calculateZ(formula) {
    function evaluateExpression(x, y, formula) {
        formula = formula.replace(/x/g, x).replace(/y/g, y);
        let numStack = [], opStack = [], i = 0;
        while (i < formula.length) {
            let char = formula[i];
            if (char === ' ' || char === '\t') { i++; continue; }
            if (char === '(') { opStack.push(char); i++; }
            else if (char === ')') {
                while (opStack.length > 0 && opStack[opStack.length - 1] !== '(') {
                    processOperator(numStack, opStack.pop());
                }
                opStack.pop(); i++;
            } else if (isDigit(char) || char === '-') {
                let num = '';
                if (char === '-') { num = '-'; i++; char = formula[i]; }
                while (isDigit(char) || char === '.') {
                    num += char; i++; char = formula[i];
                }
                numStack.push(parseFloat(num));
            } else if (isAlpha(char)) {
                let func = '';
                while (isAlpha(char)) { func += char; i++; char = formula[i]; }
                if (['sin', 'cos', 'tg', 'ctg'].includes(func)) {
                    i++; let param = '', startIdx = i;
                    while (formula[i] !== ')') { param += formula[i]; i++; }
                    let paramValue = evaluateExpression(x, y, param);
                    let result = applyFunction(func, paramValue);
                    numStack.push(result); i++;
                }
            } else if (['+', '-', '*', '/', '^'].includes(char)) {
                while (opStack.length > 0 && precedence(opStack[opStack.length - 1]) >= precedence(char)) {
                    processOperator(numStack, opStack.pop());
                }
                opStack.push(char); i++;
            } else { i++; }
        }
        while (opStack.length > 0) { processOperator(numStack, opStack.pop()); }
        return numStack[0];
    }

    function processOperator(numStack, operator) {
        let b = numStack.pop(), a = numStack.pop(), result;
        switch (operator) {
            case '+': result = a + b; break;
            case '-': result = a - b; break;
            case '*': result = a * b; break;
            case '/': result = b === 0 ? NaN : a / b; break;
            case '^': result = Math.pow(a, b); break;
        }
        numStack.push(result);
    }

    function applyFunction(func, value) {
        switch (func) {
            case 'sin': return Math.sin(value);
            case 'cos': return Math.cos(value);
            case 'tg': return Math.tan(value);
            case 'ctg': return value === 0 ? Infinity : 1 / Math.tan(value);
            default: return NaN;
        }
    }

    function precedence(operator) {
        if (operator === '+' || operator === '-') { return 1; }
        if (operator === '*' || operator === '/') { return 2; }
        if (operator === '^') { return 3; }
        return 0;
    }

    function isDigit(char) { return char >= '0' && char <= '9'; }
    function isAlpha(char) { return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z'); }

    for (let x = -25; x <= 25; x += 0.5) {
        for (let y = -25; y <= 25; y += 0.5) {
            let result = evaluateExpression(x, y, formula);
            if (!(isNaN(result))) {
                console.log(`x: ${x}, y: ${y}, z: ${result}`);
            }
        }
    }
}

calculateZ("10");