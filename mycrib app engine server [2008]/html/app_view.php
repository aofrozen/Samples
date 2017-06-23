<html><head><meta http-equiv="Pragma" content="no-cache"><meta http-equiv="expires" content="0"><meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"><title></title><style type="text/css">@import"http://cache2.mycrib.net/css/core.css";@import"http://cache2.mycrib.net/css/edit_profile.css";@import"http://cache2.mycrib.net/css/vid.css";.vid_th_area img{background:#FFFFFF;}</style>
<link rel="stylesheet" href="http://cache2.mycrib.net/css/modal-message.css" type="text/css">
<script language="javascript" src="http://cache2.mycrib.net/js/modal-message.js"></script>
<script language="javascript" src="http://cache2.mycrib.net/js/ajax.js"></script>
<script type="text/javascript" src="http://cache2.mycrib.net/js/ajax-dynamic-content.js"></script>
<script language="javascript" src="http://cache2.mycrib.net/js/dialog.js"></script></head><body marginheight="0" marginwidth="0" topmargin="0" bottommargin="0"><table width="780" border="0" align="center" cellpadding="0" cellspacing="0"><tr><td bgcolor="white"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td class="mycrib_logo_menu_background"><div align="center"><?php echo get_main_menu($user_id, 0); ?></div></td></tr></table><br>
      <table width="780" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td valign="bottom"><ul id="tablinks">
              <li><a href="http://app.mycrib.net/?tag=create">Create Application</a></li>
              <li class="current"><a href="http://app.mycrib.net/?tag=view">View My Apps</a></b></li>
              <li><a href="http://docs.app.mycrib.net/">Docs</a></li>
              <li><a href="http://app.mycrib.net/console.php">Tools</a></li>
              <li><a href="http://community.app.mycrib.net/">Developer Site</a></li>
          </ul></td>
        </tr>
      </table>
      <table width="780" border="0" cellspacing="0" cellpadding="10" class="box"><tr>
  <td><div class="warning">View my apps page is under construction. </div>
    <?php if($update == 's1') { ?><div class="warning"><b>The app has been deleted.</b></div><?php } ?>
  <?php echo $html; ?>
    </td>
</tr></table></td></tr></table><p align="center"><?php echo get_bottom(); ?></p><p align="center">&nbsp;</p></body></html>