<html><head><meta http-equiv="Pragma" content="no-cache"><meta http-equiv="expires" content="0"><meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"><title></title><script>
 var RecaptchaOptions = {
    theme : 'clean'
 };
 </script>
<style type="text/css">@import"http://cache2.mycrib.net/css/core.css";@import"http://cache2.mycrib.net/css/edit_profile.css";@import"http://cache2.mycrib.net/css/vid.css";.app_form{font-family:Verdana, Arial, Helvetica, sans-serif; font-weight:bold; color:#333333;}.app_form td{ padding:5px; margin:5px;}.vid_th_area img{background:#FFFFFF;}</style><script language="javascript">g=document;k=true;v=false;gp=window;gr=confirm;gt=escape;function confirmDelete(){if(gr("Click Ok to delete this video")){return k}else{return v}}function confirmDefault(){if(gr("Click Ok to set this video as default")){return k}else{return v}} function check_form(){ if(document.forms[0].title.value != '' || document.forms[0].catid.value != 0) { }else{ alert('You need to complete video title and category.'); return false; }}</script></head><body marginheight="0" marginwidth="0" topmargin="0" bottommargin="0"><table width="780" border="0" align="center" cellpadding="0" cellspacing="0"><tr><td bgcolor="white"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td class="mycrib_logo_menu_background"><div align="center"><?php echo get_main_menu($user_id, 0); ?></div></td></tr></table>
      <br>
      <table width="780" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td valign="bottom"><ul id="tablinks">
            <li class="current"><a href="http://app.mycrib.net/?tag=create">Create Application</a></li><li><a href="http://app.mycrib.net/?tag=view">View My Apps</a></b></li>
			<li><a href="http://docs.app.mycrib.net/">Docs</a></li>
			<li><a href="http://app.mycrib.net/console.php">Tools</a></li>
            <li><a href="http://community.app.mycrib.net/">Developer Site</a></li>
          </ul></td>
        </tr>
      </table>
      <table width="780" border="0" cellspacing="0" cellpadding="10" class="box"><tr>
  <td><div class="warning">For only developers, you can sign up here.</div><?php get_form_errors(); ?>
    <form name="form1" method="post" action="http://app.mycrib.net/?tag=create">
      <table width="770" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td width="600"><table width="550" border="0" cellspacing="0" cellpadding="0" class="app_form">
            <tr>
              <td width="170"><div align="left">Application Name</div></td>
              <td><input name="app_name" type="text" class="text_field" id="app_name" value="<?php if(count($form_error_a)>0){ echo $get_app_name; } ?>">
                <br>
                (You can't create with 'mycrib' or 'mc', 'crib'.) </td>
            </tr>
            <tr>
              <td><div align="left">Email Support</div></td>
              <td><input name="support" type="text" class="text_field" id="support" value="<?php if(count($form_error_a)>0){ echo $get_support; } ?>"></td>
            </tr>
			 <tr>
              <td><div align="left">Site Owner</div></td>
              <td><input name="url" type="text" class="text_field" id="url" value="<?php if(count($form_error_a)>0){ echo $get_url; } ?>"></td>
            </tr>
            <tr>
              <td><div align="left">Callback URL</div></td>
              <td><input name="callback_url" type="text" class="text_field" id="callback_url" value="<?php if(count($form_error_a)>0){ echo $get_callback_url; } ?>"></td>
            </tr>
            <tr>
              <td><div align="left">Canvas Page URL</div></td>
              <td><input name="canvas_page_url" type="text" class="text_field" id="canvas_page_url" value="<?php if(count($form_error_a)>0){ echo $get_canvas_page_url; } ?>"></td>
            </tr>
            <tr>
              <td><div align="left">TOS URL </div></td>
              <td><input name="tos_url" type="text" class="text_field" id="tos_url" value="<?php if(count($form_error_a)>0){ echo $get_tos_url; } ?>"></td>
            </tr>
            <tr>
              <td><div align="left">Who can add your application to their MyCrib account?</div></td>
              <td><input type="checkbox" name="checkbox" value="checkbox">
                Users</td>
            </tr>
            <tr>
              <td><div align="left">Post-Add URL</div></td>
              <td><input name="post_add_url" type="text" class="text_field" id="post_add_url" value="<?php if(count($form_error_a)>0){ echo $get_post_add_url; } ?>"></td>
            </tr>
            <tr>
              <td><div align="left">Application Description</div></td>
              <td><textarea name="description" cols="40" class="text_area" id="description"><?php if(count($form_error_a)>0){ echo $get_description; } ?></textarea></td>
            </tr>
            <tr>
              <td><div align="left">Post-Remove URL</div></td>
              <td><input name="post_remove_url" type="text" class="text_field" id="post_remove_url" value="<?php if(count($form_error_a)>0){ echo $get_post_remove_url; } ?>"></td>
            </tr>
            <tr>
              <td><div align="left">Privacy URL</div></td>
              <td><input name="privacy_url" type="text" class="text_field" id="privacy_url" value="<?php if(count($form_error_a)>0){ echo $get_privacy_url; } ?>"></td>
            </tr>
            <tr>
              <td><div align="left">Help URL</div></td>
              <td><input name="help_url" type="text" class="text_field" id="help_url" value="<?php if(count($form_error_a)>0){ echo $get_help_url; } ?>"></td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td><?php echo recaptcha_get_html($publickey, $error); ?></td>
            </tr>
          </table></td>
          <td align="left" valign="top">&nbsp;</td>
        </tr>
      </table>
      <p align="center">
      <input type="submit" name="Submit" value="Create Application" class="login_button">
    </p>
  </form>
  </td>
</tr></table></td></tr></table><p align="center"><?php echo get_bottom(); ?></p><p align="center">&nbsp;</p></body></html>