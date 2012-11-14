// Load page content into different sections


page = {
  
  lang: "en",
  
  sections: [],
  
  sectionsCount: function () { return this.sections.length },
  
  loadedCount: 0,
  
  init: function(sections) {
    var that = this;
    this.setupScrollto("chumpi");
    $.each(sections, function(i,section) {
      that.loadSection(section);
    });
  },
  
  setupScrollto: function(section) {
    $('.nav a[href*=#'+section+']').click(function(event){		
  		event.preventDefault();
  		var offset = $(this).parent().prev().length ? 0 : 265;
  		var scrollSrc = $(window).scrollTop();
  		var scrollDest = $(this.hash).offset().top + offset;
  		$('html,body').animate({scrollTop:scrollDest}, Math.round(Math.abs(scrollDest - scrollSrc) / 3));
    });
  },
  
  loadSection: function(section, callback) {
    var that = this;
    $("#"+section).load(this.lang+"/"+section+".html section .container", function(data, loadStatus) {
      that.setupScrollto(section);
      $('body').scrollspy('refresh');
      that.loadedCount += 1;
      if (that.loadedCount === that.sectionsCount()) that.pageReady();
    });
  },
  
  pageReady: function() {
    this.pauseCarousel();
    this.setupForm();
    this.setupShareWindow();
  },
    
  pauseCarousel: function() {
    $('#slideshow').carousel( { pause: 'none' }).carousel('pause');
  },
    
  setupForm: function() {
    $("#mce-name").on("keyup", function() { parseName(this); });
    $("#newsletter-form").submit(function() {
      var data = $(this).serialize();
      var that = this;
      $("#response").animate({height: "hide", opacity: "hide"}, "fast").removeClass("alert-success alert-error");
      $("input", this).attr("disabled", "disabled").addClass("disabled");
      $.ajax({
        url: "http://amazonwatch.us1.list-manage2.com/subscribe/post-json",
        data: data,
        dataType: "jsonp",
        jsonp: "c",
        success: function(data) {
          var resultTitleCased = data.result.charAt(0).toUpperCase()+data.result.substr(1);
          $("#response")
            .addClass("alert-"+data.result)
            .html("<strong>"+resultTitleCased+"!</strong> "+data.msg)
            .animate({height: "show", opacity: "show"});
          if (data.result == "error") {
            $("input", that).removeAttr("disabled").removeClass("disabled");
          }
        }
      });
      return false;
    });
  },
  
  setupShareWindow: function () {
  
  	// Open share window when a share button is pressed

  	$('a[href*="twitter.com"], a[href*="facebook.com"]').click(function(e) {
  	    e.preventDefault();
  	    openShareWindow(this.href);
  	});

  }
    
};

page.sections = [ "achuar", "territory", "oil", "action" ];


$(function($) {
  
  page.init(page.sections);

});




