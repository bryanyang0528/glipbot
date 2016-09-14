var _ = require('underscore'),
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
};

_.extend(Yo.prototype, {
	name: 'Yo',
	help_text: 'Purpose: Chat Bot \nUsage: !yo [anything you want to say]',
	handle_message: function(type, data) {
		if (type === this.bot.type_ids.TYPE_ID_POST && data.text && !data.deactivated) {
			var text = data.text;
			var test = text.match(/^\!yo (.*?)$/i);
			if (test && test.length > 0) {
				var content = test.subarray(1,-1);
				var self = this;
					// maybe use first.forecast at some point
				return self.bot.post(data.group_id, "Yo");
				};
			}
		}
});

module.exports = Yo;
