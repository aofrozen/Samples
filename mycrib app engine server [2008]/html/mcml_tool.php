<html><head><meta http-equiv="Pragma" content="no-cache"><meta http-equiv="expires" content="0"><meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"><title></title><style type="text/css">@import"http://cache2.mycrib.net/css/core.css";@import"http://cache2.mycrib.net/css/edit_profile.css";@import"http://cache2.mycrib.net/css/vid.css";.vid_th_area img{background:#FFFFFF;}</style><script language="javascript">g=document;k=true;v=false;gp=window;gr=confirm;gt=escape;function confirmDelete(){if(gr("Click Ok to delete this video")){return k}else{return v}}function confirmDefault(){if(gr("Click Ok to set this video as default")){return k}else{return v}} function check_form(){ if(document.forms[0].title.value != '' || document.forms[0].catid.value != 0) { }else{ alert('You need to complete video title and category.'); return false; }}</script></head><body marginheight="0" marginwidth="0" topmargin="0" bottommargin="0">
<table width="780" border="0" align="center" cellpadding="0" cellspacing="0"><tr><td bgcolor="white"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td class="mycrib_logo_menu_background"><div align="center"><?php echo get_main_menu($user_id, 0); ?></div></td></tr></table>
      <br>
      <table width="780" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td valign="bottom"><ul id="tablinks">
              <li><a href="http://app.mycrib.net/?tag=create">Create Application</a></li>
              <li><a href="http://app.mycrib.net/?tag=view">View My Apps</a></b></li>
              <li><a href="http://docs.app.mycrib.net/">Docs</a></li>
              <li class="current"><a href="http://app.mycrib.net/console.php">Tools</a></li>
              <li><a href="http://community.app.mycrib.net/">Developer Site</a></li>
          </ul></td>
        </tr>
      </table>
      <table width="770" border="0" cellspacing="0" cellpadding="0" class="box">
        <tr>
<td><div align="left">
  <table width="100%" border="0" cellpadding="0" cellspacing="0">
    <tr>
      <td><div class="dashboard">
        <a href="/console.php?tag=api">API Test Console</a><a href="/console.php">MCML Test Console</a></div>
     </td>
    </tr>
  </table>
  <div style="padding:10px;">
    <div align="left">User ID<br>
        <input type="text" name="uid" value="<?php echo $user_id; ?>" class="text_field" disabled="true"/>
        <br>
        <br>
      Profile <br>
  <input type="text" name="pro" value="<?php echo $user_id; ?>" class="text_field"/>
  <br>
  <br>
      API Key<br>
  <input name="api_key" type="text" class="text_field" value="193bb02955477f9a54e215b7d6ecc7b2" size="45"/>
    </div>
    <br>
    <table width="760" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="350" valign="top"><p>MCML Code
          <form action="console.php" method="post" name="console">
              <textarea name="console_data" cols="70" rows="10" class="text_area" id="console_data"><?php echo htmlentities($get_console_data); ?></textarea>
              <br>
              <br>
              <input name="submit" type="submit" class="login_button" value="preview"/>
            </form>
          </p>
            <div class="box_title">Preview</div>
          <?php if(!empty($mc_header)) { echo $mc_header; } ?>
          <table width="760" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td width="720"><?php if(!empty($tab_items_list)) { echo $tab_items_list; } ?></td>
              <td><sup><a href="<?php echo $help_link; ?>">Help</a></sup></td>
            </tr>
          </table>
          <table width="760" border="0" cellspacing="0" cellpadding="0" class="box">
            <tr>
                <td><?php if(!empty($dashboard)) { echo $dashboard.'x'; } ?>
                    <div class="box" style="background:#FBFBFB; margin:10px;">
                      <?php if(empty($mc_content)) { echo 'This screen will show result here.'; }else{ echo $mc_content; } ?>
                    </div></td>
            </tr>
          </table></td>
      </tr>
    </table>
    <div class="box_title">Errors</div>
    <?php echo $errors_list; ?>
    <div class="box_title">Rendered Source</div>
    <textarea class="text_area" name="textarea" cols="70" rows="10"><?php echo htmlentities($mc_content); ?></textarea>
  </div><br>
</div>
  </td>
    </tr>
</table></td>
</tr></table></td></tr></table><p align="center"><?php echo get_bottom(); ?></p><p align="center">&nbsp;</p></body></html>