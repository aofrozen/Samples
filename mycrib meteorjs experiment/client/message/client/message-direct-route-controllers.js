/**
 * Created by aofrozen on 8/21/2015.
 */
MessagesController = RouteController.extend({
    action: function () {
        // set the reactive state variable "postId" with a value
        // of the id from our url
        this.state.set('userId', this.params.userId);
        this.render();
    },
    fastRender: true
});