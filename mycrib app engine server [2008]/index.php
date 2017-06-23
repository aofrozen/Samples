<?php
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

params_request(array(
'app_name' => null,
'url' => null,
'private' => null,
'support' => null,
'callback_url' => null,
'canvas_page_url' => null,
'tos_url' => null,
'post_remove_url' => null,
'help_url' => null,
'post_add_url' => null,
'description' => null,
'privacy_url' => null,
'icon' => null,
'recaptcha_challenge_field' => null,
'recaptcha_response_field' => null,
'api_key' => null,
'tag' => null,
'update' => null,
'hash' => null,
'delete' => null,
'profile_links' => null,
'publish_updates' => null,
'profile_box' => null,
'email' => null,
'attachment' => null
));
//is_online($user_id);
$key = 'mc-j38s-lwix-302x';
$form_error_a = array();
$app_name = '';
$url_a = explode("/", $_SERVER['REDIRECT_URL']);
$app_info_a = get_app_info(antixss_filter($url_a[1]));
$post = "?uid=$user_id&pri_key=$pri_key";
if($app_info_a['callback_url'])
	{
		array_shift($url_a);
		array_shift($url_a);
		array_shift($url_a);
		array_shift($url_a);
		$url = $_SERVER['REDIRECT_URL'];
		$params = array();
		$post_params = array();
		$params['mc_sig_user'] = $user_id;
		$params['mc_sig_time'] = time();
		$params['mc_sig_expires'] = 60*60*5+time();
		$params['mc_sig_session_key'] = $app_info_a['session_key'];
		$params['mc_sig_profile'] = $user_id;
		foreach($params as $key=>$val)
			{
				$post_params[] .= $key.'='.urlencode($val);
			}
		$post_params['mc_sig'] = 'mc_sig='.gen_sig($post_params, $app_info_a['secret_key']);
		$post = implode("&", $post_params);
		$getData = getRequest("http://".$app_info_a['callback_url'].'/'.$url, $post);
		loadPage($getData);
	}else{
		$getData = '<div class="error"><b>Error: Application doesnt exist</b></div>';
		loadPage($getData);
	}
switch($get_tag)
	{
		case 'create':
		((get_create_app_page()) ? die(require_once('html/create_app.php')) : NULL);
		
		break;
		case 'edit':
		get_edit_my_app_page();
		break;
		case 'view':
		get_show_my_apps_page();
		break;
		case 'upload':
		get_upload_page();
		break;
		case 'add':
		get_add_page();
		break;
		case 'remove':
		get_remove_page();
		break;
		default:
		get_app_content($app_info_a['canvas_page_url']);
		break;
	}
?>

