-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: archive_service_db
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
-- Table structure for table `api_ips`
--

DROP TABLE IF EXISTS `api_ips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_ips` (
  `ip_id` int unsigned NOT NULL AUTO_INCREMENT,
  `start_ip` varchar(100) DEFAULT NULL,
  `end_ip` varchar(100) DEFAULT NULL,
  `start_ip_long` bigint unsigned DEFAULT NULL,
  `end_ip_long` bigint unsigned DEFAULT NULL,
  `token_id` int unsigned DEFAULT NULL,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`ip_id`),
  KEY `FK_api_ips_token_id` (`token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `api_token_errors`
--

DROP TABLE IF EXISTS `api_token_errors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_token_errors` (
  `error_id` int unsigned NOT NULL AUTO_INCREMENT,
  `error_method` varchar(100) NOT NULL,
  `error_token` varchar(100) NOT NULL,
  `error_message` text NOT NULL,
  `ip` varchar(250) NOT NULL,
  `error_date_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`error_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `api_tokens`
--

DROP TABLE IF EXISTS `api_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_tokens` (
  `token_id` int unsigned NOT NULL AUTO_INCREMENT,
  `token_value` varchar(50) NOT NULL,
  `ip_auth` varchar(50) NOT NULL,
  `token_user` varchar(50) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `archive_error_details`
--

DROP TABLE IF EXISTS `archive_error_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `archive_error_details` (
  `error_detail_id` bigint NOT NULL AUTO_INCREMENT,
  `archive_id` bigint unsigned DEFAULT NULL,
  `article_doi` varchar(100) DEFAULT NULL,
  `status` enum('NOT_STARTED','IN_PROGRESS','SUCCESS','FAILED') DEFAULT 'NOT_STARTED',
  `description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`error_detail_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `archive_service`
--

DROP TABLE IF EXISTS `archive_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `archive_service` (
  `archive_service_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `depository_id` int unsigned NOT NULL,
  `content_type` enum('ISSUE','ARTICLE','JOURNAL') NOT NULL,
  `generic_id` int NOT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `process_start_time` datetime DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` enum('NOT_STARTED','IN_PROGRESS','COMPLETED') NOT NULL DEFAULT 'NOT_STARTED',
  `remarks` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`archive_service_id`),
  UNIQUE KEY `archive_service_id` (`archive_service_id`),
  KEY `FK_ARCHIVE_SERVICE_DEPOSITORY` (`depository_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `depository`
--

DROP TABLE IF EXISTS `depository`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `depository` (
  `depository_id` int unsigned NOT NULL AUTO_INCREMENT,
  `depository_name` varchar(50) DEFAULT NULL,
  `depository_code` varchar(50) DEFAULT NULL,
  `depository_detail` varchar(500) DEFAULT NULL,
  `depository_type` enum('CROSSREF','FTP','PUBMED') NOT NULL,
  `protocol` enum('ACTIVE_FTP','PASSIVE_FTP','SFTP') NOT NULL DEFAULT 'ACTIVE_FTP',
  `host` varchar(150) NOT NULL,
  `port` smallint DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `directory` varchar(250) DEFAULT NULL,
  `content_version` enum('ALL','AOP','PRINT') DEFAULT 'ALL',
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `display_status` enum('0','1','2') DEFAULT '1' COMMENT '0-Inactive,1-Active,2-Delete',
  PRIMARY KEY (`depository_id`),
  UNIQUE KEY `depository_id` (`depository_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_depository_content_type`
--

DROP TABLE IF EXISTS `map_depository_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_depository_content_type` (
  `depository_content_type_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `depository_id` int unsigned NOT NULL,
  `content_type` enum('Book','Journal') NOT NULL,
  `generic_id` bigint unsigned NOT NULL,
  `full_txt_xml` enum('Y','N') DEFAULT 'N',
  `abs_xml` enum('Y','N') DEFAULT 'N',
  `supp` enum('Y','N') DEFAULT 'N',
  `pdf` enum('Y','N') DEFAULT 'N',
  `graphic` enum('Y','N') DEFAULT 'N',
  `crossref_xml` enum('Y','N') DEFAULT 'N',
  `pubmed_xml` enum('Y','N') DEFAULT 'N',
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int DEFAULT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1' COMMENT '0-Inactive,1-Active,2-Delete',
  PRIMARY KEY (`depository_content_type_id`),
  UNIQUE KEY `depository_content_type_id` (`depository_content_type_id`),
  KEY `FK_DEPOSITORY_CONTENT_TYPE_ID` (`depository_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `redirect_rule`
--

DROP TABLE IF EXISTS `redirect_rule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `redirect_rule` (
  `redirect_rule_id` int unsigned NOT NULL AUTO_INCREMENT,
  `match_type` enum('wildcard','regex') NOT NULL DEFAULT 'wildcard',
  `redirect_type` varchar(50) NOT NULL DEFAULT 'forward',
  `rule_from` varchar(500) NOT NULL,
  `rule_to` varchar(500) NOT NULL,
  `rule_last` enum('true','false') NOT NULL DEFAULT 'false',
  `encode_url` enum('Y','N') NOT NULL DEFAULT 'N',
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') NOT NULL DEFAULT '1',
  PRIMARY KEY (`redirect_rule_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `referrer_map`
--

DROP TABLE IF EXISTS `referrer_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `referrer_map` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `ref_key` varchar(500) DEFAULT NULL,
  `ref_value` varchar(255) NOT NULL,
  `baseUrl` varchar(255) DEFAULT NULL,
  `journalCode` varchar(255) DEFAULT NULL,
  `access_site` varchar(255) DEFAULT NULL,
  `display_status` enum('0','1','2') NOT NULL DEFAULT '1',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
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
