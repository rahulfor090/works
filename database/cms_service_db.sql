-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: cms_service_db
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
-- Table structure for table `advertisement_images`
--

DROP TABLE IF EXISTS `advertisement_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `advertisement_images` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `page_type` enum('Home','AllIssue','CurrentIssue','Metadata') NOT NULL,
  `banner_type` enum('Header','Middle','Footer') NOT NULL,
  `journal_id` bigint unsigned NOT NULL,
  `adword_filename` varchar(255) DEFAULT NULL,
  `adword_url` varchar(500) DEFAULT NULL,
  `adword_content` longtext,
  `m_adword_content` longtext,
  `display_status` enum('0','1','2') NOT NULL DEFAULT '1',
  `created_by` int unsigned NOT NULL,
  `updated_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_tbl_advert_publisher_id` (`publisher_id`),
  KEY `FK_tbl_advert_journal_id` (`journal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `adword`
--

DROP TABLE IF EXISTS `adword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adword` (
  `adword_id` int unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `journal_id` bigint unsigned DEFAULT NULL,
  `show_on_article` enum('Y','N') DEFAULT 'Y',
  `show_popup` enum('Y','N') DEFAULT 'N',
  `header_adword_content` longtext,
  `footer_adword_content` longtext,
  `mpu_adword_content` longtext,
  `crawler_content` longtext,
  `job_widget` longtext,
  `adword_filename` varchar(100) DEFAULT NULL,
  `adword_url` varchar(255) DEFAULT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') NOT NULL DEFAULT '1',
  PRIMARY KEY (`adword_id`),
  KEY `FK_tbl_adword_publisher_id` (`publisher_id`),
  KEY `FK_tbl_adword_journal_id` (`journal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `banner`
--

DROP TABLE IF EXISTS `banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banner` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `banner_type_id` tinyint NOT NULL,
  `generic_id` tinyint DEFAULT NULL,
  `img_name` varchar(255) NOT NULL,
  `banner_url` varchar(500) DEFAULT NULL,
  `banner_text` text,
  `display_status` enum('0','1','2') NOT NULL DEFAULT '1',
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_banner_publisher_id` (`publisher_id`),
  KEY `FK_banner_type_id` (`banner_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contactus_track`
--

DROP TABLE IF EXISTS `contactus_track`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contactus_track` (
  `contactus_track_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `name` varchar(40) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `contact` varchar(24) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `message` text,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `contactus_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`contactus_track_id`),
  UNIQUE KEY `contactus_track_id` (`contactus_track_id`),
  KEY `FK_contactus_track_publisher_id` (`publisher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `event_seminar`
--

DROP TABLE IF EXISTS `event_seminar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_seminar` (
  `event_seminar_id` int unsigned NOT NULL AUTO_INCREMENT,
  `event_type` enum('Event','Seminar','Conference') NOT NULL,
  `publisher_id` bigint unsigned NOT NULL,
  `title` varchar(255) NOT NULL,
  `image_name` varchar(100) DEFAULT NULL,
  `description` text,
  `event_url` varchar(500) DEFAULT NULL,
  `event_for` enum('JAYPEE','JOURNALS') NOT NULL DEFAULT 'JAYPEE',
  `location` varchar(255) DEFAULT NULL,
  `country_id` int unsigned DEFAULT NULL,
  `start_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`event_seminar_id`),
  KEY `FK_event_seminar_publisher_id` (`publisher_id`),
  KEY `FK_event_seminar_country_id` (`country_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `free_trial`
--

DROP TABLE IF EXISTS `free_trial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `free_trial` (
  `trial_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `job_title` varchar(100) NOT NULL,
  `institution` varchar(255) NOT NULL,
  `street_number` varchar(15) DEFAULT NULL,
  `street_name` varchar(45) DEFAULT NULL,
  `town` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `postal_code` varchar(10) DEFAULT NULL,
  `country` varchar(45) NOT NULL,
  `telephone` varchar(15) NOT NULL,
  `fax` varchar(15) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `ins_website` varchar(100) DEFAULT NULL,
  `inst_type` varchar(45) DEFAULT NULL,
  `inst_total` int DEFAULT '0',
  `ip_address` varchar(100) DEFAULT NULL,
  `admin_name` varchar(100) DEFAULT NULL,
  `admin_telephone` varchar(15) DEFAULT NULL,
  `admin_email` varchar(100) DEFAULT NULL,
  `comments` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`trial_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_adword_page`
--

DROP TABLE IF EXISTS `map_adword_page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_adword_page` (
  `adword_id` int unsigned NOT NULL,
  `adword_page_id` int unsigned NOT NULL,
  PRIMARY KEY (`adword_id`,`adword_page_id`),
  KEY `FK_tbl_adword_page_map_adword_page_id` (`adword_page_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `menu_setting`
--

DROP TABLE IF EXISTS `menu_setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_setting` (
  `menu_id` int unsigned NOT NULL AUTO_INCREMENT,
  `menu_title` varchar(50) NOT NULL,
  `journal_id` bigint unsigned DEFAULT NULL,
  `taxonomy_id` int unsigned NOT NULL DEFAULT '0',
  `static_page_id` int unsigned DEFAULT '0',
  `parent_menu_id` int unsigned DEFAULT NULL,
  `menu_order` int unsigned DEFAULT '0',
  `menu_url` varchar(255) DEFAULT '0',
  `menu_type` enum('CUSTOM_URL','STATIC_PAGE') DEFAULT 'CUSTOM_URL',
  `menu_category` enum('IND','INS') NOT NULL DEFAULT 'IND',
  `custom_url` varchar(255) DEFAULT '0',
  `menu_status` enum('0','1','2') NOT NULL DEFAULT '1',
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `news_feature`
--

DROP TABLE IF EXISTS `news_feature`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news_feature` (
  `news_feature_id` int unsigned NOT NULL AUTO_INCREMENT,
  `type_id` enum('1','2') NOT NULL COMMENT '1=>"News", 2=>"Feature"',
  `publisher_id` bigint unsigned NOT NULL,
  `journal_id` bigint unsigned DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `image_name` varchar(100) DEFAULT NULL,
  `desc_file` varchar(100) DEFAULT NULL,
  `description` text,
  `url` varchar(100) DEFAULT NULL,
  `news_date` datetime DEFAULT NULL,
  `publish_in` varchar(100) DEFAULT NULL,
  `author` varchar(100) DEFAULT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`news_feature_id`),
  KEY `FK_news_feature_publisher_id` (`publisher_id`),
  KEY `FK_news_feature_journal_id` (`journal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newsletter`
--

DROP TABLE IF EXISTS `newsletter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `newsletter` (
  `newsletterid` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `emailid` varchar(100) DEFAULT NULL,
  `cipla_user` enum('Y','N') NOT NULL DEFAULT 'N',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `journal_id` bigint DEFAULT NULL,
  `active_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`newsletterid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `partners`
--

DROP TABLE IF EXISTS `partners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partners` (
  `partner_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `partner_name` varchar(250) NOT NULL,
  `partner_description` text,
  `email` varchar(100) DEFAULT NULL,
  `url` varchar(500) DEFAULT NULL,
  `partner_logo` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `pin_code` varchar(20) DEFAULT NULL,
  `country_id` int unsigned DEFAULT NULL,
  `region` varchar(100) DEFAULT NULL,
  `contact_no` varchar(100) DEFAULT NULL,
  `fax` varchar(100) DEFAULT NULL,
  `skype_id` varchar(50) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`partner_id`),
  UNIQUE KEY `partner_id` (`partner_id`),
  KEY `FK_partner_country_id` (`country_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `publisher_location`
--

DROP TABLE IF EXISTS `publisher_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publisher_location` (
  `publisher_location_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `location_name` varchar(255) NOT NULL,
  `publisher_description` varchar(1000) DEFAULT NULL,
  `email` varchar(500) DEFAULT NULL,
  `country_id` int unsigned DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contact_no` varchar(150) DEFAULT NULL,
  `fax` varchar(100) DEFAULT NULL,
  `pin_code` varchar(20) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `skype_id` varchar(50) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  `website` varchar(100) DEFAULT NULL,
  `office_type` varchar(200) DEFAULT NULL,
  `journal_code` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`publisher_location_id`),
  UNIQUE KEY `publisher_location_id` (`publisher_location_id`),
  KEY `FK_publisher_location_publisher_id` (`publisher_id`),
  KEY `FK_publisher_location_country_id` (`country_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `publisher_static_data`
--

DROP TABLE IF EXISTS `publisher_static_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publisher_static_data` (
  `publisher_static_data_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `language_id` varchar(50) DEFAULT NULL,
  `static_data_key` varchar(100) NOT NULL DEFAULT '',
  `static_data_text` mediumtext,
  `static_data_order` smallint DEFAULT NULL,
  `short_desc` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`publisher_static_data_id`),
  UNIQUE KEY `publisher_static_data_id` (`publisher_static_data_id`),
  UNIQUE KEY `PUB_STATIC_DATA.PUB_ID.DATA_CATEGORY.DATA_KEY.UK` (`publisher_id`,`static_data_key`,`language_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rating_review`
--

DROP TABLE IF EXISTS `rating_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rating_review` (
  `rating_review_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `review_page` enum('Book','Chapter','Video','Journal','Article','Home') DEFAULT NULL,
  `generic_id` bigint unsigned DEFAULT NULL,
  `review_star` enum('1','2','3','4','5') NOT NULL DEFAULT '1',
  `review_status` enum('Pending','Approved','Rejected') NOT NULL DEFAULT 'Pending',
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `reviewer_name` varchar(100) NOT NULL,
  `reviewer_email` varchar(100) NOT NULL,
  `reviewer_feedback` text,
  `display_status` enum('0','1','2') NOT NULL DEFAULT '1',
  `url` varchar(100) NOT NULL,
  PRIMARY KEY (`rating_review_id`),
  UNIQUE KEY `rating_review_id` (`rating_review_id`),
  KEY `FK_tbl_rating_review_publisher_id` (`publisher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `recommendations`
--

DROP TABLE IF EXISTS `recommendations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recommendations` (
  `recommendation_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `recommender` varchar(255) NOT NULL,
  `affiliation` varchar(500) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `recommender_img` varchar(100) DEFAULT NULL,
  `featured` varchar(1) NOT NULL DEFAULT 'N',
  `star_rating` enum('1','2','3','4','5') NOT NULL DEFAULT '1',
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`recommendation_id`),
  UNIQUE KEY `recommendation_id` (`recommendation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ref_adword_page`
--

DROP TABLE IF EXISTS `ref_adword_page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_adword_page` (
  `adword_page_id` int unsigned NOT NULL AUTO_INCREMENT,
  `adword_page_name` varchar(100) NOT NULL,
  PRIMARY KEY (`adword_page_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ref_banner_type`
--

DROP TABLE IF EXISTS `ref_banner_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_banner_type` (
  `banner_type_id` tinyint NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `banner_type` varchar(45) NOT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') NOT NULL DEFAULT '1',
  PRIMARY KEY (`banner_type_id`),
  KEY `FK_banner_type_publisher_id` (`publisher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ref_menu`
--

DROP TABLE IF EXISTS `ref_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_menu` (
  `ref_menu_id` int unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `parent_id` int unsigned NOT NULL,
  `level` int unsigned NOT NULL,
  `menu_category` enum('IND','INS') DEFAULT 'IND',
  `menu_name` varchar(250) NOT NULL,
  `menu_code` varchar(50) DEFAULT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`ref_menu_id`),
  KEY `FK_ref_menu_publisher_id` (`publisher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ref_news_feature_desc_link`
--

DROP TABLE IF EXISTS `ref_news_feature_desc_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_news_feature_desc_link` (
  `ref_desc_attach_id` int NOT NULL AUTO_INCREMENT,
  `news_feature_id` int NOT NULL,
  `description_attachment_file` text NOT NULL,
  `title_name` text NOT NULL,
  PRIMARY KEY (`ref_desc_attach_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ref_page_name`
--

DROP TABLE IF EXISTS `ref_page_name`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_page_name` (
  `page_id` int unsigned NOT NULL AUTO_INCREMENT,
  `page_name` varchar(100) NOT NULL,
  `page_code` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`page_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `register_alert`
--

DROP TABLE IF EXISTS `register_alert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `register_alert` (
  `alert_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `present_affiliation` varchar(255) NOT NULL,
  `cipla_user` enum('Y','N') NOT NULL DEFAULT 'N',
  PRIMARY KEY (`alert_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `register_alert_speciality`
--

DROP TABLE IF EXISTS `register_alert_speciality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `register_alert_speciality` (
  `alert_id` bigint unsigned NOT NULL,
  `category_id` int NOT NULL,
  `speciality_id` int NOT NULL,
  KEY `FK_register_alert_alert_id_idx` (`alert_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rights_track`
--

DROP TABLE IF EXISTS `rights_track`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rights_track` (
  `rights_track_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `year` varchar(10) NOT NULL,
  `journal_id` bigint NOT NULL,
  `issue` varchar(100) NOT NULL,
  `article_title` varchar(500) DEFAULT NULL,
  `author_name` varchar(250) DEFAULT NULL,
  `purpose` varchar(500) DEFAULT NULL,
  `phone_no` varchar(20) DEFAULT NULL,
  `address_1` varchar(500) DEFAULT NULL,
  `address_2` varchar(255) DEFAULT NULL,
  `remarks` varchar(1000) DEFAULT NULL,
  `no_of_copies` int unsigned DEFAULT NULL,
  `track_type` enum('RIGHTS','REPRINTS','HARDCOPY') DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`rights_track_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `star_rating`
--

DROP TABLE IF EXISTS `star_rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `star_rating` (
  `star_rating_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `publisher_id` bigint unsigned NOT NULL,
  `rating_type_id` tinyint NOT NULL,
  `ext_generic_id` bigint unsigned DEFAULT NULL,
  `rating_value` enum('1','2','3','4','5') NOT NULL DEFAULT '1',
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`star_rating_id`),
  UNIQUE KEY `star_rating_id` (`star_rating_id`),
  KEY `FK_tbl_star_rating_user_id` (`user_id`),
  KEY `FK_tbl_star_rating_publisher_id` (`publisher_id`),
  KEY `FK_tbl_star_rating_type_id` (`rating_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `static_page`
--

DROP TABLE IF EXISTS `static_page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `static_page` (
  `static_page_id` int unsigned NOT NULL AUTO_INCREMENT,
  `page_id` int unsigned NOT NULL DEFAULT '0',
  `publisher_id` bigint unsigned NOT NULL,
  `page_for` enum('Home','Book','Journal') NOT NULL DEFAULT 'Home',
  `locale` varchar(5) DEFAULT NULL,
  `image_name` varchar(45) DEFAULT NULL,
  `page_content` longtext,
  `page_url` varchar(255) DEFAULT NULL,
  `revision` int unsigned DEFAULT '0',
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  `page_status` enum('PENDING','APPROVED') DEFAULT 'PENDING',
  PRIMARY KEY (`static_page_id`),
  KEY `created_date` (`created_date`,`updated_by`),
  KEY `FK_tbl_static_page_publisher_id` (`publisher_id`),
  KEY `FK_static_page_page_name_id` (`page_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `v_journal`
--

DROP TABLE IF EXISTS `v_journal`;
/*!50001 DROP VIEW IF EXISTS `v_journal`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_journal` AS SELECT 
 1 AS `journal_id`,
 1 AS `journal_title`,
 1 AS `journal_code`*/;
SET character_set_client = @saved_cs_client;

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
-- Final view structure for view `v_journal`
--

/*!50001 DROP VIEW IF EXISTS `v_journal`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_journal` AS select `content_service_db`.`journal`.`journal_id` AS `journal_id`,`content_service_db`.`journal`.`journal_title` AS `journal_title`,`content_service_db`.`journal`.`journal_code` AS `journal_code` from `content_service_db`.`journal` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-04 22:27:04
