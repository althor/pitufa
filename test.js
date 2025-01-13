function print(msg) {
  console.log(msg);
}

// Elevar a una potencia - función invocada en el click del botón del formulario de potencia
function elevarA() {
  let valor = Number(document.querySelector("#ejPotenciaValor").value); // Lee el dato introducido por el usuario para el número
  let potencia = Number(document.querySelector("#ejPotenciaPotencia").value); // Lee el dato introducido por el usuario para la potencia
  let result = valor ** potencia; // Eleva el 'numero' a la 'potencia'
  document.querySelector("#ejPotenciaResult").innerHTML = result; // Asigna al elemento html el resultado
}

// Tirar un dato de n lados - función invocada en el click del botón de tirar un dado
function tirarDado() {
  var numlados = Number(document.getElementById("dadoLados").value); // Lee el dato introducido por el usuario para el número de lados
  var result = Math.trunc(Math.random() * 1000) % (numlados + 1); // Calcula el módulo (numLados + 1) de generar un número random (0,xxxx) y multiplicarlo por 1000
  document.getElementById("dadoResult").innerHTML = result; // Asigna al elemento html el resultado
}

// Adivinar un número - función invocada en el click del botón del adivinar
function adivinar() {
  var apuestaUser = Number(document.getElementById("adivinaValue").value); // Lee el valor introducido por el usuario para su apuesta
  var randomValue = Math.trunc(Math.random() * 10); // Genera un valor random (0,xxx) y lo multiplicamos por 10 para quedarnos con la parte entera
  print("apuesta: " + apuestaUser);
  print("random: " + randomValue);
  var isMatch = apuestaUser == randomValue; // Guardamos si coinciden ambos datos o no
  print("match: " + isMatch);
  var result;
  if (isMatch) {
    // Rama si coincidencia
    result = "Acertaste!!";
  } else {
    // rama si no coincidencia
    result = "Prueba otra vez...";
  }
  document.getElementById("advinaResult").innerHTML = result; // Asigna al elemento html el resultado
}

// AÑADIR COMO LISTENER UNA FUNCIÓN EXISTENTE
document
  .querySelector("#buttonElevarPotencia")
  .addEventListener("click", () => elevarA());
// document.querySelector('#buttonElevarPotencia').addEventListener('click',elevarA);

// AÑADIR COMO LISTENER UN TROZO DE CÓDIGO
// document.querySelector('#buttonElevarPotencia').addEventListener('click',((evento) => {console.log(`Se ha producido un evento de tipo: ${evento.type} y target ${evento.target}`)}));

// AÑADIR COMO LISTENER UNA FUNCIÓN ANÓNIMA DEFINIDA AHÍ MISMO
// document.querySelector('#buttonElevarPotencia').addEventListener('click',(function () {
//   alert('mensaje desde el listener como funcion anonima');
// }));

// EJEMPLO DE CALLBACK
//Creamos una función que se va a pasar como argumento a otra función distinta
function alertComoCallback(value) {
  alert(
    `has ejecutado la función como callback usando como argumento: ${value}`
  );
}

function segundaFuncionCallback() {
  alert(`has ejecutado la segunda funcion de callback`);
}

// Esta función recibe como argumento una función que invocará a modo de callback
function listenerConCallback(callbackFunction, callback2) {
  alert(
    "despues de que cierres este alert voy a ejecutar la funcion de callback"
  );
  callbackFunction("vaaaalor");
  callback2();
}

// document
//   .querySelector("#buttonElevarPotencia")
//   .addEventListener("click", () =>
//     listenerConCallback(alertComoCallback, segundaFuncionCallback)
//   );

// EJEMPLO CREAR OBJETOS DESDE FORMULARIO Y GUARDARLOS EN UNA LISTA GLOBAL PARA NO PERDERLOS
let listaContactos = [];

function crearContacto() {
  let formulario = new FormData(document.querySelector("#contactform")); // Creamos un objeto FormData a partir del elemento <form> del html
  let contacto = {};
  contacto.name = formulario.get("nombreContacto");
  contacto.mobile = formulario.get("movil");
  contacto.email = formulario.get("email");
  contacto.nombre2pitufa = formulario.get("nombreContacto");

  console.log("objeto creado: ");
  console.log(contacto);

  listaContactos.push(contacto);

  console.log("------ contactos creados ------");
  for (var i = 0; i < listaContactos.length; i++) {
    console.log(listaContactos[i]);
  }
}

document
  .querySelector("#buttonCrearContacto")
  .addEventListener("click", () => crearContacto());

// EJEMPLO ACCESO A LOS ATRIBUTOS DE OBJETOS -> nombre_variable.nombre_atributo
function consultarContactos() {
  for (var i = 0; i < listaContactos.length; i++) {
    let contacto = listaContactos[i];
    alert(
      `Nombre: ${contacto.name} - Movil: ${contacto.mobile} - Email: ${contacto.email}`
    );
  }
}

document
  .querySelector("#buttonConsultarContactos")
  .addEventListener("click", () => consultarContactos());

function crearComboTallas() {
  // supongamos que pedimos las tallas al servidor y nos ha devuelto esta lista:
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

  let formulario = document.querySelector("#contactform");
  formulario.insertAdjacentHTML("beforeend", select);
}

crearComboTallas();
