-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: content_service_db
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
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article` (
  `article_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `locale` varchar(5) NOT NULL DEFAULT 'en_US',
  `publisher_id` bigint unsigned NOT NULL,
  `journal_id` bigint unsigned NOT NULL,
  `volume_id` bigint unsigned DEFAULT NULL,
  `issue_id` bigint unsigned DEFAULT NULL,
  `article_type_id` bigint unsigned NOT NULL,
  `date_status_modified` datetime DEFAULT NULL,
  `article_status_id` tinyint NOT NULL DEFAULT '1',
  `pages` varchar(255) DEFAULT NULL,
  `article_doi` varchar(255) NOT NULL,
  `article_file_name` varchar(250) DEFAULT NULL,
  `article_folder_name` varchar(250) DEFAULT NULL,
  `xml_exists` varchar(1) NOT NULL DEFAULT 'Y',
  `article_pmid` varchar(255) DEFAULT NULL,
  `title` varchar(500) NOT NULL,
  `subtitle` text,
  `aop_date` date DEFAULT '1000-01-01',
  `copyright_stmt` varchar(1000) DEFAULT NULL,
  `copyright_year` int unsigned DEFAULT NULL,
  `first_page` varchar(5) DEFAULT NULL,
  `last_page` varchar(5) DEFAULT NULL,
  `access_type_id` int unsigned NOT NULL,
  `license_type_id` int unsigned DEFAULT NULL,
  `print_publish_date` date DEFAULT '1000-01-01',
  `online_publish_date` date DEFAULT '1000-01-01',
  `received_date` date DEFAULT '1000-01-01',
  `accepted_date` date DEFAULT '1000-01-01',
  `total_view` int NOT NULL DEFAULT '0',
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `featured` enum('Y','N') NOT NULL DEFAULT 'N',
  `article_url` text,
  `seq_no` varchar(10) DEFAULT NULL,
  `abstract` text,
  `sub_article` enum('Y','N') NOT NULL DEFAULT 'N',
  `display_status` enum('0','1','2') NOT NULL DEFAULT '1',
  `related_article_doi` varchar(255) DEFAULT NULL,
  `downloadable` enum('Y','N') DEFAULT 'Y',
  `is_pdf_exist` enum('1','0') NOT NULL DEFAULT '0',
  `is_img_exist` enum('1','0') NOT NULL DEFAULT '0',
  PRIMARY KEY (`article_id`),
  KEY `idx_journal_id` (`journal_id`),
  KEY `idx_issue_id` (`issue_id`),
  KEY `idx_article_doi` (`article_doi`),
  KEY `idx_online_publish_date` (`online_publish_date`),
  KEY `idx_article_journal_id` (`journal_id`),
  KEY `idx_article_issue_id` (`issue_id`),
  KEY `idx_article_publish_date` (`online_publish_date`),
  FULLTEXT KEY `ft_title_abstract` (`title`,`abstract`),
  FULLTEXT KEY `ft_article_title` (`title`,`abstract`),
  CONSTRAINT `FK_article_journal_id` FOREIGN KEY (`journal_id`) REFERENCES `journal` (`journal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `article_author_tracking`
--

DROP TABLE IF EXISTS `article_author_tracking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_author_tracking` (
  `article_author_tracking_id` bigint NOT NULL AUTO_INCREMENT,
  `article_id` int unsigned NOT NULL,
  `author_id` int unsigned NOT NULL,
  `meta_author_email` varchar(255) DEFAULT NULL,
  `meta_author_first_name` varchar(255) DEFAULT NULL,
  `meta_author_middle_name` varchar(255) DEFAULT NULL,
  `meta_author_last_name` varchar(255) DEFAULT NULL,
  `saved_author_email` varchar(255) DEFAULT NULL,
  `saved_author_first_name` varchar(255) DEFAULT NULL,
  `saved_author_middle_name` varchar(255) DEFAULT NULL,
  `saved_author_last_name` varchar(255) DEFAULT NULL,
  `message` text,
  `author_insertion_status` enum('0','1') NOT NULL DEFAULT '0',
  `processing_status` enum('0','1') NOT NULL DEFAULT '0',
  PRIMARY KEY (`article_author_tracking_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `article_comment`
--

DROP TABLE IF EXISTS `article_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_comment` (
  `article_comment_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `article_id` bigint unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  `comment_data` text NOT NULL,
  `parent_comment_id` bigint unsigned DEFAULT NULL,
  `comment_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `display_status` enum('0','1') NOT NULL DEFAULT '1',
  PRIMARY KEY (`article_comment_id`),
  KEY `idx_article_id` (`article_id`),
  KEY `idx_parent_comment_id` (`parent_comment_id`),
  CONSTRAINT `FK_article_comment_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_article_comment_comment_id` FOREIGN KEY (`parent_comment_id`) REFERENCES `article_comment` (`article_comment_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `article_custom_data`
--

DROP TABLE IF EXISTS `article_custom_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_custom_data` (
  `article_custom_data_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `article_id` bigint unsigned NOT NULL,
  `custom_data_key` varchar(100) NOT NULL DEFAULT '',
  `custom_data_value` mediumtext,
  `custom_data_type` varchar(20) DEFAULT NULL,
  `custom_data_order` smallint NOT NULL DEFAULT '1',
  `display_status` enum('0','1') NOT NULL DEFAULT '1',
  PRIMARY KEY (`article_custom_data_id`),
  KEY `idx_article_id` (`article_id`),
  CONSTRAINT `FK_article_custom_data_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `article_funding_data`
--

DROP TABLE IF EXISTS `article_funding_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_funding_data` (
  `article_funding_data_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `article_id` bigint unsigned NOT NULL,
  `funding_data` varchar(100) NOT NULL,
  `funding_data_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`article_funding_data_id`),
  KEY `idx_article_id` (`article_id`),
  CONSTRAINT `FK_article_funding_data_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `article_ref_data`
--

DROP TABLE IF EXISTS `article_ref_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_ref_data` (
  `article_ref_data_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `ref_pub_type` varchar(20) NOT NULL,
  `article_id` bigint unsigned NOT NULL,
  `authors` text,
  `title_year` varchar(255) DEFAULT NULL,
  `title` varchar(500) DEFAULT NULL,
  `main_title` varchar(500) DEFAULT NULL,
  `volume` varchar(255) DEFAULT NULL,
  `issue` varchar(255) DEFAULT NULL,
  `publisher_loc` varchar(255) DEFAULT NULL,
  `publisher_name` varchar(255) DEFAULT NULL,
  `first_page` varchar(255) DEFAULT NULL,
  `last_page` varchar(255) DEFAULT NULL,
  `edition` varchar(255) DEFAULT NULL,
  `article_doi` varchar(100) DEFAULT NULL,
  `article_pmid` varchar(100) DEFAULT NULL,
  `pubmed_url` varchar(255) DEFAULT NULL,
  `crossref_url` varchar(255) DEFAULT NULL,
  `scopus_url` varchar(255) DEFAULT NULL,
  `reference_data` text,
  `external_url` varchar(255) DEFAULT NULL,
  `article_bib_id` varchar(10) DEFAULT NULL,
  `article_ref_label` varchar(5) DEFAULT NULL,
  `collab` varchar(500) DEFAULT NULL,
  `link_sync` enum('Y','N') NOT NULL DEFAULT 'N',
  PRIMARY KEY (`article_ref_data_id`),
  KEY `idx_article_id` (`article_id`),
  CONSTRAINT `FK_article_ref_data_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `article_social_count`
--

DROP TABLE IF EXISTS `article_social_count`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_social_count` (
  `article_social_count_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `article_id` bigint unsigned NOT NULL,
  `service_code` varchar(20) NOT NULL,
  `count` int DEFAULT '0',
  `month` enum('1','2','3','4','5','6','7','8','9','10','11','12') NOT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`article_social_count_id`),
  KEY `idx_article_id` (`article_id`),
  CONSTRAINT `FK_article_social_count_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author` (
  `author_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `salutation` varchar(20) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `suffix` varchar(50) DEFAULT NULL,
  `country_id` int unsigned DEFAULT NULL,
  `email` varchar(500) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `orcid` varchar(45) DEFAULT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') NOT NULL DEFAULT '1',
  `phonenumber` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`author_id`),
  UNIQUE KEY `author_id` (`author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `author_notes_data`
--

DROP TABLE IF EXISTS `author_notes_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author_notes_data` (
  `article_id` bigint unsigned NOT NULL,
  `locale` varchar(45) NOT NULL,
  `setting_name` varchar(45) NOT NULL,
  `setting_value` text NOT NULL,
  `setting_type` varchar(45) NOT NULL DEFAULT 'String',
  KEY `FK_tbl_article_article_id` (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `author_settings`
--

DROP TABLE IF EXISTS `author_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author_settings` (
  `author_id` bigint unsigned NOT NULL,
  `locale` varchar(5) NOT NULL DEFAULT 'en_US',
  `setting_name` varchar(255) DEFAULT NULL,
  `setting_value` text,
  `setting_type` varchar(6) NOT NULL DEFAULT 'String',
  KEY `FK_tbl_author_settings_author_id` (`author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `book_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `isbn` varchar(13) DEFAULT NULL,
  `doi` varchar(255) DEFAULT NULL,
  `book_title` varchar(500) NOT NULL,
  `book_sub_title` varchar(500) DEFAULT NULL,
  `book_logo` varchar(100) DEFAULT NULL,
  `publish_status` enum('Staging','Live') NOT NULL DEFAULT 'Staging',
  `access_type_id` int unsigned NOT NULL,
  `license_type_id` int unsigned DEFAULT NULL,
  `volume` varchar(255) DEFAULT NULL,
  `edition` varchar(255) DEFAULT NULL,
  `no_of_volumes` tinyint DEFAULT NULL,
  `book_type` enum('Reference','Professional','Textbook') DEFAULT 'Reference',
  `content_type` enum('Book','Video Atlas') DEFAULT 'Book',
  `show_chapters` enum('Y','N') DEFAULT 'N',
  `no_of_chapters` varchar(10) DEFAULT NULL,
  `featured` enum('Y','N') NOT NULL DEFAULT 'N',
  `publishing_year` varchar(4) DEFAULT NULL,
  `no_of_pages` int DEFAULT NULL,
  `book_language` varchar(10) DEFAULT NULL,
  `bisac` varchar(20) DEFAULT NULL,
  `rating` enum('1','2','3','4','5') DEFAULT NULL,
  `downloadable` enum('Y','N') DEFAULT 'Y',
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`book_id`),
  UNIQUE KEY `book_id` (`book_id`),
  UNIQUE KEY `book_isbn_UNIQUE` (`isbn`),
  KEY `FK_tbl_book_publisher_id` (`publisher_id`),
  KEY `FK_tbl_book_access_type_id` (`access_type_id`),
  KEY `idx_book_isbn` (`isbn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `book_case`
--

DROP TABLE IF EXISTS `book_case`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_case` (
  `book_case_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(500) NOT NULL,
  `file_name` varchar(100) NOT NULL,
  `description` text,
  `access_type_id` int unsigned NOT NULL,
  `license_type_id` int unsigned DEFAULT NULL,
  `display_status` enum('0','1','2') DEFAULT '1',
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`book_case_id`),
  UNIQUE KEY `book_case_id` (`book_case_id`),
  KEY `fk_book_case_type_id` (`access_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `book_review`
--

DROP TABLE IF EXISTS `book_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_review` (
  `book_review_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `book_id` bigint unsigned NOT NULL,
  `review_type` enum('Doody','Other') NOT NULL,
  `review_by` varchar(255) DEFAULT NULL,
  `file_name` varchar(50) DEFAULT NULL,
  `review_rating` enum('1','2','3','4','5') NOT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`book_review_id`),
  UNIQUE KEY `book_review_id` (`book_review_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `book_section`
--

DROP TABLE IF EXISTS `book_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_section` (
  `section_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `book_id` bigint unsigned NOT NULL,
  `section_no` varchar(10) NOT NULL,
  `section_name` varchar(255) NOT NULL,
  PRIMARY KEY (`section_id`),
  UNIQUE KEY `section_id` (`section_id`),
  KEY `FK_tbl_book_section_book_id` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `book_settings`
--

DROP TABLE IF EXISTS `book_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_settings` (
  `book_id` bigint unsigned NOT NULL,
  `locale` varchar(5) NOT NULL DEFAULT 'en_US',
  `setting_name` varchar(255) NOT NULL,
  `setting_value` text,
  `setting_type` varchar(6) NOT NULL DEFAULT 'String',
  UNIQUE KEY `book_settings_pkey` (`book_id`,`locale`,`setting_name`),
  KEY `FK_tbl_book_settings_book_id` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `book_volume`
--

DROP TABLE IF EXISTS `book_volume`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_volume` (
  `volume_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `book_id` bigint unsigned NOT NULL,
  `volume_name` varchar(100) NOT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`volume_id`),
  UNIQUE KEY `volume_id` (`volume_id`),
  KEY `FK_tbl_book_volume_book_id` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chapter`
--

DROP TABLE IF EXISTS `chapter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chapter` (
  `chapter_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `book_id` bigint unsigned NOT NULL,
  `access_type_id` int unsigned NOT NULL,
  `license_type_id` int unsigned DEFAULT NULL,
  `seq_no` int DEFAULT NULL,
  `chapter_no` varchar(255) DEFAULT NULL,
  `chapter_title` varchar(500) NOT NULL,
  `chapter_subtitle` varchar(500) DEFAULT NULL,
  `doi` varchar(100) DEFAULT NULL,
  `first_page` varchar(7) DEFAULT NULL,
  `last_page` varchar(7) DEFAULT NULL,
  `description` text,
  `chapter_file_name` varchar(250) DEFAULT NULL,
  `downloadable` enum('Y','N') DEFAULT 'Y',
  `chapter_language` varchar(10) DEFAULT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`chapter_id`),
  UNIQUE KEY `chapter_id` (`chapter_id`),
  KEY `FK_chapter_book_id` (`book_id`),
  KEY `FK_chapter_access_type_id` (`access_type_id`),
  CONSTRAINT `FK_chapter_book_id` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chapter_comment`
--

DROP TABLE IF EXISTS `chapter_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chapter_comment` (
  `chapter_comment_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `chapter_id` bigint unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  `comment_data` text NOT NULL,
  `parent_comment_id` bigint unsigned DEFAULT NULL,
  `comment_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `display_status` enum('0','1') NOT NULL DEFAULT '1',
  PRIMARY KEY (`chapter_comment_id`),
  UNIQUE KEY `chapter_comment_id` (`chapter_comment_id`),
  KEY `FK_chapter_comment_chapter_id` (`chapter_id`),
  KEY `FK_chapter_comment_user_id` (`user_id`),
  KEY `FK_chapter_comment_comment_id` (`parent_comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chapter_custom_data`
--

DROP TABLE IF EXISTS `chapter_custom_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chapter_custom_data` (
  `chapter_custom_data_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `chapter_id` bigint unsigned NOT NULL,
  `custom_data_key` varchar(100) NOT NULL DEFAULT '',
  `custom_data_value` mediumtext,
  `custom_data_type` varchar(20) DEFAULT NULL,
  `custom_data_order` smallint NOT NULL DEFAULT '1',
  `display_status` enum('0','1') NOT NULL DEFAULT '1',
  PRIMARY KEY (`chapter_custom_data_id`),
  UNIQUE KEY `chapter_custom_data_id` (`chapter_custom_data_id`),
  KEY `FK_chapter_custom_data_chapter_id` (`chapter_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chapter_ref_data`
--

DROP TABLE IF EXISTS `chapter_ref_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chapter_ref_data` (
  `chapter_ref_data_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `ref_pub_type` varchar(20) NOT NULL,
  `chapter_id` bigint unsigned NOT NULL,
  `authors` varchar(255) DEFAULT NULL,
  `title_year` varchar(255) DEFAULT NULL,
  `title` varchar(500) DEFAULT NULL,
  `main_title` varchar(500) DEFAULT NULL,
  `volume` varchar(255) DEFAULT NULL,
  `issue` varchar(255) DEFAULT NULL,
  `publisher_loc` varchar(255) DEFAULT NULL,
  `publisher_name` varchar(255) DEFAULT NULL,
  `first_page` varchar(255) DEFAULT NULL,
  `last_page` varchar(255) DEFAULT NULL,
  `edition` varchar(255) DEFAULT NULL,
  `doi` varchar(100) DEFAULT NULL,
  `pmid` varchar(100) DEFAULT NULL,
  `pubmed_url` varchar(255) DEFAULT NULL,
  `crossref_url` varchar(255) DEFAULT NULL,
  `scopus_url` varchar(255) DEFAULT NULL,
  `reference_data` text,
  `external_url` varchar(255) DEFAULT NULL,
  `ref_bib_id` varchar(10) DEFAULT NULL,
  `ref_label` varchar(5) DEFAULT NULL,
  `collab` varchar(500) DEFAULT NULL,
  `link_sync` enum('Y','N') NOT NULL DEFAULT 'N',
  PRIMARY KEY (`chapter_ref_data_id`),
  UNIQUE KEY `chapter_ref_data_id` (`chapter_ref_data_id`),
  KEY `FK_chapter_ref_data_chapter_id` (`chapter_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ealert`
--

DROP TABLE IF EXISTS `ealert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ealert` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `journal_id` bigint NOT NULL,
  `email` varchar(100) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `city` varchar(150) NOT NULL,
  `state` varchar(45) NOT NULL,
  `pincode` varchar(20) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `fax` varchar(20) DEFAULT NULL,
  `country_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ealert_journal_id_idx` (`journal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `editor`
--

DROP TABLE IF EXISTS `editor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `editor` (
  `editor_id` int unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `title` varchar(20) DEFAULT NULL,
  `first_name` varchar(100) NOT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(100) NOT NULL,
  `is_alive` enum('Y','N') DEFAULT 'Y',
  `qualification` varchar(255) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `organisation_division` varchar(255) DEFAULT NULL,
  `institute` text,
  `email` varchar(500) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `phone` varchar(24) DEFAULT NULL,
  `editor_image` varchar(100) DEFAULT NULL,
  `mailing_address` varchar(255) DEFAULT NULL,
  `orcid` varchar(45) DEFAULT NULL,
  `fields_of_interest` varchar(255) DEFAULT NULL,
  `recent_publications` text,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') NOT NULL DEFAULT '1',
  PRIMARY KEY (`editor_id`),
  KEY `FK_tbl_editor_publisher_id` (`publisher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `editor_settings`
--

DROP TABLE IF EXISTS `editor_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `editor_settings` (
  `editor_id` int unsigned NOT NULL,
  `locale` varchar(5) NOT NULL DEFAULT 'en_US',
  `setting_name` varchar(255) DEFAULT NULL,
  `setting_value` text,
  `setting_type` varchar(6) NOT NULL DEFAULT 'String',
  KEY `FK_tbl_editor_settings_editor_id` (`editor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `highlighted_figure`
--

DROP TABLE IF EXISTS `highlighted_figure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `highlighted_figure` (
  `figure_id` int unsigned NOT NULL AUTO_INCREMENT,
  `article_id` bigint unsigned NOT NULL,
  `image_name` varchar(255) NOT NULL,
  `highlighted_status` enum('0','1') NOT NULL DEFAULT '0',
  `image_path` varchar(255) DEFAULT NULL,
  `label` varchar(45) DEFAULT NULL,
  `caption` text,
  `from_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `to_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`figure_id`),
  KEY `idx_article_id` (`article_id`),
  CONSTRAINT `FK_highlighted_figure_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `image_bank`
--

DROP TABLE IF EXISTS `image_bank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image_bank` (
  `image_bank_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `image_title` text,
  `image_name` varchar(11) NOT NULL,
  `image_path` varchar(100) DEFAULT NULL,
  `caption` text,
  `keywords` text,
  `speciality` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`image_bank_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `issue`
--

DROP TABLE IF EXISTS `issue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `issue` (
  `issue_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `journal_id` bigint unsigned NOT NULL,
  `volume_id` bigint unsigned NOT NULL,
  `number` varchar(10) NOT NULL,
  `month` varchar(20) DEFAULT NULL,
  `current` enum('Y','N') NOT NULL DEFAULT 'N',
  `issue_title` varchar(255) DEFAULT NULL,
  `description` text,
  `access_type_id` int unsigned NOT NULL,
  `license_type_id` int unsigned DEFAULT NULL,
  `publish_date` date DEFAULT NULL,
  `digital_url` varchar(250) DEFAULT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`issue_id`),
  KEY `idx_journal_id` (`journal_id`),
  KEY `idx_volume_id` (`volume_id`),
  KEY `idx_publish_date` (`publish_date`),
  CONSTRAINT `FK_issue_journal_id` FOREIGN KEY (`journal_id`) REFERENCES `journal` (`journal_id`) ON DELETE CASCADE,
  CONSTRAINT `FK_issue_volume_id` FOREIGN KEY (`volume_id`) REFERENCES `volume` (`volume_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `issue_settings`
--

DROP TABLE IF EXISTS `issue_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `issue_settings` (
  `issue_id` bigint unsigned NOT NULL,
  `locale` varchar(5) NOT NULL DEFAULT 'en_US',
  `setting_name` varchar(255) NOT NULL,
  `setting_value` text,
  `setting_type` varchar(6) NOT NULL DEFAULT 'String',
  UNIQUE KEY `issue_settings_pkey` (`issue_id`,`locale`,`setting_name`),
  KEY `issue_settings_issue_id` (`issue_id`),
  CONSTRAINT `FK_issue_settings_issue_id` FOREIGN KEY (`issue_id`) REFERENCES `issue` (`issue_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `journal`
--

DROP TABLE IF EXISTS `journal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `journal` (
  `journal_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `journal_code` varchar(255) NOT NULL,
  `doi` varchar(255) DEFAULT NULL,
  `journal_title` varchar(500) NOT NULL,
  `journal_sub_title` varchar(500) DEFAULT NULL,
  `journal_short_name` varchar(255) DEFAULT NULL,
  `publisher_id` bigint unsigned NOT NULL,
  `publisher_code` varchar(255) NOT NULL,
  `print_issn` varchar(9) DEFAULT NULL,
  `e_issn` varchar(9) DEFAULT NULL,
  `journal_logo` varchar(100) DEFAULT NULL,
  `access_type_id` int unsigned NOT NULL,
  `license_type_id` int unsigned DEFAULT NULL,
  `no_of_issues` varchar(50) DEFAULT NULL,
  `Article_of_month` enum('Y','N') DEFAULT 'N',
  `featured` enum('Y','N') NOT NULL DEFAULT 'N',
  `available_in_oai` enum('Y','N') DEFAULT 'Y',
  `available_in_repec` enum('Y','N') DEFAULT 'Y',
  `show_on_ui` enum('Y','N') NOT NULL DEFAULT 'Y',
  `changed_journal_id` bigint unsigned NOT NULL DEFAULT '0',
  `pub_type` enum('JOURNAL','PROCEEDING') DEFAULT 'JOURNAL',
  `journal_url` varchar(255) DEFAULT NULL,
  `rating` enum('1','2','3','4','5') DEFAULT NULL,
  `downloadable` enum('Y','N') DEFAULT 'Y',
  `popup_slide_time` int DEFAULT '10',
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_open_access` enum('Y','N') DEFAULT 'Y',
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`journal_id`),
  UNIQUE KEY `journal_code_UNIQUE` (`journal_code`),
  KEY `idx_publisher_id` (`publisher_id`),
  KEY `idx_changed_journal_id` (`changed_journal_id`),
  KEY `idx_display_status` (`display_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `journal_banner`
--

DROP TABLE IF EXISTS `journal_banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `journal_banner` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `journal_id` bigint unsigned DEFAULT NULL,
  `seq_no` int DEFAULT '1',
  `img_name` varchar(255) NOT NULL,
  `banner_title` varchar(255) DEFAULT NULL,
  `url_link` varchar(500) DEFAULT NULL,
  `banner_text` text,
  `display_status` enum('0','1','2') NOT NULL DEFAULT '1',
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int DEFAULT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_journal_banner_journal_id` (`journal_id`),
  CONSTRAINT `FK_journal_banner_journal_id` FOREIGN KEY (`journal_id`) REFERENCES `journal` (`journal_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `journal_image`
--

DROP TABLE IF EXISTS `journal_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `journal_image` (
  `journal_image_id` int NOT NULL AUTO_INCREMENT,
  `journal_id` int NOT NULL,
  `seq_no` int DEFAULT '1',
  `popup_title` varchar(255) DEFAULT NULL,
  `url_link` text,
  `popup_text` longtext,
  `journal_image` varchar(255) NOT NULL,
  `created_by` int DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int DEFAULT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') NOT NULL DEFAULT '1',
  PRIMARY KEY (`journal_image_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `journal_impact_factor`
--

DROP TABLE IF EXISTS `journal_impact_factor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `journal_impact_factor` (
  `impact_factor_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `journal_id` bigint unsigned NOT NULL,
  `factor_type` varchar(50) NOT NULL,
  `factor_year` varchar(4) DEFAULT NULL,
  `factor_value` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`impact_factor_id`),
  KEY `idx_journal_id` (`journal_id`),
  CONSTRAINT `FK_journal_impact_factor_journal_id` FOREIGN KEY (`journal_id`) REFERENCES `journal` (`journal_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `journal_metrics_settings`
--

DROP TABLE IF EXISTS `journal_metrics_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `journal_metrics_settings` (
  `journal_id` bigint unsigned NOT NULL,
  `locale` varchar(5) NOT NULL DEFAULT 'en_US',
  `setting_name` varchar(255) NOT NULL,
  `setting_value` text,
  `setting_type` varchar(6) NOT NULL DEFAULT 'String',
  UNIQUE KEY `journal_metrics_settings_pkey` (`journal_id`,`locale`,`setting_name`),
  KEY `journal_metrics_settings_journal_id` (`journal_id`),
  CONSTRAINT `FK_journal_metrics_settings_journal_id` FOREIGN KEY (`journal_id`) REFERENCES `journal` (`journal_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `journal_settings`
--

DROP TABLE IF EXISTS `journal_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `journal_settings` (
  `journal_id` bigint unsigned NOT NULL,
  `locale` varchar(5) NOT NULL DEFAULT 'en_US',
  `setting_name` varchar(255) NOT NULL,
  `setting_value` mediumtext,
  `setting_type` varchar(6) NOT NULL DEFAULT 'String',
  UNIQUE KEY `journal_settings_pkey` (`journal_id`,`locale`,`setting_name`),
  KEY `journal_settings_journal_id` (`journal_id`),
  CONSTRAINT `FK_journal_settings_journal_id` FOREIGN KEY (`journal_id`) REFERENCES `journal` (`journal_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `keywords`
--

DROP TABLE IF EXISTS `keywords`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `keywords` (
  `keyword_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `keyword_type` enum('Book','Chapter','Article','Video','Case') NOT NULL,
  `generic_id` bigint unsigned NOT NULL,
  `keyword_value` varchar(300) NOT NULL,
  PRIMARY KEY (`keyword_id`),
  UNIQUE KEY `keyword_id` (`keyword_id`),
  KEY `idx_k_keywordtype` (`keyword_type`),
  KEY `idx_k_genericID` (`generic_id`),
  FULLTEXT KEY `keyword_value_fulltext_index` (`keyword_value`),
  FULLTEXT KEY `ft_keywords_value` (`keyword_value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_article_author`
--

DROP TABLE IF EXISTS `map_article_author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_article_author` (
  `article_id` bigint unsigned NOT NULL,
  `author_id` bigint unsigned NOT NULL,
  `corresp_author` varchar(1) DEFAULT 'N',
  `seq_no` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`article_id`,`author_id`),
  KEY `FK_map_author_article_id` (`article_id`),
  KEY `FK_map_article_author_id` (`author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_article_bundle`
--

DROP TABLE IF EXISTS `map_article_bundle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_article_bundle` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `bundle_id` bigint unsigned NOT NULL,
  `article_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_ARTICLE_ARTICLE_ID` (`article_id`),
  KEY `FK_BUNDLE_BUNDLE_ID` (`bundle_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_article_citation`
--

DROP TABLE IF EXISTS `map_article_citation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_article_citation` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `article_id` bigint unsigned NOT NULL,
  `citation_id` int unsigned NOT NULL,
  `citation_code` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `article_id` (`article_id`,`citation_id`),
  KEY `FK_map_citation_article_id` (`article_id`),
  KEY `FK_map_article_citation_id` (`citation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_article_taxonomy`
--

DROP TABLE IF EXISTS `map_article_taxonomy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_article_taxonomy` (
  `article_id` bigint unsigned NOT NULL,
  `taxonomy_id` int unsigned NOT NULL,
  `parent_taxonomy_id` int unsigned DEFAULT NULL,
  KEY `FK_tbl_article_taxonomy_map_taxonomy_id` (`taxonomy_id`),
  KEY `FK_tbl_article_taxonomy_map_article_id` (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_article_version`
--

DROP TABLE IF EXISTS `map_article_version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_article_version` (
  `article_id` bigint unsigned NOT NULL,
  `article_version_id` bigint unsigned NOT NULL,
  `version_code` varchar(10) DEFAULT NULL,
  `version_description` varchar(100) DEFAULT NULL,
  KEY `FK_map_article_version_article_id` (`article_id`),
  KEY `FK_map_article_version_article_version_id` (`article_version_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_book_author`
--

DROP TABLE IF EXISTS `map_book_author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_book_author` (
  `book_id` bigint unsigned NOT NULL,
  `author_id` bigint unsigned NOT NULL,
  `corresp_author` varchar(1) DEFAULT 'N',
  `seq_no` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`book_id`,`author_id`),
  KEY `FK_map_author_book_id` (`book_id`),
  KEY `FK_map_book_author_id` (`author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_book_case`
--

DROP TABLE IF EXISTS `map_book_case`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_book_case` (
  `book_id` bigint unsigned NOT NULL,
  `book_case_id` bigint unsigned NOT NULL,
  UNIQUE KEY `book_id` (`book_id`,`book_case_id`),
  KEY `FK_map_case_book_id` (`book_id`),
  KEY `FK_map_case_case_id` (`book_case_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_book_case_author`
--

DROP TABLE IF EXISTS `map_book_case_author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_book_case_author` (
  `book_case_id` bigint unsigned NOT NULL,
  `author_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`book_case_id`,`author_id`),
  KEY `FK_map_author_book_case_id` (`book_case_id`),
  KEY `FK_map_book_case_author_id` (`author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_book_editor`
--

DROP TABLE IF EXISTS `map_book_editor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_book_editor` (
  `publisher_id` bigint unsigned NOT NULL,
  `book_id` bigint unsigned NOT NULL,
  `editor_type_id` int unsigned NOT NULL,
  `editor_id` int unsigned NOT NULL,
  `seq_no` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`publisher_id`,`book_id`,`editor_id`,`editor_type_id`),
  KEY `FK_map_book_editor_publisher_id` (`publisher_id`),
  KEY `FK_map_book_editor_book_id` (`book_id`),
  KEY `FK_map_book_editor_editor_type_id` (`editor_type_id`),
  KEY `FK_map_book_editor_id` (`editor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_book_mcq`
--

DROP TABLE IF EXISTS `map_book_mcq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_book_mcq` (
  `book_id` bigint unsigned NOT NULL,
  `mcq_id` bigint unsigned NOT NULL,
  UNIQUE KEY `book_id` (`book_id`,`mcq_id`),
  KEY `FK_map_mcq_book_id` (`book_id`),
  KEY `FK_map_mcq_mcq_id` (`mcq_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_book_society`
--

DROP TABLE IF EXISTS `map_book_society`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_book_society` (
  `book_id` bigint unsigned NOT NULL,
  `society_id` int unsigned NOT NULL,
  `is_primary` enum('Y','N') DEFAULT 'Y',
  PRIMARY KEY (`book_id`,`society_id`),
  KEY `FK_map_book_society_society_id` (`society_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_book_taxonomy`
--

DROP TABLE IF EXISTS `map_book_taxonomy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_book_taxonomy` (
  `book_id` bigint unsigned NOT NULL,
  `taxonomy_id` int unsigned NOT NULL,
  `parent_taxonomy_id` int DEFAULT NULL,
  KEY `FK_tbl_book_taxonomy_map_taxonomy_id` (`taxonomy_id`),
  KEY `FK_tbl_book_taxonomy_map_book_id` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_book_video`
--

DROP TABLE IF EXISTS `map_book_video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_book_video` (
  `book_id` bigint unsigned NOT NULL,
  `video_id` bigint unsigned NOT NULL,
  UNIQUE KEY `book_id` (`book_id`,`video_id`),
  KEY `FK_map_video_book_id` (`book_id`),
  KEY `FK_map_video_video_id` (`video_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_book_volume_section`
--

DROP TABLE IF EXISTS `map_book_volume_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_book_volume_section` (
  `book_id` bigint unsigned NOT NULL,
  `volume_id` bigint unsigned NOT NULL,
  `section_id` bigint unsigned NOT NULL,
  KEY `FK_map_book_volume_sec_book_id` (`book_id`),
  KEY `FK_map_book_volume_sec_volume_id` (`volume_id`),
  KEY `FK_map_book_volume_sec_section_id` (`section_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_case_keyword`
--

DROP TABLE IF EXISTS `map_case_keyword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_case_keyword` (
  `map_case_keyword_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `book_case_id` bigint unsigned NOT NULL,
  `keyword` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`map_case_keyword_id`),
  UNIQUE KEY `map_case_keyword_id` (`map_case_keyword_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_case_taxonomy`
--

DROP TABLE IF EXISTS `map_case_taxonomy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_case_taxonomy` (
  `book_case_id` bigint unsigned NOT NULL,
  `taxonomy_id` int unsigned NOT NULL,
  `parent_taxonomy_id` int unsigned NOT NULL,
  KEY `FK_tbl_case_taxonomy_map_id` (`book_case_id`),
  KEY `FK_tbl_case_taxonomy_case_id` (`taxonomy_id`),
  KEY `FK_tbl_case_parent_map_case_id` (`parent_taxonomy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_chapter_author`
--

DROP TABLE IF EXISTS `map_chapter_author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_chapter_author` (
  `chapter_id` bigint unsigned NOT NULL,
  `author_id` bigint unsigned NOT NULL,
  `corresp_author` varchar(1) DEFAULT 'N',
  `seq_no` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`chapter_id`,`author_id`),
  KEY `FK_map_author_chapter_id` (`chapter_id`),
  KEY `FK_map_chapter_author_id` (`author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_exam_result_mcq`
--

DROP TABLE IF EXISTS `map_exam_result_mcq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_exam_result_mcq` (
  `exam_result_id` bigint unsigned NOT NULL,
  `mcq_id` bigint unsigned NOT NULL,
  `sequence_number` int unsigned NOT NULL,
  `given_answer` bigint DEFAULT NULL,
  KEY `FK_map_mcq_exam_result_id` (`exam_result_id`),
  KEY `FK_map_mcq_result_mcq_id` (`mcq_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_journal_editor`
--

DROP TABLE IF EXISTS `map_journal_editor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_journal_editor` (
  `map_journal_editor_id` bigint NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `journal_id` bigint unsigned NOT NULL,
  `editor_id` int unsigned NOT NULL,
  `seq_no` tinyint NOT NULL DEFAULT '1',
  `journal_editor_type_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`publisher_id`,`journal_id`,`editor_id`,`journal_editor_type_id`),
  UNIQUE KEY `map_journal_editor_id` (`map_journal_editor_id`),
  KEY `FK_map_journal_editor_publisher_id` (`publisher_id`),
  KEY `FK_map_journal_editor_journal_id` (`journal_id`),
  KEY `FK_map_journal_editor_id` (`editor_id`),
  KEY `FK_map_journal_editor_editor_type_id` (`journal_editor_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_journal_editor_type`
--

DROP TABLE IF EXISTS `map_journal_editor_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_journal_editor_type` (
  `journal_editor_type_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `editor_type_id` int unsigned NOT NULL,
  `journal_id` bigint unsigned NOT NULL,
  `seq_no` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`journal_editor_type_id`),
  UNIQUE KEY `journal_editor_type_id` (`journal_editor_type_id`),
  KEY `map_editor_type_journal_editor_type_id` (`editor_type_id`),
  KEY `map_editor_type_journal_editor_journal_id` (`journal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_journal_society`
--

DROP TABLE IF EXISTS `map_journal_society`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_journal_society` (
  `journal_id` bigint unsigned NOT NULL,
  `society_id` int unsigned NOT NULL,
  `is_primary` enum('Y','N') DEFAULT 'Y',
  PRIMARY KEY (`journal_id`,`society_id`),
  KEY `FK_map_journal_society_journal_id` (`journal_id`),
  KEY `FK_map_journal_society_society_id` (`society_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_journal_taxonomy`
--

DROP TABLE IF EXISTS `map_journal_taxonomy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_journal_taxonomy` (
  `journal_id` bigint unsigned NOT NULL,
  `taxonomy_id` int unsigned NOT NULL,
  `parent_taxonomy_id` int unsigned DEFAULT NULL,
  KEY `FK_tbl_journal_taxonomy_map_taxonomy_id` (`taxonomy_id`),
  KEY `FK_tbl_journal_taxonomy_map_journal_id` (`journal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_mcq_chapter`
--

DROP TABLE IF EXISTS `map_mcq_chapter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_mcq_chapter` (
  `mcq_id` bigint unsigned NOT NULL,
  `chapter_id` bigint unsigned DEFAULT NULL,
  `start_page` varchar(45) DEFAULT NULL,
  `end_page` varchar(45) DEFAULT NULL,
  `display_status` enum('0','1','2') DEFAULT '1',
  KEY `FK_tbl_chapter_mcq_id` (`mcq_id`),
  KEY `FK_map_chapter_chapter_id` (`chapter_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_mcq_taxonomy`
--

DROP TABLE IF EXISTS `map_mcq_taxonomy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_mcq_taxonomy` (
  `mcq_id` bigint unsigned NOT NULL,
  `taxonomy_id` int unsigned NOT NULL,
  `parent_taxonomy_id` int unsigned NOT NULL DEFAULT '0',
  KEY `FK_tbl_mcq_taxonomy_map_mcq_id` (`mcq_id`),
  KEY `FK_tbl_mcq_taxonomy_map_taxonomy_id` (`taxonomy_id`),
  KEY `FK_tbl_mcq_parent_map_taxonomy_id` (`parent_taxonomy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_section_chapter`
--

DROP TABLE IF EXISTS `map_section_chapter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_section_chapter` (
  `section_id` bigint unsigned NOT NULL,
  `chapter_id` bigint unsigned NOT NULL,
  UNIQUE KEY `section_id` (`section_id`,`chapter_id`),
  KEY `FK_map_section_chapter_section_id` (`section_id`),
  KEY `FK_map_section_chapter_chapter_id` (`chapter_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_section_video`
--

DROP TABLE IF EXISTS `map_section_video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_section_video` (
  `section_id` bigint unsigned NOT NULL,
  `video_id` bigint unsigned NOT NULL,
  UNIQUE KEY `section_id` (`section_id`,`video_id`),
  KEY `FK_map_section_video_section_id` (`section_id`),
  KEY `FK_map_section_video_video_id` (`video_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_video_author`
--

DROP TABLE IF EXISTS `map_video_author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_video_author` (
  `video_id` bigint unsigned NOT NULL,
  `author_id` bigint unsigned NOT NULL,
  `corresp_author` varchar(1) DEFAULT 'N',
  `seq_no` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`video_id`,`author_id`),
  KEY `FK_map_author_video_id` (`video_id`),
  KEY `FK_map_video_author_id` (`author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_video_journal`
--

DROP TABLE IF EXISTS `map_video_journal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_video_journal` (
  `video_id` bigint unsigned NOT NULL,
  `journal_id` bigint unsigned NOT NULL,
  `issue_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`video_id`,`journal_id`,`issue_id`),
  KEY `FK_map_journal_video_video_id` (`video_id`),
  KEY `FK_map_journal_video_id` (`journal_id`),
  KEY `FK_map_issue_issue_id` (`issue_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_volume_chapter`
--

DROP TABLE IF EXISTS `map_volume_chapter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_volume_chapter` (
  `volume_id` bigint unsigned NOT NULL,
  `chapter_id` bigint unsigned NOT NULL,
  UNIQUE KEY `volume_id` (`volume_id`,`chapter_id`),
  KEY `FK_map_volume_book_chapter_id` (`volume_id`),
  KEY `FK_map_volume_chapter_id` (`chapter_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `map_volume_video`
--

DROP TABLE IF EXISTS `map_volume_video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `map_volume_video` (
  `volume_id` bigint unsigned NOT NULL,
  `video_id` bigint unsigned NOT NULL,
  UNIQUE KEY `volume_id` (`volume_id`,`video_id`),
  KEY `FK_map_volume_book_id` (`volume_id`),
  KEY `FK_map_volume_video_id` (`video_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mcq`
--

DROP TABLE IF EXISTS `mcq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mcq` (
  `mcq_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `mcq_description` text,
  `image_based` enum('Y','N') NOT NULL DEFAULT 'N',
  `multiple_answer` enum('Y','N') NOT NULL DEFAULT 'N',
  `created_by` int unsigned DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned DEFAULT NULL,
  `updated_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`mcq_id`),
  UNIQUE KEY `mcq_id` (`mcq_id`),
  KEY `FK_tbl_mcq_publisher_id` (`publisher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mcq_answer`
--

DROP TABLE IF EXISTS `mcq_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mcq_answer` (
  `mcq_answer_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `mcq_id` bigint unsigned NOT NULL,
  `answer_description` text NOT NULL,
  `correct_answer` enum('Y','N') DEFAULT NULL,
  `answer_sequence` varchar(5) DEFAULT NULL,
  `display_status` enum('0','1') NOT NULL DEFAULT '1',
  PRIMARY KEY (`mcq_answer_id`),
  UNIQUE KEY `mcq_answer_id` (`mcq_answer_id`),
  KEY `FK_mcq_answer_mcq_id` (`mcq_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mcq_answer_images`
--

DROP TABLE IF EXISTS `mcq_answer_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mcq_answer_images` (
  `mcq_answer_image_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `mcq_answer_id` bigint unsigned NOT NULL,
  `image_file_name` varchar(45) DEFAULT NULL,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`mcq_answer_image_id`),
  UNIQUE KEY `mcq_answer_image_id` (`mcq_answer_image_id`),
  KEY `FK_tbl_image_mcq_answer_id` (`mcq_answer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mcq_exam_result`
--

DROP TABLE IF EXISTS `mcq_exam_result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mcq_exam_result` (
  `exam_result_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `speciality` varchar(100) NOT NULL,
  `total_questions` int unsigned NOT NULL,
  `unattempted_questions` int unsigned NOT NULL,
  `attempted_questions` int unsigned NOT NULL,
  `correct_answers` int unsigned NOT NULL,
  `incorrect_answers` int unsigned NOT NULL,
  `exam_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`exam_result_id`),
  UNIQUE KEY `exam_result_id` (`exam_result_id`),
  KEY `FK_mcq_result_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mcq_images`
--

DROP TABLE IF EXISTS `mcq_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mcq_images` (
  `mcq_image_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `mcq_id` bigint unsigned NOT NULL,
  `image_file_name` varchar(45) DEFAULT NULL,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`mcq_image_id`),
  UNIQUE KEY `mcq_image_id` (`mcq_image_id`),
  KEY `FK_tbl_image_mcq_id` (`mcq_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reader_annotations`
--

DROP TABLE IF EXISTS `reader_annotations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reader_annotations` (
  `annotation_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `annotation_for` enum('Chapter','Article') DEFAULT 'Chapter',
  `annotation_type` enum('Highlight','Annotation') DEFAULT 'Highlight',
  `generic_id` bigint unsigned NOT NULL COMMENT 'Chapter or Article Id',
  `user_id` int unsigned NOT NULL,
  `div_id` varchar(9) DEFAULT NULL,
  `selected_text` text,
  `annotation_text` text,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`annotation_id`),
  KEY `FK_reader_annotation_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `reader_notes`
--

DROP TABLE IF EXISTS `reader_notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reader_notes` (
  `note_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `note_type` enum('Chapter','Article') DEFAULT 'Chapter',
  `content_type` enum('Note','Bookmark') DEFAULT 'Note',
  `generic_id` bigint unsigned NOT NULL COMMENT 'Chapter or Article Id',
  `user_id` int unsigned NOT NULL,
  `page_no` varchar(9) DEFAULT NULL,
  `notes_text_start` varchar(20) DEFAULT NULL,
  `notes_text_end` varchar(20) DEFAULT NULL,
  `title` varchar(30) DEFAULT NULL,
  `note_data` text,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`note_id`),
  KEY `FK_reader_note_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ref_alert_type`
--

DROP TABLE IF EXISTS `ref_alert_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_alert_type` (
  `alert_type_id` tinyint NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `alert_type` varchar(255) NOT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`alert_type_id`),
  KEY `FK_ref_alert_type_publisher_id` (`publisher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ref_article_status`
--

DROP TABLE IF EXISTS `ref_article_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_article_status` (
  `article_status_id` tinyint NOT NULL AUTO_INCREMENT,
  `article_status_name` varchar(100) NOT NULL,
  PRIMARY KEY (`article_status_id`),
  KEY `idx_article_status_name` (`article_status_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ref_article_type`
--

DROP TABLE IF EXISTS `ref_article_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_article_type` (
  `article_type_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `article_type` varchar(255) NOT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') NOT NULL DEFAULT '1',
  PRIMARY KEY (`article_type_id`),
  UNIQUE KEY `article_type_id` (`article_type_id`),
  KEY `FK_tbl_article_type_publisher_id` (`publisher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ref_editor_type`
--

DROP TABLE IF EXISTS `ref_editor_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_editor_type` (
  `editor_type_id` int unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `editor_type` varchar(255) DEFAULT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`editor_type_id`),
  KEY `FK_ref_editor_type_publisher_id` (`publisher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ref_rating_type`
--

DROP TABLE IF EXISTS `ref_rating_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_rating_type` (
  `rating_type_id` tinyint NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `rating_type` varchar(50) NOT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`rating_type_id`),
  KEY `FK_ref_rating_type_publisher_id` (`publisher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ref_supp_info_type`
--

DROP TABLE IF EXISTS `ref_supp_info_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ref_supp_info_type` (
  `supp_info_type_id` tinyint NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `supp_info_type` varchar(45) NOT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') NOT NULL DEFAULT '1',
  PRIMARY KEY (`supp_info_type_id`),
  KEY `FK_supp_info_type_publisher_id` (`publisher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `supp_info`
--

DROP TABLE IF EXISTS `supp_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supp_info` (
  `supp_info_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `supp_info_type_id` tinyint NOT NULL,
  `ext_generic_id` bigint unsigned NOT NULL,
  `title` varchar(100) NOT NULL,
  `filename` varchar(100) NOT NULL,
  `filesize` int unsigned DEFAULT NULL,
  `seq_no` tinyint NOT NULL DEFAULT '1',
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') NOT NULL DEFAULT '1',
  PRIMARY KEY (`supp_info_id`),
  UNIQUE KEY `supp_info_id` (`supp_info_id`),
  KEY `FK_tbl_supp_info_publisher_id` (`publisher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `taxonomy`
--

DROP TABLE IF EXISTS `taxonomy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taxonomy` (
  `taxonomy_id` int unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `level` int unsigned NOT NULL,
  `subject_name` varchar(250) NOT NULL,
  `subject_code` varchar(250) DEFAULT NULL,
  `is_featured` enum('Y','N') NOT NULL DEFAULT 'N',
  `locale` varchar(5) NOT NULL DEFAULT 'en_US',
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`taxonomy_id`),
  KEY `FK_tbl_taxonomy_publisher_id` (`publisher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_alert`
--

DROP TABLE IF EXISTS `user_alert`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_alert` (
  `user_alert_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `publisher_id` bigint unsigned NOT NULL,
  `alert_type_id` tinyint NOT NULL,
  `ext_generic_id` bigint unsigned DEFAULT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_alert_id`),
  UNIQUE KEY `user_alert_id` (`user_alert_id`),
  KEY `FK_tbl_alert_user_id` (`user_id`),
  KEY `FK_tbl_alert_publisher_id` (`publisher_id`),
  KEY `FK_tbl_user_alert_type_id` (`alert_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_favourite`
--

DROP TABLE IF EXISTS `user_favourite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_favourite` (
  `favourite_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `publisher_id` bigint unsigned NOT NULL,
  `favourite_type` enum('Journal','Issue','Article','Book','Chapter','Video','Video Atlas','Case') NOT NULL,
  `favourite_type_id` bigint unsigned DEFAULT NULL,
  `created_by` int unsigned DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned DEFAULT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`favourite_id`),
  UNIQUE KEY `favourite_id` (`favourite_id`),
  KEY `FK_tbl_favourite_user_id` (`user_id`),
  KEY `FK_tbl_favourite_publisher_id` (`publisher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_saved_search`
--

DROP TABLE IF EXISTS `user_saved_search`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_saved_search` (
  `search_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `publisher_id` bigint unsigned NOT NULL,
  `search_keyword` varchar(100) DEFAULT NULL,
  `search_filter` varchar(500) DEFAULT NULL,
  `created_by` int unsigned DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned DEFAULT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`search_id`),
  UNIQUE KEY `search_id` (`search_id`),
  KEY `FK_tbl_search_user_id` (`user_id`),
  KEY `FK_tbl_search_publisher_id` (`publisher_id`)
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
-- Temporary view structure for view `v_ref_access_type`
--

DROP TABLE IF EXISTS `v_ref_access_type`;
/*!50001 DROP VIEW IF EXISTS `v_ref_access_type`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_ref_access_type` AS SELECT 
 1 AS `access_type_id`,
 1 AS `publisher_id`,
 1 AS `access_type`,
 1 AS `display_status`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_ref_license_type`
--

DROP TABLE IF EXISTS `v_ref_license_type`;
/*!50001 DROP VIEW IF EXISTS `v_ref_license_type`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_ref_license_type` AS SELECT 
 1 AS `license_type_id`,
 1 AS `publisher_id`,
 1 AS `license_type`,
 1 AS `license_type_url`,
 1 AS `license_logo`,
 1 AS `description`,
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
 1 AS `last_name`,
 1 AS `created_date`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `video`
--

DROP TABLE IF EXISTS `video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `video` (
  `video_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(500) NOT NULL,
  `file_name` varchar(150) NOT NULL,
  `thumbnail_name` varchar(150) DEFAULT NULL,
  `file_size` bigint unsigned DEFAULT NULL,
  `description` text,
  `access_type_id` int unsigned NOT NULL,
  `author_name` varchar(500) DEFAULT NULL,
  `downloadable` enum('Y','N') DEFAULT 'Y',
  `display_status` enum('0','1','2') DEFAULT '1',
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`video_id`),
  UNIQUE KEY `video_id` (`video_id`),
  KEY `FK_VIDEO_ACCESS_TYPE_ID` (`access_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `video_report_track`
--

DROP TABLE IF EXISTS `video_report_track`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `video_report_track` (
  `video_report_track_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `video_id` bigint unsigned NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`video_report_track_id`),
  UNIQUE KEY `video_report_track_id` (`video_report_track_id`),
  KEY `FK_video_report_track_video_id` (`video_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `volume`
--

DROP TABLE IF EXISTS `volume`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `volume` (
  `volume_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` bigint unsigned NOT NULL,
  `journal_id` bigint unsigned NOT NULL,
  `volume_no` varchar(50) NOT NULL,
  `volume_name` varchar(100) NOT NULL,
  `year` smallint DEFAULT NULL,
  `description` text,
  `access_type_id` int unsigned NOT NULL,
  `license_type_id` int unsigned DEFAULT NULL,
  `created_by` int unsigned NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int unsigned NOT NULL,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `display_status` enum('0','1','2') DEFAULT '1',
  PRIMARY KEY (`volume_id`),
  KEY `idx_journal_id` (`journal_id`),
  KEY `idx_year` (`year`),
  CONSTRAINT `FK_volume_journal_id` FOREIGN KEY (`journal_id`) REFERENCES `journal` (`journal_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Final view structure for view `v_ref_access_type`
--

/*!50001 DROP VIEW IF EXISTS `v_ref_access_type`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_ref_access_type` AS select `reference_service_db`.`ref_access_type`.`access_type_id` AS `access_type_id`,`reference_service_db`.`ref_access_type`.`publisher_id` AS `publisher_id`,`reference_service_db`.`ref_access_type`.`access_type` AS `access_type`,`reference_service_db`.`ref_access_type`.`display_status` AS `display_status` from `reference_service_db`.`ref_access_type` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_ref_license_type`
--

/*!50001 DROP VIEW IF EXISTS `v_ref_license_type`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_ref_license_type` AS select `reference_service_db`.`ref_license_type`.`license_type_id` AS `license_type_id`,`reference_service_db`.`ref_license_type`.`publisher_id` AS `publisher_id`,`reference_service_db`.`ref_license_type`.`license_type` AS `license_type`,`reference_service_db`.`ref_license_type`.`license_type_url` AS `license_type_url`,`reference_service_db`.`ref_license_type`.`license_logo` AS `license_logo`,`reference_service_db`.`ref_license_type`.`description` AS `description`,`reference_service_db`.`ref_license_type`.`display_status` AS `display_status` from `reference_service_db`.`ref_license_type` */;
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
/*!50001 VIEW `v_user` AS select `auth_service_db`.`user`.`user_id` AS `user_id`,`auth_service_db`.`user`.`username` AS `username`,`auth_service_db`.`user`.`email` AS `email`,`auth_service_db`.`user`.`first_name` AS `first_name`,`auth_service_db`.`user`.`last_name` AS `last_name`,`auth_service_db`.`user`.`created_date` AS `created_date` from `auth_service_db`.`user` */;
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
