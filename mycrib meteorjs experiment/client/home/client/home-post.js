"use strict";

Template.homePost.onCreated(function(){
	m.sset('timeline-embed-active', false); //default
    m.sset('timeline-post-type', 'short'); //default
    var instance = this;
    Meteor.subscribe('timeline', m.uid());
    instance.autorun(function(){
        instance.profile = function(){
            return co.userProfiles.findOne({'userId' : m.uid()});
        };

    });
});

Template.homePost.events({
	'submit .home-post-form' : function(e){
		e.preventDefault();
		/*
			Collect
				1. Journal or status option
				2. title *
				3. body
				4. photos
				5. embed data
		*/
        var embedLinkEl = $('.embed-link'), postDataEl = $('.post-data');
        if(postDataEl.val() != '')
        {
            embedLinkEl.attr('disabled', true);
            postDataEl.attr('disabled', true);
        var post = $(e.target).find('.post-data').val(),
            title = $(e.target).find('title-data').val(),
            postType = m.sget('timeline-post-type'),
            embedEnabled = m.sget('timeline-embed-active'),
            embed;
            embed = (embedEnabled && embedLinkEl.val() !== '') ?  _clientCollection.embeds.findOne({}) : {};
            if(typeof embed.data !== 'undefined')
                embed.data.link = embedLinkEl.val();
            var data = {'postType' : postType, 'title' : title, 'body' : post, 'embed' : embed};

            Meteor.call('timeline.post', data, function(err, result){
                embedLinkEl.attr('disabled', false);
                postDataEl.attr('disabled', false);
                embedLinkEl.val('');
                postDataEl.val('');
                if(_clientCollection.embeds.find().count() > 0)
                {
                    _clientCollection.embeds.remove({});
                    $('.embed-attachment').html('');
                }
            });
        }
	},
	'click .home-post-btn' : function(e){
		e.preventDefault();
		$('.home-post-form').submit();
	},
	'click .photo-btn' : function(e){
		m.log('clicked photo btn');
        alert('This photo attachment will be available soon.');
		//upload photos
	},
	'click .embed-btn' : function(e){
        var embedLinkEl = $('.embed-link');
        if(embedLinkEl.hasClass('hidden'))
        {
            embedLinkEl.removeClass('hidden');
            m.sset('timeline-embed-active', true);
        }else{
            embedLinkEl.addClass('hidden');
            m.sset('timeline-embed-active', false);
            _clientCollection.embeds.remove({});
            embedLinkEl.val('');
        }
	},
    'paste .embed-link, change .embed-link' : function(e, temp){
        var embedLinkEl = $('.embed-link'), value;
        if(_clientCollection.embeds.find().count() > 0)
            $('.embed-attachment').html('');
        Meteor.setTimeout(function(){
            value = e.target.value;
            embedLinkEl.attr('disabled', true);
            deEmbedly.get({'url' : value}, function(data){
                if(data.data.type === 'video')
                {
                    data.data.html = deEmbed.convertCodeToEmbed(data.data.html);
                }
                _clientCollection.embeds.remove({});
                Meteor.setTimeout(function(){
                    _clientCollection.embeds.insert(data);
                    //deEmbed.convert($('.embed-attachment'));
                    embedLinkEl.attr('disabled', false);
                },200);
            });
        }, 200);

    },
    'click .journal-option' : function(e){
        e.preventDefault();
        m.sset('timeline-post-type', 'long');
    },
    'click .update-status-option' : function(e){
        e.preventDefault();
        m.sset('timeline-post-type', 'short');
    }
});

Template.homePost.helpers({
    'embedData' : function(){
        return _clientCollection.embeds.findOne();
    },
    'timeline' : function(){
    	return co.timeline.find({'userId' : m.uid()});
    },
    'isEmbedActive' : function(){
        return m.sget('timeline-embed-active');
    },
    'checkEmbedType' : function(val){
        if(typeof this === 'undefined')
            return false;
    	return this.type === val;
    }
});

Template.homePost.rendered = function(){
    deEmoji.init('textarea');
};