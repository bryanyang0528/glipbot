var _ = require('underscore'),
    sbot = require('sbot'),
    fast_bindall = require('fast_bindall');

Array.prototype.subarray=function(start,end){
     if(!end){ end=-1;} 
    return this.slice(start, this.length+1-(end*-1));
}

var Yo = function(options) {
	_.extend(this, options);
	fast_bindall(this);
	if (!this.bot) {
		throw "Handler requires bot";
	}
	this.bot.on('message', this.handle_message);
    this.sbot = new sbot();
};

_.extend(Yo.prototype, {
	name: 'Yo',
	help_text: 'Purpose: Chat Bot \nUsage: !yo [anything you want to say]',
	handle_message: function(type, data) {
		if (type === this.bot.type_ids.TYPE_ID_POST && data.text && !data.deactivated) {
			var text = data.text;
			var test = text.match(/^\!yo (.*?)$/i);
			if (test && test.length > 0) {
				var content = test.subarray(1,-1).join(" ");
				var self = this;
                var url = "http://localhost:5000/bot/api/v1.0/" + encodeURIComponent(content);
                var self = this;
                this.sbot.fetch_object(url, {}, function(error, result) {
                    if (error || !result || !result.res ) {
                        console.warn(error);
                        return self.bot.post(data.group_id, "Bot is missing");
                    }
                    var text = result.res;
                    return self.bot.post(data.group_id, text);
					// maybe use first.forecast at some point
				   //return self.bot.post(data.group_id, "Yo");
                ;
            })
        }
    }
}
});

module.exports = Yo;
