Meteor.publishComposite('transactions', {
    find: function(){
        console.log('subscribe to transaction.');
        return co.transactions.find({}, {sort: {time: -1}});
    }
});