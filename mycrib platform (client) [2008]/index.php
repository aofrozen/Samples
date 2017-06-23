<?php
/*
MyCrib Platform PHP4 client                                               
 
  Copyright (c) 2008 MyCrib, Inc.                                           
  All rights reserved.                                                      
                                                                            
  Redistribution and use in source and binary forms, with or without        
  modification, are permitted provided that the following conditions        
  are met:                                                                  
                                                                            
  1. Redistributions of source code must retain the above copyright         
     notice, this list of conditions and the following disclaimer.          
  2. Redistributions in binary form must reproduce the above copyright      
     notice, this list of conditions and the following disclaimer in the    
     documentation and/or other materials provided with the distribution.   
                                                                            
  THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR      
  IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES 
  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.   
  IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,          
  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT  
  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, 
  DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY     
  THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT       
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF  
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.         
 
For help with this library, contact justin@mycrib.net
*/
/* mycrib api [beta] */
require_once('class/IsterXmlSimpleXMLImpl.php');
$api_key = '';
$secret_key = '';
$mycrib = new mycrib($api_key, $secret_key);

/*
MYCRIB SESSION HELP INFORMATION

function name: getDisplayName(user_id); 
information: you can check user's browser cookie for user id and session key information. if they are not existed then user will have to log in mycrib login for new session.
example below:

*/

$online_user_info = $mycrib->mc_api_client->getDefaultPhoto($mycrib->user);
if($online_user_info['owner'][0])
	{
		echo "Session User ID: ".$online_user_info['owner'][0]." <br>Session Key: ".$mycrib->mc_api_client->session_key."<br>Hello ".$online_user_info['display_name'][0]." =]<br><img src='http://".$online_user_info['default_photo'][0]."'>";
	}else{
		echo "<h2>You need to log in mycrib first before access mycrib application =/</h2>";
	}

/*
API TEST BELOW
*/
echo "<h2>API tests below:</h2>";
/*
API HELP INFORMATION

function name: getDefaultPhoto(user_id); 
information: you can put more than one user id in the function.
array: owner, default_photo, display_name
example below:

*/
$photos_list = $mycrib->mc_api_client->getDefaultPhoto("1,2,3,4,5,6,7,8,9,10");
$photos_total = count($photos_list['default_photo']);
for($x=0;$x<$photos_total;$x++)
	{
		if($photos_list['default_photo'][$x])
			{
				echo "<img src='http://".$photos_list['default_photo'][$x]."' width='75'><br>".$photos_list['display_name'][$x]."<br>";
			}else{
				echo "owner id ".$photos_list['owner'][$x]." has no image =/<br>";
			}
	}
	
/* end example */

/*
API HELP INFORMATION

function name: areFriends(user_id, friend_id); 
information: you can put user id and friend in the function. it will check if user is a friend or not.
array: are_friends(false/true)
example below:

*/
$friends = $mycrib->mc_api_client->areFriends(1, 9);
if($friends['are_friends'][0])
	{
		echo "Yes owner id 1 is a friend of owner id 9.<br>";
	}else{
		echo "No owner id 1 is not a friend of owner id 9.<br>";
	}
$friends = $mycrib->mc_api_client->areFriends(1, 9543534);
if($friends['are_friends'][0])
	{
		echo "Yes owner id 1 is a friend of owner id 9543534.<br>";
	}else{
		echo "No owner id 1 is not a friend of owner id 9543534.<br>";
	}
/* end example */

/*
API HELP INFORMATION

function name: getDisplayName(user_id); 
information: you can put more than one user id in the function.
array: owner, display_name
example below:

*/
$display_name_list = $mycrib->mc_api_client->getDisplayName("1,2,3,4,5,6,7,8,9,10,");
$display_name_total = count($display_name_list['display_name']);
for($x=0;$x<$display_name_total;$x++)
	{
		echo $display_name_list['display_name'][$x]."<br>";
	}
	
/* end example */

echo 'API has been excuted';
class mycrib
	{
		var $api_key;
		var $secret;
		var $mycrib;
		var $mycrib_client;
		var $session_key;
		var $user;
		//print('init...');
		function mycrib($api_key, $secret)
			{
				$this->api_key = $api_key;
				$this->secret = $secret;
				$this->mc_api_client = new mycrib_api_client($api_key, $secret, $this);
				$this->validate_mc_params();
			}
		function get_mycrib_url($subdomain = 'app.')
			{
				return 'http://'.$subdomain.'mycrib.net';
			}
		function get_add_url($next=null)
			{
				$this->redirect($this->get_mycrib_url().'/?tag=add&api_key='.$this->api_key.(empty($next) ? '&next='.urlencode($next) : ''));
			}
		function redirect($url=null)
			{
				echo '<mc_redirect url="'.$url.'/">';
				exit;
			}
		function current_url()
			{
				return 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
			}
		function get_login_url($next=null)
			{
				$this->redirect($this->get_mycrib_url().'/signin.php?v=1.0&api_key='.$this->api_key.(empty($next) ? urlencode($next) : ''));
			}
		function get_install_url()
			{
				$this->redirect($get_mycrib_url().'"/?tag=install&api_key='.$this->api_key);
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
		function no_magic_quotes($val)
			{
				if(get_magic_quotes_gpc())
					{
						return stripslashes($val);
					}else{
						return $val;
					}
			}
		function set_user_cookie($user_id=null, $session_key=null, $expires=null)
			{
				//echo "cookie";
				if ((!isset($_COOKIE[$this->api_key . '_user']) || $_COOKIE[$this->api_key . '_user'] != $user_id)) 
					{
					//echo "creating ".(time()+5000);
					  $cookies = array();
					  $cookies['user'] = $user_id;
					  $cookies['session_key'] = $session_key;
					  $sig = $this->gen_sig($cookies, $this->secret);
					  foreach ($cookies as $name => $val) 
						{
							setcookie($this->api_key . '_' . $name, $val, $expires);
							$_COOKIE[$this->api_key . '_' . $name] = $val;
							//echo "<br><br>$this->api_key . '_' . $name, $val, $expires";
						}
					  setcookie($this->api_key, $sig, $expires);
					  $_COOKIE[$this->api_key] = $sig;
					}
				$this->user = $user_id;
				$this->session_key = $session_key;
				//$this->session_key = $session_key;
			}
		
		function validate_mc_params() 
			{
				$this->mc_params = $this->get_valid_mc_params($_REQUEST, null, 'mc_sig');
				//print_r($this->mc_params);
				if ($this->mc_params) 
					{
						$user_id = isset($this->mc_params['user']) ? $this->mc_params['user'] : null;
			  			$session_key = isset($this->mc_params['session_key']) ? $this->mc_params['session_key'] : null;
			  			$expires = isset($this->mc_params['expires']) ? $this->mc_params['expires'] : null;
			  			$this->set_user_cookie($user_id, $session_key, $expires);
					} else if (!empty($_COOKIE) && $cookies = $this->get_valid_mc_params($_COOKIE, null, $this->api_key)) {
					  $this->set_user_cookie($cookies['user'], $cookies['session_key']);
					}
		
				return !empty($this->mc_params);
		 	}
		function get_valid_mc_params($params, $expired=null, $namespace='mc_sig')
			{
				$prefix = $namespace . '_';
				$prefix_len = strlen($prefix);
				$mc_params = array();
				
				foreach ($params as $name => $val) {
				  if (strpos($name, $prefix) === 0) {
					$mc_params[substr($name, $prefix_len)] = $this->no_magic_quotes($val);
				  }
				}
				$params[$namespace] = $this->gen_sig($mc_params, $this->secret);
				if ($expired && (!isset($mc_params['time']) || time() - $mc_params['time'] > $expired)) {
				  return array();
				}
				if (!isset($params[$namespace]) || !$this->verify_sig($mc_params, $params[$namespace])) {
				  return array();
				}
				return $mc_params;
			}
		function verify_sig($mc_params, $sig) 
			{
				return $this->gen_sig($mc_params, $this->secret) == $sig;
			}
	}

class mycrib_api_client
	{
		var $secret;
		var $session_key;
		var $api_key;
		var	$mycrib;
		function mycrib_api_client($api_key, $secret, &$mycrib, $session_key=null)
			{
				$this->api_key = $api_key;
				$this->secret = $secret;
				$this->mycrib = &$mycrib;
				$this->session_key = $session_key;
			}
		function areFriends($user_id, $friend_id)
			{
				return $this->callMethod('mycrib.friend.areFriends', array('uid1' => $user_id, 'uid2' => $friend_id));
			}
		function getDefaultPhoto($user_id_a = null)
			{
				return $this->callMethod('mycrib.user.getDefaultPhoto', array('uid_a' => $user_id_a));
			}
		function getDisplayName($user_id_a = null)
			{
				return $this->callMethod('mycrib.user.getDisplayName', array('uid_a' => $user_id_a));
			}
		function isAppAdded($user_id)
			{
				return $this->callMethod('mycrib.user.isAppAdded', array('uid' => $user_id));
			}
		function callMethod($method=null, $params)
			{
				$xml_data = $this->post_request($method, $params);
				$xml_impl = new IsterXmlSimpleXMLImpl();
				$xml_string = $xml_impl->load_string($xml_data);
				$result = array();
				$children = $xml_string->children();
				$result = $this->convert_simplexml_to_array($children[0]);
				return $result;
			}
		function convert_simplexml_to_array($xml_string)
			{
				//print_r($xml_string);
				if($xml_string) 
					{
				 		$data = array();
				 		$attrs = $xml_string->attributes();
				 		foreach ($xml_string->children() as $child)
							{
								if(!empty($attrs['list']))
									{
										$data[] = urldecode($this->convert_simplexml_to_array($child));
									}else{
										$data[$child->___n][] = urldecode($this->convert_simplexml_to_array($child));
									}
				  			}
						 if (sizeof($data) > 0)
						 	{
								return $data;
							}else{
								return $xml_string->CDATA();
							}
					}else{
						return '';
					}

			}
		function post_request($method=null, $params)
			{
				$post_params = array();
				$params['method'] = $method;
				$params['api_key'] = $this->api_key;
				$params['session_key'] = $this->mycrib->session_key;
				$params['version'] = 'beta';
				foreach($params as $key=>$val)
					{
						$post_params[] .= $key.'='.$val;
					}
				$sig = $this->mycrib->gen_sig($params, $this->secret);
				$post_params[] .= 'sig='.$sig;
				$post = implode("&", $post_params);
				if(function_exists('curl_init'))
					{
						$ch = curl_init();    // initialize curl handle
						curl_setopt($ch, CURLOPT_URL, 'http://app.mycrib.net/api.php'); // set url to post to
						curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
						curl_setopt($ch, CURLOPT_RETURNTRANSFER,1); // return into a variable
						curl_setopt($ch, CURLOPT_USERAGENT, 'MyCrib API PHP4 Client beta (curl) ' . phpversion());
						$result = curl_exec($ch);
						curl_close($ch);
						return $result;
					}else{
						die("Error: MyCrib API requires curl support.");
					}
			}
	}
?>
