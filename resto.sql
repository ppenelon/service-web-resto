-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Client :  127.0.0.1
-- Généré le :  Ven 09 Mars 2018 à 21:07
-- Version du serveur :  5.7.14
-- Version de PHP :  5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `resto`
--

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `idClient` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `telephone` varchar(15) NOT NULL,
  `mail` varchar(200) NOT NULL,
  `motDePasse` varchar(16) NOT NULL,
  `codeFidelite` varchar(7) NOT NULL,
  `token` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `fidelite`
--

CREATE TABLE `fidelite` (
  `idClient` int(11) NOT NULL,
  `idRestaurant` int(11) NOT NULL,
  `points` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

CREATE TABLE `reservation` (
  `idClient` int(11) NOT NULL,
  `idRestaurant` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `nombrePersonnes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `restaurant`
--

CREATE TABLE `restaurant` (
  `idRestaurant` int(11) NOT NULL,
  `nom` varchar(150) NOT NULL,
  `adresse` varchar(300) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `telephone` varchar(15) NOT NULL,
  `mail` varchar(200) NOT NULL,
  `motDePasse` varchar(16) NOT NULL,
  `description` text NOT NULL,
  `token` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Index pour les tables exportées
--

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`idClient`);

--
-- Index pour la table `fidelite`
--
ALTER TABLE `fidelite`
  ADD PRIMARY KEY (`idClient`,`idRestaurant`),
  ADD KEY `fk_fidelite_idRestaurant_restaurant_idRestaurant` (`idRestaurant`);

--
-- Index pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD KEY `idClient` (`idClient`),
  ADD KEY `idRestaurant` (`idRestaurant`);

--
-- Index pour la table `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`idRestaurant`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `idClient` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `idRestaurant` int(11) NOT NULL AUTO_INCREMENT;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `fidelite`
--
ALTER TABLE `fidelite`
  ADD CONSTRAINT `fk_fidelite_idClient_client_idClient` FOREIGN KEY (`idClient`) REFERENCES `client` (`idClient`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_fidelite_idRestaurant_restaurant_idRestaurant` FOREIGN KEY (`idRestaurant`) REFERENCES `restaurant` (`idRestaurant`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `fk_idClient_client_idClient` FOREIGN KEY (`idClient`) REFERENCES `client` (`idClient`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_idRestaurant_restaurant_idRestaurant` FOREIGN KEY (`idRestaurant`) REFERENCES `restaurant` (`idRestaurant`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
