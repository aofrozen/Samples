/**
 * Created by Justin on 12/9/15.
 */
Meteor.publishComposite('admin.getAllUsers', function(rows){
    console.log('publish: admin.getAllUsers');
    var user = this.user;
    if(!Roles.userIsInRole(user, ['admin-user']))
    {
        //this.stop();
        //return;
    }
   return {
       find: function(){
           return co.userProfiles.find({}, {limit: rows, sort: {creationDate: -1}});
       }
   }
});