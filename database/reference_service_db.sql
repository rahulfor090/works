-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: reference_service_db
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
-- Table structure for table `citation`
--

DROP TABLE IF EXISTS `citation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `citation` (
  `citation_id` int unsigned NOT NULL AUTO_INCREMENT,
  `citation_type` varchar(250) DEFAULT NULL,
  `base_url` varchar(500) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`citation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `content_type`
--

DROP TABLE IF EXISTS `content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `content_type` (
  `content_type_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `code` varchar(50) NOT NULL,
  PRIMARY KEY (`content_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `publisher`
--

DROP TABLE IF EXISTS `publisher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publisher` (
  `publisher_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `publisher_name` varchar(255) NOT NULL,
  `publisher_code` varchar(255) NOT NULL,
  `publisher_description` varchar(1000) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `publisherheader_logo` varchar(100) DEFAULT NULL,
  `publisherfooter_logo` varchar(100) DEFAULT NULL,
  `country_id` int unsigned DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contact_no` varchar(45) DEFAULT NULL,
  `fax` varchar(100) DEFAULT NULL,
  `pin_code` varchar(20) DEFAULT NULL,
  `skype_id` varchar(50) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`publisher_id`),
  UNIQUE KEY `publisher_id` (`publisher_id`),
  KEY `FK_publisher` (`country_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ref_access_type`
--

DROP TABLE IF EXISTS `ref_access_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_access_type` (
  `access_type_id` int unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `access_type` varchar(255) NOT NULL,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`access_type_id`),
  KEY `FK_access_type_publisher_id` (`publisher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ref_country`
--

DROP TABLE IF EXISTS `ref_country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_country` (
  `country_id` int unsigned NOT NULL AUTO_INCREMENT,
  `country_code` char(2) NOT NULL,
  `country_name` varchar(255) NOT NULL,
  PRIMARY KEY (`country_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ref_crud_list`
--

DROP TABLE IF EXISTS `ref_crud_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_crud_list` (
  `crud_id` int unsigned NOT NULL AUTO_INCREMENT,
  `crud_name` varchar(255) NOT NULL,
  `handler` varchar(255) NOT NULL,
  PRIMARY KEY (`crud_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ref_currency`
--

DROP TABLE IF EXISTS `ref_currency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_currency` (
  `currency_id` int unsigned NOT NULL AUTO_INCREMENT,
  `currency_code` varchar(255) NOT NULL,
  `currency_name` varchar(255) NOT NULL,
  `currency_symbol` varchar(255) NOT NULL,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`currency_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ref_license_type`
--

DROP TABLE IF EXISTS `ref_license_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_license_type` (
  `license_type_id` int unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `license_type` varchar(255) NOT NULL,
  `license_type_url` varchar(255) DEFAULT NULL,
  `license_logo` varchar(255) DEFAULT NULL,
  `description` text,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`license_type_id`),
  KEY `FK_license_type_publisher_id` (`publisher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ref_locale`
--

DROP TABLE IF EXISTS `ref_locale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_locale` (
  `locale_id` tinyint NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `locale_language` varchar(8) NOT NULL,
  `locale_country` varchar(50) DEFAULT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`locale_id`),
  KEY `FK_ref_locale_publisher_id` (`publisher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ref_region`
--

DROP TABLE IF EXISTS `ref_region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_region` (
  `region_id` tinyint NOT NULL AUTO_INCREMENT,
  `region_code` char(10) NOT NULL,
  `region_name` char(30) NOT NULL,
  `display_status` enum('0','1','2') NOT NULL DEFAULT '1',
  PRIMARY KEY (`region_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ref_region_country_map`
--

DROP TABLE IF EXISTS `ref_region_country_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_region_country_map` (
  `region_id` tinyint NOT NULL,
  `country_id` int unsigned NOT NULL,
  PRIMARY KEY (`region_id`,`country_id`),
  KEY `FK_ref_country_region_map_country_id` (`country_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `registration_coupon`
--

DROP TABLE IF EXISTS `registration_coupon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registration_coupon` (
  `registration_coupon_id` int unsigned NOT NULL AUTO_INCREMENT,
  `customer_type` enum('CIPLA','JAYPEE','SUNPHARMA','ENTPHARMA','ORGANSPHARMA','ORTHOPHARMA','IMEDICINE','OBGYNPHARMA') NOT NULL DEFAULT 'JAYPEE',
  `coupon_code` varchar(250) NOT NULL,
  `emp_name` varchar(100) DEFAULT NULL,
  `hq` varchar(100) DEFAULT NULL,
  `coupon_description` text,
  `display_status` enum('0','1','2') NOT NULL DEFAULT '1' COMMENT '0-Inactive,1-Active,2-Delete',
  `used` enum('Y','N') NOT NULL DEFAULT 'N',
  `created_by` int unsigned NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL DEFAULT '0',
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`registration_coupon_id`),
  UNIQUE KEY `coupon_code` (`coupon_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `society`
--

DROP TABLE IF EXISTS `society`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `society` (
  `society_id` int unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `society_title` varchar(255) NOT NULL,
  `society_logo` varchar(100) DEFAULT NULL,
  `society_description` text,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`society_id`),
  KEY `FK_society_publisher_id` (`publisher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `speciality`
--

DROP TABLE IF EXISTS `speciality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `speciality` (
  `speciality_id` int unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `speciality_name` varchar(250) NOT NULL,
  `speciality_logo` varchar(255) DEFAULT NULL,
  `customer_type` enum('CIPLA','JAYPEE','SUNPHARMA','ENTPHARMA','ORGANSPHARMA','ORTHOPHARMA','IMEDICINE','OBGYNPHARMA','TESTJAYPEE') NOT NULL DEFAULT 'JAYPEE',
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`speciality_id`),
  UNIQUE KEY `speciality_id` (`speciality_id`),
  KEY `FK_tbl_speciality_publisher_id` (`publisher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `speciality_content`
--

DROP TABLE IF EXISTS `speciality_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `speciality_content` (
  `publisher_id` bigint unsigned NOT NULL,
  `speciality_id` int unsigned NOT NULL,
  `content_type` enum('Book','Video','Journal','Case','Video Atlas') NOT NULL,
  `generic_id` bigint NOT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  KEY `FK_tbl_speciality_content_publisher_id` (`publisher_id`),
  KEY `FK_tbl_speciality_content_speciality_id` (`speciality_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `specialty_pwd`
--

DROP TABLE IF EXISTS `specialty_pwd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specialty_pwd` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `customer_type` enum('ORTHOPHARMA','IMEDICINE') DEFAULT NULL,
  `year` smallint DEFAULT NULL,
  `month` varchar(20) DEFAULT NULL,
  `password` varchar(250) NOT NULL,
  `created_by` int unsigned NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL DEFAULT '0',
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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

-- Dump completed on 2025-11-04 22:26:43
