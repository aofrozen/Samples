<?php
/* cache application */
function insert_cache($function_name, $key, $value)
	{
		global $query_data_cache_a;
		//ex: $query_data_cache_a['display_name'][1];
		$query_data_cache_a[$function_name][$key] = $value;
	}
function fetch_cache($function_name, $key)
	{
		global $query_data_cache_a;
		if(!empty($query_data_cache_a[$function_name][$key]))
			{
				return $query_data_cache_a[$function_name][$key];
			}else{
				return false;
			}
	}
/*
template cache structure
if there is first time for app then download data from server. second time it will use cache until submit.
*/
function get_content_cache()
	{
		//options
		/*
		a. all users
		b. every user
		*/
		if($canvas == true)
			{
				$result = query("select content_data from app_content_cache where api_key = '$api_key' and user_id = '$uid';");
			}else{
				$result = query("select content_data from app_content_cache where api_key = '$api_key' and file = '$file';");
				
			}
		$get_data = mysql_fetch_assoc($result);
		return $get_data['content_data'];
	}
function set_content_cache()
	{
		if($canvas == true)
			{
				$result = query("select id from app_content_cache where api_key = '$api_key' and user_id = '$uid';");
				$get_data = mysql_fetch_assoc($result);
				if($get_data['id'])
					{
						$result = query("update app_content_cache set content_data where api_key = '$api_key' and user_id = '$uid';");
					}else{
						$result = query("insert into app_content_cache(`api_key`, `content_data`, `user_id`) values('$api_key', '$content_data', '$uid');");
					}
			}else{
				$result = query("select id from app_content_cache where api_key = '$api_key' and file = '$file';");
				$get_data = mysql_fetch_assoc($result);
				if($get_data['id'])
					{
						$result = query("update app_content_cache set content_data where api_key = '$api_key' and file = '$file';");
					}else{
						$result = query("insert into app_content_cache(`api_key`, `content_data`, `file`) values('$api_key', '$content_data', '$file');");
					}
			}
	}
?>