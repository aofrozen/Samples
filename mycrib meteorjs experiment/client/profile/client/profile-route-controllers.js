/**
 * Created by aofrozen on 8/12/2015.
 */
UserProfileController = RouteController.extend({
    action: function () {
        // set the reactive state variable "postId" with a value
        // of the id from our url
        this.state.set('userId', this.params.userId);
        this.render();
    }
});
