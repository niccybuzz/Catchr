-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 02, 2024 at 11:12 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `40405902`
--

-- --------------------------------------------------------

--
-- Table structure for table `abilities`
--

CREATE TABLE `abilities` (
  `ability_id` int(11) NOT NULL,
  `card_id` int(11) NOT NULL,
  `ability_name` varchar(255) DEFAULT NULL,
  `ability_description` text DEFAULT NULL,
  `ability_damage` int(11) DEFAULT NULL,
  `primary_cost` int(11) DEFAULT NULL,
  `primary_type_id` int(11) DEFAULT NULL,
  `secondary_cost` int(11) DEFAULT NULL,
  `secondary_type_id` int(11) DEFAULT NULL,
  `pokemon_power` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `abilities`
--

INSERT INTO `abilities` (`ability_id`, `card_id`, `ability_name`, `ability_description`, `ability_damage`, `primary_cost`, `primary_type_id`, `secondary_cost`, `secondary_type_id`, `pokemon_power`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Scratch', '', 10, 1, 22, NULL, NULL, 0, '2024-04-14 02:41:58', '2024-04-14 02:41:58'),
(3, 1, 'Ember', 'Discard 1 fire energy attached to Charmander in order to use this attack', 30, 1, 22, 1, 4, 0, '2024-04-14 02:41:58', '2024-04-14 02:41:58'),
(4, 7, 'Slash', NULL, 30, 3, 22, NULL, NULL, 0, '2024-04-14 02:41:58', '2024-04-14 02:41:58'),
(5, 7, 'Flamethrower', 'Discard 1 fire energy card attached to Charmeleon in order to use this attack', 50, 2, 4, 1, 22, 0, '2024-04-14 02:41:58', '2024-04-14 02:41:58'),
(6, 8, 'Energy Burn', 'As often as you like during your turn (before your attack) you may turn all energy attached to Charizard into fire energy for the rest of the turn. This power can\'t be used if Charizard is asleep, Confused, or Paralysed.', NULL, NULL, NULL, NULL, NULL, 1, '2024-04-14 02:41:58', '2024-04-14 02:41:58'),
(7, 8, 'Fire Spin', 'Discard 2 fire energy cards attached to Charizard in order to use this attack.', 100, 4, 4, NULL, NULL, 0, '2024-04-14 02:41:58', '2024-04-14 02:41:58'),
(8, 13, 'Damage Swap', 'As often as you like during your turn (before your attack), you may move 1 damage counter from 1 of your Pokémon to another as long as you don\'t Knock Out that Pokémon. This power can\'t be used if Alakazam is Asleep, Confused, or Paralyzed.', NULL, NULL, NULL, NULL, NULL, 1, '2024-04-14 02:41:58', '2024-04-14 02:41:58'),
(9, 13, 'Confuse Ray', 'Flip a coin. If heads, the Defending Pokémon is now Confused.', 30, 3, 13, NULL, NULL, 0, '2024-04-14 02:41:58', '2024-04-14 02:41:58'),
(10, 14, 'Psyshock', 'Flip a coin. If heads, the Defending Pokémon is now Paralyzed.', 10, 1, 13, NULL, NULL, 0, '2024-04-14 02:41:58', '2024-04-14 02:41:58'),
(11, 15, 'Recover', 'Discard 1 Psychic Energy card attached to Kadabra in order to use this attack. Remove all damage counters from Kadabra.', 0, 2, 13, NULL, NULL, 0, '2024-04-14 02:41:58', '2024-04-14 02:41:58'),
(12, 15, 'Super Psy', NULL, 50, 2, 13, 1, 22, 0, '2024-04-14 02:41:58', '2024-04-14 02:41:58'),
(13, 16, 'Rain Dance', 'As often as you like during your turn (before your attack), you may attach 1 Water Energy card to 1 of your Water Pokémon. (This doesn\'t use up your 1 Energy card attachment for the turn.) This power can\'t be used if Blastoise is Asleep, Confused, or Paralyzed.', NULL, NULL, NULL, NULL, NULL, 1, '2024-04-26 20:47:41', '2024-04-26 20:47:41'),
(14, 16, 'Hydro Pump', 'Does 40 damage plus 10 more damage for each Water Energy attached to Blastoise but not used to pay for this attack\'s Energy cost. Extra Water Energy after the 2nd doesn\'t count.', 40, 3, 5, NULL, NULL, 0, '2024-04-26 20:47:41', '2024-04-26 20:47:41'),
(17, 17, 'Scrunch', 'Flip a coin. If heads, prevent all damage done to Chansey during your opponent\'s next turn. (Any other effects of attacks still happen.)', NULL, 2, 22, NULL, NULL, 0, '2024-04-26 20:51:52', '2024-04-26 20:51:52'),
(18, 17, 'Double-edge', 'Chansey does 80 damage to itself.', 80, 4, 22, NULL, NULL, 0, '2024-04-26 20:51:52', '2024-04-26 20:51:52'),
(20, 25, 'Sing', 'Flip a coin. If heads, the Defending Pokémon is now Asleep.', NULL, 1, 22, NULL, NULL, 0, '2024-04-26 20:57:42', '2024-04-26 20:57:42'),
(22, 25, 'Metronome', 'Choose 1 of the Defending Pokémon\'s attacks. Metronome copies that attack except for its Energy costs and anything else required in order to use that attach, such as discarding Energy cards. (No matter what type the Defending Pokémon is, Clefairy\'s type is still Colorless.)', NULL, 3, 22, NULL, NULL, 0, '2024-04-26 20:58:15', '2024-04-26 20:58:15'),
(23, 26, 'Dragon Rage', NULL, 50, 3, 5, NULL, NULL, 0, '2024-04-26 21:03:20', '2024-04-26 21:03:20'),
(24, 26, 'Bubblebeam', 'Flip a coin. If heads, the Defending Pokémon is now Paralyzed.', 40, 4, 5, NULL, NULL, 0, '2024-04-26 21:03:20', '2024-04-26 21:03:20'),
(25, 27, 'Slash', NULL, 40, 2, 9, 1, 22, 0, '2024-04-26 21:49:40', '2024-04-26 21:49:40'),
(26, 27, 'Earthquake', 'Does 10 damage to each of your own Benched Pokémon. (Don\'t apply Weakness and Resistance for Benched Pokémon.)', 70, 4, 9, NULL, NULL, 0, '2024-04-26 21:49:40', '2024-04-26 21:49:40'),
(27, 28, 'Dig', NULL, 10, 1, 9, NULL, NULL, 0, '2024-04-26 21:52:29', '2024-04-26 21:52:29'),
(28, 28, 'Mud Slap', NULL, 30, 2, 9, NULL, NULL, 0, '2024-04-26 21:52:29', '2024-04-26 21:52:29'),
(29, 29, 'Thunder', 'Flip a coin. If tails, Zapdos does 30 damage to itself.', 60, 3, 6, 1, 22, 0, '2024-04-26 21:55:55', '2024-04-26 21:55:55'),
(30, 29, 'Thunderbolt', 'Discard all Energy cards attached to Zapdos in order to use this attack.', 100, 4, 6, NULL, NULL, 0, '2024-04-26 21:55:55', '2024-04-26 21:55:55'),
(31, 30, 'Energy Trans', 'As often as you like during your turn (before your attack), you may take 1 Grass Energy card attached to 1 of your Pokémon and attach it to a different one. This power can\'t be used if Venusaur is Asleep, Confused, or Paralyzed.', NULL, NULL, NULL, NULL, NULL, 1, '2024-04-26 21:58:23', '2024-04-26 21:58:23'),
(32, 30, 'Solarbeam', NULL, 60, 4, 7, NULL, NULL, 0, '2024-04-26 21:58:23', '2024-04-26 21:58:23'),
(33, 31, 'Vine Whip', NULL, 30, 1, 7, 2, 22, 0, '2024-04-26 22:00:53', '2024-04-26 22:00:53'),
(34, 31, 'Poisonpowder', 'The Defending Pokémon is now Poisoned.', 20, 3, 7, NULL, NULL, 0, '2024-04-26 22:00:53', '2024-04-26 22:00:53'),
(35, 32, 'Leech Seed', 'Unless all damage from this attack is prevented, you may remove 1 damage counter from Bulbasaur.', 20, 2, 7, NULL, NULL, 0, '2024-04-26 22:06:04', '2024-04-26 22:06:04'),
(36, 33, 'Agility', 'Flip a coin. If heads, during your opponent\'s next turn, prevent all effects of attacks, including damage, done to Raichu.', 20, 1, 6, 2, 22, 0, '2024-04-26 22:08:43', '2024-04-26 22:08:43'),
(37, 33, 'Thunder', 'Flip a coin. If tails, Raichu does 30 damage to itself.', 60, 3, 6, 1, 22, 0, '2024-04-26 22:08:43', '2024-04-26 22:08:43'),
(38, 34, 'Gnaw', NULL, 10, 1, 22, NULL, NULL, 0, '2024-04-26 22:10:44', '2024-04-26 22:10:44'),
(39, 34, 'Thunder Jolt', 'Flip a coin. If tails, Pikachu does 10 damage to itself.', 30, 1, 6, 1, 22, 0, '2024-04-26 22:10:44', '2024-04-26 22:10:44'),
(40, 35, 'Lure', 'If your opponent has any Benched Pokémon, choose 1 of them and switch it with his or her Active Pokémon.', NULL, 2, 22, NULL, NULL, 0, '2024-04-26 22:17:17', '2024-04-26 22:17:17'),
(41, 35, 'Fire Blast', 'Discard 1 Fire Energy card attached to Ninetales in order to use this attack.', 80, 4, 4, NULL, NULL, 0, '2024-04-26 22:17:17', '2024-04-26 22:17:17'),
(42, 36, 'Confuse Ray', 'Flip a coin. If heads, the Defending Pokémon is now Confused.', 10, 2, 4, NULL, NULL, 0, '2024-04-26 22:19:22', '2024-04-26 22:19:22'),
(43, 37, 'Thrash', 'Flip a coin. If heads, this attack does 30 damage plus 10 more damage; if tails, this attack does 30 damage and Nidoking does 10 damage to itself.', 30, 1, 7, 2, 22, 0, '2024-04-26 22:22:20', '2024-04-26 22:22:20'),
(44, 37, 'Toxic', 'The Defending Pokémon is now Poisoned. It now takes 20 Poison damage instead of 10 after each player\'s turn (even if it was already Poisoned).', 20, 3, 7, NULL, NULL, 0, '2024-04-26 22:22:20', '2024-04-26 22:22:20'),
(45, 39, 'Double Kick', 'Flip 2 coins. This attack does 30 damage times the number of heads.', 30, 1, 7, 2, 22, 0, '2024-04-26 22:25:20', '2024-04-26 22:25:20'),
(46, 39, 'Horn Drill', NULL, 50, 2, 7, 2, 22, 0, '2024-04-26 22:25:20', '2024-04-26 22:25:20'),
(47, 40, 'Horn Hazard', 'Flip a coin. If tails, this attack does nothing.', 30, 1, 7, NULL, NULL, 0, '2024-04-26 22:28:06', '2024-04-26 22:28:06'),
(48, 42, 'Psychic', 'Does 10 damage plus 10 more damage for each Energy card attached to the Defending Pokémon.', 10, 1, 13, 1, 22, 0, '2024-04-26 22:31:33', '2024-04-26 22:31:33'),
(49, 42, 'Barrier', 'Discard 1 Psychic Energy card attached to Mewtwo in order to prevent all effects of attacks, including damage, done to Mewtwo during your opponent\'s next turn.', NULL, 2, 13, NULL, NULL, 0, '2024-04-26 22:31:33', '2024-04-26 22:31:33'),
(50, 43, 'Thunder Wave', 'Flip a coin. If heads, the Defending Pokémon is now Paralyzed.', 30, 2, 6, 1, 22, 0, '2024-04-26 22:34:39', '2024-04-26 22:34:39'),
(51, 43, 'Selfdestruct', 'Does 20 damage to each Pokémon on each player\'s Bench. (Don\'t apply Weakness and Resistance for Benched Pokémon.) Magneton does 80 damage to itself.', 80, 2, 6, 2, 22, 0, '2024-04-26 22:34:39', '2024-04-26 22:34:39'),
(52, 44, 'Thunder Wave', 'Flip a coin. If heads, the Defending Pokémon is now Paralyzed.', 10, 1, 6, NULL, NULL, 0, '2024-04-26 22:37:32', '2024-04-26 22:37:32'),
(53, 44, 'Selfdestuct', 'Does 10 damage to each Pokémon on each player\'s Bench. (Don\'t apply Weakness and Resistance for Benched Pokémon.) Magnemite does 40 damage to itself.', 40, 1, 6, 1, 22, 0, '2024-04-26 22:37:32', '2024-04-26 22:37:32'),
(54, 45, 'Flamethrower', 'Discard 1 Fire Energy card attached to Arcanine in order to use this attack.', 50, 2, 4, 1, 22, 0, '2024-04-26 23:06:44', '2024-04-26 23:06:44'),
(55, 45, 'Take Down', 'Arcanine does 30 damage to itself.', 80, 2, 4, 2, 22, 0, '2024-04-26 23:06:44', '2024-04-26 23:06:44'),
(56, 46, 'Flare', NULL, 20, 1, 4, 1, 22, 0, '2024-04-26 23:08:50', '2024-04-26 23:08:50'),
(57, 47, 'Tackle', NULL, 10, 1, 22, NULL, NULL, 0, '2024-04-26 23:20:53', '2024-04-26 23:20:53'),
(58, 47, 'Flail', 'Does 10 damage times the number of damage counters on Magikarp.', 10, 1, 22, NULL, NULL, 0, '2024-04-26 23:20:53', '2024-04-26 23:20:53'),
(59, 48, 'Stiffen', 'Flip a coin. If heads, prevent all damage done to Kakuna during your opponent\'s next turn. (Any other effects of attacks still happen.)', NULL, 2, 22, NULL, NULL, 0, '2024-04-26 23:23:28', '2024-04-26 23:23:28'),
(60, 48, 'Poisonpowder', 'Flip a coin. If heads, the Defending Pokémon is now Poisoned.', 20, 2, 7, NULL, NULL, 0, '2024-04-26 23:23:28', '2024-04-26 23:23:28'),
(61, 49, 'String Shot', 'Flip a coin. If heads, the Defending Pokémon is now Paralyzed.', 10, 1, 7, NULL, NULL, 0, '2024-04-26 23:25:25', '2024-04-26 23:25:25'),
(62, 50, 'Stiffen', 'Flip a coin. If heads, prevent all damage done to Metapod during your opponent\'s next turn. (Any other effects of attacks still happen.)', NULL, 2, 22, NULL, NULL, 0, '2024-04-26 23:28:11', '2024-04-26 23:28:11'),
(63, 50, 'Stun Spore', 'Flip a coin. If heads, the Defending Pokémon is now Paralyzed.', 20, 2, 7, NULL, NULL, 0, '2024-04-26 23:28:11', '2024-04-26 23:28:11'),
(64, 51, 'Withdraw', 'Flip a coin. If heads, prevent all damage done to Wartortle during your opponent\'s next turn. (Any other effects of attacks still happen.)', NULL, 1, 5, 1, 22, 0, '2024-04-26 23:31:12', '2024-04-26 23:31:12'),
(65, 51, 'Bite', NULL, 40, 1, 5, 2, 22, 0, '2024-04-26 23:31:12', '2024-04-26 23:31:12'),
(66, 52, 'Bubble', 'Flip a coin. If heads, the Defending Pokémon is now Paralyzed.', 10, 1, 5, NULL, NULL, 0, '2024-04-26 23:33:16', '2024-04-26 23:33:16'),
(67, 52, 'Withdraw', 'Flip a coin. If heads, prevent all damage done to Squirtle during your opponent\'s next turn. (Any other effects of attacks still happen.)', NULL, 1, 5, 1, 22, 0, '2024-04-26 23:33:16', '2024-04-26 23:33:16'),
(68, 58, 'Strikes Back', 'Whenever your opponent\'s attack damages Machamp (even if Machamp is Knocked Out), this power does 10 damage to the attacking Pokémon. (Don\'t apply Weakness and Resistance.) This power can\'t be used if Machamp is Asleep, Confused, or Paralyzed when your opponent attacks.', NULL, NULL, NULL, NULL, NULL, 1, '2024-04-26 23:41:08', '2024-04-26 23:41:08'),
(69, 58, 'Seismic Toss', NULL, 60, 3, 9, 1, 22, 0, '2024-04-26 23:41:08', '2024-04-26 23:41:08'),
(70, 59, 'Karate Chop', 'Does 50 damage minus 10 damage for each damage counter on Machoke.', 50, 2, 9, 1, 22, 0, '2024-04-26 23:44:11', '2024-04-26 23:44:11'),
(71, 59, 'Submission', 'Machoke does 20 damage to itself.', 60, 2, 9, 2, 22, 0, '2024-04-26 23:44:11', '2024-04-26 23:44:11'),
(72, 60, 'Low Kick', NULL, 20, 1, 9, NULL, NULL, 0, '2024-04-26 23:46:05', '2024-04-26 23:46:05'),
(73, 62, 'Thick Skinned', 'Snorlax can\'t become Asleep, Confused, Paralyzed, or Poisoned. This power can\'t be used if Snorlax is already Asleep, Confused, or Paralyzed.', NULL, NULL, NULL, NULL, NULL, 1, '2024-05-01 16:34:52', '2024-05-01 16:34:52'),
(74, 62, 'Body Slam', 'Flip a coin. If heads, the Defending Pokémon is now Paralyzed.', 30, 4, 22, NULL, NULL, 0, '2024-05-01 16:34:52', '2024-05-01 16:34:52'),
(75, 63, 'Quick Attack', 'Flip a coin. If heads, this attack does 10 damage plus 20 more damage; if tails, this attack does 10 damage.', 10, 2, 22, NULL, NULL, 0, '2024-05-01 16:38:08', '2024-05-01 16:38:08'),
(76, 63, 'Water Gun', 'Does 30 damage plus 10 more damage for each Water Energy attached to Vaporeon but not used to pay for this attack\'s Energy cost. Extra Water Energy after the 2nd doesn\'t count.', 30, 2, 5, 1, 22, 0, '2024-05-01 16:38:08', '2024-05-01 16:38:08'),
(77, 64, 'Tail Wag', 'Flip a coin. If heads, the Defending Pokémon can\'t attack Eevee during your opponent\'s next turn. (Benching either Pokémon ends this effect.)', 50, 1, 22, NULL, NULL, 0, '2024-05-01 16:40:58', '2024-05-01 16:40:58'),
(78, 64, 'Quick Attack', 'Flip a coin. If heads, this attack does 10 damage plus 20 more damage; if tails, this attack does 10 damage.', 10, 2, 22, NULL, NULL, 0, '2024-05-01 16:40:58', '2024-05-01 16:40:58'),
(79, 65, 'Quick Attack', 'Flip a coin. If heads, this attack does 10 damage plus 20 more damage; if tails, this attack does 10 damage.', 10, 2, 22, NULL, NULL, 0, '2024-05-01 16:43:21', '2024-05-01 16:43:21'),
(80, 65, 'Pin Missile', 'Flip 4 coins. This attack does 20 damage times the number of heads.', 20, 2, 6, 1, 22, 0, '2024-05-01 16:43:21', '2024-05-01 16:43:21'),
(81, 66, 'Quick Attack', 'Flip a coin. If heads, this attack does 10 damage plus 20 more damage; if tails, this attack does 10 damage.', 10, 2, 22, NULL, NULL, 0, '2024-05-01 16:45:33', '2024-05-01 16:45:33'),
(82, 66, 'Flamethrower', 'Discard 1 Fire Energy card attached to Flareon in order to use this attack.', 60, 2, 4, 2, 22, 0, '2024-05-01 16:45:33', '2024-05-01 16:45:33'),
(83, 67, 'Prehistoric Power', 'No more Evolution cards can be played. This power stops working while Aerodactyl is Asleep, Confused, or Paralyzed.', NULL, NULL, NULL, NULL, NULL, 1, '2024-05-02 20:57:11', '2024-05-02 20:57:11'),
(84, 67, 'Wing Attack', NULL, 30, 3, 22, NULL, NULL, 0, '2024-05-02 20:57:11', '2024-05-02 20:57:11'),
(85, 68, 'Freeze Dry', 'Flip a coin. If heads, the Defending Pokémon is now Paralyzed.', 30, 3, 5, NULL, NULL, 0, '2024-05-02 20:59:24', '2024-05-02 20:59:24'),
(86, 68, 'Blizzard', 'Flip a coin. If heads, this attack does 10 damage to each of your opponent\'s Benched Pokémon. If tails, this attack does 10 damage to each of your own Benched Pokémon. (Don\'t apply Weakness and Resistance for Benched Pokémon.)', 50, 4, 5, NULL, NULL, 0, '2024-05-02 20:59:24', '2024-05-02 20:59:24'),
(87, 69, 'Transform', 'If Ditto is your Active Pokémon, treat it as if it were the same card as the Defending Pokémon, including type, Hit Points, Weakness, and so on, except Ditto can\'t evolve, always has this Pokémon Power, and you may treat any Energy attached to Ditto as Energy of any type. Ditto isn\'t a copy of any other Pokémon while Ditto is Asleep, Confused, or Paralyzed.', NULL, NULL, NULL, NULL, NULL, 1, '2024-05-02 21:01:17', '2024-05-02 21:01:17'),
(88, 70, 'Curse', 'Once during your turn (before your attack), you may move 1 damage counter from 1 of your opponent\'s Pokémon to another (even if it would Knock Out the other Pokémon). This power can\'t be used if Gengar is Asleep, Confused, or Paralyzed.', NULL, NULL, NULL, NULL, NULL, 1, '2024-05-02 21:03:13', '2024-05-02 21:03:13'),
(89, 70, 'Dark Mind', 'If your opponent has any Benched Pokémon, choose 1 of them and this attack does 10 damage to it. (Don\'t apply Weakness and Resistance for Benched Pokémon.)', 30, 3, 13, NULL, NULL, 0, '2024-05-02 21:03:13', '2024-05-02 21:03:13'),
(90, 71, 'Transparency', 'Whenever an attack does anything to Haunter, flip a coin. If heads, prevent all effects of that attack, including damage, done to Haunter. This power stops working while Haunter is Asleep, Confused, or Paralyzed.', NULL, NULL, NULL, NULL, NULL, 1, '2024-05-02 21:05:17', '2024-05-02 21:05:17'),
(91, 71, 'Nightmare', 'The Defending Pokémon is now Asleep.', 10, 1, 13, 1, 22, 0, '2024-05-02 21:05:17', '2024-05-02 21:05:17');

-- --------------------------------------------------------

--
-- Table structure for table `cardcollections`
--

CREATE TABLE `cardcollections` (
  `numInCollection` int(11) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `CollectionCollectionId` int(11) NOT NULL,
  `CardCardId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cardcollections`
--

INSERT INTO `cardcollections` (`numInCollection`, `createdAt`, `updatedAt`, `CollectionCollectionId`, `CardCardId`) VALUES
(1, '2024-04-27 13:33:08', '2024-04-27 13:33:08', 60, 8),
(1, '2024-04-27 13:33:02', '2024-04-27 13:33:02', 60, 13),
(2, '2024-04-27 13:33:04', '2024-04-27 13:33:06', 60, 16),
(1, '2024-04-27 17:08:11', '2024-04-27 17:08:11', 60, 25),
(2, '2024-04-27 13:33:10', '2024-04-27 17:08:13', 60, 26),
(2, '2024-04-27 17:08:28', '2024-04-27 17:08:30', 60, 29),
(1, '2024-04-27 17:08:27', '2024-04-27 17:08:27', 60, 30),
(2, '2024-04-27 13:33:22', '2024-04-27 17:08:24', 60, 33),
(1, '2024-04-27 17:08:20', '2024-04-27 17:08:20', 60, 35),
(1, '2024-04-27 17:08:19', '2024-04-27 17:08:19', 60, 37),
(3, '2024-04-27 13:33:18', '2024-04-27 17:08:22', 60, 42),
(2, '2024-04-27 13:33:14', '2024-04-27 17:08:16', 60, 43),
(2, '2024-04-27 13:33:12', '2024-04-27 17:08:15', 60, 58),
(1, '2024-04-27 14:24:22', '2024-04-27 14:24:22', 61, 26),
(1, '2024-04-27 14:24:26', '2024-04-27 14:24:26', 61, 42),
(1, '2024-04-27 14:24:36', '2024-04-27 14:24:36', 61, 44),
(2, '2024-04-27 14:24:45', '2024-04-28 16:55:06', 61, 57),
(1, '2024-04-27 16:24:32', '2024-04-27 16:24:32', 62, 37),
(2, '2024-04-27 16:24:27', '2024-04-27 16:24:29', 62, 58),
(2, '2024-04-27 16:24:44', '2024-04-27 16:24:46', 62, 59),
(2, '2024-04-27 16:24:55', '2024-04-27 16:24:57', 62, 60),
(10, '2024-04-27 16:03:10', '2024-04-27 16:03:26', 63, 36),
(11, '2024-04-27 16:02:16', '2024-04-27 16:02:53', 63, 45),
(9, '2024-04-27 16:02:22', '2024-04-27 16:02:40', 63, 46),
(6, '2024-05-01 22:37:04', '2024-05-01 22:37:05', 63, 65),
(5, '2024-05-01 22:36:56', '2024-05-01 22:36:58', 63, 66),
(1, '2024-04-27 16:05:49', '2024-04-27 16:05:49', 64, 3),
(2, '2024-04-27 16:05:45', '2024-04-27 16:05:47', 64, 4),
(2, '2024-04-27 16:05:43', '2024-04-27 16:05:44', 64, 12),
(1, '2024-04-27 16:05:33', '2024-04-27 16:05:33', 64, 49),
(1, '2024-04-27 16:05:28', '2024-04-27 16:05:28', 64, 50),
(1, '2024-04-27 16:16:59', '2024-04-27 16:16:59', 65, 14),
(2, '2024-04-27 16:16:26', '2024-05-02 12:38:08', 65, 17),
(2, '2024-04-27 16:16:30', '2024-04-28 00:11:02', 65, 25),
(14, '2024-04-27 16:17:08', '2024-05-02 12:38:34', 65, 34),
(1, '2024-04-27 16:16:37', '2024-04-27 16:16:37', 65, 35),
(8, '2024-04-27 16:17:26', '2024-04-28 00:02:22', 65, 36),
(1, '2024-05-01 22:15:51', '2024-05-01 22:15:51', 66, 8),
(1, '2024-04-27 13:22:34', '2024-04-30 21:56:17', 66, 32),
(1, '2024-04-27 13:22:26', '2024-04-30 21:56:12', 66, 34),
(1, '2024-04-27 13:23:06', '2024-04-30 21:56:15', 66, 52),
(1, '2024-04-27 16:13:03', '2024-04-27 16:13:03', 67, 5),
(1, '2024-04-27 16:12:54', '2024-04-27 16:12:54', 67, 29),
(1, '2024-04-27 16:12:53', '2024-04-27 16:12:53', 67, 33),
(3, '2024-04-27 16:12:59', '2024-04-27 16:13:01', 67, 34),
(1, '2024-04-27 16:12:51', '2024-04-27 16:12:51', 67, 43),
(1, '2024-04-27 16:12:56', '2024-04-27 16:12:56', 67, 44),
(1, '2024-04-27 16:08:48', '2024-04-27 16:08:48', 68, 1),
(1, '2024-04-27 16:08:22', '2024-04-27 16:08:22', 68, 7),
(2, '2024-04-27 16:07:58', '2024-04-27 23:58:04', 68, 8),
(1, '2024-04-27 16:08:00', '2024-04-27 16:08:00', 68, 16),
(1, '2024-04-27 16:08:04', '2024-04-27 16:08:04', 68, 26),
(1, '2024-04-27 16:08:19', '2024-04-27 16:08:19', 68, 30),
(1, '2024-04-27 16:08:25', '2024-04-27 16:08:25', 68, 31),
(1, '2024-04-27 16:08:45', '2024-04-27 16:08:45', 68, 32),
(1, '2024-04-27 16:08:51', '2024-04-27 16:08:51', 68, 34),
(1, '2024-04-27 16:08:06', '2024-04-27 16:08:06', 68, 42),
(1, '2024-04-27 16:08:54', '2024-04-27 16:08:54', 68, 52),
(1, '2024-04-27 16:33:41', '2024-04-27 16:33:41', 69, 5),
(1, '2024-04-27 16:32:31', '2024-05-02 20:02:07', 69, 7),
(1, '2024-04-27 16:33:38', '2024-05-02 15:19:08', 69, 12),
(1, '2024-05-02 12:53:21', '2024-05-02 12:53:21', 69, 13),
(1, '2024-04-27 16:32:37', '2024-04-27 16:32:37', 69, 15),
(1, '2024-04-27 16:32:04', '2024-04-27 16:32:04', 69, 16),
(1, '2024-04-27 16:32:07', '2024-04-27 16:32:07', 69, 17),
(1, '2024-04-27 16:32:28', '2024-04-27 16:32:28', 69, 27),
(1, '2024-04-27 16:32:56', '2024-04-27 16:32:56', 69, 28),
(2, '2024-04-27 16:32:24', '2024-05-02 12:52:45', 69, 29),
(1, '2024-05-02 12:52:48', '2024-05-02 12:52:48', 69, 30),
(1, '2024-04-27 16:32:15', '2024-04-27 16:32:15', 69, 33),
(1, '2024-05-02 12:52:29', '2024-05-02 12:52:29', 69, 40),
(1, '2024-04-27 16:32:40', '2024-04-27 16:32:40', 69, 48),
(2, '2024-05-02 12:52:23', '2024-05-02 12:52:25', 69, 50),
(1, '2024-05-02 01:18:34', '2024-05-02 01:18:34', 69, 52),
(1, '2024-05-02 12:52:32', '2024-05-02 12:52:32', 69, 54),
(1, '2024-04-27 16:33:31', '2024-04-27 16:33:31', 69, 55),
(1, '2024-05-02 15:19:30', '2024-05-02 15:19:30', 69, 66),
(2, '2024-10-02 20:27:43', '2024-10-02 20:27:48', 92, 16),
(1, '2024-10-02 20:29:13', '2024-10-02 20:29:13', 92, 67);

-- --------------------------------------------------------

--
-- Table structure for table `cards`
--

CREATE TABLE `cards` (
  `card_id` int(11) NOT NULL,
  `card_name` varchar(255) NOT NULL,
  `card_set_number` int(11) DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  `hp` int(11) DEFAULT NULL,
  `card_image` varchar(255) DEFAULT NULL,
  `height_weight` varchar(255) DEFAULT NULL,
  `card_description` text DEFAULT NULL,
  `set_id` int(11) DEFAULT NULL,
  `weakness_type_id` int(11) DEFAULT NULL,
  `weakness_amount` int(11) DEFAULT NULL,
  `resistance_type_id` int(11) DEFAULT NULL,
  `resistance_amount` int(11) DEFAULT NULL,
  `retreat_type_id` int(11) DEFAULT NULL,
  `retreat_cost` int(11) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `CategoryCategoryId` int(11) DEFAULT NULL,
  `RarityRarityId` int(11) DEFAULT NULL,
  `IllustratorIllustratorId` int(11) NOT NULL,
  `FineprintFineprintID` int(11) NOT NULL,
  `evolves_from_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cards`
--

INSERT INTO `cards` (`card_id`, `card_name`, `card_set_number`, `type_id`, `hp`, `card_image`, `height_weight`, `card_description`, `set_id`, `weakness_type_id`, `weakness_amount`, `resistance_type_id`, `resistance_amount`, `retreat_type_id`, `retreat_cost`, `release_date`, `createdAt`, `updatedAt`, `CategoryCategoryId`, `RarityRarityId`, `IllustratorIllustratorId`, `FineprintFineprintID`, `evolves_from_id`) VALUES
(1, 'Charmander', 46, 4, 60, 'https://static.tcgcollector.com/content/images/b5/56/76/b55676d11f282f28b7d6951fad7276673026d80b097eed4b212a9b7a3079ecfc.jpg', 'No. 004 Lizard Pokemon HT: 2\'00\" WT: 18.7 lbs.', 'Obviously prefers hot places. If it gets caught in the rain, steam is said to spout from the tip of its tail. LV.10 #4', 1, 5, 1, NULL, NULL, 22, 1, '1996-10-20', '2024-04-14 00:46:27', '2024-04-14 00:46:27', 1, 1, 1, 1, NULL),
(2, 'Fire Energy', 98, 4, NULL, 'https://static.tcgcollector.com/content/images/38/46/88/384688b5a0b428a9c7a67f5369f641eac47fa1721214724cc847f550793329a3.jpg', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '1996-10-20', '2024-04-14 00:46:27', '2024-04-14 00:46:27', 5, 1, 1, 1, NULL),
(3, 'Water Energy', 102, 5, NULL, 'https://static.tcgcollector.com/content/images/9a/a8/85/9aa8857fab945cc0da98b6ca25d805bd8912d06a5ddf983703931e1e9d613cc6.jpg', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '1996-10-20', '2024-04-14 00:46:27', '2024-04-14 00:46:27', 5, 1, 1, 1, NULL),
(4, 'Grass Energy', 99, 7, NULL, 'https://static.tcgcollector.com/content/images/39/d0/00/39d0004ec6d0b361673790c8a04d209d5943535c714f67e45cf64d0655bfd44d.jpg', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '1996-10-20', '2024-04-14 00:46:27', '2024-04-14 00:46:27', 5, 1, 1, 1, NULL),
(5, 'Lightning Energy', 100, 6, NULL, 'https://static.tcgcollector.com/content/images/52/aa/82/52aa824f80169c2bcb368b828cef8404196b9573d43bd627a88fdb04b4c9264f.jpg', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '1996-10-20', '2024-04-14 00:46:27', '2024-04-14 00:46:27', 5, 1, 1, 1, NULL),
(6, 'Psychic Energy', 101, 13, NULL, 'https://static.tcgcollector.com/content/images/90/c2/df/90c2dfedfe0fcb754169bde2d5bb99fa966704f603561c1b24fddf8ef8a76e13.jpg', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '1996-10-20', '2024-04-14 00:46:27', '2024-04-14 00:46:27', 5, 1, 1, 1, NULL),
(7, 'Charmeleon', 24, 4, 80, 'https://static.tcgcollector.com/content/images/84/1e/2b/841e2b076b91e9c8ea0ec95bb6a035ed080b2e4a6dc6e0f07ca540e08622f18c.jpg', 'Flame Pokemon. Length: 3\'7\". Weight: 42 lbs.', 'When it swings its burning tail, it raises the temperature to unbearably high levels. L.V. 32 #5', 1, 5, 1, NULL, NULL, 22, 1, '1996-10-20', '2024-04-14 00:46:27', '2024-04-14 00:46:27', 2, 3, 1, 1, 1),
(8, 'Charizard', 4, 4, 120, 'https://static.tcgcollector.com/content/images/3f/42/f1/3f42f174dfc7059a68843755abf9f70d08a730740f01a5a0d063f5b0aad23140.jpg', 'Flame Pokemon. Length: 6\' 7\", Weight: 200lbs', 'Spits fire that is hot enough to melt boulders. Known to unintentionally cause forest fires. L.V. 76 #6', 1, 5, 1, 9, 30, 22, 3, '1996-10-20', '2024-04-14 00:46:27', '2024-04-14 00:46:27', 3, 5, 1, 1, 7),
(12, 'Pokemon Trader', 77, NULL, NULL, 'https://static.tcgcollector.com/content/images/f7/e3/7e/f7e37ea1b7e6498db635849e2da95c67681aa6ea0d41f46703300258b6a9292d.jpg', NULL, 'Trade 1 of the Basic Pokémon or Evolution cards in your hand for 1 of the Basic Pokémon or Evolution cards from your deck. Show both cards to your opponent. Shuffle your deck afterward. ', 1, NULL, NULL, NULL, NULL, NULL, NULL, '1996-10-20', '2024-04-14 00:46:27', '2024-04-14 00:46:27', 4, 1, 1, 1, NULL),
(13, 'Alakazam', 1, 13, 80, 'https://static.tcgcollector.com/content/images/08/7e/c0/087ec077e4b09cfb741d950ed84119a1ea9c213db383c9b50198128a6dd1874e.jpg\r\n', 'Psi Pokemon. Length: 4\' 11\", Weight: 106 lbs.', 'Its brain can outperform a supercomputer. Its intelligence quotient is said to be 5000. LV. 42. #65', 1, 13, 1, NULL, NULL, 22, 3, '1996-10-20', '2024-04-14 00:46:27', '2024-04-14 00:46:27', 3, 5, 1, 1, 15),
(14, 'Abra', 43, 13, 30, 'https://static.tcgcollector.com/content/images/24/e8/b1/24e8b100fde928c777e17bcd36923c3e4a6b0309069928df8987ff908774a0ec.jpg', 'Psi Pokemon. Length: 2\'11, Weight: 42 lbs.', 'Using its ability to read minds, it will identify impeding danger and teleport to safety. LV. 10 #63', 1, 13, 1, NULL, NULL, NULL, NULL, '1996-10-20', '2024-04-14 00:46:27', '2024-04-14 00:46:27', 1, 1, 1, 1, NULL),
(15, 'Kadabra', 32, 13, 60, 'https://static.tcgcollector.com/content/images/a0/aa/24/a0aa24d8d634ea72c3686f10ea46f44213526e1e12c9405ad131bdbff8f7973f.jpg', 'Psi Pokemon. Length: 4\'3\", Weight: 125 lbs', 'It emits special alpha waves from its body that induce headaches even to those just nearby. LV. 38, #64', 1, 13, 1, NULL, NULL, NULL, NULL, '1996-10-20', '2024-04-14 00:46:27', '2024-04-14 00:46:27', 2, 3, 1, 1, 14),
(16, 'Blastoise', 2, 5, 100, 'https://static.tcgcollector.com/content/images/c6/71/66/c67166d1dec268dcd0504cf2d5c512be427c02ee60f64309e7f742ee06433342.jpg', 'Shellfish Pokemon. Length: 5\'3\", Weight: 189 lbs', 'A brutal Pokemon with pressurized water jets on its shell. They are used for high-speed tackles. Lv. 52 #9', 1, 6, 1, NULL, NULL, 22, 3, '1996-10-20', '2024-04-26 22:42:18', '2024-04-26 22:42:18', 3, 5, 1, 1, 51),
(17, 'Chancey', 3, 22, 120, 'https://static.tcgcollector.com/content/images/8b/75/89/8b7589fa9c8d9e85d00053f962724c04956d4296cdba2f31b238ef588c4b51ab.jpg', 'Egg Pokemon. Length: 3\'7\", Weight: 76 lbs.', 'A rare and elusive Pokemon that is sold to bring happiness to those who manage to catch it. Lv. 500 #113', 1, 9, 1, 13, 30, 22, 1, '1996-10-20', '2024-04-26 22:48:13', '2024-04-26 22:48:13', 1, 5, 1, 1, NULL),
(25, 'Clefairy', 4, 22, 40, 'https://static.tcgcollector.com/content/images/46/8c/39/468c39a95d3d46db3a6872c1c7845b5a5bf8f9086e038abb833da7296eb2b537.jpg', 'Fairy Pokemon. Length: 2\'0\", Weight: 17 lbs.', 'Its magical and cute appeal has many admirers. It is rare and found only in certain areas.', 1, 9, 1, 13, 30, 22, 1, '1990-10-20', '2024-04-26 22:53:38', '2024-04-26 22:53:38', 1, 5, 1, 1, NULL),
(26, 'Gyarados', 6, 5, 100, 'https://static.tcgcollector.com/content/images/b2/bf/e5/b2bfe5c2582682246d792a6331b674c2f9c0d9eddb96eee99695a08dfb98bf37.jpg', 'Atrocious Pokemon. Length: 21\' 4\", Weight: 518 lbs', 'Rarely seen in the wild. Huge and vicious. It it capable of destroying entire cities in its rage. Lv 41 #130', 1, 7, 1, 9, 30, 22, 3, '1990-10-20', '2024-04-26 22:58:46', '2024-04-26 22:58:46', 2, 5, 2, 1, 47),
(27, 'Dugtrio', 19, 9, 70, 'https://static.tcgcollector.com/content/images/98/c5/0b/98c50b6200bd023393aae5042cd68855445ea0014ce7406dd8e1ebe1c2018750.jpg', 'Mole Pokemon. Length: 2\'4\", Weight: 73 lbs.', 'A team of Diglett triplets. It triggers huge earthquakes by burrowing 60 miles underground.', 1, 7, 1, 6, 30, 22, 2, '1990-10-20', '2024-04-26 23:45:15', '2024-04-26 23:45:15', 2, 4, 4, 1, 28),
(28, 'Diglett', 47, 9, 30, 'https://static.tcgcollector.com/content/images/1f/c4/ce/1fc4cea69ee25ad6669003fabd8bb5dfce5076dfc8078abfd9ea58cfd5514e78.jpg', 'Mole Pokemon. Length: 0\' 8\", Weight: 2 lbs', 'Lives about three feet underground, where it feeds on plant roots. It sometimes appears above ground. Lv. 8 #50', 1, 7, 1, 6, 30, NULL, NULL, '1990-10-20', '2024-04-26 23:49:47', '2024-04-26 23:49:47', 1, 1, 4, 1, NULL),
(29, 'Zapdos', 16, 6, NULL, 'https://static.tcgcollector.com/content/images/20/a1/3d/20a13d6fba1cf7c23e084e16ad928ac25355464b68641bc0dbbc5c4829e565dc.jpg', 'Electric Pokemon. Length: 5\'3\", Weight: 116 lbs', 'A legendary bird Pokemon said to appear from clouds whilst wielding enormous lightning bolts. Lv 64. #145', 1, NULL, NULL, 9, 30, 22, 3, '1990-10-20', '2024-04-26 23:52:53', '2024-04-26 23:52:53', 1, 5, 1, 1, NULL),
(30, 'Venusaur', 15, 7, 100, 'https://static.tcgcollector.com/content/images/cb/8a/35/cb8a3526fef2c6138975c7ec2f85df7c705e7bb6885a49487aa5104eb8c6fe3c.jpg', 'Seed Pokemon. Length: 6\'7\", Weight: 221 lbs.', 'This plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight. Lv. 67 #3', 1, 4, 1, NULL, NULL, 22, 2, '1990-10-20', '2024-04-26 23:56:03', '2024-04-26 23:56:03', 3, 5, 2, 1, 31),
(31, 'Ivysaur', 30, 7, NULL, 'https://static.tcgcollector.com/content/images/fd/62/1a/fd621aa418bedcea5d8a426191a22df849bb0f98a48b2117af40a5edad32f8c5.jpg', 'Seed Pokemon. Length: 3\'3\", Weight: 29 lbs.', 'When the bulb on its back grows large, the Pokemon seems to lose the ability to stand on its hind legs. Lv. 20 #2', 1, 4, 1, NULL, NULL, 22, 1, '1990-10-20', '2024-04-26 23:58:34', '2024-04-26 23:58:34', 2, 3, 1, 1, 32),
(32, 'Bulbasaur', 44, 7, 40, 'https://static.tcgcollector.com/content/images/d7/63/5f/d7635fa13c477a9b6c260934c0469a04189dd023ee096e1372f1e6af974fafb1.jpg', 'Seed Pokemon. Length: 2\'4\", Length: 15 lbs.', 'A strange seed was planet on its back at birth. Thus, a plan sprouted and now grows with this Pokemon. Lv. 13 #1', 1, 4, 1, NULL, NULL, 22, 1, '1990-10-20', '2024-04-27 00:01:00', '2024-04-27 00:01:00', 1, 1, 2, 1, NULL),
(33, 'Raichu', 14, 6, 80, 'https://static.tcgcollector.com/content/images/d2/47/99/d24799f1710c2652fd019a28af96d4ddef15ab31e365d31a682a49ee1cec01ab.jpg', 'Mouse Pokemon. Length: 2\'7\", Weight: 64 lbs.', 'Its long tail serves as a ground to protect itself from its own high-voltage power. Lv. 40 #26', 1, 9, 1, NULL, NULL, 22, 1, '1990-10-20', '2024-04-27 00:06:22', '2024-04-27 00:06:22', 2, 5, 1, 1, 34),
(34, 'Pikachu', 58, 6, 40, 'https://static.tcgcollector.com/content/images/68/a3/82/68a382f162b2bc8a758c3ae8154b2ef39948f3bdd2bdd01ba2b6d6eda8dcba58.jpg', 'Mouse Pokemon. Length: 1\'4\", Weight: 13 lbs.', 'When several of these Pokemon join together, their electricity can cause lightning storms. LV.12 #25', 1, 9, 1, NULL, NULL, 22, 1, '1990-10-20', '2024-04-27 00:08:52', '2024-04-27 00:08:52', 1, 1, 2, 1, NULL),
(35, 'Ninetails', 12, 4, 80, 'https://static.tcgcollector.com/content/images/c1/c2/d8/c1c2d8e93917f147ae7138fc4fc66f0ccad1de04594abc42d4426065301fa0ce.jpg', 'Fox Pokemon. Length: 3\'7\", Weight: 44 lbs', 'Very smart and very vengeful. Grabbing one of its many tails could results in a 1,000-year-curse. Lv 32 #38', 1, 5, 1, 5, NULL, 22, 1, '1990-10-20', '2024-04-27 00:14:37', '2024-04-27 00:14:37', 2, 5, 1, 1, 36),
(36, 'Vulpix', 68, 4, 50, 'https://static.tcgcollector.com/content/images/3d/31/33/3d3133a9ff4fdd9e5729ba3aada140749cf7e92ebe9d9e69d805dcaae199fad0.jpg', 'Fox Pokemon. Length: 2\'0\", Weight: 22 lbs.', 'At the time of birth, it has just one tail. Its tail splits from the tip as it grows older. Lv. 11 #37', 1, 5, 1, NULL, NULL, 22, 1, '1990-10-20', '2024-04-27 00:17:23', '2024-04-27 00:17:23', 1, 1, 1, 1, NULL),
(37, 'Nidoking', 11, 7, 90, 'https://static.tcgcollector.com/content/images/f4/8e/7e/f48e7e69124ddc86388fa347c5c4012a470a3a9f64c487554d95de1ac01498a4.jpg', 'Drill Pokemon. Length: 4\'7\", Weight: 137 lbs.', 'Uses its powerful tail in battle to smash, constrict, then break its pray\'s bones. lv. 48 #34.', 1, 13, 1, NULL, NULL, 22, 3, '1990-10-20', '2024-04-27 00:19:29', '2024-04-27 00:19:29', 2, 5, 1, 1, 39),
(39, 'Nidorino', 37, 7, 60, 'https://static.tcgcollector.com/content/images/7a/cd/5d/7acd5df49eb738fe344990a6651f7525bb27166a32681636378f4e2f842b7e6c.jpg', 'Poison Pin Pokemon. Length: 2\'11\", Weight: 43 lbs.', 'An aggressive Pokemon that is quick to attack. The horn on its head secretes a powerful venom. Lv. 25 #33.', 1, 13, 1, NULL, NULL, 22, 1, '1990-10-20', '2024-04-27 00:22:27', '2024-04-27 00:22:27', 2, 3, 2, 1, 40),
(40, 'Nidoran ♂ ', 55, 7, 40, 'https://static.tcgcollector.com/content/images/9b/0d/d2/9b0dd2b3088d4d232e1354b84a8d122519c4eec22460a67ae5abb72b5ae8e662.jpg', 'Poison Pin Pokemon. Height: 1\'4\", Weight: 15 lbs.', 'Stiffens its ears to sense danger. The larger, more powerful of its horns secretes venom. Lv. 20 #32', 1, 13, 1, NULL, NULL, 22, 1, '1990-10-20', '2024-04-27 00:25:28', '2024-04-27 00:25:28', 1, 1, 1, 1, NULL),
(42, 'Mewtwo', 10, 13, 60, 'https://static.tcgcollector.com/content/images/39/61/73/396173eb8bb6ab2f3cf239ddfff6e50b97eae54ee2f15aa2d3f4bcfdf8573aa9.jpg', 'Genetic Pokemon. Length: 6\'7\", Weight: 269 lbs.', 'A scientist created this Pokemon after years of horrific genetic splicing and DNA engineering experiments. Lv. 53 #150', 1, 13, 1, NULL, NULL, 22, 3, '1990-10-20', '2024-04-27 00:28:11', '2024-04-27 00:28:11', 1, 5, 1, 1, NULL),
(43, 'Magneton', 9, 6, 60, 'https://static.tcgcollector.com/content/images/dd/bb/f0/ddbbf0713b598dac53fed1e193407f4f52d037c3dfcee60a9bf6d9e31c64990d.jpg', 'Magnet Pokemon. Length: 3\'3\", Weight: 132 lbs.', 'Formed by several MAgnemites linked together. It frequently appears when subspots flare up. Lv. 28 #82', 1, 9, 1, NULL, NULL, 22, 1, '1990-10-20', '2024-04-27 00:31:39', '2024-04-27 00:31:39', 2, 5, 4, 1, 44),
(44, 'Magnemite', 53, 6, 40, 'https://static.tcgcollector.com/content/images/6f/69/d7/6f69d701acd5e1e9c841c60d9011d52efd3d14000f8e8d0786a105d45bfa0013.jpg', 'Magnet Pokemon. Length: 1\'0\", Weight: 13 lbs.', 'Uses anti-gravity to stay suspended. Appears without warning and uses attacks like Thunder Wave. Lv. 13 #81', 1, 9, 1, NULL, NULL, 22, 1, '1990-10-20', '2024-04-27 00:34:54', '2024-04-27 00:34:54', 1, 1, 4, 1, NULL),
(45, 'Arcanine', 23, 4, 100, 'https://static.tcgcollector.com/content/images/10/44/f9/1044f9604b85b3236c76a8e56fd9d62f330eb89d003ff4155cd87d69cb51095c.jpg', 'Legendary Pokemon. Length: 6\'3\", Weight: 342 lbs.', 'A Pokemon that has been long admired for its beauty. It runs gracefully, as if on wings. ', 1, 5, 1, NULL, NULL, 22, 3, '1990-10-20', '2024-04-27 01:04:15', '2024-04-27 01:04:15', 2, 3, 1, 1, 46),
(46, 'Growlithe', 28, 4, 60, 'https://static.tcgcollector.com/content/images/e4/de/be/e4debe5c37c28cee773bb7c5c5d32f18f14902b3536cbcdcf0dac48338dabf6a.jpg', 'Puppy Pokemon. Length: 2\' 4\", Weight: 42 lbs.', 'Very protective of its territory. It will bark and bite to repel intruders from its space. Lv. 18 #58', 1, 5, 1, NULL, NULL, 22, 1, '1990-10-20', '2024-04-27 01:06:54', '2024-04-27 01:06:54', 1, 3, 1, 1, NULL),
(47, 'Magikarp', 35, 5, 30, 'https://static.tcgcollector.com/content/images/25/f1/5d/25f15d6ac7856ff60a86133022f4290446d3b19710b89e3df34ba3d53a35baf6.jpg', 'Fish Pokemon. Length: 2\'11, Weight: 22 lbs.', 'In the distant past, it was strong than its horribly weak descendants that exist today. Lv 8 #129.', 1, 6, 1, NULL, NULL, 22, 1, '1990-10-20', '2024-04-27 01:18:41', '2024-04-27 01:18:41', 1, 3, 2, 1, NULL),
(48, 'Kakuna', 33, 7, 80, 'https://static.tcgcollector.com/content/images/60/1d/a6/601da6b630d99c5447ca06d48aab8890d8b2cff18275264d3b634bc6a24a9c33.jpg', 'Cocoon Pokemon. Length: 2\'0, Length: 22 lbs.', 'Almost incapable of moving, this Pokemon can only harden its sheel to protect itself from predactors. LV. 23 #14', 1, 4, 1, NULL, NULL, 22, 2, '1990-10-20', '2024-04-27 01:20:59', '2024-04-27 01:20:59', 2, 3, 4, 1, NULL),
(49, 'Caterpie', 45, 7, 40, 'https://static.tcgcollector.com/content/images/bd/73/8d/bd738d2d37fa6b1a54faec19abaf38c70135c3edb93ec2a61eb400b5cbed47d1.jpg', 'Worm Pokemon. Length: 1\'0\", Weight: 6 lbs.', 'Its short feet are tipped with suction pads that enable it to tirelessly climb slopes and walls. LV. 13 #10', 1, 4, 1, NULL, NULL, 22, 1, '1990-10-20', '2024-04-27 01:23:33', '2024-04-27 01:23:33', 1, 1, 1, 1, NULL),
(50, 'Metapod', 54, 7, 70, 'https://static.tcgcollector.com/content/images/08/55/8a/08558acebf1368c5ed020a68f8e8b7a52602ff9fa842a455257a57a1ee01ba62.jpg', 'Cocoon Pokemon. Length: 2\'4\", Weight: 22 lbs.', 'It is vulnerable to attack because its shell is soft. exposing its weak and tender body. LV. 21 #11', 1, 4, 1, NULL, NULL, 22, 2, '1990-10-20', '2024-04-27 01:25:40', '2024-04-27 01:25:40', 1, 1, 1, 1, 49),
(51, 'Wartortle', 42, 5, 70, 'https://static.tcgcollector.com/content/images/a6/1a/c9/a61ac9e396e10dc966a2f999e7e98b539886abe69572261c52ed617891e78936.jpg', 'Turtle Pokemon. Length: 3\'3\", Weight: 50 lbs.', 'Often hides in water to stalk unwary prey. When swimming quickly, it moves its ears to maintain balance. LV. 22 #8', 1, 6, 1, NULL, NULL, 22, 1, '1990-10-20', '2024-04-27 01:29:05', '2024-04-27 01:29:05', 2, 3, 1, 1, 52),
(52, 'Squirtle', 63, 5, 40, 'https://static.tcgcollector.com/content/images/96/24/3d/96243da78231309f8d08d9d1aae3c229c1786ad2890ec334ce9747cbd763cf37.jpg', 'Tiny Turtle Pokemon. Length: 1\'8\", Weight: 20 lbs.', 'After birth, its back swells and hardens into a shell. It powerfull sprays foam from its mouth. LV. 8 #7', 1, 6, 1, NULL, NULL, 22, 1, '1990-10-20', '2024-04-27 01:31:18', '2024-04-27 01:31:18', 1, 1, 2, 1, NULL),
(54, 'Clefairy Doll', 70, NULL, NULL, 'https://static.tcgcollector.com/content/images/cc/91/54/cc9154a9e7b3ae6e014c103e25dcc498bb9f24c969ce1c919d37e59462c70a33.jpg', NULL, 'Play Clefairy Doll as if it were a Basic Pokémon. While in play, Clefairy Doll counts as a Pokémon (instead of a Trainer card). Clefairy Doll has no attacks, can\'t retreat, and can\'t be Asleep, Confused, Paralyzed, or Poisoned. If Clefairy Doll is Knocked Out, it doesn\'t count as a Knocked Out Pokémon. At any time during your turn before your attack, you may discard Clefairy Doll.', 1, NULL, NULL, NULL, NULL, NULL, NULL, '1990-10-20', '2024-04-27 01:35:41', '2024-04-27 01:35:41', 4, 4, 4, 1, NULL),
(55, 'Computer Search', 71, NULL, NULL, 'https://static.tcgcollector.com/content/images/34/cb/02/34cb02228c8b233efe1d60bdfa4952607a6b6ee7b22c05fe9416528cd8f3f47f.jpg', NULL, 'Discard 2 of the other cards from your hand in order to search your deck for any card and put it into your hand. Shuffle your deck afterward.', 1, NULL, NULL, NULL, NULL, NULL, NULL, '1990-10-20', '2024-04-27 01:36:24', '2024-04-27 01:36:24', 4, 4, 4, 1, NULL),
(56, 'Devolution Spray', 72, NULL, NULL, 'https://static.tcgcollector.com/content/images/2d/30/6e/2d306e954dd35fcedb51060bf962bee649f0cff378fa109d104faaa0088fca7c.jpg', NULL, 'Choose 1 of your own Pokémon in play and a Stage of Evolution. Discard all Evolution cards of that Stage or higher attached to that Pokémon. That Pokémon is no longer Asleep, Confused, Paralyzed, Poisoned, or anything else that might be the result of an attack (just as if you had evolved it).', 1, NULL, NULL, NULL, NULL, NULL, NULL, '1990-10-20', '2024-04-27 01:37:03', '2024-04-27 01:37:03', 4, 4, 4, 1, NULL),
(57, 'Impostor Professor Oak ', 73, NULL, NULL, 'https://static.tcgcollector.com/content/images/1d/b9/00/1db90083987498b71be106b00ee064dbb59833a3204a1633dca16ba4e6afcae9.jpg', NULL, 'Your opponent shuffles his or her hand into his or her deck, then draws 7 cards.', 1, NULL, NULL, NULL, NULL, NULL, NULL, '1990-10-20', '2024-04-27 01:37:50', '2024-04-27 01:37:50', 4, 4, 1, 1, NULL),
(58, 'Machamp', 8, 9, 100, 'https://static.tcgcollector.com/content/images/ba/a7/f2/baa7f26090f0d720f7ea708e095087bf4628ad0e850c98965a25cfebf7d36783.jpg', 'Superpower Pokemon. Length: 5\'3\", Weight: 287 lbs.', 'Using its amazing muscles, it throws powerful punches that can knock its victim clear over the horizon.', 1, 13, 1, NULL, NULL, 22, 3, '1990-10-20', '2024-04-27 01:38:44', '2024-04-27 01:38:44', 2, 5, 1, 1, 59),
(59, 'Machoke', 34, 9, 80, 'https://static.tcgcollector.com/content/images/fd/69/dd/fd69dd9166374bd550ee55b9c1e996b595a145939343797c979ad48b9f6763f2.jpg', 'Superpower Pokemon. Length: 4\'11, Weight: 155 lbs.', 'Its muscular body is so powerful that it must wear a power-save belt to help regulate its motions. LV. 40 #67', 1, 13, 1, NULL, NULL, 22, 3, '1990-10-20', '2024-04-27 01:41:35', '2024-04-27 01:41:35', 2, 3, 1, 1, 60),
(60, 'Machop', 52, 9, 50, 'https://static.tcgcollector.com/content/images/d6/a7/64/d6a764c3cf4ee01857e42a6062de831249a17a4bd5a8d1960a66e6c4feb1877b.jpg', 'Superpower Pokemon. Length: 2\' 7\", Weight: 43 lbs.', 'Loves to build its muscles. It trains in all styles of martial arts to become even stronger. LV. 20 #66', 1, 13, 1, NULL, NULL, 22, 1, '1990-10-20', '2024-04-27 01:44:13', '2024-04-27 01:44:13', 1, 1, 2, 1, NULL),
(62, 'Snorlax', 11, 22, 90, 'https://static.tcgcollector.com/content/images/e2/ef/77/e2ef778918b60c59823d3bf303d930d5c786431712c2a7ef6a079bb332ea0e71.jpg', 'Sleeping Pokemon. Length: 6\'11\", Weight: 1014 lbs.', 'Very lazy. Just eats and sleeps. As its rotund bulk builds, it becomes steadily more slothful. LV. 20 #143', 2, 9, 1, 13, 30, 22, 4, '1999-06-16', '2024-05-01 18:30:50', '2024-05-01 18:30:50', 1, 5, 1, 1, NULL),
(63, 'Vaporeon', 12, 5, 80, 'https://static.tcgcollector.com/content/images/f8/2f/12/f82f127bd0824933a4503c19f8b3be7c70c858d44b52bb82431cdba6a1b17149.jpg', 'Bubble Jet Pokemon. Length: 3\'3\", Weight: 64 lbs.', 'Lives close to water. Its long tail is ridged with a fin that is often mistaken from a mermaid\'s tail. LV. 42 #134', 2, 6, 1, NULL, NULL, 22, 1, '1999-06-16', '2024-05-01 18:34:58', '2024-05-01 18:34:58', 2, 5, 2, 1, NULL),
(64, 'Eevee', 51, 22, 50, 'https://static.tcgcollector.com/content/images/80/d9/3c/80d93cb72220d1350d16cfc33762fb9f3f74775199b20e2bcd16c9fb71681506.jpg', 'Evolution Pokemon. Length: 1\'0\", Weight: 14 lbs', 'Its genetic code is irregular. It may mutate if it is exposed to radiation from elemental stones. LV. 12 #133', 2, 9, 1, 13, 30, 22, 1, '1999-06-16', '2024-05-01 18:38:15', '2024-05-01 18:38:15', 1, 1, 5, 1, NULL),
(65, 'Jolteon', 4, 6, 70, 'https://static.tcgcollector.com/content/images/f1/cf/2f/f1cf2f47aa856151c5e720f43d2e10ce301f863f4223b9aa04367d67cdfb4d2a.jpg', 'Lightning Pokemon. Length: 2\'7\", Weight: 54 lbs', 'It accumulates negative ions from the atmosphere to blast out 10,000-volt lightning attacks. LV. 29 #135', 2, 9, 1, NULL, NULL, 22, 1, '1999-06-16', '2024-05-01 18:41:06', '2024-05-01 18:41:06', 2, 5, 5, 1, 64),
(66, 'Flareon', 3, 4, 70, 'https://static.tcgcollector.com/content/images/3e/a1/b1/3ea1b1aa700e2b46602c57cf75b1bd997ce70473f1b48466d00c12112bfa46a5.jpg', 'Flame Pokemon. Length: 2\'11\", Weight: 55 lbs', 'When storing thermal energy in its body, its temperature can soar to over 1600 degrees. LV.28 #136', 2, 5, 1, NULL, NULL, 22, 1, '1999-06-16', '2024-05-01 18:43:31', '2024-05-01 18:43:31', 2, 5, 5, 1, 64),
(67, 'Aerodactyl', 1, 9, 60, 'https://static.tcgcollector.com/content/images/e4/3b/a7/e43ba74903a66129a90b785172aee72e21bb2e9b83a076f8629fdb5b17a4a1ab.jpg', 'Fossil Pokemon. Length: 5\'11\", Weight: 130lbs', 'A ferocious prehistoric Pokemon that goes for the enemy\'s throat with its serrated saw-like fangs. LV. 28 #142', 3, 7, 1, 9, 30, 22, 2, '1999-10-10', '2024-05-02 22:54:36', '2024-05-02 22:54:36', 2, 5, 5, 1, NULL),
(68, 'Articuno', 2, 5, 70, 'https://static.tcgcollector.com/content/images/d1/76/f1/d176f1df12c79c7987b978f6cb4f91524eb4a559aad4def469bdaabee769021c.jpg', 'Freeze Pokemon. Length: 5\'7\", Weight: 122 lbs', 'A legendary bird Pokemon that is said to appear to doomed people who are lost in icy mountains. LV. 35 #144', 3, NULL, NULL, 9, 30, 22, 2, '1999-10-10', '2024-05-02 22:57:14', '2024-05-02 22:57:14', 1, 5, 2, 1, NULL),
(69, 'Ditto', 3, 22, 50, 'https://static.tcgcollector.com/content/images/68/b1/71/68b1719d38dec024a66f093bb56604dabf4fb73f5363da046cf026e014e33405.jpg', 'Transform Pokemon. Length: 1\'0\", Weight: 9 lbs', 'Capable of copying an enemy\'s genetic code to instantly transform itself into a duplicate of the enemy. Lv. 20 #132', 3, 9, 1, 13, 30, 22, 1, '1999-10-10', '2024-05-02 22:59:27', '2024-05-02 22:59:27', 1, 5, 4, 1, NULL),
(70, 'Gengar', 5, 13, 80, 'https://static.tcgcollector.com/content/images/e1/ef/c3/e1efc32fa28078b1ca788a1b3f166b7d9ee468aff44811d57a836f158d881732.jpg', 'Shadow Pokemon. Length: 4\'11, Weight: 89 lbs', 'Under a full moon, this Pokemon likes to mimic the shadows of people and laugh at their fright.', 3, NULL, NULL, 9, 30, 22, 1, '1999-10-10', '2024-05-02 23:01:22', '2024-05-02 23:01:22', 3, 5, 4, 1, NULL),
(71, 'Haunter', 6, 13, 50, 'https://static.tcgcollector.com/content/images/54/0b/10/540b10d1fa1729decaa7c05ba79a4c7ea425c47c076274abefc805bb5475ff1a.jpg', 'Gas Pokemon. Length: 5\'3\" Weight: 0.2 lbs', 'Because of its ability to slip through black walls, it is said to be from another dimension.', 3, NULL, NULL, 9, 30, NULL, NULL, '1999-10-10', '2024-05-02 23:03:17', '2024-05-02 23:03:17', 2, 5, 1, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cardwishlists`
--

CREATE TABLE `cardwishlists` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `WishlistWishlistId` int(11) NOT NULL,
  `CardCardId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cardwishlists`
--

INSERT INTO `cardwishlists` (`createdAt`, `updatedAt`, `WishlistWishlistId`, `CardCardId`) VALUES
('2024-05-01 22:23:42', '2024-05-01 22:23:42', 1, 13),
('2024-05-01 22:10:25', '2024-05-01 22:10:25', 1, 16),
('2024-05-01 22:09:02', '2024-05-01 22:09:02', 1, 17),
('2024-05-02 12:38:13', '2024-05-02 12:38:13', 4, 66),
('2024-05-02 19:13:21', '2024-05-02 19:13:21', 10, 16),
('2024-10-02 20:29:03', '2024-10-02 20:29:03', 15, 16);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_description`, `createdAt`, `updatedAt`) VALUES
(1, 'Basic Pokemon', '2024-04-14 03:13:04', '2024-04-14 03:13:04'),
(2, 'Stage 1 Pokemon', '2024-04-14 03:13:04', '2024-04-14 03:13:04'),
(3, 'Stage 2 Pokemon', '2024-04-14 03:13:04', '2024-04-14 03:13:04'),
(4, 'Trainer', '2024-04-14 03:13:04', '2024-04-14 03:13:04'),
(5, 'Energy', '2024-04-14 03:13:04', '2024-04-14 03:13:04');

-- --------------------------------------------------------

--
-- Table structure for table `collections`
--

CREATE TABLE `collections` (
  `collection_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` double DEFAULT NULL,
  `numLikes` int(11) DEFAULT 0,
  `numCards` int(11) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `collections`
--

INSERT INTO `collections` (`collection_id`, `user_id`, `rating`, `numLikes`, `numCards`, `createdAt`, `updatedAt`) VALUES
(60, 215, NULL, 9, 21, '2024-04-22 19:53:19', '2024-04-28 19:16:57'),
(61, 216, NULL, 2, 5, '2024-04-22 20:15:12', '2024-04-28 16:55:06'),
(62, 217, NULL, 3, 7, '2024-04-23 00:57:50', '2024-05-02 14:58:17'),
(63, 218, NULL, 8, 41, '2024-04-23 00:59:53', '2024-05-01 22:37:05'),
(64, 219, NULL, 0, 6, '2024-04-23 01:01:00', '2024-04-27 16:05:47'),
(65, 220, NULL, 2, 28, '2024-04-23 01:01:39', '2024-05-02 15:32:59'),
(66, 221, NULL, 5, 11, '2024-04-23 01:16:16', '2024-05-01 22:15:30'),
(67, 222, NULL, 4, 7, '2024-04-23 01:16:58', '2024-05-01 15:56:07'),
(68, 223, NULL, 3, 12, '2024-04-23 01:17:18', '2024-04-27 23:58:04'),
(69, 224, NULL, 3, 22, '2024-04-23 18:53:00', '2024-05-02 20:02:04'),
(91, 246, NULL, 0, 0, '2024-09-01 14:46:07', '2024-09-01 14:46:07'),
(92, 247, NULL, 0, 2, '2024-10-02 20:27:20', '2024-10-02 20:27:48');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `collection_id` int(11) DEFAULT NULL,
  `comment_body` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `user_id`, `collection_id`, `comment_body`, `createdAt`, `updatedAt`) VALUES
(44, 216, 61, 'Hell yea', '2024-04-26 20:05:29', '2024-04-26 20:05:29'),
(46, 215, 66, 'You wish you had as many shinies as me', '2024-04-27 13:36:58', '2024-04-27 13:36:58'),
(48, 219, 63, 'I love dogs too', '2024-04-27 16:06:43', '2024-04-27 16:06:43'),
(49, 219, 63, 'Please can i have some of your cards', '2024-04-27 16:06:54', '2024-04-27 16:06:54'),
(50, 222, 60, 'I\'d destroy every one of these with my electric attacks', '2024-04-27 16:13:57', '2024-04-27 16:13:57'),
(51, 220, 63, 'OMG so cute!', '2024-04-27 16:17:56', '2024-04-27 16:17:56'),
(52, 220, 66, 'Pikachu is the cutest', '2024-04-27 16:21:11', '2024-04-27 16:21:11'),
(53, 217, 65, 'These pokemon need some meat on their bones', '2024-04-27 16:26:44', '2024-04-27 16:26:44'),
(54, 217, 64, 'Haha your collection sucks', '2024-04-27 16:27:04', '2024-04-27 16:27:04'),
(55, 217, 68, 'Hell yea brother', '2024-04-27 16:27:17', '2024-04-27 16:27:17'),
(56, 217, 60, 'Epic', '2024-04-27 16:27:26', '2024-04-27 16:27:26'),
(57, 224, 63, 'You\'d better keep them on a leash', '2024-04-27 16:38:27', '2024-04-27 16:38:27'),
(58, 224, 67, 'Please don\'t leave aggressive comments on other user\'s profiles.', '2024-04-27 16:39:04', '2024-04-27 16:39:04'),
(59, 222, 67, 'Quiet nerd', '2024-04-27 16:40:43', '2024-04-27 16:40:43'),
(60, 215, 64, 'HAHAHAHAHAA', '2024-04-27 17:06:57', '2024-04-27 17:06:57'),
(61, 215, 67, 'Let\'s battle', '2024-04-27 17:07:14', '2024-04-27 17:07:14'),
(62, 215, 65, 'The shinies are cool', '2024-04-27 17:07:31', '2024-04-27 17:07:31'),
(69, 216, 66, 'BOOO', '2024-04-28 00:17:22', '2024-04-28 00:17:22'),
(75, 216, 66, 'YOU SUUUCK', '2024-04-28 00:24:31', '2024-04-28 00:24:31'),
(80, 221, 61, 'Haha you have no likes', '2024-04-29 00:55:39', '2024-04-29 00:55:39'),
(81, 221, 66, 'I\'m the best', '2024-04-30 21:56:29', '2024-04-30 21:56:29'),
(102, 217, 61, 'Can I join?', '2024-05-02 01:20:10', '2024-05-02 01:20:10'),
(106, 220, 67, 'Nasty Pokemon', '2024-05-02 12:39:21', '2024-05-02 12:39:21'),
(112, 220, 62, 'Scary!', '2024-05-02 12:49:41', '2024-05-02 12:49:41'),
(114, 219, 66, 'Please can I have some cards', '2024-05-02 14:57:44', '2024-05-02 14:57:44'),
(116, 224, 65, '@GymBoss please don\'t PokeShame.', '2024-05-02 15:33:14', '2024-05-02 15:33:14'),
(120, 247, 65, 'Wow!', '2024-10-02 20:28:32', '2024-10-02 20:28:32');

-- --------------------------------------------------------

--
-- Table structure for table `fineprints`
--

CREATE TABLE `fineprints` (
  `fineprint_id` int(11) NOT NULL,
  `fineprint_text` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `fineprints`
--

INSERT INTO `fineprints` (`fineprint_id`, `fineprint_text`, `createdAt`, `updatedAt`) VALUES
(1, '©1995, 96, 98, Ninendo Creatures, GAMEFREAK ©1999 Wizards.', '2024-04-18 12:53:37', '2024-04-18 12:53:37');

-- --------------------------------------------------------

--
-- Table structure for table `illustrators`
--

CREATE TABLE `illustrators` (
  `illustrator_id` int(11) NOT NULL,
  `illustrator_name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `illustrators`
--

INSERT INTO `illustrators` (`illustrator_id`, `illustrator_name`, `createdAt`, `updatedAt`) VALUES
(1, 'Ken Sugimori', '2024-04-18 12:18:23', '2024-04-18 12:18:23'),
(2, 'Mitsuhiro Arita', '2024-04-18 12:21:09', '2024-04-18 12:21:09'),
(4, 'Keiji Kinebuchi', '2024-04-26 23:47:45', '2024-04-26 23:47:45'),
(5, 'Kagemaru Himeno', '2024-05-01 18:37:06', '2024-05-01 18:37:06');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `like_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `collection_id` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`like_id`, `user_id`, `collection_id`, `createdAt`, `updatedAt`) VALUES
(24, 216, 61, '2024-04-26 18:47:18', '2024-04-26 18:47:18'),
(25, 216, 61, '2024-04-26 18:47:27', '2024-04-26 18:47:27'),
(29, 216, 60, '2024-04-26 19:57:57', '2024-04-26 19:57:57'),
(32, 215, 66, '2024-04-27 13:36:21', '2024-04-27 13:36:21'),
(33, 221, 60, '2024-04-27 14:11:23', '2024-04-27 14:11:23'),
(34, 218, 60, '2024-04-27 16:03:35', '2024-04-27 16:03:35'),
(35, 218, 66, '2024-04-27 16:03:54', '2024-04-27 16:03:54'),
(36, 219, 60, '2024-04-27 16:06:20', '2024-04-27 16:06:20'),
(37, 219, 63, '2024-04-27 16:06:34', '2024-04-27 16:06:34'),
(38, 223, 60, '2024-04-27 16:09:44', '2024-04-27 16:09:44'),
(39, 223, 66, '2024-04-27 16:09:53', '2024-04-27 16:09:53'),
(40, 223, 63, '2024-04-27 16:10:01', '2024-04-27 16:10:01'),
(41, 222, 60, '2024-04-27 16:13:14', '2024-04-27 16:13:14'),
(42, 222, 63, '2024-04-27 16:13:24', '2024-04-27 16:13:24'),
(43, 222, 68, '2024-04-27 16:14:31', '2024-04-27 16:14:31'),
(44, 220, 63, '2024-04-27 16:17:51', '2024-04-27 16:17:51'),
(45, 220, 66, '2024-04-27 16:21:14', '2024-04-27 16:21:14'),
(46, 220, 67, '2024-04-27 16:21:24', '2024-04-27 16:21:24'),
(47, 220, 68, '2024-04-27 16:21:32', '2024-04-27 16:21:32'),
(48, 217, 63, '2024-04-27 16:26:25', '2024-04-27 16:26:25'),
(49, 217, 65, '2024-04-27 16:26:33', '2024-04-27 16:26:33'),
(50, 217, 60, '2024-04-27 16:30:08', '2024-04-27 16:30:08'),
(51, 217, 67, '2024-04-27 16:30:23', '2024-04-27 16:30:23'),
(52, 224, 63, '2024-04-27 16:34:42', '2024-04-27 16:34:42'),
(53, 224, 60, '2024-04-27 16:51:27', '2024-04-27 16:51:27'),
(69, 223, 62, '2024-04-27 23:58:33', '2024-04-27 23:58:33'),
(70, 223, 69, '2024-04-27 23:58:40', '2024-04-27 23:58:40'),
(75, 221, 63, '2024-04-29 00:14:45', '2024-04-29 00:14:45'),
(87, 221, 69, '2024-05-01 15:54:15', '2024-05-01 15:54:15'),
(88, 221, 67, '2024-05-01 15:54:30', '2024-05-01 15:54:30'),
(90, 219, 62, '2024-05-02 14:58:17', '2024-05-02 14:58:17');

-- --------------------------------------------------------

--
-- Table structure for table `rarities`
--

CREATE TABLE `rarities` (
  `rarity_id` int(11) NOT NULL,
  `rarity_description` varchar(255) DEFAULT NULL,
  `rarity_icon` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rarities`
--

INSERT INTO `rarities` (`rarity_id`, `rarity_description`, `rarity_icon`, `createdAt`, `updatedAt`) VALUES
(1, 'Common', 'https://static.tcgcollector.com/content/images/03/08/d9/0308d9c7d4a31fada37b7501fe5d0e64db63ede17946705915b0a5dce02fb38c.svg', '2024-04-18 12:41:13', '2024-04-18 12:41:13'),
(3, 'Uncommon', 'https://static.tcgcollector.com/content/images/a5/76/b5/a576b59bbb2dd94e765d4b70bd3fd014ed748d92c70a60e7b3afcf8bbc75768f.svg', '2024-04-18 12:43:23', '2024-04-18 12:43:23'),
(4, 'Rare', 'https://static.tcgcollector.com/content/images/1b/c1/d1/1bc1d1d3192249aa2016d5a7f3eef08588c3b1eceee0afe2c87e30c8392076ce.svg', '2024-04-18 12:43:57', '2024-04-18 12:43:57'),
(5, 'Rare Holo', 'https://static.tcgcollector.com/content/images/b0/59/b2/b059b2c2aa09fe79239a20597c4378cd502dcce2ec732854d9bbbee558443077.svg', '2024-04-18 12:44:07', '2024-04-18 12:44:07'),
(6, 'Double Rare', 'https://static.tcgcollector.com/content/images/b9/16/32/b91632f55383ed26dcba80d988184440ee618a395fe6a79a931fec86ad70e028.svg', '2024-04-18 12:45:17', '2024-04-18 12:45:17'),
(7, 'Ultra Rare', 'https://static.tcgcollector.com/content/images/97/0f/36/970f36c3aca100b8a52c4f9b3b5a7471de41b0399253aff7ec83ad7a2c50bfd0.svg', '2024-04-18 12:45:44', '2024-04-18 12:45:44');

-- --------------------------------------------------------

--
-- Table structure for table `series`
--

CREATE TABLE `series` (
  `series_id` int(11) NOT NULL,
  `series_name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `series`
--

INSERT INTO `series` (`series_id`, `series_name`, `createdAt`, `updatedAt`) VALUES
(1, 'Original', '2024-04-14 02:18:19', '2024-04-14 02:18:19'),
(2, 'Neo', '2024-04-14 02:18:19', '2024-04-14 02:18:19'),
(3, 'Legendary Collection', '2024-04-14 02:18:19', '2024-04-14 02:18:19'),
(4, 'e-Card', '2024-04-14 02:18:19', '2024-04-14 02:18:19'),
(5, 'Ex', '2024-04-14 02:18:19', '2024-04-14 02:18:19'),
(6, 'Diamond & Pearl', '2024-04-14 02:18:19', '2024-04-14 02:18:19'),
(7, 'Platinum', '2024-04-14 02:18:19', '2024-04-14 02:18:19'),
(8, 'HeartGold & SoulSilver', '2024-04-14 02:18:19', '2024-04-14 02:18:19'),
(9, 'Call of Legends', '2024-04-14 02:18:19', '2024-04-14 02:18:19'),
(10, 'Black and White', '2024-04-14 02:18:19', '2024-04-14 02:18:19'),
(11, 'XY', '2024-04-14 02:18:19', '2024-04-14 02:18:19'),
(12, 'Sun & Moon', '2024-04-14 02:18:19', '2024-04-14 02:18:19'),
(13, 'Sword & Shield', '2024-04-14 02:18:19', '2024-04-14 02:18:19'),
(14, 'Scarlett & Violet', '2024-04-14 02:18:19', '2024-04-14 02:18:19');

-- --------------------------------------------------------

--
-- Table structure for table `sets`
--

CREATE TABLE `sets` (
  `set_id` int(11) NOT NULL,
  `set_name` varchar(255) NOT NULL,
  `no_of_cards` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `series_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sets`
--

INSERT INTO `sets` (`set_id`, `set_name`, `no_of_cards`, `createdAt`, `updatedAt`, `series_id`) VALUES
(1, 'Base Set', 102, '2024-04-14 02:25:20', '2024-04-14 02:25:20', 1),
(2, 'Jungle', 64, '2024-04-14 02:25:20', '2024-04-14 02:25:20', 1),
(3, 'Fossil', 62, '2024-04-14 02:25:20', '2024-04-14 02:25:20', 1);

-- --------------------------------------------------------

--
-- Table structure for table `types`
--

CREATE TABLE `types` (
  `type_id` int(11) NOT NULL,
  `type_description` varchar(255) NOT NULL,
  `type_icon` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `types`
--

INSERT INTO `types` (`type_id`, `type_description`, `type_icon`, `createdAt`, `updatedAt`) VALUES
(4, 'Fire', 'https://static.tcgcollector.com/content/images/0c/cc/c3/0cccc382980123af68cb6dc088e49416c2b56e754e068fd637d8471f8aca985d.png', '2024-04-14 02:16:03', '2024-04-14 02:16:03'),
(5, 'Water', 'https://static.tcgcollector.com/content/images/27/1d/fa/271dfa3910202f4e47658d15ee4b0c1ae5c061e38543bb7b86729ee9230fb950.png', '2024-04-14 02:16:03', '2024-04-14 02:16:03'),
(6, 'Electric', 'https://static.tcgcollector.com/content/images/f6/97/e9/f697e9fac5d1e2bc1091ecf9eb575cf737cd3f2a49a1576890bf4dc242de7080.png', '2024-04-14 02:16:03', '2024-04-14 02:16:03'),
(7, 'Grass', 'https://static.tcgcollector.com/content/images/90/d7/49/90d74923dfb481342fb5cb6c78e5fc6f6a8992cbd72a127d78af726c412a1bdc.png', '2024-04-14 02:16:03', '2024-04-14 02:16:03'),
(9, 'Fighting', 'https://static.tcgcollector.com/content/images/bc/68/e7/bc68e7e5c8ebc975410dfc7a83d7e31e99040302cb3ac97258e5a09aa7147777.png', '2024-04-14 02:16:03', '2024-04-14 02:16:03'),
(13, 'Psychic', 'https://static.tcgcollector.com/content/images/15/d0/90/15d090c57838f2757ae7fdf49beb0c33500c27baa9abe3c0ce00641e1e498d34.png', '2024-04-14 02:16:03', '2024-04-14 02:16:03'),
(17, 'Dragon', 'https://static.tcgcollector.com/content/images/a9/1a/73/a91a73646588fc8ecce23d77ccd108a4eec9b5d53869cc997cb238a13d28db00.png', '2024-04-14 02:16:03', '2024-04-14 02:16:03'),
(19, 'Metal', 'https://archives.bulbagarden.net/media/upload/thumb/6/64/Metal-attack.png/30px-Metal-attack.png', '2024-04-14 02:16:03', '2024-04-14 02:16:03'),
(20, 'Fairy', 'https://static.tcgcollector.com/content/images/80/d9/f3/80d9f3d393fe105c80dd568e3187f52003d5d879dcb00589273f379b92a55dc2.png', '2024-04-14 02:16:03', '2024-04-14 02:16:03'),
(22, 'Colorless', 'https://static.tcgcollector.com/content/images/7d/04/1a/7d041a7d8c83bdece5d913350dd07c2e7fc4322480fe59eb89a9d4d5148aa8ec.png', '2024-04-14 02:16:03', '2024-04-14 02:16:03'),
(25, 'Pokemon Power', '', '2024-04-15 01:23:30', '2024-04-15 01:23:30'),
(26, 'Darkness', 'https://static.tcgcollector.com/content/images/d5/fe/07/d5fe07a5edf923472578bde3fe24e40febee586551722d92db6463994ac7524f.png', '2024-04-21 23:53:20', '2024-04-21 23:53:20');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email_address` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email_address`, `password`, `admin`, `createdAt`, `updatedAt`) VALUES
(215, 'ShiniesOnly', 'shiniesonly@gmail.com', '$2b$10$rcJIrjyD.8i0XzM9w0PErOgGKX0hr55M306sfE3gQXI3ZNl1TU28O', 0, '2024-04-22 19:53:19', '2024-05-02 12:32:22'),
(216, 'TeamRocket', 'teamrocket@gmail.com', '$2b$10$8k0vH5xXwhZyJ6nc8229dOHhseuWYiu/rIloLfyC6R/RgDRlqe9J6', 0, '2024-04-22 20:15:12', '2024-04-28 22:59:48'),
(217, 'GymBoss', 'muscleman@gmail.com', '$2b$10$NvAw75phtc97elMKh2kRg.1Z2JMtBMu8QbBM67tlhoPOo5XK00uJi', 0, '2024-04-23 00:57:50', '2024-05-02 12:36:13'),
(218, 'ILoveDogs66', 'dogman@gmail.com', '$2b$10$FF2/TqQEkEJXLEC91buD9eviJSgL3eb5tZce26hLrrgI4lmQ/IC6u', 0, '2024-04-23 00:59:53', '2024-04-27 16:01:37'),
(219, 'PleaseGiftCards77', 'crapcollector41@gmail.com', '$2b$10$JNU1RvzA.Vxt3lTciQ2Mu.I6Z.SYizYQkDvVpajwQCNcPP0KwzIvG', 0, '2024-04-23 01:01:00', '2024-05-02 13:01:06'),
(220, 'KawaiiSoCute', 'fairylover@gmail.com', '$2b$10$/yyHqQbeEC3gtt9IicCka.5QD7awGxsT/0Z8xnDEgFe6zXjXKzPjm', 0, '2024-04-23 01:01:39', '2024-04-27 16:18:44'),
(221, 'AshKetchum', 'Ashyboy@gmail.com', '$2b$10$arMVxUdncxwY8tu6YEQcw.DiRn9Ndc9BcevZsg/qsgTUfopQJ6BDu', 0, '2024-04-23 01:16:16', '2024-05-01 22:30:40'),
(222, 'ZAP', 'electricdemon@gmail.com', '$2b$10$DUjLl0iHpMdazCbe/U7P1eNLYKqV4mrNpQMvEDZhJX37neeAk7iUa', 0, '2024-04-23 01:16:58', '2024-05-02 12:33:46'),
(223, 'OldSkoolRules', 'oldschooler@gmail.com', '$2b$10$bLkjw06hjyBNBTJdpbZYU.qyozv/AfX/0SKbWtjUVelsp90aOg1Qm', 0, '2024-04-23 01:17:18', '2024-05-02 12:35:03'),
(224, 'PokeAdmin', 'admin@gmail.com', '$2b$10$jC1w.DZCKtPNnNiuN1MKhO0/ggTPHJOs3i1k2gjtDZwudihqlHVx2', 1, '2024-04-23 18:53:00', '2024-05-02 19:59:41'),
(246, 'CALLUM', 'cag.urns@gmail.com', '$2b$10$9SrFWSZ9Ue5PeM0wjytBSehGNbeaLt/CmRJY8Dk5ZJR.St6Un/pqq', 0, '2024-09-01 14:46:07', '2024-09-01 14:46:07'),
(247, 'user', 'user@gmail.com', '$2b$10$E59ncsG8fzVe2bobdrW74ei3dIBzDTTNGW0H9.ASlG0ObKx3gFUma', 0, '2024-10-02 20:27:20', '2024-10-02 20:27:20');

-- --------------------------------------------------------

--
-- Table structure for table `wishlists`
--

CREATE TABLE `wishlists` (
  `wishlist_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `numCards` int(11) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `wishlists`
--

INSERT INTO `wishlists` (`wishlist_id`, `user_id`, `numCards`, `createdAt`, `updatedAt`) VALUES
(1, 221, 0, '2024-05-01 20:26:54', '2024-05-01 20:26:54'),
(2, 217, 0, '2024-05-01 20:26:54', '2024-05-01 20:26:54'),
(3, 218, 0, '2024-05-01 20:26:54', '2024-05-01 20:26:54'),
(4, 220, 0, '2024-05-01 20:26:54', '2024-05-01 20:26:54'),
(5, 223, 0, '2024-05-01 20:26:54', '2024-05-01 20:26:54'),
(6, 219, 0, '2024-05-01 20:26:54', '2024-05-01 20:26:54'),
(7, 224, 0, '2024-05-01 20:26:54', '2024-05-01 20:26:54'),
(8, 215, 0, '2024-05-01 20:26:54', '2024-05-01 20:26:54'),
(9, 216, 0, '2024-05-01 20:26:54', '2024-05-01 20:26:54'),
(10, 222, 0, '2024-05-01 20:26:54', '2024-05-01 20:26:54'),
(14, 246, 0, '2024-09-01 14:46:07', '2024-09-01 14:46:07'),
(15, 247, 0, '2024-10-02 20:27:20', '2024-10-02 20:27:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `abilities`
--
ALTER TABLE `abilities`
  ADD PRIMARY KEY (`ability_id`),
  ADD KEY `card_ability` (`card_id`),
  ADD KEY `primary_type_id` (`primary_type_id`),
  ADD KEY `secondary_type_id` (`secondary_type_id`);

--
-- Indexes for table `cardcollections`
--
ALTER TABLE `cardcollections`
  ADD PRIMARY KEY (`CollectionCollectionId`,`CardCardId`),
  ADD KEY `CardCardId` (`CardCardId`);

--
-- Indexes for table `cards`
--
ALTER TABLE `cards`
  ADD PRIMARY KEY (`card_id`),
  ADD KEY `type_id` (`type_id`),
  ADD KEY `set_id` (`set_id`),
  ADD KEY `card_category` (`CategoryCategoryId`),
  ADD KEY `card_illustrator` (`IllustratorIllustratorId`),
  ADD KEY `card_rarity` (`RarityRarityId`),
  ADD KEY `card_fineprint` (`FineprintFineprintID`),
  ADD KEY `weakness_type` (`weakness_type_id`),
  ADD KEY `resistance_type` (`resistance_type_id`),
  ADD KEY `retreat_type` (`retreat_type_id`),
  ADD KEY `card_evolved_from` (`evolves_from_id`);

--
-- Indexes for table `cardwishlists`
--
ALTER TABLE `cardwishlists`
  ADD PRIMARY KEY (`WishlistWishlistId`,`CardCardId`),
  ADD KEY `CardCardId` (`CardCardId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `collections`
--
ALTER TABLE `collections`
  ADD PRIMARY KEY (`collection_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `collection_id` (`collection_id`);

--
-- Indexes for table `fineprints`
--
ALTER TABLE `fineprints`
  ADD PRIMARY KEY (`fineprint_id`);

--
-- Indexes for table `illustrators`
--
ALTER TABLE `illustrators`
  ADD PRIMARY KEY (`illustrator_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`like_id`),
  ADD KEY `likes_user_id` (`user_id`),
  ADD KEY `likes_collection_id` (`collection_id`);

--
-- Indexes for table `rarities`
--
ALTER TABLE `rarities`
  ADD PRIMARY KEY (`rarity_id`);

--
-- Indexes for table `series`
--
ALTER TABLE `series`
  ADD PRIMARY KEY (`series_id`);

--
-- Indexes for table `sets`
--
ALTER TABLE `sets`
  ADD PRIMARY KEY (`set_id`),
  ADD KEY `series_id` (`series_id`);

--
-- Indexes for table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`type_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `user_user_type_id` (`admin`);

--
-- Indexes for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD PRIMARY KEY (`wishlist_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `abilities`
--
ALTER TABLE `abilities`
  MODIFY `ability_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT for table `cards`
--
ALTER TABLE `cards`
  MODIFY `card_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `collections`
--
ALTER TABLE `collections`
  MODIFY `collection_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

--
-- AUTO_INCREMENT for table `fineprints`
--
ALTER TABLE `fineprints`
  MODIFY `fineprint_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `illustrators`
--
ALTER TABLE `illustrators`
  MODIFY `illustrator_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT for table `rarities`
--
ALTER TABLE `rarities`
  MODIFY `rarity_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `series`
--
ALTER TABLE `series`
  MODIFY `series_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `sets`
--
ALTER TABLE `sets`
  MODIFY `set_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `types`
--
ALTER TABLE `types`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=248;

--
-- AUTO_INCREMENT for table `wishlists`
--
ALTER TABLE `wishlists`
  MODIFY `wishlist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `abilities`
--
ALTER TABLE `abilities`
  ADD CONSTRAINT `card_ability` FOREIGN KEY (`card_id`) REFERENCES `cards` (`card_id`),
  ADD CONSTRAINT `primary_type_id` FOREIGN KEY (`primary_type_id`) REFERENCES `types` (`type_id`),
  ADD CONSTRAINT `secondary_type_id` FOREIGN KEY (`secondary_type_id`) REFERENCES `types` (`type_id`);

--
-- Constraints for table `cardcollections`
--
ALTER TABLE `cardcollections`
  ADD CONSTRAINT `cardcollections_ibfk_1` FOREIGN KEY (`CollectionCollectionId`) REFERENCES `collections` (`collection_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cardcollections_ibfk_2` FOREIGN KEY (`CardCardId`) REFERENCES `cards` (`card_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cards`
--
ALTER TABLE `cards`
  ADD CONSTRAINT `card_category` FOREIGN KEY (`CategoryCategoryId`) REFERENCES `categories` (`category_id`),
  ADD CONSTRAINT `card_evolved_from` FOREIGN KEY (`evolves_from_id`) REFERENCES `cards` (`card_id`),
  ADD CONSTRAINT `card_fineprint` FOREIGN KEY (`FineprintFineprintID`) REFERENCES `fineprints` (`fineprint_id`),
  ADD CONSTRAINT `card_illustrator` FOREIGN KEY (`IllustratorIllustratorId`) REFERENCES `illustrators` (`illustrator_id`),
  ADD CONSTRAINT `card_rarity` FOREIGN KEY (`RarityRarityId`) REFERENCES `rarities` (`rarity_id`),
  ADD CONSTRAINT `cards_ibfk_79` FOREIGN KEY (`type_id`) REFERENCES `types` (`type_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `cards_ibfk_80` FOREIGN KEY (`set_id`) REFERENCES `sets` (`set_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `resistance_type` FOREIGN KEY (`resistance_type_id`) REFERENCES `types` (`type_id`),
  ADD CONSTRAINT `retreat_type` FOREIGN KEY (`retreat_type_id`) REFERENCES `types` (`type_id`),
  ADD CONSTRAINT `weakness_type` FOREIGN KEY (`weakness_type_id`) REFERENCES `types` (`type_id`);

--
-- Constraints for table `cardwishlists`
--
ALTER TABLE `cardwishlists`
  ADD CONSTRAINT `cardwishlists_ibfk_1` FOREIGN KEY (`WishlistWishlistId`) REFERENCES `wishlists` (`wishlist_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cardwishlists_ibfk_2` FOREIGN KEY (`CardCardId`) REFERENCES `cards` (`card_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `collections`
--
ALTER TABLE `collections`
  ADD CONSTRAINT `collections_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `collection_id` FOREIGN KEY (`collection_id`) REFERENCES `collections` (`collection_id`),
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_collection_id` FOREIGN KEY (`collection_id`) REFERENCES `collections` (`collection_id`),
  ADD CONSTRAINT `likes_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `sets`
--
ALTER TABLE `sets`
  ADD CONSTRAINT `sets_ibfk_1` FOREIGN KEY (`series_id`) REFERENCES `series` (`series_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD CONSTRAINT `wishlists_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
