// Load page content into different sections

(function () {
  
  "use strict"; // jshint ;_;
  
  var window = this;
    
  // Default private variables.
  var sections = [ "chumpi", "achuar", "territory", "oil", "action" ]; // sub-pages to load.
  var loadedCount = 0; // keeps track of sub-page loading
  var lang = "en"; // default language of the page.
  
  // Selectors
  var navSel = function (text) { return '.nav a[href*=#'+text+']'; };
  var fullnameSel = "#mce-name";
  var responseSel = "#response";
  var loadStr = function(text) { return lang+"/"+text+".html section .container"; };
  
  // jQuery or ender own the $ variable for selector support
  var $ = window.jQuery || window.ender;  

  // The top-level namespace. All public classes and modules will
  // be attached to this.
  var Page = window.Page = {};
  
  Page.init = function() {
    for(var i = 0, len = sections.length; i < len; ++i) {
      loadSection(sections[i]);
    }
  };
  
  function sectionsCount() { return sections.length; }
    
  function setupScrollto(section) {
    $(navSel(section)).click(function(event){    
      event.preventDefault();
      var offset = $(this).parent().prev().length ? 0 : 265;
      var scrollSrc = $(window).scrollTop();
      var scrollDest = $(this.hash).offset().top + offset;
      $('html,body').animate({scrollTop:scrollDest}, Math.round(Math.abs(scrollDest - scrollSrc) / 3));
    });
  }
  
  function loadSection(section) {
    if ($("#"+section).html().trim() === "") { // Check if section is empty before loading.
      $("#"+section).load(loadStr(section), function() {
        setupScrollto(section);
        loadedCount += 1;
        if (loadedCount === sectionsCount()) pageReady();
      });
    } else {
      setupScrollto(section); // If it isn't empty, just set up smooth scrolling to that section.
      loadedCount += 1;
    }
  }
  
  function pageReady() {
    setupBasicEvents();
    $("#slideshow").carousel( { pause: 'none' }).carousel('pause');
    setupForm("#newsletter-form");
    setupShareWindow('a[href*="twitter.com"], a[href*="facebook.com"]');
  }
  
  function setupBasicEvents() {
    // Set up scrollspy to highlight navigation as use scrolls through document
    $('body').scrollspy( { target: '.topbar', offset: 20} );
    // Add video loading graphic and hide play button when pressed
    $('.play').click(function(){
      $(".video iframe").addClass("loading");
      $('.play').hide();
    });
  	// Fade out "Share this" helper text after initial page scroll
  	// Fade helper text back in when mouse is over share buttons
    $(window).one("scroll", function() {
      $('.share-this').delay(1000).fadeOut();
      $(".share a").on("mouseenter mouseleave", function() {
        $('.share-this').fadeToggle("fast");
      });
    });
    // Set a cookie to remember when a user chooses to change the language
    $('.lang a').click(function(e) {
      $.cookie('site_language', this.text.replace(/^\[|\]$/g, ''), { path: '/' });
    });
  }
    
  function setupForm(sel) {
    $(fullnameSel).on("keyup", function() { window.parseName(this); });
    $(sel).submit(function() {
      var data = $(this).serialize();
      var that = this;
      $(responseSel).animate({height: "hide", opacity: "hide"}, "fast").removeClass("alert-success alert-error");
      $("input", this).attr("disabled", "disabled").addClass("disabled");
      $.ajax({
        url: "http://amazonwatch.us1.list-manage2.com/subscribe/post-json",
        data: data,
        dataType: "jsonp",
        jsonp: "c",
        success: function(data) {
          var resultTitleCased = data.result.charAt(0).toUpperCase()+data.result.substr(1);
          $(responseSel)
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
  }
  
  function setupShareWindow (sel) {
    var width  = 640,
        height = 352;
    // Open share window when a share button is pressed
    $(sel).click(function(e) {
      var left   = ($(window).width()  - width)  / 2,
          top    = ($(window).height() - height) / 2,
          opts   = "status=1,width="+width+",height="+height+",top="+top+",left="+left;
      e.preventDefault();
      window.open(this.href, 'Share', opts);
    });
  }
  
}).call(this);


$(function($) {
  
  Page.init();

});




