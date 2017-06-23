<?php
/* mysql */
$db_login = 'aof2';
$db_password = 'tjcl123';
$db_localhost = 'lead18';
$db_select = 'mycrib';
$db_server_name['lead'] = '192.168.0.55';
$db_server_name['oxygen'] = '192.168.0.55';
$db_server_name['mycribdb1'] = '192.168.0.55';
$db_server_name['dxeon1'] = '192.168.0.55';
$db_table_name['mycrib'] = 'mycrib';
mysql_init();
$csalt = 'saltha';
$time = time();
function mysql_init()
	{
		global $db_server_name;
		global $db_login;
		global $db_password;
		global $db_table_name;
		global $mysql_connection;
		$mysql_connection = mysql_connect($db_server_name['lead'], $db_login, $db_password) or mysql_retry($db_server_name['lead'], $db_login, $db_password);
		mysql_select_db($db_table_name['mycrib']);
		return $mysql_connection;
	}
function mysql_retry($db_localhost, $db_login, $db_password)
	{
		$retry = 0;
		$loop = TRUE;
		while($loop)
			{
				if($retry>2)
					{
						$loop = false;
					}
				$connect = mysql_connect($db_localhost, $db_login , $db_password);
				if($connect)
					{
						$loop = FALSE;
					}
				$retry++;
				sleep(1);
			}
		return $connect;
	}
function change_server($db_localhost = null, $db_select = null)
	{
		global $db_login;
		global $db_password;
		global $mysql_connection;
		mysql_close($mysql_connection);
		$mysql_connection = mysql_connect($db_localhost, $db_login , $db_password) or mysql_error_report(mysql_error());
		mysql_select_db($db_select);
		return($mysql_connection);
	}
function memcache_retry($server_ip)
	{
		global $memcache;
		$loop = true;
		$retry = 0;
		while($loop)
			{
				if($retry > 5)
					{
						$loop = false;
					}
				if($memcache->connect($server_ip, 11211))
					{
						$loop = false;
					}else{
						sleep(1);
						$retry++;
					}
			}
	}
function explain($query)
	{
		global $user_id;
		global $time;
		if(eregi('select', $query))
			{
				$pquery = NULL;
				$result_a = mysql_query('explain '.$query);
				$report_array = array();
				 while($fetch=mysql_fetch_assoc($result_a))
					{
						if($fetch['rows']>500)
							{
								 $pquery .= ' '.$fetch['select_type']; 
								 $pquery .= ' | '.$fetch['table']; 
								 $pquery .= ' | '.$fetch['possible_keys']; 
								 $pquery .= ' | '.$fetch['key'].' | '.$fetch['rows']."\nfile:".$file."\nline:".$line."\nquery: $query";
								 $time = time();
								 $query = "select count(*) from error_information where file = '$file' and member_id = '$user_id';";
								 $result_b = mysql_query($query);
								 $fetch_b = mysql_fetch_row($result_b);
								 if($fetch_b[0]<1)
									{
										 $query = "insert into error_information(`ip_address`, `member_id`, `date`, `error_message`, `file`) values('', '$user_id', '$time', '".addslashes($pquery)."', '$file');";
										 $result_b = mysql_query($query);
									}
							}
					}
			}
	}
	
function query($query, $error_status = NULL, $line = NULL, $file = NULL)
	{
		if(eregi('delete ', $query) || (eregi('update ', $query) && !eregi('_update', $query) && !eregi('updates', $query)) || eregi('insert', $query))
			{

			}
		if($error_status != NULL)
			{
				$result = mysql_query($query) or mysql_error_report("line: $file <br>file: $line<br>error: ".mysql_error());
			}else{
				$result = mysql_query($query);
			}
		return $result;
	}

function mysql_error_report($error_details=null)
	{
		global $ip_address;
		global $time;
		$error_details .= "query: ".$_server['query_string'];
		$query = "insert into error_information(`ip_address`, `date`, `error_message`) values('$ip_address', '$time', '".addslashes($error_details)."');";
		@mysql_query($query);
	}
function scquery($family, $query, $ttl=0) //correct
			{
				global $MEMBER_ID;
				global $time;
				$cache_date = 0;
				$cache_info = cget($family);
				$cache_data = carray(cget($query));
				if(strlen($cache_info)>0)
					{
						if(strlen(cache_date)>0)
							{
								if($cache_info > cache_date || strlen($cache_data) < 10)
									{
										cdelete($query,1);
										csession($query, 30);
										return rquery($family, $query, $ttl);
									}else{
										return $cache_data;
									}
							}else{
								return rquery($family, $query, $ttl);
							}
					}else{
						ciset($family, $ttl);
						return rquery($family, $query, $ttl);
					}
			}
		
		function ciupdate($family, $ttl) //correct
			{
				global $memcache;
				global $csalt;
				global $time;
				if(cget($family))
					{
						return $memcache->replace(md5($family.$csalt), $time, false, $ttl);
					}else{
						return ciset($family, $ttl);
					}
			}
		
		function ciset($family, $ttl) //correct 
			{
				global $memcache;
				global $csalt;
				global $time;
				if(!cchsession($family))
					{
						return $memcache->set(md5($family.$csalt), $time, false, $ttl);
					}
			}
		function ncquery($query)
			{
				global $time;
				$result = mysql_query($query);
				$data_a = array();
				$fetch_a = array();
				$total = false;
				$store_cache = null;
				$rows = 0;
				while($get_data = mysql_fetch_assoc($result))
					{
						if(!$total)
							{
								$key_a = array_keys($get_data);
								$total = count($get_data);
								$store_cache = $total.',.,';
								for($x=0;$x<$total;$x++)
									{
										$store_cache .= $key_a[$x].',.,';
									}
							}
						for($x=0;$x<$total;$x++)
							{
								$fetch_a[$key_a[$x]][$rows] = $get_data[$key_a[$x]];
								$store_cache .= $get_data[$key_a[$x]].',.,';
							}
						$rows++;
					}
				return $fetch_a;
			}
		function rquery($family, $query, $ttl) //correct
			{
				global $time;
				$result = mysql_query($query);
				$data_a = array();
				$fetch_a = array();
				$total = false;
				$store_cache = null;
				$rows = 0;
				while($get_data = mysql_fetch_assoc($result))
					{
						if(!$total)
							{
								$key_a = array_keys($get_data);
								$total = count($get_data);
								$store_cache = $total.',.,';
								for($x=0;$x<$total;$x++)
									{
										$store_cache .= $key_a[$x].',.,';
									}
							}
						for($x=0;$x<$total;$x++)
							{
								$fetch_a[$key_a[$x]][$rows] = $get_data[$key_a[$x]];
								$store_cache .= $get_data[$key_a[$x]].',.,';
							}
						$rows++;
					}
				if(strlen(cchsession($family)<1) && strlen(cchsession($query))<1)
					{
						cset($query, $time.',.,'.$rows.',.,'.$store_cache, $ttl);
					}
				return $fetch_a;
			}
		
		function cdelete($key) //correct
			{
				global $memcache;
				global $csalt;
				return $memcache->delete(md5($key.$csalt));
			}
		
		function cchsession($key) //correct
			{
				global $memcache;
				global $csalt;
				return $memcache->get(md5($key.'___s'.$csalt));
			}
		
		function cget($key) //correct
			{
				global $memcache;
				global $csalt;
				return $memcache->get(md5($key.$csalt));
			}
		
		function cset($key, $value, $ttl) //correct
			{
				global $memcache;
				global $csalt;
				$memcache->set(md5($key.$csalt), $value, false, $ttl);
			}
		
		function csession($key=null, $ttl=10) //correct
			{
				global $memcache;
				global $csalt;
				global $time;
				$memcache->set(md5($key.'___s'.$csalt), $time, false, $ttl);
			}
		function carray($data) //correct
			{
				$user_id = $_REQUEST['userid'];
				$data_a = explode(',.,', $data);
				$cache_date = $data_a[0];
				$rows = $data_a[1];
				$total = $data_a[2];
				$key_a = array();
				$fetch_a = array();
				for($i=0;$i<$total;$i++)
					{
						array_push($key_a, $data_a[3+$i]);
					}
				$v = 3+$total;
				for($i=0;$i<$rows;$i++)
					{
						$n = $i*$total+$v;
						for($x=0;$x<$total;$x++)
							{
								$fetch_a[$key_a[$x]][$i] = $data_a[$n+$x];
							}
					}
				if($user_id == 'x')
					{
						print_r($fetch_a);
					}
				return $fetch_a;
			}
function cquery($query, $ttl=900, $key=null)
	{
		global $memcache;
		global $csalt;
		
		if($key)
			{
				$hash = md5($key.$csalt);
			}else{
				$hash = md5($query.$csalt);
			}
	  	if($data = $memcache->get($hash))
			{
				$data_a = explode(',.,', $data);
				$rows = $data_a[0];
				$total = $data_a[1];
				$key_a = array();
				$fetch_a = array();
				for($i=0;$i<$total;$i++)
					{
						array_push($key_a, $data_a[2+$i]);
					}
				$v = 2+$total;
				for($i=0;$i<$rows;$i++)
					{
						$n = $i*$total+$v;
						for($x=0;$x<$total;$x++)
							{
								$fetch_a[$key_a[$x]][$i] = $data_a[$n+$x];
							}
					}
				return $fetch_a;
			}else{
				$result = query($query, 1, __LINE__, __FILE__);
				$data_a = array();
				$fetch_a = array();
				$total = false;
				$rows = 0;
				while($get_data = mysql_fetch_assoc($result))
					{
						if(!$total)
							{
								$key_a = array_keys($get_data);
								$total = count($get_data);
								$store_cache = $total.',.,';
								for($x=0;$x<$total;$x++)
									{
										$store_cache .= $key_a[$x].',.,';
									}
							}
						for($x=0;$x<$total;$x++)
							{
								$fetch_a[$key_a[$x]][$rows] = $get_data[$key_a[$x]];
								$store_cache .= $get_data[$key_a[$x]].',.,';
							}
						$rows++;
					}
				$memcache->set($hash, $rows.',.,'.$store_cache, false, $ttl);
				return $fetch_a;
			}
  	}
?>