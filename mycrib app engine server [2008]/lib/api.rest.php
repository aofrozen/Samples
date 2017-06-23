<?php
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
				//echo "Post: $post<br><br>";
				if(function_exists('curl_init'))
					{
						$ch = curl_init();    // initialize curl handle
						curl_setopt($ch, CURLOPT_URL, 'http://mycribweb2.krypt.com/test/api.php'); // set url to post to
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