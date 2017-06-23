<?php
/* application lib */
$isTextFunc_a = array();
function edit_app()
	{
	
	}

function loadPage($getData)
	{
		global $sub_a;
		global $user_id;
		global $style;
		$valid = true;
		global $mc_content;
		global $errors_list;
		global $indent;
		global $valid_html_elements_a;
		global $___mcText;
		$string = "<?xml version='1.0' standalone='yes'?><!DOCTYPE chapter><div class='app_content_1'>";
		$string .= balanceTags(stripslashes(antixss(eregi_replace('mc\:', 'mc_', $getData))));
		$stringx = stripslashes($getData);
		$string .= "</div>";
		//$string = eregi_replace('mc\:', 'mc_', $string);
		$newstring=utf8_encode($string); // it's important!
		
		if(!$domDocument = domxml_open_mem($newstring,DOMXML_LOAD_RECOVERING, $error)) {
		   echo "Couldn't load a code";   
		}else{
			$errors_list = error($error);
			$rootDomNode = $domDocument->document_element();
			$x=0;
			printElements($rootDomNode, $x);
		}
	}
//call text function
function isTextFunction($function_name)
	{
		global $isTextFunc_a;
		$text_func_list = array('mc_action', 'mc_header', 'mc_warning_message', 'mc_explaination', 'mc_error_message');
		if(in_array($function_name, $text_func_list))
			{
				array_push($isTextFunc_a, $function_name);
				return true;
			}else{
				return false;
			}
	}
//call sub functions
function isSubFunction($sub_function_name)
	{
		$sub_func_list = array('mc_dashboard', 'mc_tabs', 'mc_warning_message', 'mc_error_message', 'mc_explaination', 'mc_header', 'mc_action', 'mc_editor', 'mc_editor_buttonset', 'mc_editor_custom', 'mc_editor_textarea');
		if(in_array($sub_function_name, $sub_func_list))
			{
				return true;
			}else{
				return false;
			}
	}
function callSubFunction($sub_function_name, $arg)
	{
		switch($sub_function_name)
			{
				case 'mc_editor_textarea':
				return get_editor_textarea($arg);
				break;
				case 'mc_action':
				get_dashboard_action($arg);
				break;;
				case 'mc_help':
				//get_dashboard_help($arg);
				break;
				case 'mc_tabitem':
				get_tabItem($arg);
				break;
				case 'mc_error_message':
				return get_error_message($arg);
				break;
				case 'mc_warning_message':
				return get_warning_message($arg);
				break;
				case 'mc_explaination':
				return get_explaination($arg);
				break;
				case 'mc_header':
				return get_header($arg);
				break;
				case 'mc_editor_button':
				return get_editor_button($arg);
				break;
				case 'mc_editor_cancel':
				return get_editor_cancel($arg);
				break;
				case 'mc_editor_custom':
				return 	get_editor_custom($arg);
				break;
				case 'mc_editor_date':
				return get_editor_date($arg);
				break;
				case 'mc_editor_divider':
				return get_editor_divider($arg);
				break;
				case 'mc_editor_month':
				return get_editor_month($arg);
				break;
				case 'mc_editor_text':
				return get_editor_text($arg);
				break;
				case 'mc_editor_time':
				return get_editor_time($arg);
				break;
				case 'mc_editor_buttonset':
				return get_editor_buttonset($arg);
				break;
			}
	}
function callFunction($function_name,$arg) //MCMU
	{
		switch($function_name)
			{
				
				case 'mc_display_name': //name
				return get_display_name($arg);
				break;
				case 'mc_friends': //friends
				return get_friends($arg);
				break;
				case 'mc_app_friends':
				return get_app_friends($arg);
				break;
				case 'mc_default_photo': //pronouce she or he
				return get_pro_photo($arg);
				break;
				case 'mc_google_analytics': //google analytics
				return get_google_analytics($arg);
				break;
				case 'is_friend': //is friend
				return '[mc_is_friend]';
				break;
				case 'mc_redirect': //redirect
				return get_redirect($arg);
				break;
				/* visiblitlies */
				case 'mc_visible_to_owner':
				return mc_visible_owner($arg);
				break;
				case 'mc_visible_to_friends':
				return mc_visible_friends($arg);
				break;
				case 'mc_visible_to_users':
				return mc_visible_users($arg);
				break;
				case 'mc_iframe':
				return get_iframe($arg);
				break;
				case 'mc_photo':
				return get_photo($arg);
				break;
				case 'mc_swf':
				return get_swf($arg);
				break;
				case 'mc_flv':
				return get_flv($arg);
				break;
				case 'mc_dashboard':
				return set_dashboard();
				break;
				case 'mc_tabs':
				return set_tabs($arg);
				break;
				case 'dialog';
				break;
				case 'mc_editor';
				return set_editor($arg);
				break;
				case 'time';
				break;
				case 'friend-selector';
				break;
				case 'mc_grouplink';
				return get_group_link($arg);
				break;
				case 'mc_userlink';
				return get_user_link($arg);
				break;
				default:
				//return $function_name.' is not valid.';
				break;
				/* editor module */
			}
	}

function get_app_content()
	{
		global $mc_content;
		global $user_id;
		global $app_info_a;
		global $mc_header;
		global $tab_items_list;
		global $dashboard;
		if($app_info_a['canvas_page_url'] == '')
			{
				die(require_once('html/app_welcome.php'));
			}else{
				if($app_info_a['api_key'] == '')
					{
						//$mc_content = '<div class="warning">This "'.$app_info_a['app_name'].'" application page has not been existed.</div>';
					}
				die(require_once('html/app_content.php'));
			}
	}
	

?>