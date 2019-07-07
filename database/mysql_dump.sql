-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: 2019-07-07 12:07:25
-- 服务器版本： 5.7.26-0ubuntu0.18.04.1
-- PHP Version: 7.2.17-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wicked-sales`
--

-- --------------------------------------------------------

--
-- 表的结构 `images`
--

CREATE TABLE `images` (
  `id` int(10) UNSIGNED NOT NULL,
  `url` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `products_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `images`
--

INSERT INTO `images` (`id`, `url`, `products_id`) VALUES
(1, 'https://i.pinimg.com/originals/e7/96/ef/e796ef9a767fa96ce1a18d7b8e3bc551.png', 1),
(2, 'https://img.rankedboost.com/wp-content/uploads/2018/10/Dragonite-Pokemon-Lets-GO.png', 1),
(3, 'https://i.ya-webdesign.com/images/png-dragonite-13.png', 1),
(4, 'http://www.iconhot.com/icon/png/ive-drives/256/unibody-time-machine.png', 2),
(5, 'http://icons.iconseeker.com/png/fullsize/black-glassy-set/timemachine-2.png', 2),
(6, 'http://acletras.com/wp-content/img/TimeMachineVortex.png', 2),
(7, 'https://www.jewinston.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/r/i/ri5090508.jpg', 3),
(8, 'https://i.etsystatic.com/20062299/c/890/707/74/228/il/6ae47c/1912626083/il_340x270.1912626083_e3oi.jpg', 3),
(9, 'http://s3.weddbook.com/t4/2/4/3/2431678/tungsten-carbide-pair-ring-set-with-abalone-shell-and-koa-wood-inlay-6-8mm-width-barrel-shaped-comfort-fit.jpg', 3),
(10, 'https://vignette.wikia.nocookie.net/ageofmagicgame/images/4/48/Experience_Potion.png/revision/latest?cb=20170915103844', 4),
(11, 'https://beachlifedotblog.files.wordpress.com/2018/04/level_3_mana_potion___open_by_adorabless-d51karq.png?w=568', 4),
(12, 'http://cdn.edgebee.com/static/shopr2/items/UP_mana_potion.png', 4),
(13, 'http://onebigphoto.com/uploads/2012/01/the-lake-house.jpg', 5),
(14, 'https://cdn.decoist.com/wp-content/uploads/2013/08/Lake-House-in-Germany.jpg', 5),
(15, 'http://stevelarese.com/wp-content/uploads/modern-lake-house-designs-modern-lake-house-design-with-modern-lake-house-plans.jpg', 5),
(16, 'http://www.slate.com/content/dam/slate/articles/arts/culturebox/2015/06/150612_CBOX_Skyfaring.jpg.CROP.original-original.jpg', 6),
(17, 'https://images-na.ssl-images-amazon.com/images/I/71GcwJBmeyL._SL1001_.jpg', 6),
(18, 'https://pbs.twimg.com/profile_images/719011650813108224/NZJhYVvC_400x400.jpg', 6),
(19, 'http://media.altuslearn.com/altuscampus/sites/129/2016/08/imaging-library-pass.png', 7),
(20, 'http://hersheylibrary.org/wp-content/uploads/2019/02/library_card_blank2.png', 7),
(21, 'https://i1.wp.com/pololibrary.org/wp-content/uploads/2019/03/Public-Library-Card.jpg', 7),
(22, 'https://o.aolcdn.com/images/dims?quality=85&image_uri=https%3A%2F%2Fs.aolcdn.com%2Fhss%2Fstorage%2Fmidas%2Faab5e1db5991575bb3760c328cdae78%2F206663861%2FDnA7hZgU8AAxfxC.jpg&client=amp-blogside-v2&signature=a5745ad83206e678992f95b31da25445bcfd89cb', 8),
(23, 'https://www.aljazeera.com/mritems/Images/2017/2/28/c4ee0762fddd440b9dbaa2140bda3ece_18.jpg', 8),
(24, 'https://ak1.picdn.net/shutterstock/videos/20413171/thumb/1.jpg', 8),
(26, 'http://www.mscareergirl.com/wp-content/uploads/2017/11/dream-job-sign-pixy-620x420@2x.jpg', 9),
(27, 'https://thumbs.dreamstime.com/z/dream-job-male-business-suit-touching-screen-career-development-happiness-dream-job-male-business-suit-touching-screen-116514598.jpg', 9),
(28, 'https://images-eu.ssl-images-amazon.com/images/I/819LSZSvn1L.png', 9);

-- --------------------------------------------------------

--
-- 表的结构 `products`
--

CREATE TABLE `products` (
  `id` int(5) UNSIGNED NOT NULL,
  `name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `price` mediumint(8) UNSIGNED NOT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `shortDescription` varchar(600) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `image`, `shortDescription`) VALUES
(1, 'Dragonite', 7999, 'https://i.ya-webdesign.com/images/png-dragonite-13.png', 'Owning this pokemon, you don\'t need to worry about daily commute. Imagine you ride it and fly through freeway 405 to your office every morning. Watch those traffic down there and people stucked in cars. \nThis pokemon is your luxury car, private jet and yacht all in one.'),
(2, 'Time Machine', 2595, 'http://www.iconhot.com/icon/png/ive-drives/256/unibody-time-machine.png', 'People in your life left expectedly before you got a chance to tell how much you love them. Not a problem anymore. Buy Jeremy\'s DIY time machine. Set the time and quantumlize your body there. Import Note: We strongly recommend that you should not try to bring technologies and information of current time to the time you travel to. Nor make another decision trying to change the history of your life. \nWhy? Remember the movie: The Butterfly Effect?'),
(3, 'Paired Rings', 2900, 'https://i.etsystatic.com/20062299/c/890/707/74/228/il/6ae47c/1912626083/il_340x270.1912626083_e3oi.jpg', 'Blessed paired rings that keep you in a healthy, happy and positive relationship forever.\nThese paired magical rings consolidate the bond between lovers and make them stay intimate.'),
(4, 'Life Potion', 100, 'http://cdn.edgebee.com/static/shopr2/items/UP_mana_potion.png', 'Immortality is too ambitious. Living a longer life is good enough. Jeremy\'s whole-sale life potion can help you with that. Each small bottle will extend your life by 1 second. Yeah, only 1 second. So make sure you buy lots at once.\n\n'),
(5, 'House by the Lake', 9900, 'http://onebigphoto.com/uploads/2012/01/the-lake-house.jpg', 'A nice modern design house locates by a tranquil lake. Big french windows face the lake, face the serenity. You could set a desk and write some awesome codes there. '),
(6, 'Pilot Training', 5699, 'https://images-na.ssl-images-amazon.com/images/I/71GcwJBmeyL._SL1001_.jpg', 'Still remember that when u got your driving license, your life circle expands dramatically? Now let\'s bring the game to the next level by acquiring your own private pilot license. \nLiving in southern California and have a last minute decision to have dinner with girlfriend in a fancy restaurant in Les Vegas? Not a problem. Just fly there, enjoy a good time. You two can still cuddle in your own bed on that night. Yeah, welcome to a smaller world.'),
(7, 'Library Pass', 7000, 'http://media.altuslearn.com/altuscampus/sites/129/2016/08/imaging-library-pass.png', 'Reading is the sexiest hobby one could possibly have. We sell a platinum library membership which grants unlimited access to any library all over the universe. \nThis membership includes all the perks that library provides to its own members. And the most important things is: it never expires. Your reading era is here!'),
(8, 'Moon trip', 9999, 'https://o.aolcdn.com/images/dims?quality=85&image_uri=https%3A%2F%2Fs.aolcdn.com%2Fhss%2Fstorage%2Fmidas%2Faab5e1db5991575bb3760c328cdae78%2F206663861%2FDnA7hZgU8AAxfxC.jpg&client=amp-blogside-v2&signature=a5745ad83206e678992f95b31da25445bcfd89cb', 'Forty years ago, two Americans touched down on the moon and walked upon its surface. Why NASA never go back again? Because they saw something there. Curious about what they saw. Buy this package, land on the moon, checkout by yourself. We ensure your safety during the trip. But bring your own wifi if u want to be trendy online.'),
(9, 'Dream Job', 6799, 'https://images-eu.ssl-images-amazon.com/images/I/819LSZSvn1L.png', 'Working time consist of one-third of a lifetime. A good job upgrades your life quality. In our store, we provide customized dream job for each buyer. \nPurchase this item then you will receive your dream offer in 2 weeks. Oh, don\'t forget to ride Dragonite to your dream office every day. Have a wonderful life.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `images`
--
ALTER TABLE `images`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- 使用表AUTO_INCREMENT `products`
--
ALTER TABLE `products`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
