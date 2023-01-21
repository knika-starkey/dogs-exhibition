let tan = document.getElementById("tan");
let pink = document.getElementById("pink");
let green = document.getElementById("green");
let gold = document.getElementById("gold");

let showCoords = document.getElementById("showCoords");
let state = document.getElementById("state");

let dogs = document.getElementsByClassName("iris");

let dogsState = [];

for (let i = 0; i < dogs.length; i++) {
  //   const element = dogs[i].id;
  //   console.log(element);
  dogsState[dogs[i].id] = false;
}

console.log(dogsState);

for (let i = 0; i < dogs.length; i++) {
  dogs[i].onmousedown = go;
}

//проверка, попадает ли на поле f цветок с координатами left, top
function onField(f, left, top) {
  let field = getCoords(f); // получили координаты top и left, а также width и height текущего поля f

  if (
    left > field.left &&
    left < field.left + field.width &&
    top > field.top &&
    top < field.top + field.height &&
    (f == tan || f == pink)
  ) {
    return true;
  }
  return false;
}

function go(event) {
  let dog = document.getElementById(event.target.id);
  let breed = dog.dataset.breed;
  let coords = getCoords(dog);
  let shiftX = event.pageX - coords.left;
  let shiftY = event.pageY - coords.top;
  // console.log(shiftX + " " + shiftY);
  moveAt(event);
  // функция перемещения объекта под координаты курсора
  function moveAt(event) {
    // shiftX и shiftY - сдвиг курсора относительно верхнего левого угла картинки
    var left = event.pageX - shiftX;
    var top = event.pageY - shiftY;

    dog.style.left = left + "px";
    dog.style.top = top + "px";

    // Координаты картинки относительно окна
    showCoords.innerHTML = `x: ${dog.style.left}, y: ${dog.style.top}`;
    //state.innerHTML = check();
    // if (left > 5 && left < 405 && top > 5 && top < 305) {
    //   wrap.style.border = "2px red solid";
    // } else
    //   wrap.style.border = "none";

    if (onField(tan, left, top)) {
      if (breed == "tan") {
        tan.style.border = "2px solid green";
        pink.style.border = "none";
      } else {
        tan.style.border = "2px solid red";
        pink.style.border = "none";
      }
    }
    if (onField(pink, left, top)) {
      if (breed == "pink") {
        pink.style.border = "2px solid green";
        tan.style.border = "none";
      } else {
        pink.style.border = "2px solid red";
        tan.style.border = "none";
      }
    }
  }

  // событие перемещения мыши
  document.onmousemove = function (event) {
    moveAt(event);
  };

  // событие  отпускания мыши
  dog.onmouseup = function (event) {
    res(event);
  };

  function res(event) {
    dogsState[dog.id] = false; // сброс состояния текущего цветка
    tan.style.border = "none";
    pink.style.border = "none";

    let left = parseInt(dog.style.left);
    let top = parseInt(dog.style.top);
    //alert(left);

    if (onField(tan, left, top)) {
      if (breed == "tan") {
        dogsState[dog.id] = true;
      } else {
        dogsState[dog.id] = false;
      }
    }
    if (onField(pink, left, top)) {
      if (breed == "pink") {
        dogsState[dog.id] = true;
      } else {
        dogsState[dog.id] = false;
      }
    }
    console.log(dogsState);
    //..... проверить поле pink

    //реализовать - если цветок находится на своем поле, то  dogsState[dog.id] = true, иначе - dogsState[dog.id] = false

    document.onmousemove = null;
    dog.onmouseup = null;
  }

  dog.ondragstart = function () {
    return false; // отмена drag and drop браузера
  };
}

function check() {
  // Проверка, все ли ирисы на своем поле
  // реализовать - если в массиве dogsState хотя бы одно значение false, то выдавать сообщение "Error", если все true - то "OK". Сообщение писать в state
  let res = true;
  //for (let i = 0; i < dogsState.length; i++) {
  for (const key in dogsState) {
    if (!dogsState[key]) {
      res = false;
      //return "Error";
    }
  }
  state.innerHTML = res ? "OK" : "Error";
}

function getCoords(elem) {
  var box = elem.getBoundingClientRect();
  //scrollX и scrollY возвращают скроллирование окна в пикселях
  return {
    height: box.height,
    width: box.width,
    top: box.top + scrollY,
    left: box.left + scrollX,
  };
}
