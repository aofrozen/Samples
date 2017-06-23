<?php

/* embed application */
function get_iframe($arg)
	{
		global $user_id;
		global $app_info_a;
		$post_params = array();
		$value_a = convert_arg($arg);
		$frameborder = ($value_a['frameborder']) ? "frameborder='".$value_a['frameborder']."'" : "frameborder='0'";
		$scrolling = ($value_a['scrolling']) ? "scrolling='".$value_a['scrolling']."'" :'';
		$width = ($value_a['width']) ? "width='".$value_a['width']."'" : '';
		$height = ($value_a['height']) ? "height='".$value_a['height']."'" : '';
		$src = $value_a['src'];
		$params_data = explode("?", $src);
		$url = $params_data[0];
		$params = explode("&", $params_data[1]);
		$params['mc_sig_user'] = $user_id;
		$params['mc_sig_time'] = time();
		$params['mc_sig_expires'] = 60*60*5+time();
		$params['mc_sig_session_key'] = $app_info_a['session_key'];
		$params['mc_sig_profile'] = $user_id;
		foreach($params as $key=>$val)
			{
				$post_params[] .= $key.'='.urlencode($val);
			}
		$post_params['mc_sig'] = 'mc_sig='.gen_sig($post_params, $app_info_a['secret_key']);
		$post = substr(implode("&", $post_params),3);
		return "<iframe src='".$url.'?'.$post."' $width $height $scrolling $frameborder></iframe>";
	}
function get_photo($arg)
	{
		$value_a = convert_arg($arg);
		$size = $value_a['size']; //thumbnail or normal
		$pid = $value_a['pid'];
		$uid = $value_a['uid'];
		$result = query('');
		return $data;
		
	}

function get_flv($arg)
	{
		$value_a = convert_arg($arg);
		$src = $value_a['src'];
		$height = $value_a['height'];
		$width = $value_a['width'];
		$title = $value_a['title'];
	}

function get_swf($arg)
	{
		$value_a = convert_arg($arg);
		$swfsrc = $value_a['swfsrc'];
		$imgsrc = $value_a['imgsrc'];
		$height = $value_a['height'];
		$width = $value_a['width'];
		$imgstyle = $value_a['imgstyle'];
		$imgclass = $value_a['imgclass'];
		$flashvars = $value_a['flashvars'];
		$swfbgcolor = $value_a['swfbgcolor'];
		$salign = $value_a['salign'];
		$loop = $value_a['loop'];
		$quality = $value_a['quality'];
		$scale = $value_a['scale'];
		$align = $value_a['align'];
		$wmode = $value_a['wmode'];
		/*
		sig here
		*/
	}

?>