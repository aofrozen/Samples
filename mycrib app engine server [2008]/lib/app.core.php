<?php
/* core application */
$sub_a = array();
$valid_html_elements_a = array('a', 'table', 'mcpage', 'abbr', 'anronym', 'address', 'b', 'bdo', 'big', 'blockquote', 'br', 'caption', 'center', 'cite', 'code', 'dd', 'del', 'dfn', 'dl', 'dt', 'em', 'fieldset', 'font', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'i', 'img', 'embed', 'input', 'ins', 'kbd', 'label', 'legend', 'il', 'option', 'optgroup', 'p', 'pre', 'q', 's', 'samp', 'select', 'small', 'span', 'strike', 'strong', 'style', 'sub', 'sup', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'tr', 'tt', 'u', 'ul', 'var', 'div');
function convert_arg($arg)
	{
		$arg =trim(preg_replace("/'/i", '"', $arg));
		$arg_a = explode("\" ", $arg);
		$total = count($arg_a);
		$key = array_keys($arg_a);
		for($x=0;$x<$total;$x++)
			{
				$temp = explode('=', $arg_a[$x]);
				$data_a[trim(eregi_replace('"', '',$temp[0]))]= eregi_replace('"', '',$temp[1]);
			}
		return $data_a;
	}
function capitalize($value)
	{
		return strtoupper($value);
	}
function antixss($string = NULL)
	{
		if(get_magic_quotes_gpc())
			{
				$string = stripslashes($string);
			}
		$string = html_entity_decode($string, ENT_QUOTES, "ISO-8859-1");
		// convert decimal
		$string = preg_replace('/&#(\d+)/me', "chr(\\1)", $string); // decimal notation
		// convert hex
		$string = preg_replace('/&#x([a-f0-9]+)/mei', "chr(0x\\1)", $string); // hex notation
		$string = preg_replace('#(&\#*\w+)[\x00-\x20]+;#U',"$1;",$string);
		$string = preg_replace('#(<[^>]+[\s\r\n\"\'])(on|xmlns)[^>]*>#iU',"$1>",$string);
		$string = preg_replace('#(&\#x*)([0-9A-F]+);*#iu',"$1$2;",$string);
		$string = preg_replace('#/*\*()[^>]*\*/#i',"", $string); // REMOVE /**/
		$string = preg_replace('#([a-z]*)[\x00-\x20]*([\`\'\"]*)[\\x00-\x20]*j[\x00-\x20]*a[\x00-\x20]*v[\x00-\x20]*a[\x00-\x20]*s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:#iU','',$string); //JAVASCRIPT
		$string = preg_replace('#([a-z]*)([\'\"]*)[\x00-\x20]*v[\x00-\x20]*b[\x00-\x20]*s[\x00-\x20]*c[\x00-\x20]*r[\x00-\x20]*i[\x00-\x20]*p[\x00-\x20]*t[\x00-\x20]*:#iU','',$string);  //VBSCRIPT
		$string = preg_replace('#([a-z]*)[\x00-\x20]*([\\\]*)[\\x00-\x20]*@([\\\]*)[\x00-\x20]*i([\\\]*)[\x00-\x20]*m([\\\]*)[\x00-\x20]*p([\\\]*)[\x00-\x20]*o([\\\]*)[\x00-\x20]*r([\\\]*)[\x00-\x20]*t#iU','',$string);//@IMPORT
		$string = preg_replace('#([a-z]*)[\x00-\x20]*e[\x00-\x20]*x[\x00-\x20]*p[\x00-\x20]*r[\x00-\x20]*e[\x00-\x20]*s[\x00-\x20]*s[\x00-\x20]*i[\x00-\x20]*o[\x00-\x20]*n#iU','',$string); //EXPRESSION
		$string = preg_replace('#</*\w+:\w[^>]*>#i',"",$string);
		do {
		   $oldstring = $string;
		   $string = preg_replace('#</*(applet|meta|xml|blink|link|script|iframe|frame|frameset|ilayer|layer|base|body|xml|AllowScriptAccess)[^>]*>#i',"",$string);
		} while ($oldstring != $string);
		return addslashes($string);			  
	}
$___mcText = '';
function printElements($domNode, $x)
	{
		global $sub_a;
		global $user_id;
		global $style;
		$valid = true;
		global $mc_content;
		global $errors_list;
		global $indent;
		global $valid_html_elements_a;
		global $___mcText;
	 	global $isTextFunc_a;
		if($domNode)
			{	
		if($domNode->node_type() == XML_ELEMENT_NODE)
			{
				//valid html elements
				if(substr($domNode->node_name(), 0,3) != "mc_")
					{
						if(!in_array(strtolower($domNode->node_name()), $valid_html_elements_a))
							{
								$errors_list .= error_noa($domNode->node_name());
								$valid = false;
							}else{
								$valid = true;
							}
					}else{
						$valid = true;
					}
				
				//get attributes
				
				 if($domNode->has_attributes() && $valid)
					 {
						$attributes = $domNode->attributes();
						$arg = null;
						foreach($attributes as $domAttribute)
							{
							 	$arg .= " $domAttribute->name=\"$domAttribute->value\" ";
							}
					  }
				isTextFunction($domNode->node_name());
				//get mc function
				 if(substr($domNode->node_name(), 0,3) == "mc_" && $valid)
					{
						if(count($sub_a) > 0)
							{
								//echo "'1 sub-".$domNode->node_name()."' ";
								$mc_content .= $indent.callSubFunction($domNode->node_name(), $arg);
							}else{
								//echo "'main-".$domNode->node_name()."' ";
								$mc_content .= $indent.callFunction($domNode->node_name(),$arg);
							}
						//check if it is sub function
						
						 if(isSubFunction($domNode->node_name()))
							{
								//echo "'a sub-".$domNode->node_name()."' ";
								if(count($sub_a)<1)
									{
										$mc_content .= $indent.callSubFunction($domNode->node_name(), $arg);
									}
								array_push($sub_a, $domNode->node_name());
								$valid = true;
							}else{
								 $valid = false;
							}
					}elseif($valid){
						//check if it is form
						if(substr($domNode->node_name(),0, 4) == 'form')
							{
								$mc_content .= '<'.trim($indent.$domNode->node_name()).''.$arg.'>'.'<input type=\'hidden\' name=\'id\' value=\''.$user_id.'\'>';
							}else{
								$mc_content .= '<'.trim($indent.$domNode->node_name()).''.$arg.'>';
							}
						
					}
				//check if style
				if($domNode->node_name() == "style")
					{
						$style=true;
					}else{
						$style = false;
					}
		
				if($domNode->has_child_nodes())
					{
						$nextNode = $domNode->first_child();
						if($domNode->node_name() =='#text' && $valid)
							{
								if(in_array($domNode->node_name(), $sub_a))
									{
										array_pop($sub_a);
										if(in_array($domNode->node_name(), $isTextFunc_a))
											{
												array_pop($isTextFunc_a);
												//echo 'remove';
											}
										//$___mcText = '';
									//	echo "<br><b>'b sub-".$domNode->node_name()."'</b> ";
										$mc_content .= $indent.callSubFunction($domNode->node_name(), $arg);
										//echo "<br><b>'main-".$domNode->node_name()."'</b> ";
										$mc_content .= $indent.callFunction($domNode->node_name(),$arg);
										//echo "<br><b>' xxx-".$domNode->node_name()."'</b> ";
										$___mcText = '';
									}else{
										//echo "<br><b>'w other-".$domNode->node_name()."'</b> ";
										$mc_content .= "</".$nextNode->get_content().">";
									}
							}
						$x++;
						printElements($nextNode, $x);
						$indent= substr($indent, 0, strlen($indent)-2);
						if($valid && 'br' != strtolower($domNode->node_name()))
							{
								if(in_array($domNode->node_name(), $sub_a))
									{
										array_pop($sub_a);
										if(in_array($domNode->node_name(), $isTextFunc_a))
											{
												array_pop($isTextFunc_a);
												//echo 'remove';
											}
										//$___mcText = '';
										//echo "<br><b>'c sub-".$domNode->node_name()."'</b> ";
										$mc_content .= $indent.callSubFunction($domNode->node_name(), $arg);
										//echo "<br><b>'main-".$domNode->node_name()."'</b> ";
										$mc_content .= $indent.callFunction($domNode->node_name(),$arg);
										$___mcText = '';
									}else{
										//echo "<br><b>'ho other-".$domNode->node_name()."'</b> ";
										$mc_content .= "</".$domNode->node_name().">";
									}
							}
					}elseif($valid && 'br' != strtolower($domNode->node_name())){
						if(in_array($domNode->node_name(), $sub_a))
							{
								array_pop($sub_a);
								if(in_array($domNode->node_name(), $isTextFunc_a))
									{
										array_pop($isTextFunc_a);
										//echo 'remove';
									}
								//$___mcText = '';
								//echo "<br><b>'e sub-".$domNode->node_name()."'</b> ";
								$mc_content .= $indent.callSubFunction($domNode->node_name(), $arg);
								//echo "<br><b>'main-".$domNode->node_name()."'</b> ";
								$mc_content .= $indent.callFunction($domNode->node_name(),$arg);
								$___mcText = '';
							}else{
								//echo "<br><b>' other-".$domNode->node_name()."'</b> ";
								$mc_content .= "</".$domNode->node_name()." >";
							}
					}                       
				}
			if($domNode->node_name() =='#text' && $valid)
				{
					if($style)
						{
							//echo "<br><b>'e other-".$domNode->get_content()."'</b> ";
							$mc_content .= style_filter($domNode->get_content(),1);
							$style = false;
						}elseif(count($sub_a)<1){
							//echo "<br><b>' other-".$domNode->get_content()."'</b> ";
							$mc_content .= $domNode->get_content();
						}
					
					if(count($sub_a) > 0)
						{
							//echo "<br><b>'x sub-".$domNode->node_name()."'</b> ";
							//echo "<br><b>'o other-".$domNode->get_content()."'</b> ";
							$___mcText = $domNode->get_content();
							//echo 'array:';
							//print_r($isTextFunc_a);
							if(count($isTextFunc_a)<1)
								{
									$mc_content .= $domNode->get_content();
								}
							$mc_content .= $indent.callSubFunction($domNode->node_name(), $arg);
							
						}
				}
			$nextNode = $domNode->next_sibling();
			$x++;
			printElements($nextNode, $x);
		}
	  
	}

function balanceTags($text, $is_comment = 0) 
	{
		$tagstack = array(); 
		$stacksize = 0; $tagqueue = ''; $newtext = '';
		# WP bug fix for comments - in case you REALLY meant to type '< !--'
		$text = str_replace('< !--', '<    !--', $text);
		# WP bug fix for LOVE <3 (and other situations with '<' before a number)
		$text = preg_replace('#<([0-9]{1})#', '&lt;$1', $text);
		$text = preg_replace('#&#', '&amp;', $text);
		while (preg_match("/<(\/?\w*)\s*([^>]*)>/",$text,$regex)) 
			{
				$newtext .= $tagqueue;
				$i = strpos($text,$regex[0]);
				$l = strlen($regex[0]);
				$tagqueue = '';
				// Pop or Push
				if ($regex[1][0] == "/") 
					{ // End Tag
						$tag = strtolower(substr($regex[1],1));
						if($stacksize <= -1) 
							{
								$tag = '';
							}
						// if stacktop value = tag close value then pop
						else if ($tagstack[$stacksize - 1] == $tag) 
							{ // found closing tag
								$tag = '</' . $tag . '>'; // Close Tag
								// Pop
								array_pop ($tagstack);
								$stacksize--;
						} else { // closing tag not at top, search for it
							for ($j=$stacksize-1;$j>=0;$j--) 
								{
									if ($tagstack[$j] == $tag) 
										{
											// add tag to tagqueue
											for ($k=$stacksize-1;$k>=$j;$k--)
												{
													$tagqueue .= '</' . array_pop ($tagstack) . '>';
													$stacksize--;
												}
											break;
										}
								}
							$tag = '';
						}
					} else { // Begin Tag
						$tag = strtolower($regex[1]);
						// If self-closing or '', don't do anything.
						if((substr($regex[2],-1) == '/') || ($tag == ''))
							{
							
							}elseif ($tag == 'br' || $tag == 'img' || $tag == 'hr' || $tag == 'input') 
								{
									$regex[2] .= '/';
								} else { // Push the tag onto the stack
									// If the top of the stack is the same as the tag we want to push, close previous tag
									if (($stacksize > 0) && ($tag != 'div') && ($tagstack[$stacksize - 1] == $tag))
										{
											$tagqueue = '</' . array_pop ($tagstack) . '>';
											$stacksize--;
										}
									$stacksize = array_push ($tagstack, $tag);
							}
						// Attributes
						$attributes = $regex[2];
						if($attributes) 
							{
								$attributes = ' '.$attributes;
							}
						$tag = '<'.$tag.$attributes.'>';
						//If already queuing a close tag, then put this tag on, too
						if ($tagqueue) 
							{
								$tagqueue .= $tag;
								$tag = '';
							}
					}
				$newtext .= substr($text,0,$i) . $tag;
				$text = substr($text,$i+$l);
			} 	
		// Clear Tag Queue
		$newtext .= $tagqueue;
		// Add Remaining text
		$newtext .= $text;
		// Empty Stack
		while($x = array_pop($tagstack)) 
			{
				$newtext .= '</' . $x . '>'; // Add remaining tags to close
			}
				// WP fix for the bug with HTML comments
				$newtext = str_replace("< !--","<!--",$newtext);
				$newtext = str_replace("<    !--","< !--",$newtext);
				return $newtext;
	}

function style_filter($string, $app_id)
	{
		$pattern = '/}.*?/i';
		$replace = " }\n";
		$string = preg_replace($pattern, $replace, $string);
		$pattern = '/(.*?){/i';
		$replace = ' .app_content_'.$app_id." $1"."{";
		$string = preg_replace($pattern, $replace, $string);
		return $string;
	}
	
function getRequest($url, $post=null)
	{
		$ch = curl_init();    // initialize curl handle
		curl_setopt($ch, CURLOPT_URL,$url); // set url to post to
		curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
		//curl_setopt($ch, CURLOPT_FAILONERROR, 1);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1); // return into a variable
		curl_setopt($ch, CURLOPT_TIMEOUT, 1); // times out after 4s
		$result = curl_exec($ch); // run the whole process
		curl_close($ch);
		$result = eregi_replace("mc\:", "mc_", $result);
		return antixss($result);
	}

function error_type($errormsg = null, $nodename = null, $line)
	{
		$error = "<font color='red' weight='bold'>Complie Error:</font> ";
		$error_line = ' Line: '.$line;
		if(eregi("StartTag: invalid element name", $errormsg))
			{
				return $error.$nodename." is invalid element name. ".$error_line."<br>";
			}
		if(eregi('Specification mandate value for attribute', $errormsg))
			{
				return $error."attribute is invalid".$error_line."<br>";
			}
	}
function validiate_session_key($uid, $session_key) //validiate user for app
	{
		global $api_key;
		//permanent session key (perm-xxxxxxxxxxxx)
		if(substr($session_key, 0, 4)=='perm')
			{
				$type = 'perm';
				$result = query("select id from app_client where sid = '$session_key' and api_key = '$api_key';");
				$get_data = mysql_fetch_assoc($result);
				if($get_data['id'])
					{
						$status = true;
					}else{
						$status = false;
					}
			}else{
				$type = 'temp';
				$result = query("select id from app_client where uid = '$uid';");
				$get_data = mysql_fetch_assoc($result);
				if(!$get_data['id'])
					{
						$status =  false;
					}else{
						$status = true;
					}
				$result = query("select session_id from member_online where member_id = '$uid';");
				$get_data = mysql_fetch_assoc($result);
				$temp_session_id = $get_data['session_id'];
			}
		if($type == 'perm' && $status == true)
			{
				return true;
			}elseif($type == 'perm'){
				return false;
			}elseif($type == 'temp' && $status == true){
				return true;
			}elseif($type == 'temp' && $status == false){
				return false;
			}
		
			
	}
function gen_sig($params_a, $secret) 
	{
		$str = '';
		ksort($params_a);
		foreach ($params_a as $k=>$v) 
			{
				 $str .= "$k=$v";
			}
		return md5($str.$secret);
	}
function get_app_info($canvas_page_url)
	{
		global $user_id;
		$result = query('select canvas_page_url, user_id, app_name, api_key, secret_key, email_support, callback_url, tos_url, post_remove_url, description, privacy_url, help_url, icon from app where canvas_page_url = \''.$canvas_page_url.'\'');
		$app_info_a = array();
		$app_info_a['canvas_page_url'] = $canvas_page_url;
		while($get_data = mysql_fetch_assoc($result))
			{
				//$app_info_a['private'] = $get_data['private'];
				$app_info_a['api_key'] = $get_data['api_key'];
				$app_info_a['secret_key'] = $get_data['secret_key'];
				$app_info_a['email_support'] = $get_data['email_support'];
				$app_info_a['callback_url'] = $get_data['callback_url'];
				$app_info_a['tos_url'] = $get_data['tos_url'];
				$app_info_a['post_remove_url'] = $get_data['post_remove_url'];
				$app_info_a['description'] = $get_data['description'];
				$app_info_a['privacy_url'] = $get_data['privacy_url'];
				$app_info_a['help_url'] = $get_data['help_url'];
				$app_info_a['icon'] = $get_data['icon'];
			}
		$result = query("select session_key from app_clients where user_id = '$user_id' and api_key='".$app_info_a['api_key']."';");
		$get_data = mysql_fetch_assoc($result);
		$app_info_a['session_key'] = $get_data['session_key'];
		return $app_info_a;
	}
function error_noa($error)
	{
				$list = null;
				$list .= "<font color='red' weight='bold'>Complie Error:</font> ";
				$list .= $error.' is not valid element.';
				$list .= '<br>';
				return $list;
	}

function error($errors_a)
	{
		$list = null;
		$errors_total = count($errors_a);
		for($x=0;$x<$errors_total;$x++)
			{
				$list .= error_type($errors_a[$x]['errormessage'], $errors_a[$x]['nodename'], $errors_a[$x]['line']);
			}
		return $list;
	}
?>