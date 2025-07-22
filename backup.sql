-- MySQL dump 10.13  Distrib 9.2.0, for Linux (x86_64)
--
-- Host: localhost    Database: OnlineTicketBooking
-- ------------------------------------------------------
-- Server version	9.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Booking`
--

DROP TABLE IF EXISTS `Booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Booking` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `eventId` int NOT NULL,
  `seats` varchar(255) NOT NULL,
  `totalPrice` decimal(10,2) NOT NULL,
  `status` varchar(50) NOT NULL,
  `deletedBy` int DEFAULT NULL,
  `isDeleted` tinyint NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `eventId` (`eventId`),
  KEY `deletedBy` (`deletedBy`),
  CONSTRAINT `Booking_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`),
  CONSTRAINT `Booking_ibfk_2` FOREIGN KEY (`eventId`) REFERENCES `Event` (`id`),
  CONSTRAINT `Booking_ibfk_3` FOREIGN KEY (`deletedBy`) REFERENCES `User` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Booking`
--

LOCK TABLES `Booking` WRITE;
/*!40000 ALTER TABLE `Booking` DISABLE KEYS */;
INSERT INTO `Booking` VALUES (8,5,21,'A4,B4,B5,A5,B6',1000000.00,'Confirmed',NULL,0,NULL,'2025-07-16 09:34:06','2025-07-16 10:45:57'),(9,5,20,'B3,B4,B6,B5,B7',750000.00,'Pending',NULL,0,NULL,'2025-07-16 09:52:01','2025-07-16 10:46:02'),(10,5,22,'B8,B7,A7,A6,B6',650000.00,'Confirmed',NULL,0,NULL,'2025-07-16 09:52:16','2025-07-16 10:47:00'),(11,5,19,'C6,B6,A6',0.00,'Confirmed',NULL,0,NULL,'2025-07-17 09:42:47','2025-07-17 09:42:57'),(12,5,18,'B6,B5,B4,C4,C5,C6',600000.00,'Confirmed',NULL,0,NULL,'2025-07-17 09:54:31','2025-07-22 06:49:43'),(13,5,18,'B4,B5,B6',300000.00,'Pending',NULL,0,NULL,'2025-07-17 10:05:21','2025-07-17 10:05:21'),(14,5,18,'A7,A6,A8',300000.00,'Pending',NULL,0,NULL,'2025-07-17 10:06:01','2025-07-17 10:06:01'),(15,5,18,'B7,B6,B8',300000.00,'Pending',NULL,0,NULL,'2025-07-17 10:08:39','2025-07-17 10:08:39'),(16,5,18,'B6,B5,B4',300000.00,'Pending',NULL,0,NULL,'2025-07-17 10:13:06','2025-07-17 10:13:06'),(17,5,18,'B5,B3,B4,B6',400000.00,'Pending',NULL,0,NULL,'2025-07-17 10:21:12','2025-07-17 10:21:12'),(18,5,21,'A5,A6,A7',600000.00,'Pending',NULL,0,NULL,'2025-07-17 10:42:06','2025-07-17 10:42:06'),(19,5,17,'B5,B7,B6',270000.00,'Pending',NULL,0,NULL,'2025-07-17 11:01:51','2025-07-17 11:01:51'),(20,5,18,'A1,A2,A3,A4',400000.00,'Pending',NULL,0,NULL,'2025-07-22 06:45:00','2025-07-22 06:45:00'),(21,5,18,'B4,B6,B5',300000.00,'Confirmed',NULL,0,NULL,'2025-07-22 06:59:32','2025-07-22 07:16:51');
/*!40000 ALTER TABLE `Booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Event`
--

DROP TABLE IF EXISTS `Event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Event` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `type` varchar(50) NOT NULL,
  `date` datetime NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `image` text,
  `seats` int DEFAULT '0',
  `deletedBy` int DEFAULT NULL,
  `isDeleted` tinyint NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `showTime` int NOT NULL,
  `startTime` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `deletedBy` (`deletedBy`),
  CONSTRAINT `Event_ibfk_1` FOREIGN KEY (`deletedBy`) REFERENCES `User` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Event`
--

LOCK TABLES `Event` WRITE;
/*!40000 ALTER TABLE `Event` DISABLE KEYS */;
INSERT INTO `Event` VALUES (17,'Út lan','movie','2025-07-10 00:00:00','Galaxy Go Vap, HCM',90000.00,'https://res.cloudinary.com/dgzknzxns/image/upload/v1752034228/images/batlmd6izzr2dgprvhw8.jpg',10,NULL,0,NULL,'2025-07-09 04:10:29','2025-07-11 10:02:02',120,'16:00:00'),(18,'Train to Busan','movie','2025-07-10 00:00:00','Cinema Bình Thạnh, HCM',100000.00,'https://res.cloudinary.com/dgzknzxns/image/upload/v1752034308/images/pcqziz8mhllgjyeevm7z.jpg',100,NULL,0,NULL,'2025-07-09 04:11:50','2025-07-11 10:02:02',10,'19:00:00'),(19,'Lễ ra mắt Út Lan','event','2025-07-10 00:00:00','Rạp lotte Nhà hát, HCM',0.00,'https://res.cloudinary.com/dgzknzxns/image/upload/v1752144131/images/vvw4hinsimmvm1rwvrpz.jpg',100,NULL,0,NULL,'2025-07-10 10:42:12','2025-07-11 09:43:33',60,'18:30:00'),(20,'Bố già ','movie','2025-07-22 00:00:00','Rạp phim Trung Ương, HCM ',150000.00,'https://res.cloudinary.com/dgzknzxns/image/upload/v1752147336/images/ngyxcnfvimrdx7qllfkt.jpg',100,NULL,0,NULL,'2025-07-10 11:35:37','2025-07-11 09:43:33',80,'19:00:00'),(21,'Buổi hòa nhạc Anh Trai Say Hi','event','2025-07-23 00:00:00','Kí túc xá đại học quốc gia khu B, HCM',200000.00,'https://res.cloudinary.com/dgzknzxns/image/upload/v1752147435/images/xk6u6behr4rcayylrvsc.jpg',200,NULL,0,NULL,'2025-07-10 11:37:16','2025-07-11 10:02:02',90,'18:00:00'),(22,'Sao Hạng A','event','2025-07-26 00:00:00','Sân vận động quốc gia Mỹ Đình, HCM ',130000.00,'https://res.cloudinary.com/dgzknzxns/image/upload/v1752147519/images/hadnxk42yjastj2codgo.jpg',50,NULL,0,NULL,'2025-07-10 11:38:40','2025-07-11 09:43:33',120,'19:00:00'),(23,'Buổi hòa nhạc Anh Trai Say Hi','event','2025-07-12 00:00:00','Galaxy Quận 1, HCM',70000.00,'https://res.cloudinary.com/dgzknzxns/image/upload/v1752225965/images/gwwfoszdrqg9j39z9y4z.jpg',100,NULL,0,NULL,'2025-07-11 09:26:04','2025-07-11 10:02:02',60,'18:30:00');
/*!40000 ALTER TABLE `Event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Review`
--

DROP TABLE IF EXISTS `Review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `eventId` int NOT NULL,
  `rating` int NOT NULL,
  `comment` text,
  `deletedBy` int DEFAULT NULL,
  `isDeleted` tinyint NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `eventId` (`eventId`),
  KEY `deletedBy` (`deletedBy`),
  CONSTRAINT `Review_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `User` (`id`),
  CONSTRAINT `Review_ibfk_2` FOREIGN KEY (`eventId`) REFERENCES `Event` (`id`),
  CONSTRAINT `Review_ibfk_3` FOREIGN KEY (`deletedBy`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Review`
--

LOCK TABLES `Review` WRITE;
/*!40000 ALTER TABLE `Review` DISABLE KEYS */;
/*!40000 ALTER TABLE `Review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `deletedBy` int DEFAULT NULL,
  `isDeleted` tinyint NOT NULL DEFAULT '0',
  `isActive` tinyint NOT NULL DEFAULT '1',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'tienthanh','0789497795','tienthanh@example.com','$2b$10$aQimcfc103ZaCuNP/Jaupef0mfyh/qJ94o28sYdhJbIiaY9lKx/3i','user',NULL,0,1,NULL,'2025-06-25 03:18:37','2025-07-09 02:23:13'),(2,'anhtuan','0789497795','anhtuan@example.com','$2b$10$p1Yp1haP7dTK5d6Kr7AGT.mXKnO8sP/ZOirpS/ketXXp9dsvytqBO','admin',NULL,0,1,NULL,'2025-06-25 03:19:19','2025-07-03 03:34:06'),(3,'Nguyen Van Abc','0912345678','nguyenvana@example.com','$2b$10$7yA3tJmXoAXyIjj1sTT.j.ESHSVYc2Nm984K9d7AQ/zp55MSOWrFC','admin',NULL,0,1,NULL,'2025-06-26 01:50:33','2025-07-03 03:34:06'),(4,'Nguyễn Anh Tuấn','0789497795','anhtuan@gmail.com','$2b$10$ktWRgi5b1m1s4Bh1lvr41.jFYnHCwjVYjpE9o359H.spheAnrTIAS','user',NULL,0,1,NULL,'2025-07-01 01:34:35','2025-07-03 03:32:29'),(5,'anhtuan','0789497795','abc@gmail.com','$2b$10$CiVvoCaXLmWmlUvNzkRvjuWIhS.LuWWnQIL6mKWGQw.UJJ5R.Q9zC','admin',NULL,0,1,NULL,'2025-07-01 01:56:08','2025-07-03 09:12:05'),(15,'Nguyễn Anh Tuấn','0789497795','anhtuan220903@gmail.com','$2b$10$FpKVFknEcLmfQLc9gQxyvehUkoSL9WdDRLqjfmSmZ208CzyXCOmfC','user',NULL,0,1,NULL,'2025-07-03 03:32:36','2025-07-03 03:32:36');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-22  8:33:10
