<?php
/* init */
$time = time();
$user_agent = $_SERVER['HTTP_USER_AGENT'];
$ip_address = $_SERVER['REMOTE_ADDR'];

$publickey = 'XXXX'; //app.mycrib.net
$privatekey = 'XXXX';

/* require includes */
require_once 'lib/cache.php';
require_once 'lib/mysql.php';
require_once 'lib/cookie.php';
require_once 'lib/data.php';
require_once 'lib/menu.php';
require_once 'lib/recaptchalib.php';
/* ftp configuration */
$ftp_login = 'XXXX';
$ftp_password = 'XXXX';
$ftp_ip_address = 'XXXX';

/* defines */
define("RTITLE01", "Automatic Redirection");
define("RMSG01", "You need to log in first. Please, be patient for the automatic redirection in a second.");
define("MTITLE01", "MyCrib Message");
define("MTITLE02", "Confirmation");
define("URLBACK", "javascript:history.back();");

/* variables */
$__STR = 'string';
$__INT = 'int';
ob_start("ob_gzhandler");
?>