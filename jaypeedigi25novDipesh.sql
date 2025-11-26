-- MySQL dump 10.13  Distrib 9.5.0, for macos15 (arm64)
--
-- Host: localhost    Database: jaypeedigi
-- ------------------------------------------------------
-- Server version	9.5.0

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '55c13290-befc-11f0-85ab-8347dc78c46e:1-650';

--
-- Table structure for table `admin_users`
--

DROP TABLE IF EXISTS `admin_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(155) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  `subscription_type` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `usercol` varchar(45) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_users`
--

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;
INSERT INTO `admin_users` VALUES (1,'test','test','test','test@gmail.com','$2b$10$uePPORngy/s3ZFauuXaeuOnQPpSpDRF7JDu.EMvekMGIncsvq3eEq','Books','Trial','Active',NULL,'2025-11-13 20:45:00','2025-11-13 20:47:45'),(2,'Super Admin','Super','Admin','superadmin@gmail.com','$2b$10$i7.7iNjrFT3HC0lZOlLYU.jT1UajZ4VOltfLkDFcCXVzPpxD2CSUS','Super Admin','Subscription','Active',NULL,'2025-11-17 20:48:46','2025-11-17 20:48:46'),(3,'Test2','Test2','Test2','Test2@gmail.com','$2b$10$NJAC2LlW.JWXgnHo1ehRBOX0UPCosbMpS87EYprC42/mXQDuPjDC6','Books','Perpetual','Active',NULL,'2025-11-17 21:06:26','2025-11-17 21:06:26');
/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `annual_prices`
--

DROP TABLE IF EXISTS `annual_prices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `annual_prices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `category` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `journal` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `format` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `region` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount_price` decimal(10,2) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `idx_code` (`code`),
  KEY `idx_category` (`category`),
  KEY `idx_region` (`region`),
  KEY `idx_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `annual_prices`
--

LOCK TABLES `annual_prices` WRITE;
/*!40000 ALTER TABLE `annual_prices` DISABLE KEYS */;
/*!40000 ALTER TABLE `annual_prices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_authentications`
--

DROP TABLE IF EXISTS `api_authentications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_authentications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token_value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `auth_method` enum('IP-Based','None') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'None',
  `status` enum('Active','Inactive') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Active',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_username` (`username`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_authentications`
--

LOCK TABLES `api_authentications` WRITE;
/*!40000 ALTER TABLE `api_authentications` DISABLE KEYS */;
INSERT INTO `api_authentications` VALUES (1,'Test','nvr_R4FfnGGm4UPFKKGZUlSnKOXOcuR6hRRtWnnGrPWOdNg','IP-Based','Active','2025-11-20 14:09:32','2025-11-20 14:09:32');
/*!40000 ALTER TABLE `api_authentications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `isbn` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `book_title` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `book_subtitle` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `doi` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `subject_ids` varchar(200) DEFAULT NULL,
  `society` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `access_type` enum('Paid','Free','Subscription') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Paid',
  `book_content_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Book',
  `edition` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `book_type` enum('Reference','Professional','Textbook') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `book_bisac` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publishing_year` int DEFAULT NULL,
  `publish_status` enum('Staging','Live') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Staging',
  `no_of_chapters` int DEFAULT '0',
  `no_of_pages` int DEFAULT '0',
  `no_of_volumes` int DEFAULT '1',
  `featured` tinyint(1) DEFAULT '0',
  `download_enable` tinyint(1) DEFAULT '0',
  `rating` int DEFAULT '0',
  `book_cover_image` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `book_overview` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `supplementary_information` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `status` enum('Active','Inactive','Deleted') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Active',
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `print_isbn` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keywords` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `title` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `author` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `coverImage` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `subjectcategoryId` int DEFAULT NULL,
  `ratingCount` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `isbn` (`isbn`),
  KEY `idx_isbn` (`isbn`),
  KEY `idx_book_title` (`book_title`(255)),
  KEY `idx_publish_status` (`publish_status`),
  KEY `idx_featured` (`featured`),
  KEY `idx_status` (`status`),
  KEY `idx_created_date` (`created_date`),
  KEY `id_idx` (`category_id`),
  KEY `id_idx1` (`subject_ids`),
  CONSTRAINT `id` FOREIGN KEY (`category_id`) REFERENCES `subjectcategory` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (5,'4515','Test','Test','1215',55,NULL,'Test','Paid','Book','1','Professional','Test',2025,'Staging',2,2151,1,1,0,4,'','','','Active','2025-11-19 16:38:18','2025-11-19 16:38:18',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(6,'4545','Test','Test','',7,'12,11,42','Test','Paid','Book','1','Professional','',2025,'Staging',111,121,1121,0,0,4,'/images/book_covers/book-cover-1763571066867-322161296.jpg','text','text','Active','2025-11-19 16:44:25','2025-11-19 16:51:25',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(7,'121','Testdssd','Testdsd','1212',2,'31,32,33,34,35','Test','Paid','Book','1','Professional','Test',2025,'Staging',34,233,12,1,1,5,'book-cover-1763571246322-764923918.jpg','Test','Test','Active','2025-11-19 16:54:29','2025-11-19 16:54:29',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chapters`
--

DROP TABLE IF EXISTS `chapters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chapters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `book_id` int NOT NULL,
  `book_isbn` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `chapter_number` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sequence_number` int DEFAULT NULL,
  `chapter_title` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `doi` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_page` int DEFAULT NULL,
  `last_page` int DEFAULT NULL,
  `access_type` enum('Paid','Free','Open') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Paid',
  `keywords` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `status` enum('Active','Inactive','Deleted') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Active',
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_book_id` (`book_id`),
  KEY `idx_book_isbn` (`book_isbn`),
  KEY `idx_chapter_number` (`chapter_number`),
  KEY `idx_chapter_title` (`chapter_title`(255)),
  KEY `idx_status` (`status`),
  KEY `idx_created_date` (`created_date`),
  CONSTRAINT `chapters_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapters`
--

LOCK TABLES `chapters` WRITE;
/*!40000 ALTER TABLE `chapters` DISABLE KEYS */;
/*!40000 ALTER TABLE `chapters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `citations`
--

DROP TABLE IF EXISTS `citations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `citations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isPublished` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `location` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'header',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citations`
--

LOCK TABLES `citations` WRITE;
/*!40000 ALTER TABLE `citations` DISABLE KEYS */;
INSERT INTO `citations` VALUES (1,'PUBMED','https://pubmed.ncbi.nlm.nih.gov/','PUBMED_logo_4.png',1,'2025-11-18 18:03:19','2025-11-18 18:03:19','header'),(2,'PUBMED_CENTRAL','https://www.ncbi.nlm.nih.gov/pmc/articles/','PUBMED_CENTRAL_logo_5.png',1,'2025-11-18 18:03:19','2025-11-18 18:03:19','header'),(3,'PUBMED','https://pubmed.ncbi.nlm.nih.gov/','PUBMED_logo_4.png',1,'2025-11-20 14:02:12','2025-11-20 14:02:12','header'),(4,'PUBMED_CENTRAL','https://www.ncbi.nlm.nih.gov/pmc/articles/','PUBMED_CENTRAL_logo_5.png',1,'2025-11-20 14:02:12','2025-11-20 14:02:12','header');
/*!40000 ALTER TABLE `citations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contents`
--

DROP TABLE IF EXISTS `contents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `coverImage` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `author` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `detailsHtml` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `rating` float NOT NULL DEFAULT '0',
  `displayOrder` int NOT NULL DEFAULT '0',
  `contentTypeId` int NOT NULL,
  `subjectcategoryId` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ishomepage` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contents`
--

LOCK TABLES `contents` WRITE;
/*!40000 ALTER TABLE `contents` DISABLE KEYS */;
INSERT INTO `contents` VALUES (1,'Essentials of Medical Pharmacology','/images/9789352501915-1761321074922.png','A concise yet comprehensive textbook on pharmacology for medical students.','K D Tripathi','<p>This book covers fundamentals of pharmacology including drug classes, mechanisms, and clinical uses.</p>',4.5,0,1,1,'2025-10-23 16:46:11',0),(2,'Human Embryology (Inderbir Singh)','/images/9789354652974-1761321094121.png','A detailed atlas and text on human embryology for medical students.','Inderbir Singh &amp; Raveendranath Veeramani','<p>Richly illustrated with diagrams and photographs, covers prenatal development in depth.</p>',4.2,0,1,7,'2025-10-23 16:46:11',0),(3,'Video Atlas of Clinical Cases – Medicine','/images/jaypee-DSJUOG-1761321552656.jpg','Video-based clinical case presentations in general medicine.','Jaypee Digital Media','<p>Over 3000 video cases exploring diagnostic and management scenarios in medicine.</p>',4.7,3,2,1,'2025-10-23 16:46:11',0),(4,'MCQ Bank – Paediatrics','/images/jaypee-DSJUOG-1761321552656.jpg','Extensive multiple-choice questions set for paediatric medicine preparation.','Jaypee Digital Media','<p>Includes detailed explanations and references for each question.</p>',4.3,4,5,6,'2025-10-23 16:46:11',0),(5,'Journal of Paediatric Surgery – Vol 19, Iss 1','/images/jaypee-DSJUOG-1761321552656.jpg','The latest issue of the Journal of Paediatric Surgery.','Various Authors','<p>This issue includes original research articles and case reports in paediatric surgery.</p>',4,5,3,6,'2025-10-23 16:46:11',0),(6,'Clinical Case Studies in Radiology','/images/jaypee-DSJUOG-1761321552656.jpg','A compendium of radiology cases with imaging and commentary.','Jaypee Digital Media','<p>Contains 500+ imaging cases covering CT, MRI, X-ray and ultrasound.</p>',4.6,6,4,5,'2025-10-23 16:46:11',0),(7,'DOODY Review – Surgery Textbook 2025','/images/jaypee-DSJUOG-1761321552656.jpg','An expert review summary from DOODY of a major surgery textbook.','DOODY Review Team','<p>Highlights strengths, weaknesses and key take-home points of the textbook.</p>',3.8,7,6,4,'2025-10-23 16:46:11',0),(22,'Harrison’s Principles of Internal Medicine','/images/9789350906576-1761321061848.png','Comprehensive guide to internal medicine covering diagnosis and management of diseases.','J. Larry Jameson','<p>Includes in-depth sections on cardiology, endocrinology, and infectious diseases.</p>',4.8,0,1,1,'2025-10-23 17:35:28',1),(23,'Clinical Examination: A Systematic Guide to Physical Diagnosis','/images/9789352707010-1761321084382.png','A practical book for students and clinicians on patient examination and clinical reasoning.','Nicholas Talley','<p>Focuses on clinical skills, physical signs, and differential diagnosis.</p>',4.5,0,1,1,'2025-10-23 17:35:28',0),(24,'Textbook of Operative Dentistry','/images/jaypee-DSJUOG-1761321552656.jpg','Essential reference for restorative dentistry with step-by-step procedures.','Nisha Garg','<p>Includes detailed illustrations, cavity preparation techniques, and case discussions.</p>',4.6,3,1,2,'2025-10-23 17:35:28',0),(25,'Essentials of Oral Pathology and Microbiology','/images/jaypee-DSJUOG-1761321552656.jpg','A complete guide to oral pathology, microbiology, and laboratory diagnosis.','R. Rajendran','<p>Updated chapters with recent advances in oral cancer and microbial infections.</p>',4.7,0,1,2,'2025-10-23 17:35:28',0),(26,'Fundamentals of Nursing','/images/jaypee-DSJUOG-1761321552656.jpg','Comprehensive text on nursing principles and clinical procedures.','Potter & Perry','<p>Covers patient care fundamentals, ethics, and healthcare communication.</p>',4.9,0,1,3,'2025-10-23 17:35:28',1),(27,'Community Health Nursing','/images/jaypee-DSJUOG-1761321552656.jpg','Focuses on public health nursing and community-based healthcare systems.','Basavanthappa BT','<p>Includes updated WHO guidelines and case-based discussions.</p>',4.4,6,1,3,'2025-10-23 17:35:28',0),(28,'Cardiac Physical Examination – Step by Step','/images/jaypee-DSJUOG-1761321552656.jpg','Video tutorial demonstrating cardiac examination techniques.','Dr. S. Mehta','<iframe src=\"https://jaypeedigital.com/video/medicine-cardio-exam\"></iframe>',4.3,7,2,1,'2025-10-23 17:35:28',1),(29,'Tooth Extraction Procedure – Clinical Demo','/images/jaypee-DSJUOG-1761321552656.jpg','Clinical video showing step-by-step tooth extraction process.','Dr. P. Gupta','<iframe src=\"https://jaypeedigital.com/video/tooth-extraction\"></iframe>',4.5,8,2,2,'2025-10-23 17:35:28',0),(30,'Journal of Clinical Medicine Research','/images/jaypee-DSJUOG-1761321552656.jpg','Publishes peer-reviewed research on internal medicine and clinical practice.','Jaypee Journals','<p>Indexed in Scopus and PubMed. Monthly publication.</p>',4.6,9,3,1,'2025-10-23 17:35:28',1),(31,'International Journal of Critical Care Medicine','/images/jaypee-DSJUOG-1761321552656.jpg','Focuses on research and reviews in intensive care and emergency medicine.','Jaypee Journals','<p>Includes latest evidence-based ICU protocols and case studies.</p>',4.7,10,3,1,'2025-10-23 17:35:28',0),(32,'Journal of Contemporary Dentistry','/images/jaypee-DSJUOG-1761321552656.jpg','A peer-reviewed journal covering restorative, pediatric, and cosmetic dentistry.','Jaypee Journals','<p>Quarterly publication featuring clinical innovations and reviews.</p>',4.8,11,3,2,'2025-10-23 17:35:28',0),(33,'Indian Journal of Nursing Sciences','/images/jaypee-DSJUOG-1761321552656.jpg','Research and case reports on nursing practice, education, and healthcare innovation.','Jaypee Journals','<p>Includes nursing education reforms, clinical practice updates, and WHO collaborations.</p>',4.5,12,3,3,'2025-10-23 17:35:28',1);
/*!40000 ALTER TABLE `contents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contenttype`
--

DROP TABLE IF EXISTS `contenttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contenttype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `slug` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `icon` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'LocalLibraryIcon',
  `displayOrder` int NOT NULL DEFAULT '0',
  `ishomepage` tinyint(1) NOT NULL DEFAULT '1',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contenttype`
--

LOCK TABLES `contenttype` WRITE;
/*!40000 ALTER TABLE `contenttype` DISABLE KEYS */;
INSERT INTO `contenttype` VALUES (1,'Books','books','Text-book publications and eBooks','BookIcon',1,1,1,'2025-10-23 16:45:43','2025-10-24 14:02:44'),(2,'Videos','videos','Video lectures, atlases and tutorials','VideoLibraryIcon',2,1,1,'2025-10-23 16:45:43','2025-10-24 14:02:44'),(3,'Journals','journals','Peer-reviewed journals and articles','ArticleIcon',3,1,1,'2025-10-23 16:45:43','2025-10-24 14:02:44'),(4,'Cases','cases','Clinical case studies and case-based learning','CaseStudyIcon',4,1,1,'2025-10-23 16:45:43','2025-10-24 14:02:44'),(5,'MCQs','mcqs','Multiple choice questions & test banks','QuizIcon',5,0,1,'2025-10-23 16:45:43','2025-10-24 14:02:44'),(6,'Reviews','reviews','Book reviews, product reviews and DOODY reviews','ReviewIcon',6,0,1,'2025-10-23 16:45:43','2025-10-24 14:02:44');
/*!40000 ALTER TABLE `contenttype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contenttypes`
--

DROP TABLE IF EXISTS `contenttypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contenttypes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `slug` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `sortOrder` int NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contenttypes`
--

LOCK TABLES `contenttypes` WRITE;
/*!40000 ALTER TABLE `contenttypes` DISABLE KEYS */;
INSERT INTO `contenttypes` VALUES (1,'Books','books','Comprehensive textbooks and reference materials',1,'2025-10-24 06:11:02'),(2,'Videos','videos','Interactive video lectures and tutorials',2,'2025-10-24 06:11:02'),(3,'Journals','journals','Latest research articles and academic publications',3,'2025-10-24 06:11:02');
/*!40000 ALTER TABLE `contenttypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hero_slides`
--

DROP TABLE IF EXISTS `hero_slides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hero_slides` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `highlightedWord` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `subtitle` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `buttons` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `displayOrder` int NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hero_slides`
--

LOCK TABLES `hero_slides` WRITE;
/*!40000 ALTER TABLE `hero_slides` DISABLE KEYS */;
INSERT INTO `hero_slides` VALUES (11,'Test','Test','Test','slider-1762790645416-940945050.png','[{\"label\":\"Medicine\",\"variant\":\"contained\",\"scrollTo\":\"popular-course\"},{\"label\":\"Dentistry\",\"variant\":\"contained\",\"scrollTo\":\"popular-course\"},{\"label\":\"Nursing\",\"variant\":\"contained\",\"scrollTo\":\"popular-course\"},{\"label\":\"Watch Video\",\"variant\":\"outlined\",\"icon\":true,\"scrollTo\":\"video-section\"}]',7,1,'2025-11-10 10:34:05','2025-11-10 10:34:05'),(12,'Test 2','Test 2','Test 2','slider-1762791418053-77233224.png','[{\"label\":\"Medicine\",\"variant\":\"contained\",\"scrollTo\":\"popular-course\"},{\"label\":\"Dentistry\",\"variant\":\"contained\",\"scrollTo\":\"popular-course\"},{\"label\":\"Nursing\",\"variant\":\"contained\",\"scrollTo\":\"popular-course\"},{\"label\":\"Watch Video\",\"variant\":\"outlined\",\"icon\":true,\"scrollTo\":\"video-section\"}]',3,1,'2025-11-10 10:46:58','2025-11-10 10:46:58'),(13,'Empowering Medical','Minds','Jaypee products are being distributed globally by renowned  distributors in the USA, Central and South America, UK, Canada,  Europe, Africa, Middle East, South East Asia, North Asia.','slider-1762792309708-717873117.png','[{\"label\":\"Medicine\",\"variant\":\"contained\",\"scrollTo\":\"popular-course\"},{\"label\":\"Dentistry\",\"variant\":\"contained\",\"scrollTo\":\"popular-course\"},{\"label\":\"Nursing\",\"variant\":\"contained\",\"scrollTo\":\"popular-course\"},{\"label\":\"Watch Video\",\"variant\":\"outlined\",\"icon\":true,\"scrollTo\":\"video-section\"}]',0,1,'2025-11-10 11:01:49','2025-11-10 11:19:04'),(14,'Test1','Test1','Test1','slider-1763396294392-115007109.png','[{\"label\":\"Medicine\",\"variant\":\"contained\",\"scrollTo\":\"popular-course\"},{\"label\":\"Dentistry\",\"variant\":\"contained\",\"scrollTo\":\"popular-course\"},{\"label\":\"Nursing\",\"variant\":\"contained\",\"scrollTo\":\"popular-course\"},{\"label\":\"Watch Video\",\"variant\":\"outlined\",\"icon\":true,\"scrollTo\":\"video-section\"}]',4,1,'2025-11-17 10:48:14','2025-11-17 10:48:14'),(15,'Test3','Test3','Test3','slider-1763396522071-600141016.png','[{\"label\":\"Medicine\",\"variant\":\"contained\",\"scrollTo\":\"popular-course\"},{\"label\":\"Dentistry\",\"variant\":\"contained\",\"scrollTo\":\"popular-course\"},{\"label\":\"Nursing\",\"variant\":\"contained\",\"scrollTo\":\"popular-course\"},{\"label\":\"Watch Video\",\"variant\":\"outlined\",\"icon\":true,\"scrollTo\":\"video-section\"}]',5,1,'2025-11-17 10:52:02','2025-11-17 10:52:02');
/*!40000 ALTER TABLE `hero_slides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mentors`
--

DROP TABLE IF EXISTS `mentors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mentors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `speciality` varchar(255) DEFAULT NULL,
  `hospital` varchar(255) DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `company_logo_url` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `order` int DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mentors`
--

LOCK TABLES `mentors` WRITE;
/*!40000 ALTER TABLE `mentors` DISABLE KEYS */;
INSERT INTO `mentors` VALUES (7,'Dr. Rajesh Kumar','Cardiology','AIIMS Delhi','/images/mentors/christian-buehner-DItYlc26zVI-unsplash.jpg','/images/companies/google.png','Leading cardiologist with 15+ years of experience in interventional cardiology and medical education.',1,1,4,'2025-11-20 21:32:09','2025-11-20 21:24:13'),(8,'Dr. Priya Sharma','Pediatrics','Safdarjung Hospital','/images/mentors/jonas-kakaroto-KIPqvvTOC1s-unsplash.jpg','/images/companies/microsoft.png','Renowned pediatrician specializing in neonatal care and child development with extensive teaching experience.',2,1,5,'2025-11-20 21:39:43','2025-11-20 21:35:20'),(9,'Dr. Amit Patel','Orthopedics','Fortis Healthcare','/images/mentors/noah-buscher-8A7fD6Y5VF8-unsplash.jpg','/images/companies/airbnb.png','Expert orthopedic surgeon with specialization in joint replacement and sports medicine.',3,1,5,'2025-11-20 21:36:42','2025-11-20 21:36:42'),(10,'Dr. Sunita Gupta','Gynecology','Max Healthcare','/images/mentors/philip-martin-5aGUyCW_PJw-unsplash.jpg','/images/companies/grab.png','Senior gynecologist and obstetrician with expertise in high-risk pregnancies and minimally invasive surgery.',4,1,3,'2025-11-20 21:37:31','2025-11-20 21:37:31');
/*!40000 ALTER TABLE `mentors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resources`
--

DROP TABLE IF EXISTS `resources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resources` (
  `resource_id` int NOT NULL AUTO_INCREMENT,
  `resource_name` varchar(100) NOT NULL,
  `resource_code` varchar(100) NOT NULL,
  `description` text,
  `status` varchar(45) DEFAULT 'Active',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`resource_id`),
  UNIQUE KEY `resource_name` (`resource_name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resources`
--

LOCK TABLES `resources` WRITE;
/*!40000 ALTER TABLE `resources` DISABLE KEYS */;
INSERT INTO `resources` VALUES (1,'Book','ROLE_BOOK',NULL,'Active','2025-11-13 21:29:34','2025-11-13 21:29:34'),(3,'Book Chapter','ROLE_BOOK_CHAPTER',NULL,'Active','2025-11-14 20:59:48','2025-11-14 20:59:48'),(4,'Book Import','ROLE_BOOK_IMPORT',NULL,'Active','2025-11-14 21:00:03','2025-11-14 21:00:03'),(5,'Book Review','ROLE_BOOK_REVIEW',NULL,'Active','2025-11-14 21:00:25','2025-11-14 21:00:25'),(6,'User','ROLE_USER',NULL,'Active','2025-11-17 20:49:51','2025-11-17 20:49:51'),(7,'Roles','ROLE_ROLE',NULL,'Active','2025-11-17 20:50:06','2025-11-17 20:50:06'),(8,'Role Privileges','ROLE_ROLE_PRIVILEGES',NULL,'Active','2025-11-17 20:50:36','2025-11-17 20:50:36');
/*!40000 ALTER TABLE `resources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_privileges`
--

DROP TABLE IF EXISTS `role_privileges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_privileges` (
  `privilege_id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `resource_id` int NOT NULL,
  `can_view` tinyint(1) DEFAULT '0',
  `can_add` tinyint(1) DEFAULT '0',
  `can_edit` tinyint(1) DEFAULT '0',
  `can_delete` tinyint(1) DEFAULT '0',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`privilege_id`),
  UNIQUE KEY `unique_role_resource` (`role_id`,`resource_id`),
  KEY `resource_id` (`resource_id`),
  CONSTRAINT `role_privileges_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE,
  CONSTRAINT `role_privileges_ibfk_2` FOREIGN KEY (`resource_id`) REFERENCES `resources` (`resource_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_privileges`
--

LOCK TABLES `role_privileges` WRITE;
/*!40000 ALTER TABLE `role_privileges` DISABLE KEYS */;
INSERT INTO `role_privileges` VALUES (25,2,1,1,1,1,1,'2025-11-17 21:21:32','2025-11-17 21:21:32'),(26,2,3,1,1,1,1,'2025-11-17 21:21:32','2025-11-17 21:21:32'),(27,2,4,1,1,1,1,'2025-11-17 21:21:32','2025-11-17 21:21:32'),(28,2,5,1,1,1,1,'2025-11-17 21:21:32','2025-11-17 21:21:32'),(29,2,8,1,1,1,1,'2025-11-17 21:21:32','2025-11-17 21:21:32'),(30,2,7,1,1,1,1,'2025-11-17 21:21:32','2025-11-17 21:21:32'),(31,2,6,1,1,1,1,'2025-11-17 21:21:32','2025-11-17 21:21:32');
/*!40000 ALTER TABLE `role_privileges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(45) NOT NULL,
  `role_code` varchar(45) NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Books','ROLE_BOOKS','Active','2025-11-13 20:45:28','2025-11-13 20:45:28'),(2,'Super Admin','SUPER_ADMIN','Active','2025-11-17 20:48:05','2025-11-17 20:48:05');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `site_settings`
--

DROP TABLE IF EXISTS `site_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `site_settings` (
  `id` int NOT NULL,
  `logoUrl` varchar(512) NOT NULL,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_settings`
--

LOCK TABLES `site_settings` WRITE;
/*!40000 ALTER TABLE `site_settings` DISABLE KEYS */;
INSERT INTO `site_settings` VALUES (1,'/images/nvr-logo.jpg','2025-11-04 21:58:57');
/*!40000 ALTER TABLE `site_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjectcategory`
--

DROP TABLE IF EXISTS `subjectcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjectcategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `slug` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `contentTypeId` int NOT NULL,
  `sortOrder` int NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ishomepage` tinyint(1) DEFAULT '0',
  `isslider` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `idx_category` (`contentTypeId`),
  CONSTRAINT `fk_subcategory_category` FOREIGN KEY (`contentTypeId`) REFERENCES `contenttype` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjectcategory`
--

LOCK TABLES `subjectcategory` WRITE;
/*!40000 ALTER TABLE `subjectcategory` DISABLE KEYS */;
INSERT INTO `subjectcategory` VALUES (1,'Medicine','medicine','Welcome to the Dummy Text',1,1,'2025-10-23 16:46:11',1,1),(2,'Dentistry','dentistry','Welcome to the Dummy Text',1,2,'2025-10-23 16:46:11',1,1),(3,'Nursing','nursing','Welcome to the Dummy Text',1,3,'2025-10-23 16:46:11',0,1),(4,'Surgery','surgery','Welcome to the Dummy Text',1,4,'2025-10-23 16:46:11',0,0),(5,'Radiology','radiology','Welcome to the Dummy Text',1,5,'2025-10-23 16:46:11',1,0),(6,'Paediatrics','paediatrics','Child health & paediatric medicine',1,6,'2025-10-23 16:46:11',0,0),(7,'Anatomy','anatomy','Welcome to the Dummy Text',1,7,'2025-10-23 16:46:11',0,0),(51,'Alternative Medicine','alternative-medicine','Welcome to the Dummy Text',1,0,'2025-10-24 18:41:23',1,0),(52,'Biochemistry','biochemistry','Welcome to the Dummy Text',1,0,'2025-10-24 18:41:48',1,0),(53,'Biotechnology','biotechnology','Welcome to the Dummy Text',1,0,'2025-10-24 18:42:12',1,0),(54,'Cardiology','cardiology','This is dummy text',3,0,'2025-10-24 18:47:27',1,0),(55,'Critical Care','critical-care','this is dummy text',1,0,'2025-10-24 18:48:03',1,0),(56,'Dental Materials','dental-materials','This is dummy text',3,0,'2025-10-24 18:48:58',1,0),(57,'Test','test','Test',1,0,'2025-11-20 14:26:00',0,0);
/*!40000 ALTER TABLE `subjectcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `description` text,
  `sort_order` int DEFAULT '0',
  `is_homepage` tinyint(1) DEFAULT '0',
  `is_slider` tinyint(1) DEFAULT '0',
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_slug` (`slug`),
  KEY `idx_is_homepage` (`is_homepage`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (1,'Alternative Medicine','alternative-medicine',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(2,'Anaesthesia','anaesthesia',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(3,'Anatomy','anatomy',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(4,'Applied Anatomy','applied-anatomy',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(5,'Applied Biochemistry','applied-biochemistry',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(6,'Applied Microbiology and Infection Control','applied-microbiology-and-infection-control',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(7,'Applied Nutrition and Dietetics','applied-nutrition-and-dietetics',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(8,'Applied Physiology','applied-physiology',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(9,'Art','art',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(10,'Ayurveda','ayurveda',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(11,'Biochemistry','biochemistry',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(12,'Biophysics','biophysics',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(13,'Biostatistics and Research Methodology','biostatistics-and-research-methodology',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(14,'Biotechnology','biotechnology',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(15,'Cardiology','cardiology',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(16,'Child Health Nursing','child-health-nursing',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(17,'Clinical Skills for Nurses','clinical-skills-for-nurses',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(18,'Communicative English & Nursing Education','communicative-english-and-nursing-education',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(19,'Community Dentistry','community-dentistry',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(20,'Community Health Nursing','community-health-nursing',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(21,'Community Medicine','community-medicine',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(22,'Computer for Nurses','computer-for-nurses',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(23,'Conservative Dentistry and Endodontics','conservative-dentistry-and-endodontics',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(24,'Cornea','cornea',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(25,'CraniOrofacial','craniorofacial',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(26,'Critical Care','critical-care',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(27,'Critical Care Nursing','critical-care-nursing',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(28,'Dental','dental',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(29,'Dental Assisting','dental-assisting',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(30,'Dental Materials','dental-materials',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(31,'Dental Science','dental-science',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(32,'Dentistry','dentistry',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(33,'Dermatology','dermatology',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(34,'Diabetes & Endocrinology','diabetes-and-endocrinology',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(35,'Echocardiography','echocardiography',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(36,'Emergency Medicine','emergency-medicine',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(37,'ENT','ent',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(38,'Esthetic','esthetic',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(39,'Foot and Ankle Care','foot-and-ankle-care',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(40,'Forensic Dentistry','forensic-dentistry',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(41,'Forensic Medicine and Toxicology','forensic-medicine-and-toxicology',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(42,'Fundamentals of Nursing','fundamentals-of-nursing',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(43,'Gastroenterology','gastroenterology',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(44,'Gastrology','gastrology',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(45,'General Dentistry','general-dentistry',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(46,'General Medicine','general-medicine',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(47,'General Nursing and Midwifery','general-nursing-and-midwifery',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(48,'Genetics','genetics',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(49,'Geriatric Nursing','geriatric-nursing',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(50,'Gynecology & Infertility','gynecology-and-infertility',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(51,'Head & Neck Surgery','head-and-neck-surgery',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(52,'Hematology','hematology',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(53,'Hepatology','hepatology',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(54,'Histololgy','histololgy',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(55,'Hospital Administration','hospital-administration',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(56,'Hospital and Healthcare Administration','hospital-and-healthcare-administration',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(57,'Image Based Question','image-based-question',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(58,'Implant Dentistry','implant-dentistry',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(59,'Implantology','implantology',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(60,'Laboratory Medicine','laboratory-medicine',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(61,'Laser Dentistry','laser-dentistry',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(62,'MCQs and Self-assessment','mcqs-and-self-assessment',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(63,'Medical','medical',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(64,'Medical Surgeries','medical-surgeries',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(65,'Medical Surgical Nursing','medical-surgical-nursing',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(66,'Medicine','medicine',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(67,'Mental Health Nursing','mental-health-nursing',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(68,'Microbiology and Immunology','microbiology-and-immunology',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(69,'Midwifery/Obstetrics and Gynecology (OBG) Nursing','midwifery/obstetrics-and-gynecology-(obg)-nursing',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(70,'Multidisciplinary','multidisciplinary',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(71,'NEET PG','neet-pg',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(72,'Nephrology','nephrology',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(73,'Neurology','neurology',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(74,'Neurosurgery','neurosurgery',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(75,'Nursing Administration','nursing-administration',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(76,'Nursing Management & Leadership','nursing-management-and-leadership',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(77,'Nursing Research & Statistics','nursing-research-and-statistics',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(78,'Nursing Theories and History','nursing-theories-and-history',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(79,'Nutrition and Dietetics','nutrition-and-dietetics',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(80,'Obstetrics','obstetrics',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(81,'Obstetrics and Gynecology','obstetrics-and-gynecology',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(82,'Occupational Therapy','occupational-therapy',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(83,'Oncology','oncology',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(84,'Ophthalmic Nursing','ophthalmic-nursing',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(85,'Ophthalmology','ophthalmology',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(86,'Oral and Maxillofacial Medicine and Radiology','oral-and-maxillofacial-medicine-and-radiology',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(87,'Oral and Maxillofacial Pathology','oral-and-maxillofacial-pathology',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(88,'Oral and Maxillofacial Surgery','oral-and-maxillofacial-surgery',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(89,'Oral Health','oral-health',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(90,'Orthodontics and Dentofacial Orthopedics','orthodontics-and-dentofacial-orthopedics',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(91,'Orthopedics','orthopedics',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(92,'Otolaryngology','otolaryngology',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(93,'Paramedics','paramedics',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(94,'Pathology','pathology',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(95,'Pediatric Dentistry','pediatric-dentistry',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(96,'Pediatrics','pediatrics',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(97,'Pedodontics','pedodontics',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(98,'Periodontics','periodontics',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(99,'Perioperative and Critical Care Ultrasound and Emergency Ultrasound','perioperative-and-critical-care-ultrasound-and-emergency-ultrasound',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(100,'Perioperative Transthoracic Cchocardiography','perioperative-transthoracic-cchocardiography',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(101,'Pharmacology','pharmacology',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(102,'Physical Medicine and Rehabilitation','physical-medicine-and-rehabilitation',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(103,'Physiology','physiology',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(104,'Physiotherapy','physiotherapy',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(105,'Prosthodontics','prosthodontics',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(106,'Psychiatry','psychiatry',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(107,'Pulmonary & Respiratory Medicine','pulmonary-and-respiratory-medicine',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(108,'Pulmonolary & Respiratory Medicine','pulmonolary-and-respiratory-medicine',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(109,'Pulmonology and Respiratory Medicine','pulmonology-and-respiratory-medicine',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(110,'Radiology','radiology',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(111,'Radiology and Nuclear Medicine','radiology-and-nuclear-medicine',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(112,'Reconstructive Dentistry and Restorative Dentistry','reconstructive-dentistry-and-restorative-dentistry',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(113,'Religion','religion',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(114,'Rhinology','rhinology',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(115,'Science','science',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(116,'Society','society',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(117,'Spinal Surgery','spinal-surgery',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(118,'Staff Nurse Exam','staff-nurse-exam',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(119,'Surgery','surgery',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(120,'Ultrasound','ultrasound',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(121,'Urology','urology',NULL,0,0,0,'2025-11-19 21:42:13','2025-11-19 21:42:13'),(122,'test','test',NULL,0,0,0,'2025-11-24 22:18:54','2025-11-24 22:18:54');
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimonials`
--

DROP TABLE IF EXISTS `testimonials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testimonials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `userName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `professional` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `photo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonials`
--

LOCK TABLES `testimonials` WRITE;
/*!40000 ALTER TABLE `testimonials` DISABLE KEYS */;
INSERT INTO `testimonials` VALUES (6,'Testimonial by Ozlem YALCINKAYA','Many thanks to JaypeeDigital platform, which has been an indispensable easy-to-use source for our academic staff with its comprehensive and up-to-date coverage of medical and allied subjects.','Ozlem YALCINKAYA','Library Director, Bezmialem Vakif University, Turkey','/images/testimonial-1761307085040.jpg','2025-10-24 06:17:02'),(7,'Testimonial by Dr Jesus Tapia Jurado','JaypeeDigital site offers to our students a huge number of medical publications such as textbooks, atlases and reference works — a real asset for our teaching programmes.','Dr Jesus Tapia Jurado','Chief – Surgery Department, Faculty of Medicine, Universidad Nacional Autónoma de México (UNAM), Mexico DF, Mexico','/images/testimonial-1761307251123.jpg','2025-10-24 06:17:02'),(8,'Testimonial by Wan Suhaimi Ariffin','With its user-friendly interface, JaypeeDigital provides extensive coverage in medicine, dentistry and allied health disciplines — enabling us to support students and faculty with a reliable digital resource.','Wan Suhaimi Ariffin, MLS (Syracuse), BLS (UITM)','Head, The National University of Malaysia (UKM) Medical Centre Library, Kuala Lumpur, Malaysia','/images/testimonial-1761307265953.jpg','2025-10-24 06:17:02'),(9,'Testimonial by David E. García Díaz','JaypeeDigital platform presents an interesting and valuable collection of medical publications that complement our curriculum and help keep our learners up to date.','David E. García Díaz (MD)','Head, Physiology Department, Faculty of Medicine, Universidad Nacional Autónoma de México DF, Mexico','','2025-10-24 06:17:02'),(10,'Testimonial by Arcelia Meléndez Ocamp (MD)','Some of us teach in the Division of Graduate Studies and Research at the Faculty and the contents of the JaypeeDigital platform meet our advanced educational and research needs.','Arcelia Meléndez Ocamp (MD)','Head, Preventive Dentistry & Public Health Department, Universidad Nacional Autónoma de México DF, México','','2025-10-24 06:17:02'),(11,'Testimonial by Dra. Blanca Alicia Chong Martínez','It is a very complete and up-to-date platform that could be applied to all levels of Medicine — from undergraduate to postgraduate and continuing medical education.','Dra. Blanca Alicia Chong Martínez','Jefe de Educación Médica Continua / Head of Basic Science and Continuous Medical Education, Facultad Mexicana de Medicina (ULSA), Mexico','/images/testimonial-1761307233476.jpg','2025-10-24 06:17:02');
/*!40000 ALTER TABLE `testimonials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(120) NOT NULL,
  `email` varchar(160) NOT NULL,
  `password` varchar(200) NOT NULL,
  `plan` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Test1234','test1234@gmail.com','$2b$10$j6013hyNMwfMGPNfLGjg2eoahhbpzl3V8M8xiwCmunrimQawYdXZm','Free','2025-11-18 21:42:06','2025-11-18 21:42:06'),(3,'Super User','superuser@gmail.com','$2b$10$GxPDI4Rja75Ni0jdJdQYXujFndItfNE6Aoym9HU2wXZJGZuaDqh.O','Free','2025-11-18 21:53:50','2025-11-18 21:53:50');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-25 19:52:49
