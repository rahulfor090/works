-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: jaypeedigi
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `annual_prices`
--

DROP TABLE IF EXISTS `annual_prices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `annual_prices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci,
  `category` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `journal` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `format` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `region` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
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
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `isbn` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `book_title` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `book_subtitle` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `doi` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `society` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `access_type` enum('Paid','Free','Subscription') COLLATE utf8mb4_unicode_ci DEFAULT 'Paid',
  `book_content_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'Book',
  `edition` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `book_type` enum('Reference','Professional','Textbook') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `book_bisac` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publishing_year` int DEFAULT NULL,
  `publish_status` enum('Staging','Live') COLLATE utf8mb4_unicode_ci DEFAULT 'Staging',
  `no_of_chapters` int DEFAULT '0',
  `no_of_pages` int DEFAULT '0',
  `no_of_volumes` int DEFAULT '1',
  `featured` tinyint(1) DEFAULT '0',
  `download_enable` tinyint(1) DEFAULT '0',
  `rating` int DEFAULT '0',
  `book_cover_image` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `book_overview` text COLLATE utf8mb4_unicode_ci,
  `supplementary_information` text COLLATE utf8mb4_unicode_ci,
  `status` enum('Active','Inactive','Deleted') COLLATE utf8mb4_unicode_ci DEFAULT 'Active',
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `print_isbn` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keywords` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `isbn` (`isbn`),
  KEY `idx_isbn` (`isbn`),
  KEY `idx_book_title` (`book_title`(255)),
  KEY `idx_publish_status` (`publish_status`),
  KEY `idx_featured` (`featured`),
  KEY `idx_status` (`status`),
  KEY `idx_created_date` (`created_date`),
  CONSTRAINT `books_chk_1` CHECK (((`rating` >= 0) and (`rating` <= 5)))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (4,'4546162','Test','Test','151515','Test','Test','Paid','Book','Test','Reference','Test',2025,'Staging',55,156,1,1,1,5,'','Test','Test','Active','2025-11-17 15:16:32','2025-11-17 15:16:32',NULL,NULL);
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
  `book_isbn` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `chapter_number` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sequence_number` int DEFAULT NULL,
  `chapter_title` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `doi` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_page` int DEFAULT NULL,
  `last_page` int DEFAULT NULL,
  `access_type` enum('Paid','Free','Open') COLLATE utf8mb4_unicode_ci DEFAULT 'Paid',
  `keywords` text COLLATE utf8mb4_unicode_ci,
  `description` text COLLATE utf8mb4_unicode_ci,
  `status` enum('Active','Inactive','Deleted') COLLATE utf8mb4_unicode_ci DEFAULT 'Active',
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
INSERT INTO `chapters` VALUES (2,4,'4546162','Test',1515,'Test','5155',454,151,'Paid','Test','Test','Active','2025-11-17 15:17:03','2025-11-17 15:17:03');
/*!40000 ALTER TABLE `chapters` ENABLE KEYS */;
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
INSERT INTO `contents` VALUES (1,'Essentials of Medical Pharmacology','/images/9789352501915-1761321074922.png','A concise yet comprehensive textbook on pharmacology for medical students.','K D Tripathi','<p>This book covers fundamentals of pharmacology including drug classes, mechanisms, and clinical uses.</p>',4.5,0,1,1,'2025-10-23 22:16:11',0),(2,'Human Embryology (Inderbir Singh)','/images/9789354652974-1761321094121.png','A detailed atlas and text on human embryology for medical students.','Inderbir Singh &amp; Raveendranath Veeramani','<p>Richly illustrated with diagrams and photographs, covers prenatal development in depth.</p>',4.2,0,1,7,'2025-10-23 22:16:11',0),(3,'Video Atlas of Clinical Cases – Medicine','/images/jaypee-DSJUOG-1761321552656.jpg','Video-based clinical case presentations in general medicine.','Jaypee Digital Media','<p>Over 3000 video cases exploring diagnostic and management scenarios in medicine.</p>',4.7,3,2,1,'2025-10-23 22:16:11',0),(4,'MCQ Bank – Paediatrics','/images/jaypee-DSJUOG-1761321552656.jpg','Extensive multiple-choice questions set for paediatric medicine preparation.','Jaypee Digital Media','<p>Includes detailed explanations and references for each question.</p>',4.3,4,5,6,'2025-10-23 22:16:11',0),(5,'Journal of Paediatric Surgery – Vol 19, Iss 1','/images/jaypee-DSJUOG-1761321552656.jpg','The latest issue of the Journal of Paediatric Surgery.','Various Authors','<p>This issue includes original research articles and case reports in paediatric surgery.</p>',4,5,3,6,'2025-10-23 22:16:11',0),(6,'Clinical Case Studies in Radiology','/images/jaypee-DSJUOG-1761321552656.jpg','A compendium of radiology cases with imaging and commentary.','Jaypee Digital Media','<p>Contains 500+ imaging cases covering CT, MRI, X-ray and ultrasound.</p>',4.6,6,4,5,'2025-10-23 22:16:11',0),(7,'DOODY Review – Surgery Textbook 2025','/images/jaypee-DSJUOG-1761321552656.jpg','An expert review summary from DOODY of a major surgery textbook.','DOODY Review Team','<p>Highlights strengths, weaknesses and key take-home points of the textbook.</p>',3.8,7,6,4,'2025-10-23 22:16:11',0),(22,'Harrison’s Principles of Internal Medicine','/images/9789350906576-1761321061848.png','Comprehensive guide to internal medicine covering diagnosis and management of diseases.','J. Larry Jameson','<p>Includes in-depth sections on cardiology, endocrinology, and infectious diseases.</p>',4.8,0,1,1,'2025-10-23 23:05:28',1),(23,'Clinical Examination: A Systematic Guide to Physical Diagnosis','/images/9789352707010-1761321084382.png','A practical book for students and clinicians on patient examination and clinical reasoning.','Nicholas Talley','<p>Focuses on clinical skills, physical signs, and differential diagnosis.</p>',4.5,0,1,1,'2025-10-23 23:05:28',0),(24,'Textbook of Operative Dentistry','/images/jaypee-DSJUOG-1761321552656.jpg','Essential reference for restorative dentistry with step-by-step procedures.','Nisha Garg','<p>Includes detailed illustrations, cavity preparation techniques, and case discussions.</p>',4.6,3,1,2,'2025-10-23 23:05:28',0),(25,'Essentials of Oral Pathology and Microbiology','/images/jaypee-DSJUOG-1761321552656.jpg','A complete guide to oral pathology, microbiology, and laboratory diagnosis.','R. Rajendran','<p>Updated chapters with recent advances in oral cancer and microbial infections.</p>',4.7,0,1,2,'2025-10-23 23:05:28',0),(26,'Fundamentals of Nursing','/images/jaypee-DSJUOG-1761321552656.jpg','Comprehensive text on nursing principles and clinical procedures.','Potter & Perry','<p>Covers patient care fundamentals, ethics, and healthcare communication.</p>',4.9,0,1,3,'2025-10-23 23:05:28',1),(27,'Community Health Nursing','/images/jaypee-DSJUOG-1761321552656.jpg','Focuses on public health nursing and community-based healthcare systems.','Basavanthappa BT','<p>Includes updated WHO guidelines and case-based discussions.</p>',4.4,6,1,3,'2025-10-23 23:05:28',0),(28,'Cardiac Physical Examination – Step by Step','/images/jaypee-DSJUOG-1761321552656.jpg','Video tutorial demonstrating cardiac examination techniques.','Dr. S. Mehta','<iframe src=\"https://jaypeedigital.com/video/medicine-cardio-exam\"></iframe>',4.3,7,2,1,'2025-10-23 23:05:28',1),(29,'Tooth Extraction Procedure – Clinical Demo','/images/jaypee-DSJUOG-1761321552656.jpg','Clinical video showing step-by-step tooth extraction process.','Dr. P. Gupta','<iframe src=\"https://jaypeedigital.com/video/tooth-extraction\"></iframe>',4.5,8,2,2,'2025-10-23 23:05:28',0),(30,'Journal of Clinical Medicine Research','/images/jaypee-DSJUOG-1761321552656.jpg','Publishes peer-reviewed research on internal medicine and clinical practice.','Jaypee Journals','<p>Indexed in Scopus and PubMed. Monthly publication.</p>',4.6,9,3,1,'2025-10-23 23:05:28',1),(31,'International Journal of Critical Care Medicine','/images/jaypee-DSJUOG-1761321552656.jpg','Focuses on research and reviews in intensive care and emergency medicine.','Jaypee Journals','<p>Includes latest evidence-based ICU protocols and case studies.</p>',4.7,10,3,1,'2025-10-23 23:05:28',0),(32,'Journal of Contemporary Dentistry','/images/jaypee-DSJUOG-1761321552656.jpg','A peer-reviewed journal covering restorative, pediatric, and cosmetic dentistry.','Jaypee Journals','<p>Quarterly publication featuring clinical innovations and reviews.</p>',4.8,11,3,2,'2025-10-23 23:05:28',0),(33,'Indian Journal of Nursing Sciences','/images/jaypee-DSJUOG-1761321552656.jpg','Research and case reports on nursing practice, education, and healthcare innovation.','Jaypee Journals','<p>Includes nursing education reforms, clinical practice updates, and WHO collaborations.</p>',4.5,12,3,3,'2025-10-23 23:05:28',1);
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
INSERT INTO `contenttype` VALUES (1,'Books','books','Text-book publications and eBooks','BookIcon',1,1,1,'2025-10-23 22:15:43','2025-10-24 19:32:44'),(2,'Videos','videos','Video lectures, atlases and tutorials','VideoLibraryIcon',2,1,1,'2025-10-23 22:15:43','2025-10-24 19:32:44'),(3,'Journals','journals','Peer-reviewed journals and articles','ArticleIcon',3,1,1,'2025-10-23 22:15:43','2025-10-24 19:32:44'),(4,'Cases','cases','Clinical case studies and case-based learning','CaseStudyIcon',4,1,1,'2025-10-23 22:15:43','2025-10-24 19:32:44'),(5,'MCQs','mcqs','Multiple choice questions & test banks','QuizIcon',5,0,1,'2025-10-23 22:15:43','2025-10-24 19:32:44'),(6,'Reviews','reviews','Book reviews, product reviews and DOODY reviews','ReviewIcon',6,0,1,'2025-10-23 22:15:43','2025-10-24 19:32:44');
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
INSERT INTO `contenttypes` VALUES (1,'Books','books','Comprehensive textbooks and reference materials',1,'2025-10-24 11:41:02'),(2,'Videos','videos','Interactive video lectures and tutorials',2,'2025-10-24 11:41:02'),(3,'Journals','journals','Latest research articles and academic publications',3,'2025-10-24 11:41:02');
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
  PRIMARY KEY (`id`),
  CONSTRAINT `hero_slides_chk_1` CHECK (json_valid(`buttons`))
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hero_slides`
--

LOCK TABLES `hero_slides` WRITE;
/*!40000 ALTER TABLE `hero_slides` DISABLE KEYS */;
INSERT INTO `hero_slides` VALUES (11,'Test','Test','Test','slider-1762790645416-940945050.png','[{\"label\":\"Medicine\",\"variant\":\"contained\",\"scrollTo\":\"popular-course\"},{\"label\":\"Dentistry\",\"variant\":\"contained\",\"scrollTo\":\"popular-course\"},{\"label\":\"Nursing\",\"variant\":\"contained\",\"scrollTo\":\"popular-course\"},{\"label\":\"Watch Video\",\"variant\":\"outlined\",\"icon\":true,\"scrollTo\":\"video-section\"}]',7,1,'2025-11-10 16:04:05','2025-11-10 16:04:05'),(12,'Test 2','Test 2','Test 2','slider-1762791418053-77233224.png','[{\"label\":\"Medicine\",\"variant\":\"contained\",\"scrollTo\":\"popular-course\"},{\"label\":\"Dentistry\",\"variant\":\"contained\",\"scrollTo\":\"popular-course\"},{\"label\":\"Nursing\",\"variant\":\"contained\",\"scrollTo\":\"popular-course\"},{\"label\":\"Watch Video\",\"variant\":\"outlined\",\"icon\":true,\"scrollTo\":\"video-section\"}]',3,1,'2025-11-10 16:16:58','2025-11-10 16:16:58'),(13,'Empowering Medical','Minds','Jaypee products are being distributed globally by renowned  distributors in the USA, Central and South America, UK, Canada,  Europe, Africa, Middle East, South East Asia, North Asia.','slider-1762792309708-717873117.png','[{\"label\":\"Medicine\",\"variant\":\"contained\",\"scrollTo\":\"popular-course\"},{\"label\":\"Dentistry\",\"variant\":\"contained\",\"scrollTo\":\"popular-course\"},{\"label\":\"Nursing\",\"variant\":\"contained\",\"scrollTo\":\"popular-course\"},{\"label\":\"Watch Video\",\"variant\":\"outlined\",\"icon\":true,\"scrollTo\":\"video-section\"}]',0,1,'2025-11-10 16:31:49','2025-11-10 16:49:04');
/*!40000 ALTER TABLE `hero_slides` ENABLE KEYS */;
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
INSERT INTO `site_settings` VALUES (1,'/images/nvr-logo.jpg','2025-11-05 03:28:57');
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
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjectcategory`
--

LOCK TABLES `subjectcategory` WRITE;
/*!40000 ALTER TABLE `subjectcategory` DISABLE KEYS */;
INSERT INTO `subjectcategory` VALUES (1,'Medicine','medicine','Welcome to the Dummy Text',1,1,'2025-10-23 22:16:11',1,1),(2,'Dentistry','dentistry','Welcome to the Dummy Text',1,2,'2025-10-23 22:16:11',1,1),(3,'Nursing','nursing','Welcome to the Dummy Text',1,3,'2025-10-23 22:16:11',1,1),(4,'Surgery','surgery','Welcome to the Dummy Text',1,4,'2025-10-23 22:16:11',0,0),(5,'Radiology','radiology','Welcome to the Dummy Text',1,5,'2025-10-23 22:16:11',0,0),(6,'Paediatrics','paediatrics','Child health & paediatric medicine',1,6,'2025-10-23 22:16:11',0,0),(7,'Anatomy','anatomy','Welcome to the Dummy Text',1,7,'2025-10-23 22:16:11',0,0),(51,'Alternative Medicine','alternative-medicine','Welcome to the Dummy Text',1,0,'2025-10-25 00:11:23',0,0),(52,'Biochemistry','biochemistry','Welcome to the Dummy Text',1,0,'2025-10-25 00:11:48',1,0),(53,'Biotechnology','biotechnology','Welcome to the Dummy Text',1,0,'2025-10-25 00:12:12',1,0),(54,'Cardiology','cardiology','This is dummy text',3,0,'2025-10-25 00:17:27',1,0),(55,'Critical Care','critical-care','this is dummy text',1,0,'2025-10-25 00:18:03',1,0),(56,'Dental Materials','dental-materials','This is dummy text',3,0,'2025-10-25 00:18:58',1,0);
/*!40000 ALTER TABLE `subjectcategory` ENABLE KEYS */;
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
INSERT INTO `testimonials` VALUES (6,'Testimonial by Ozlem YALCINKAYA','Many thanks to JaypeeDigital platform, which has been an indispensable easy-to-use source for our academic staff with its comprehensive and up-to-date coverage of medical and allied subjects.','Ozlem YALCINKAYA','Library Director, Bezmialem Vakif University, Turkey','/images/testimonial-1761307085040.jpg','2025-10-24 11:47:02'),(7,'Testimonial by Dr Jesus Tapia Jurado','JaypeeDigital site offers to our students a huge number of medical publications such as textbooks, atlases and reference works — a real asset for our teaching programmes.','Dr Jesus Tapia Jurado','Chief – Surgery Department, Faculty of Medicine, Universidad Nacional Autónoma de México (UNAM), Mexico DF, Mexico','/images/testimonial-1761307251123.jpg','2025-10-24 11:47:02'),(8,'Testimonial by Wan Suhaimi Ariffin','With its user-friendly interface, JaypeeDigital provides extensive coverage in medicine, dentistry and allied health disciplines — enabling us to support students and faculty with a reliable digital resource.','Wan Suhaimi Ariffin, MLS (Syracuse), BLS (UITM)','Head, The National University of Malaysia (UKM) Medical Centre Library, Kuala Lumpur, Malaysia','/images/testimonial-1761307265953.jpg','2025-10-24 11:47:02'),(9,'Testimonial by David E. García Díaz','JaypeeDigital platform presents an interesting and valuable collection of medical publications that complement our curriculum and help keep our learners up to date.','David E. García Díaz (MD)','Head, Physiology Department, Faculty of Medicine, Universidad Nacional Autónoma de México DF, Mexico','','2025-10-24 11:47:02'),(10,'Testimonial by Arcelia Meléndez Ocamp (MD)','Some of us teach in the Division of Graduate Studies and Research at the Faculty and the contents of the JaypeeDigital platform meet our advanced educational and research needs.','Arcelia Meléndez Ocamp (MD)','Head, Preventive Dentistry & Public Health Department, Universidad Nacional Autónoma de México DF, México','','2025-10-24 11:47:02'),(11,'Testimonial by Dra. Blanca Alicia Chong Martínez','It is a very complete and up-to-date platform that could be applied to all levels of Medicine — from undergraduate to postgraduate and continuing medical education.','Dra. Blanca Alicia Chong Martínez','Jefe de Educación Médica Continua / Head of Basic Science and Continuous Medical Education, Facultad Mexicana de Medicina (ULSA), Mexico','/images/testimonial-1761307233476.jpg','2025-10-24 11:47:02');
/*!40000 ALTER TABLE `testimonials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
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
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test','test','test','test@gmail.com','$2b$10$uePPORngy/s3ZFauuXaeuOnQPpSpDRF7JDu.EMvekMGIncsvq3eEq','Books','Trial','Active',NULL,'2025-11-13 20:45:00','2025-11-13 20:47:45'),(2,'Super Admin','Super','Admin','superadmin@gmail.com','$2b$10$i7.7iNjrFT3HC0lZOlLYU.jT1UajZ4VOltfLkDFcCXVzPpxD2CSUS','Super Admin','Subscription','Active',NULL,'2025-11-17 20:48:46','2025-11-17 20:48:46'),(3,'Test2','Test2','Test2','Test2@gmail.com','$2b$10$NJAC2LlW.JWXgnHo1ehRBOX0UPCosbMpS87EYprC42/mXQDuPjDC6','Books','Perpetual','Active',NULL,'2025-11-17 21:06:26','2025-11-17 21:06:26');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-17 21:25:42
