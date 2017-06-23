<?php
/* navigator application */
$tab_items_list = '';
$mc_header = '';
$dashboard = '';
function set_dashboard()
	{
		global $dashboard;
		global $created_dashboard_status;
		global $created_dashboard_action_status;
		$created_dashboard_action_status = false;
		if($created_dashboard_status)
			{
				$created_dashboard_status = false;
				$dashboard .= '</div><div class="divider"></div>';
			}else{
				$created_dashboard_status = true;
				$dashboard = '<div style="padding:10px;">';
			}
	}
function get_dashboard_action($arg)
	{
		global $dashboard;
		global $created_dashboard_action_status;
		global $___mcText;
		$value_a = convert_arg($arg);
		$href = $value_a['href'];
		if(!empty($href) && (strlen($___mcText) > 1))
			{
				if($created_dashboard_action_status)
					{
						//$created_dashboard_action_status = false;
						$dashboard .= ' | <a href="'.$href.'">'.$___mcText.'</a>';
					}elseif($___mcText){
						$created_dashboard_action_status = true;
						$dashboard .= ' <a href="'.$href.'">'.$___mcText.'</a>';
					}
			}
		//echo $dashboard;
	}
function get_dashboard_create_button($arg)
	{
		global $dashboard;
		$value_a = convert_arg($arg);
		$href = $value_a['href'];
		$title=  $value_a['title'];
	}
function get_dashboard_help($arg)
	{
		global $dashboard;
		$value_a = convert_arg($arg);
		$href = $value_a['href'];
		$title=  $value_a['title'];
	}
function get_header($arg)
	{
		global $mc_header;
		global $___mcText;
		$value_a = convert_arg($arg);
		$icon = $value_a['icon'];
		$created_header_status = true;
		$mc_header = '<div style="padding:3px; margin:5px;" class="box_title">'.$___mcText.'</div>';
	}
function get_explaination($arg)
	{
		global $created_explaination_status;
		$value_a = convert_arg($arg);
		$message = $value_a['message'];
		if($created_explaination_status)
			{
				$created_explaination_status = false;
				return '</div>';
			}else{
				$created_explaination_status = true;
				return '<div style="background:#E2FFD7; border:1px #A0CB9E solid; padding:3px; margin:5px;"><b>'.htmlentities($message).'</b><br>';
			}
	}
function get_error_message($arg)
	{
		global $created_error_status;
		global $___mcText;
		$value_a = convert_arg($arg);
		$message = $value_a['message'];
		if($created_error_status)
			{
				$created_error_status = false;
				return $___mcText.'</div>';
			}else{
				$created_error_status = true;
				return '<div style="background-color:#FAC1BE; border:1px #F39885 solid; padding:3px; margin:5px;"><b>'.htmlentities($message).'</b><br>';
			}
	}
function get_warning_message($arg)
	{
		global $created_warning_status;
		global $___mcText;
		$value_a = convert_arg($arg);
		$message = $value_a['message'];
		if($created_warning_status)
			{
				$created_warning_status = false;
				return $___mcText.'</div>';
			}else{
				$created_warning_status = true;
				return '<div class="warning"><b>'.htmlentities($message).'</b><br>';
			}
	}
function set_tabs()
	{
		global $tab_items_list;
		global $created_tab_status;
		if($created_tab_status)
			{
				$tab_items_list .= '</ul></div>';
				$created_tab_status = false;
			}else{
				$tab_items_list = '<div id="tablinks"><ul>';
				$created_tab_status = true;
			}
	}
function get_tabItem($arg)
	{
		global $tab_items_list;
		$value_a = convert_arg($arg);
		$href = $value_a['href'];
		$title = $value_a['title'];
		$tab_items_list .= '<li><a href="'.$href.'">'.$title.'</a></li>';
	}
function get_dashboard($arg)
	{
		$value_a = convert_arg($arg);
	}
?>