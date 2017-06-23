<?php
/* application */
function create_app()
	{
		global $user_id;
		global $time;
		global $get_app_name;
		global $get_url;
		global $get_private;
		global $get_support;
		global $get_callback_url;
		global $get_canvas_page_url;
		global $get_tos_url;
		global $get_post_add_url;
		global $get_post_remove_url;
		global $get_description;
		global $get_privacy_url;
		global $get_help_url;
		global $get_icon;
		global $ip_address;
		global $get_recaptcha_response_field;
		global $get_recaptcha_challenge_field;
		global $privatekey;
		global $publickey;
		global $form_error_a;
		global $key;
		$resp = recaptcha_check_answer ($privatekey,
                                        $_SERVER["REMOTE_ADDR"],
                                        $_POST["recaptcha_challenge_field"],
                                        $_POST["recaptcha_response_field"]);
		 if (!$resp->is_valid)
				{
					die("Error: The text you entered doesn't match the security image you saw. Please try it again. [$SECURITY_IMAGE_ID]");
				}
		if($get_app_name && $get_description)
			{
				//key
				
				$api_key_raw = $user_id.'-'.$time.'-'.rand(0,999).'-'.$get_app_name;
				$api_key = md5($api_key_raw);
				$secret_key_raw = $user_id.'-'.$time.'-'.$key.'-'.rand(0,999);
				$secret_key = md5($pri_key_raw).'-'.md5($ip_address).'-'.$user_id;
				$session_key = md5($api_key.'-'.$key.'-'.$user_id.'-'.rand(0,999)).'-'.$user_id;
				$result = mysql_query("select id from app where canvas_page_url = '$get_canvas_page_url'");
				$get_data = mysql_fetch_assoc($result);
				if($get_data['id'])
					{
						$form_error_a['canvas_page_url'] = 1;
					}
				$result = mysql_query("select id from app_ban where url = '$get_url';");
				$get_data = mysql_fetch_assoc($result);
				if($get_data['id'])
					{
						$form_error_a['app_ban'] = 1;
					}
				if(count($form_error_a)<1)
					{
						$result = mysql_query("insert into 
app(`user_id`, `app_name`, `app_date`,  `api_key`, `secret_key`, `email_support`, `url`, `callback_url`, `canvas_page_url`, `tos_url`, `post_add_url`, `post_remove_url`, `description`, `privacy_url`, `help_url`, `icon`)  values('$user_id', '$get_app_name', '$time', '$api_key', '$secret_key', '$get_support', '$get_url', '$get_callback_url', '$get_canvas_page_url', '$get_tos_url', '$get_post_add_url', '$get_post_remove_url', '$get_description', '$get_privacy_url', '$get_help_url', '');") or die(mysql_error());
						$result = query("insert into app_clients(`user_id`, `session_key`, `api_key`, `created`) values('$user_id', '$session_key', '$api_key', '$time');");
						die(require_once('html/complete_app.php'));
					}else{
						die(require_once('html/create_app.php'));
					}
			}else{
				$this->get_create_app_page();
			}
		
		/*
		generate api_key and pri_key
		*/
	}
function get_create_app_page()
	{
		global $get_description;
		global $get_app_name;
		global $privatekey;
		global $publickey;
		if($get_app_name && $get_description)
			{
				//echo "True";
				create_app();
			}else{
				die(require_once('html/create_app.php'));
			}
	}

function get_form_errors()
	{
		global $form_error_a;
		if($form_error_a['canvas_page_url']==1)
			{
				echo '<div class="error"><b>Canvas page url has been already used.</b></div>';
			}
		if($form_error_a['app_ban']==1)
			{
				echo '<div class="error"><b>Owner site url has been disabled.</b></div>';
			}
	}
function get_edit_my_app_page()
	{
		global $user_id;
		global $get_api_key;
		global $user_id;
		global $time;
		global $get_app_name;
		global $get_url;
		global $get_private;
		global $get_support;
		global $get_callback_url;
		global $get_canvas_page_url;
		global $get_tos_url;
		global $get_post_add_url;
		global $get_post_remove_url;
		global $get_description;
		global $get_privacy_url;
		global $get_help_url;
		global $get_icon;
		global $get_update;
		$secret = 'salta501';
		$hash = md5($user_id.$secret.$api_key);
		if($get_hash != $hash && $update==1)
			{
				die("Error: you don't have permission to change application settings");
			}
		if($get_update==1)
			{
				$result = query("select id from app where canvas_page_url = '$get_canvas_page_url';");
				$get_data = mysql_fetch_assoc($result);
				if($get_data['id']>0)
					{
						$error = '';
					}else{
						$result = query("update app set app_name = '$get_app_name', email_support = '$get_email_support', url = '$get_url', callback_url = '$get_callback_url', canvas_page_url = '$get_canvas_page_url', tos_url = '$get_tos_url', post_add_url = '$get_post_add_url', post_remove_url = '$get_post_remove_url', description = '$get_description', privacy_url = '$get_privacy_url', help_url = '$get_help_url' where user_id = '$user_id' and api_key = '$get_api_key';");
					}
				$update = 1;
			}
		$result = query("select user_id, app_name, email_support, url, callback_url, canvas_page_url, tos_url, post_add_url, post_remove_url, description, privacy_url, help_url, icon from app where user_id = '$user_id' and api_key = '$get_api_key'");
		$get_data = mysql_fetch_assoc($result);
		$app_name = $get_data['app_name'];
		$email_support = $get_data['email_support'];
		$url = $get_data['url'];
		$callback_url = $get_data['callback_url'];
		$canvas_page_url = $get_data['canvas_page_url'];
		$tos_url = $get_data['tos_url'];
		$post_add_url = $get_data['post_add_url'];
		$post_remove_url = $get_data['post_remove_url'];
		$description = $get_data['description'];
		$privacy_url = $get_data['privacy_url'];
		$help_url = $get_data['help_url'];
		$icon = $get_data['icon'];
		
		die(include('html/app_edit.php'));
	}
function delete_app()
	{
		global $user_id;
		global $get_api_key;
		$result = query("delete from app where user_id = '$user_id' and api_key = '$get_api_key';");
		$result = query("delete from app_clients where api_key = '$get_api_key';");
	}
function get_show_my_apps_page()
	{
		global $user_id;
		global $get_delete;
		global $get_api_key;
		if($get_delete && $hash == $get_hash)
			{
				delete_app();
				$update='s1';
			}
		$result = query("select app_name, email_support, app_date, secret_key, api_key, callback_url, canvas_page_url from app where user_id = '$user_id';");
		
		while($get_data = mysql_fetch_assoc($result))
			{
				$secret_key = $get_data['secret_key'];
				$api_key = $get_data['api_key'];
				$app_name = $get_data['app_name'];
				$callback_url = $get_data['callback_url'];
				$email_support = $get_data['email_support'];
				$hash = md5($user_id.'salta501'.$api_key);
				$html .= '<table width="760" border="0" cellpadding="0" cellspacing="0" bgcolor="#FFFFFF" class="box" style="margin:5px; padding:10px;"><tr><td><div class="box_title">'.$app_name.'</div><div class="divider"></div><div class="dashboard"><a href="/?tag=edit&api_key='.$api_key.'">Edit Settings</a>  <a href="#" onClick="displayStaticMessage(\''.htmlentities('<form action="/index.php?tag=view" method="post"><div style="margin:10px;" align="center">Do you really want <b>'.$app_name.'</b> to be deleted?<br><br><input type="hidden" name="hash" value="'.$hash.'"><input type="hidden" name="api_key" value="'.$api_key.'"><input type="hidden" name="delete" value="1"><input type="submit" value="Yes" onClick="" class="login_button"><input type="button" class="login_button" value="No" onClick="closeMessage();"></div></form>').'\', \'Delete '.$app_name.'\', \'\');">Delete App</a> <a href="#">Submit Application</a></div><table width="730" border="0" cellspacing="0" cellpadding="0"><tr><td width="100"><table width="100%" border="0" cellspacing="5" cellpadding="0"><tr><td>About</td></tr><tr><td>API Key </td></tr><tr><td>Secret Key </td></tr><tr><td>Support Email</td></tr><tr><td>Callback URL </td></tr></table></td><td><table width="100%" border="0" cellspacing="5" cellpadding="0"><tr><td><a href="#">View About Page</a> | <a href="#">Edit About Page</a></td></tr><tr><td>'.$api_key.'</td></tr><tr><td>'.$secret_key.'</td></tr><tr><td>'.$email_support.'</td></tr><tr><td>'.$callback_url.'</td></tr></table></td><td width="250" valign="top"><p><br><br></p></td></tr></table></td></tr></table>';
			}
		die(require_once('html/app_view.php'));
	}
function get_add_page()
	{
		global $get_api_key;
		global $user_id;
		$hash = md5($get_api_key.'-salta501-'.$user_id);
		$result = query("select app_name, description, icon from app where api_key = '$get_api_key';");
		$get_data = mysql_fetch_assoc($result);
		$app_name = $get_data['app_name'];
		$description = $get_data['description'];
		$icon = $get_data['icon'];
		die(require_once('html/app_add.php'));
	}
function add_app()
	{
		global $get_api_key;
		global $get_profile_links;
		global $get_publish_updates;
		global $get_profile_box;
		global $get_email;
		global $get_attachment;
		global $user_id;
		global $time;
		global $key;
		global $get_hash;
		if($get_hash == md5($get_api_key.'-salta501-'.$user_id))
			{
				$session_key = md5($get_api_key.'-'.$key.'-'.$user_id.'-'.rand(0,999)).'-'.$user_id;
				$result = query("insert into app_clients(`user_id`, `created`, `session_key`, `api_key`, `profile_links`, `publish_updates`, `profile_box`, `email`, `attachment`, `forever_session`) values('$user_id', '$time', '$session_key', '$get_api_key', '$get_profile_links', '$get_publish_updates', '$get_profile_box', '$get_email', '$get_attachment', '$get_forever_session');");
				$result = query("update app set users = (users+1) where api_key = '$get_api_key';");
			}
	}
function remove_app()
	{
		global $get_api_key;
		global $user_id;
		$result = query("delete from app_clients where api_key = '$get_api_key' and user_id = '$user_id';");
		$result = query("update app set users = (users-1) where api_key = '$get_api_key';");
	}
function get_edit_apps_list()
	{
		global $user_id;
		$result = query("select app_name, icon from app_clients where user_id = '$user_id';");
		while($get_data = mysql_fetch_assoc($result))
			{
				$app_name = $get_data['app_name'];
				$icon = $get_data['icon'];
			}
	}
?>