<?php
/* editor application */
function set_editor($arg) //done
	{
		global $created_editor_status;
		$value_a = convert_arg($arg);
		$action = $value_a['action'];
		$width = $value_a['width'];
		$labelwidth= $value_a['labelwidth'];
		if($created_editor_status)
			{
				$created_editor_status = false;
				return '</tr></table></form>';
			}else{
				$created_editor_status = true;
				return '<form action="'.$action.'" method="post"><table border="0" cellspacing="0" style="width:'.$width.'px;"><tr><td style="'.$labelwidth.'px;"></td><td></td>';	
			}
	}
function get_editor_button($arg) //under buttonset
	{
		$value_a = convert_arg($arg);
		$value = $value_a['value'];
		$name = $value_a['name'];
		if($name)
			{
				$attr .= ' name="'.$name.'" ';
			}
		if($value)
			{
				$attr .= ' value="'.$value.'" ';
			}
		return '<input type="submit" '.$attr.' />';
	}
function get_editor_buttonset() //done
	{
		global $created_editor_buttonset_status;
		if($created_editor_buttonset_status)
			{
				$created_editor_buttonset_status = false;
				return '</td></tr>';
			}else{
				$created_editor_buttonset_status = true;
				return '<tr><td></td><td>';
			}
		
	}
function get_editor_cancel($arg) //under buttonset done
	{
		$value_a = convert_arg($arg);
		$value = $value_a['value'];
		$href = $value_a['href'];
		return ' Or <a href="'.$href.'">'.$value.'</a>';
	}
function get_editor_custom($arg) 
	{
		global $___mcText;
		global $created_editor_custom_status;
		$value_a = convert_arg($arg);
		$label = $value_a['label'];
		$id = $value_a['id'];
		if($created_editor_custom_status)
			{
				$created_editor_custom_status = false;
				return '</td></tr>';
			}else{
				$created_editor_custom_status = true;
				return '<tr><td>'.$label.'</td><td>';
			}
	}
function get_editor_date($arg) //done
	{
		$value_a = convert_arg($arg);
		$label = $value_a['label'];
		$value = $value_a['value'];
		$month_a = array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
		$select = '<tr><td>'.$label.'</td><td><select name="date_month">';
		for($month=1;$month<=12;$month++)
			{
				$select .= '<option value="'.$month.'">'.$month_a[($month-1)].'</option>';
			}
		$select .= '</select><select name="date_day">';
		for($day=1;$day<=31;$day++)
			{
				$select .= '<option value="'.$day.'">'.$day.'</option';
			}
		$select .= '</select></td></tr>';
		return $select;
	}
function get_editor_divider() //done
	{
		return '<tr><td></td><td><div style="1px; background-color:#CCCCCC; height:1px;"></div></td></tr>';
	}
function get_editor_month($arg) //done
	{
		$month_a = array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
		$value_a = convert_arg($arg);
		$name = $value_a['name'];
		$value = $value_a['value'];
		$label = $value_a['label'];
		$select = '<tr><td>'.$label.'</td><td><select name="mon">';
		for($month=1;$month<=12;$month++)
			{
				if($month == $value)
					{
						$select .= '<option value="'.$month.'" selected>'.$month_a[($month-1)].'</option>';
					}else{
						$select .= '<option value="'.$month.'">'.$month_a[($month-1)].'</option>';
					}
			}
		$select .= '</select></td></tr>';
		return $select;
	}
function get_editor_text($arg) //done
	{
		global $___mcText;
		$value_a = convert_arg($arg);
		$label = $value_a['label'];
		$name = $value_a['name'];
		$value = $value_a['value'];
		$maxlength = $value_a['maxlength'];
		$attr = '';
		$text = '';
		if($label)
			{
				$text .= '<tr><td><label>'.$label.'</label></td><td>';
			}else{
				$text .= '<tr><td></td><td>';
			}
		if($name)
			{
				$attr .= ' name="'.$name.'" ';
			}
		if($value)
			{
				$attr .= ' value="'.$value.'" ';
			}
		if($maxlength)
			{
				$attr .= ' maxlength="'.$maxlength.'" ';
			}
		$text .= '<input text="text" '.$attr.'/></td></tr>';
		return $text;
		
	}
function get_editor_textarea($arg) //done
	{
		global $___mcText;
		global $created_editor_textarea;
		$value_a = convert_arg($arg);
		$label = $value_a['label'];
		$name = $value_a['name'];
		$rows = $value_a['rows'];
		$text = '';
		if($label && !$created_editor_textarea)
			{
				$text .= '<tr><td><label>'.$label.'</label></td><td>';
			}elseif(!$created_editor_textarea){
				$text .= '<tr><td></td><td>';
			}
		if($name)
			{
				$attr .= ' name="'.$name.'" ';
			}
		if($rows)
			{
				$attr .= ' rows="'.$rows.'" ';
			}
		if($created_editor_textarea)
			{
				$created_editor_textarea = false;
				$text .= '</textarea></td></tr>';
			}else{
				$created_editor_textarea = true;
				$text .= '<textarea '.$attr.'>';
			}
		return $text;
	}
function get_editor_time($arg) //done
	{
		$value_a = convert_arg($arg);
		$label = $value_a['label'];
		$name = $value_a['name'];
		$value = $value_a['value'];
		$text = '';
		$attr = '';
		if($label)
			{
				$text .= '<tr><td>'.$label.'</td><td>';
			}else{
				$text .= '<tr><td></td><td>';
			}
		if($name)
			{
				$attr .= ' name="'.$name.'" ';
			}
		if($value)
			{
				$attr .= ' value="'.$value.'" ';
			}
		$text .= '<select name="time_hour">';
		for($hour=1;$hour<=12;$hour++)
			{
				$text .= '<option value="'.$hour.'">'.$hour.'</option>';
			}
		$text .= '</select><select name="time_min">';
		for($x=0;$x<11;$x++)
			{
				$min = $x*5;
				if($min == 0)
					{
						$min = '00';
					}
				$text .= '<option value="'.$min.'">'.$min.'</option>';
			}
		$text .= '</select><select name="time_ampm"><option value="pm">pm</option><option value="am">am</option></select>';
		$text .= '</td></tr>';
		return $text;
	}
?>