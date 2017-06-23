<?php
/* api 1.0 */
function call_method($get_method)
	{
		global $avg;
		switch($get_method)
			{
				case 'mycrib.user.getDefaultPhoto':
				echo get_api_default_photo($avg);
				break;
				case 'mycrib.user.getDisplayName':
				echo get_api_display_name($avg);
				break;
				case 'mycrib.friend.get':
				echo get_api_friend($avg);
				break;
				case 'mycrib.friend.areFriends': //important
				echo get_api_friend_are_friends($avg);
				break;
				case 'mycrib.friend.getAppUsers':
				echo get_api_friend_app_users($avg);
				break;
				case 'mycrib.friend.getLists':
				echo get_api_friend_lists($avg);
				break;
				case 'mycrib.video.get':
				echo get_api_video($avg);
				break;
				case 'mycrib.photo.get':
				echo get_api_photo($avg);
				break;
				case 'mycrib.photo.albums.get':
				echo get_api_photo_albums($avg);
				break;
				case 'mycrib.group.get':
				echo get_api_group($avg);
				break;
				case 'mycrib.notification.get':
				echo get_user_notification($avg);
				//echo '<mc_notifications><error>Not available notifications feature</error></mc_notifications>';
				break;
				case 'mycrib.user.get':
				echo get_api_get_user($avg);
				break;
				case 'mycrib.profile.get':
				echo '<mc_profile><error>Not available profile feature</error></mc_profile>';
				break;
				case 'mycrib.user.setStatus':
				echo '<mc_user><error>Not available status</error><status></status></mc_user>';
				break;
				case 'mycrib.user.getInfo':
				echo get_api_user_getInfo($avg);
				break;
				case 'mycrib.user.isAppAdded': //done
				echo get_api_isAppAdded($avg);
				break;
				case 'mycrib.update.publish':
				echo '<mc_update><error>Not available update feature</error></mc_update>';
				break;
				case 'mycrib.journal.get':
				echo '<mc_journal><error>Not available journal feature</error><mc_journal>';
				break;
				default:
				echo '<mc_api></mc_api>';
				break;
			}
	}
function xml_version()
	{
		return '<?xml version="1.0" encoding="UTF-8"?>';
	}
function get_user_notification($params)
	{
		global $api_key;
		global $session_key;
		global $secret_key;
		global $MyCribAPIErrorCodes;
		global $app_user_id;
		$xml = xml_version();
		$status = get_api_info($params);
		$xml .= '<notifications_get_response>';
		if($status)
			{
				$xml .= $status;
			}else{
				$result = query("select mail, friend_comment, picture_comment, mail, friend_request, whiteboard, journal_comment from notification where member_id = '$app_user_id';");
				$get_data = mysql_fetch_assoc($result);
				$xml .= '<message>'.$get_data['mail'].'</message>';
				$xml .= '<friend_requests>'.$get_data['friend_request'].'</friend_requests>';
				$xml .= '<photo_comments>'.$get_data['picture_comment'].'</photo_comments>';
				$xml .= '<whiteboard>'.$get_data['whiteboard'].'</whiteboard>';
				$xml .= '<journal_comments>'.$get_data['journal_comment'].'</journal_comments>';
				$xml .= '<friend_comments>'.$get_data['friend_comment'].'</friend_comments>';
				$xml .= '<uid>'.$app_user_id.'</uid>';
			}
				$xml .= '</notifications_get_response>';
		return $xml;
	}
function current_url()
	{
		return 'http://mycrib.net';
	}

function get_api_get_user($params)
	{
		global $api_key;
		global $session_key;
		global $secret_key;
		global $MyCribAPIErrorCodes;
		$xml = xml_version();
		$status = get_api_info($params);
		$user_id = $params['uid'];
		$user_id_as = $params['uid_a'];
		$xml .= '<get_user_response>';
		if($status)
			{
				$xml .= $status;
			}else{
				if($user_id_as)
					{
						$user_id_a = array_unique(
explode(',', $user_id_as));
						$total = count($user_id_a);
						$user_list = '\''.$user_id_a[0].'\'';
						foreach($user_id_a as $key=>$val)
							{
								if($val)
									{
										$user_list .= ',\''.$val.'\'';
									}
							}
						$result = query("select member_id, image_default, nickname from members where member_id in($user_list);");
					}else{
						$result = query("select member_id, image_default, nickname from members where member_id = '$user_id'");
					}
				
				while($get_data = mysql_fetch_assoc($result))
					{
						$xml .= '<owner>'.$get_data['member_id'].'</owner>';
						$xml .= '<default_photo>'.eregi_replace('p1\.', 'cache2.', $get_data['image_default']).'</default_photo>';
						$xml .= '<display_name>'.urlencode(eregi_replace('p1\.', 'cache2.', $get_data['nickname'])).'</display_name>';
					}
			}
		$xml .= '</get_user_response>';
		return $xml;
	}

function get_api_default_photo($params)
	{
		global $api_key;
		global $session_key;
		global $secret_key;
		global $MyCribAPIErrorCodes;
		$xml = xml_version();
		$status = get_api_info($params);
		$user_id = $params['uid'];
		$user_id_as = $params['uid_a'];
		$xml .= '<user_getDefaultPhoto_response>';
		if($status)
			{
				$xml .= $status;
			}else{
				if($user_id_as)
					{
						$user_id_a = array_unique(
explode(',', $user_id_as));
						$total = count($user_id_a);
						$user_list = '\''.$user_id_a[0].'\'';
						foreach($user_id_a as $key=>$val)
							{
								if($val)
									{
										$user_list .= ',\''.$val.'\'';
									}
							}
						$result = query("select member_id, image_default from members where member_id in($user_list);");
					}else{
						$result = query("select member_id, image_default from members where member_id = '$user_id'");
					}
				
				while($get_data = mysql_fetch_assoc($result))
					{
						$xml .= '<owner>'.$get_data['member_id'].'</owner>';
						$xml .= '<default_photo>'.eregi_replace('p1\.', 'cache2.', $get_data['image_default']).'</default_photo>';
					}
			}
		$xml .= '</user_getDefaultPhoto_response>';
		return $xml;
	}
function get_api_display_name($params)
	{
		global $api_key;
		global $session_key;
		global $secret_key;
		global $MyCribAPIErrorCodes;
		$xml = xml_version();
		$user_id = $params['uid'];
		$xml .= '<user_getDisplayName_response>';
		$user_id = $params['uid'];
		$user_id_as = $params['uid_a'];
		$status = get_api_info($params);
		if($status)
			{
				$xml .= $status;
			}else{
				if($user_id_as)
					{
						$user_id_a = array_unique(explode(',', $user_id_as));
						$total = count($user_id_a);
						$user_list = '\''.$user_id_a[0].'\'';
						for($x=0;$x<$total;$x++)
							{
								$user_list .= ',\''.$user_id_a[$x].'\'';
							}
						$result = query("select member_id, nickname from members where member_id in($user_list);");
					}else{
						$result = query("select member_id, nickname from members where member_id = '$user_id'");
					}
				
				while($get_data = mysql_fetch_assoc($result))
					{
						$xml .= '<owner>'.$get_data['member_id'].'</owner>';
						$xml .= '<display_name>'.urlencode($get_data['nickname']).'</display_name>';
					}
			}
		$xml .= '</user_getDisplayName_response>';
		return $xml;
	}
function get_api_photo($params)
	{
		global $api_key;
		global $session_key;
		global $secret_key;
		global $MyCribAPIErrorCodes;
		$xml = xml_version();
		$user_id = $params['uid'];
		$xml .= '<photo_response>';
		$__ee = createTableServer($user_id, array('image_blog_id'));
		$status = get_api_info($params);
		//verify_signature($params);
		$user_id = $params['uid'];
		if($status)
			{
				$xml .= $status;
			}else{
				$result = query("select id, member_id, picture_comment, date from ".$__ee['image_blog_id'][$user_id]." where member_id = '$user_id'");
				while($get_data = mysql_fetch_assoc($result))
					{
						$xml .= '<pid>'.$get_data['id'].'</pid>';
						$xml .= '<owner>'.$get_data['member_id'].'</owner>';
						$xml .= '<photo>'.$photo.'</photo>';
						$xml .= '<thumbnail>'.$thumb_photo.'</thumbnail>';
						$xml .= '<link>'.urlencode('http://mycrib.net/?pageid=mycrib.member.profile.image.view&image_id='.$get_data['id'].'&id='.$get_data['member_id']).'</link>';
						$xml .= '<caption>'.urlencode($get_data['picture_comment']).'</caption>';
						$xml .= '<created>'.$get_data['date'].'</created>';
					}
			}
		$xml .= '</photo_response>';
		return $xml;
	}
function get_api_friend($params)
	{
		global $api_key;
		global $session_key;
		global $secret_key;
		global $MyCribAPIErrorCodes;
		$xml = xml_version();
		$user_id = $params['user_id'];
		$__ee = createTableServer($user_id, array('friend_network_id'));
		$xml .= '<mc_friend>';
		$result = query('SELECT ADDRESS FROM MG_FRIEND_'.$__ee['friend_network_id'][$user_id].' WHERE MEMBER_ID = "'.$user_id.'"');
		$get_data = mysql_fetch_assoc($RESULT);
		$address = explode(',', $get_data['ADDRESS']);
		$result = query('select * from friend_network_'.$address[2].' where friend_member_id = "'.$user_id.'"');
		$status = get_api_info($params);
		//verify_signature($params);
		$user_id = $params['uid'];
		if($status)
			{
				$xml .= $status;
			}else{
				while($get_data = mysql_fetch_assoc($result))
					{
						$uid = $get_data['friend_id']; //check if it is correct
						$xml .= '<fid>'.$uid.'</fid>';
					}
			}
		$xml .= '</mc_friend>';
		return $xml;
	}
function get_api_friend_are_friends($params)
	{
		global $api_key;
		global $session_key;
		global $secret_key;
		global $MyCribAPIErrorCodes;
		$xml = xml_version();
		//verify_signature($params);
		$user_id = $params['uid1'];
		$friend_id = $params['uid2'];
		$__ee = createTableServer($user_id, array('friend_network_id'));
		$xml .= '<friend_areFriends_response>';
		$result = query('SELECT ADDRESS FROM '.$__ee['friend_network_id'][$user_id].' WHERE MEMBER_ID = "'.$user_id.'"');
		$get_data = mysql_fetch_assoc($result);
		$address = explode(',', $get_data['ADDRESS']);
		$result = query('select friend_friend_id from friend_network_'.$address[3].' where friend_member_id = "'.$user_id.'" and friend_friend_id = "'.$friend_id.'"');
		$get_data = mysql_fetch_assoc($result);
		$status = get_api_info($params);
		if($status)
			{
				$xml .= $status;
			}else{
				if($get_data['friend_friend_id'] == $friend_id)
					{
						$friend_status = 1;
					}else{
						$friend_status = 0;
					}
				if($status && $user_id != 1)
					{
						$xml .= $status;
					}else{
						$xml .= '<uid1>'.$user_id.'</uid1>';
						$xml .= '<uid2>'.$friend_id.'</uid2>';
						$xml .= '<are_friends>'.$friend_status.'</are_friends>';
					}
			}
		$xml .= '</friend_areFriends_response>';
		return $xml;
	}
function get_api_video($params)
	{
		global $api_key;
		global $session_key;
		global $secret_key;
		global $MyCribAPIErrorCodes;
		$xml = xml_version();
		$xml .= "\n<mc_video>";
		$status = get_api_info($params);
		//verify_signature($params);
		$user_id = $params['uid'];
		if($status && $user_id != 1)
			{
				$xml .= $status;
			}else{
				$result = query("select member_id, id, video_address, video_file, date, video_comment from video_blog where member_id = '$user_id';");
				while($get_data = mysql_fetch_assoc($result))
					{
						$owner_id = $get_data['member_id'];
						$link = $get_data['id'];
						$id = $get_data['id'];
						$created = $get_data['date'];
						$caption = $get_data['video_comment'];
						$link = 'http://mycrib.net/?pageid=mycrib.member.profile.video.view&video_id='.$id.'&id='+$owner_id;
						$xml .= "\n<item>";
						$xml .= "\n	<vid>".$id."</vid>"; //video id
						$xml .= "\n	<owner>".$owner_id."</owner>";
						$xml .= "\n	<link>".$link."</link>";
						$xml .= "\n	<thumbnail>".$thumbnail."</thumbnail>";
						$xml .= "\n	<caption>".urlencode($caption)."</caption>";
						$xml .= "\n	<created>".$created."</created>";
						$xml .= "\n</item>";
					}
			}
		$xml .= "\n</mc_video>";
		return $xml;
	}
function get_mysql_error()
	{
		
	}
function get_api_isAppAdded($params)
	{
		global $api_key;
		global $session_key;
		global $secret_key;
		global $MyCribAPIErrorCodes;
		global $app_user_id;
		$xml = xml_version();
		$status = get_api_info($params);
		$xml .= "\n<user_isAppAdded_response>";
		if($status && $user_id != 1 && $status != '<error>Unauthorized application</error>')
			{
				$xml .= $status;
			}else{
				if($status != '<error>Unauthorized application</error>')
					{
						$xml .= '1';
					}else{
						$xml .= '0';
					}
			}
		$xml .= "\n</user_isAppAdded_response>";
		return $xml;
	}
function create_api_album($params)
	{
		
	}
function upload_api_photo($params)
	{
		
	}
function get_api_photo_albums($params)
	{
		global $api_key;
		global $session_key;
		global $secret_key;
		global $MyCribAPIErrorCodes;
		$xml = xml_version();
		$user_id = $params['uid'];
		$result = query("select id, album_name, default_image, photo_total from albums where member_id = '$user_id';");
		$xml .= '<mc_photo_albums>';
		$status = get_api_info($params);
		//verify_signature($params);
		$user_id = $params['uid'];
		if($status)
			{
				$xml .= $status;
			}else{
				while($get_data = mysql_fetch_assoc($result))
					{
						$xml .= '<aid>'.$get_data['id'].'</aid>'; //album id
						$xml .= '<owner>'.$get_data['member_id'].'</owner>';
						$xml .= '<thumbnail>'.$get_data['default_image'].'</thumbnail>';
						$xml .= '<caption>'.$get_data['album_name'].'</caption>';
					}
			}
		$xml .= '</mc_photo_albums>';
		return $xml;
	}
function get_api_group($params)
	{
		global $api_key;
		global $session_key;
		global $secret_key;
		global $MyCribAPIErrorCodes;
		$xml = xml_version();
		$gid = $params['gid'];
		$user_id = $params['uid'];
		$filter = (!empty($params['filter']) ? $params['filter'] : 'owner');
		if($filter == 'group')
			{
				$result = query("select id, owner_id, group_picture_default, short_descr, group_create_date from group_accounts where id = '$gid'");
			}elseif($filter == 'owner'){
				$result = query("select id, owner_id, group_picture_default, short_descr, group_create_date from group_accounts where owner_id = '$uid'");
			}
		$xml .= '<mc_group>';
		$status = get_api_info($params);
		//verify_signature($params);
		$user_id = $params['uid'];
		if($status)
			{
				$xml .= $status;
			}else{
				while($get_data = mysql_fetch_assoc($result))
					{
						$xml .= '<gid>'.$params['id'].'</gid>'; //album id
						$xml .= '<owner>'.$params['owner_id'].'</owner>';
						$xml .= '<link>'.get_current_url().'/?pageid=mycrib.group.page&groupid='.$get_data['id'].'</link>';
						$xml .= '<thumbnail>'.$params['group_picture_default'].'</thumbnail>';
						$xml .= '<description>'.$params['short_descr'].'</description>';
						$xml .= '<created>'.$params['group_create_date'].'</created>';
					}
			}
		$xml .= '</mc_group>';
		return $xml;
	}
function get_api_user_getInfo($params)
	{
		global $api_key;
		global $session_key;
		global $secret_key;
		global $MyCribAPIErrorCodes;
		$xml = xml_version();
		$__ee = createTableServer($user_id, array('profile_id'));
		$xml .= '<mc_user>';
		$status = get_api_info($params);
		//verify_signature($params);
		$user_id = $params['uid'];
		$table_as = $params['table'];
		if($status)
			{
				$xml .= $status;
			}else{
				while($get_data = mysql_fetch_assoc($result))
					{
						$uid = $get_data['friend_id']; //check if it is correct
						$xml .= '<owner>'.$link.'</owner>';
						$xml .= '<link>'.$thumbnail.'</link>';
						$xml .= '<thumbnail>'.$g_thumbnail.'</thumbnail>';
						$xml .= '<description>'.$caption.'</description>';
						$xml .= '<created>'.$caption.'</created>';
					}
				$xml .= '</mc_user>';
			}
		return $xml;
	}
function get_api_info($params)
	{
		global $api_key;
		global $session_key;
		global $secret_key;
		global $MyCribAPIErrorCodes;
		global $user_id;
		global $app_user_id;
		global $crack_sig;
		$api_key = $params['api_key'];
		$session_key = $params['session_key'];
		$result = query("select secret_key from app where api_key = '$api_key'");
		$get_data = mysql_fetch_assoc($result);
		$secret_key = $get_data['secret_key'];
		$result = query("select user_id, session_key, id from app_clients where api_key = '$api_key' and session_key='$session_key'");
		$get_data = mysql_fetch_assoc($result);
		$session_status = $get_data['session_key'];
		$app_status = $get_data['id'];
		$app_user_id = $get_data['user_id'];
		
		if(!$session_status && empty($user_id))
			{
				return '<error>'.$MyCribAPIErrorCodes['MC_API_EC_PARAM_SESSION_KEY'].'</error>';
			}
		if(!$secret_key)
			{
				return '<error>'.$MyCribAPIErrorCodes['MC_API_EC_KEY'].'</error>';
			}
		if(empty($app_status))
			{
				return '<error>'.$MyCribAPIErrorCodes['MC_API_EC_APP'].'</error>';
			}
		$data = (count($_POST)>0) ? $_POST : $_GET;
		if(get_valid_mc_params($data, null, $secret_key))
			{
				return '<error>'.$MyCribAPIErrorCodes['MC_API_EC_SIG'].'</error><crack_sig>'.$crack_sig.'</crack_sig>';
			}
		
	}
function no_magic_quotes($val)
	{
		if(get_magic_quotes_gpc())
			{
				return stripslashes($val);
			}else{
				return $val;
			}
	}
function get_valid_mc_params($params, $expired=null, $secret_key)
	{
		$mc_params = array();
		
		foreach ($params as $name => $val) {
			if($name != 'sig')
				{
					$mc_params[$name] = no_magic_quotes($val);
				}else{
					$sig = no_magic_quotes($val);
				}
		}
		if (!isset($sig) || !verify_signature($mc_params, $sig)) {
		  return true;
		}
		return false;
	}
function gen_sig($params_a, $secret) 
	{
		global $crack_sig;
		$str = '';
		ksort($params_a);
		foreach ($params_a as $k=>$v) 
			{
				$str .= "$k=$v";
			}
		$crack_sig = md5($str.$secret);
		return md5($str.$secret);
	}
function verify_signature($params, $sig)
	{
		global $secret_key;
		return gen_sig($params, $secret_key) == $sig;
	}
/* MQL */
$MyCribAPIErrorCodes = array(
'MC_API_EC_KEY' => 'Invalid API key',
'MC_API_EC_METHOD' => 'Unknown method',
'MC_API_EC_TOO_MANY_CALLS' => 'Application request limit reached',
'MC_API_EC_BAD_IP' => 'Unauthorized source IP address',
'MC_API_EC_PARAM_SESSION_KEY' => 'Session key invalid or no longer valid',
'MC_API_EC_PARAM' => 'Invalid parameter',
'MC_API_EC_PARAM_CALL_ID' => 'Call_id must be greater than previous',
'MC_API_EC_PARAM_USER_ID' => 'Invalid user id',
'MC_API_EC_PERMISSION' => 'Permissions Error',
'MC_API_EC_PERMISSION_USER' => 'User not visible',
'MC_API_EC_PERMISSION_ALBUM' => 'Album not visible',
'MC_API_EC_PERMISSION_PHOTO' => 'Photo not visible',
'MC_API_EC_PERMISSION_VIDEO' => 'Video not visible',
'MC_MQL_EC_PARSER' => 'MQL: Parser Error',
'MC_MQL_EC_UNKNOWN_FIELD' => 'MQL: Unknown Field',
'MC_MQL_EC_UNKNOWN_TABLE' => 'MQL: Unknown Table',
'MC_MQL_EC_UNKNOWN_FUNCTION' => 'MQL: Unknown Function',
'MC_MQL_EC_PARAM' => 'MQL: Invalid parameter passed in',
'MC_API_EC_INVALID_OPERATION' => 'Invalid Operation',
'MC_API_EC_QUOTA_EXCEEDED' => 'Data store allowable quota was exceeded',
'MC_API_EC_DATABASE' => 'A database error occured. Please try again',
'MC_API_EC_APP' => 'Unauthorized application',
'MC_API_EC_SIG' => 'Invalid SIG'
);
?>