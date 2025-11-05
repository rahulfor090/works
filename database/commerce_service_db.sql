-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: commerce_service_db
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
-- Table structure for table `artifact_collection`
--

DROP TABLE IF EXISTS `artifact_collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artifact_collection` (
  `artifact_collection_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `collection_name` varchar(500) NOT NULL,
  `collection_code` varchar(45) DEFAULT NULL,
  `collection_type` enum('Mixed','Book','Journal') NOT NULL DEFAULT 'Mixed',
  `collection_description` text,
  `collection_logo` varchar(100) DEFAULT NULL,
  `collection_price` int DEFAULT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`artifact_collection_id`),
  UNIQUE KEY `artifact_collection_id` (`artifact_collection_id`),
  KEY `FK_artifact_collection_publisher_id` (`publisher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `content_bundle`
--

DROP TABLE IF EXISTS `content_bundle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `content_bundle` (
  `bundle_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `bundle_name` varchar(50) NOT NULL,
  `user_type_id` int unsigned NOT NULL,
  `content_type_id` tinyint NOT NULL,
  `start_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int unsigned NOT NULL,
  `updated_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `description` text,
  `display_status` enum('0','1','2') NOT NULL DEFAULT '1',
  PRIMARY KEY (`bundle_id`),
  UNIQUE KEY `bundle_id` (`bundle_id`),
  KEY `fk_content_bundle_user_type_id` (`user_type_id`),
  KEY `fk_content_bundle_category_type_id` (`content_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customer_billing_address`
--

DROP TABLE IF EXISTS `customer_billing_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_billing_address` (
  `billing_address_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `billing_address` varchar(500) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `postal_code` varchar(20) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`billing_address_id`),
  UNIQUE KEY `billing_address_id` (`billing_address_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customer_order`
--

DROP TABLE IF EXISTS `customer_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_order` (
  `order_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `billing_address_id` bigint unsigned DEFAULT NULL,
  `order_number` varchar(20) NOT NULL,
  `transaction_status` enum('INITIATED','SUCCESS','FAILED','DECLINED','REFUND') DEFAULT 'INITIATED',
  `currency_id` int unsigned NOT NULL,
  `amount_paid` int NOT NULL,
  `order_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `purchase_type` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `order_id` (`order_id`),
  KEY `FK_tbl_order_currency_id` (`currency_id`),
  KEY `FK_order_user_id` (`user_id`),
  KEY `idx_order_user_id` (`user_id`),
  KEY `idx_order_date` (`order_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `download_rules`
--

DROP TABLE IF EXISTS `download_rules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `download_rules` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_type` enum('INDIVIDUAL','INSTITUTIONAL') NOT NULL DEFAULT 'INDIVIDUAL',
  `content_type` enum('BOOK','VIDEO','ARTICLE') DEFAULT NULL,
  `generic_id` bigint NOT NULL,
  `download_limit` int unsigned DEFAULT '0',
  `download_interval` enum('DAILY','WEEKLY','MONTHLY','YEARLY') DEFAULT 'DAILY',
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_artifact_price`
--

DROP TABLE IF EXISTS `map_artifact_price`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_artifact_price` (
  `artifact_price_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `artifact_type` enum('Journal','Issue','Article','Book','Chapter','Collection') DEFAULT NULL,
  `price_level` enum('Publisher','Journal','Issue','Article','Book','Chapter','Collection') DEFAULT 'Publisher',
  `journal_id` bigint unsigned DEFAULT NULL,
  `volume_id` bigint unsigned DEFAULT NULL,
  `issue_id` bigint unsigned DEFAULT NULL,
  `level_artifact_id` bigint unsigned NOT NULL,
  `artifact_format_id` tinyint DEFAULT NULL COMMENT 'book_format_id',
  `price_category_id` tinyint NOT NULL,
  `price_type_id` tinyint NOT NULL,
  `access_period` tinyint DEFAULT NULL,
  `access_period_type` enum('Days','Month','Year') DEFAULT NULL,
  `effective_price_start_date` datetime DEFAULT NULL,
  `effective_price_end_date` datetime DEFAULT NULL,
  `display_status` enum('0','1','2') NOT NULL DEFAULT '1',
  PRIMARY KEY (`artifact_price_id`),
  UNIQUE KEY `artifact_price_id` (`artifact_price_id`),
  KEY `FK_map_artifact_price_publisher_id` (`publisher_id`),
  KEY `FK_map_artifact_price_price_cat_id` (`price_category_id`),
  KEY `FK_map_artifact_price_price_type_id` (`price_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_artifact_region_price`
--

DROP TABLE IF EXISTS `map_artifact_region_price`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_artifact_region_price` (
  `artifact_region_price_id` int unsigned NOT NULL AUTO_INCREMENT,
  `artifact_price_id` bigint unsigned NOT NULL,
  `region_id` tinyint NOT NULL,
  `currency_id` int unsigned NOT NULL,
  `price` float(10,2) NOT NULL,
  PRIMARY KEY (`artifact_region_price_id`),
  KEY `FK_map_artifact_region_price_price_id` (`artifact_price_id`),
  KEY `FK_map_artifact_region_price_currency_id` (`currency_id`),
  KEY `FK_map_artifact_region_price_region_id` (`region_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_collection_content`
--

DROP TABLE IF EXISTS `map_collection_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_collection_content` (
  `artifact_collection_id` bigint unsigned NOT NULL,
  `seq_no` tinyint NOT NULL DEFAULT '1',
  `artifact_type` varchar(20) NOT NULL,
  `artifact_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`artifact_collection_id`,`artifact_type`,`artifact_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_institute_subscription`
--

DROP TABLE IF EXISTS `map_institute_subscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_institute_subscription` (
  `institute_subscription_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `site_id` int unsigned NOT NULL,
  `subscription_id` bigint unsigned NOT NULL,
  `content_bundle_id` bigint unsigned NOT NULL,
  `license_start_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `license_end_date` datetime DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `expire_date` datetime DEFAULT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`institute_subscription_id`),
  UNIQUE KEY `institute_subscription_id` (`institute_subscription_id`),
  KEY `FK_tbl_institute_subscription_institute_id` (`site_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_institution_purchase`
--

DROP TABLE IF EXISTS `map_institution_purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_institution_purchase` (
  `institution_artifact_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `institute_id` int unsigned NOT NULL,
  `artifact_type` enum('Book','Chapter','Article') DEFAULT NULL,
  `artifact_id` bigint unsigned NOT NULL,
  `license_start_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `license_end_date` datetime DEFAULT NULL,
  `content_start_date` datetime DEFAULT NULL,
  `content_end_date` datetime DEFAULT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  `subscription_type_id` tinyint DEFAULT NULL,
  PRIMARY KEY (`institution_artifact_id`),
  KEY `FK_tbl_institution_artifact_institute_id` (`institute_id`),
  KEY `FK_SUBS_TYPE_INS_PURCHASE` (`subscription_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_institution_subscription_date`
--

DROP TABLE IF EXISTS `map_institution_subscription_date`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_institution_subscription_date` (
  `institute_id` int unsigned NOT NULL,
  `start_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` datetime DEFAULT NULL,
  KEY `FK_tbl_institution_subscription_date_institute_id` (`institute_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_offer_journal`
--

DROP TABLE IF EXISTS `map_offer_journal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_offer_journal` (
  `subscription_id` bigint unsigned NOT NULL,
  `journal_id` bigint unsigned NOT NULL,
  KEY `FK_offer_journal_subscription_id` (`subscription_id`),
  KEY `FK_offer_journal_journal_id` (`journal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_offer_subscription`
--

DROP TABLE IF EXISTS `map_offer_subscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_offer_subscription` (
  `offer_group_id` bigint unsigned NOT NULL,
  `subscription_id` bigint unsigned NOT NULL,
  KEY `FK_offer_group_offer_id` (`offer_group_id`),
  KEY `FK_offer_group_subscription_id` (`subscription_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_subscription_format`
--

DROP TABLE IF EXISTS `map_subscription_format`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_subscription_format` (
  `subscription_id` bigint unsigned NOT NULL,
  `format_id` tinyint NOT NULL,
  KEY `FK_SUBSCRIPTION_FORMAT_ID_SUBS` (`format_id`),
  KEY `FK_SUBSCRIPTION_SUBSCRIPTION_ID` (`subscription_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_user_subscription`
--

DROP TABLE IF EXISTS `map_user_subscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_user_subscription` (
  `user_subscription_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `subscription_category_id` tinyint NOT NULL,
  `subscription_id` bigint unsigned NOT NULL,
  `currency_id` int unsigned NOT NULL,
  `price` float(10,2) NOT NULL DEFAULT '0.00',
  `order_id` bigint unsigned NOT NULL,
  `purchase_type` varchar(100) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `expiry_date` datetime DEFAULT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`user_subscription_id`),
  KEY `FK_tbl_user_subscription_map_user_id` (`user_id`),
  KEY `FK_tbl_user_subscription_map_subscription_category_id` (`subscription_category_id`),
  KEY `FK_tbl_user_subscription_map_subscription_id` (`subscription_id`),
  KEY `FK_map_user_subscription_currency_id` (`currency_id`),
  KEY `idx_subscription_dates` (`start_date`,`end_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_user_subscription_date`
--

DROP TABLE IF EXISTS `map_user_subscription_date`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_user_subscription_date` (
  `user_id` int unsigned NOT NULL,
  `start_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` datetime DEFAULT NULL,
  KEY `FK_tbl_institution_subscription_date_institute_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `offer_group`
--

DROP TABLE IF EXISTS `offer_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `offer_group` (
  `offer_group_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `offer_group_name` varchar(250) NOT NULL,
  `offer_group_code` varchar(50) DEFAULT NULL,
  `category_id` tinyint NOT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`offer_group_id`),
  UNIQUE KEY `offer_group_id` (`offer_group_id`),
  KEY `FK_offer_group_publisher_id` (`publisher_id`),
  KEY `FK_offer_group_category_id` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `proforma_invoice`
--

DROP TABLE IF EXISTS `proforma_invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proforma_invoice` (
  `invoice_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `journal_id` bigint NOT NULL,
  `year` varchar(45) NOT NULL,
  `issue` varchar(100) NOT NULL,
  `quantity` tinyint NOT NULL,
  `proforma_invoice_id` bigint NOT NULL,
  PRIMARY KEY (`invoice_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `proforma_invoice_no`
--

DROP TABLE IF EXISTS `proforma_invoice_no`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proforma_invoice_no` (
  `invoice_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `invoice_no` varchar(45) NOT NULL,
  `name` varchar(150) NOT NULL,
  `address` varchar(255) NOT NULL,
  `category_id` tinyint NOT NULL,
  `country` varchar(100) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`invoice_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ref_book_format`
--

DROP TABLE IF EXISTS `ref_book_format`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_book_format` (
  `book_format_id` tinyint NOT NULL AUTO_INCREMENT,
  `book_format` varchar(45) NOT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') NOT NULL DEFAULT '1',
  PRIMARY KEY (`book_format_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ref_price_type`
--

DROP TABLE IF EXISTS `ref_price_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_price_type` (
  `price_type_id` tinyint NOT NULL AUTO_INCREMENT,
  `price_type` varchar(100) DEFAULT NULL,
  `price_type_code` enum('Subscription','PPV','Onetime') DEFAULT NULL,
  PRIMARY KEY (`price_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ref_subscription_category`
--

DROP TABLE IF EXISTS `ref_subscription_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_subscription_category` (
  `subscription_category_id` tinyint NOT NULL AUTO_INCREMENT,
  `subscription_category_name` varchar(255) NOT NULL,
  `display_status` enum('0','1','2') NOT NULL DEFAULT '1',
  PRIMARY KEY (`subscription_category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ref_subscription_format`
--

DROP TABLE IF EXISTS `ref_subscription_format`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_subscription_format` (
  `format_id` tinyint NOT NULL AUTO_INCREMENT,
  `format_name` varchar(255) NOT NULL,
  `display_status` enum('0','1','2') NOT NULL DEFAULT '1',
  PRIMARY KEY (`format_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ref_subscription_type`
--

DROP TABLE IF EXISTS `ref_subscription_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_subscription_type` (
  `type_id` tinyint NOT NULL AUTO_INCREMENT,
  `subscription_category_id` tinyint NOT NULL,
  `subscription_type` varchar(255) NOT NULL,
  `type_code` varchar(50) DEFAULT NULL,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`type_id`),
  KEY `FK_ref_subscription_type_subscription_category_id` (`subscription_category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `shopping_cart`
--

DROP TABLE IF EXISTS `shopping_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping_cart` (
  `shopping_cart_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned DEFAULT NULL,
  `session_id` varchar(45) NOT NULL,
  `region_id` tinyint DEFAULT NULL,
  `artifact_type` varchar(45) DEFAULT NULL,
  `artifact_id` bigint DEFAULT NULL,
  `artifact_format_id` int DEFAULT NULL,
  `price_category_id` tinyint DEFAULT NULL,
  `price_type_id` tinyint DEFAULT NULL,
  `artifact_price_id` bigint DEFAULT NULL,
  `year` int DEFAULT NULL,
  `status` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`shopping_cart_id`),
  UNIQUE KEY `shopping_cart_id` (`shopping_cart_id`),
  KEY `FK_shopping_cart_region_id_idx` (`region_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `subscription`
--

DROP TABLE IF EXISTS `subscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscription` (
  `subscription_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `offer_code` varchar(50) NOT NULL,
  `type_id` tinyint NOT NULL,
  `publisher_id` bigint unsigned NOT NULL,
  `subscription_title` varchar(255) DEFAULT NULL,
  `description` text,
  `duration` tinyint DEFAULT NULL,
  `duration_type` varchar(100) DEFAULT NULL,
  `grace_period` int DEFAULT NULL,
  `grace_period_type` varchar(100) DEFAULT NULL,
  `subscription_category_id` tinyint NOT NULL,
  `effective_start_date` datetime DEFAULT NULL,
  `effective_end_date` datetime DEFAULT NULL,
  `created_by` int unsigned DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` int unsigned DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`subscription_id`),
  UNIQUE KEY `subscription_id` (`subscription_id`),
  KEY `FK_tbl_subscription_cat_id` (`subscription_category_id`),
  KEY `FK_tbl_subscription` (`type_id`),
  KEY `FK_tbl_subscription_publisher_id` (`publisher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `subscription_price`
--

DROP TABLE IF EXISTS `subscription_price`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscription_price` (
  `subscription_price_id` int unsigned NOT NULL AUTO_INCREMENT,
  `subscription_id` bigint unsigned NOT NULL,
  `region_id` tinyint NOT NULL,
  `currency_id` int unsigned NOT NULL,
  `price` float NOT NULL,
  PRIMARY KEY (`subscription_price_id`),
  KEY `FK_tbl_subscription_price_currency_id` (`currency_id`),
  KEY `FK_tbl_subscription_price_region_id` (`region_id`),
  KEY `FK_tbl_subscription_price_subscription_id` (`subscription_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_article_purchase`
--

DROP TABLE IF EXISTS `user_article_purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_article_purchase` (
  `user_id` int unsigned NOT NULL,
  `article_id` bigint unsigned NOT NULL,
  `order_id` bigint unsigned NOT NULL,
  `currency_id` int unsigned NOT NULL,
  `price` float(10,2) NOT NULL,
  `subscription_category_id` tinyint NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `expiry_date` datetime DEFAULT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `purchase_type` varchar(100) NOT NULL,
  KEY `FK_user_article_purchase_article_id` (`article_id`),
  KEY `FK_user_article_purchase_order_id` (`order_id`),
  KEY `FK_user_article_purchase_subscription_category_id` (`subscription_category_id`),
  KEY `FK_user_article_purchase_user_id` (`user_id`),
  KEY `FK_user_article_purchase_currency_id` (`currency_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_artifact_purchase`
--

DROP TABLE IF EXISTS `user_artifact_purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_artifact_purchase` (
  `user_artifact_purchase_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `artifact_type` enum('Book','Chapter','Article','Journal') DEFAULT NULL,
  `artifact_id` bigint unsigned NOT NULL,
  `order_id` bigint unsigned NOT NULL,
  `currency_id` int unsigned NOT NULL,
  `price` float(10,2) NOT NULL,
  `subscription_category_id` tinyint NOT NULL,
  `license_start_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `license_end_date` datetime DEFAULT NULL,
  `content_start_date` datetime DEFAULT NULL,
  `content_end_date` datetime DEFAULT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`user_artifact_purchase_id`),
  KEY `FK_tbl_user_artifact_purchase_id` (`user_id`),
  KEY `FK_user_artifact_purchase_order_id` (`order_id`),
  KEY `FK_user_artifact_purchase_subscription_category_id` (`subscription_category_id`),
  KEY `FK_user_artifact_purchase_currency_id` (`currency_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_order_registration_details`
--

DROP TABLE IF EXISTS `user_order_registration_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_order_registration_details` (
  `registration_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) DEFAULT NULL,
  `customer_type` varchar(100) DEFAULT NULL,
  `invoice_code` varchar(100) DEFAULT NULL,
  `order_id` varchar(250) NOT NULL,
  `title` varchar(25) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `zip` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  `contact_number` varchar(50) DEFAULT NULL,
  `delv_address` varchar(500) DEFAULT NULL,
  `delv_city` varchar(50) DEFAULT NULL,
  `delv_zip` varchar(50) DEFAULT NULL,
  `delv_state` varchar(50) DEFAULT NULL,
  `delv_country` varchar(100) DEFAULT NULL,
  `delv_email` varchar(250) DEFAULT NULL,
  `delv_contact_number` varchar(50) DEFAULT NULL,
  `delv_mobile` varchar(20) DEFAULT NULL,
  `order_expired` varchar(50) DEFAULT NULL,
  `updated_by` varchar(250) DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`registration_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `v_ref_currency`
--

DROP TABLE IF EXISTS `v_ref_currency`;
/*!50001 DROP VIEW IF EXISTS `v_ref_currency`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_ref_currency` AS SELECT 
 1 AS `currency_id`,
 1 AS `currency_code`,
 1 AS `currency_name`,
 1 AS `currency_symbol`,
 1 AS `display_status`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_ref_region`
--

DROP TABLE IF EXISTS `v_ref_region`;
/*!50001 DROP VIEW IF EXISTS `v_ref_region`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_ref_region` AS SELECT 
 1 AS `region_id`,
 1 AS `region_code`,
 1 AS `region_name`,
 1 AS `display_status`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_site_account`
--

DROP TABLE IF EXISTS `v_site_account`;
/*!50001 DROP VIEW IF EXISTS `v_site_account`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_site_account` AS SELECT 
 1 AS `site_id`,
 1 AS `institute_name`,
 1 AS `institute_code`*/;
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
 1 AS `email`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `v_ref_currency`
--

/*!50001 DROP VIEW IF EXISTS `v_ref_currency`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_ref_currency` AS select `reference_service_db`.`ref_currency`.`currency_id` AS `currency_id`,`reference_service_db`.`ref_currency`.`currency_code` AS `currency_code`,`reference_service_db`.`ref_currency`.`currency_name` AS `currency_name`,`reference_service_db`.`ref_currency`.`currency_symbol` AS `currency_symbol`,`reference_service_db`.`ref_currency`.`display_status` AS `display_status` from `reference_service_db`.`ref_currency` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_ref_region`
--

/*!50001 DROP VIEW IF EXISTS `v_ref_region`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_ref_region` AS select `reference_service_db`.`ref_region`.`region_id` AS `region_id`,`reference_service_db`.`ref_region`.`region_code` AS `region_code`,`reference_service_db`.`ref_region`.`region_name` AS `region_name`,`reference_service_db`.`ref_region`.`display_status` AS `display_status` from `reference_service_db`.`ref_region` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_site_account`
--

/*!50001 DROP VIEW IF EXISTS `v_site_account`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_site_account` AS select `institution_service_db`.`site_account`.`site_id` AS `site_id`,`institution_service_db`.`site_account`.`institute_name` AS `institute_name`,`institution_service_db`.`site_account`.`institute_code` AS `institute_code` from `institution_service_db`.`site_account` */;
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
/*!50001 VIEW `v_user` AS select `auth_service_db`.`user`.`user_id` AS `user_id`,`auth_service_db`.`user`.`username` AS `username`,`auth_service_db`.`user`.`email` AS `email` from `auth_service_db`.`user` */;
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
