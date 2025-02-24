select title, author, year, genero from books;

-- forma join con from y where
select title, author, year, g.nombre from books b, generos_literarios g where b.genero = g.id;


-- forma join usando 'join'   select <columna> from <tabla1> join <tabla2> on <union tabla1-tabla2> join <tabla3> on <union con tabla3> join <tabla4.....
select title, author, year, g.nombre from books b join generos_literarios g on b.genero = g.id;


-- libros publicados antes de 2024 y de género terror
select title, author, year, g.nombre from books b, generos_literarios g where b.genero = g.id and b.`year` < 2014 and g.id = 4 ;

-- libros publicados antes de 2024 y que no sean de género terror
select title, author, year, g.nombre from books b, generos_literarios g where b.genero = g.id and b.`year` < 2014 and g.id <> 4 ;

-- libros publicados antes de 2024 y de género fantastica
select title, author, year, g.nombre from books b, generos_literarios g where b.genero = g.id and b.`year` < 2014 and g.id = 3 ;

-- libros publicados antes de 2024 y de género terror o de género romántica - usando and y or
select title, author, year, g.nombre from books b, generos_literarios g where b.genero = g.id and b.`year` < 2014 and (g.id = 4 or g.id = 2);


-- libros publicados antes de 2024 y de género terror o de género romántica - usando filtro 'in'
select title, author, year, g.nombre from books b, generos_literarios g where b.genero = g.id and b.`year` < 2014 and g.id in (2,4);

-- libros publicados antes de 2024 y que no sean ni terror ni romántica - usando filtro 'in'
select title, author, year, g.nombre from books b, generos_literarios g where b.genero = g.id and b.`year` < 2014 and g.id not in (2,4);


select title, author, year, g.nombre from books b, generos_literarios g where b.genero = g.id and b.`year` < 1998 and (g.id = 4 or g.id = 2 or g.id = 1);


select title, author, year, g.nombre from books b, generos_literarios g where b.title = 'el señor de las moscas';


-- libros por palabra 'longevos'
select title, author, year, g.nombre from books b, generos_literarios g where b.genero = g.id and b.title like '%moscas%';


select title, author, year, g.nombre from books b, generos_literarios g where b.genero = g.id and b.title like 'l%';


-- libros de urturi antes de 2000
select * from books where `year` < 2026 and author = 'saenz de urturi' order by `year` asc ; -- asc | desc


-- el precio más barato de nuestra tienda
select min(precio) from books;

-- el precio más alto de nuestra tienda
select MAX(precio) from books;

-- el año más viejo que tenemos
select min(`year`) from books;

-- el año más moderno de que tenemos algún libro
select max(`year`) from books;

-- media de los precios de nuestra tienda
select AVG(precio) from books;


-- cuántos libros tenemos
select COUNT(*) from books;

-- cuántos libros tenemos de tolkien
select COUNT(*) from books where author = 'jrr tolkien';


-- cuántos libros tenemos más baratos de 20 euros
select COUNT(*) from books where precio < 20;


-- cuántos libros tenemos por cada autor
select author, count(*) numlibros from books group by author;


-- qué autores tenemos en la tienda
select DISTINCT(author) autores from books;

-- qué precios diferentes tenemos en la tienda
select DISTINCT(precio) from books;

-- cuántos tipos de precio diferentes tenemos
select count(DISTINCT(precio)) from books;

-- cuántos autores diferentes manejamos
select count(DISTINCT(author)) from books;


-- cuántos libros tenemos de cada género
select g.nombre, count(*) numlibros from books b, generos_literarios g where b.genero = g.id group by g.nombre;

-- cuántos libros tenemos de cada género teniendo en cuenta géneros con más de 1 libro
select g.nombre, count(*) numlibros from books b, generos_literarios g where b.genero = g.id group by g.nombre HAVING numlibros > 1;

-- qué genermos tenemos que solo tengamos 1 libro de ese género
select g.nombre, count(*) numlibros from books b, generos_literarios g where b.genero = g.id group by g.nombre HAVING numlibros = 1;


-- actualizar el precio de un libro a 49.95
update test.books set precio = 49.95 where id = 8;

-- actualizar el precio de todos los libros antes de 2000 a 15.95
update test.books set precio = 15.95 where year < 2000;

-- borrar un registro
delete from test.books where id = 8;

-- concat - concatena valores
-- sacame los datos de los libros con este formato 'titulo-autor-año'
select CONCAT(title,'-',author,'-',`year`) from books;


-- libros que cuesten entre 8 y 15 euros - modo 'normal'
select * FROM books where precio > 8 and precio < 15;

-- libros que cuesten entre 8 y 15 euros - modo 'between'
select * FROM books where precio between 8 and 15;


























