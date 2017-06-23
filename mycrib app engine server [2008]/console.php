<?php
/* console */

/* application */
require_once('lib/init.php');

/* app modules */
require_once('lib/app.editor.php');
require_once('lib/app.user.php');
require_once('lib/app.misc.php');
require_once('lib/app.nav.php');
require_once('lib/app.embed.php');
require_once('lib/app.core.php');
require_once('lib/app.cache.php');
require_once('lib/app.dev.php');
require_once('lib/app.php');
require_once('lib/app.console.php');

$get_console_data = stripslashes($_REQUEST['console_data']);
$get_tag = (!empty($_REQUEST['tag'])) ? $_REQUEST['tag'] : NULL;
if($get_tag == null || $get_tag == 'mcml')
	{
		start_mcml_console();
	}else{
		start_api_console();
	}
?>