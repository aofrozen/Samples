<?php
/* app browse */
function browse()
	{
		global $user_id;
		$result = query("select app_name, icon from app_clients where user_id = '$user_id';");
		while($get_data = mysql_fetch_assoc($result))
			{
				$app_name = $get_data['app_name'];
				$icon = $get_data['icon'];
			}
		$result = query("select app_name from app");
		while($get_data = mysql_fetch_assoc($result))
			{
			
			}
	}
?>