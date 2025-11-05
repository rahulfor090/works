-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: analytics_service_db
-- ------------------------------------------------------
-- Server version	8.0.43-0ubuntu0.22.04.1

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
-- Table structure for table `article_download_stats`
--

DROP TABLE IF EXISTS `article_download_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_download_stats` (
  `article_download_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `article_id` bigint unsigned NOT NULL,
  `total_download` int NOT NULL,
  PRIMARY KEY (`article_download_id`),
  UNIQUE KEY `article_download_id` (`article_download_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cipla_librarian_users`
--

DROP TABLE IF EXISTS `cipla_librarian_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cipla_librarian_users` (
  `ID` double DEFAULT NULL,
  `LIBUSERNAME` varchar(100) DEFAULT NULL,
  `PASSWORD` varchar(100) DEFAULT NULL,
  `USERNAME` varchar(100) DEFAULT NULL,
  `CONSORTIUMNAME` varchar(100) DEFAULT NULL,
  `USERTYPE` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cipla_track_download`
--

DROP TABLE IF EXISTS `cipla_track_download`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cipla_track_download` (
  `ID` double DEFAULT NULL,
  `USERNAME` varchar(100) DEFAULT NULL,
  `CONTENTID` double DEFAULT NULL,
  `SUBCONTENTID` double DEFAULT NULL,
  `DT` varchar(100) DEFAULT NULL,
  `SUBSID` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cipla_track_resources`
--

DROP TABLE IF EXISTS `cipla_track_resources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cipla_track_resources` (
  `ID` double DEFAULT NULL,
  `USERNAME` varchar(100) DEFAULT NULL,
  `CONTENTTYPE` double DEFAULT NULL,
  `DATEHIT` varchar(100) DEFAULT NULL,
  `IPADDRESS` varchar(100) DEFAULT NULL,
  `CONTENTID` double DEFAULT NULL,
  `ISSUES` double DEFAULT NULL,
  `REFERRALURL` varchar(100) DEFAULT NULL,
  `OTHERPARAM` varchar(100) DEFAULT NULL,
  `status` tinyint DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cipla_track_search_clicks`
--

DROP TABLE IF EXISTS `cipla_track_search_clicks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cipla_track_search_clicks` (
  `ID` double DEFAULT NULL,
  `USERNAME` varchar(100) DEFAULT NULL,
  `CONTENTTYPE` double DEFAULT NULL,
  `DATECLICK` varchar(100) DEFAULT NULL,
  `IPADDRESS` varchar(100) DEFAULT NULL,
  `CONTENTID` double DEFAULT NULL,
  `SEARCHID` double DEFAULT NULL,
  `REFERRALURL` varchar(500) DEFAULT NULL,
  `OTHERPARAM` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cipla_track_searches`
--

DROP TABLE IF EXISTS `cipla_track_searches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cipla_track_searches` (
  `ID` double DEFAULT NULL,
  `USERNAME` varchar(100) DEFAULT NULL,
  `KEYSEARCHED` varchar(100) DEFAULT NULL,
  `RESULTS` double DEFAULT NULL,
  `DT` varchar(100) DEFAULT NULL,
  `IPADDRESS` varchar(100) DEFAULT NULL,
  `REFERRALURL` varchar(100) DEFAULT NULL,
  `OTHERPARAM` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cipla_user_abm`
--

DROP TABLE IF EXISTS `cipla_user_abm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cipla_user_abm` (
  `ID` double DEFAULT NULL,
  `EMPID` varchar(100) DEFAULT NULL,
  `ABMNAME` varchar(100) DEFAULT NULL,
  `TMID` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cipla_user_concurrency`
--

DROP TABLE IF EXISTS `cipla_user_concurrency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cipla_user_concurrency` (
  `ID` double DEFAULT NULL,
  `USERID` double DEFAULT NULL,
  `USERNAME` varchar(100) DEFAULT NULL,
  `LASTLOGINDT` varchar(100) DEFAULT NULL,
  `LASTLOGOUTDT` varchar(100) DEFAULT NULL,
  `CONCURRENTACCESS` double DEFAULT NULL,
  `LOGINSTATUS` double DEFAULT NULL,
  `ROWDT` varchar(100) DEFAULT NULL,
  `OTHERINFO` varchar(100) DEFAULT NULL,
  `CLIENTCOOKIE` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cipla_user_rbm`
--

DROP TABLE IF EXISTS `cipla_user_rbm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cipla_user_rbm` (
  `ID` double DEFAULT NULL,
  `EMPID` varchar(100) DEFAULT NULL,
  `RBMNAME` varchar(100) DEFAULT NULL,
  `ABMID` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cipla_user_tm`
--

DROP TABLE IF EXISTS `cipla_user_tm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cipla_user_tm` (
  `ID` double DEFAULT NULL,
  `EMPID` varchar(100) DEFAULT NULL,
  `TMNAME` varchar(100) DEFAULT NULL,
  `DRID` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cipla_users`
--

DROP TABLE IF EXISTS `cipla_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cipla_users` (
  `ID` double DEFAULT NULL,
  `USERNAME` varchar(100) DEFAULT NULL,
  `TMID` double DEFAULT NULL,
  `TMNAME` varchar(100) DEFAULT NULL,
  `ABMID` double DEFAULT NULL,
  `ABMNAME` varchar(100) DEFAULT NULL,
  `RBMID` double DEFAULT NULL,
  `RBMNAME` varchar(100) DEFAULT NULL,
  `ZBMID` varchar(100) DEFAULT NULL,
  `ZBMNAME` varchar(100) DEFAULT NULL,
  `ROWDT` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `download_tracking_01_2019`
--

DROP TABLE IF EXISTS `download_tracking_01_2019`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `download_tracking_01_2019` (
  `download_tracking_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned DEFAULT NULL,
  `user_type` enum('Individual','Institution','Anonymous') NOT NULL DEFAULT 'Anonymous',
  `user_id` int unsigned NOT NULL,
  `session_id` varchar(100) DEFAULT NULL,
  `remote_ip` varchar(50) DEFAULT NULL,
  `remote_ip_inet` varbinary(16) DEFAULT NULL,
  `referer_url` varchar(500) DEFAULT NULL,
  `download_type` enum('Book','VideoAtlas','Chapter','Video','Journal','Issue','Article','Case','MCQ') NOT NULL,
  `download_id` varchar(100) DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`download_tracking_id`),
  UNIQUE KEY `download_tracking_id` (`download_tracking_id`),
  KEY `FK_download_tracking_01_2019_publisher_id` (`publisher_id`),
  KEY `FK_download_tracking_01_2019_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `most_view`
--

DROP TABLE IF EXISTS `most_view`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `most_view` (
  `most_view_id` int unsigned NOT NULL AUTO_INCREMENT,
  `content_type` enum('Book','Journal') DEFAULT NULL,
  `generic_id` bigint unsigned NOT NULL,
  `total_view` int DEFAULT NULL,
  PRIMARY KEY (`most_view_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `page_tracking_01_2010`
--

DROP TABLE IF EXISTS `page_tracking_01_2010`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `page_tracking_01_2010` (
  `page_tracking_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned DEFAULT NULL,
  `user_type` enum('Individual','Institution','Anonymous') NOT NULL DEFAULT 'Anonymous',
  `user_id` int unsigned NOT NULL,
  `session_id` varchar(100) DEFAULT NULL,
  `remote_ip` varchar(50) DEFAULT NULL,
  `remote_ip_inet` varbinary(16) DEFAULT NULL,
  `referer_url` varchar(500) DEFAULT NULL,
  `page_type` enum('Book','VideoAtlas','Chapter','Video','Journal','Issue','Article','Case','MCQ') NOT NULL,
  `page_id` bigint unsigned DEFAULT NULL,
  `access_allow` enum('0','1') NOT NULL DEFAULT '1',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`page_tracking_id`),
  UNIQUE KEY `page_tracking_id` (`page_tracking_id`),
  KEY `FK_page_tracking_01_2010_publisher_id` (`publisher_id`),
  KEY `FK_page_tracking_01_2010_user_id` (`user_id`),
  KEY `page_type` (`page_type`),
  KEY `page_id` (`page_id`),
  KEY `user_type` (`user_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `search_tracking_01_2010`
--

DROP TABLE IF EXISTS `search_tracking_01_2010`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `search_tracking_01_2010` (
  `search_tracking_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned DEFAULT NULL,
  `user_type` enum('Individual','Institution','Anonymous') NOT NULL DEFAULT 'Anonymous',
  `user_id` bigint unsigned DEFAULT '0',
  `session_id` varchar(100) NOT NULL,
  `search_keyword` varchar(500) DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`search_tracking_id`),
  UNIQUE KEY `search_tracking_id` (`search_tracking_id`),
  KEY `FK_search_tracking_01_2010_publisher_id` (`publisher_id`),
  KEY `user_type` (`user_type`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_tracking_01_2010`
--

DROP TABLE IF EXISTS `user_tracking_01_2010`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_tracking_01_2010` (
  `user_tracking_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned DEFAULT NULL,
  `user_type` enum('Individual','Institution','Anonymous') NOT NULL DEFAULT 'Anonymous',
  `user_id` bigint unsigned DEFAULT '0',
  `session_id` varchar(100) NOT NULL,
  `remote_ip` varchar(50) NOT NULL,
  `remote_ip_inet` varbinary(16) DEFAULT NULL,
  `user_agent` varchar(500) DEFAULT NULL,
  `login_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `logout_time` datetime DEFAULT NULL,
  `login_status` enum('0','1') NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_tracking_id`),
  UNIQUE KEY `user_tracking_id` (`user_tracking_id`),
  KEY `FK_user_tracking_01_2010_publisher_id` (`publisher_id`),
  KEY `user_type` (`user_type`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-04 22:27:05
