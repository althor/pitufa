function function8(lista) {
  let vara = 1;
  for (var i=lista.length-1; i >=0; i--) {
    vara = vara * lista[i];
  }
  return vara;
}

let resultado = function8([3,4,5,6,7]);

console.log(resultado);


function funcion9() {
  let sizes=[{id:1, size:'s'},{id:2, size:'m'},{id:3, size:'l'},{id:4, size:'xl'}]
  let node = '<select>'

  sizes.forEach((item) => {
    node +=`<option value="${item.id}">${item.size}</option>`
  })

  node += '</select>';
  return node;
}

console.log(funcion9());



function function10(value) {
  const lowerValue = value.toLowerCase();
  let count = 0;
  const vocals = 'aeiouáéíóúü';

  for (let i = 0; i < lowerValue.length; i++) {
      const item = lowerValue[i];
      count += vocals.includes(item);
  }
  return count;
};

resultado = function10('asdiubqi4baksudbfkuasef');
console.log(resultado);



function function11(lista) {
  let found = false;
  let i = 0;
  do {
    found = lista[i] < 0;
    console.log(lista[i]);
    ++i;
  } while (!found)
}

function11([4,7,32,13,78,67,-1,87,44]);



function funcion12(lista) {
  let vara = 0;
  let i = 0;

  while (i<lista.length) {
    if (lista[i].ranking>0) {
      vara += lista[i].ranking;
    }
    i++;
  } 
  return vara;
}

resultado = funcion12([{name:'proda', ranking:4},{name:'prodb', ranking:3},{name:'prodc', ranking:-2},{name:'prodd', ranking:-7},{name:'prode', ranking:5}]);

console.log(resultado);




function function13(lista1, lista2) {
  let result=[]
  for (let i = 0; i< lista1.length; i++) {
    if (lista2[i]) {
      result.push(lista1[i]);
    }
  }

  return result;
}

let lista1 = ['gato','conejo','tortu','perro','vaca']
let lista2 = [false, true, true, false, true]
resultado = function13(lista1, lista2);
console.log(resultado);


function crearComboTallas() {
  // pedimos las talals sl servidor
  let sizes = [
    { id: 1, size: "s" },
    { id: 2, size: "m" },
    { id: 3, size: "l" },
    { id: 4, size: "xl" },
  ];


  let select = "<select>";

  sizes.forEach((item) => {
    select += `<option value="${item.id}">${item.size}</option>`;
  });

  select += "</select>";


  console.log(select);
  // let formulario = document.querySelector("#contactform");
  // formulario.insertAdjacentHTML("beforeend", select);
}

