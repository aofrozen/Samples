<?php
/* api */
header('Content-Type: text/xml');
require_once('lib/init.php');
require_once('lib/api.php');
params_request(array('method' => null));
$avg = params_request_a($_REQUEST);
call_method($get_method);
?>