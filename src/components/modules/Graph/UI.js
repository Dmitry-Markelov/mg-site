// class UI {

//     constructor({ addFunction, removeFunction, changeColor, getIntegralByIndex, setIntegralRange, setIntegralStatus }) {
//         this.addFunction = addFunction;
//         this.removeFunction = removeFunction;
//         this.changeColor = changeColor;
//         this.getIntegralByIndex = getIntegralByIndex;
//         this.setIntegralRange = setIntegralRange;
//         this.setIntegralStatus = setIntegralStatus;

//         this.num = 0;

//         const _btn = document.getElementById('addFunction');
//         _btn.addEventListener('click', () => this.addFunctionHandler());
//     }

//     addFunctionHandler() {

//         const fwrap = document.createElement('div');
//         fwrap.classList.add('f-wrap');

//         const input = document.createElement('input');
//         input.classList.add('graph-input');
//         input.classList.add('g-i-1');
//         input.dataset.num = this.num;
//         input.dataset.color = "#000000";

//         input.addEventListener('keyup', (event) => {
//             this.keyupHandler(event);
//             checkbox.checked = false;
//             this.setIntegralStatus(input.dataset.num, false);
//         });

//         const a = document.createElement('input');
//         a.classList.add('graph-input');
//         a.classList.add('g-i-4');
//         a.addEventListener('keydown', () => { checkbox.disabled = true; });
        
//         a.addEventListener('keyup', () => {
//             checkbox.disabled = false;
//             if (checkbox.checked) {
//                 const integral = this.getIntegralByIndex(input.dataset.num, a.value, b.value);
//                 this.setIntegralRange(input.dataset.num, a.value, b.value);
//             }
//         });

//         const b = document.createElement('input');
//         b.classList.add('graph-input');
//         b.classList.add('g-i-5');
//         b.addEventListener('keydown', () => { checkbox.disabled = true; });

//         b.addEventListener('keyup', () => {
//             checkbox.disabled = false;
//             if (checkbox.checked) {
//                 const integral = this.getIntegralByIndex(input.dataset.num, a.value, b.value);
//                 this.setIntegralRange(input.dataset.num, a.value, b.value);
//             }
//         });

//         const checkbox = document.createElement('input');
//         checkbox.setAttribute('type', 'checkbox');
//         checkbox.classList.add('g-i-6');

//         checkbox.addEventListener('click', () => {
//             try {
//                 this.setIntegralStatus(input.dataset.num, checkbox.checked);
//                 if (checkbox.checked) {
//                     const integral = this.getIntegralByIndex(input.dataset.num, a.value, b.value);
//                     this.setIntegralRange(input.dataset.num, a.value, b.value);
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         });

//         const button = document.createElement('button');
//         button.classList.add('g-i-3');
//         button.innerHTML = 'x';

//         button.addEventListener('click', () => {
//             this.removeFunction(input.dataset.num);
//             div.removeChild(fwrap);
//         });

//         const div = document.getElementById('funcList');

//         const colorInput = document.createElement('input');
//         colorInput.classList.add('g-i-2');
//         colorInput.setAttribute("type", "color");

//         colorInput.addEventListener('input', () => {
//             try {
//                 this.changeColor(colorInput.value, input.dataset.num);
//             }
//             catch (e) {
//                 console.log(e);
//             }
//             input.dataset.color = colorInput.value;
//         });

//         fwrap.appendChild(input);
//         fwrap.appendChild(colorInput);
//         fwrap.appendChild(button);
//         fwrap.appendChild(a);
//         fwrap.appendChild(b);
//         fwrap.appendChild(checkbox);

//         div.appendChild(fwrap);

//         this.num++;
//     }
//     keyupHandler(event) {
//         try {
//             let f;
//             eval(`f = function(x) {
//                 return ${event.target.value};
//             }`);
//             this.addFunction(f, event.target.dataset.num, event.target.dataset.color);
//         }
//         catch (e) {
//             console.log(e);
//         }
//     }
// }