<?php
/* cache */
$cache_salt = '43298-mc-3432-xdfe';
$memcache_server = array('192.168.0.3','192.168.0.30','192.168.0.5');
function int_cache()
	{
		$mc_cache = new Memcache;
		return $mc_cache;
	}
	
function connect_rand_memcache()
	{
		global $memcache_server;
		global $memcache;
		if(!is_object($memcache))
			{
				$memcache = new Memcache;
			}
		$total = count($memcache_server);
		return $memcache->connect(rand(0,$total-1), 11211);
	}
function connect_memcache($id)
	{
		global $memcache_server;
		global $memcache;
		if(!is_object($memcache))
			{
				$memcache = new Memcache;
			}
		
		$server_id = $id%3;
		$memcache->connect($memcache_server[$server_id], 11211);
		return $memcache;
	}
	
function add_cache_server($mc_cache, $ip, $port)
	{
		return $mc_cache->addServer($ip, $port);
	}

function get_cache($mc_cache, $key)
	{
		global $cache_salt;
		return $mc_cache->get(md5($key.$cache_salt));
	}
	
function delete_cache($mc_cache, $key, $timeout = 1)
	{
		global $cache_salt;
		return $mc_cache->delete(md5($key.$cache_salt), $timeout);
	}
	
function close_cache($mc_cache)
	{
		return $mc_cache->close();
	}
	
function set_cache($mc_cache, $key, $value, $ttl)
	{
		global $cache_salt;
		return $mc_cache->set(md5($key.cache_salt), $value, false);
	}
int_cache();
?>