// This is a self invoking function. 
// The $ parameter allows you to reference the jQuery item.
(function($){

// fn is essentially the same as prototype.
// so this will be used like $('#jqueryItem).twitterize(username)
$.fn.twitterize = function(username,options){
	
	//check to see if the username has been set.
	if (username){
		
		//create an object full of your default settings.
		var defaultSettings = {
			count:'1'
		}
		
		// Finds which default settings have been overwritten by the options object
		// and creates a new object with all the new and untouched settings.
		var settings = $.extend(defaultSettings, options);
	
		// The URL for the Twitter JSON API.
		var url = "http://twitter.com/status/user_timeline/"+username+".json?count="+settings.count+"&callback=?";
		
		//Variable to get around scope problem in callback function.
		var holder = this;
		
		$.getJSON(url,
		
		//This function is called when twitter responds with the appropriate information.
	    function(data){
	    	
	    	//Step through each tweet.
			$.each(data, function(i, item) {
				
				//place the tweet within a li tag.
				holder.append("<li>"+item.text.makeLinks()+"</li>");
	
			});
	    });
	    
    }else{
    	//Username paramater hasn't been set.
    	console.debug("jquery plugin twitterize requires a username! Check your parameters");

    }
    
    
    //Changes urls within the tweet into links.
    String.prototype.makeLinks = function() {
		return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/, function(str) {
    	return str.link(str);
 		});
 	}; 

	
//Return itself
return this;

};

// We pass "jQuery" to the self invoking function 
// so we can use whatever alias of jQeury that we like. 
// So instead of "$" you could also use any other 
// valid JavaScript variable name.

})(jQuery);