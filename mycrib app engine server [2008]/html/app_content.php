<html><head><meta http-equiv="Pragma" content="no-cache"><meta http-equiv="expires" content="0"><meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"><title></title><style type="text/css">@import"http://cache2.mycrib.net/css/core.css";@import"http://cache2.mycrib.net/css/edit_profile.css";@import"http://cache2.mycrib.net/css/vid.css";.vid_th_area img{background:#FFFFFF;}</style><script language="javascript">g=document;k=true;v=false;gp=window;gr=confirm;gt=escape;function confirmDelete(){if(gr("Click Ok to delete this video")){return k}else{return v}}function confirmDefault(){if(gr("Click Ok to set this video as default")){return k}else{return v}} function check_form(){ if(document.forms[0].title.value != '' || document.forms[0].catid.value != 0) { }else{ alert('You need to complete video title and category.'); return false; }}</script></head><body marginheight="0" marginwidth="0" topmargin="0" bottommargin="0"><table width="780" border="0" align="center" cellpadding="0" cellspacing="0"><tr><td bgcolor="white"><table width="100%" border="0" cellspacing="0" cellpadding="0"><tr><td class="mycrib_logo_menu_background"><div align="center"><?php echo get_main_menu($user_id, 0); ?></div></td></tr></table><br><?php if(!empty($mc_header)) { echo $mc_header; } ?><table width="780" border="0" cellspacing="0" cellpadding="0"><tr><td width="720"><?php if(!empty($tab_items_list)) { echo $tab_items_list; } ?></td><td><sup><a href="<?php echo $help_link; ?>">Help</a></sup></td></tr></table>
<table width="780" border="0" cellspacing="0" cellpadding="0" class="box"><tr>
  <td><?php if(!empty($dashboard)) { echo $dashboard; } echo $mc_content; ?></td>
</tr></table></td></tr></table><p align="center"><?php echo get_bottom(); ?></p><p align="center">&nbsp;</p></body></html>