-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: institution_service_db
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
-- Table structure for table `abuse_monitoring`
--

DROP TABLE IF EXISTS `abuse_monitoring`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `abuse_monitoring` (
  `rule_id` tinyint NOT NULL,
  `session_id` varchar(40) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `institution_code` varchar(255) DEFAULT NULL,
  `ip_address` varchar(39) DEFAULT NULL,
  `block_status` enum('B','U') NOT NULL DEFAULT 'B',
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `sessions_user_id` (`user_id`),
  KEY `FK_abuse_monitoring_rule_id` (`rule_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `consortia`
--

DROP TABLE IF EXISTS `consortia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consortia` (
  `consortia_id` int unsigned NOT NULL AUTO_INCREMENT,
  `consortia_name` varchar(255) NOT NULL,
  PRIMARY KEY (`consortia_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ip_address_block`
--

DROP TABLE IF EXISTS `ip_address_block`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ip_address_block` (
  `ip_address_block_id` int unsigned NOT NULL AUTO_INCREMENT,
  `ip_from` varchar(100) NOT NULL,
  `ip_to` varchar(100) NOT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') NOT NULL DEFAULT '1',
  PRIMARY KEY (`ip_address_block_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_institute_consortia`
--

DROP TABLE IF EXISTS `map_institute_consortia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_institute_consortia` (
  `site_id` int unsigned NOT NULL,
  `consortia_id` int unsigned NOT NULL,
  PRIMARY KEY (`site_id`,`consortia_id`),
  KEY `FK_tbl_institute_consortia_map_consortia_id` (`consortia_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_institute_http_referer`
--

DROP TABLE IF EXISTS `map_institute_http_referer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_institute_http_referer` (
  `http_referer_id` int unsigned NOT NULL AUTO_INCREMENT,
  `site_id` int unsigned NOT NULL,
  `host` varchar(100) NOT NULL,
  `path` varchar(255) DEFAULT NULL,
  `query` varchar(255) DEFAULT NULL,
  `valid_from` date NOT NULL DEFAULT '1000-01-01',
  `valid_to` date DEFAULT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`http_referer_id`),
  KEY `FK_tbl_institute_http_referer_institute_id` (`site_id`),
  CONSTRAINT `FK_tbl_institute_http_referer_institute_id` FOREIGN KEY (`site_id`) REFERENCES `site_account` (`site_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_institute_token`
--

DROP TABLE IF EXISTS `map_institute_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_institute_token` (
  `institute_token_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `site_id` int unsigned NOT NULL,
  `token` varchar(200) NOT NULL,
  `start_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned DEFAULT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`institute_token_id`),
  UNIQUE KEY `institute_token_id` (`institute_token_id`),
  KEY `FK_tbl_institute_token_institute_id` (`site_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_site_account_user`
--

DROP TABLE IF EXISTS `map_site_account_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_site_account_user` (
  `site_id` int unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  PRIMARY KEY (`site_id`,`user_id`),
  KEY `FK_tbl_institute_user_map_site_id` (`site_id`),
  KEY `FK_tbl_institute_user_map_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_site_ip_address`
--

DROP TABLE IF EXISTS `map_site_ip_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_site_ip_address` (
  `ip_id` int unsigned NOT NULL AUTO_INCREMENT,
  `site_id` int unsigned NOT NULL,
  `valid_from_inet` varbinary(16) NOT NULL,
  `valid_to_inet` varbinary(16) NOT NULL,
  `valid_from` varchar(50) NOT NULL,
  `valid_to` varchar(50) NOT NULL,
  `status_id` smallint NOT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`ip_id`),
  KEY `FK_tbl_institute_ip_institute_id` (`site_id`),
  KEY `FK_tbl_institute_ip_status_id` (`status_id`),
  KEY `idx_site_ip_address` (`site_id`,`valid_from_inet`,`valid_to_inet`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `monitoring_rules`
--

DROP TABLE IF EXISTS `monitoring_rules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `monitoring_rules` (
  `rule_id` tinyint NOT NULL AUTO_INCREMENT,
  `rule_type_id` tinyint NOT NULL,
  `number_of_hits_allowed` tinyint NOT NULL,
  `block_time` int DEFAULT NULL,
  `time_unit` enum('H','M','S') NOT NULL DEFAULT 'M',
  `description` varchar(255) DEFAULT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `rule_status` enum('0','1') NOT NULL DEFAULT '1',
  PRIMARY KEY (`rule_id`),
  UNIQUE KEY `rule_id` (`rule_id`),
  KEY `FK_monitoring_rule_type_id` (`rule_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ref_ip_status`
--

DROP TABLE IF EXISTS `ref_ip_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_ip_status` (
  `status_id` smallint NOT NULL AUTO_INCREMENT,
  `status_value` varchar(100) NOT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ref_organization_type`
--

DROP TABLE IF EXISTS `ref_organization_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_organization_type` (
  `org_type_id` smallint NOT NULL AUTO_INCREMENT,
  `org_type_desc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`org_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ref_rule_type`
--

DROP TABLE IF EXISTS `ref_rule_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_rule_type` (
  `rule_type_id` tinyint NOT NULL AUTO_INCREMENT,
  `rule_type_code` varchar(250) NOT NULL,
  `rule_type` varchar(250) NOT NULL,
  `rule` varchar(255) DEFAULT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') NOT NULL DEFAULT '1',
  PRIMARY KEY (`rule_type_id`),
  UNIQUE KEY `rule_type_id` (`rule_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `session_info`
--

DROP TABLE IF EXISTS `session_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session_info` (
  `session_id` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `institution_code` varchar(250) DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `device_type` varchar(255) DEFAULT NULL,
  `hit_count` int DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `site_account`
--

DROP TABLE IF EXISTS `site_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `site_account` (
  `site_id` int unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `institute_name` varchar(255) NOT NULL,
  `institute_code` varchar(100) NOT NULL,
  `customer_reference` varchar(100) DEFAULT NULL,
  `belongs_consortia` enum('Y','N') DEFAULT 'N',
  `is_consortia` enum('Y','N') DEFAULT 'N',
  `is_speciality` enum('Y','N') NOT NULL DEFAULT 'N',
  `self_registration` enum('Y','N') DEFAULT 'N',
  `openurl` varchar(255) DEFAULT NULL,
  `openurl_logo` varchar(100) DEFAULT NULL,
  `sys_record` enum('Y','N') DEFAULT 'N',
  `auth_method` varchar(255) DEFAULT NULL,
  `athens_org_id` varchar(50) DEFAULT NULL,
  `athens_org_entity_id` varchar(255) DEFAULT NULL,
  `shibboleth_entity_id` varchar(255) DEFAULT NULL,
  `site_admin_email` varchar(100) DEFAULT NULL,
  `org_type_id` smallint DEFAULT NULL,
  `street_number` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `distict` varchar(100) DEFAULT NULL,
  `pin_code` varchar(100) DEFAULT NULL,
  `country_id` int unsigned DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `biiAdd_isContactAddr` enum('Y','N') DEFAULT 'N',
  `billing_street_no` varchar(100) DEFAULT NULL,
  `billing_city` varchar(100) DEFAULT NULL,
  `billing_distict` varchar(100) DEFAULT NULL,
  `billing_pin_code` varchar(100) DEFAULT NULL,
  `billing_country_id` int unsigned DEFAULT NULL,
  `billing_phone` varchar(100) DEFAULT NULL,
  `billing_email` varchar(100) DEFAULT NULL,
  `site_logo` varchar(100) DEFAULT NULL,
  `display_name` varchar(100) DEFAULT NULL,
  `comments` varchar(100) DEFAULT NULL,
  `subscription_type` enum('Trial','Perpetual','Subscription') DEFAULT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`site_id`),
  KEY `FK_tbl_institute_publisher_id` (`publisher_id`),
  KEY `FK_tbl_institute_org_type_id` (`org_type_id`),
  KEY `FK_tbl_institute_country_id` (`country_id`),
  KEY `idx_site_account_code` (`institute_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `v_publisher`
--

DROP TABLE IF EXISTS `v_publisher`;
/*!50001 DROP VIEW IF EXISTS `v_publisher`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_publisher` AS SELECT 
 1 AS `publisher_id`,
 1 AS `publisher_name`,
 1 AS `publisher_code`,
 1 AS `publisher_description`,
 1 AS `email`,
 1 AS `publisherheader_logo`,
 1 AS `publisherfooter_logo`,
 1 AS `country_id`,
 1 AS `city`,
 1 AS `address`,
 1 AS `contact_no`,
 1 AS `fax`,
 1 AS `pin_code`,
 1 AS `skype_id`,
 1 AS `facebook`,
 1 AS `instagram`,
 1 AS `twitter`,
 1 AS `linkedin`,
 1 AS `state`,
 1 AS `created_by`,
 1 AS `created_date`,
 1 AS `updated_by`,
 1 AS `updated_date`,
 1 AS `display_status`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_user`
--

DROP TABLE IF EXISTS `v_user`;
/*!50001 DROP VIEW IF EXISTS `v_user`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_user` AS SELECT 
 1 AS `user_id`,
 1 AS `username`,
 1 AS `email`,
 1 AS `first_name`,
 1 AS `last_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `v_publisher`
--

/*!50001 DROP VIEW IF EXISTS `v_publisher`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_publisher` AS select `reference_service_db`.`publisher`.`publisher_id` AS `publisher_id`,`reference_service_db`.`publisher`.`publisher_name` AS `publisher_name`,`reference_service_db`.`publisher`.`publisher_code` AS `publisher_code`,`reference_service_db`.`publisher`.`publisher_description` AS `publisher_description`,`reference_service_db`.`publisher`.`email` AS `email`,`reference_service_db`.`publisher`.`publisherheader_logo` AS `publisherheader_logo`,`reference_service_db`.`publisher`.`publisherfooter_logo` AS `publisherfooter_logo`,`reference_service_db`.`publisher`.`country_id` AS `country_id`,`reference_service_db`.`publisher`.`city` AS `city`,`reference_service_db`.`publisher`.`address` AS `address`,`reference_service_db`.`publisher`.`contact_no` AS `contact_no`,`reference_service_db`.`publisher`.`fax` AS `fax`,`reference_service_db`.`publisher`.`pin_code` AS `pin_code`,`reference_service_db`.`publisher`.`skype_id` AS `skype_id`,`reference_service_db`.`publisher`.`facebook` AS `facebook`,`reference_service_db`.`publisher`.`instagram` AS `instagram`,`reference_service_db`.`publisher`.`twitter` AS `twitter`,`reference_service_db`.`publisher`.`linkedin` AS `linkedin`,`reference_service_db`.`publisher`.`state` AS `state`,`reference_service_db`.`publisher`.`created_by` AS `created_by`,`reference_service_db`.`publisher`.`created_date` AS `created_date`,`reference_service_db`.`publisher`.`updated_by` AS `updated_by`,`reference_service_db`.`publisher`.`updated_date` AS `updated_date`,`reference_service_db`.`publisher`.`display_status` AS `display_status` from `reference_service_db`.`publisher` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_user`
--

/*!50001 DROP VIEW IF EXISTS `v_user`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_user` AS select `auth_service_db`.`user`.`user_id` AS `user_id`,`auth_service_db`.`user`.`username` AS `username`,`auth_service_db`.`user`.`email` AS `email`,`auth_service_db`.`user`.`first_name` AS `first_name`,`auth_service_db`.`user`.`last_name` AS `last_name` from `auth_service_db`.`user` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-04 22:27:04
