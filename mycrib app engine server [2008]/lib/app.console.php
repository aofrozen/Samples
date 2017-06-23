<?php
/* app console */
function start_mcml_console()
	{
		global $get_console_data;
		global $mc_content;
		global $user_id;
		global $app_info_a;
		global $mc_header;
		global $tab_items_list;
		global $dashboard;
		loadPage($get_console_data);
		include('html/mcml_tool.php');
		exit;
	}
function start_api_console()
	{
		global $get_console_data;
		global $mc_content;
		global $user_id;
		global $app_info_a;
		global $mc_header;
		global $tab_items_list;
		global $dashboard;
		//loadPage($get_console_data);
		include('html/api_tool.php');
		exit;
	}
?>