/*
SQLyog Community v13.3.0 (64 bit)
MySQL - 8.0.44 : Database - jaypeedigi
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`jaypeedigi` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `jaypeedigi`;

/*Table structure for table `contents` */

DROP TABLE IF EXISTS `contents`;

CREATE TABLE `contents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `coverImage` varchar(512) COLLATE utf8mb4_general_ci NOT NULL,
  `description` text COLLATE utf8mb4_general_ci NOT NULL,
  `author` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `detailsHtml` text COLLATE utf8mb4_general_ci NOT NULL,
  `rating` float NOT NULL DEFAULT '0',
  `displayOrder` int NOT NULL DEFAULT '0',
  `contentTypeId` int NOT NULL,
  `subjectcategoryId` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ishomepage` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `contents` */

insert  into `contents`(`id`,`title`,`coverImage`,`description`,`author`,`detailsHtml`,`rating`,`displayOrder`,`contentTypeId`,`subjectcategoryId`,`createdAt`,`ishomepage`) values 
(1,'Essentials of Medical Pharmacology','/images/9789352501915-1761321074922.png','A concise yet comprehensive textbook on pharmacology for medical students.','K D Tripathi','<p>This book covers fundamentals of pharmacology including drug classes, mechanisms, and clinical uses.</p>',4.5,0,1,1,'2025-10-24 03:46:11',0),
(2,'Human Embryology (Inderbir Singh)','/images/9789354652974-1761321094121.png','A detailed atlas and text on human embryology for medical students.','Inderbir Singh &amp; Raveendranath Veeramani','<p>Richly illustrated with diagrams and photographs, covers prenatal development in depth.</p>',4.2,0,1,7,'2025-10-24 03:46:11',0),
(3,'Video Atlas of Clinical Cases – Medicine','/images/jaypee-DSJUOG-1761321552656.jpg','Video-based clinical case presentations in general medicine.','Jaypee Digital Media','<p>Over 3000 video cases exploring diagnostic and management scenarios in medicine.</p>',4.7,3,2,1,'2025-10-24 03:46:11',0),
(4,'MCQ Bank – Paediatrics','/images/jaypee-DSJUOG-1761321552656.jpg','Extensive multiple-choice questions set for paediatric medicine preparation.','Jaypee Digital Media','<p>Includes detailed explanations and references for each question.</p>',4.3,4,5,6,'2025-10-24 03:46:11',0),
(5,'Journal of Paediatric Surgery – Vol 19, Iss 1','/images/jaypee-DSJUOG-1761321552656.jpg','The latest issue of the Journal of Paediatric Surgery.','Various Authors','<p>This issue includes original research articles and case reports in paediatric surgery.</p>',4,5,3,6,'2025-10-24 03:46:11',0),
(6,'Clinical Case Studies in Radiology','/images/jaypee-DSJUOG-1761321552656.jpg','A compendium of radiology cases with imaging and commentary.','Jaypee Digital Media','<p>Contains 500+ imaging cases covering CT, MRI, X-ray and ultrasound.</p>',4.6,6,4,5,'2025-10-24 03:46:11',0),
(7,'DOODY Review – Surgery Textbook 2025','/images/jaypee-DSJUOG-1761321552656.jpg','An expert review summary from DOODY of a major surgery textbook.','DOODY Review Team','<p>Highlights strengths, weaknesses and key take-home points of the textbook.</p>',3.8,7,6,4,'2025-10-24 03:46:11',0),
(22,'Harrison’s Principles of Internal Medicine','/images/9789350906576-1761321061848.png','Comprehensive guide to internal medicine covering diagnosis and management of diseases.','J. Larry Jameson','<p>Includes in-depth sections on cardiology, endocrinology, and infectious diseases.</p>',4.8,0,1,1,'2025-10-24 04:35:28',1),
(23,'Clinical Examination: A Systematic Guide to Physical Diagnosis','/images/9789352707010-1761321084382.png','A practical book for students and clinicians on patient examination and clinical reasoning.','Nicholas Talley','<p>Focuses on clinical skills, physical signs, and differential diagnosis.</p>',4.5,0,1,1,'2025-10-24 04:35:28',0),
(24,'Textbook of Operative Dentistry','/images/jaypee-DSJUOG-1761321552656.jpg','Essential reference for restorative dentistry with step-by-step procedures.','Nisha Garg','<p>Includes detailed illustrations, cavity preparation techniques, and case discussions.</p>',4.6,3,1,2,'2025-10-24 04:35:28',0),
(25,'Essentials of Oral Pathology and Microbiology','/images/jaypee-DSJUOG-1761321552656.jpg','A complete guide to oral pathology, microbiology, and laboratory diagnosis.','R. Rajendran','<p>Updated chapters with recent advances in oral cancer and microbial infections.</p>',4.7,0,1,2,'2025-10-24 04:35:28',0),
(26,'Fundamentals of Nursing','/images/jaypee-DSJUOG-1761321552656.jpg','Comprehensive text on nursing principles and clinical procedures.','Potter & Perry','<p>Covers patient care fundamentals, ethics, and healthcare communication.</p>',4.9,0,1,3,'2025-10-24 04:35:28',1),
(27,'Community Health Nursing','/images/jaypee-DSJUOG-1761321552656.jpg','Focuses on public health nursing and community-based healthcare systems.','Basavanthappa BT','<p>Includes updated WHO guidelines and case-based discussions.</p>',4.4,6,1,3,'2025-10-24 04:35:28',0),
(28,'Cardiac Physical Examination – Step by Step','/images/jaypee-DSJUOG-1761321552656.jpg','Video tutorial demonstrating cardiac examination techniques.','Dr. S. Mehta','<iframe src=\"https://jaypeedigital.com/video/medicine-cardio-exam\"></iframe>',4.3,7,2,1,'2025-10-24 04:35:28',1),
(29,'Tooth Extraction Procedure – Clinical Demo','/images/jaypee-DSJUOG-1761321552656.jpg','Clinical video showing step-by-step tooth extraction process.','Dr. P. Gupta','<iframe src=\"https://jaypeedigital.com/video/tooth-extraction\"></iframe>',4.5,8,2,2,'2025-10-24 04:35:28',0),
(30,'Journal of Clinical Medicine Research','/images/jaypee-DSJUOG-1761321552656.jpg','Publishes peer-reviewed research on internal medicine and clinical practice.','Jaypee Journals','<p>Indexed in Scopus and PubMed. Monthly publication.</p>',4.6,9,3,1,'2025-10-24 04:35:28',1),
(31,'International Journal of Critical Care Medicine','/images/jaypee-DSJUOG-1761321552656.jpg','Focuses on research and reviews in intensive care and emergency medicine.','Jaypee Journals','<p>Includes latest evidence-based ICU protocols and case studies.</p>',4.7,10,3,1,'2025-10-24 04:35:28',0),
(32,'Journal of Contemporary Dentistry','/images/jaypee-DSJUOG-1761321552656.jpg','A peer-reviewed journal covering restorative, pediatric, and cosmetic dentistry.','Jaypee Journals','<p>Quarterly publication featuring clinical innovations and reviews.</p>',4.8,11,3,2,'2025-10-24 04:35:28',0),
(33,'Indian Journal of Nursing Sciences','/images/jaypee-DSJUOG-1761321552656.jpg','Research and case reports on nursing practice, education, and healthcare innovation.','Jaypee Journals','<p>Includes nursing education reforms, clinical practice updates, and WHO collaborations.</p>',4.5,12,3,3,'2025-10-24 04:35:28',1);

/*Table structure for table `contenttype` */

DROP TABLE IF EXISTS `contenttype`;

CREATE TABLE `contenttype` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `slug` varchar(128) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `description` text COLLATE utf8mb4_general_ci NOT NULL,
  `icon` varchar(100) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'LocalLibraryIcon',
  `displayOrder` int NOT NULL DEFAULT '0',
  `ishomepage` tinyint(1) NOT NULL DEFAULT '1',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `contenttype` */

insert  into `contenttype`(`id`,`title`,`slug`,`description`,`icon`,`displayOrder`,`ishomepage`,`isActive`,`createdAt`,`updatedAt`) values 
(1,'Books','books','Text-book publications and eBooks','BookIcon',1,1,1,'2025-10-24 03:45:43','2025-10-25 01:02:44'),
(2,'Videos','videos','Video lectures, atlases and tutorials','VideoLibraryIcon',2,1,1,'2025-10-24 03:45:43','2025-10-25 01:02:44'),
(3,'Journals','journals','Peer-reviewed journals and articles','ArticleIcon',3,1,1,'2025-10-24 03:45:43','2025-10-25 01:02:44'),
(4,'Cases','cases','Clinical case studies and case-based learning','CaseStudyIcon',4,1,1,'2025-10-24 03:45:43','2025-10-25 01:02:44'),
(5,'MCQs','mcqs','Multiple choice questions & test banks','QuizIcon',5,0,1,'2025-10-24 03:45:43','2025-10-25 01:02:44'),
(6,'Reviews','reviews','Book reviews, product reviews and DOODY reviews','ReviewIcon',6,0,1,'2025-10-24 03:45:43','2025-10-25 01:02:44');

/*Table structure for table `contenttypes` */

DROP TABLE IF EXISTS `contenttypes`;

CREATE TABLE `contenttypes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `slug` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(512) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
  `sortOrder` int NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `contenttypes` */

insert  into `contenttypes`(`id`,`name`,`slug`,`description`,`sortOrder`,`createdAt`) values 
(1,'Books','books','Comprehensive textbooks and reference materials',1,'2025-10-24 17:11:02'),
(2,'Videos','videos','Interactive video lectures and tutorials',2,'2025-10-24 17:11:02'),
(3,'Journals','journals','Latest research articles and academic publications',3,'2025-10-24 17:11:02');

/*Table structure for table `hero_slides` */

DROP TABLE IF EXISTS `hero_slides`;

CREATE TABLE `hero_slides` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `highlightedWord` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `subtitle` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `image` varchar(512) COLLATE utf8mb4_general_ci NOT NULL,
  `buttons` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `displayOrder` int NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `hero_slides_chk_1` CHECK (json_valid(`buttons`))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `hero_slides` */

insert  into `hero_slides`(`id`,`title`,`highlightedWord`,`subtitle`,`image`,`buttons`,`displayOrder`,`isActive`,`createdAt`,`updatedAt`) values 
(8,'Empowering Medical ',' Minds, Digitally','Jaypee products are being distributed globally by renowned distributors in the USA, Central and South America, UK, Canada, Europe, Africa, Middle East, South East Asia, North Asia.','/images/2-1761316856614.jpg','[{\"label\":\"Medicine\",\"variant\":\"contained\",\"scrollTo\":\"popular-course\"},{\"label\":\"Dentistry\",\"variant\":\"contained\",\"scrollTo\":\"popular-course\"},{\"label\":\"Nursing\",\"variant\":\"contained\",\"scrollTo\":\"popular-course\"},{\"label\":\"Watch Video\",\"variant\":\"outlined\",\"icon\":true,\"scrollTo\":\"video-section\"}]',5,1,'2025-10-24 20:15:11','2025-10-24 21:04:19'),
(9,'Access the Future of ','Medical Education','Jaypee products are being distributed globally by renowned distributors in the USA, Central and South America, UK, Canada, Europe, Africa, Middle East, South East Asia, North Asia.','/images/grovemade-RvPDe41lYBA-unsplash-1761316949172.jpg','[]',1,1,'2025-10-24 20:15:30','2025-10-24 21:04:22'),
(10,'Every Textbook','at your Fingertips','Jaypee products are being distributed globally by renowned distributors in the USA, Central and South America, UK, Canada, Europe, Africa, Middle East, South East Asia, North Asia.','/images/annie-spratt-QckxruozjRg-unsplash-1761317016131.jpg','[]',2,1,'2025-10-24 20:16:01','2025-10-24 21:04:27');

/*Table structure for table `site_settings` */

DROP TABLE IF EXISTS `site_settings`;

CREATE TABLE `site_settings` (
  `id` int NOT NULL,
  `logoUrl` varchar(512) NOT NULL,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `site_settings` */

insert  into `site_settings`(`id`,`logoUrl`,`updatedAt`) values 
(1,'/images/nvr-logo.jpg','2025-11-05 08:58:57');

/*Table structure for table `subjectcategory` */

DROP TABLE IF EXISTS `subjectcategory`;

CREATE TABLE `subjectcategory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `slug` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(512) COLLATE utf8mb4_general_ci NOT NULL DEFAULT '',
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

/*Data for the table `subjectcategory` */

insert  into `subjectcategory`(`id`,`name`,`slug`,`description`,`contentTypeId`,`sortOrder`,`createdAt`,`ishomepage`,`isslider`) values 
(1,'Medicine','medicine','Welcome to the Dummy Text',1,1,'2025-10-24 03:46:11',1,1),
(2,'Dentistry','dentistry','Welcome to the Dummy Text',1,2,'2025-10-24 03:46:11',1,1),
(3,'Nursing','nursing','Welcome to the Dummy Text',1,3,'2025-10-24 03:46:11',1,1),
(4,'Surgery','surgery','Welcome to the Dummy Text',1,4,'2025-10-24 03:46:11',0,0),
(5,'Radiology','radiology','Welcome to the Dummy Text',1,5,'2025-10-24 03:46:11',0,0),
(6,'Paediatrics','paediatrics','Child health & paediatric medicine',1,6,'2025-10-24 03:46:11',0,0),
(7,'Anatomy','anatomy','Welcome to the Dummy Text',1,7,'2025-10-24 03:46:11',0,0),
(51,'Alternative Medicine','alternative-medicine','Welcome to the Dummy Text',1,0,'2025-10-25 05:41:23',0,0),
(52,'Biochemistry','biochemistry','Welcome to the Dummy Text',1,0,'2025-10-25 05:41:48',1,0),
(53,'Biotechnology','biotechnology','Welcome to the Dummy Text',1,0,'2025-10-25 05:42:12',1,0),
(54,'Cardiology','cardiology','This is dummy text',3,0,'2025-10-25 05:47:27',1,0),
(55,'Critical Care','critical-care','this is dummy text',1,0,'2025-10-25 05:48:03',1,0),
(56,'Dental Materials','dental-materials','This is dummy text',3,0,'2025-10-25 05:48:58',1,0);

/*Table structure for table `testimonials` */

DROP TABLE IF EXISTS `testimonials`;

CREATE TABLE `testimonials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `content` text COLLATE utf8mb4_general_ci NOT NULL,
  `userName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `professional` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `photo` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `testimonials` */

insert  into `testimonials`(`id`,`title`,`content`,`userName`,`professional`,`photo`,`createdAt`) values 
(6,'Testimonial by Ozlem YALCINKAYA','Many thanks to JaypeeDigital platform, which has been an indispensable easy-to-use source for our academic staff with its comprehensive and up-to-date coverage of medical and allied subjects.','Ozlem YALCINKAYA','Library Director, Bezmialem Vakif University, Turkey','/images/testimonial-1761307085040.jpg','2025-10-24 17:17:02'),
(7,'Testimonial by Dr Jesus Tapia Jurado','JaypeeDigital site offers to our students a huge number of medical publications such as textbooks, atlases and reference works — a real asset for our teaching programmes.','Dr Jesus Tapia Jurado','Chief – Surgery Department, Faculty of Medicine, Universidad Nacional Autónoma de México (UNAM), Mexico DF, Mexico','/images/testimonial-1761307251123.jpg','2025-10-24 17:17:02'),
(8,'Testimonial by Wan Suhaimi Ariffin','With its user-friendly interface, JaypeeDigital provides extensive coverage in medicine, dentistry and allied health disciplines — enabling us to support students and faculty with a reliable digital resource.','Wan Suhaimi Ariffin, MLS (Syracuse), BLS (UITM)','Head, The National University of Malaysia (UKM) Medical Centre Library, Kuala Lumpur, Malaysia','/images/testimonial-1761307265953.jpg','2025-10-24 17:17:02'),
(9,'Testimonial by David E. García Díaz','JaypeeDigital platform presents an interesting and valuable collection of medical publications that complement our curriculum and help keep our learners up to date.','David E. García Díaz (MD)','Head, Physiology Department, Faculty of Medicine, Universidad Nacional Autónoma de México DF, Mexico','','2025-10-24 17:17:02'),
(10,'Testimonial by Arcelia Meléndez Ocamp (MD)','Some of us teach in the Division of Graduate Studies and Research at the Faculty and the contents of the JaypeeDigital platform meet our advanced educational and research needs.','Arcelia Meléndez Ocamp (MD)','Head, Preventive Dentistry & Public Health Department, Universidad Nacional Autónoma de México DF, México','','2025-10-24 17:17:02'),
(11,'Testimonial by Dra. Blanca Alicia Chong Martínez','It is a very complete and up-to-date platform that could be applied to all levels of Medicine — from undergraduate to postgraduate and continuing medical education.','Dra. Blanca Alicia Chong Martínez','Jefe de Educación Médica Continua / Head of Basic Science and Continuous Medical Education, Facultad Mexicana de Medicina (ULSA), Mexico','/images/testimonial-1761307233476.jpg','2025-10-24 17:17:02');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
