<?php
/* user application */
function get_user_link($arg)
	{
		$value_a = convert_arg($arg);
		$uid = $value_a['uid'];
		$result = query("select nickname from members where member_id = '$uid'");
		$get_data = mysql_fetch_assoc($result);
		$display_name = $get_data['nickname'];
		return "<a href='http://mycrib.net/?pageid=mycrib.member.profile&ID=$uid'>$display_name</a>";
	}
function get_group_link($arg)
	{
		$value_a = convert_arg($arg);
		$gid = $value_a['gid'];
		$result = query("select group_name from group_accounts where id = '$gid';");
		$get_data = mysql_fetch_assoc($result);
		$group_name = $get_data['group_name'];
		return "<a href='http://mycrib.net/?pageid=mycrib.group.page&groupid=$gid'>$group_name</a>";
	}
function get_pro_photo($arg)
	{
		$value_a = convert_arg($arg);
		$query = 'select image_default from members where member_id = \''.$value_a['uid'].'\' and member_lock = 0';
		$result = mysql_query($query);
		while($get_data = mysql_fetch_assoc($result))
			{
				if($get_data['image_default'])
					{
						$default_photo = eregi_replace('p1\.', 'cache2.', $get_data['image_default']);
						$pro_photo = '<img src=\'http://'.$default_photo.'\' width=\'65\'>';
						
					}
			}
		if($default_photo)
			{
				if($value_a['class'])
					{
						$pro_photo = '<img src=\'http://'.$default_photo.'\' width=\'65\' class=\''.$value_a['class'].'\'>';
					}
				if($value_a['link']==1)
					{
						$pro_photo = '<a href=\'http://mycrib.net/?pageid=mycrib.member.profile&ID='.$value_a['uid'].'\'>'.$pro_photo.'</a>';
					}
				return $pro_photo;
			}else{
				return null;
			}
	}
function get_display_name($arg)
	{
		$value_a = convert_arg($arg);
		$query = 'select nickname from members where member_id = \''.$value_a['uid'].'\' and member_lock = 0';
		$result = mysql_query($query);
		while($get_data = mysql_fetch_assoc($result))
			{
				$nickname = $get_data['nickname'];
			}
		if($value_a['capitalize']==1)
			{
				$nickname = capitalize($nickname);
			}
		if($value_a['link']==1)
			{
				$nickname = '<a href=\'http://mycrib.net/?pageid=mycrib.member.profile&ID='.$value_a['uid'].'\'>'.$nickname.'</a>';
			}
		return $nickname;
	}
?>