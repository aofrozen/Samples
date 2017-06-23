<?php
/* data */
function callTableServer($uid, $table_name)
	{
		global $__ee;
		if($__ee[$table_name][$uid]['server'])
			{

			}
	}

function createTableServer($uid, $table_list_a)
	{
		global $__ee;
		$table_name_list = '';
		$table_list = count($table_list_a);
		$table_name_list = $table_list_a[0];
		for($x=1;$x<$table_list;$x++)
			{
				$table_name_list .= ','.$table_list_a[$x];
			}
		$result = query("select $table_name_list from profile_network where member_id = '$uid';");
		while($get_data = mysql_fetch_assoc($result))
			{
				/* need to ceate key and value */
				//$__ee[
				if(!$total)
					{
						$key_a = array_keys($get_data);
						$total = count($get_data);
					}
				for($x=0;$x<$total;$x++)
					{
						$data_a = explode(',', $get_data[$key_a[$x]]);
						$__ee[$key_a[$x]][$uid] = $data_a[2].'_'.$data_a[3];
					}
			}
		return $__ee;
	}
function get_user_info($user_condition_query)
	{
		global $nickname_a;
		global $image_default_a;
		$result = query("SELECT member_id, image_default, nickname FROM MEMBERS WHERE member_id IN($user_condition_query) AND member_lock != 1;");
		$nickname_a = array();
		$image_default_a = array();
		while($get_data = mysql_fetch_object($result))
			{
				$nickname_a[$get_data->member_id] = $get_data->nickname;
				$image_default_a[$get_data->member_id] = $get_data->image_default;
			}
	}
function prepare_user_info($user_id, $user_condition_query)
	{
		if(!eregi($user, $user_condition_query))
			{
				if($user_condition_query)
					{
						$user_condition_query .= ','.$user_id;
						return $user_condition_query;
					}else{
						$user_condition_query = NULL;
						$user_condition_query = $user_id;
						return $user_condition_query;
					}
			}
	}
function is_mobile($user_agent)
	{
		if(eregi('Hiptop', $user_agent))
			{
				return true;
			}
	}
function wrap($string = null, $width = 20)
	{
		return wordwrap($string, $width, '<br>', true);
	}
function image_default_set($image)
	{
		return (!empty($image)) ? 'http://'.$image : '/templates/images/no_image_default.gif';
	}
	
function is_online($user_id = null)
	{
		if(empty($user_id))
			{
				$callback = urlencode($_SERVER['QUERY_STRING']);
				redirect(RTITLE01, RMSG01, 'http://'.$_SERVER['HTTP_HOST'].'/?pageid=mycrib.signin&url='.$callback);
			}else{
				return true;
			}
	}
	
function value_require($value = null)
	{
		if($value == null & !$value)
			{
				message(MTITLE01, 'Value is missing.', URLBACK);
			}
	}
	
function create_array($array = null)
	{
		$key = array_keys($array);
		$size = count($key);
		for($x=0;$x<$size;$x++)
			{
				$value = $key[$x];
				global ${$value};
				${$value} = array();
			}
	}
function params_request_a($params = null)
	{
		$magic = false;
		if(get_magic_quotes_gpc())
			{
				$magic = true;
			}
		foreach($params as $key=>$val)
			{
				$params[$key] = antixss_filter($val);
			}
		return $params;
	}
function params_request($params = null)
	{
		$magic = false;
		if(get_magic_quotes_gpc())
			{
				$magic = true;
			}
		$key = array_keys($params);
		$size = count($key);
		for($x=0;$x<$size;$x++)
			{
				$value = $key[$x];
				$value2 = $params[$key[$x]];
				global ${'get_'.$value};
				if($magic != true)
					{
						$request_value = (!empty($_REQUEST[$value]) ? addslashes($_REQUEST[$value]) : NULL);
					}else{
						$request_value = (!empty($_REQUEST[$value]) ? $_REQUEST[$value] : NULL);
					}
				if(!empty($request_value))
					{
						if($value2 == 'int')
							{
								${'get_'.$value} = ((!empty($request_value) && is_int($request_value)) ? $request_value : 0);
							}elseif($value2 == 'string'){
								${'get_'.$value} = (!empty($request_value) ? antixss_filter($request_value) : NULL);
							}elseif($value2 == 'exist'){
								${'get_'.$value} = (!empty($request_value) ? antixss_filter($request_value) : NULL);
							}else{
								${'get_'.$value} = (!empty($request_value) ? antixss_filter($request_value) : $value2);
							}
					}else{
						${'get_'.$value} = $value2;
					}
			}
		/*
		INTERGER
		STRING
		EXIST
		*/
	}

function params_request_array($params = null)
	{
		$magic = false;
		global $params_array;
		$params_array = array();
		if(get_magic_quotes_gpc())
			{
				$magic = true;
			}
		$key = array_keys($params);
		$size = count($key);
		for($x=0;$x<$size;$x++)
			{
				$value = $key[$x];
				$value2 = $params[$key[$x]];
				if($magic != true)
					{
						$request_value = (!empty($_REQUEST[$value]) ? addslashes($_REQUEST[$value]) : NULL);
					}else{
						$request_value = (!empty($_REQUEST[$value]) ? $_REQUEST[$value] : NULL);
					}
				if($value2 == 'int')
					{
						$request_value = (!empty($request_value) ? $request_value : 0);
						$params_array[$value] = $request_value;
					}elseif($value2 == 'string'){
						$request_value = (!empty($request_value) ? antixss_filter($request_value) : NULL);
						$params_array[$value] = $request_value;
					}elseif($value2 == 'exist'){
						$request_value = (!empty($request_value) ? $request_value : NULL);
						$params_array[$value] = $request_value;
					}else{
						$request_value = (!empty($request_value) ? antixss_filter($request_value) : $value2);
						$params_array[$value] = $request_value;
					}
			}
		/*
		INTERGER
		STRING
		EXIST
		*/
	}

function antixss_filter($string)
	{
		if(get_magic_quotes_gpc())
			{
				$string = stripslashes($string);
			}
		$string = html_entity_decode($string, ENT_QUOTES, "ISO-8859-1");
		// convert decimal
		$string = preg_replace('/&#(\d+)/me', "chr(\\1)", $string); // decimal notation
		// convert hex
		$string = preg_replace('/&#x([a-f0-9]+)/mei', "chr(0x\\1)", $string); // hex notation
		//$string = html_entity_decode($string, ENT_COMPAT, "UTF-8");
		$string = preg_replace('#(&\#*\w+)[\x00-\x20]+;#U',"$1;",$string);
		$string = preg_replace('#(<[^>]+[\s\r\n\"\'])(on|xmlns)[^>]*>#iU',"$1>",$string);
		$string = preg_replace('#(&\#x*)([0-9A-F]+);*#iu',"$1$2;",$string);
		$string = preg_replace('#/*\*()[^>]*\*/#i',"", $string); // REMOVE /**/
		$string = preg_replace('#([a-z]*)[\x00-\x20]*([\`\'\"]*)[\\x00-\x20]*j[\x00-\x20]*a[\x00-\x20]*v[\x00-\x20]*a[\x00-\x20]*s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:#iU','...',$string); //JAVASCRIPT
		$string = preg_replace('#([a-z]*)([\'\"]*)[\x00-\x20]*v[\x00-\x20]*b[\x00-\x20]*s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:#iU','...',$string);  //VBSCRIPT
		$string = preg_replace('#([a-z]*)[\x00-\x20]*([\\\]*)[\\x00-\x20]*@([\\\]*)[\x00-\x20]*i([\\\]*)[\x00-\x20]*m([\\\]*)[\x00-\x20]*p([\\\]*)[\x00-\x20]*o([\\\]*)[\x00-\x20]*r([\\\]*)[\x00-\x20]*t#iU','...',$string);//@IMPORT
		$string = preg_replace('#([a-z]*)[\x00-\x20]*e[\x00-\x20]*x[\x00-\x20]*p[\x00-\x20]*r[\x00-\x20]*e[\x00-\x20]*s[\x00-\x20]*s[\x00-\x20]*i[\x00-\x20]*o[\x00-\x20]*n#iU','...',$string); //EXPRESSION
		$string = preg_replace('#</*\w+:\w[^>]*>#i',"",$string);
		$string = eregi_replace("slimespace.com", "...", $string);
		do {
		   $oldstring = $string;
		   //bgsound|
		   $string = preg_replace('#</*(applet|meta|xml|blink|link|script|iframe|frame|frameset|ilayer|layer|title|base|body|xml|AllowScriptAccess)[^>]*>#i',"...",$string);
		} while ($oldstring != $string);
		return addslashes($string);			  
	}
	
function blockForm_filter($string)
	{
		return preg_replace('/action[\x00-\x20]*=[\x00-\x20]*[\`\'\"](\S+)[\x00-\x20]*[\`\'\"]/i',"a c t i o n = \"-$1-\"",$string);	  
	}
	
function removeImage_filter($string)
	{
		return preg_replace('#</*(img)[^>]*>#i',"",$string);
	}
	
function secureLink_filter($string)
	{
		return preg_replace('/href[\x00-\x20]*=[\x00-\x20]*[\`\'\"][\x00-\x20]*(http\:\/\/\S+)*[\`\'\"]/i',"href=\"http://mycrib.net/?pageid=mycrib.url&url=$1\"",$string);
	}

function correct_page($pg, $r, $prl)
	{
		if($pg<0)
			{
				$pg = 0;
			}
		if($pg == NULL)
			{
				$pg = 0;
			}
		if(($pg*$prl)>$r)
			{
				$pg = ceil($r/$prl);
			}
		return $pg;
	}

function page_display($pg=NULL, $r=NULL, $prl=NULL, $dpl=NULL, $query_url=NULL, $last=NULL, $java=NULL)
	{
		$html = NULL;
		$page_x = ceil($dpl/2);
		$row_array = array();
		if($java == NULL)
			{
				$px = "&";
			}
		if($pg > ($page_x+1))
			{
				array_push($row_array, '<b><a href=\''.$query_url.$px.'page=1'.$last.'\' class=\'nounderline\'>1</a></b> ... ');
			}
		for($X=$page_x;$X>0;$X--)
			{
				$page = $pg-$X;
							
				if(($page*$prl>0))
					{
						array_push($row_array, '<b><a href=\''.$query_url.''.$px.'page='.$page.$last.'\' class=\'nounderline\'>'.$page.'</a></b> ');

					}
			}
		$r_B = $r+$prl;
		$P_P = $page*$prl;
		array_push($row_array, '<span class=\'pageview\'>'.$pg.'</span> ');
		for($I=1;$I<$page_x;$I++)
			{
				$page = $pg+$I;
				if(($page*$prl)<($r+$prl))
					{
						array_push($row_array, '<b><a href=\''.$query_url.''.$px.'page='.$page.$last.'\' class=\'nounderline\'>'.$page.'</a></b> ');
					}
			}
		$lastpage = ceil($r/$prl);
		if($lastpage > $page_x)
			{
				array_push($row_array, ' ... <b><a href=\''.$query_url.$px.'page='.$page.'&page='.$lastpage.$last.'\' class=\'nounderline\'>'.$lastpage.'</a></b>');
			}
		$row_total = count($row_array);
		//BUILD PAGE HTML
		for($X=0;$X<$row_total;$X++)
			{
				$html .= $row_array[$X];
			}
		return $html;
	}
function message($TITLE=NULL,$MESSAGE=NULL,$URL=NULL)
	{
		die(include('message.php'));
	}
function redirect($title=null, $message=null, $url=null)
	{
		if(headers_sent())
			{
				die(include('redirect.php'));
			}else{
				header("Location: $url");
			}
		exit();
	}

function build_address($address)
	{
		return explode(",", $address);
	}

function scan_folders($folder = null)
	{
		$folders = array("$folder");
		for($x=0;$x<count($folders);$x++)
			{
				$dir = opendir($folders[$x]);
				while($file_name = readdir($dir))
					{
						if(is_dir($folders[$x].$file_name) && $file_name != "." && $file_name != ".." && (!in_array($folders[$x].$file_name,$folders)))
							{
								array_push($folders, $folders[$x].$file_name."/");
								//print($folders[$x].$file_name."/<br>");
							}
					}
			}
		return $folders;
	}

function scan_folder($folder = null)
	{
		$folders = array();
		for($x=0;$x<1;$x++)
			{
				$dir = opendir($folder);
				while($file_name = readdir($dir))
					{
						if(is_dir($folder.$file_name) && $file_name != "." && $file_name != ".." && (!in_array($folder.$file_name,$folders)))
							{
								array_push($folders, $folder.$file_name."/");
								//print($folders[$x].$file_name."/<br>");
							}
					}
			}
		return $folders;
	}

function scan_files($folders = null)
	{
		$files = array();
		for($x=count($folders)-1;$x>-1;$x--)
			{
				$dir = opendir($folders[$x]);
				while($file_name = readdir($dir))
					{
						if(is_file($folders[$x].$file_name))
							{
								array_push($files, $folders[$x].$file_name);
							}
					}
			}
		return $files;
	}

function deleteFile($file = null)
	{
		if(is_file($file))
			{
				unlink($file);
				return true;
			}else{
				return false;
			}
	}


function getFileType($file=null)
	{
		$lock = 0;
		for($i=0;$i<strlen($file);$i++)
			{
				$file_substr = substr($file,$i,1);
				if("." == $file_substr)
					{
						$lock = $i+1;
					}
			}
		if($lock != 0)
			{
				$filetype_length = strlen($file)-$lock;
				return substr($file,$lock,$filetype_length);
			}
		return "???";
		
	}

function getFilename($file=NULL)
	{
		$filename_array = explode("/",$file);
		$filename_array_total = count($filename_array);
		return $filename_array[$filename_array_total-1];
	}

function getFilesize($string = null)
	{
		return filesize($string);
	}

function getfilesizef($bytes = null) {
   if ($bytes >= pow(2,40)) {
	   $return = round($bytes / pow(1024,4), 2);
	   $suffix = "TB";
   } elseif ($bytes >= pow(2,30)) {
	   $return = round($bytes / pow(1024,3), 2);
	   $suffix = "GB";
   } elseif ($bytes >= pow(2,20)) {
	   $return = round($bytes / pow(1024,2), 2);
	   $suffix = "MB";
   } elseif ($bytes >= pow(2,10)) {
	   $return = round($bytes / pow(1024,1), 2);
	   $suffix = "KB";
   } else {
	   $return = $bytes;
	   $suffix = "Byte";
   }
   if ($return == 1) {
	   $return .= " " . $suffix;
   } else {
	   $return .= " " . $suffix . "s";
   }
   return $return;
}

function get_image_size($image = null)
	{
		return getimagesize($image);
	}

function descSortArray($ARRAY)
	{
		$ARRAY_B = array();
		for($X=(count($ARRAY)-1);$X>-1;$X--)
			{
				array_push($ARRAY_B, $ARRAY[$X]);
			}
		return $ARRAY_B;
	}

function resizeJpegImage($source=null, $destination=null, $width = null, $height = null, $quality = null)
	{
		$sourceImage = imagecreatefromjpeg($source);
		if(!$sourceImage)
			{
				return(FALSE);
			}
		$destinationImage=imagecreatetruecolor($width, $height);
		imagecopyresampled($destinationImage, $sourceImage, 0, 0, 0, 0, $width, $height, imagesx($sourceImage), imagesy($sourceImage));
		ImageJPEG($destinationImage, $destination, $quality);
	}

function zeronumber($zerolength = NULL){
	$zeronumber =  NULL;
   for($i=0;$i<=$zerolength;$i++){
	  $zeronumber.="0";
   }
   return($zeronumber);
}
function removeZeroNumber($removeZero = NULL){
   for($o=0;$o<strlen($removeZero);$o++){
	  if(0!=substr($removeZero, 1, $o)){
		 $number = substr($removeZero,$o,strlen($removeZero));
		 return($number);
	  }
   }
}

function get_server_address($server_id, $server_type = "DATABASE")
	{
		$query = "SELECT IP_ADDRESS FROM SERVER_ID_LIST WHERE SERVER_ID = '$server_id'";
		$result = mysql_query($query) or die(mysql_error());
		$get_data = mysql_fetch_assoc($result);
		$server_address = $get_data['SERVER_ID'];
		return $server_address;
	}
	
	//GET AVAILABLE TABLE FUNCTION 1.0 (08-25-05)
function get_available_table($table_type, $level, $server_id) //BETA (AT THE TIME, IT IS IMPORTANT.)
	{
		$query = "SELECT MIN(ROWS_TOTAL) FROM TABLE_ID_LIST WHERE TABLE_TYPE = '$table_type' AND LEVEL_GROUP_ID = '$level' AND SERVER_ID = '$server_id' ";
		//print("$query<BR>");
		//print($query);
		$result = mysql_query($query) or die(mysql_error()."XXXB");
		$get_data = mysql_fetch_row($result);
		$min = $get_data[0];
		$query = "SELECT SERVER_ID, TABLE_TYPE, LEVEL_GROUP_ID, LEVEL_PATH_ID, ROWS_TOTAL FROM TABLE_ID_LIST WHERE TABLE_TYPE = '$table_type' AND LEVEL_GROUP_ID = '$level' AND SERVER_ID = '$server_id' AND ROWS_TOTAL <= ($min+100) LIMIT 0,1";
		//print($query);
		$result = mysql_query($query) or die(mysql_error());
		$get_data = mysql_fetch_assoc($result);
		$available_table = ",".$get_data['SERVER_ID'].",".$get_data['TABLE_TYPE'].",".$get_data['LEVEL_GROUP_ID'].",".$get_data['LEVEL_PATH_ID'].",";
		//die();
		return $available_table;
	}
	//GET AVAILABLE TABLE FUNCTION 2.0 (01-10-06)
function get_available_table2($TABLE_ID, $balance_id, $status = 0)
	{
		//EX: TABLE ID = FRIEND_COMMENT_TABLE_LIST
		//EX: BALANCE ID = USER, SIZE OR ROWS
		if($balance_id == "USER_TOTAL")
			{
				$query = "SELECT MIN(USER_TOTAL) FROM $TABLE_ID";
			}
		if($balance_id == "SIZE")
			{
				$query = "SELECT MIN(SIZE) FROM $TABLE_ID";
			}
		if($balance_id == "ROWS")
			{
				$query = "SELECT MIN(ROWS) FROM $TABLE_ID";
			}
		if(empty($query))
			{
				die("FATAL ERROR: Enigma Engine 2 fails");
			}
		$result = mysql_query($query) or die(mysql_error());
		$get_data = mysql_fetch_row($result);
		$min = $get_data[0];
		$query = "SELECT ID, SERVER_ID, STATUS, TABLE_ID, TYPE, USER_TOTAL, SIZE, ROWS FROM $TABLE_ID WHERE $balance_id <= ($min+100) LIMIT 0,1";
		//print($query);
		$result = mysql_query($query) or die(mysql_error());
		$get_data = mysql_fetch_assoc($result);
		$id = $get_data['ID'];
		$available_table = ",".$get_data['SERVER_ID'].",".$get_data['STATUS'].",".$get_data['TABLE_ID'].",".$get_data['TYPE'].",".$get_data['USER_TOTAL'].",".$get_data['SIZE'].",".$get_data['ROWS'].",";
		if($status == 1 && $balance_id == "USER_TOTAL")
			{
				$query = "UPDATE $TABLE_ID SET USER_TOTAL = (USER_TOTAL+1) WHERE ID = '$id';";
				$result = mysql_query($query) or die(mysql_error());
			}
		if($status == 1 && $balance_id == "ROWS")
			{
				$query = "UPDATE $TABLE_ID SET ROWS = (ROWS+1) WHERE ID = '$id';";
				$result = mysql_query($query) or die(mysql_error());
			}
		return $available_table;
	}
//GET AVAILABLE SERVER FUNCTION BETA (NEED TO TEST IT)
function get_available_server($server_type)
	{
		$query = "SELECT SERVER_ID, IP_ADDRESS FROM SERVER_ID_LIST WHERE TABLE_TOTAL<'1000'  AND SERVER_TYPE = '$server_type' ORDER BY SERVER_SIZE DESC;";
		$result = mysql_query($query) or die(mysql_error());
		$get_data = mysql_fetch_assoc($result);
		$available_server = ",".$get_data['SERVER_ID'].",".$get_data['IP_ADDRESS'].",";
		return $available_server;
	}
	
//OPTIMIZE TABLE BALANCER BETA (NEED TO CHECK IT IF IT IS REALLY IMPORTANT)
function optimize_table_balancer($rows_max, $size_max, $table_type_list, $table_max, $server_size_max)
	{
		for($X=0;$X<count($table_type_list);$X++)
			{	//TABLE ID LIST NEEDS TO HAVE "LOCK"
				$query = "SELECT COUNT(*) FROM TABLE_ID_LIST WHERE ROWS_MAXIMUM>'$rows_max' OR SIZE_TOTAL>'$size_max' AND TABLE_TYPE = '$table_type_list[$X]'";
				$result = mysql_query($query) or die(mysql_error());
				$get_data = mysql_fetch_row($result);
				$result_total = $get_data[0];
				if($result_total>0)
					{
						$query = "SELECT SERVER_ID FROM SERVER_ID_LIST WHERE SERVER_SIZE AND TABLE"; //SERVER ID LIST (SERVER ID LIST NEEDS TO HAVE "LOCK" AND "SERVER_TYPE"
						$result = mysql_query($query) or die(mysql_error());
					}
			}
	}
?>