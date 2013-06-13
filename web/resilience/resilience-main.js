define(['jquery', 'module'], function($, Module) {
  var HELP = "This is gadget for viewing .pdf files.\n" +
    "Configuration params:" +
    "    locale (string) will be used as the locale which the user interface is described in.\n" +
    "\n" +
    "Params should be a correctly formed JSON dict, eg: {\"locale\":\"en_US\"}\n";

  return function(getData, domLocation, action, params) {
    $(domLocation).prepend('<textarea cols="1" rows="1"></textarea>');
    var ta = $($(domLocation).children()[0]);
    ta.css({width:"100%", height:"100%"});

    var out = { getData: function(cb) { cb("pdf.js can't save"); } };

    var locale;
    if (params) {
      if (params === 'help') {
        ta.val(HELP);
      } else {
        try {
          locale = JSON.parse(params).locale;
        } catch (e) {
          ta.val(e.stack);
          return out;
        }
      }
    }

    if (!params || typeof(locale) !== 'undefined') {
      getData('blob', function(err, ret) {
        if (err) { return ta.val(err.stack); }
        var path = Module.uri.replace(/\/[^/]*$/, '/pdfjs/viewer.html?file=');
        $(domLocation).prepend('<iframe src="javascript:\'\'"></iframe>');
        var ifr = $($(domLocation).children()[0]);
        ifr.attr("width", $(domLocation).width());
        ifr.attr("height", $(domLocation).height());
        ifr.attr('src', path + encodeURIComponent(URL.createObjectURL(ret)));
        $(ta).remove();
      });
    }

    return out;
  };
});
