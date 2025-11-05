-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: auth_service_db
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
-- Table structure for table `map_user_manager`
--

DROP TABLE IF EXISTS `map_user_manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_user_manager` (
  `user_id` int unsigned NOT NULL,
  `user_manager_id` bigint unsigned NOT NULL,
  KEY `FK_map_manager_user_id` (`user_id`),
  KEY `FK_map_manager_manager_id` (`user_manager_id`),
  CONSTRAINT `FK_map_manager_manager_id` FOREIGN KEY (`user_manager_id`) REFERENCES `user_manager` (`user_manager_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_map_manager_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_user_role`
--

DROP TABLE IF EXISTS `map_user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_user_role` (
  `user_id` int unsigned NOT NULL,
  `role_id` int unsigned NOT NULL,
  `publisher_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FK_map_user_role_role_id` (`role_id`),
  CONSTRAINT `FK_map_user_role_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_map_user_role_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_user_speciality`
--

DROP TABLE IF EXISTS `map_user_speciality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_user_speciality` (
  `user_speciality_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `speciality_id` int unsigned NOT NULL,
  `publisher_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`user_speciality_id`),
  UNIQUE KEY `user_speciality_id` (`user_speciality_id`),
  KEY `FK_map_user_speciality_user_id` (`user_id`),
  KEY `FK_map_user_speciality_speciality_id` (`speciality_id`),
  CONSTRAINT `FK_map_user_speciality_speciality_id` FOREIGN KEY (`speciality_id`) REFERENCES `speciality` (`speciality_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_map_user_speciality_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` int unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int unsigned NOT NULL DEFAULT '0',
  `role_name` varchar(100) NOT NULL,
  `role_code` varchar(100) NOT NULL,
  `sys_user` enum('Y','N') DEFAULT 'N',
  `is_editable` enum('Y','N') DEFAULT 'Y',
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`role_id`),
  KEY `idx_role_code` (`role_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(40) NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(39) NOT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `created` bigint unsigned NOT NULL DEFAULT '0',
  `last_used` bigint unsigned NOT NULL DEFAULT '0',
  `remember` tinyint NOT NULL DEFAULT '0',
  `data` text,
  UNIQUE KEY `sessions_pkey` (`session_id`),
  KEY `sessions_user_id` (`user_id`),
  KEY `idx_last_used` (`last_used`),
  KEY `idx_sessions_created` (`created`),
  KEY `idx_sessions_last_used` (`last_used`)
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
  KEY `idx_speciality_name` (`speciality_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(90) NOT NULL,
  `password` varchar(256) DEFAULT NULL,
  `title_name` varchar(15) DEFAULT NULL,
  `first_name` varchar(90) DEFAULT NULL,
  `last_name` varchar(90) DEFAULT NULL,
  `gender` varchar(1) DEFAULT NULL,
  `email` varchar(90) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `mailing_address` varchar(255) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `postal_code` varchar(15) DEFAULT NULL,
  `country_id` int unsigned DEFAULT NULL,
  `sc_code` varchar(45) DEFAULT NULL,
  `headquarter` varchar(45) DEFAULT NULL,
  `region` varchar(45) DEFAULT NULL,
  `date_last_email` datetime DEFAULT NULL,
  `date_registered` datetime DEFAULT NULL,
  `date_validated` datetime DEFAULT NULL,
  `date_last_login` datetime DEFAULT NULL,
  `password_hint` varchar(255) DEFAULT NULL,
  `account_enabled` tinyint(1) DEFAULT '1',
  `account_expired` tinyint(1) DEFAULT '0',
  `account_locked` tinyint(1) DEFAULT '0',
  `credentials_expired` tinyint(1) DEFAULT '0',
  `subscription_type` enum('Trial','Perpetual','Subscription') DEFAULT NULL,
  `social_user` varchar(1) DEFAULT 'N',
  `social_provider` varchar(45) DEFAULT NULL,
  `social_provider_userId` varchar(45) DEFAULT NULL,
  `migrated_id` varchar(30) DEFAULT NULL,
  `is_cipla` enum('Y','N') DEFAULT 'N',
  `active` enum('Y','N') DEFAULT 'Y',
  `approved` enum('Y','N') DEFAULT 'Y',
  `msl_code` varchar(50) DEFAULT NULL,
  `show_in_reports` enum('Y','N') DEFAULT 'Y',
  `first_login_status` enum('Y','N') DEFAULT 'N',
  `customer_type` enum('CIPLA','JAYPEE','SUNPHARMA','ENTPHARMA','ORGANSPHARMA','ORTHOPHARMA','IMEDICINE','OBGYNPHARMA') NOT NULL DEFAULT 'JAYPEE',
  `api_created` enum('Y','N') DEFAULT 'N',
  `created_by` int unsigned DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned DEFAULT NULL,
  `updated_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `users_username` (`username`),
  KEY `created_by` (`created_by`),
  KEY `idx_email` (`email`),
  KEY `idx_customer_type` (`customer_type`),
  KEY `Reports` (`is_cipla`,`show_in_reports`,`customer_type`),
  KEY `idx_user_date_registered` (`date_registered`),
  KEY `idx_user_date_last_login` (`date_last_login`),
  KEY `idx_user_active` (`active`,`approved`),
  KEY `idx_user_customer_type` (`customer_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_manager`
--

DROP TABLE IF EXISTS `user_manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_manager` (
  `user_manager_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `manager_role` enum('ABM','RBM','TM','ZBM') NOT NULL,
  `manager_code` varchar(50) DEFAULT NULL,
  `manager_name` varchar(300) DEFAULT NULL,
  `manager_email` varchar(300) DEFAULT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`user_manager_id`),
  UNIQUE KEY `user_manager_id` (`user_manager_id`),
  KEY `idx_manager_code` (`manager_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_privilege`
--

DROP TABLE IF EXISTS `user_privilege`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_privilege` (
  `privilege_id` int unsigned NOT NULL AUTO_INCREMENT,
  `role_id` int unsigned NOT NULL,
  `crud_id` int unsigned NOT NULL,
  `all` enum('0','1') DEFAULT '0',
  `add` enum('0','1') DEFAULT '0',
  `edit` enum('0','1') DEFAULT '0',
  `delete` enum('0','1') DEFAULT '0',
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`privilege_id`),
  KEY `FK_user_privilege_role_id` (`role_id`),
  KEY `FK_user_privilege_crud_id` (`crud_id`),
  CONSTRAINT `FK_user_privilege_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_settings`
--

DROP TABLE IF EXISTS `user_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_settings` (
  `user_id` int unsigned NOT NULL,
  `locale` varchar(5) NOT NULL DEFAULT 'en_US',
  `setting_name` varchar(255) NOT NULL,
  `assoc_type` bigint unsigned DEFAULT '0',
  `assoc_id` bigint unsigned DEFAULT '0',
  `setting_value` text,
  `setting_type` varchar(6) NOT NULL DEFAULT 'String',
  UNIQUE KEY `user_settings_pkey` (`user_id`,`locale`,`setting_name`,`assoc_type`,`assoc_id`),
  KEY `user_settings_user_id` (`user_id`),
  CONSTRAINT `FK_user_settings_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_type`
--

DROP TABLE IF EXISTS `user_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_type` (
  `type_id` int unsigned NOT NULL AUTO_INCREMENT,
  `type_code` varchar(50) NOT NULL DEFAULT '0',
  `type_name` varchar(50) NOT NULL DEFAULT '0',
  `display_status` enum('0','1','2') NOT NULL DEFAULT '0',
  PRIMARY KEY (`type_id`),
  KEY `idx_type_code` (`type_code`)
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
-- Temporary view structure for view `v_ref_country`
--

DROP TABLE IF EXISTS `v_ref_country`;
/*!50001 DROP VIEW IF EXISTS `v_ref_country`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_ref_country` AS SELECT 
 1 AS `country_id`,
 1 AS `country_code`,
 1 AS `country_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_ref_crud_list`
--

DROP TABLE IF EXISTS `v_ref_crud_list`;
/*!50001 DROP VIEW IF EXISTS `v_ref_crud_list`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_ref_crud_list` AS SELECT 
 1 AS `crud_id`,
 1 AS `crud_name`,
 1 AS `handler`*/;
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
-- Final view structure for view `v_ref_country`
--

/*!50001 DROP VIEW IF EXISTS `v_ref_country`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_ref_country` AS select `reference_service_db`.`ref_country`.`country_id` AS `country_id`,`reference_service_db`.`ref_country`.`country_code` AS `country_code`,`reference_service_db`.`ref_country`.`country_name` AS `country_name` from `reference_service_db`.`ref_country` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_ref_crud_list`
--

/*!50001 DROP VIEW IF EXISTS `v_ref_crud_list`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_ref_crud_list` AS select `reference_service_db`.`ref_crud_list`.`crud_id` AS `crud_id`,`reference_service_db`.`ref_crud_list`.`crud_name` AS `crud_name`,`reference_service_db`.`ref_crud_list`.`handler` AS `handler` from `reference_service_db`.`ref_crud_list` */;
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

-- Dump completed on 2025-11-04 22:27:03
