-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-03-2025 a las 14:52:26
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `diabetesdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comida`
--

CREATE TABLE `comida` (
  `tipo_comida` varchar(30) NOT NULL,
  `gl_1h` int(11) NOT NULL,
  `gl_2h` int(11) NOT NULL,
  `raciones` int(11) NOT NULL,
  `insulina` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `id_usu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comida`
--

INSERT INTO `comida` (`tipo_comida`, `gl_1h`, `gl_2h`, `raciones`, `insulina`, `fecha`, `id_usu`) VALUES
('Cena', 8, 13, 2, 1, '2025-03-06', 2),
('Cena', 9, 14, 2, 1, '2025-03-07', 2),
('Cena', 8, 12, 2, 1, '2025-03-08', 2),
('Cena', 7, 11, 2, 1, '2025-03-09', 2),
('Cena', 10, 15, 2, 1, '2025-03-10', 2),
('Cena', 9, 14, 2, 1, '2025-03-11', 2),
('Cena', 8, 13, 2, 1, '2025-03-12', 2),
('Cena', 7, 12, 2, 1, '2025-03-13', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `control_glucosa`
--

CREATE TABLE `control_glucosa` (
  `fecha` date NOT NULL,
  `deporte` int(11) NOT NULL,
  `lenta` int(11) NOT NULL,
  `id_usu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `control_glucosa`
--

INSERT INTO `control_glucosa` (`fecha`, `deporte`, `lenta`, `id_usu`) VALUES
('2025-03-06', 3, 15, 2),
('2025-03-07', 2, 10, 2),
('2025-03-08', 5, 18, 2),
('2025-03-09', 1, 5, 2),
('2025-03-10', 4, 12, 2),
('2025-03-11', 3, 20, 2),
('2025-03-12', 2, 8, 2),
('2025-03-13', 5, 16, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hiperglucemia`
--

CREATE TABLE `hiperglucemia` (
  `glucosa` int(11) NOT NULL,
  `hora` time NOT NULL,
  `correccion` int(11) NOT NULL,
  `tipo_comida` varchar(30) NOT NULL,
  `fecha` date NOT NULL,
  `id_usu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `hiperglucemia`
--

INSERT INTO `hiperglucemia` (`glucosa`, `hora`, `correccion`, `tipo_comida`, `fecha`, `id_usu`) VALUES
(8, '08:00:00', 2, 'Cena', '2025-03-06', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hipoglucemia`
--

CREATE TABLE `hipoglucemia` (
  `glucosa` int(11) NOT NULL,
  `hora` time NOT NULL,
  `tipo_comida` varchar(30) NOT NULL,
  `fecha` date NOT NULL,
  `id_usu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `hipoglucemia`
--

INSERT INTO `hipoglucemia` (`glucosa`, `hora`, `tipo_comida`, `fecha`, `id_usu`) VALUES
(60, '08:00:00', 'Cena', '2025-03-06', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usu` int(11) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `apellidos` varchar(25) NOT NULL,
  `usuario` varchar(25) NOT NULL,
  `contra` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usu`, `fecha_nacimiento`, `nombre`, `apellidos`, `usuario`, `contra`) VALUES
(2, '2003-09-09', 'pablo', 'pablo', 'pablo', '$2y$10$mk7adj29sNT9dAAfyM1RsONPGE3ut.fxwqvnTbTVJWoQToew1RLOy'),
(3, '2003-06-11', 'luis', 'suarez', 'luisian', '$2y$10$wN5/NKK57pVH31SmUTvN5uuxUDQ2LPQO/MVYJR5hq3Oww84tylFWu');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comida`
--
ALTER TABLE `comida`
  ADD PRIMARY KEY (`tipo_comida`,`fecha`,`id_usu`),
  ADD KEY `fecha` (`fecha`,`id_usu`);

--
-- Indices de la tabla `control_glucosa`
--
ALTER TABLE `control_glucosa`
  ADD PRIMARY KEY (`fecha`,`id_usu`),
  ADD KEY `id_usu` (`id_usu`);

--
-- Indices de la tabla `hiperglucemia`
--
ALTER TABLE `hiperglucemia`
  ADD PRIMARY KEY (`tipo_comida`,`fecha`,`id_usu`);

--
-- Indices de la tabla `hipoglucemia`
--
ALTER TABLE `hipoglucemia`
  ADD PRIMARY KEY (`tipo_comida`,`fecha`,`id_usu`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usu`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comida`
--
ALTER TABLE `comida`
  ADD CONSTRAINT `comida_ibfk_1` FOREIGN KEY (`fecha`,`id_usu`) REFERENCES `control_glucosa` (`fecha`, `id_usu`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `control_glucosa`
--
ALTER TABLE `control_glucosa`
  ADD CONSTRAINT `control_glucosa_ibfk_1` FOREIGN KEY (`id_usu`) REFERENCES `usuario` (`id_usu`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `hiperglucemia`
--
ALTER TABLE `hiperglucemia`
  ADD CONSTRAINT `hiperglucemia_ibfk_1` FOREIGN KEY (`tipo_comida`,`fecha`,`id_usu`) REFERENCES `comida` (`tipo_comida`, `fecha`, `id_usu`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `hipoglucemia`
--
ALTER TABLE `hipoglucemia`
  ADD CONSTRAINT `hipoglucemia_ibfk_1` FOREIGN KEY (`tipo_comida`,`fecha`,`id_usu`) REFERENCES `comida` (`tipo_comida`, `fecha`, `id_usu`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
