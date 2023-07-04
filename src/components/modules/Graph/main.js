// window.onload = function () {

//     const funcs = [];

//     function printGrid() {
//         const { left, bottom, width, height } = win;
//         for (let i = 0; i < left + width; i++) {
//             plane.line(i, bottom, i, bottom + height, 'gray', 1);
//         }
//         for (let i = 0; i > left; i--) {
//             plane.line(i, bottom, i, bottom + height, 'gray', 1);
//         }
//         for (let i = 0; i < bottom + height; i++) {
//             plane.line(left, i, left + width, i, 'gray', 1);
//         }
//         for (let i = 0; i > bottom; i--) {
//             plane.line(left, i, left + width, i, 'gray', 1);
//         }

//         const sw = (win.width / 80 < 0.15) ? win.width / 80 : 0.15;

//         for (let i = 1; i < left + width; i++) {
//             plane.line(i, -sw, i, sw, 'black', 1.5);
//             plane.text(i, -0.75, i);
//         }
//         for (let i = -1; i > left; i--) {
//             plane.line(i, -sw, i, sw, 'black', 1.5);
//             plane.text(i, -0.75, i);
//         }
//         for (let i = 1; i < bottom + height; i++) {
//             plane.line(-sw, i, sw, i, 'black', 1.5);
//             plane.text(-0.75, i, i);
//         }
//         for (let i = -1; i > bottom; i--) {
//             plane.line(-sw, i, sw, i, 'black', 1.5);
//             plane.text(-0.75, i, i);
//         }

//         plane.text(-0.375, -0.375, 0);

//         //arrows
//         plane.line(-sw, bottom + height - 1.5 * sw, 0, bottom + height, "black", 2);
//         plane.line(sw, bottom + height - 1.5 * sw, 0, bottom + height, "black", 2);

//         plane.line(left + width - 1.5 * sw, -sw, left + width, 0, "black", 2);
//         plane.line(left + width - 1.5 * sw, sw, left + width, 0, "black", 2);

//         //axises
//         plane.line(left, 0, left + width, 0, 'black', 2);
//         plane.line(0, bottom, 0, bottom + height, 'black', 2);
//         if (win.height > 9) {
//             plane.text(left + width - 0.5, 0.5, 'x', null, "16px sans-serif");
//             plane.text(0.5, bottom + height - 0.5, 'y', null, "16px sans-serif");
//         }
//     }

//     let isMoveable = false;
//     function mousedown() {
//         isMoveable = true;
//     }
//     function mouseup() {
//         isMoveable = false;
//     }
//     function mousemove(event) {
//         if (isMoveable) {
//             const { movementX, movementY } = event;
//             win.left -= plane.sx(movementX);
//             win.bottom -= plane.sy(movementY);
//         }
//     }
//     function mouseleave() {
//         isMoveable = false;
//     }

//     const canvasCallbacks = {
//         wheel,
//         mousedown,
//         mouseup,
//         mousemove,
//         mouseleave
//     }

//     const win = {
//         left: -31,
//         bottom: -10,
//         width: 20,
//         height: 20
//     }

//     const zoom = 0.5;
//     function wheel(event) {
//         let delta = (event.wheelDelta > 0) ? -zoom : zoom;
//         if (win.width + delta > 0) {
//             win.width += delta * win.ratio;
//             win.left -= delta * win.ratio / 2;
//         }
//         if (win.height + delta > 0) {
//             win.height += delta;
//             win.bottom -= delta / 2;
//         }
//     }

//     const g = document.getElementById('addFunction').getBoundingClientRect();

//     const h = window.innerHeight - g.y;
//     const w = window.innerWidth * 0.8;

//     win.ratio = w / h;

//     const plane = new Canvas({ id: "canvas-plane", width: w, height: h, win, callbacks: canvasCallbacks });


//     function resize() {
//         plane.resize(window.innerWidth * 0.8, window.innerHeight - g.y);
//     }

//     window.addEventListener('resize', resize);

//     function printFunction(f, color, width) {
//         const dx = win.width / 500;
//         let x = win.left;
//         while (x < win.left + win.width) {
//             const y1 = f(x);
//             const y2 = f(x + dx);
//             if (Math.abs(y1 - y2) < win.height) {
//                 plane.line(x, y1, x + dx, y2, color, width);
//             } else {
//                 plane.line(x, y1, x + dx, y2, color, width + 2, true);
//             }
//             x += dx;
//         }
//     }

//     render();

//     function render() {
//         plane.clear();
//         printGrid();
//         try {
//             funcs.forEach(func => {
//                 if (func !== null) {
//                     printFunction(func.f, func.color);

//                     var coord = getZero(func.f, win.left, win.left + win.width);
//                     if (coord !== null) plane.point(coord, 0);

//                     if (func.isIntegralSelected) {
//                         printIntegral(func.f, func.a, func.b, func.color);
//                     }
//                 }
//             });
//         } catch (e) {
//             console.log(e)
//         }

//         requestAnimationFrame(render);
//     }

//     const ui = new UI({
//         addFunction, removeFunction, changeColor, getIntegralByIndex, setIntegralRange, setIntegralStatus
//     });

//     function addFunction(f, num, color = "black") {
//         funcs[num] = { f, color, isIntegralSelected: false };
//     }
//     function removeFunction(num) {
//         funcs[num] = null;
//     }
//     function changeColor(color, num) {
//         funcs[num].color = color;
//     }
//     function setIntegralStatus(num, isChecked = false) {
//         funcs[num].isIntegralSelected = isChecked;
//     }
//     function setIntegralRange(num, a, b, d = 1e-6) {
//         funcs[num].a = a - 0;
//         funcs[num].b = b - 0;
//         funcs[num].d = d - 0;
//     }

//     function getAllZeros(f, a, b, epsilon = 1e-6) {
//         //...
//     }

//     function getDerivative(f, x0, dx = 1e-9) {
//         return (f(x0 + dx) - f(x0)) / dx;
//     }

//     function getZero(f, a, b, epsilon = 1e-6) {
//         if (f(a) * f(b) > 0) return null;
//         if (f(a) === 0) return a;
//         if (f(b) === 0) return b;
//         if (Math.abs(f(b) - f(a)) <= epsilon) return (a + b) / 2;
//         const half = (a + b) / 2;
//         if (f(a) * f(half) <= 0) return getZero(f, a, half, epsilon);
//         if (f(b) * f(half) <= 0) return getZero(f, half, b, epsilon);
//         return null;
//     }
//     function getIntegralByIndex(num, a, b, d = 1e-6) {
//         var f = funcs[num].f;
//         const dx = (b - a) * d;
//         let x = a - 0;
//         let s = 0;
//         while (x < b) {
//             s += ((f(x) + f(x + dx)) * dx / 2);
//             x += dx;
//         }
//         return s;
//     }
//     function printIntegral(f, a, b, color = 'red', width = 2, d = 1e-3) {

//         if (b <= a) {
//             return null;
//         }
//         const dx = (b - a) * d;
//         let x = a;
//         const points = [{ x, y: 0 }];
//         while (x < b) {
//             points.push({ x, y: f(x) });
//             x += dx;
//         }

//         points.push({ x: b, y: f(b) });
//         points.push({ x: b, y: 0 });
//         plane.polygon(points, color, width);
//     }
// }