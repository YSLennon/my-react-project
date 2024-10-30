-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        8.0.39 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- reactsns 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `reactsns` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `reactsns`;

-- 테이블 reactsns.tbl_comment 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_comment` (
  `commentNo` int NOT NULL AUTO_INCREMENT,
  `boardNo` int NOT NULL,
  `id` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`commentNo`),
  KEY `idx_post_id` (`boardNo`),
  KEY `idx_user_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 reactsns.tbl_comment:~13 rows (대략적) 내보내기
DELETE FROM `tbl_comment`;
INSERT INTO `tbl_comment` (`commentNo`, `boardNo`, `id`, `content`, `createdAt`) VALUES
	(1, 17, 'admin', '17번 피드의 첫 번째 댓글입니다.', '2024-10-29 07:15:08'),
	(2, 17, 'user1@naver.com', '이 피드 내용이 흥미롭네요!', '2024-10-29 07:15:08'),
	(3, 18, 'admin', '유익한 정보 감사해요.', '2024-10-29 07:15:08'),
	(4, 18, 'user1@naver.com', '좋은 글이에요, 많이 배웠습니다.', '2024-10-29 07:15:08'),
	(9, 17, 'admin', '또 다른 의견 남깁니다.', '2024-10-29 07:15:08'),
	(10, 18, 'user1@naver.com', '이런 글이 더 많았으면 좋겠어요.', '2024-10-29 07:15:08'),
	(55, 18, 'user1', 'ㅁㄴㅇ', '2024-10-30 02:33:04'),
	(56, 17, 'user1@naver.com', 'Nice post!', '2024-10-30 02:57:23'),
	(57, 17, 'user2@naver.com', 'I agree!', '2024-10-30 02:57:23'),
	(58, 17, 'admin', 'This is great!', '2024-10-30 02:57:23'),
	(59, 18, 'user3@naver.com', 'Very informative!', '2024-10-30 02:57:23'),
	(60, 18, 'user4@naver.com', 'Loved this!', '2024-10-30 02:57:23'),
	(61, 18, 'user5@naver.com', 'Can\'t wait for more!', '2024-10-30 02:57:23'),
	(62, 19, 'user6@naver.com', 'User6 here, very interesting!', '2024-10-30 02:57:23'),
	(63, 19, 'user7@naver.com', 'Good job!', '2024-10-30 02:57:23'),
	(64, 19, 'admin', 'Thanks for sharing!', '2024-10-30 02:57:23'),
	(65, 20, 'user1@naver.com', 'This is awesome!', '2024-10-30 02:57:23'),
	(66, 20, 'user2@naver.com', 'Great insights!', '2024-10-30 02:57:23'),
	(67, 20, 'user3@naver.com', 'Would love to see more!', '2024-10-30 02:57:23'),
	(68, 21, 'user4@naver.com', 'Fantastic read!', '2024-10-30 02:57:23'),
	(69, 21, 'user5@naver.com', 'Really enjoyed this!', '2024-10-30 02:57:23'),
	(70, 21, 'user6@naver.com', 'Thanks for the tips!', '2024-10-30 02:57:23'),
	(71, 22, 'user7@naver.com', 'Very useful information!', '2024-10-30 02:57:23'),
	(72, 22, 'admin', 'Admin feedback: excellent!', '2024-10-30 02:57:23'),
	(73, 22, 'user1@naver.com', 'User1 says thank you!', '2024-10-30 02:57:23'),
	(74, 22, 'user2@naver.com', 'User2 appreciates this post!', '2024-10-30 02:57:23'),
	(75, 22, 'user3@naver.com', 'User3 will share this!', '2024-10-30 02:57:23'),
	(76, 22, 'user4@naver.com', 'User4 agrees with you!', '2024-10-30 02:57:23'),
	(77, 22, 'user5@naver.com', 'User5 found this helpful!', '2024-10-30 02:57:23'),
	(78, 22, 'user6@naver.com', 'User6 thinks this is brilliant!', '2024-10-30 02:57:23'),
	(79, 22, 'user7@naver.com', 'User7 is inspired by this!', '2024-10-30 02:57:23'),
	(80, 22, 'admin', 'Admin comments: very well written!', '2024-10-30 02:57:23'),
	(81, 22, 'user1@naver.com', 'User1 loves the content!', '2024-10-30 02:57:23'),
	(82, 22, 'user2@naver.com', 'User2 supports this idea!', '2024-10-30 02:57:23'),
	(83, 22, 'user3@naver.com', 'User3 says keep it up!', '2024-10-30 02:57:23'),
	(84, 22, 'user4@naver.com', 'User4 will follow more posts like this!', '2024-10-30 02:57:23'),
	(85, 22, 'user5@naver.com', 'User5 enjoyed reading this!', '2024-10-30 02:57:23'),
	(86, 22, 'user6@naver.com', 'User6 found this enlightening!', '2024-10-30 02:57:23'),
	(87, 22, 'user7@naver.com', 'User7 is happy to see this!', '2024-10-30 02:57:23'),
	(88, 51, 'user1', '화질구지네요', '2024-10-30 03:21:49'),
	(89, 41, 'user7@naver.com', 'asdf', '2024-10-30 04:01:23'),
	(90, 45, 'user7@naver.com', 'asdaf', '2024-10-30 04:06:22'),
	(91, 51, 'admin', '자글자글하네요 ㅋㅋ', '2024-10-30 05:40:46');

-- 테이블 reactsns.tbl_feed 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_feed` (
  `feedNo` int NOT NULL AUTO_INCREMENT COMMENT '피드 번호',
  `id` varchar(50) NOT NULL COMMENT '사용자 ID',
  `text` text NOT NULL COMMENT '피드 내용',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일자',
  PRIMARY KEY (`feedNo`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 reactsns.tbl_feed:~19 rows (대략적) 내보내기
DELETE FROM `tbl_feed`;
INSERT INTO `tbl_feed` (`feedNo`, `id`, `text`, `createdAt`) VALUES
	(17, 'admin', 'ㅁㄴㅇ', '2024-10-29 02:17:26'),
	(18, 'admin', 'ㅎㅇ', '2024-10-29 03:15:26'),
	(37, 'admin', 'This is a post from admin.', '2024-10-30 02:57:23'),
	(38, 'user1@naver.com', 'Hello from user1!', '2024-10-30 02:57:23'),
	(39, 'user2@naver.com', 'User2 here, sharing my thoughts.', '2024-10-30 02:57:23'),
	(40, 'user3@naver.com', 'Another day, another post!', '2024-10-30 02:57:23'),
	(41, 'user4@naver.com', 'User4 loves coding!', '2024-10-30 02:57:23'),
	(42, 'user5@naver.com', 'User5 is having a great day!', '2024-10-30 02:57:23'),
	(43, 'user6@naver.com', 'Hello world from user6!', '2024-10-30 02:57:23'),
	(44, 'user7@naver.com', 'User7 enjoying the weekend!', '2024-10-30 02:57:23'),
	(45, 'admin', 'Admin update: new features coming soon!', '2024-10-30 02:57:23'),
	(46, 'user1@naver.com', 'User1 is excited about the future!', '2024-10-30 02:57:23'),
	(47, 'user2@naver.com', 'User2 shares a motivational quote.', '2024-10-30 02:57:23'),
	(48, 'user3@naver.com', 'User3’s latest project is amazing!', '2024-10-30 02:57:23'),
	(49, 'user4@naver.com', 'User4 just finished a great book!', '2024-10-30 02:57:23'),
	(50, 'user5@naver.com', 'User5’s travel diary.', '2024-10-30 02:57:23'),
	(51, 'user6@naver.com', 'User6 says hi to everyone!', '2024-10-30 02:57:23'),
	(52, 'admin', 'Duxtagram hello~', '2024-10-30 05:55:44'),
	(53, 'admin', '오리가 세마리면 삼리', '2024-10-30 07:41:37');

-- 테이블 reactsns.tbl_file 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_file` (
  `fileNo` int NOT NULL AUTO_INCREMENT COMMENT '파일 번호',
  `boardNo` int NOT NULL COMMENT '연관된 게시물 번호',
  `orgName` varchar(255) NOT NULL COMMENT '원본 파일명',
  `fileType` varchar(50) NOT NULL COMMENT '파일 타입 (예: image/png)',
  `filename` varchar(255) NOT NULL COMMENT '서버에 저장된 파일명',
  `path` varchar(255) NOT NULL COMMENT '파일 경로',
  `uploadedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '업로드 일자',
  `category` int NOT NULL,
  `profileId` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`fileNo`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 reactsns.tbl_file:~40 rows (대략적) 내보내기
DELETE FROM `tbl_file`;
INSERT INTO `tbl_file` (`fileNo`, `boardNo`, `orgName`, `fileType`, `filename`, `path`, `uploadedAt`, `category`, `profileId`) VALUES
	(34, 17, '현이의가방끈_투머치버전.png', 'image/png', '1730168246495-e35c8133-2a75-403c-91f5-a78265a7ad0c.png', 'storage\\feed\\1730168246495-e35c8133-2a75-403c-91f5-a78265a7ad0c.png', NULL, 1, NULL),
	(35, 17, '현이의가방끈_rainbow.png', 'image/png', '1730168246497-68874f47-30f3-4af3-be30-eb01fb6f0d33.png', 'storage\\feed\\1730168246497-68874f47-30f3-4af3-be30-eb01fb6f0d33.png', NULL, 1, NULL),
	(36, 17, '현이의가방끈.png', 'image/png', '1730168246498-fe03a8f1-04e7-46aa-9a8e-ee229652e6ca.png', 'storage\\feed\\1730168246498-fe03a8f1-04e7-46aa-9a8e-ee229652e6ca.png', NULL, 1, NULL),
	(37, 18, '2019_06_14_05_42_2537.png', 'image/png', '1730171726802-6f37043e-82df-4726-a7f8-354632999a6a.png', 'storage\\feed\\1730171726802-6f37043e-82df-4726-a7f8-354632999a6a.png', NULL, 1, NULL),
	(38, 37, 'githubIcon.png', 'image/jpeg', 'cafe0.jpg', 'storage/feed/cafe0.jpg', NULL, 1, NULL),
	(39, 38, 'icon_left.png', 'image/jpeg', 'cafe1.jpg', 'storage/feed/cafe1.jpg', NULL, 1, NULL),
	(40, 39, '현이의가방끈_투머치버전.png', 'image/jpeg', 'tr0.jpg', 'storage/feed/tr0.jpg', NULL, 1, NULL),
	(41, 37, '현이의가방끈_투머치버전.png', 'image/jpeg', 'tr1.jpg', 'storage/feed/tr1.jpg', NULL, 1, NULL),
	(42, 37, 'original_image1.jpg', 'image/jpeg', 'cafe2.jpg', 'storage/feed/cafe2.jpg', '2024-10-30 03:04:56', 1, NULL),
	(43, 37, 'original_image1.jpg', 'image/jpeg', 'cafe3.jpg', 'storage/feed/cafe3.jpg', '2024-10-30 03:04:56', 1, NULL),
	(44, 38, 'original_image2.jpg', 'image/jpeg', 'tr2.jpg', 'storage/feed/tr2.jpg', '2024-10-30 03:04:56', 1, NULL),
	(45, 38, 'original_image2.jpg', 'image/jpeg', 'tr3.jpg', 'storage/feed/tr3.jpg', '2024-10-30 03:04:56', 1, NULL),
	(46, 39, 'original_image3.jpg', 'image/jpeg', 'cafe4.jpg', 'storage/feed/cafe4.jpg', '2024-10-30 03:04:56', 1, NULL),
	(47, 39, 'original_image3.jpg', 'image/jpeg', 'cafe0.jpg', 'storage/feed/cafe0.jpg', '2024-10-30 03:04:56', 1, NULL),
	(48, 40, 'original_image4.jpg', 'image/jpeg', 'tr4.jpg', 'storage/feed/tr4.jpg', '2024-10-30 03:04:56', 1, NULL),
	(49, 40, 'original_image4.jpg', 'image/jpeg', 'cafe1.jpg', 'storage/feed/cafe1.jpg', '2024-10-30 03:04:56', 1, NULL),
	(50, 41, 'original_image5.jpg', 'image/jpeg', 'tr0.jpg', 'storage/feed/tr0.jpg', '2024-10-30 03:04:56', 1, NULL),
	(51, 41, 'original_image5.jpg', 'image/jpeg', 'cafe2.jpg', 'storage/feed/cafe2.jpg', '2024-10-30 03:04:56', 1, NULL),
	(52, 42, 'original_image6.jpg', 'image/jpeg', 'tr1.jpg', 'storage/feed/tr1.jpg', '2024-10-30 03:04:56', 1, NULL),
	(53, 42, 'original_image6.jpg', 'image/jpeg', 'cafe3.jpg', 'storage/feed/cafe3.jpg', '2024-10-30 03:04:56', 1, NULL),
	(54, 43, 'original_image7.jpg', 'image/jpeg', 'tr2.jpg', 'storage/feed/tr2.jpg', '2024-10-30 03:04:56', 1, NULL),
	(55, 43, 'original_image7.jpg', 'image/jpeg', 'cafe4.jpg', 'storage/feed/cafe4.jpg', '2024-10-30 03:04:56', 1, NULL),
	(56, 44, 'original_image8.jpg', 'image/jpeg', 'cafe0.jpg', 'storage/feed/cafe0.jpg', '2024-10-30 03:04:56', 1, NULL),
	(57, 44, 'original_image8.jpg', 'image/jpeg', 'tr3.jpg', 'storage/feed/tr3.jpg', '2024-10-30 03:04:56', 1, NULL),
	(58, 45, 'original_image9.jpg', 'image/jpeg', 'cafe1.jpg', 'storage/feed/cafe1.jpg', '2024-10-30 03:04:56', 1, NULL),
	(59, 45, 'original_image9.jpg', 'image/jpeg', 'tr4.jpg', 'storage/feed/tr4.jpg', '2024-10-30 03:04:56', 1, NULL),
	(60, 46, 'original_image10.jpg', 'image/jpeg', 'cafe2.jpg', 'storage/feed/cafe2.jpg', '2024-10-30 03:04:56', 1, NULL),
	(61, 46, 'original_image10.jpg', 'image/jpeg', 'tr0.jpg', 'storage/feed/tr0.jpg', '2024-10-30 03:04:56', 1, NULL),
	(62, 47, 'original_image11.jpg', 'image/jpeg', 'cafe3.jpg', 'storage/feed/cafe3.jpg', '2024-10-30 03:04:56', 1, NULL),
	(63, 47, 'original_image11.jpg', 'image/jpeg', 'tr1.jpg', 'storage/feed/tr1.jpg', '2024-10-30 03:04:56', 1, NULL),
	(64, 48, 'original_image12.jpg', 'image/jpeg', 'cafe4.jpg', 'storage/feed/cafe4.jpg', '2024-10-30 03:04:56', 1, NULL),
	(65, 48, 'original_image12.jpg', 'image/jpeg', 'cafe0.jpg', 'storage/feed/cafe0.jpg', '2024-10-30 03:04:56', 1, NULL),
	(66, 49, 'original_image13.jpg', 'image/jpeg', 'tr2.jpg', 'storage/feed/tr2.jpg', '2024-10-30 03:04:56', 1, NULL),
	(67, 49, 'original_image13.jpg', 'image/jpeg', 'cafe1.jpg', 'storage/feed/cafe1.jpg', '2024-10-30 03:04:56', 1, NULL),
	(68, 50, 'original_image14.jpg', 'image/jpeg', 'tr3.jpg', 'storage/feed/tr3.jpg', '2024-10-30 03:04:56', 1, NULL),
	(69, 50, 'original_image14.jpg', 'image/jpeg', 'cafe2.jpg', 'storage/feed/cafe2.jpg', '2024-10-30 03:04:56', 1, NULL),
	(70, 51, 'original_image15.jpg', 'image/jpeg', 'tr4.jpg', 'storage/feed/tr4.jpg', '2024-10-30 03:04:56', 1, NULL),
	(71, 51, 'original_image15.jpg', 'image/jpeg', 'cafe3.jpg', 'storage/feed/cafe3.jpg', '2024-10-30 03:04:56', 1, NULL),
	(72, 52, 'logo.png', 'image/png', '1730267744950-43bcc9d3-cb64-456b-b8b6-6cbdf9700fbf.png', 'storage\\feed\\1730267744950-43bcc9d3-cb64-456b-b8b6-6cbdf9700fbf.png', '2024-10-30 05:55:44', 1, NULL),
	(85, 53, 'clean_logo.png', 'image/png', '1730274097734-c3fc533d-b000-4be5-ae8f-7422e1445180.png', 'storage\\feed\\1730274097734-c3fc533d-b000-4be5-ae8f-7422e1445180.png', '2024-10-30 07:41:37', 1, NULL),
	(86, 53, 'small_logo.png', 'image/png', '1730274097735-00d9c6b8-df57-4a86-83e0-b2adf920c854.png', 'storage\\feed\\1730274097735-00d9c6b8-df57-4a86-83e0-b2adf920c854.png', '2024-10-30 07:41:37', 1, NULL),
	(87, 53, 'logo.png', 'image/png', '1730274097735-5be40927-faa7-4cad-8e0d-b629a9e9430a.png', 'storage\\feed\\1730274097735-5be40927-faa7-4cad-8e0d-b629a9e9430a.png', '2024-10-30 07:41:37', 1, NULL),
	(90, 0, 'logo.png', 'image/png', '1730278300184-480999c6-2ad3-47d8-8a68-c589f2ef424e.png', 'storage\\profile\\1730278300184-480999c6-2ad3-47d8-8a68-c589f2ef424e.png', '2024-10-30 08:51:40', 0, 'admin');

-- 테이블 reactsns.tbl_follow 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_follow` (
  `followerId` varchar(255) NOT NULL DEFAULT '0',
  `followingId` varchar(255) NOT NULL DEFAULT '',
  `followedAt` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`followerId`,`followingId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 reactsns.tbl_follow:~1 rows (대략적) 내보내기
DELETE FROM `tbl_follow`;
INSERT INTO `tbl_follow` (`followerId`, `followingId`, `followedAt`) VALUES
	('admin', 'user1@naver.com', '2024-10-30 02:57:22'),
	('admin', 'user2@naver.com', '2024-10-30 02:57:22'),
	('admin', 'user3@naver.com', '2024-10-30 02:57:22'),
	('admin', 'user4@naver.com', '2024-10-30 02:57:22'),
	('admin', 'user5@naver.com', '2024-10-30 02:57:22'),
	('admin', 'user7@naver.com', '2024-10-30 02:57:22'),
	('user1', 'admin', '2024-10-30 02:00:20'),
	('user1@naver.com', 'admin', '2024-10-30 02:57:22'),
	('user1@naver.com', 'user2@naver.com', '2024-10-30 02:57:22'),
	('user1@naver.com', 'user3@naver.com', '2024-10-30 02:57:22'),
	('user1@naver.com', 'user4@naver.com', '2024-10-30 02:57:22'),
	('user1@naver.com', 'user5@naver.com', '2024-10-30 02:57:22'),
	('user2@naver.com', 'user1@naver.com', '2024-10-30 02:57:22'),
	('user2@naver.com', 'user3@naver.com', '2024-10-30 02:57:22'),
	('user2@naver.com', 'user4@naver.com', '2024-10-30 02:57:22'),
	('user2@naver.com', 'user5@naver.com', '2024-10-30 02:57:22'),
	('user2@naver.com', 'user6@naver.com', '2024-10-30 02:57:22'),
	('user3@naver.com', 'admin', '2024-10-30 02:57:22'),
	('user3@naver.com', 'user2@naver.com', '2024-10-30 02:57:22'),
	('user3@naver.com', 'user6@naver.com', '2024-10-30 02:57:22'),
	('user3@naver.com', 'user7@naver.com', '2024-10-30 02:57:22'),
	('user4@naver.com', 'user1@naver.com', '2024-10-30 02:57:22'),
	('user4@naver.com', 'user5@naver.com', '2024-10-30 02:57:22'),
	('user4@naver.com', 'user7@naver.com', '2024-10-30 02:57:22'),
	('user5@naver.com', 'admin', '2024-10-30 02:57:22'),
	('user5@naver.com', 'user1@naver.com', '2024-10-30 02:57:22'),
	('user5@naver.com', 'user6@naver.com', '2024-10-30 02:57:22'),
	('user6@naver.com', 'user3@naver.com', '2024-10-30 02:57:22'),
	('user6@naver.com', 'user7@naver.com', '2024-10-30 02:57:22'),
	('user7@naver.com', 'admin', '2024-10-30 02:57:22'),
	('user7@naver.com', 'user4@naver.com', '2024-10-30 02:57:22');

-- 테이블 reactsns.tbl_user 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_user` (
  `id` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 reactsns.tbl_user:~8 rows (대략적) 내보내기
DELETE FROM `tbl_user`;
INSERT INTO `tbl_user` (`id`, `pwd`, `name`, `phone`) VALUES
	('admin', '$2b$10$Pc1Tni/sIJy26/DvbRqI7OuigCKhyr.ksN5TMp7790jnxoxnW3h9G', 'admin', '01012341234'),
	('user1', '$2b$10$Pc1Tni/sIJy26/DvbRqI7OuigCKhyr.ksN5TMp7790jnxoxnW3h9G', 'User Three', '010-3456-7890'),
	('user1@naver.com', '$2b$10$Pc1Tni/sIJy26/DvbRqI7OuigCKhyr.ksN5TMp7790jnxoxnW3h9G', 'User One', '010-1234-5678'),
	('user2@naver.com', '$2b$10$Pc1Tni/sIJy26/DvbRqI7OuigCKhyr.ksN5TMp7790jnxoxnW3h9G', 'User Two', '010-2345-6789'),
	('user3@naver.com', '$2b$10$Pc1Tni/sIJy26/DvbRqI7OuigCKhyr.ksN5TMp7790jnxoxnW3h9G', 'User Three', '010-0000-0003'),
	('user4@naver.com', '$2b$10$Pc1Tni/sIJy26/DvbRqI7OuigCKhyr.ksN5TMp7790jnxoxnW3h9G', 'User Four', '010-0000-0004'),
	('user5@naver.com', '$2b$10$Pc1Tni/sIJy26/DvbRqI7OuigCKhyr.ksN5TMp7790jnxoxnW3h9G', 'User Five', '010-0000-0005'),
	('user6@naver.com', '$2b$10$Pc1Tni/sIJy26/DvbRqI7OuigCKhyr.ksN5TMp7790jnxoxnW3h9G', 'User Six', '010-0000-0006'),
	('user7@naver.com', '$2b$10$Pc1Tni/sIJy26/DvbRqI7OuigCKhyr.ksN5TMp7790jnxoxnW3h9G', 'User Seven', '010-0000-0007');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
