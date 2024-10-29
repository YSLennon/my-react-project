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
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 reactsns.tbl_comment:~10 rows (대략적) 내보내기
DELETE FROM `tbl_comment`;
INSERT INTO `tbl_comment` (`commentNo`, `boardNo`, `id`, `content`, `createdAt`) VALUES
	(1, 17, 'admin', '17번 피드의 첫 번째 댓글입니다.', '2024-10-29 07:15:08'),
	(2, 17, 'user1@naver.com', '이 피드 내용이 흥미롭네요!', '2024-10-29 07:15:08'),
	(3, 18, 'admin', '유익한 정보 감사해요.', '2024-10-29 07:15:08'),
	(4, 18, 'user1@naver.com', '좋은 글이에요, 많이 배웠습니다.', '2024-10-29 07:15:08'),
	(5, 19, 'admin', '19번 피드에 대한 코멘트입니다.', '2024-10-29 07:15:08'),
	(6, 19, 'user1@naver.com', '감사합니다, 도움이 되었어요!', '2024-10-29 07:15:08'),
	(7, 20, 'admin', '유용한 내용 잘 봤습니다.', '2024-10-29 07:15:08'),
	(8, 20, 'user1@naver.com', '내용이 알차네요. 공유해 주셔서 고맙습니다.', '2024-10-29 07:15:08'),
	(9, 17, 'admin', '또 다른 의견 남깁니다.', '2024-10-29 07:15:08'),
	(10, 18, 'user1@naver.com', '이런 글이 더 많았으면 좋겠어요.', '2024-10-29 07:15:08'),
	(11, 22, 'admin', 'ㅁㅁㅁㅁㅁㄴㅇㄻ', '2024-10-29 12:19:08'),
	(12, 22, 'user1', 'ahffkdyd', '2024-10-29 13:47:49'),
	(43, 22, 'user1', 'asdf', '2024-10-29 15:49:42');

-- 테이블 reactsns.tbl_feed 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_feed` (
  `feedNo` int NOT NULL AUTO_INCREMENT COMMENT '피드 번호',
  `id` varchar(50) NOT NULL COMMENT '사용자 ID',
  `text` text NOT NULL COMMENT '피드 내용',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '생성 일자',
  PRIMARY KEY (`feedNo`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 reactsns.tbl_feed:~5 rows (대략적) 내보내기
DELETE FROM `tbl_feed`;
INSERT INTO `tbl_feed` (`feedNo`, `id`, `text`, `createdAt`) VALUES
	(17, 'admin', 'ㅁㄴㅇ', '2024-10-29 02:17:26'),
	(18, 'admin', 'ㅎㅇ', '2024-10-29 03:15:26'),
	(19, 'admin', '"나만없어고양이"', '2024-10-29 08:15:05'),
	(20, 'admin', 'ㄷㄷ', '2024-10-29 11:13:24'),
	(21, 'admin', 'ㅁㄴㄻㄴㅇ', '2024-10-29 11:13:56'),
	(22, 'admin', '마자용', '2024-10-29 11:41:05');

-- 테이블 reactsns.tbl_file 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_file` (
  `fileNo` int NOT NULL AUTO_INCREMENT COMMENT '파일 번호',
  `boardNo` int NOT NULL COMMENT '연관된 게시물 번호',
  `orgName` varchar(255) NOT NULL COMMENT '원본 파일명',
  `fileType` varchar(50) NOT NULL COMMENT '파일 타입 (예: image/png)',
  `filename` varchar(255) NOT NULL COMMENT '서버에 저장된 파일명',
  `path` varchar(255) NOT NULL COMMENT '파일 경로',
  `uploadedAt` timestamp NULL DEFAULT NULL COMMENT '업로드 일자',
  `category` int DEFAULT NULL,
  PRIMARY KEY (`fileNo`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 reactsns.tbl_file:~14 rows (대략적) 내보내기
DELETE FROM `tbl_file`;
INSERT INTO `tbl_file` (`fileNo`, `boardNo`, `orgName`, `fileType`, `filename`, `path`, `uploadedAt`, `category`) VALUES
	(34, 17, '현이의가방끈_투머치버전.png', 'image/png', '1730168246495-e35c8133-2a75-403c-91f5-a78265a7ad0c.png', 'storage\\feed\\1730168246495-e35c8133-2a75-403c-91f5-a78265a7ad0c.png', NULL, 1),
	(35, 17, '현이의가방끈_rainbow.png', 'image/png', '1730168246497-68874f47-30f3-4af3-be30-eb01fb6f0d33.png', 'storage\\feed\\1730168246497-68874f47-30f3-4af3-be30-eb01fb6f0d33.png', NULL, 1),
	(36, 17, '현이의가방끈.png', 'image/png', '1730168246498-fe03a8f1-04e7-46aa-9a8e-ee229652e6ca.png', 'storage\\feed\\1730168246498-fe03a8f1-04e7-46aa-9a8e-ee229652e6ca.png', NULL, 1),
	(37, 18, '2019_06_14_05_42_2537.png', 'image/png', '1730171726802-6f37043e-82df-4726-a7f8-354632999a6a.png', 'storage\\feed\\1730171726802-6f37043e-82df-4726-a7f8-354632999a6a.png', NULL, 1),
	(38, 19, 'githubIcon.png', 'image/png', '1730189705725-71b224a1-ba27-4cd0-9091-6f728ecc7c60.png', 'storage\\feed\\1730189705725-71b224a1-ba27-4cd0-9091-6f728ecc7c60.png', NULL, 1),
	(39, 20, 'icon_left.png', 'image/png', '1730200404246-e8ca995d-ab81-4d62-ab3b-d04a7ec8a43c.png', 'storage\\feed\\1730200404246-e8ca995d-ab81-4d62-ab3b-d04a7ec8a43c.png', NULL, 1),
	(40, 21, '현이의가방끈_투머치버전.png', 'image/png', '1730200436138-321d9071-ed9f-42d6-b862-f1e1019a1223.png', 'storage\\feed\\1730200436138-321d9071-ed9f-42d6-b862-f1e1019a1223.png', NULL, 1),
	(41, 22, '현이의가방끈_투머치버전.png', 'image/png', '1730202065307-18dc1fe7-c1db-42f3-99ba-ef0c4906e2a9.png', 'storage\\feed\\1730202065307-18dc1fe7-c1db-42f3-99ba-ef0c4906e2a9.png', NULL, 1);

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
	('user1', 'admin', '2024-10-29 16:06:55');

-- 테이블 reactsns.tbl_user 구조 내보내기
CREATE TABLE IF NOT EXISTS `tbl_user` (
  `id` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 reactsns.tbl_user:~1 rows (대략적) 내보내기
DELETE FROM `tbl_user`;
INSERT INTO `tbl_user` (`id`, `pwd`, `name`, `phone`) VALUES
	('admin', '$2b$10$Pc1Tni/sIJy26/DvbRqI7OuigCKhyr.ksN5TMp7790jnxoxnW3h9G', 'admin', '01012341234'),
	('user1', '$2b$10$Pc1Tni/sIJy26/DvbRqI7OuigCKhyr.ksN5TMp7790jnxoxnW3h9G', 'User Three', '010-3456-7890'),
	('user1@naver.com', '$2b$10$Pc1Tni/sIJy26/DvbRqI7OuigCKhyr.ksN5TMp7790jnxoxnW3h9G', 'User One', '010-1234-5678'),
	('user2@naver.com', '$2b$10$Pc1Tni/sIJy26/DvbRqI7OuigCKhyr.ksN5TMp7790jnxoxnW3h9G', 'User Two', '010-2345-6789');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
