<html><head><meta http-equiv="Pragma" content="no-cache"><meta http-equiv="expires" content="0"><meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"><title></title><style type="text/css">@import"http://cache2.mycrib.net/css/core.css";@import"http://cache2.mycrib.net/css/edit_profile.css";@import"http://cache2.mycrib.net/css/vid.css";.vid_th_area img{background:#FFFFFF;}</style><script language="javascript">g=document;k=true;v=false;gp=window;gr=confirm;gt=escape;function confirmDelete(){if(gr("Click Ok to delete this video")){return k}else{return v}}function confirmDefault(){if(gr("Click Ok to set this video as default")){return k}else{return v}} function check_form(){ if(document.forms[0].title.value != '' || document.forms[0].catid.value != 0) { }else{ alert('You need to complete video title and category.'); return false; }}</script></head><body marginheight="0" marginwidth="0" topmargin="0" bottommargin="0">
<table width="780" border="0" align="center" cellpadding="0" cellspacing="0"><tr><td bgcolor="white"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td class="mycrib_logo_menu_background"><div align="center"><?php echo get_main_menu($user_id, 0); ?></div></td></tr></table>
      <table width="780" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td valign="bottom"><br><ul id="tablinks">
              <li><a href="http://app.mycrib.net/?tag=create">Create Application</a></li>
              <li><a href="http://app.mycrib.net/?tag=view">View My Apps</a></b></li>
              <li><a href="http://docs.app.mycrib.net/">Docs</a></li>
              <li class="current"><a href="http://app.mycrib.net/console.php">Tools</a></li>
              <li><a href="http://community.app.mycrib.net/">Developer Site</a></li>
          </ul></td>
        </tr>
      </table>
      <table width="780" border="0" cellspacing="0" cellpadding="0" class="box">
        <tr>
<td><div align="left">
  <div class="dashboard"> <a href="/console.php?tag=api">API Test Console</a><a href="/console.php">MCML Test Console</a></div>
  <br>
<div style="width:500px; margin:10px;">You can experiment with functions and responses, and see what content MyCrib Platform makes available. Select the method you wish want to call and the format of the return values.</div>
</div><br>
  <table width="770" border="0" cellspacing="10" cellpadding="0">
  <tr>
    <td width="250" valign="top"><form name="form1" method="post" action="/console.php">
      User ID<br>
      <input type="text" name="uid" value="<?php echo $user_id; ?>" class="text_field" disabled="true"/>
      <br>
      Response Format<br>
      <select name="format" class="select">
        <option>XML</option>
      </select>
      <br>
      <br>
Method<br>
<select name="method" class="select">
  <option selected>Method</option>
  <option value="mycrib.friend.areFriends">friend.areFriends</option>
  <option value="mycrib.user.getDisplayName">user.getDisplayName</option>
  <option value="mycrib.user.getDefaultPhoto">user.getDefaultPhoto</option>
  <option value="mycrib.user.isAppAdded">user.isAppAdded</option>
  <option value="mycrib.user.notification.get">user.notification.get</option>
  <?php echo $method_list; ?>
</select>
<br>
<br>
<input name="Button" type="button" class="login_button" value="Call Method" onClick=""/>
        <input name="tag" type="hidden" id="tag" value="api">
    </form>
      </td>
    <td valign="top"><div id="console" style="width:550px; height:450px; background:#F7F7F7; border:1px #CCCCCC solid; padding:10px;">The results of your method call will show up here.</div></td>
  </tr>
</table></td>
</tr></table></td></tr></table><p align="center"><?php echo get_bottom(); ?></p><p align="center">&nbsp;</p></body></html>