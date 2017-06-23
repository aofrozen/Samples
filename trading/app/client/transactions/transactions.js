Template.transactions.helpers({
    'transactions' : function()
    {
        return Template.instance().getTransactions();
    }
});

Template.transactions.events({});

Template.transactions.onCreated(function(){
    var instance = this;
    Meteor.subscribe('transactions');
    instance.getTransactions = function(){
        return co.transactions.find({}, {sort: {time: -1}}).fetch();
    };
});

Template.transactions.onRendered = function(){

};