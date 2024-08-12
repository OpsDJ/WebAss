// 添加新的输入框
function addInput() {
  const inputsContainer = document.getElementById('inputs');
  const numberInput = document.createElement('input');
  numberInput.type = 'text';
  numberInput.className = 'number';
  numberInput.placeholder = '数字';

  const operatorSelect = document.createElement('select');
  operatorSelect.className = 'operator';
  operatorSelect.innerHTML = `
      <option value="+">+</option>
      <option value="-">-</option>
      <option value="*">*</option>
      <option value="/">/option>
      <option value="=">=</option>
  `;

  inputsContainer.appendChild(numberInput);
  inputsContainer.appendChild(operatorSelect);
}

// 计算结果
function calculateDynamic() {
  const inputsContainer = document.getElementById('inputs');
  const numbers = Array.from(inputsContainer.getElementsByClassName('number'));
  const operators = Array.from(inputsContainer.getElementsByClassName('operator'));

  try {
      let result = parseFloat(numbers[0].value);
      if (isNaN(result)) {
          throw new Error('无效的数字格式');
      }

      for (let i = 0; i < operators.length; i++) {
          const operator = operators[i].value;
          const num = parseFloat(numbers[i + 1].value);

          if (isNaN(num)) {
              throw new Error('无效的数字格式');
          }

          switch (operator) {
              case '+':
                  result += num;
                  break;
              case '-':
                  result -= num;
                  break;
              case '*':
                  result *= num;
                  break;
              case '/':
                  if (num === 0) {
                      throw new Error('除数不能为零');
                  }
                  result /= num;
                  break;
              case '=':
                  break;
              default:
                  throw new Error('未知的运算符');
          }
        }
  }catch(e){
      console.log(e.message);
  }
  return result;
}