<?php
/* console tool */
require_once('lib/init.php');
require_once('lib/api.php');
require_once('lib/app.php');
params_request(array(
'method' => null, 
'tag' => null, 
'uid' => null,
'format' => null,
'callback' => null,
'uid1' => null,
'uid2' => null));
call_method($get_method);
?>