<?php
//COOKE 2.0
$ip_address = $_SERVER['REMOTE_ADDR'];
$time = time();
$member_access_level = NULL;
$user_id = NULL;
if(!is_object($memcache))
	{
		$memcache = new Memcache;
		$memcache->connect('192.168.0.3', 11211);
	}
//CHECK IF COOKIE IS ALREADY WRITTEN
if(!empty($HTTP_COOKIE_VARS["MYCRIB_MEMBER_ID"]) && !empty($HTTP_COOKIE_VARS["MYCRIB_MEMBER_ADDRESS"]))
	{
		//SET VARIABLES
		$cookie_member_id = $HTTP_COOKIE_VARS["MYCRIB_MEMBER_ID"];
		$cookie_member_address = $HTTP_COOKIE_VARS["MYCRIB_MEMBER_ADDRESS"];
		$server_id = $_SERVER['HTTP_HOST'];
		$referer = $_SERVER['HTTP_REFERER'];
		$cookie_data = explode(',.,',$memcache->get(md5($cookie_member_address)));
		$cookie_update = $time-2592000;
		if($cookie_update > $cookie_data[0])
			{ //$TIME.',.,'.$user_id.',.,'.$ACCESS_LEVEL.',.,'.$security_id.',.,',
				$msg = 'updated';
				$data = $time.',.,'.$cookie_data[1].',.,'.$cookie_data[2].',.,'.$cookie_data[3].',.,';
				$memcache->replace(md5($cookie_member_address), $data, false, 0);
			}
		if($cookie_data[1])
			{
				$user_id = $cookie_data[1];
				$admin_access = $cookie_data[2];
				$security_id = $cookie_data[3];
			}	
		if($cookie_data[1])
			{
				if($data = $memcache->get(md5($ip_address)))
					{
						$country_code = $data;
					}else{
						$ip_number = Dot2LongIP($ip_address);
						$ip_number_a = $ip_number-10000;
						$ip_number_b = $ip_number+10000;
						$result = query("select COUNTRY_CODE from ipdata where $ip_number_a < ip_from and ip_from < $ip_number_b and ip_to > $ip_number" , 1, __LINE__, __FILE__);
						$get_data = mysql_fetch_assoc($result);
						$country_code = $get_data['COUNTRY_CODE'];
						$memcache->set(md5($ip_address), $country_code, false, 2592000);
					}
			}else{
				$result = query("SELECT MEMBER_ID, ACCESS_LEVEL, SECURITY_ID FROM MEMBER_ONLINE WHERE SESSION_ID = '$cookie_member_id';", 1, __LINE__, __FILE__);
				$get_data = mysql_fetch_assoc($result);
				$user_id = $get_data['MEMBER_ID'];
				$admin_access = $get_data['ACCESS_LEVEL'];
				$security_id = $get_data['SECURITY_ID'];
			}
				$result = query("UPDATE MEMBER_ONLINE SET PAGE_VIEW_TOTAL = (PAGE_VIEW_TOTAL+1), MEMBER_STATUS = 1, `TIME` = $time WHERE SESSION_ID = '$cookie_member_id';", 1, __LINE__, __FILE__);
				if($admin_access == 2)
					{
						$result = query("SELECT BOOKMARK_ACCESS, GAME_TOOLS_ACCESS, REPORT_LIST_ACCESS, BULLETIN_ACCESS, FRIEND_COMMENT_ACCESS, SUSPEND_ACCESS, TERMINATE_ACCESS, ACCOUNT_CHANGE_ACCESS, ANNOUCEMENT_ACCESS, ADMIN_CHANGE_ACCESS, FAQ_ACCESS, COMMUNITY_ACCESS, STORY_PROMOTION_ACCESS, BANDS_ACCESS, MAIL_ACCESS, FAKERSBUSTED_ACCESS, JIGSAW_ACCESS, GROUP_ACCESS, PROFILE_ACCESS, LIGHT_ACCESS, SCHOOL_ACCESS FROM ADMIN_PRIV WHERE MEMBER_ID = '$user_id';" , 1, __LINE__, __FILE__);
						$get_data = mysql_fetch_assoc($result);
						//PERMISSIONS
						$BOOKMARK_TOOLS_ACCESS = $get_data['BOOKMARK_ACCESS'];
						$GAME_TOOLS_ACCESS = $get_data['GAME_TOOLS_ACCESS'];
						$PROFILE_ACCESS = $get_data['PROFILE_ACCESS'];
						$REPORT_LIST_ACCESS = $get_data['REPORT_LIST_ACCESS'];
						$BULLETIN_ACCESS = $get_data['BULLETIN_ACCESS'];
						$FRIEND_COMMENT_ACCESS = $get_data['FRIEND_COMMENT_ACCESS'];
						$SUSPEND_ACCESS = $get_data['SUSPEND_ACCESS'];
						$TERMINATE_ACCESS = $get_data['TERMINATE_ACCESS'];
						$ACCOUNT_CHANGE_ACCESS = $get_data['ACCOUNT_CHANGE_ACCESS'];
						$ANNOUCEMENT_ACCESS = $get_data['ANNOUCEMENT_ACCESS'];
						$ADMIN_CHANGE_ACCESS = $get_data['ADMIN_CHANGE_ACCESS'];
						$FAQ_ACCESS = $get_data['FAQ_ACCESS'];
						$COMMUNITY_ACCESS = $get_data['COMMUNITY_ACCESS'];
						$BANDS_ACCESS = $get_data['BANDS_ACCESS'];
						$MAIL_ACCESS = $get_data['MAIL_ACCESS'];
						$FAKERSBUSTED_ACCESS = $get_data['FAKERSBUSTED_ACCESS'];
						$GROUP_ACCESS = $get_data['GROUP_ACCESS'];
						$JIGSAW_ACCESS = $get_data['JIGSAW_ACCESS'];
						$LIGHT_ACCESS = $get_data['LIGHT_ACCESS'];
						$SCHOOL_ACCESS = $get_data['SCHOOL_ACCESS'];
						$admin_permission = array("GAME_TOOLS_ACCESS"=>"$GAME_TOOLS_ACCESS", 
						"PROFILE_ACCESS"=>"$PROFILE_ACCESS",
						"REPORT_LIST_ACCESS"=>"$REPORT_LIST_ACCESS",
						"BULLETIN_ACCESS"=>"$BULLETIN_ACCESS",
						"FRIEND_COMMENT_ACCESS"=>"$FRIEND_COMMENT_ACCESS",
						"SUSPEND_ACCESS"=>"$SUSPEND_ACCESS",
						"TERMINATE_ACCESS"=>"$TERMINATE_ACCESS",
						"ACCOUNT_CHANGE_ACCESS"=>"$ACCOUNT_CHANGE_ACCESS",
						"ANNOUCEMENT_ACCESS"=>"$ANNOUCEMENT_ACCESS",
						"ADMIN_CHANGE_ACCESS"=>"$ADMIN_CHANGE_ACCESS",
						"FAQ_ACCESS"=>"$FAQ_ACCESS",
						"COMMUNITY_ACCESS"=>"$COMMUNITY_ACCESS",
						"BANDS_ACCESS"=>"$BANDS_ACCESS",
						"MAIL_ACCESS"=>"$MAIL_ACCESS",
						"FAKERSBUSTED_ACCESS"=>"$FAKERSBUSTED_ACCESS",
						"JIGSAW_ACCESS"=>"$JIGSAW_ACCESS",
						"GROUP_ACCESS"=>"$GROUP_ACCESS",
						"LIGHT_ACCESS"=>"$LIGHT_ACCESS",
						"BOOKMARK_ACCESS"=>"$BOOKMARK_TOOLS_ACCESS",
						"SCHOOL_ACCESS"=>"$SCHOOL_ACCESS");
					}
	}
function Dot2LongIP ($IPaddr)
	{
		if ($IPaddr == "") {
			return 0;
		} else {
			$ips = split ("\.", "$IPaddr");
			return ($ips[3] + $ips[2] * 256 + $ips[1] * 256 * 256 + $ips[0] * 256 * 256 * 256);
		}
	}

?>