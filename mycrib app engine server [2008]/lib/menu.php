<?php
$URLHOST = 'http://mycrib.net';
$PROFILE_MEMBER_ID = (!empty($PROFILE_MEMBER_ID)) ? $PROFILE_MEMBER_ID : NULL;

function get_ads($personal_menu = null)
	{
		global $PAGE_ID;
		global $country_code;
		if($personal_menu != 1 && $PAGE_ID != 'mycrib.member.profile.home' && $PAGE_ID != 'mycrib.mail' && $country_code = 'US' && $PAGE_ID != NULL)
			{ 
				if(is_array($ads_data))
					{
						/*
						duration
						times
						ad data
						*/
						return '<IFRAME FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=728 HEIGHT=90 SRC="http://mycrib.net/ads/index.html"></IFRAME>'; 
					}else{
						return '<IFRAME FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=728 HEIGHT=90 SRC="http://mycrib.net/ads/index.html"></IFRAME>';
					}
		
			}elseif($country_code = 'US' && $PAGE_ID == NULL){
				return '<IFRAME FRAMEBORDER=0 MARGINWIDTH=0 MARGINHEIGHT=0 SCROLLING=NO WIDTH=728 HEIGHT=90 SRC="http://mycrib.net/ads/index.html"></IFRAME>'; 
			}
	}
function get_main_menu($user_id, $personal_menu)
	{
		global $PAGE_ID;
		global $country_code;
		$sign_out_array = array(
		'MyCrib' => 'http://mycrib.net/?pageid=mycrib.member.profile.home', 
		'Journal' => 'http://mycrib.net/?pageid=mycrib.member.journal',
		'Groups' => 'http://mycrib.net/?pageid=mycrib.groups', 
		'Games' => 'http://mycrib.net/games.php', 
		'Browse' => 'http://mycrib.net/?pageid=mycrib.browse',
		'Search' => 'http://mycrib.net/?pageid=mycrib.search',
		'Music' => 'http://mycrib.net/?pageid=mycrib.music',
		'Video' => 'http://mycrib.net/video.php',
		'Sign In' => 'http://mycrib.net/signin.php');
		
		
		$sign_in_array = array(
		'MyCrib' => 'http://mycrib.net/?pageid=mycrib.member.profile.home', 
		'Journal' => 'http://mycrib.net/?pageid=mycrib.member.journal',
		'Groups' => 'http://mycrib.net/?pageid=mycrib.groups', 
		'Games' => 'http://mycrib.net/games.php', 
		'Browse' => 'http://mycrib.net/?pageid=mycrib.browse',
		'Search' => 'http://mycrib.net/?pageid=mycrib.search',
		'Music' => 'http://mycrib.net/?pageid=mycrib.music',
		'Video' => 'http://mycrib.net/video.php',
		'Sign Out' => 'http://mycrib.net/signout.php');
		
		$personal_menu_array = array(
		'Account Settings' => 'http://mycrib.net/?pageid=mycrib.account.settings', 
		'Profile' => 'http://mycrib.net/?pageid=mycrib.member.profile&ID=1',
		'Mail' => 'http://mycrib.net/?pageid=mycrib.mail&mp=m',
		'Journal' => 'http://mycrib.net/?pageid=mycrib.member.journal',
		'Photos' => 'http://mycrib.net/?pageid=mycrib.member.profile.upload.image',
		'Videos' =>'http://mycrib.net/?pageid=mycrib.video.uploader',
		'Friends' => 'http://mycrib.net/?pageid=mycrib.friends.page',
		'Chatroom' => 'http://mycrib.net/?pageid=mycrib.chatroom'); 
		if($user_id)
			{
				$data = '<div id=\'navigator\'><table width=\'780\' border=\'0\' cellspacing=\'0\' cellpadding=\'0\'><tr><td><div align=\'center\'><table width=\'100%\' border=\'0\' cellpadding=\'0\' cellspacing=\'0\'><tr><td><div align=\'center\'><table width=\'780\' border=\'0\' cellpadding=\'4\' cellspacing=\'0\'><tr><td width=\'125\' bgcolor="#213C5A" ><strong><a href=\'/\'><img src=\'http://cache2.mycrib.net/templates/images/mycrib_logo.png\' width=\'100\' height=\'34\' border=\'0\' /></a></strong></td><td valign=\'bottom\' bgcolor=\'#213C5A\'  background="http://cache2.mycrib.net/templates/images/mycrib_m_bk.jpg"><div align=\'left\' class=\'mc_menu\'>';
				foreach($sign_in_array as $value => $url)
					{
						$data .= '&nbsp;&nbsp;&nbsp;<a href=\''.$url.'\'>'.$value.'</a>';
					}
				$data .= '</div></td></tr></table></div></td></tr></table></div></td></tr><tr><td valign=\'bottom\'  bgcolor=\'#396DA5\' style=\'height:4px; background-repeat:no-repeat;\'></td></tr>';
				if($personal_menu == 1)
					{
						$data .= '<tr><td valign=\'middle\'  bgcolor=\'#BD1818\' style=\'height:25px; background-repeat:no-repeat;\'><div class=\'menu\' align=\'left\'><strong>';
						foreach($personal_menu_array as $value => $url)
							{
								$data .= '&nbsp;&nbsp;&nbsp;<a href=\''.$url.'\' class=\'whitelink\'>'.$value.'</a>';
							}
						$data .= '</div></td>';
					}
			}else{
				$data = '<table width=\'780\' border=\'0\' cellspacing=\'0\' cellpadding=\'0\'><tr><td class=\'mycrib_logo_menu_background\'><div align=\'center\'><table width=\'100%\' border=\'0\' cellpadding=\'0\' cellspacing=\'0\'><tr><td><div align=\'center\'><table width=\'780\' border=\'0\' cellpadding=\'4\' cellspacing=\'0\'><tr><td width=\'125\' bgcolor="#213C5A"><strong><a href=\'/\'><img src=\'http://cache2.mycrib.net/templates/images/mycrib_logo.png\' width=\'100\' height=\'34\' border=\'0\' /></a></strong></td><td valign=\'bottom\' bgcolor=\'#213C5A\' background="http://cache2.mycrib.net/templates/images/mycrib_m_bk.jpg"><div align=\'left\' class=\'mc_menu\'>';
				foreach($sign_out_array as $value => $url)
					{
						$data .= '&nbsp;&nbsp;&nbsp;<a href=\''.$url.'\'>'.$value.'</a>';
					}
				$data .= '</div></td></tr></table></div></td></tr></table></div></td></tr><tr><td valign=\'bottom\'  bgcolor=\'#396DA5\' style=\'height:4px; background-repeat:no-repeat;\'></td></tr>';
			}
		$data .= '</tr></table>'.get_ads($personal_menu).'</div>';
		return $data;
	}
	
function get_bottom()
	{
		$bottom_menu_array = array(
		'About' => '/about.php', 
		'Code' => '/dream.php',
		'Terms' => '/terms.php',
		'Privacy' => '/privacy.php',
		'Safety Tips' => '/safety.php',
		'Help' => '/?pageid=mycrib.faq',
		'Contact Us' => '/contact.php');
		$data = '<div align=\'center\' class=\'page_footer\'><table width=\'780\' border=\'0\' align=\'center\' cellpadding=\'4\' cellspacing=\'0\'><tr><td>';
		foreach($bottom_menu_array as $value => $url)
			{
				$data .= '&nbsp;&nbsp;&nbsp;<a href=\''.$url.'\' class=\'nounderline\'>'.$value.'</a>';
			}
		$data .= '</td></tr></table><div align="center" class="copyright">&copy;2006-2007 MyCrib All Rights Reserved</div></div>
    <script src=\'http://www.google-analytics.com/urchin.js\' type=\'text/javascript\'></script>
      <script type=\'text/javascript\'>_uacct = \'UA-803095-1\';urchinTracker();</script>';
		return $data;
	}
	
function get_admin_menu($access, $admin_permission)
	{
		if($access == 2)	
			{
				$admin_menu = NULL;
						if($ADMIN_PERMISSION['REPORT_LIST_ACCESS'] == 1)
					{
						$admin_menu .= '<a href=\'/?pageid=mycrib.admin.report\' class=\'menu3_link\'>Reports List</a>&nbsp;&nbsp;&nbsp;';
					}
				if($ADMIN_PERMISSION['SUSPEND_ACCESS'] == 1)
					{
						$admin_menu .= '<a href=\'/?pageid=mycrib.admin.suspend.account\' class=\'menu3_link\'>Suspend Account</a>&nbsp;&nbsp;&nbsp;';
					}
				if($ADMIN_PERMISSION['ACCOUNT_CHANGE_ACCESS'] == 1)
					{
						$admin_menu .= '<a href=\''.$URLHOST.'/?pageid=mycrib.admin.change.account.settings\' class=\'menu3_link\'>Change Account Settings</a>&nbsp;&nbsp;&nbsp;';
					}
				if($ADMIN_PERMISSION['ANNOUCEMENT_ACCESS'] == 1)
					{
						$admin_menu .= '<a href=\''.$URLHOST.'/?pageid=mycrib.admin.announce\' class=\'menu3_link\'>Annoucement</a>&nbsp;&nbsp;&nbsp;';
					}
				if($ADMIN_PERMISSION['ADMIN_CHANGE_ACCESS'] == 1)
					{
						//$admin_menu .= '<a href=\''.$URLHOST.'/?pageid=mycrib.admin.organization\' class=\'menu3_link\'>Admin Organization</a>&nbsp;&nbsp;&nbsp;';
					}
				if($ADMIN_PERMISSION['FAKERSBUSTED_ACCESS'] == 1)
					{
						$admin_menu .= '<a href=\'/?pageid=mycrib.fakersbusted.submit&type=admin.fakersbusted.review\' class=\'menu3_link\'>FakersBusted</a>&nbsp;&nbsp;&nbsp;';
					}
			}
		return $admin_menu;
	}

$MENU_SIGN_INX = '<table width=\'780\' border=\'0\' cellspacing=\'0\' cellpadding=\'0\'><tr><td class=\'mycrib_logo_menu_background\'><div align=\'center\'><table width=\'100%\' border=\'0\' cellpadding=\'0\' cellspacing=\'0\'><tr><td><div align=\'center\'><table width=\'780\' border=\'0\' cellpadding=\'0\' cellspacing=\'0\'><tr><td width=\'125\'><strong><a href=\'/\'><img src=\'templates/images/mc2.gif\' width=\'100\' height=\'45\' border=\'0\' /></a></strong></td><td valign=\'bottom\'><div align=\'left\'><strong>&nbsp;&nbsp;&nbsp;<a href=\'/?pageid=mycrib.member.profile.home\' class=\'nounderline\'>MyCrib</a>&nbsp;&nbsp;&nbsp;<a href=\'/?pageid=mycrib.member.journal&amp;ID=\' class=\'nounderline\'>Journal</a>&nbsp;&nbsp;&nbsp;<a href=\'/?pageid=mycrib.groups\' class=\'nounderline\'>Groups</a>&nbsp;&nbsp;&nbsp;<a href=\'/games.php\' class=\'nounderline\'>Games</a>&nbsp;&nbsp;&nbsp;<a href=\'/?pageid=mycrib.browse\' class=\'nounderline\'>Browse</a>&nbsp;&nbsp;&nbsp;<a href=\'/?pageid=mycrib.search\' class=\'nounderline\'>Search</a>&nbsp;&nbsp;&nbsp;<a href=\'/?pageid=mycrib.music\' class=\'nounderline\'>Music</a>&nbsp;&nbsp;&nbsp;<a href=\'/signout.php\' class=\'nounderline\'>Sign Out</a></div></strong></td></tr></table></div></td></tr></table><img src=\'templates/images/bar.gif\' width=\'780\' height=\'50\' /></div></td></tr>'.((!empty($CHATROOM_URL)) ? '<tr><td valign=\'middle\'  bgcolor=\'#BD1818\' style=\'height:25px; background-repeat:no-repeat;\'><div class=\'menu\' align=\'left\'><strong>&nbsp;&nbsp;&nbsp;<a href=\'/?pageid=mycrib.account.settings\' class=\'whitelink\'>Accounts Settings</a></strong> <strong> &nbsp;&nbsp;&nbsp;<a href=\'/?pageid=mycrib.member.profile&ID='.$user_id.'\' class=\'whitelink\'>Profile</a> &nbsp;&nbsp;&nbsp;<a href=\'/?pageid=mycrib.mail&mp=m\' class=\'whitelink\'>Mail</a> &nbsp;&nbsp;&nbsp; <a href=\'/?pageid=mycrib.member.journal\' class=\'whitelink\'>Journal</a> &nbsp;&nbsp;&nbsp; <a href=\'/?pageid=mycrib.member.profile.upload.image\' class=\'whitelink\'>Photos</a> &nbsp;&nbsp;&nbsp;<a href=\'/?pageid=mycrib.video.uploader\' class=\'whitelink\'>Videos</a>&nbsp;&nbsp;&nbsp;<a href=\'/?pageid=mycrib.friends.page\' class=\'whitelink\'>Friends</a></strong> <strong> &nbsp;&nbsp;&nbsp;<a href=\'/?pageid=mycrib.chatroom\' class=\'whitelink\'>Chatroom</a></strong></div></td>' : NULL).'</tr></table>';
if($user_id)
	{
$LOGIN2 = '<table width=\'780\' border=\'0\' cellspacing=\'0\' cellpadding=\'0\'><tr><td class=\'mycrib_logo_menu_background\'><div align=\'center\'><table width=\'100%\' border=\'0\' cellpadding=\'0\' cellspacing=\'0\'><tr><td><div align=\'center\'><table width=\'780\' border=\'0\' cellpadding=\'0\' cellspacing=\'0\'><tr><td width=\'125\'><strong><a href=\'/\'><img src=\'templates/images/mc2.gif\' width=\'100\' height=\'45\' border=\'0\' /></a></strong></td><td valign=\'bottom\'><div align=\'left\'><strong>&nbsp;&nbsp;&nbsp;<a href=\'/?pageid=mycrib.member.profile.home\' class=\'nounderline\'>MyCrib</a>&nbsp;&nbsp;&nbsp;<a href=\'/?pageid=mycrib.member.journal&amp;ID=\' class=\'nounderline\'>Journal</a>&nbsp;&nbsp;&nbsp;<a href=\'/?pageid=mycrib.groups\' class=\'nounderline\'>Groups</a>&nbsp;&nbsp;&nbsp;<a href=\'/games.php\' class=\'nounderline\'>Games</a>&nbsp;&nbsp;&nbsp;<a href=\'/?pageid=mycrib.browse\' class=\'nounderline\'>Browse</a>&nbsp;&nbsp;&nbsp;<a href=\'/?pageid=mycrib.search\' class=\'nounderline\'>Search</a>&nbsp;&nbsp;&nbsp;<a href=\'/?pageid=mycrib.music\' class=\'nounderline\'>Music</a>&nbsp;&nbsp;&nbsp;<a href=\'/signout.php\' class=\'nounderline\'>Sign Out</a></div></strong></td></tr></table></div></td></tr></table><img src=\'templates/images/bar.gif\' width=\'780\' height=\'50\' /></div></td></tr>'.((!empty($CHATROOM_URL)) ? '<tr><td valign=\'middle\'  bgcolor=\'#BD1818\' style=\'height:25px; background-repeat:no-repeat;\'><div class=\'menu\' align=\'left\'><strong>&nbsp;&nbsp;&nbsp;<a href=\'/?pageid=mycrib.account.settings\' class=\'whitelink\'>Accounts Settings</a></strong> <strong> &nbsp;&nbsp;&nbsp;<a href=\'/?pageid=mycrib.member.profile&ID='.$user_id.'\' class=\'whitelink\'>Profile</a> &nbsp;&nbsp;&nbsp;<a href=\'/?pageid=mycrib.mail&mp=m\' class=\'whitelink\'>Mail</a> &nbsp;&nbsp;&nbsp; <a href=\'/?pageid=mycrib.member.journal\' class=\'whitelink\'>Journal</a> &nbsp;&nbsp;&nbsp; <a href=\'/?pageid=mycrib.member.profile.upload.image\' class=\'whitelink\'>Photos</a> &nbsp;&nbsp;&nbsp;<a href=\'/?pageid=mycrib.video.uploader\' class=\'whitelink\'>Videos</a>&nbsp;&nbsp;&nbsp;<a href=\'/?pageid=mycrib.friends.page\' class=\'whitelink\'>Friends</a></strong> <strong> &nbsp;&nbsp;&nbsp;<a href=\'/?pageid=mycrib.chatroom\' class=\'whitelink\'>Chatroom</a></strong></div></td>' : NULL).'</tr></table>';
	}else{
$LOGIN2 = '<table width=\'780\' border=\'0\' cellspacing=\'0\' cellpadding=\'0\'><tr><td class=\'mycrib_logo_menu_background\'><div align=\'center\'><table width=\'100%\' border=\'0\' cellpadding=\'0\' cellspacing=\'0\'><tr><td><div align=\'center\'><table width=\'780\' border=\'0\' cellpadding=\'0\' cellspacing=\'0\'><tr><td width=\'125\'><strong><a href=\'/\'><img src=\'templates/images/mc2.gif\' width=\'100\' height=\'45\' border=\'0\' /></a></strong></td><td valign=\'bottom\'><div align=\'left\'><strong>&nbsp;&nbsp;&nbsp;<a href=\'/?pageid=mycrib.member.profile.home\' class=\'nounderline\'>MyCrib</a>&nbsp;&nbsp;&nbsp;<a href=\'/?pageid=mycrib.member.journal&amp;ID=\' class=\'nounderline\'>Journal</a>&nbsp;&nbsp;&nbsp;<a href=\'/?pageid=mycrib.groups\' class=\'nounderline\'>Groups</a>&nbsp;&nbsp;&nbsp;<a href=\'/games.php\' class=\'nounderline\'>Games</a>&nbsp;&nbsp;&nbsp;<a href=\'/?pageid=mycrib.browse\' class=\'nounderline\'>Browse</a>&nbsp;&nbsp;&nbsp;<a href=\'/?pageid=mycrib.search\' class=\'nounderline\'>Search</a>&nbsp;&nbsp;&nbsp;<a href=\'/?pageid=mycrib.music\' class=\'nounderline\'>Music</a>&nbsp;&nbsp;&nbsp;<a href=\'/signin.php\' class=\'nounderline\'>Sign In</a></div></strong></td></tr></table></div></td></tr></table><img src=\'templates/images/bar.gif\' width=\'780\' height=\'50\' /></div></td></tr></table>';
	}
$MENU_SIGN_IN = "<A HREF=\"$URLHOST/?pageid=mycrib.member.profile.home\" class=\"menu_link\">My Crib</A> | <a href=\"$URLHOST/?pageid=mycrib.member.journal&ID=$user_id\" class=\"menu_link\">Journal</a> | <A HREF=\"$URLHOST/?pageid=mycrib.invite\" class=\"menu_link\">Invite</A> | <A HREF=\"$URLHOST/?pageid=mycrib.mail&mp=m\" class=\"menu_link\">Mailbox</A> | <a href=\"$URLHOST/?pageid=mycrib.layout.network.new\" class=\"menu_link\">Layouts</a> | <a href=\"$URLHOST/?pageid=mycrib.groups\" class=\"menu_link\">Groups</a> | <a href=\"$URLHOST/games.php\" class=\"menu_link\">Games</a> | <A HREF=\"$URLHOST/?pageid=mycrib.browse\" class=\"menu_link\">Browse</A> | <A HREF=\"$URLHOST/?pageid=mycrib.events\" class=\"menu_link\">Events</A> | <A HREF=\"$URLHOST/?pageid=mycrib.search\" class=\"menu_link\">Search</A> | <A HREF=\"$URLHOST/?pageid=mycrib.music\" class=\"menu_link\">Music</A> | <A HREF=\"$URLHOST/?pageid=mycrib.menu\" class=\"menu_link\">More&nbsp;&raquo;</A> | <A HREF=\"$URLHOST/signout.php\" class=\"menu_link\">Sign Out</A>";


$MENU_SIGN_INB = "<A HREF=\"$URLHOST/?pageid=mycrib.member.profile.home\" class=\"menu_link4\">My Crib</A> | <a href=\"$URLHOST/?pageid=mycrib.member.journal&ID=$user_id\" class=\"menu_link4\">Journal</a> | <A HREF=\"$URLHOST/?pageid=mycrib.invite\" class=\"menu_link4\">Invite</A> | <A HREF=\"$URLHOST/?pageid=mycrib.mail&mp=m\" class=\"menu_link4\">Mailbox</A> | <a href=\"$URLHOST/?pageid=mycrib.layout.network.new\" class=\"menu_link4\">Layouts</a> | <a href=\"$URLHOST/?pageid=mycrib.groups\" class=\"menu_link4\">Groups</a> | <a href=\"$URLHOST/games.php\" class=\"menu_link4\">Games</a> | <A HREF=\"$URLHOST/?pageid=mycrib.browse\" class=\"menu_link4\">Browse</A> | <A HREF=\"$URLHOST/?pageid=mycrib.events\" class=\"menu_link4\">Events</A> | <A HREF=\"$URLHOST/?pageid=mycrib.search\" class=\"menu_link4\">Search</A> | <A HREF=\"$URLHOST/?pageid=mycrib.music\" class=\"menu_link4\">Music</A> | | <A HREF=\"$URLHOST/?pageid=mycrib.menu\" class=\"menu_link4\">More&nbsp;&raquo;</A> | <A HREF=\"$URLHOST/signout.php\" class=\"menu_link4\">Sign Out</A>";

$MENU_SIGN_OUTB = "<A HREF=\"$URLHOST/signin.php\" class=\"menu_link4\">My Crib</A> | <a href=\"$URLHOST/?pageid=mycrib.member.journal&ID=$PROFILE_MEMBER_ID\" class=\"menu_link4\">Journal</a> | <A HREF=\"$URLHOST/?pageid=mycrib.invite\" class=\"menu_link4\">Invite</A> | <a href=\"$URLHOST/?pageid=mycrib.layout.network.new\" class=\"menu_link4\">Layouts</a> | <a href=\"$URLHOST/?pageid=mycrib.groups\" class=\"menu_link4\">Groups</a> | <a href=\"$URLHOST/games.php\" class=\"menu_link4\">Games</a> | <A HREF=\"$URLHOST/?pageid=mycrib.browse\" class=\"menu_link4\">Browse</A> | <A HREF=\"$URLHOST/?pageid=mycrib.events\" class=\"menu_link4\">Events</A> | <A HREF=\"$URLHOST/?pageid=mycrib.search\" class=\"menu_link4\">Search</A> | <A HREF=\"$URLHOST/?pageid=mycrib.music\" class=\"menu_link4\">Music</A> | | <A HREF=\"$URLHOST/?pageid=mycrib.menu\" class=\"menu_link4\">More&nbsp;&raquo;</A> | <A HREF=\"$URLHOST/signup.php\" class=\"menu_link4\">Sign Up</A>";
if($user_id)
	{
		//SIGN IN
		$LOGIN = '<A HREF=\''.$URLHOST.'/?pageid=mycrib.member.profile.home\' class=\'menu_link\'>My Crib</A> | <a href=\''.$URLHOST.'/?pageid=mycrib.member.journal&ID='.$user_id.'\' class=\'menu_link\'>Journal</a> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.invite\' class=\'menu_link\'>Invite</A> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.mail&mp=m\' class=\'menu_link\'>Mailbox</A> | <a href=\''.$URLHOST.'/?pageid=mycrib.layout.network.new\' class=\'menu_link\'>Layouts</a> | <a href=\''.$URLHOST.'/?pageid=mycrib.groups\' class=\'menu_link\'>Groups</a> | <a href=\''.$URLHOST.'/games.php\' class=\'menu_link\'>Games</a> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.browse\' class=\'menu_link\'>Browse</A> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.events\' class=\'menu_link\'>Events</A> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.search\' class=\'menu_link\'>Search</A> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.music\' class=\'menu_link\'>Music</A> | | <A HREF=\''.$URLHOST.'/?pageid=mycrib.menu\' class=\'menu_link\'>More&nbsp;&raquo;</A> | <A HREF=\''.$URLHOST.'/signout.php\' class=\'menu_link\'>Sign Out</A>';
	}else{
		//SIGN OUT
		$LOGIN = '<A HREF=\''.$URLHOST.'/signin.php\' class=\'menu_link\'>My Crib</A> | <a href=\''.$URLHOST.'/?pageid=mycrib.member.journal&ID=$PROFILE_MEMBER_ID\' class=\'menu_link\'>Journal</a> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.invite\' class=\'menu_link\'>Invite</A> | <a href=\''.$URLHOST.'/?pageid=mycrib.layout.network.new\' class=\'menu_link\'>Layouts</a> | <a href=\''.$URLHOST.'/?pageid=mycrib.groups\' class=\'menu_link\'>Groups</a> | <a href=\''.$URLHOST.'/games.php\' class=\'menu_link\'>Games</a> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.browse\' class=\'menu_link\'>Browse</A> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.events\' class=\'menu_link\'>Events</A> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.search\' class=\'menu_link\'>Search</A> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.music\' class=\'menu_link\'>Music</A> | | <A HREF=\''.$URLHOST.'/?pageid=mycrib.menu\' class=\'menu_link\'>More&nbsp;&raquo;</A> | <A HREF=\''.$URLHOST.'/signup.php\' class=\'menu_link\'>Sign Up</A>';
	}
//$MENU_SIGN_IN = '<A HREF=\''.$URLHOST.'/?pageid=mycrib.member.profile.home\' class=\'menu_link\'>My Crib</A> | <a href=\''.$URLHOST.'/?pageid=mycrib.member.journal&ID='.$user_id.'\' class=\'menu_link\'>Journal</a> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.invite\' class=\'menu_link\'>Invite</A> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.mail&mp=m\' class=\'menu_link\'>Mailbox</A> | <a href=\''.$URLHOST.'/?pageid=mycrib.layout.network.new\' class=\'menu_link\'>Layouts</a> | <a href=\''.$URLHOST.'/?pageid=mycrib.groups\' class=\'menu_link\'>Groups</a> | <a href=\''.$URLHOST.'/games.php\' class=\'menu_link\'>Games</a> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.browse\' class=\'menu_link\'>Browse</A> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.events\' class=\'menu_link\'>Events</A> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.search\' class=\'menu_link\'>Search</A> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.music\' class=\'menu_link\'>Music</A> | | <A HREF=\''.$URLHOST.'/?pageid=mycrib.menu\' class=\'menu_link\'>More&nbsp;&raquo;</A> | <A HREF=\''.$URLHOST.'/signup.php\' class=\'menu_link\'>Register</A>';
$MENU_SIGN_IN = '<A HREF=\''.$URLHOST.'/?pageid=mycrib.member.profile.home\' class=\'menu_link4\'>My Crib</A> | <a href=\''.$URLHOST.'/?pageid=mycrib.member.journal&ID='.$user_id.'\' class=\'menu_link4\'>Journal</a> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.invite\' class=\'menu_link4\'>Invite</A> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.mail&mp=m\' class=\'menu_link4\'>Mailbox</A> | <a href=\''.$URLHOST.'/?pageid=mycrib.layout.network.new\' class=\'menu_link4\'>Layouts</a> | <a href=\''.$URLHOST.'/?pageid=mycrib.groups\' class=\'menu_link4\'>Groups</a> | <a href=\''.$URLHOST.'/games.php\' class=\'menu_link4\'>Games</a> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.browse\' class=\'menu_link4\'>Browse</A> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.events\' class=\'menu_link4\'>Events</A> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.search\' class=\'menu_link4\'>Search</A> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.music\' class=\'menu_link4\'>Music</A> | | <A HREF=\''.$URLHOST.'/?pageid=mycrib.menu\' class=\'menu_link4\'>More&nbsp;&raquo;</A> | <A HREF=\''.$URLHOST.'/signout.php\' class=\'menu_link4\'>Sign Out</A>';

/*
ID, MEMBER_ID, GAME_TOOLS_ACCESS, REPORT_LIST_ACCESS, BULLETIN_ACCESS, FRIEND_COMMENT_ACCESS, SUSPEND_ACCESS, TERMINATE_ACCESS, ACCOUNT_CHANGE_ACCESS, ANNOUCEMENT_ACCESS, ADMIN_CHANGE_ACCESS, FAQ_ACCESS, COMMUNITY_ACCESS, STORY_PROMOTION_ACCESS, BANDS_ACCESS, MAIL_ACCESS, FAKERSBUSTED_ACCESS, JIGSAW_ACCESS
*/

if($ADMIN_ACCESS == 2)	
	{
		$admin_menu = NULL;
				if($ADMIN_PERMISSION['REPORT_LIST_ACCESS'] == 1)
			{
				$admin_menu .= '<a href=\''.$URLHOST.'/?pageid=mycrib.admin.report\' class=\'menu3_link\'>Reports List</a>&nbsp;&nbsp;&nbsp;';
			}
		if($ADMIN_PERMISSION['SUSPEND_ACCESS'] == 1)
			{
				$admin_menu .= '<a href=\''.$URLHOST.'/?pageid=mycrib.admin.suspend.account\' class=\'menu3_link\'>Suspend Account</a>&nbsp;&nbsp;&nbsp;';
			}
		if($ADMIN_PERMISSION['ACCOUNT_CHANGE_ACCESS'] == 1)
			{
				$admin_menu .= '<a href=\''.$URLHOST.'/?pageid=mycrib.admin.change.account.settings\' class=\'menu3_link\'>Change Account Settings</a>&nbsp;&nbsp;&nbsp;';
			}
		if($ADMIN_PERMISSION['ANNOUCEMENT_ACCESS'] == 1)
			{
				$admin_menu .= '<a href=\''.$URLHOST.'/?pageid=mycrib.admin.announce\' class=\'menu3_link\'>Annoucement</a>&nbsp;&nbsp;&nbsp;';
			}
		if($ADMIN_PERMISSION['ADMIN_CHANGE_ACCESS'] == 1)
			{
				//$admin_menu .= '<a href=\''.$URLHOST.'/?pageid=mycrib.admin.organization\' class=\'menu3_link\'>Admin Organization</a>&nbsp;&nbsp;&nbsp;';
			}
		if($ADMIN_PERMISSION['FAKERSBUSTED_ACCESS'] == 1)
			{
				$admin_menu .= '<a href=\'/?pageid=mycrib.fakersbusted.submit&type=admin.fakersbusted.review\' class=\'menu3_link\'>FakersBusted</a>&nbsp;&nbsp;&nbsp;';
			}
	}	
$admin_menu_LAYOUT = '<style>.fwhite { color:#FFFFFF; }a.menu3_link:link{ color:#FFFFFF;  text-decoration: none; }
a.menu3_link:visited{ color:#FFFFFF; text-decoration: none; }
a.menu3_link:hover{ color:#FFFFFF; text-decoration: none; }
a.menu3_link:active{ color:#FFFFFF; text-decoration: none; }</style><table width=\'780\' border=\'0\' align=\'center\' cellpadding=\'5\' cellspacing=\'1\' class=\'admin_menu_table\'><tr><td bgcolor=\'#477CB8\' class=\'admin_menu_td\'>'.$admin_menu.'</td></tr></table>';


//$MENU_SIGN_OUT = '<A HREF=\''.$URLHOST.'/signin.php\' class=\'menu_link\'>My Crib</A> | <a href=\''.$URLHOST.'/?pageid=mycrib.member.journal&ID=$PROFILE_MEMBER_ID\' class=\'menu_link\'>Journal</a> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.invite\' class=\'menu_link\'>Invite</A> | <a href=\''.$URLHOST.'/?pageid=mycrib.layout.network.new\' class=\'menu_link\'>Layouts</a> | <a href=\''.$URLHOST.'/?pageid=mycrib.groups\' class=\'menu_link\'>Groups</a> | <a href=\''.$URLHOST.'/games.php\' class=\'menu_link\'>Games</a> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.browse\' class=\'menu_link\'>Browse</A> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.events\' class=\'menu_link\'>Events</A> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.search\' class=\'menu_link\'>Search</A> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.music\' class=\'menu_link\'>Music</A> | | <A HREF=\''.$URLHOST.'/?pageid=mycrib.menu\' class=\'menu_link\'>More&nbsp;&raquo;</A> | <A HREF=\''.$URLHOST.'/signup.php\' class=\'menu_link\'>Sign Up</A>';

$MENU_SIGN_OUT = '<A HREF=\''.$URLHOST.'/signin.php\' class=\'menu_link4\'>My Crib</A> | <a href=\''.$URLHOST.'/?pageid=mycrib.member.journal&ID=$PROFILE_MEMBER_ID\' class=\'menu_link4\'>Journal</a> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.invite\' class=\'menu_link4\'>Invite</A> | <a href=\''.$URLHOST.'/?pageid=mycrib.layout.network.new\' class=\'menu_link4\'>Layouts</a> | <a href=\''.$URLHOST.'/?pageid=mycrib.groups\' class=\'menu_link4\'>Groups</a> | <a href=\''.$URLHOST.'/games.php\' class=\'menu_link4\'>Games</a> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.browse\' class=\'menu_link4\'>Browse</A> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.events\' class=\'menu_link4\'>Events</A> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.search\' class=\'menu_link4\'>Search</A> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.music\' class=\'menu_link4\'>Music</A> | | <A HREF=\''.$URLHOST.'/?pageid=mycrib.menu\' class=\'menu_link4\'>More&nbsp;&raquo;</A> | <A HREF=\''.$URLHOST.'/signup.php\' class=\'menu_link4\'>Sign Up</A>';
//'.$URLHOST.'/?pageid=mycrib.community

/*
| <A HREF=\''.$URLHOST.'/?pageid=mycrib.groups\' class=\'menu_link\'>Groups</A> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.ranks\' class=\'menu_link\'>Ranks</A> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.classifieds\' class=\'menu_link\'>Classifieds</A>

<A HREF=\''.$URLHOST.'/?pageid=mycrib.groups\' class=\'menu_link\'>Groups</A> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.ranks\' class=\'menu_link\'>Ranks</A> | <A HREF=\''.$URLHOST.'/?pageid=mycrib.classifieds\' class=\'menu_link\'>Classifieds</A> |
*/
$PROFILE_CONTACT_MENU_SIGN_IN = '<table width=\'300\' height=\'129\' border=\'0\' cellpadding=\'0\' cellspacing=\'0\'><tr><td class=\'contact_background_table_a\' height=\'43\' align=\'left\' valign=\'top\'><div align=\'center\'><a HREF=\''.$URLHOST.'/?pageid=mycrib.member.addfriend&f='.((!empty($PROFILE_MEMBER_ID)) ? $PROFILE_MEMBER_ID : NULL).'\'><img src=\'templates/images/add_to_friends.gif\' width=\'114\' height=\'29\' border=\'0\'></a></div></td><td class=\'contact_background_table_b\' height=\'43\' align=\'center\' valign=\'top\'><div align=\'center\'><a href=\''.$URLHOST.'/?pageid=mycrib.report&type=1&ID='.((!empty($PROFILE_MEMBER_ID)) ? $PROFILE_MEMBER_ID : NULL).'\'><img src=\'templates/images/report.gif\' width=\'114\' height=\'29\' border=\'0\'></a></div></td></tr><tr><td class=\'contact_background_table_a\' height=\'43\' align=\'left\' valign=\'top\'><div align=\'center\'><A HREF=\''.$URLHOST.'/?pageid=mycrib.mail&mp=w&mt='.$PROFILE_MEMBER_ID.'\'><img src=\'templates/images/send_message.gif\' width=\'114\' height=\'29\' border=\'0\'></A></div></td><td class=\'contact_background_table_b\' height=\'43\' align=\'center\' valign=\'top\'><a href=\''.$URLHOST.'/?pageid=mycrib.bulletin&ebe=1&add_bulletin_id='.$PROFILE_MEMBER_ID.'\'><img src=\'templates/images/add_bulletin.gif\' width=\'114\' height=\'29\' border=\'0\'></a></td></tr><tr><td class=\'contact_background_table_a\' height=\'43\' align=\'left\' valign=\'top\'><div align=\'center\'><A HREF=\''.$URLHOST.'/?pageid=mycrib.block.user&block_user_id='.$PROFILE_MEMBER_ID.'&idhash=$IDHASH\'><img src=\'templates/images/block_user.gif\' width=\'114\' height=\'29\' border=\'0\'></A></div></td><td class=\'contact_background_table_b\' height=\'43\' align=\'center\' valign=\'top\'><A HREF=\''.$URLHOST.'/?pageid=mycrib.member.journal&ID='.$PROFILE_MEMBER_ID.'\'><img src=\'templates/images/journal.gif\' width=\'114\' height=\'29\' border=\'0\'></A></td></tr></table>';
$PROFILE_CONTACT_MENU_SIGN_OUT = '<table width=\'300\' height=\'129\' border=\'0\' cellpadding=\'0\' cellspacing=\'0\'><tr><td class=\'contact_background_table_a\' height=\'43\' align=\'left\' valign=\'top\'><div align=\'center\'><a HREF=\''.$URLHOST.'/?pageid=mycrib.member.addfriend&f='.((!empty($PROFILE_MEMBER_ID)) ? $PROFILE_MEMBER_ID : NULL).'\'><img src=\'templates/images/add_to_friends.gif\' width=\'114\' height=\'29\' border=\'0\'></a></div></td><td class=\'contact_background_table_b\' height=\'43\' align=\'center\' valign=\'top\'><div align=\'center\'><a href=\''.$URLHOST.'/?pageid=mycrib.report&type=1&ID='.((!empty($PROFILE_MEMBER_ID)) ? $PROFILE_MEMBER_ID : NULL).'\'><img src=\'templates/images/report.gif\' width=\'114\' height=\'29\' border=\'0\'></a></div></td></tr><tr><td class=\'contact_background_table_a\' height=\'43\' align=\'left\' valign=\'top\'><div align=\'center\'><A HREF=\''.$URLHOST.'/?pageid=mycrib.mail&mp=w&mt='.$PROFILE_MEMBER_ID.'\'><img src=\'templates/images/send_message.gif\' width=\'114\' height=\'29\' border=\'0\'></A></div></td><td class=\'contact_background_table_b\' height=\'43\' align=\'center\' valign=\'top\'><a href=\''.$URLHOST.'/?pageid=mycrib.bulletin&ebe=1&add_bulletin_id='.$PROFILE_MEMBER_ID.'\'><img src=\'templates/images/add_bulletin.gif\' width=\'114\' height=\'29\' border=\'0\'></a></td></tr><tr><td class=\'contact_background_table_a\' height=\'43\' align=\'left\' valign=\'top\'><div align=\'center\'><A HREF=\''.$URLHOST.'/?pageid=mycrib.block.user&block_user_id='.$PROFILE_MEMBER_ID.'&idhash=$IDHASH\'><img src=\'templates/images/block_user.gif\' width=\'114\' height=\'29\' border=\'0\'></A></div></td><td class=\'contact_background_table_b\' height=\'43\' align=\'center\' valign=\'top\'><A HREF=\''.$URLHOST.'/?pageid=mycrib.member.journal&ID='.$PROFILE_MEMBER_ID.'\'><img src=\'templates/images/journal.gif\' width=\'114\' height=\'29\' border=\'0\'></A></td></tr></table>';

$PROFILE_INFO_MENU_SIGN_IN = '<A HREF=\''.$URLHOST.'/?pageid=mycrib.member.profile&ID='.((!empty($user_id)) ? $user_id : NULL).'\'>View Your Profile</A><BR><BR><A HREF=\''.$URLHOST.'/?pageid=mycrib.member.profile.edit\'>Edit Your Profile</A><BR><BR><a href=\''.$URLHOST.'/?pageid=mycrib.member.journal.profile.edit\'>Edit Your Journal Profile</a><BR><BR><a href=\''.$URLHOST.'/?pageid=mycrib.visitorid.list\'>Visitors List</a><BR><BR><A HREF=\''.$URLHOST.'/?pageid=mycrib.member.profile.edit&type=1\'>Edit Your Layout (CSS)</A><BR><BR><B><A HREF=\''.$URLHOST.'/?pageid=mycrib.mylayouts\'>My Layouts (NEW!)</A></B><BR><BR>
<A HREF=\''.$URLHOST.'/?pageid=mycrib.member.viewallfriendcomments&f='.$user_id.'\'>Edit Comment</A><BR><BR><A HREF=\''.$URLHOST.'/?pageid=mycrib.member.viewallfriendcomments&f='.$user_id.'&safe_mode=1\'>Edit Comment Safe Mode</A><BR><BR><A HREF=\''.$URLHOST.'/?pageid=mycrib.member.profile.upload.image\'>Upload Your Image</A><br><br><A HREF=\'http://www.mp3x.us/\' target=\'_blank\'>Upload Your Music</A><br><BR><A HREF=\''.$URLHOST.'/?pageid=mycrib.invite&vpv=1\'>View Past Invites</A><br><BR><A HREF=\''.$URLHOST.'/?pageid=mycrib.account.settings\'>Account Settings</A>';

$PROFILE_EDIT_MENU_2 = '<br><a href=\''.$URLHOST.'/?pageid=mycrib.member.profile.edit&type=1\' class=\'nounderline\'><strong>Layout</strong> </a> | <strong><a href=\''.$URLHOST.'/?pageid=mycrib.member.profile.edit&type=9\' class=\'nounderline\'>Name</a></strong> | <a href=\''.$URLHOST.'/?pageid=mycrib.member.profile.edit&type=3\' class=\'nounderline\'><strong>Interests and Personality</strong></a> | <a href=\''.$URLHOST.'/?pageid=mycrib.member.profile.edit&type=2\' class=\'nounderline\'><strong>Basic Info</strong></a> | <a href=\''.$URLHOST.'/?pageid=mycrib.member.profile.edit&type=4\' class=\'nounderline\'><strong>Background &amp; Lifestyle </strong></a> | <a href=\''.$URLHOST.'/?pageid=mycrib.member.profile.edit&type=8\' class=\'nounderline\'><strong>Music Player </strong></a> | <strong><a href=\''.$URLHOST.'/?pageid=mycrib.school.add\' class=\'nounderline\'>Schools</a></strong> | <a href=\''.$URLHOST.'/?pageid=mycrib.member.profile.edit&type=7\' class=\'nounderline\'><strong>Advanced Code</strong></a><br></div>';
//BAND
$PROFILE_EDIT_MENU_3 = '<br><a href=\''.$URLHOST.'/?pageid=mycrib.band.profile.edit&type=1\' class=\'nounderline\'><strong>Layout</strong> </a> | <strong><a href=\''.$URLHOST.'/?pageid=mycrib.band.profile.edit&type=4\' class=\'nounderline\'>Upcoming Shows</a></strong> | <a href=\''.$URLHOST.'/?pageid=mycrib.band.profile.edit&type=6\' class=\'nounderline\'><strong>Band Details</strong></a> | <a href=\''.$URLHOST.'/?pageid=mycrib.band.profile.edit&type=2\' class=\'nounderline\'><strong>Basic Info</strong></a> | <a href=\''.$URLHOST.'/?pageid=mycrib.band.profile.edit&type=3\' class=\'nounderline\'><strong>Manage Songs</strong></a> | <a href=\''.$URLHOST.'/?pageid=mycrib.band.profile.edit&type=5\' class=\'nounderline\'><strong>Listing Info</strong></a></div>';

$MYCRIB_LOGO = '<table width=\'100%\' border=\'0\' cellspacing=\'0\' cellpadding=\'0\'><tr><td bgcolor=\'#C91E14\'><a href=\'/\'><div align=\'center\'><img src=\'mycrib_logo.png\' border=\'0\'></div></a></td></tr><tr><td bgcolor=\'#F7F7F7\'><table width=\'100%\' border=\'0\' cellpadding=\'0\' cellspacing=\'4\'><tr>
		<td><div align=\'center\'>'.((!$user_id) ? $MENU_SIGN_OUTB : $MENU_SIGN_INB).'<br></div></td>
	  </tr>
	</table></td>
  </tr>
  <tr>
	<td bgcolor=\'#FFFFFF\'><br><div align=\'center\'>'.(($COUNTRY_CODE == 'US') ? '<!-- Begin: AdBrite -->
<script type="text/javascript">
   var AdBrite_Title_Color = \'0000FF\';
   var AdBrite_Text_Color = \'000000\';
   var AdBrite_Background_Color = \'FFFFFF\';
   var AdBrite_Border_Color = \'FFFFFF\';
</script>
<span style="white-space:nowrap;"><script src="http://ads.adbrite.com/mb/text_group.php?sid=327145&zs=3732385f3930" type="text/javascript"></script><!--
--><a target="_top" href="http://www.adbrite.com/mb/commerce/purchase_form.php?opid=327145&afsid=1"><img src="http://files.adbrite.com/mb/images/adbrite-your-ad-here-leaderboard.gif" style="background-color:#FFFFFF" alt="Your Ad Here" width="14" height="90" border="0" /></a></span>
<!-- End: AdBrite -->
</script><!-- 
Copy and paste this ad code between the <HEAD> and </HEAD> tags of your page.
-->

<script language="javascript">
var xCache = Math.floor(Math.random()*99999);
document.write(\'<scr\'+\'ipt src="http://a1.interclick.com/getJs.aspx?a=&b=&c=1&d=&t=12&wsid=6645&v=3.0&ind=&x=\'+xCache+\'"></scr\'+\'ipt>\');
</script><br>' : NULL).'</td></tr></table>';

$MYCRIB_LOGOB = '<table width=\'98%\' border=\'0\' cellspacing=\'1\' cellpadding=\'5\'><tr><td width=\'200\'><a href=\'/\'><img src=\'light_logo.jpg\' border=\'0\'></a></td><td align=\'left\' valign=\'top\'>'.(($COUNTRY_CODE == 'US') ? '' : NULL).'</tr></table>';

$BOTTOM = '<div align=\'center\'><table width=\'780\' border=\'0\' align=\'center\' cellpadding=\'4\' cellspacing=\'0\'><tr><td bgcolor=\'#E4E4E4\'><div align=\'center\'><a href=\'/?pageid=mycrib.about\' class=\'nounderline\'>About</a> | <a href=\'/?pageid=mycrib.fakersbusted.updates\' class=\'nounderline\'>Fakersbusted</a> | <b><a href=\'/?pageid=mycrib.promotion\' class=\'nounderline\'>Promote!</a></b> | <a href=\'/?pageid=mycrib.dream.info\' class=\'nounderline\'>Code</a> | <a href=\'/?pageid=mycrib.terms\' class=\'nounderline\'>Terms</a> | <a href=\'/?pageid=mycrib.privacy\' class=\'nounderline\'>Privacy</a> | <a href=\'/?pageid=mycrib.safetytips\' class=\'nounderline\'>Safety Tips</a> | <a href=\'/?pageid=mycrib.faq\' class=\'nounderline\'>Help</a> | <a href=\'/?pageid=mycrib.contact\' class=\'nounderline\'>Contact Us</a></div></td></tr></table><br><p size=\'12px\'><a href=\''.$URLHOST.'\' class=\'nounderline\'>&copy;2006 MyCrib All Rights Reserved</a></p></div><script src=\'http://www.google-analytics.com/urchin.js\' type=\'text/javascript\'></script><script type=\'text/javascript\'>_uacct = \'UA-803095-1\';urchinTracker();</script>';
//| <a href=\''.$URLHOST.'/?pageid=mycrib.member.profile.edit&type=5\' class=\'menu2_link\'>Schools</a> | <a href=\''.$URLHOST.'/?pageid=mycrib.member.profile.edit&type=6\' class=\'menu2_link\'>Companies</a>
?>