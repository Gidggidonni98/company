CREATE DATABASE company;
Use company;

CREATE TABLE `employees` (
  `id` int(11) AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `adress` varchar(100) NOT NULL,
  `salary` double NOT NULL,
  `registered` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `status` tinyint(4) NOT NULL,
  `id_office` int(6) NOT NULL,
  CONSTRAINT pk_employees_id PRIMARY KEY (id)
);

CREATE TABLE `office` (
  `id` int(11) AUTO_INCREMENT,
  `office_code` int(6) NOT NULL,
  `adress` varchar(100) NOT NULL,
  CONSTRAINT pk_office_id PRIMARY KEY (id)
);