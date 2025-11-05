-- MySQL dump 10.13  Distrib 8.0.43, for Linux (x86_64)
--
-- Host: localhost    Database: operations_db
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
-- Table structure for table `article_cron_process`
--

DROP TABLE IF EXISTS `article_cron_process`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_cron_process` (
  `filename` varchar(500) DEFAULT NULL,
  `in_process` enum('Y','N') DEFAULT 'N',
  `complete_status` enum('Y','N') DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `article_cron_process_tracking`
--

DROP TABLE IF EXISTS `article_cron_process_tracking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_cron_process_tracking` (
  `in_process` enum('Y','N') DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cron_article_file_error`
--

DROP TABLE IF EXISTS `cron_article_file_error`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cron_article_file_error` (
  `file_error_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `file_history_id` bigint unsigned NOT NULL,
  `error_code` varchar(50) DEFAULT NULL,
  `error_description` text NOT NULL,
  PRIMARY KEY (`file_error_id`),
  UNIQUE KEY `file_error_id` (`file_error_id`),
  KEY `FK_cron_article_file_error_history_id` (`file_history_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cron_article_file_history`
--

DROP TABLE IF EXISTS `cron_article_file_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cron_article_file_history` (
  `file_history_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `cron_file_id` bigint unsigned NOT NULL,
  `publisher_id` bigint unsigned NOT NULL,
  `journal_id` bigint unsigned NOT NULL,
  `article_doi` varchar(100) NOT NULL,
  `article_title` varchar(500) NOT NULL,
  `article_process_status` enum('I','S','F') NOT NULL COMMENT 'I-In Progress, F- Failed, S-Success',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`file_history_id`),
  UNIQUE KEY `file_history_id` (`file_history_id`),
  KEY `FK_tbl_article_file_history_publisher_id` (`publisher_id`),
  KEY `FK_tbl_article_file_history_journal_id` (`journal_id`),
  KEY `FK_tbl_article_file_history_file_id` (`cron_file_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cron_book_file_history`
--

DROP TABLE IF EXISTS `cron_book_file_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cron_book_file_history` (
  `file_history_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `cron_file_id` bigint unsigned NOT NULL,
  `publisher_id` bigint unsigned NOT NULL,
  `isbn` bigint unsigned NOT NULL,
  `message` varchar(500) NOT NULL,
  `book_process_status` enum('I','S','F') NOT NULL COMMENT 'I-In Progress, F- Failed, S-Success',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`file_history_id`),
  UNIQUE KEY `file_history_id` (`file_history_id`),
  KEY `FK_tbl_book_file_history_publisher_id` (`publisher_id`),
  KEY `FK_tbl_book_file_history_file_id` (`cron_file_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cron_case_file_history`
--

DROP TABLE IF EXISTS `cron_case_file_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cron_case_file_history` (
  `file_history_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `cron_file_id` bigint unsigned NOT NULL,
  `publisher_id` bigint unsigned NOT NULL,
  `case_title` varchar(200) NOT NULL,
  `message` varchar(500) NOT NULL,
  `case_process_status` enum('I','S','F') NOT NULL COMMENT 'I-In Progress, F- Failed, S-Success',
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`file_history_id`),
  UNIQUE KEY `file_history_id` (`file_history_id`),
  KEY `FK_tbl_case_file_history_publisher_id` (`publisher_id`),
  KEY `FK_tbl_case_file_history_file_id` (`cron_file_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cron_file_details`
--

DROP TABLE IF EXISTS `cron_file_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cron_file_details` (
  `cron_file_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `cron_id` bigint unsigned NOT NULL,
  `file_name` varchar(90) NOT NULL,
  `file_type` varchar(255) DEFAULT NULL,
  `file_size` bigint unsigned NOT NULL,
  `original_file_name` varchar(127) DEFAULT NULL,
  `file_process_status` enum('I','S','F') NOT NULL COMMENT 'I-In Progress, F- Failed, S-Success',
  `remarks` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`cron_file_id`),
  UNIQUE KEY `cron_file_id` (`cron_file_id`),
  KEY `fk_cron_temporary_files_cron_id` (`cron_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cron_process`
--

DROP TABLE IF EXISTS `cron_process`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cron_process` (
  `id` varchar(500) DEFAULT NULL,
  `in_process` enum('Y','N') DEFAULT 'N',
  `complete_status` enum('Y','N') DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cron_process_tracking`
--

DROP TABLE IF EXISTS `cron_process_tracking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cron_process_tracking` (
  `in_process` enum('Y','N') DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cronjob`
--

DROP TABLE IF EXISTS `cronjob`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cronjob` (
  `cron_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `cron_status` enum('0','1','2','3') NOT NULL COMMENT '0-Not Started, 1-In Progress,2-Complete,3-Failed',
  `remarks` varchar(500) DEFAULT NULL,
  `cron_type` enum('Article','Book','BookCase','ArticleHtml','ArticleAbstract') DEFAULT NULL,
  `start_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `end_date` datetime DEFAULT NULL,
  `error_trace` text,
  PRIMARY KEY (`cron_id`),
  UNIQUE KEY `cron_id` (`cron_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `migration_error`
--

DROP TABLE IF EXISTS `migration_error`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migration_error` (
  `error_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `transaction_id` int unsigned DEFAULT NULL,
  `row_no` int unsigned DEFAULT NULL,
  `error_type` varchar(50) DEFAULT NULL,
  `error_message` varchar(50) DEFAULT NULL,
  `error_details` longtext,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`error_id`),
  UNIQUE KEY `error_id` (`error_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `temp_articles`
--

DROP TABLE IF EXISTS `temp_articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temp_articles` (
  `temp_id` int NOT NULL AUTO_INCREMENT,
  `ISSUEID` text NOT NULL,
  `ID` text NOT NULL,
  `HEADING` text NOT NULL,
  `NAME` text NOT NULL,
  `AUTHOR` text NOT NULL,
  `PAGENO` text NOT NULL,
  `SIZE` text NOT NULL,
  `DOI` text NOT NULL,
  `PATH` text NOT NULL,
  `TYPE` text NOT NULL,
  `ABSTRACT` text NOT NULL,
  `CITE` text NOT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `article_id` bigint DEFAULT '0',
  PRIMARY KEY (`temp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `temp_books`
--

DROP TABLE IF EXISTS `temp_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temp_books` (
  `ID` double DEFAULT NULL,
  `BOOKSERIESID` varchar(100) DEFAULT NULL,
  `ISBN` double DEFAULT NULL,
  `EISBN` double DEFAULT NULL,
  `TITLE` varchar(255) DEFAULT NULL,
  `DOI` varchar(100) DEFAULT NULL,
  `COPYRIGHTHOLDERNAME` varchar(100) DEFAULT NULL,
  `COPYRIGHTYEAR` double DEFAULT NULL,
  `EBOOKTYPE` varchar(100) DEFAULT NULL,
  `EDITION` varchar(100) DEFAULT NULL,
  `LANGUAGE` varchar(100) DEFAULT NULL,
  `TYPE` varchar(100) DEFAULT NULL,
  `WITH_CD` varchar(100) DEFAULT NULL,
  `VOLUME` double DEFAULT NULL,
  `ROWDT` varchar(100) DEFAULT NULL,
  `URL` varchar(100) DEFAULT NULL,
  `PAGECOUNT` double DEFAULT NULL,
  `INR` double DEFAULT NULL,
  `USD` double DEFAULT NULL,
  `BOOKBISAC` varchar(100) DEFAULT NULL,
  `PUBLISHER` varchar(100) DEFAULT NULL,
  `ROWDTMODIFY` varchar(100) DEFAULT NULL,
  `book_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `temp_chapters`
--

DROP TABLE IF EXISTS `temp_chapters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temp_chapters` (
  `CHAPID` double DEFAULT NULL,
  `ISBN` double DEFAULT NULL,
  `CHAPTER` varchar(100) DEFAULT NULL,
  `TITLE` text,
  `SUBTITLE` text,
  `SIZE` double DEFAULT NULL,
  `VOL_VALUE` varchar(100) DEFAULT NULL,
  `SECTION` text,
  `PAGE` text,
  `FIRSTPAGE` double DEFAULT NULL,
  `LASTPAGE` double DEFAULT NULL,
  `PAGECOUNT` double DEFAULT NULL,
  `CHAPBISAC` text,
  `DOI` varchar(100) DEFAULT NULL,
  `CHAPNO` double DEFAULT NULL,
  `SNO` double DEFAULT NULL,
  `BOOKPART` varchar(100) DEFAULT NULL,
  `SEQNO` double DEFAULT NULL,
  `chapter_id` bigint NOT NULL,
  `book_id` bigint NOT NULL
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
