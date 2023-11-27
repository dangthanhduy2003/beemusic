-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 09, 2023 lúc 04:28 PM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `beemusic`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `album`
--

CREATE TABLE `album` (
  `id` int(10) UNSIGNED NOT NULL,
  `name_album` varchar(255) NOT NULL,
  `year` date DEFAULT NULL,
  `id_user` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `album`
--

INSERT INTO `album` (`id`, `name_album`, `year`, `id_user`, `created_at`, `updated_at`) VALUES
(2, 'thích thì nhích', '0000-00-00', 3, NULL, NULL),
(8, 'Thích thì Nhích', NULL, 2, '2023-10-25 07:29:10', '2023-10-25 07:29:10');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `album_music`
--

CREATE TABLE `album_music` (
  `id_album` int(10) UNSIGNED NOT NULL,
  `id_music` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `album_music`
--

INSERT INTO `album_music` (`id_album`, `id_music`, `created_at`, `updated_at`) VALUES
(2, 7, NULL, NULL),
(2, 17, NULL, NULL),
(8, 9, '2023-11-07 13:45:56', '2023-11-07 13:45:56'),
(8, 10, '2023-11-07 13:45:56', '2023-11-07 13:45:56'),
(8, 11, '2023-11-07 11:11:55', '2023-11-07 11:11:55'),
(8, 12, '2023-11-07 13:45:56', '2023-11-07 13:45:56');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `avatar`, `created_at`, `updated_at`) VALUES
(3, 'US-UK', '1698428111_MV5BMjdiYTYyMDAtNGNlYS00ODA0LTk3M2MtOTlmYzkyZmM4M2VjXkEyXkFqcGdeQXVyMTA1NTIxMzA3._V1_.jpg', '2023-10-25 02:00:28', '2023-10-27 17:35:11'),
(4, 'Nhạc Việt', '1698428044_Hieuthuhai.jpg', '2023-10-25 02:01:13', '2023-10-27 17:34:04'),
(5, 'K-POP', '1698428204_BTS-1615171768-2784-1615171875.jpg', '2023-10-27 17:36:44', '2023-10-27 17:36:44'),
(6, 'HIP-HOP', '1698428290_old_town_road.png', '2023-10-27 17:38:10', '2023-10-27 17:38:10'),
(7, 'Tâm trạng', '1698428517_nhac-lofi-la-gi.jpg', '2023-10-27 17:41:57', '2023-10-27 17:41:57'),
(8, 'Ngủ ngon', '1698428553_Chuc-ngu-ngon-700.jpg', '2023-10-27 17:42:33', '2023-10-27 17:42:33'),
(9, 'Tình yêu', '1698428608_bat-tinh-yeu-len.jpg', '2023-10-27 17:43:28', '2023-10-27 17:43:28'),
(10, 'EDM', '1698428666_mobile.jpg', '2023-10-27 17:44:26', '2023-10-27 17:44:26'),
(11, 'Nhạc phim', '1698428747_373025600-8630207353.jpeg', '2023-10-27 17:45:47', '2023-10-27 17:45:47'),
(12, 'Cà phê', '1698428802_shutterstock-326070713.jpg', '2023-10-27 17:46:42', '2023-10-27 17:46:42'),
(13, 'Thư giãn', '1698428832_20210219_023011_251912_yoga_4.max-1800x1800.jpg', '2023-10-27 17:47:12', '2023-10-27 17:47:12'),
(14, 'Rap Việt', '1698428879_ik66h2HWXhqzjiNtc6vwMk0y8kr8u17rNVb5YFPQ.png', '2023-10-27 17:47:59', '2023-10-27 17:47:59'),
(15, 'Test', '1698467711_5.jpg', '2023-10-28 04:35:11', '2023-10-28 04:35:11');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(2, '2019_08_19_000000_create_failed_jobs_table', 1),
(3, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(4, '2023_10_04_084445_role', 1),
(5, '2023_10_04_085034_users', 1),
(6, '2023_10_04_090931_album', 1),
(7, '2023_10_04_091336_music', 1),
(8, '2023_10_04_091658_categories', 1),
(9, '2023_10_04_091924_album_music', 1),
(10, '2023_10_04_092426_music_cate', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `music`
--

CREATE TABLE `music` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `link_file` varchar(255) NOT NULL,
  `thumbnail` varchar(255) NOT NULL,
  `view` varchar(255) NOT NULL,
  `lyrics` text DEFAULT NULL,
  `id_user` int(10) UNSIGNED NOT NULL,
  `artist` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `music`
--

INSERT INTO `music` (`id`, `name`, `link_file`, `thumbnail`, `view`, `lyrics`, `id_user`, `artist`, `created_at`, `updated_at`) VALUES
(3, 'You & Me', '1698429903_yt5s.io - JENNIE - ‘You & Me’ DANCE PERFORMANCE VIDEO (128 kbps).mp3', '1698429903_222603_2.png', '0', 'You know I gotcha\r\nYou know that I got you like that\r\nAin’t nobody gonna have your back\r\nlike the way I do\r\nYou love it just say you do\r\n\r\nYou know you got me\r\nEverything you do\r\nEverything you did\r\nEverything I wish I was with\r\nMakes me feel alright\r\nI’m just saying so\r\n\r\nI really like it \r\nNothing in the world can make me feel the way you do the things you do\r\nI really like it \r\nNothing in the world can make me feel the way you do the things you do', 3, 'JENNIE', '2023-10-24 08:07:33', '2023-10-27 18:05:03'),
(4, 'CẮT ĐÔI NỖI SẦU (ft DRUM7)', '1698429764_yt5s.io - TĂNG DUY TÂN - CẮT ĐÔI NỖI SẦU (ft DRUM7) _ OFFICIAL MUSIC VIDEO (128 kbps).mp3', '1698429764_bf0182328238f2a252496a63e51f1f74.jpg', '0', 'Ϲắt đôi nỗi sầu\r\nAnh buông taу cắt đôi nỗi sầu\r\nAnh cắt đi cả bóng hình\r\nAnh mang theo bên mình bấу lâu...\r\nƝỗi đau đã cạn\r\nϹơn mưa trong tim cũng đã tan\r\nAnh bán đi mọi nỗi buồn\r\nĐể chẳng còn gì ngoài thanh thản...\r\nƐm ơi anh muốn\r\nMỗi tối đến anh không phải thất tình\r\nMuốn quên một bóng hình\r\nƐm để lại, trong tim...\r\nAnh không thể đếm\r\nĐã có bấу nhiêu đêm phải kiếm tìm\r\nKiếm thêm một lí do\r\nϹho cuộc tình không tên...', 3, 'TĂNG DUY TÂN', '2023-10-24 08:19:44', '2023-10-27 18:02:44'),
(6, 'HIT ME UP (ft. NOMOVODKA)', '1698429632_yt5s.io - BINZ - HIT ME UP (ft. NOMOVODKA) - OFFICIAL MV (128 kbps).mp3', '1698429632_1697472547132_640.jpg', '0', 'Phone cho anh những lúc em một mình\r\nSau đó làm gì thì gặp rồi sẽ biết\r\nKhông ai mang cho em feeling nhiều vậy\r\nAnh biết anh sẽ là người làm em điên\r\n\r\nTrời dù mưa, đường có đông, nhà có xa anh cũng qua\r\nChỉ cần nói là em đang không thấy vui anh sẽ tới\r\nĐứng trước cửa nhà em nhìn thấy trên camera\r\nCasablanca tay anh mang hoa, khoác pijama ra đón anh vào nhà', 2, 'BINZ', '2023-10-25 02:02:24', '2023-10-27 18:00:32'),
(7, 'Anh Là Ngoại Lệ Của Em', '1698429491_yt5s.io - ANH LÀ NGOẠI LỆ CỦA EM - PHƯƠNG LY _ OFFICIAL MV (128 kbps).mp3', '1698429491_1696414640108_640.jpg', '0', 'Và em đã biết sẽ không thể yêu ai khác ngoài anh ra\r\nLòng em đã hết chỗ không để dành ai khác ngoài anh ra\r\nCửa vào tim em, chìa khoá đây, chỉ muốn duy nhất anh cầm\r\nNhiều hơn cả thichthich, giờ em yeuyeu ah', 2, 'PHƯƠNG LY', '2023-10-27 14:30:40', '2023-10-27 17:58:11'),
(8, 'Chài Điếp Noọng (Anh Yêu Em) [Prod. by DươngK]', '1698429193_eh2bksmfjs.mp3', '1698429193_1695875090790_640.jpg', '0', 'Đôi chân này đi theo từng tiếng nhịp đập của một con tim\r\nThấy sao cất lên hai tiếng bồi hồi núi rừng bao la\r\nNhư đường hai ta, như là quen biết nhau rất lâu\r\nChìm sâu vào đôi mắt nâu (theo cá mà bản pây)', 2, 'Double2T, Hoà Minzy', '2023-10-27 16:12:55', '2023-10-27 17:53:13'),
(9, 'ĐẠI MINH TINH', '1698430099_yt5s.io - ĐẠI MINH TINH _  VĂN MAI HƯƠNG (prod. by HỨA KIM TUYỀN) _ OFFICIAL MV (128 kbps).mp3', '1698430099_1695196634266.jpg', '0', 'Cô ta thật huy hoàng\r\nĐứng giữa hào quang đang chiếu sáng\r\nCô ta đẹp ngỡ ngàng\r\nBao nhiêu là hoa, son, phấn, ngọc ngà\r\nNgười săn đón hàng vạn\r\n\r\nNgười ghét cay hàng ngàn\r\nCô ta lại chia tay rồi\r\nBao nhiêu chàng trai cứ tiếp nối\r\nCô ta lại sai rồi\r\nThêm những bài ca đau đớn không tồi\r\nGiọt nước mắt bẽ bàng\r\n\r\nLà thước phim ngàn vàng\r\nCó lúc thấy em như tơ trời\r\nPhấp phới em bay giữa đời\r\nChẳng biết sẽ cư thân nơi nào\r\nEm có tìm được hạnh phúc\r\nMột câu hỏi em chẳng thể trả lời', 2, 'VĂN MAI HƯƠNG (prod. by HỨA KIM TUYỀN)', '2023-10-27 18:08:19', '2023-10-27 18:08:19'),
(10, '음악의 신', '1698430244_yt5s.io - SEVENTEEN (세븐틴) \'음악의 신\' Official MV (128 kbps).mp3', '1698430244_b398ea18-c0b3-4c7c-9e76-38c5aac0af30.jpeg', '0', '콘텐츠에 등장하는 모든 동물들은 전문가들의 세심한 관리와 보살핌 아래 촬영되었습니다.', 2, 'SEVENTEEN', '2023-10-27 18:10:44', '2023-10-27 18:10:44'),
(11, 'LỆ LƯU LY', '1698430382_yt5s.io - LỆ LƯU LY - VŨ PHỤNG TIÊN x DT TẬP RAP x DRUM7 _ OFFICIAL MUSIC VIDEO (128 kbps).mp3', '1698430382_maxresdefault.jpg', '0', 'LỆ LƯU LY', 2, 'VŨ PHỤNG TIÊN x DT TẬP RAP x DRUM7', '2023-10-27 18:13:02', '2023-10-27 18:13:02'),
(12, 'BÓNG PHÙ HOA', '1698430604_yt5s.io - PHƯƠNG MỸ CHI x DTAP - BÓNG PHÙ HOA _ OFFICIAL VISUALIZER (128 kbps).mp3', '1698430604_maxresdefault (1).jpg', '0', NULL, 2, 'PHƯƠNG MỸ CHI x DTAP', '2023-10-27 18:16:44', '2023-10-27 18:16:44'),
(13, 'Die For You (Remix)', '1698430720_yt5s.io - The Weeknd & Ariana Grande - Die For You (Remix) - Remastered (128 kbps).mp3', '1698430720_1f3fdbdde5182662679c4dfcf1c53835.941x941x1.png', '0', NULL, 2, 'The Weeknd & Ariana Grande', '2023-10-27 18:18:40', '2023-10-27 18:18:40'),
(14, '7 rings', '1698430891_yt5s.io - Ariana Grande - 7 rings (Official Video) (128 kbps).mp3', '1698430891_saostar-cbz8d9knacxw0do9.png', '0', NULL, 2, 'Ariana Grande', '2023-10-27 18:21:31', '2023-10-27 18:21:31'),
(15, 'One Of The Girls', '1698430993_yt5s.io - The Weeknd, JENNIE & Lily Rose Depp - One Of The Girls (Official Audio) (128 kbps).mp3', '1698430993_230515101146-the-weeknd-121222.jpg', '0', NULL, 2, 'The Weeknd, JENNIE & Lily Rose Depp', '2023-10-27 18:23:13', '2023-10-27 18:23:13'),
(16, 'Nhạt', '1698434127_nhat.mp3', '1698434127_tải xuống.jpg', '0', NULL, 9, 'Phan Mạnh Quỳnh', '2023-10-27 19:15:27', '2023-10-27 19:15:27'),
(17, 'Tesst', '1698467743_nhat.mp3', '1698467743_6.jpg', '0', NULL, 2, 'tsesst', '2023-10-28 04:35:43', '2023-10-28 04:35:43'),
(18, 'HEHEHEHE', '1699095103_vonguoita.mp3', '1699352414_robeo.webp', '0', 's', 9, 'Duy', '2023-11-04 10:51:43', '2023-11-07 10:20:14'),
(21, 'Chạy ngay đi', '1699353515_vonguoita.mp3', '1699353757_tải xuống.jpg', '0', 'hihi hahaha', 13, 'Sơn Tùng MTP', '2023-11-07 10:38:35', '2023-11-07 10:42:37');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `music_cate`
--

CREATE TABLE `music_cate` (
  `id_music` int(10) UNSIGNED NOT NULL,
  `id_categories` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `music_cate`
--

INSERT INTO `music_cate` (`id_music`, `id_categories`, `created_at`, `updated_at`) VALUES
(3, 5, '2023-10-27 18:05:03', '2023-10-27 18:05:03'),
(3, 9, '2023-10-27 18:05:03', '2023-10-27 18:05:03'),
(4, 4, '2023-10-27 18:02:44', '2023-10-27 18:02:44'),
(4, 7, '2023-10-27 18:02:44', '2023-10-27 18:02:44'),
(4, 9, '2023-10-27 18:02:44', '2023-10-27 18:02:44'),
(4, 12, '2023-10-27 18:02:44', '2023-10-27 18:02:44'),
(4, 13, '2023-10-27 18:02:44', '2023-10-27 18:02:44'),
(6, 4, '2023-10-27 18:00:32', '2023-10-27 18:00:32'),
(6, 7, '2023-10-27 18:00:32', '2023-10-27 18:00:32'),
(6, 9, '2023-10-27 18:00:32', '2023-10-27 18:00:32'),
(6, 12, '2023-10-27 18:00:32', '2023-10-27 18:00:32'),
(7, 4, '2023-10-27 17:58:11', '2023-10-27 17:58:11'),
(7, 7, '2023-10-27 17:58:11', '2023-10-27 17:58:11'),
(7, 9, '2023-10-27 17:58:11', '2023-10-27 17:58:11'),
(7, 12, '2023-10-27 17:58:11', '2023-10-27 17:58:11'),
(7, 13, '2023-10-27 17:58:11', '2023-10-27 17:58:11'),
(8, 4, '2023-10-27 17:53:13', '2023-10-27 17:53:13'),
(8, 9, '2023-10-27 17:53:13', '2023-10-27 17:53:13'),
(8, 12, '2023-10-27 17:53:13', '2023-10-27 17:53:13'),
(8, 13, '2023-10-27 17:53:13', '2023-10-27 17:53:13'),
(9, 4, '2023-10-27 18:08:19', '2023-10-27 18:08:19'),
(9, 9, '2023-10-27 18:08:19', '2023-10-27 18:08:19'),
(10, 5, '2023-10-27 18:10:44', '2023-10-27 18:10:44'),
(11, 4, '2023-10-27 18:13:02', '2023-10-27 18:13:02'),
(11, 7, '2023-10-27 18:13:02', '2023-10-27 18:13:02'),
(11, 9, '2023-10-27 18:13:02', '2023-10-27 18:13:02'),
(12, 4, '2023-10-27 18:16:44', '2023-10-27 18:16:44'),
(12, 7, '2023-10-27 18:16:44', '2023-10-27 18:16:44'),
(12, 9, '2023-10-27 18:16:44', '2023-10-27 18:16:44'),
(13, 3, '2023-10-27 18:18:40', '2023-10-27 18:18:40'),
(14, 3, '2023-10-27 18:21:31', '2023-10-27 18:21:31'),
(15, 3, '2023-10-27 18:23:13', '2023-10-27 18:23:13'),
(17, 7, '2023-10-28 04:35:43', '2023-10-28 04:35:43'),
(17, 13, '2023-10-28 04:35:43', '2023-10-28 04:35:43'),
(17, 15, '2023-10-28 04:35:43', '2023-10-28 04:35:43'),
(21, 3, '2023-11-07 10:42:37', '2023-11-07 10:42:37'),
(21, 7, '2023-11-07 10:42:37', '2023-11-07 10:42:37'),
(21, 11, '2023-11-07 10:42:37', '2023-11-07 10:42:37'),
(21, 15, '2023-11-07 10:42:37', '2023-11-07 10:42:37');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `role`
--

CREATE TABLE `role` (
  `id` int(10) UNSIGNED NOT NULL,
  `name_role` varchar(255) DEFAULT NULL,
  `short_role` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `role`
--

INSERT INTO `role` (`id`, `name_role`, `short_role`) VALUES
(1, 'Administrator', 'admin'),
(2, 'User', 'user'),
(3, 'Nghệ sỹ', 'artist');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `id_role` int(10) UNSIGNED NOT NULL DEFAULT 2,
  `provider` varchar(255) DEFAULT NULL,
  `provider_id` varchar(255) DEFAULT NULL,
  `provider_token` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `id_role`, `provider`, `provider_id`, `provider_token`, `avatar`, `remember_token`, `created_at`, `updated_at`) VALUES
(2, 'ĐẶNG THANH DUY', 'thanhduy11a11@gmail.com', NULL, '$2y$10$yVBMhOZgIt9qZjhCBxOYC.ATLIB1Qkb2cGXMdu.c4UpV0Ge15Voa2', 1, NULL, NULL, NULL, '1698143173_7.jpg', NULL, '2023-10-24 07:53:36', '2023-11-07 13:56:13'),
(3, 'JISOO', 'thanhduy11a11@gmail.com22', NULL, '$2y$10$qrCo7j.R3Z8WFLHj.jNDIOhumDGznWF78wup4SBKY.Is4w9WG4zDO', 3, NULL, NULL, NULL, '1698431096_flower-mv-jisoo-solo-blackpink-3.jpg', NULL, '2023-10-24 08:04:45', '2023-10-27 18:24:56'),
(4, 'aaasssss', 'thanhduy11aa1sss1@gmail.coma', NULL, '$2y$10$0z2xp2SRd0TFcR1ZZ2s16.JOoMB7Zb3KHSlTgVYk1cLWyXCvAccpm', 2, NULL, NULL, NULL, '1698137946_2.jpg', NULL, '2023-10-24 08:34:43', '2023-10-24 08:59:06'),
(5, 'JENNIE', 'jjj@gmail.com', NULL, '$2y$10$Ssq9Zh0cYYiIPe5MbZ3zZOALXc8N.0H96q8xK/KM2kUvYtTsahTvq', 3, NULL, NULL, NULL, '1698431320_2137101_54c103ddd9ca66742509d0dea00fae80.jpeg', NULL, '2023-10-27 18:28:40', '2023-10-27 18:28:40'),
(6, 'HIEUTHUHAI', 'hhh@gmail.com', NULL, '$2y$10$kvNswf0enqKnWFvLX7uDUeq.bzbtHT6DS/qVc4nWxE5XQiEB1TSfK', 3, NULL, NULL, NULL, '1698431395_sddefault.jpg', NULL, '2023-10-27 18:29:55', '2023-10-27 18:29:55'),
(7, 'ChiPu', 'ccc@gmail.com', NULL, '$2y$10$UZAg8Hj6toMkH5IN9981qOuQRHrcSG/jLVM99Hde1yXteoQg4S5P6', 3, NULL, NULL, NULL, '1698431479_w9nlnf2ys01-4kydnoeboq2-6fwtz5w7y13.jpg', NULL, '2023-10-27 18:31:19', '2023-10-27 18:31:19'),
(8, 'BTS', 'bbb@gmail.com', NULL, '$2y$10$ceuYcVzoUUnYDcdc.Z40T.faaWIUgU2KsFp1ii6k8ZbYSoPXDwIa6', 3, NULL, NULL, NULL, '1698431521_bts-members-1-03a9c478f1794c448bcb5f74bf94812c-1675696005431256360221.jpg', NULL, '2023-10-27 18:32:01', '2023-10-27 18:32:01'),
(12, 'Duy', 'thanhduy1aa1a11@gmail.com', NULL, '$2y$10$fDkD7M8HN31g9yTjaAfEwuZve/YiC6meaRgIRpO4caBlPLmFyihYa', 3, NULL, NULL, NULL, '1698467633_tải xuống.jpg', NULL, '2023-10-28 04:33:53', '2023-10-28 04:33:53');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `album`
--
ALTER TABLE `album`
  ADD PRIMARY KEY (`id`),
  ADD KEY `album_id_user_foreign` (`id_user`);

--
-- Chỉ mục cho bảng `album_music`
--
ALTER TABLE `album_music`
  ADD PRIMARY KEY (`id_album`,`id_music`),
  ADD KEY `album_music_id_music_foreign` (`id_music`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Chỉ mục cho bảng `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `music`
--
ALTER TABLE `music`
  ADD PRIMARY KEY (`id`),
  ADD KEY `music_id_user_foreign` (`id_user`);

--
-- Chỉ mục cho bảng `music_cate`
--
ALTER TABLE `music_cate`
  ADD PRIMARY KEY (`id_music`,`id_categories`),
  ADD KEY `music_cate_id_categories_foreign` (`id_categories`);

--
-- Chỉ mục cho bảng `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Chỉ mục cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Chỉ mục cho bảng `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_id_role_foreign` (`id_role`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `album`
--
ALTER TABLE `album`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `music`
--
ALTER TABLE `music`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `role`
--
ALTER TABLE `role`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `album`
--
ALTER TABLE `album`
  ADD CONSTRAINT `album_id_user_foreign` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `album_music`
--
ALTER TABLE `album_music`
  ADD CONSTRAINT `album_music_id_album_foreign` FOREIGN KEY (`id_album`) REFERENCES `album` (`id`),
  ADD CONSTRAINT `album_music_id_music_foreign` FOREIGN KEY (`id_music`) REFERENCES `music` (`id`);

--
-- Các ràng buộc cho bảng `music`
--
ALTER TABLE `music`
  ADD CONSTRAINT `music_id_user_foreign` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `music_cate`
--
ALTER TABLE `music_cate`
  ADD CONSTRAINT `music_cate_id_categories_foreign` FOREIGN KEY (`id_categories`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `music_cate_id_music_foreign` FOREIGN KEY (`id_music`) REFERENCES `music` (`id`);

--
-- Các ràng buộc cho bảng `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_id_role_foreign` FOREIGN KEY (`id_role`) REFERENCES `role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
