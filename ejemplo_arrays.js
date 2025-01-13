var expenses = [10,45,67,180,432,1000,245,250,67,54,67,,765,4000,12,4,350];

// var resultadoForEach = expenses.forEach((x)=> console.log('<p>Gasto: '+x+'</p>'));
// console.log(resultadoForEach);

var resultadoMap = expenses.map((x) => x*2);
// console.log(resultadoMap);


var book1 = {"titulo": "la historia interminable", "autor": "ende", "precio": 18};
var book2 = {"titulo": "el hobbit ", "autor": "jrr tolkien", "precio": 9};
var book3 = {"titulo": "la vida imposible", "autor": "matt haig", "precio": 20};

var books = []
books.push(book1);
books.push(book2);
books.push(book3);

// var titles = books.map((x) => x.titulo.toUpperCase());
// console.log(titles);

book1.published="1983";
book2.published="1945";
book3.published="2024";



// calcular precio final
books.forEach((element) => element.iva = element.precio * 1.21);



console.log("array books:");
console.log(books);

console.log("books como json texto plano:")
console.log(JSON.stringify(books));

// calcular la media de una lista de enteros
// function calcularMedia(lista) { // lista -> ej: [4,6,4,2,6,7]
//     var total = 0;
//     lista.forEach(element => {
//       total = total + element;
//     });
//     return total / lista.length;
//   }

//   console.log(calcularMedia([1,2,3,3,4,4,5]));



// console.log("--- Ejemplo leer un json a memoria ----" );

// var jsonPlano = '[{"title":"El faro de la sirena","author":"Lucía Lago","price":25,"year":1970,"iva":"30.25","rankings":[1,4,5,3,4,2,3,4,5,5,2,2],"ranking":3.7},{"title":"libro 2","author":"Lucía Lago","price":25,"year":1970,"iva":"30.25","rankings":[1,4,5,3,4,2,3,4,5,5,2,2],"ranking":3.7},{"title":"libro 3","author":"Lucía Lago","price":25,"year":1970,"iva":"30.25","rankings":[1,4,5,3,4,2,3,4,5,5,2,2],"ranking":3.7},{"title":"libro 4","author":"Lucía Lago","price":25,"year":1970,"iva":"30.25","rankings":[1,4,5,3,4,2,3,4,5,5,2,2],"ranking":3.7}]';

// console.log(jsonPlano);

// var arrayLibrosModelados = JSON.parse(jsonPlano);

// console.log("Elementos en el array" + arrayLibrosModelados.length);
// console.log("Elemento 1: "+ arrayLibrosModelados[0].title);
// console.log("Elemento 1: "+ arrayLibrosModelados[3].author);



var libroString = '{"titulo": "la historia interminable", "autor": "ende",  "precio": 18,   "published": "1983",    "iva": 21.78 }';
console.log(libroString.autor);
console.log(typeof libroString);

var libroModelado = JSON.parse(libroString);
console.log(libroModelado)
console.log(typeof libroModelado);
console.log(libroModelado.autor);



var mdnPlano = '{"geo":{"country":"Spain","country_iso":"ES"},"username":null,"is_authenticated":null,"email":null,"avatar_url":null,"is_subscriber":null,"subscription_type":null,"settings":null}';

var mdnModelado = JSON.parse(mdnPlano);
console.log(mdnModelado.geo.country_iso);


