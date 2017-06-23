<?php
enigma engine funcion 3.0

loadTableServer(uid, table_name);

function callTableServer($uid, $table_name)
	{
		global $__ee;
		if($__ee[$table_name][$uid]['server'])
			{

			}
	}
function createTableServer($uid, $table_name_a)
	{
		global $__ee;
		$table_name_list = '';
		$table_list = count($table_name_a);
		$table_name_list = $table_list_a[0];
		for($x=1;$x<$table_list;$x++)
			{
				$table_name_list += ','+$table_list_a[$x];
			}
		$result = query("select $table_name_list from profile_network where member_id = '$uid';");
		while($get_data = mysql_fetch_assoc($result))
			{
				$table_address = $get_data[$table_list_a]
				
				/* need to ceate key and value */
				//$__ee[
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

					}
				$rows++;
			}	
	}
?>