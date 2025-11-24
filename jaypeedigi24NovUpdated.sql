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
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (8,'9788184484175','Medical Research','','10.5005/jp/books/19020',NULL,'','','Paid','Book','1/e','Textbook','',2008,'Live',20,343,0,0,0,0,'/books/9788184484175/cover.jpg','“Medical research: all you wanted to know but did not know whom to ask” is a comprehensive and accessible guide designed for medical students, early-career clinicians, healthcare professionals, and curious minds seeking clarity on the often-intimidating world of medical research. Written in an easy-to-understand format, the book demystifies the core principles of research methodology, study design, data analysis, ethics, and publication practices. Covering a wide spectrum—from formulating a research question to interpreting statistics and publishing in peer-reviewed journals—the book bridges the gap between theory and practice. Real-world examples, simplified explanations, and practical tips make it a valuable resource for those venturing into research for the first time or aiming to strengthen their foundation. Whether you are preparing for a thesis, evaluating scientific literature, or embarking on an independent study, this book equips you with the essential tools to understand, conduct, and critique medical research with confidence.  ','','Active','2025-11-23 08:19:30','2025-11-24 15:01:12',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(9,'9789356963825','Essentials of Ophthalmology','','10.5005/jp/books/19024',NULL,'','','Paid','Book','8/e Reprint','Textbook','',2025,'Live',28,628,0,0,0,0,'/books/9789356963825/cover.jpg','Essentials of Ophthalmology by Samar K Basak is a widely used reference book for medical students, residents, and practicing clinicians interested in the field of ophthalmology. The book provides a comprehensive yet concise overview of the key concepts, diagnostic techniques, and treatments relevant to the discipline. As of the latest editions, the book includes modern advancements in ophthalmology, ensuring that readers are up-to-date with current trends and techniques in the field. This book is divided into 28 chapters, the book begins with discussion on ocular embryology and anatomy, physiology of the eye, neurology of vision, ocular pharmacology, refraction of normal eye, and history-taking and physical examination, diseases of the eyelid, diseases of conjunctiva, diseases of the cornea, glaucoma, intraocular tumors, ocular motility, common eye surgery, surgical instruments, and blindness. The text is written in a clear, straightforward manner, making it accessible for beginners and intermediate learners in ophthalmology. The book is well-illustrated, with numerous diagrams, tables, and figures to help explain complex concepts and enhance understanding. ','','Active','2025-11-23 08:19:30','2025-11-24 15:01:12',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(10,'9789356963856','Nursing Foundation-II','','10.5005/jp/books/19022',NULL,'','','Paid','Book','2/e','Textbook','',2024,'Live',18,743,0,0,0,0,'/books/9789356963856/cover.jpg','Nursing Foundation-II by I Clement is an essential resource for nursing students, providing a thorough exploration of core nursing principles and practices. The book emphasizes the importance of holistic patient care, integrating physical, emotional, and social aspects of health. This textbook is divided into 18 chapters, which include health assessment, hygiene, nursing process, nutritional needs, elimination needs, diagnostic testing, oxygenation needs, fluid, electrolyte, and acid–base balance, sensory needs, stress and adaptation, sexuality, cultural diversity, meeting needs of perioperative patients, nursing theories, and surgical procedure. Each chapter is enriched with needed tables and diagrams, narrated with lucid language from the examination point of view. Each chapter is framed with review questions and multiple-choice questions (MCQs), designed to create interest for the students to review after reading each chapter. All the descriptions are framed on the basis of latest information; findings and evidence-based research and content are drafted in the simple form of English and facilitate reading from the examination point of view. Each chapter in the book is self-contained and subject areas have been regrouped and made more concise and relevant to the needs of today’s students.','','Active','2025-11-23 08:19:30','2025-11-24 15:01:12',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(11,'9789356969186','Manual of Histology','','10.5005/jp/books/19023',NULL,'','','Paid','Book','2/e','Textbook','',2025,'Live',18,220,0,0,0,0,'/books/9789356969186/cover.jpg','“Manual of Histology” is a comprehensive guide designed for medical students, nursing students, and allied health professionals, providing an in-depth understanding of histology. This book is based on the competencies mentioned in the Competency-Based Medical Education (CBME) for histology curriculum. This book consists of 18 chapters, which mainly focus on introduction to histology, epithelium, glandular tissue, connective tissue, cartilage, bone, muscular tissue, lymphatic system, cardiovascular system, integumentary system, respiratory system, alimentary system, urinary system, male reproductive system, female reproductive system, endocrine system, nervous system, and special senses. The text addresses both basic histological concepts and more advanced topics, including tissue development, organogenesis, and tissue pathology, providing a holistic view of histology. This book is Organized in a student-friendly manner, with clear chapter divisions, subheadings, and bullet points to help learners easily navigate and find key concepts. This book also includes review questions and practical exercises that help students revise the key concepts and prepare for exams in histology and related subjects.','','Active','2025-11-23 08:19:30','2025-11-24 15:01:12',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(12,'9789366167541','Basics of Electrotherapy','','10.5005/jp/books/19025',NULL,'','','Paid','Book','3/e','Textbook','',2025,'Live',12,344,0,0,0,0,'/books/9789366167541/cover.jpg','This third edition of Basics of Electrotherapy remains a trusted and comprehensive textbook tailored for physiotherapy students and practitioners. It has been thoroughly updated to reflect recent technological advancements and modern clinical guidelines in the field of electrotherapeutics. This book is divided into 12 chapters, which mainly focus on basic concepts and pain, electrotherapy, history of electrotherapy, muscle and nerve stimulating currents, diagnostic electrotherapy, thermotherapy, therapeutic ultrasound, cryotherapy, phototherapy, safety precautions in electrotherapy, clinical decision-making in electrotherapy, and biofeedback. The purpose of this book is to provide a foundation of knowledge for the management of most types of patients using electrotherapeutic modalities. The content is evidence-based, clearly articulated, and visually enriched with enhanced diagrams and illustrations designed to support learning. A large number of suggested readings have been included at the end.','','Active','2025-11-23 08:19:30','2025-11-24 15:01:12',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0);
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
  `first_page` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_page` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `access_type` enum('Paid','Free','Open') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Paid',
  `keywords` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `status` enum('Active','Inactive','Deleted') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Active',
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_book_chapter` (`book_id`,`chapter_number`),
  KEY `idx_book_id` (`book_id`),
  KEY `idx_book_isbn` (`book_isbn`),
  KEY `idx_chapter_number` (`chapter_number`),
  KEY `idx_chapter_title` (`chapter_title`(255)),
  KEY `idx_status` (`status`),
  KEY `idx_created_date` (`created_date`),
  CONSTRAINT `chapters_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=461 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapters`
--

LOCK TABLES `chapters` WRITE;
/*!40000 ALTER TABLE `chapters` DISABLE KEYS */;
INSERT INTO `chapters` VALUES (1,8,'9788184484175','Prelims',0,'Prelims','10.5005/jp/books/19020_1','i','xvii','Paid','','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(2,8,'9788184484175','Chapter-01',1,'What is Research and Why Should We Do It?','10.5005/jp/books/19020_2','1','5','Paid','Research, critical intellectual activity, original intellectual activity, research definition, research methodology, research requirement, research type, original exploratory activity, new knowledge acquisition  ','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(3,8,'9788184484175','Chapter-02',2,'Am I in the Right Job at the Right Place?','10.5005/jp/books/19020_3','6','12','Paid','Research, research career, research worker, experimental research, research equipment, research worker age, right place for research, quality research, research pre-requisite, research output','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(4,8,'9788184484175','Chapter-03',3,'Steps in Systematic Research','10.5005/jp/books/19020_4','13','23','Paid','Research, systematic research, systematic research step, IDEA, good research worker, research problem, research problem category, coronary heart disease, CHD, experimental design, research grant   ','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(5,8,'9788184484175','Chapter-04',4,'Experimental Design','10.5005/jp/books/19020_5','24','43','Paid','Experimental design, experimental design type, research, research type, hypothesis, null hypothesis, external validity, independent variable, dependent variable, extraneous variable, internal validity, descriptive research design, cross-over design, parallel design, post-test design, pre-test design','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(6,8,'9788184484175','Chapter-05',5,'Presentation, Analysis and Interpretation of Data','10.5005/jp/books/19020_6','44','72','Paid','Data, data presentation, data analysis, data interpretation, data type, discrete data, discontinuous data, continuous data, graphs, data condensation, central tendency measurement, dispersion measure, inferential statistics, hypothesis testing, statistical test selection','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(7,8,'9788184484175','Chapter-06',6,'Clinical Research','10.5005/jp/books/19020_7','73','86','Paid','Clinical research, systematic clinical research, randomized controlled trial, RCT, RCT objective, coronary artery disease, CAD, experimental design, randomization, blocked randomization, stratified randomization, non-randomized trial','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(8,8,'9788184484175','Chapter-07',7,'Public Health Research','10.5005/jp/books/19020_8','87','109','Paid','Public health research, public health characteristics, frequency measurement, prevalence study, incidence study, risk measurement, Cohort study, prognostic factor study, survival analysis, retrieving article, selecting article','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(9,8,'9788184484175','Chapter-08',8,'Mental Health Research','10.5005/jp/books/19020_9','110','116','Paid','Mental health research, clinical research, psychiatric disorder, psychiatric disorder treatment, non-formal case study, non-formal case study limitation, research design-based case study, quasi-experimental case study, test standardization, psychometric test limitation','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(10,8,'9788184484175','Chapter-09',9,'Laboratory Research','10.5005/jp/books/19020_10','117','131','Paid','Laboratory research, biological research material, preliminary preparation, standard operations procedure, sample collection, quality assurance, quality control, constant systematic error, CSE, proportional systematic error, PSE, quality control pool, calibration material','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(11,8,'9788184484175','Chapter-10',10,'Qualitative Research','10.5005/jp/books/19020_11','132','148','Paid','Qualitative research, hypertension, coronary artery disease, qualitative research subjectivity, qualitative research flexibility, qualitative research aims, hypothesis, quantitative research, project genesis, literature review, sampling, deviant case sampling, maximum variation sampling, homogenous sampling, typical case sampling, critical case sampling, convenience sampling, data collection, data analysis, data interpretation','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(12,8,'9788184484175','Chapter-11',11,'Beyond Scientific Research?','10.5005/jp/books/19020_12','149','165','Paid','Scientific research, scientific research method, yoga, research on yoga, transcendental meditation effect, research limitation, yoga physiological effect, RCT designing, electroencephalography, positron emission tomography, research on spiritual healing, research on intercessory prayer','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(13,8,'9788184484175','Chapter-12',12,'How to Make a Research Grant Application?','10.5005/jp/books/19020_13','166','182','Paid','Research grant application, research grant application importance, valuable research, foreign exchange component, FEC, Programme evaluation and review technique, PERT, ethical clearance, research grant application expert review, research grant application committee review','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(14,8,'9788184484175','Chapter-13',13,'How to Write a Thesis?','10.5005/jp/books/19020_14','183','199','Paid','Research, thesis, thesis work, research topic selection, thesis step, work on thesis, writing up thesis, thesis anatomy, thesis method, thesis result, reference collection, thesis defence, proof reading, citations section ','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(15,8,'9788184484175','Chapter-14',14,'How to Write a Research Paper?','10.5005/jp/books/19020_15','200','218','Paid','Research paper, publishing research work, IMRAD, IMRAD structure, literature review, statistical technique, raw data, quantitative data, data interpretation, post-IMRAD, non-IMRAD, reference list, abstract, acknowledgement, paper packaging, article processing, scientific publication, Indian council of medical research, ICMR','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(16,8,'9788184484175','Chapter-15',15,'How to Present Research Work at a Conference?','10.5005/jp/books/19020_16','219','229','Paid','Research work, oral presentation, poster presentation, abstract, transparencies, slide making, PowerPoint slide, template, data different type, speaking, poster presentation, poster carrying','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(17,8,'9788184484175','Chapter-16',16,'Ethics of Experimentation on Human Subjects','10.5005/jp/books/19020_17','230','244','Paid','Medical research, human subject experimentation ethics, historical background, world medical association, WMA, Indian council of medical research, ICMR, ICMR guideline, ethical consideration, planning, informed consent, ethics committee, institutional ethics committee, self-experimentation, exploiting ethics, beyond ethics ','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(18,8,'9788184484175','Chapter-17',17,'Ethics of Experimentation on Animals','10.5005/jp/books/19020_18','245','255','Paid','Experimentation on animals ethics, human experiment, case against animal experiment, case for animal experiment, official response, ICMR, human study, tissue culture study, cell culture study, ethical principle','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(19,8,'9788184484175','Chapter-18',18,'Is There a Method About the Madness Called Research?','10.5005/jp/books/19020_19','256','264','Paid','Research, research method, scientific method, scientific method principle, scientific method process, scientific knowledge, attitudinal essential, typical sequence, scientific revolution','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(20,8,'9788184484175','Chapter-19',19,'Why Not We?','10.5005/jp/books/19020_20','265','285','Paid','Scientific activity, usual explanations, usual scapegoats, our culture, our slavery, our working condition, Indian science today, science education, mental education, science future prediction','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(21,8,'9788184484175','Chapter-20',20,'Science and Spirituality','10.5005/jp/books/19020_21','286','294','Paid','Science, spirituality, scientific method, experimental design, hypothesis, spiritual method, yoga, spiritual experiments replication, environmental degradation, spiritual experiment replication, spirituality goal','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(22,8,'9788184484175','Appendix-I',21,'Is Medical Research in India a Fraud?','10.5005/jp/books/19020_22','295','297','Paid','','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(23,8,'9788184484175','Appendix-II',22,'Dilemma of Fresh Medical Graduates','10.5005/jp/books/19020_23','298','302','Paid','','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(24,8,'9788184484175','Appendix-III',23,'Inspired and Inspiring Thoughts','10.5005/jp/books/19020_24','303','320','Paid','','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(25,8,'9788184484175','Appendix-IV',24,'Sources of Funding for Medical Research in India','10.5005/jp/books/19020_25','321','322','Paid','','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(26,8,'9788184484175','Index',25,'Index','10.5005/jp/books/19020_26','323','326','Paid','','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(27,8,'9788184484175','case1',125,'Case Presentation Proforma','','149','165','Paid','Case presentation, common data, chief complaints, history, personal history, family history, treatment history, general examination, local examination','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(28,8,'9788184484175','case2',126,'Case Sheet Presentation for Inguinal Hernia, Varicose Veins, Thyroid Swelling, Thromboangiitis Obliterans, Abdominal Lumps and Gastric Outlet Obstruction ','','166','182','Paid','Typical case sheet, inguinal hernia, history, local examination, varicose veins, clinical examination, thyroid swelling, abdominal lumps, carcinoma breast   ','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(29,9,'9789356963825','Prelims',0,'Prelims','10.5005/jp/books/19024_1','i','xx','Paid','','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(30,9,'9789356963825','Chapter-01',1,'Embryology and Anatomy','10.5005/jp/books/19024_2','1','25','Paid','Ophthalmology, eyeball embryology, eyeball anatomy, globe, cornea, sclera, limbus, uvea, ciliary body, choroid, crystalline lens, conjunctiva, extraocular muscles, lacrimal apparatus, lymphatic drainage, Tenon’s Capsule, orbit, Arteries, Veins ','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(31,9,'9789356963825','Chapter-02',2,'Physiology of the Eye','10.5005/jp/books/19024_3','26','31','Paid','Eye physiology, cornea, lens, tears, aqueous humor, lens transparency, peripheral cornea, metabolism, wound healing, tears composition, ultrafiltration, cataract pathogenesis, tears circulation, precorneal tear film function, aqueous humor formation, aqueous humor circulation','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(32,9,'9789356963825','Chapter-03',3,'Physiology of Vision','10.5005/jp/books/19024_4','32','41','Paid','Vision physiology, electro-oculography, electroretinography, visual-evoked potential, visual perception, light effect, photochemical change, electrical change, retinal pigment epithelium, electroretinography waveform, electroretinography clinical significance, visual-evoked potential clinical significance, light sense, color sense','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(33,9,'9789356963825','Chapter-04',4,'Neurology of Vision','10.5005/jp/books/19024_5','42','46','Paid','Neurology, vision neurology, neurology visual pathways, hemianopia, papillomacular bundle, pupillary pathway, pupil function, pupillary reflex, light reflex, near reflex, sensory reflex, Horner’s syndrome, pupillary reflexes common anomaly, Hippus, Marcus Gunn pupil, Argyll Robertson’s pupil, Adie’s pupil ','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(34,9,'9789356963825','Chapter-05',5,'Ocular Pharmacology','10.5005/jp/books/19024_6','47','64','Paid','Ocular pharmacology, drug delivery system, antibiotics, antivirals, antifungal, autonomic drugs, local anesthetics, antiglaucoma medication, ocular hypotensive, corticosteroids, triamcinolone acetonide, nonsteroidal anti-inflammatory drug, viscoelastic substance, immunosuppressive agent in ophthalmology, anti-vascular endothelial growth factor agents, ocular preservative, astringents, decongestant','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(35,9,'9789356963825','Chapter-06',6,'Refraction of the Normal Eye','10.5005/jp/books/19024_7','65','69','Paid','Normal eye refraction, eye optical system, schematic eye, reduced eye, physiological optical defects, retinal images formation, Purkinje-sanson images, catoptric imagery, entoptic imagery, cornea role in eye, lens role in eye','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(36,9,'9789356963825','Chapter-07',7,'Refractive Errors','10.5005/jp/books/19024_8','70','85','Paid','Refractive error, refractive error classification, hypermetropia, long-sightedness, myopia, short-sightedness, astigmatism, aphakia, aphakia etiology anisometropia, emmetropia, ametropia, photorefractive keratoplasty, cataract surgery, hypermetropia clinical type, hypermetropia etiology, hypermetropia clinical type, myopia etiology, myopia clinical type, anisometropia etiology, anisometropia treatment','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(37,9,'9789356963825','Chapter-08',8,'Accommodation and its Disturbances','10.5005/jp/books/19024_9','86','89','Paid','Accommodation, accommodation mechanism, accommodation pathway, accommodation range, physical accommodation, physiological accommodation, presbyopia, presbyopia causes, presbyopia symptoms, presbyopia treatment, accommodation insufficiency, accommodation spasm','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(38,9,'9789356963825','Chapter-09',9,'Estimation and Correction of Refractive Errors','10.5005/jp/books/19024_10','90','95','Paid','Refractive error correction, Refractive error estimation, refractive error objective method, refractive error subjective method, retinoscopy, refractometry, keratometry, fundus examination, ophthalmoscopy method, postcycloplegic test, dark-room test, direct ophthalmoscopy, indirect ophthalmoscopy, objective optometry, refraction subjective verification','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(39,9,'9789356963825','Chapter-10',10,'History-taking and Examination of an Eye Case','10.5005/jp/books/19024_11','96','124','Paid','Eye case, eye case history, eye case examination, slit lamp examination, eye clinical examination, general examination, ocular examination, uniocular loupe, binocular loupe, direct diffuse illumination, direct focal illumination, retroillumination, conjunctiva, corneal sensation, lacrimal apparatus','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(40,9,'9789356963825','Chapter-11',11,'Diseases of the Eyelids','10.5005/jp/books/19024_12','125','148','Paid','Eyelids disease, congenital abnormality, shape abnormality, position abnormality, lid tumor, epicanthus, blepharophimosis, entropion, cicatricial, ectropion, trichiasis, lagophthalmos, symblepharon, floppy eyelid syndrome, blepharospasm, blepharitis, meibomianitis, external hordeolum ','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(41,9,'9789356963825','Chapter-12',12,'Diseases of the Conjunctiva','10.5005/jp/books/19024_13','149','177','Paid','Conjunctival diseases, hyperemia, Conjunctivitis, acute mucopurulent conjunctivitis, purulent conjunctivitis, membranous conjunctivitis, simple chronic conjunctivitis, angular conjunctivitis, follicular conjunctivitis, allergic conjunctivitis, phlyctenular conjunctivitis, vernal conjunctivitis, conjunctival degeneration, conjunctival cyst, conjunctival tumor, conjunctiva symptomatic condition','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(42,9,'9789356963825','Chapter-13',13,'Diseases of the Cornea and Sclera','10.5005/jp/books/19024_14','178','222','Paid','Cornea disease, Sclera disease, corneal disease evaluation, congenital anomaly, corneal edema, bacterial keratitis, hypopyon corneal ulcer, mycotic keratitis, keratomycosis, Acanthamoeba keratitis, herpes zoster ophthalmicus, neurotrophic keratitis, atheromatous ulcer, peripheral ulcerative keratitis, phlyctenular keratitis, interstitial keratitis, contact lens, cornea inflammation, recurrent HSV keratitis, lagophthalmic keratitis, exposure keratitis, corneal degeneration, corneal dystrophy','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(43,9,'9789356963825','Chapter-14',14,'Diseases of the Uvea','10.5005/jp/books/19024_15','223','255','Paid','Uvea disease, uveal disease, congenital anomaly, uveitis, anterior uveitis, Iridocyclitis, intermediate uveitis, posterior uveitis, specific uveitic entity, juvenile rheumatoid arthritis, tubercular uveitis, sarcoid uveitis, toxoplasmosis, toxocariasis, Behçet’s disease, Vogt-Koyanagi-Harada syndrome, sympathetic ophthalmitis, glaucomatocyclitic crisis, cytomegalovirus retinitis, onchocerciasis, presumed ocular histoplasmosis syndrome, acute retinal necrosis, acquired immunodeficiency syndrome, uveal tract degeneration, rubeosis iridis, choroidal degeneration, choroidal detachment, iris cyst','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(44,9,'9789356963825','Chapter-15',15,'Diseases of the Lens','10.5005/jp/books/19024_16','256','285','Paid','Lens disease, lens congenital anomaly, ectopia lentis, lens-induced ocular disease, cataract, congenital cataract, developmental cataract, senile cataract, cataract management, specific cataract entity, lens subluxation, lens dislocation','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(45,9,'9789356963825','Chapter-16',16,'Glaucoma','10.5005/jp/books/19024_17','286','322','Paid','Glaucoma, Glaucoma definition, intraocular pressure, corneal thickness, congenital glaucoma, infantile glaucoma, Buphthalmos etiopathogenesis, Buphthalmos symptoms, Buphthalmos signs, Buphthalmos management, acquired glaucoma, primary angle-closure glaucoma, primary open-angle glaucoma, secondary glaucoma','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(46,9,'9789356963825','Chapter-17',17,'Diseases of the Vitreous','10.5005/jp/books/19024_18','323','329','Paid','Vitreous disease, vitreous humor, vitreous detachment, vitreous opacity, vitreous hemorrhage, vitrectomy, vitreous humor composition, syneresis, posterior vitreous detachment, asteroid hyalosis, synchysis scintillans, pars plana vitrectomy','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(47,9,'9789356963825','Chapter-18',18,'Diseases of the Retina','10.5005/jp/books/19024_19','330','360','Paid','Retina disease, retina disease symptom, ophthalmoscopic finding, fundus examination, ophthalmoscopy method, retinal vascular disorder, retinal vein occlusion, central retinal venous occlusion, branch retinal venous occlusion, central serous retinopathy, fundus fluorescein angiography, cystoid macular edema, age-related macular degeneration, retinitis pigmentosa, retinal detachment, rhegmatogenous retinal detachment, tractional retinal detachment, exudative retinal detachment, hypertensive retinopathy, diabetic retinopathy ','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(48,9,'9789356963825','Chapter-19',19,'Diseases of the Optic Nerve','10.5005/jp/books/19024_20','361','374','Paid','Optic nerve, optic nerve disease, optic nerve disease symptom, optic nerve disease sign, developmental abnormality, optic neuritis, toxic amblyopias, toxic optic neuropathy, anterior ischemic optic neuropathy, papilledema, optic atrophy, optic nerve tumor, persistent hyaloid artery, optic disc pit, tilted optic disc, centrocecal scotoma, drug-induced toxic amblyopia','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(49,9,'9789356963825','Chapter-20',20,'Intraocular Tumors','10.5005/jp/books/19024_21','375','386','Paid','Intraocular tumor, iris tumor, ciliary body tumor, choroidal tumor, choroidal hemangioma, retinoblastoma, leukocoria differential diagnosis, malignant melanoma, medulloepithelioma, benign melanoma, metastatic choroidal tumor, intraocular malignancy, large endophytic retinoblastoma','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(50,9,'9789356963825','Chapter-21',21,'Diseases of the Orbit','10.5005/jp/books/19024_22','387','403','Paid','Orbit disease, developmental anomaly, proptosis, proptosis investigation, orbital inflammation, thyroid ophthalmopathy, rhabdomyosarcoma, optic nerve tumor, cavernous sinus thrombosis, carotid-cavernous fistula, orbit fracture','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(51,9,'9789356963825','Chapter-22',22,'Diseases of the Lacrimal Apparatus','10.5005/jp/books/19024_23','404','419','Paid','Lacrimal apparatus disease, Lacrimal apparatus disease symptoms, Lacrimal apparatus disease sign, lacrimal gland disease, dry eye syndrome, lacrimal sac tumor, lacrimal passage disease, lacrimal sac tumor, acute dacryoadenitis, chronic dacryoadenitis, Mikulicz syndrome, vital dye staining, differential leukocyte count, dacryocystitis','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(52,9,'9789356963825','Chapter-23',23,'Ocular Motility: Squint','10.5005/jp/books/19024_24','420','443','Paid','Ocular motility, ocular movement, visual development, diplopia, amblyopia, squint, strabismus, concomitant squint, paralytic squint, Duane’s retraction syndrome, nystagmus, duction, supranuclear movement, binocular single vision, supranuclear eye movement, diplopia classification, physiological diplopia, pathological diplopia, latent squint, concomitant squint treatment ','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(53,9,'9789356963825','Chapter-24',24,'Ocular Injuries','10.5005/jp/books/19024_25','444','464','Paid','Ocular injury, mechanical injury, mechanical injury classification, contusions, blunt injury, blow-out fracture, open-globe injury, penetrating injury, perforating injury, foreign body, chemical injury, thermal burns, radiational injury','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(54,9,'9789356963825','Chapter-25',25,'Common Eye Surgeries','10.5005/jp/books/19024_26','465','503','Paid','Common eye surgery, dacryocystorhinostomy, dacryocystectomy, general principle, preoperative preparation, postoperative care, postoperative treatment, manual small incision cataract surgery, phacoemulsification, femtosecond laser cataract surgery, intracapsular cataract extraction, intraocular lens implantation, glaucoma operation, cyclocryotherapy, cyclophotocoagulation, tarsorrhaphy, pterygium operation, chalazion operation','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(55,9,'9789356963825','Chapter-26',26,'Blindness and its Prevention','10.5005/jp/books/19024_27','504','521','Paid','Blindness, vitamin A deficiency, visual impairment category, legal blindness, economical blindness, visually handicapped, preventable blindness, curable blindness, manpower development, xerophthalmia, onchocerciasis','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(56,9,'9789356963825','Chapter-27',27,'Surgical Instruments','10.5005/jp/books/19024_28','522','559','Paid','Surgical instrument, eye speculums, Silcock’s needle holder, Arruga’s needle holder, artery forceps, fixation forceps, Von Graefe’s cataract knife, conjunctival scissors, scalpel handle, blade breaker, thermocautery, plain dissecting forceps, iris forceps, De-Wecker’s iris scissor, intracapsular forceps, lens expressor, colibri forceps, bone punch, lacrimal cannula, chalazion scoop, ophthalmic lens, retinoscope, prism, St. Martin’s forceps, superior rectus holding forceps, capsulotomy forceps, Vannas’ scissors, Angular keratome, Disc-Holding forceps, Beer’s knife, Stenopeic slit, Jackson’s cross cylinder, sterilization method','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(57,9,'9789356963825','Chapter-28',28,'Miscellaneous','10.5005/jp/books/19024_29','560','588','Paid','Miscellaneous, laser in ophthalmology, cryotherapy in ophthalmology, fluorescein dye, ultrasonography, ultrasound biomicroscopy, ocular emergency, subconjunctival injection, sub-tenon injection, intravitreal injection, ocular infection laboratory diagnosis, corneal topography, corneal tomography, specular microscopy, scanning laser polarimetry, optical coherence tomography, computer vision syndrome, migraine, eye disease, COVID-19 ocular manifestation','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(58,9,'9789356963825','Index',29,'Index','10.5005/jp/books/19024_30','589','608','Paid','','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(59,10,'9789356963856','Prelims',0,'Prelims','10.5005/jp/books/19022_1','i','xxiii','Paid','','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(60,10,'9789356963856','Chapter-01',1,'Health Assessment','10.5005/jp/books/19022_2','1','47','Paid','Health assessment, health observation technique, health assessment purpose, health assessment process, health history, physical examination, general assessment, each body system assessment, documenting health assessment finding, factors affecting health assessment, mental health assessment, admission assessment, pain assessment, shift assessment, focused assessment, head to toe examination, nurse role in health assessment, health assessment recording','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(61,10,'9789356963856','Chapter-02',2,'Nursing Process','10.5005/jp/books/19022_3','48','97','Paid','Nursing process, Nursing process terminology, Nursing process abbreviation, Personal Critical Thinking Indicator, Nursing Judgment, nursing diagnosis, nursing planning, nursing implementation, nursing evaluation, nursing judgment, critical thinking importance, good critical thinker characteristics, critical thinking enhancement behavior, concept mapping, nursing assessment, planning type, nursing process overview, Nanda approved diagnosis','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(62,10,'9789356963856','Chapter-03',3,'Nutritional Needs','10.5005/jp/books/19022_4','98','132','Paid','Nutritional needs, nutritional needs terminology, nutrition importance, nutritional assessment, factors affecting nutritional needs, special diet, therapeutic diet, dysphagia, anorexia, nausea, vomiting, parenteral nutrition, polyunsaturated fatty acid, food guide pyramid, nasogastric tube insertion, gastric gavage, gastrojejunostomy feeding, breastfeeding, artificial feeding,  total parenteral nutrition, gastric analysis ','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(63,10,'9789356963856','Chapter-04',4,'Hygiene','10.5005/jp/books/19022_5','133','171','Paid','Hygiene, hygiene terminology, hygiene clinical significance, hygiene type, personal hygiene, factors influencing hygienic practice, hygienic care, skin care, pressure ulcer assessment, pressure ulcer cause, pressure ulcer stage, pressure ulcer manifestation, pressure ulcer prevention, oral hygiene, bed bath, eye care, hand care, back care, pressure point care, hair care maintaining, hair combing, pediculosis treatment, dentures care, dentures care, hearing aid care','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(64,10,'9789356963856','Chapter-05',5,'Elimination Needs','10.5005/jp/books/19022_6','172','221','Paid','Elimination needs, urinary elimination, monitoring urinary output, urinal use, bowel elimination, urinary bladder catheterization, continuous bladder irrigation, collecting urine specimen, urine culture, urine testing, bowel elimination physiology, bowel wash, colostomy irrigation, factors influencing urination, facilitating urine elimination, intermittent catheterization, indwelling urinary catheter, urinary drainage, urinary diversion, bladder irrigation, bowel diversion procedure','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(65,10,'9789356963856','Chapter-06',6,'Diagnostic Testing','10.5005/jp/books/19022_7','222','277','Paid','Diagnostic testing, complete blood count, serum electrolyte, LFT, liver function test, lipoprotein profile, monitoring capillary blood glucose, glucometer random blood sugar, stool routine examination, urine testing, radiologic procedure, endoscopic procedure, bone marrow biopsy, sputum culture, blood smear, blood culture, throat swab, urine testing, endoscopy, radiological study','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(66,10,'9789356963856','Chapter-07',7,'Oxygenation Needs','10.5005/jp/books/19022_8','278','322','Paid','Oxygenation needs, oxygenation needs terminology, respiratory physiology, cardiovascular physiology, factors affecting respiratory functioning, respiration type, respiration assessment, respiration management, oxygen therapy need, factors affecting oxygenation, nasal cannula, nasal catheter, oxygen mask, oxygen tent, home oxygen therapy, airway management, oropharyngeal airway, nasopharyngeal airway, endotracheal tube, tracheostomy tube, artificial airway management, oxygen transport, chest physiotherapy percussion, pulse oximetry, hydration, humidification, coughing technique, breathing exercise, incentive spirometry ','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(67,10,'9789356963856','Chapter-08',8,'Fluid, Electrolyte and Acid-Base Balances','10.5005/jp/books/19022_9','323','376','Paid','Fluid, electrolyte, acid–base balance, factors affecting fluid, factors affecting electrolyte, factors affecting acid-base balance, fluid volume disturbance, deficit-hypovolemia dehydration, excess-fluid overload edema, electrolyte imbalance, intravenous therapy, peripheral venipuncture sites, blood component, restricting fluid intake, fluid intake, water intake source, body fluids physiology, factors affecting fluid movement, fluid imbalance, hypovolemia, edema, blood transfusion','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(68,10,'9789356963856','Chapter-09',9,'Administration of Medications','10.5005/jp/books/19022_10','377','446','Paid','Medication administration, medication order, drug nomenclature, factors influencing medication action, medication orders, medication dose calculation, drug storage, drug maintenance, inhalation, needle-stick injury prevention, bioavailability, drug source, medicine care, medicine cupboard, oral medication, safe medication administration, injection, intramuscular injection, subcutaneous injection, intradermal injection, intravenous injection, intravenous infusion, transdermal route, transmucosal, topical drug application, instilling nasal drops, eye irrigation, bladder irrigation, bowel irrigation, colostomy irrigation, endotracheal drug administration','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(69,10,'9789356963856','Chapter-10',10,'Sensory Needs','10.5005/jp/books/19022_11','447','476','Paid','Sensory needs, sensory needs terminology, sensory experience reception component, arousal mechanism, factors affecting sensory function, unconsciousness, artificial airway, sensory integration concept, fiber type, sensory cortex, sensory experience component, factors influencing sensory function, sensory system physiology, sensory organ functioning, sensory alteration, sensory deficits, sensory deprivation, sensory overload, unconscious patient care','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(70,10,'9789356963856','Chapter-11',11,'Care of Terminally Ill, Death and Dying','10.5005/jp/books/19022_12','477','506','Paid','Terminally ill care, grief manifestation, impending death sign, dying patient care, death declaration, death certification, death autopsy, death embalming, death care, organ donation, loss classification, loss, grief, grief type, grief stages, grief process, documentation death, medicolegal issue, postmortem care','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(71,10,'9789356963856','Chapter-12',12,'Self-concept','10.5005/jp/books/19022_13','507','527','Paid','Self-concept, factors affecting self-concept, nursing management, self-concept characteristics, self-concept development, self-concept type, positive health concept, Erikson’s theory, body image, role performance, self-esteem, self-concept disturbance, disturbed body image, self-concept theory, self-concept component, self-concept assessment, situational low self-esteem','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(72,10,'9789356963856','Chapter-13',13,'Sexuality','10.5005/jp/books/19022_14','528','556','Paid','Sexuality, Sexuality terminology, sexual health concern, sexual development throughout life, sexual health, sexual orientation, factors affecting sexuality, sexual harassment, sexual behavior, sexuality model circle, sexuality component, sexual health characteristics, sexual health importance, myths about sexuality, sexual response cycle, sexual dysfunction, unwanted pregnancy prevention, sexually transmitted disease prevention, sexual health education, prevention sexual abuse','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(73,10,'9789356963856','Chapter-14',14,'Stress and Adaptation','10.5005/jp/books/19022_15','557','583','Paid','Stress, adaptation, stress type, stress sources, stress effect, stress type, general adaptation syndrome, GAS, local adaptation syndrome, LAS, stress management, recreational therapy, diversion therapy, stress continuum, crisis intervention, maladaptive grief response','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(74,10,'9789356963856','Chapter-15',15,'Cultural Diversity and Spirituality','10.5005/jp/books/19022_16','584','611','Paid','Cultural diversity, cultural spirituality, cultural concept, transcultural nursing, cultural competence, factors affecting spirituality, multicultural concept, subculture concept, providing culturally responsive care, psychosocial care, acute illness, chronic illness, terminal illness, age-specific spiritual intervention, spirituality characteristics','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(75,10,'9789356963856','Chapter-16',16,'Nursing Theories','10.5005/jp/books/19022_17','612','629','Paid','Nursing theory, nursing purpose, nursing theory type, nursing theory history, nursing metaparadigm, nursing theory component, theoretical nursing model, nursing theory importance, nursing theory type, Peplau’s theory, Henderson’s theory, Orem’s theory, Neuman’s theory, nursing theory development ','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(76,10,'9789356963856','Chapter-17',17,'Meeting Needs of Perioperative Patients','10.5005/jp/books/19022_18','630','670','Paid','Perioperative nursing concept, operation theater set-up, postoperative phrase, wounds type, surgical asepsis, drainage care, perioperative nursing objective, perioperative nursing phase, surgical procedure classification, surgical process step, intraoperative phase, wound classification, wound healing process, factors affecting wound healing, wound suturing, surgical dressing, suture removal','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(77,10,'9789356963856','Chapter-18',18,'Surgical Procedures','10.5005/jp/books/19022_19','671','694','Paid','Surgical procedure, abdominal paracentesis, thoracentesis, lumbar puncture, bone marrow biopsy, surgical dressing, liver biopsy, wound care, dressing type, dry dressing, wet dressing, pressure dressing','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(78,10,'9789356963856','Index',19,'Index','10.5005/jp/books/19022_20','695','714','Paid','','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(79,11,'9789356969186','Prelims',0,'Prelims','10.5005/jp/books/19023_1','i','xx','Paid','','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(80,11,'9789356969186','Chapter-01',1,'Introduction to Histology','10.5005/jp/books/19023_2','1','6','Paid','Histology, microanatomy, microanatomy importance, microanatomy technique, microscope, compound microscope, cell, epithelial cell, connective cell, muscular cell, nervous cell, smooth muscle cell, skeletal muscle cell, cytoplasm','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(81,11,'9789356969186','Chapter-02',2,'Epithelium','10.5005/jp/books/19023_3','7','19','Paid','Epithelium, cell adhesive molecule, simple squamous epithelium, simple cuboidal epithelium, simple columnar epithelium, pseudostratified epithelium, stratified epithelium, stratified squamous epithelium, stratified cuboidal epithelium, stratified columnar epithelium, transitional epithelium, simple epithelia, stratified epithelia, metaplasia, epithelial cell-derived tumor','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(82,11,'9789356969186','Chapter-03',3,'Glandular Tissue','10.5005/jp/books/19023_4','20','30','Paid','Glandular tissue, gland, gland classification, exocrine gland, endocrine gland, unicellular gland, multicellular gland, simple gland, compound gland, epicrine gland, apocrine gland, holocrine gland, cytocrine gland, serous gland, mucous gland, seromucous gland, acini','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(83,11,'9789356969186','Chapter-04',4,'Connective Tissue','10.5005/jp/books/19023_5','31','51','Paid','Connective tissue, connective tissue type, general feature, embryonic connective tissue, connective tissue classification, connective tissue component, cell, connective tissue cell, connective tissue fiber, fibroblasts, mast cells, plasma cell, plasmatocytes, pigment cell, collagen fiber, reticular fiber, dense connective tissue ','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(84,11,'9789356969186','Chapter-05',5,'Cartilage','10.5005/jp/books/19023_6','52','57','Paid','Cartilage, cartilages type, hyaline cartilage, white cartilage, elastic cartilage, yellow cartilage, fibrocartilage, basophilic homogenous matrix, elastic fibers, cartilage tumor, hyaline cartilage degeneration','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(85,11,'9789356969186','Chapter-06',6,'Bone','10.5005/jp/books/19023_7','58','63','Paid','Bone, bone classification, morphologically bone, microscopically bone, compact bone, cancellous bone, woven bone, lamellar bone, cell, osteoprogenitor cell, osteoblast, osteocytes, osteoclasts, spongy bone','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(86,11,'9789356969186','Chapter-07',7,'Muscular Tissue','10.5005/jp/books/19023_8','64','71','Paid','Muscular tissue, muscle fiber, connective tissue, smooth endoplasmic reticulum, mitochondria, skeletal muscle, smooth muscle, cardiac muscle, myoepithelial cell, myofibroblasts cell, clinical correlation, vertical integration','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(87,11,'9789356969186','Chapter-08',8,'Lymphatic System','10.5005/jp/books/19023_9','72','80','Paid','Lymphatic system, lymph node microanatomy, spleen microanatomy, thymus microanatomy, tonsil microanatomy, lymphoid organ, lymphatic system component, lymphoid tissue classification, diffuse lymphoid tissue, dense lymphoid tissue  ','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(88,11,'9789356969186','Chapter-09',9,'Cardiovascular System','10.5005/jp/books/19023_10','81','92','Paid','Cardiovascular system, muscular blood vessel, blood vessel, blood vessel type, arteries, capillaries, veins, blood vessel structure, conducting artery, large artery, elastic artery, distributing artery, arteriole, venules, large vein, muscular artery','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(89,11,'9789356969186','Chapter-10',10,'Integumentary System','10.5005/jp/books/19023_11','93','98','Paid','Integumentary system, skin, skin appendages, skin type, skin type structure, thin skin, hairy skin, glabrous skin, thick skin, epidermis skin, dermis skin, epidermis cell, mammary gland, ceruminous gland, meibomian gland, sebaceous gland','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(90,11,'9789356969186','Chapter-11',11,'Respiratory System','10.5005/jp/books/19023_12','99','106','Paid','Respiratory system, parathyroid gland microanatomy, nasal cavity, pharynx, larynx, trachea, bronchial tree, respiratory system component, respiratory system function, principal bronchi, intrapulmonary bronchi, alveolar ducts, epiglottis','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(91,11,'9789356969186','Chapter-12',12,'Alimentary System','10.5005/jp/books/19023_13','107','130','Paid','Alimentary system, tongue microanatomy, salivary gland microanatomy, gastrointestinal system microanatomical feature, duodenum, jejunum, lleum, large intestine, appendix, liver, gallbladder, tooth histological structure, parotid gland, submandibular gland, gastrointestinal tract general plan, small intestine ','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(92,11,'9789356969186','Chapter-13',13,'Urinary System','10.5005/jp/books/19023_14','131','140','Paid','Urinary system, urinary system microanatomical feature, kidney, ureter, urinary bladder, nephron, collecting tubule, juxta glomerular apparatus, renal circulation, Bowman’s capsule, kidney cortex, kidney medulla, urinary bladder ','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(93,11,'9789356969186','Chapter-14',14,'Male Reproductive System','10.5005/jp/books/19023_15','141','149','Paid','Male reproductive system, male reproductive system microanatomical feature, testis, epididymis, vas deferens, prostate gland, seminal vesicles, spermatogenesis, spermatogonium, primary spermatocyte, secondary spermatocyte, spermatid','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(94,11,'9789356969186','Chapter-15',15,'Female Reproductive System','10.5005/jp/books/19023_16','150','162','Paid','Female reproductive system, ovary, uterus, uterine tube, cervix, placenta, umbilical cord, female reproductive system microanatomical feature, fallopian tube, vagina, mammary gland, human placenta, endometrium, myometrium, perimetrium, ectopic pregnancy, cervical carcinoma','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(95,11,'9789356969186','Chapter-16',16,'Endocrine System','10.5005/jp/books/19023_17','163','173','Paid','Endocrine system, pituitary gland anatomy, thyroid gland anatomy, gastrointestinal system, gastrointestinal system microanatomical feature, suprarenal gland, endocrine gland, endocrine tissue, hypophysis cerebri, adrenal gland, Cushing’s syndrome, hyperparathyroidism','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(96,11,'9789356969186','Chapter-17',17,'Nervous System','10.5005/jp/books/19023_18','174','191','Paid','Nervous system, spinal cord microanatomical feature, cerebellum microanatomical feature, cerebrum microanatomical feature, unipolar neuron, ganglia, peripheral nerve, multipolar neuron, excitable cell, non-excitable cell, neuroglial cell, neuron cell, nerve cell, multipolar neuron structure, nerve fiber, cerebral cortex','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(97,11,'9789356969186','Chapter-18',18,'Special Senses','10.5005/jp/books/19023_19','192','198','Paid','Special senses, cornea structure, retina structure, uveal tract, middle vascular coat, inner photosensitive coat, corneal epithelium, Bowman’s membrane, Descemet’s membrane, posterior limiting membrane, pigment epithelium, nervous layer, eyeball','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(98,11,'9789356969186','References',19,'References','10.5005/jp/books/19023_20','199','199','Paid','','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(99,12,'9789366167541','Prelims',0,'Prelims','10.5005/jp/books/19025_1','i','xviii','Paid','','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(100,12,'9789366167541','Chapter-01',1,'Basic Concepts and Pain','10.5005/jp/books/19025_2','1','34','Paid','Pain, pain basic concept, electricity, electricity basic concept, electrical charge production, charged body characteristics, lines of forces characteristics, potential difference, current electricity, resistance, fuse, Ohm’s law, electrical shocks, electrical burn, chemical burns, condensers, magnetism, electromagnetic induction, electromagnetic spectrum, transcranial magnetic stimulation, ionization, pain perception, pain pathway, pain measurement','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(101,12,'9789366167541','Chapter-02',2,'What is Electrotherapy?','10.5005/jp/books/19025_3','35','54','Paid','Electrotherapy, low-frequency current, medium-frequency current, high-frequency current, phototherapy, electrodiagnosis, biofeedback, current classification, active modality, passive modality, electrotherapy approaches, electrotherapy key purpose, muscle contraction, gate control theory, low-frequency current action mechanism, current clinical application, short-wave diathermy, microwave diathermy, therapeutic ultrasound','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(102,12,'9789366167541','Chapter-03',3,'History of Electrotherapy','10.5005/jp/books/19025_4','55','64','Paid','Electrotherapy, electrotherapy history, muscle-nerve stimulation, iontophoresis, high-frequency currents, phototherapy, electricity medical use, electrotherapy history timeline, electro-sleep therapy, cranial electrotherapy stimulation, apparatus, electric bath, electrical foot bath, pulvermacher electric chain','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(103,12,'9789366167541','Chapter-04',4,'Muscle and Nerve Stimulating Currents','10.5005/jp/books/19025_5','65','124','Paid','Nerve stimulating current, muscle stimulating current, direct current, faradic current, interrupted direct current, peripheral nerve injury physiotherapy, nerve injury classification, transcutaneous electrical nerve stimulation, interferential current, Russian current, sinusoidal current, high voltage pulsed galvanic current, diadynamic current ','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(104,12,'9789366167541','Chapter-05',5,'Diagnostic Electrotherapy','10.5005/jp/books/19025_6','125','169','Paid','Diagnostic electrotherapy, electrodiagnosis, rheobase, chronaxie, strength-duration curve, pulse ratio, faradic interrupted direct current test, nerve conductivity test, nerve distribution test, neurotization time, Galvanic-tetanus ratio, dermo ohmometry, polar formula, myotonic reaction, degeneration reaction, electromyography, motor unit potential','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(105,12,'9789366167541','Chapter-06',6,'Thermotherapy','10.5005/jp/books/19025_7','170','201','Paid','Thermotherapy, short-wave diathermy, microwave diathermy, long-wave diathermy, Oudin current, paraffin wax bath therapy, hot packs, electrical heating pads, high-frequency current application, short-wave diathermy advantage, short-wave diathermy production, short-wave diathermy therapeutic effects, MWD production, MWD advantage, MWD indication, MWD contraindication','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(106,12,'9789366167541','Chapter-07',7,'Therapeutic Ultrasound','10.5005/jp/books/19025_8','202','217','Paid','Therapeutic ultrasound, pulsed ultrasound, phonophoresis, combination therapy, extracorporeal shockwave therapy, ESWT, ultrasound wave production, ultrasonic generator functional parts, therapeutic ultrasound machine, therapeutic ultrasound uses, therapeutic ultrasound contraindication','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(107,12,'9789366167541','Chapter-08',8,'Cryotherapy','10.5005/jp/books/19025_9','218','226','Paid','Cryotherapy, hypothermy, cryotherapy physiological effect, cryotherapy therapeutic effect, cryotherapy indication, cryotherapy contraindication, cryotherapy precaution, cryotherapy application method, vapocoolant sprays, ice massage, cold immersion, compressive cryotherapy, chemical cold packs, musculoskeletal injury management ','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(108,12,'9789366167541','Chapter-09',9,'Phototherapy','10.5005/jp/books/19025_10','227','257','Paid','Phototherapy, phototherapy history, therapeutic laser, infrared rays, ultraviolet rays, Puva and ionozone therapy, heliotherapy, phototherapy application, therapeutic laser historical aspect, laser characteristics, laser classification, laser type, semiconductor laser, laser production, infrared rays’ classification, penetration depth, infrared irradiation hazards ','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(109,12,'9789366167541','Chapter-10',10,'Safety Precautions in Electrotherapy','10.5005/jp/books/19025_11','258','267','Paid','Electrotherapy, safety precaution, safety precaution importance, hazards type, hazards cause, transcutaneous electrical nerve stimulation, electrotherapy modality, hazards primary causes, shortwave diathermy, SWD, electrical muscle stimulation, EMS, patient assessment, patient safety during treatment','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(110,12,'9789366167541','Chapter-11',11,'Clinical Decision-making in Electrotherapy','10.5005/jp/books/19025_12','268','274','Paid','Clinical Decision-making, electrotherapy, clinical decision-making suggestion, clinical decision-making key component, medical history, pain assessment, functional impairment, skin condition, electrotherapy modality selection, high voltage pulsed current, ultrasound therapy, evidence-based electrotherapy practice ','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(111,12,'9789366167541','Chapter-12',12,'Biofeedback','10.5005/jp/books/19025_13','275','300','Paid','Biofeedback, biofeedback type, treatment duration, biofeedback advantage, biofeedback disadvantage, electroencephalography, galvanic skin response, GSR, heart rate variability, HRV, functional MRI, fMRI, myoelectric feedback, postural biofeedback, feedback goniometer device, force biofeedback, orofacial control device, toilet training biofeedback device, stress-related device, cardiovascular biofeedback, electroencephalograph biofeedback, feedback thermometer, hemoencephalography biofeedback, pneumograph biofeedback','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(112,12,'9789366167541','Glossary',13,'Glossary','10.5005/jp/books/19025_14','301','304','Paid','','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(113,12,'9789366167541','Suggested Reading',14,'Suggested Reading','10.5005/jp/books/19025_15','305','312','Paid','','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(114,12,'9789366167541','Index',15,'Index','10.5005/jp/books/19025_16','313','330','Paid','','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08'),(115,12,'9789366167541','case1',115,'Vitiligo ','','65','124','Paid','Explosive vitiligo, mildly active vitiligo, full dose modified OMP regimen, half dose modified OMP regimen, oral levamisole, fluticasone cream, body weight, oral mini-pulse therapy, OMP  ','','Active','2025-11-23 14:29:37','2025-11-23 14:35:08');
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
  `location` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'header',
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
INSERT INTO `contenttype` VALUES (1,'Books','books','Text-book publications and eBooks','BookIcon',1,1,1,'2025-10-23 16:45:43','2025-10-24 14:02:44'),(2,'Videos','videos','Video lectures, atlases and tutorials','VideoLibraryIcon',2,1,1,'2025-10-23 16:45:43','2025-10-24 14:02:44'),(3,'Journals','journals','Peer-reviewed journals and articles','ArticleIcon',3,1,1,'2025-10-23 16:45:43','2025-10-24 14:02:44'),(4,'Cases','cases','Clinical case studies and case-based learning','CaseStudyIcon',4,1,1,'2025-10-23 16:45:43','2025-10-24 14:02:44'),(5,'MCQs','mcqs','Multiple choice questions & test banks','QuizIcon',5,1,1,'2025-10-23 16:45:43','2025-11-21 14:17:10'),(6,'Reviews','reviews','Book reviews, product reviews and DOODY reviews','ReviewIcon',6,1,1,'2025-10-23 16:45:43','2025-11-21 14:17:21');
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
INSERT INTO `subjectcategory` VALUES (1,'Medicine','medicine','Welcome to the Dummy Text',1,1,'2025-10-23 16:46:11',1,1),(2,'Dentistry','dentistry','Welcome to the Dummy Text',1,2,'2025-10-23 16:46:11',1,1),(3,'Nursing','nursing','Welcome to the Dummy Text',1,3,'2025-10-23 16:46:11',0,1),(4,'Surgery','surgery','Welcome to the Dummy Text',1,4,'2025-10-23 16:46:11',0,0),(5,'Radiology','radiology','Welcome to the Dummy Text',1,5,'2025-10-23 16:46:11',1,0),(6,'Paediatrics','paediatrics','Child health & paediatric medicine',1,6,'2025-10-23 16:46:11',0,0),(7,'Anatomy','anatomy','Welcome to the Dummy Text',1,7,'2025-10-23 16:46:11',0,0),(51,'Alternative Medicine','alternative-medicine','Welcome to the Dummy Text',1,0,'2025-10-24 18:41:23',0,0),(52,'Biochemistry','biochemistry','Welcome to the Dummy Text',1,0,'2025-10-24 18:41:48',1,0),(53,'Biotechnology','biotechnology','Welcome to the Dummy Text',1,0,'2025-10-24 18:42:12',1,0),(54,'Cardiology','cardiology','This is dummy text',3,0,'2025-10-24 18:47:27',1,0),(55,'Critical Care','critical-care','this is dummy text',1,0,'2025-10-24 18:48:03',1,0),(56,'Dental Materials','dental-materials','This is dummy text',3,0,'2025-10-24 18:48:58',1,0),(57,'Test','test','Test',1,0,'2025-11-20 14:26:00',0,0);
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
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
INSERT INTO `subjects` VALUES (1,'Alternative Medicine','2025-11-19 21:42:13','2025-11-19 21:42:13'),(2,'Anaesthesia','2025-11-19 21:42:13','2025-11-19 21:42:13'),(3,'Anatomy','2025-11-19 21:42:13','2025-11-19 21:42:13'),(4,'Applied Anatomy','2025-11-19 21:42:13','2025-11-19 21:42:13'),(5,'Applied Biochemistry','2025-11-19 21:42:13','2025-11-19 21:42:13'),(6,'Applied Microbiology and Infection Control','2025-11-19 21:42:13','2025-11-19 21:42:13'),(7,'Applied Nutrition and Dietetics','2025-11-19 21:42:13','2025-11-19 21:42:13'),(8,'Applied Physiology','2025-11-19 21:42:13','2025-11-19 21:42:13'),(9,'Art','2025-11-19 21:42:13','2025-11-19 21:42:13'),(10,'Ayurveda','2025-11-19 21:42:13','2025-11-19 21:42:13'),(11,'Biochemistry','2025-11-19 21:42:13','2025-11-19 21:42:13'),(12,'Biophysics','2025-11-19 21:42:13','2025-11-19 21:42:13'),(13,'Biostatistics and Research Methodology','2025-11-19 21:42:13','2025-11-19 21:42:13'),(14,'Biotechnology','2025-11-19 21:42:13','2025-11-19 21:42:13'),(15,'Cardiology','2025-11-19 21:42:13','2025-11-19 21:42:13'),(16,'Child Health Nursing','2025-11-19 21:42:13','2025-11-19 21:42:13'),(17,'Clinical Skills for Nurses','2025-11-19 21:42:13','2025-11-19 21:42:13'),(18,'Communicative English & Nursing Education','2025-11-19 21:42:13','2025-11-19 21:42:13'),(19,'Community Dentistry','2025-11-19 21:42:13','2025-11-19 21:42:13'),(20,'Community Health Nursing','2025-11-19 21:42:13','2025-11-19 21:42:13'),(21,'Community Medicine','2025-11-19 21:42:13','2025-11-19 21:42:13'),(22,'Computer for Nurses','2025-11-19 21:42:13','2025-11-19 21:42:13'),(23,'Conservative Dentistry and Endodontics','2025-11-19 21:42:13','2025-11-19 21:42:13'),(24,'Cornea','2025-11-19 21:42:13','2025-11-19 21:42:13'),(25,'CraniOrofacial','2025-11-19 21:42:13','2025-11-19 21:42:13'),(26,'Critical Care','2025-11-19 21:42:13','2025-11-19 21:42:13'),(27,'Critical Care Nursing','2025-11-19 21:42:13','2025-11-19 21:42:13'),(28,'Dental','2025-11-19 21:42:13','2025-11-19 21:42:13'),(29,'Dental Assisting','2025-11-19 21:42:13','2025-11-19 21:42:13'),(30,'Dental Materials','2025-11-19 21:42:13','2025-11-19 21:42:13'),(31,'Dental Science','2025-11-19 21:42:13','2025-11-19 21:42:13'),(32,'Dentistry','2025-11-19 21:42:13','2025-11-19 21:42:13'),(33,'Dermatology','2025-11-19 21:42:13','2025-11-19 21:42:13'),(34,'Diabetes & Endocrinology','2025-11-19 21:42:13','2025-11-19 21:42:13'),(35,'Echocardiography','2025-11-19 21:42:13','2025-11-19 21:42:13'),(36,'Emergency Medicine','2025-11-19 21:42:13','2025-11-19 21:42:13'),(37,'ENT','2025-11-19 21:42:13','2025-11-19 21:42:13'),(38,'Esthetic','2025-11-19 21:42:13','2025-11-19 21:42:13'),(39,'Foot and Ankle Care','2025-11-19 21:42:13','2025-11-19 21:42:13'),(40,'Forensic Dentistry','2025-11-19 21:42:13','2025-11-19 21:42:13'),(41,'Forensic Medicine and Toxicology','2025-11-19 21:42:13','2025-11-19 21:42:13'),(42,'Fundamentals of Nursing','2025-11-19 21:42:13','2025-11-19 21:42:13'),(43,'Gastroenterology','2025-11-19 21:42:13','2025-11-19 21:42:13'),(44,'Gastrology','2025-11-19 21:42:13','2025-11-19 21:42:13'),(45,'General Dentistry','2025-11-19 21:42:13','2025-11-19 21:42:13'),(46,'General Medicine','2025-11-19 21:42:13','2025-11-19 21:42:13'),(47,'General Nursing and Midwifery','2025-11-19 21:42:13','2025-11-19 21:42:13'),(48,'Genetics','2025-11-19 21:42:13','2025-11-19 21:42:13'),(49,'Geriatric Nursing','2025-11-19 21:42:13','2025-11-19 21:42:13'),(50,'Gynecology & Infertility','2025-11-19 21:42:13','2025-11-19 21:42:13'),(51,'Head & Neck Surgery','2025-11-19 21:42:13','2025-11-19 21:42:13'),(52,'Hematology','2025-11-19 21:42:13','2025-11-19 21:42:13'),(53,'Hepatology','2025-11-19 21:42:13','2025-11-19 21:42:13'),(54,'Histololgy','2025-11-19 21:42:13','2025-11-19 21:42:13'),(55,'Hospital Administration','2025-11-19 21:42:13','2025-11-19 21:42:13'),(56,'Hospital and Healthcare Administration','2025-11-19 21:42:13','2025-11-19 21:42:13'),(57,'Image Based Question','2025-11-19 21:42:13','2025-11-19 21:42:13'),(58,'Implant Dentistry','2025-11-19 21:42:13','2025-11-19 21:42:13'),(59,'Implantology','2025-11-19 21:42:13','2025-11-19 21:42:13'),(60,'Laboratory Medicine','2025-11-19 21:42:13','2025-11-19 21:42:13'),(61,'Laser Dentistry','2025-11-19 21:42:13','2025-11-19 21:42:13'),(62,'MCQs and Self-assessment','2025-11-19 21:42:13','2025-11-19 21:42:13'),(63,'Medical','2025-11-19 21:42:13','2025-11-19 21:42:13'),(64,'Medical Surgeries','2025-11-19 21:42:13','2025-11-19 21:42:13'),(65,'Medical Surgical Nursing','2025-11-19 21:42:13','2025-11-19 21:42:13'),(66,'Medicine','2025-11-19 21:42:13','2025-11-19 21:42:13'),(67,'Mental Health Nursing','2025-11-19 21:42:13','2025-11-19 21:42:13'),(68,'Microbiology and Immunology','2025-11-19 21:42:13','2025-11-19 21:42:13'),(69,'Midwifery/Obstetrics and Gynecology (OBG) Nursing','2025-11-19 21:42:13','2025-11-19 21:42:13'),(70,'Multidisciplinary','2025-11-19 21:42:13','2025-11-19 21:42:13'),(71,'NEET PG','2025-11-19 21:42:13','2025-11-19 21:42:13'),(72,'Nephrology','2025-11-19 21:42:13','2025-11-19 21:42:13'),(73,'Neurology','2025-11-19 21:42:13','2025-11-19 21:42:13'),(74,'Neurosurgery','2025-11-19 21:42:13','2025-11-19 21:42:13'),(75,'Nursing Administration','2025-11-19 21:42:13','2025-11-19 21:42:13'),(76,'Nursing Management & Leadership','2025-11-19 21:42:13','2025-11-19 21:42:13'),(77,'Nursing Research & Statistics','2025-11-19 21:42:13','2025-11-19 21:42:13'),(78,'Nursing Theories and History','2025-11-19 21:42:13','2025-11-19 21:42:13'),(79,'Nutrition and Dietetics','2025-11-19 21:42:13','2025-11-19 21:42:13'),(80,'Obstetrics','2025-11-19 21:42:13','2025-11-19 21:42:13'),(81,'Obstetrics and Gynecology','2025-11-19 21:42:13','2025-11-19 21:42:13'),(82,'Occupational Therapy','2025-11-19 21:42:13','2025-11-19 21:42:13'),(83,'Oncology','2025-11-19 21:42:13','2025-11-19 21:42:13'),(84,'Ophthalmic Nursing','2025-11-19 21:42:13','2025-11-19 21:42:13'),(85,'Ophthalmology','2025-11-19 21:42:13','2025-11-19 21:42:13'),(86,'Oral and Maxillofacial Medicine and Radiology','2025-11-19 21:42:13','2025-11-19 21:42:13'),(87,'Oral and Maxillofacial Pathology','2025-11-19 21:42:13','2025-11-19 21:42:13'),(88,'Oral and Maxillofacial Surgery','2025-11-19 21:42:13','2025-11-19 21:42:13'),(89,'Oral Health','2025-11-19 21:42:13','2025-11-19 21:42:13'),(90,'Orthodontics and Dentofacial Orthopedics','2025-11-19 21:42:13','2025-11-19 21:42:13'),(91,'Orthopedics','2025-11-19 21:42:13','2025-11-19 21:42:13'),(92,'Otolaryngology','2025-11-19 21:42:13','2025-11-19 21:42:13'),(93,'Paramedics','2025-11-19 21:42:13','2025-11-19 21:42:13'),(94,'Pathology','2025-11-19 21:42:13','2025-11-19 21:42:13'),(95,'Pediatric Dentistry','2025-11-19 21:42:13','2025-11-19 21:42:13'),(96,'Pediatrics','2025-11-19 21:42:13','2025-11-19 21:42:13'),(97,'Pedodontics','2025-11-19 21:42:13','2025-11-19 21:42:13'),(98,'Periodontics','2025-11-19 21:42:13','2025-11-19 21:42:13'),(99,'Perioperative and Critical Care Ultrasound and Emergency Ultrasound','2025-11-19 21:42:13','2025-11-19 21:42:13'),(100,'Perioperative Transthoracic Cchocardiography','2025-11-19 21:42:13','2025-11-19 21:42:13'),(101,'Pharmacology','2025-11-19 21:42:13','2025-11-19 21:42:13'),(102,'Physical Medicine and Rehabilitation','2025-11-19 21:42:13','2025-11-19 21:42:13'),(103,'Physiology','2025-11-19 21:42:13','2025-11-19 21:42:13'),(104,'Physiotherapy','2025-11-19 21:42:13','2025-11-19 21:42:13'),(105,'Prosthodontics','2025-11-19 21:42:13','2025-11-19 21:42:13'),(106,'Psychiatry','2025-11-19 21:42:13','2025-11-19 21:42:13'),(107,'Pulmonary & Respiratory Medicine','2025-11-19 21:42:13','2025-11-19 21:42:13'),(108,'Pulmonolary & Respiratory Medicine','2025-11-19 21:42:13','2025-11-19 21:42:13'),(109,'Pulmonology and Respiratory Medicine','2025-11-19 21:42:13','2025-11-19 21:42:13'),(110,'Radiology','2025-11-19 21:42:13','2025-11-19 21:42:13'),(111,'Radiology and Nuclear Medicine','2025-11-19 21:42:13','2025-11-19 21:42:13'),(112,'Reconstructive Dentistry and Restorative Dentistry','2025-11-19 21:42:13','2025-11-19 21:42:13'),(113,'Religion','2025-11-19 21:42:13','2025-11-19 21:42:13'),(114,'Rhinology','2025-11-19 21:42:13','2025-11-19 21:42:13'),(115,'Science','2025-11-19 21:42:13','2025-11-19 21:42:13'),(116,'Society','2025-11-19 21:42:13','2025-11-19 21:42:13'),(117,'Spinal Surgery','2025-11-19 21:42:13','2025-11-19 21:42:13'),(118,'Staff Nurse Exam','2025-11-19 21:42:13','2025-11-19 21:42:13'),(119,'Surgery','2025-11-19 21:42:13','2025-11-19 21:42:13'),(120,'Ultrasound','2025-11-19 21:42:13','2025-11-19 21:42:13'),(121,'Urology','2025-11-19 21:42:13','2025-11-19 21:42:13');
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
  `photo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonials`
--

LOCK TABLES `testimonials` WRITE;
/*!40000 ALTER TABLE `testimonials` DISABLE KEYS */;
INSERT INTO `testimonials` VALUES (6,'Testimonial by Ozlem YALCINKAYA','Many thanks to JaypeeDigital platform, which has been an indispensable easy-to-use source for our academic staff with its comprehensive and up-to-date coverage of medical and allied subjects.','Ozlem YALCINKAYA','Library Director, Bezmialem Vakif University, Turkey','/images/testimonial-1761307085040.jpg','2025-10-24 06:17:02'),(7,'Testimonial by Dr Jesus Tapia Jurado','JaypeeDigital site offers to our students a huge number of medical publications such as textbooks, atlases and reference works — a real asset for our teaching programmes.','Dr Jesus Tapia Jurado','Chief – Surgery Department, Faculty of Medicine, Universidad Nacional Autónoma de México (UNAM), Mexico DF, Mexico','/images/testimonial-1761307251123.jpg','2025-10-24 06:17:02'),(8,'Testimonial by Wan Suhaimi Ariffin','With its user-friendly interface, JaypeeDigital provides extensive coverage in medicine, dentistry and allied health disciplines — enabling us to support students and faculty with a reliable digital resource.','Wan Suhaimi Ariffin, MLS (Syracuse), BLS (UITM)','Head, The National University of Malaysia (UKM) Medical Centre Library, Kuala Lumpur, Malaysia','/images/testimonial-1761307265953.jpg','2025-10-24 06:17:02'),(9,'Testimonial by David E. García Díaz','JaypeeDigital platform presents an interesting and valuable collection of medical publications that complement our curriculum and help keep our learners up to date.','David E. García Díaz (MD)','Head, Physiology Department, Faculty of Medicine, Universidad Nacional Autónoma de México DF, Mexico','','2025-10-24 06:17:02'),(10,'Testimonial by Arcelia Meléndez Ocamp (MD)','Some of us teach in the Division of Graduate Studies and Research at the Faculty and the contents of the JaypeeDigital platform meet our advanced educational and research needs.','Arcelia Meléndez Ocamp (MD)','Head, Preventive Dentistry & Public Health Department, Universidad Nacional Autónoma de México DF, México','','2025-10-24 06:17:02'),(12,'Test','Test','Test','Test','Test','2025-11-21 14:19:37');
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-24 20:56:27
