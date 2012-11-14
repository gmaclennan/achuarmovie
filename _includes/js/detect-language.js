// Detects browser language and use language preference
// and redirects to correct language of page

$(function($) {
    page.lang = $('html').attr('lang');
    $.ajax({ 
        url: "http://ajaxhttpheaders.appspot.com", // Returns request headers including browser language
        dataType: 'jsonp', 
        success: function(headers) {
            var browserLang = headers['Accept-Language'].substring(0,2);
            var siteLanguages = ['en','es'];
			var userLang = $.cookie('site_language').toLowerCase();
            if (($.inArray(browserLang, siteLanguages) > -1) 
				&& (page.lang != browserLang)
				&& (page.lang != userLang))
				{ window.location.pathname = browserLang === "en" ? "" : browserLang; }
        }
    });
});