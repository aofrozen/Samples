<?php
/* misc application */
function get_redirect($arg)
	{
		$value_a = convert_arg($arg);
		return "<script type=\"text/javascript\">top.location.href = \"".$value_a['link']."\";</script>";
	}
function get_title($arg)
	{
		global $___mcText;
		$value_a = convert_arg($arg);
	}
function get_time($arg)
	{
		$value_a = convert_arg($arg);
		$t = $value_a['t']; //time
		$tz = $value_a['tz']; //time zone
	}
?>