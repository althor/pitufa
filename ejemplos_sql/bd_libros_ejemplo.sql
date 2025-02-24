-- test.generos_literarios definition

CREATE TABLE `generos_literarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- test.books definition

CREATE TABLE `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `author` text NOT NULL,
  `isbn` text,
  `year` int(11) DEFAULT NULL,
  `pages` int(11) DEFAULT NULL,
  `genero` int(11) DEFAULT NULL,
  `precio` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `genero_fk` (`genero`),
  CONSTRAINT `genero_fk` FOREIGN KEY (`genero`) REFERENCES `generos_literarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;



INSERT INTO test.generos_literarios (nombre) VALUES
   ('thriller'),
   ('romatnica'),
   ('fantastica'),
   ('terror');


INSERT INTO test.books (title,author,isbn,`year`,pages,genero,precio) VALUES
   ('La saga de los longevos','saenz de urturi','28t98ht98h984',2024,0,1,19.95),
   ('La saga de los longevos 2','saenz de urturi',NULL,1998,NULL,2,8.95),
   ('La saga de los longevos 3','saenz de urturi',NULL,1995,NULL,4,7.95),
   ('el señor de las moscas','aldox huxley',NULL,1970,NULL,1,15.95),
   ('el valle de los mumin','pitufa',NULL,1959,NULL,3,20.95),
   ('el señor de los anillos','jrr tolkien',NULL,1944,NULL,3,5.95);
