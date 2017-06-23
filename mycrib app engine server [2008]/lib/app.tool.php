<?php
/* tool application */
function get_google_analytics($arg)
	{
		$value_a = convert_arg($arg);
		$uacct = $value_a['uacct']; //Your Urchin/Google Analytics account ID.
		$page = $value_a['page']; //The argument given to the urchinTracker() function, either a page or a virtual page
		$ufsc = $value_a['ufsc']; //Sets client info flag, where 1=on and 0=off. This is a UTM user setting. (default value is 1)
		$udn = $value_a['udn']; //Sets the domain name for cookies. Specify auto, none or domain. This is a UTM user setting. (default value is auto)
		$uhash = $value_a['uhash']; //Specify whether the unique domain hash for cookies is on or off. This is a UTM user setting. (default value is on)
		$utimeout = $value_a['utimeout']; //Sets the inactive session timeout in seconds. This is a UTM user setting. (default value is 1800)
		$ugifpath = $value_a['ugifpath']; //Set the Web path to the __utm.gif file. This is a UTM user setting. (default value is /__utm.gif)
		$utsp = $value_a['utsp']; //The transaction field separator. This is a UTM user setting. (default value is | (a pipe character))
		$uflash = $value_a['uflash']; //Sets the Flash version detection option, where 1=on and 0=off. This is a UTM user setting. (default value is 1)
		$utitle = $value_a['utitle']; // Sets the document title detection option, where 1=on and 0=off. This is a UTM user setting. (default value is 1) 
		$ulink = $value_a['ulink']; //Enables linker functionality, where 1=on and 0=off. This is a UTM user setting. (default value is 0)
		$uanchor = $value_a['uanchor']; //Indicates whether the use of anchors for campaigns is enabled, where 1=enabled and 0=disabled. This is a UTM user setting. (default value is 0)
		$utcp = $value_a['utcp']; //Specifies the cookie path for tracking. This is a UTM user setting. (default value is /)
		$usample = $value_a['usample']; // Represents the sampling percentage of visitors to track, which is a whole number from 1 to 100. This is a UTM user setting. (default value is 100) 	 
		$uctm = $value_a['uctm']; //Sets the campaign tracking module state, where 1=on and 0=off. This is a UTM campaign tracking setting. (default value is 1)
		$ucto = $value_a['ucto']; //Sets the timeout in seconds. This is a UTM campaign tracking setting. (default value is 15768000, or 6 months)
		$uccn = $value_a['uccn']; //The name of the campaign. This is a UTM campaign tracking setting. (default value is utm_campaign)
		$ucmd = $value_a['ucmd']; //Represents the campaign medium. Specify cpc, cpm, link, email or organic. This is a UTM campaign tracking setting. (default value is utm_medium)
		$ucsr = $value_a['ucsr']; //Represents the campaign source. This is a UTM campaign tracking setting. (default value is utm_source)
		$uctr = $value_a['uctr']; //The campaign term or keyword. This is a UTM campaign tracking setting. (default value is utm_term)
		$ucct = $value_a['ucct']; //Represents the campaign content. This is a UTM campaign tracking setting. (default value is utm_content)
		$ucid = $value_a['ucid']; // Represents the campaign ID number. This is a UTM campaign tracking setting. (default value is utm_id) 
		$ucno = $value_a['ucno']; //Indicates whether or not to override the campaign. This is a UTM campaign tracking setting. (default value is utm_nooverride)
		
		return "<script src='http://www.google-analytics.com/urchin.js' type='text/javascript'></script><script type='text/javascript'>_uacct = '".$value_a['account']."';urchinTracker();</script>";
	}
?>