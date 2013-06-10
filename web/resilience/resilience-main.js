define(['jquery', 'jio'], function($, JIO) {
  return function(properties) {
    var attach = properties.jioAttach;

    JIO.getAttachment(attach, function(err, ret) {
      if (err) { throw new Error(err); }
      var u = URL.createObjectURL(ret);
      $('#pdfjs-gadget-iframe').attr('src', properties.viewerPath
                                            + '/pdfjs/viewer.html?file=' + encodeURIComponent(u));
    });

    var win = $('#pdfjs-gadget-iframe')[0].contentWindow;
    var doc = $(win.document);
    var head = $(doc.find('head')[0]);

    var locale = properties['locale'];
    if (typeof(locale) === 'string') {
      doc.write('<link rel="resource" type="application/l10n" href="l10n/' +
        locale + '/viewer.properties"/>');
    }

  };
});
