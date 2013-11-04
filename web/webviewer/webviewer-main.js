/*global window, jQuery, rJS */
(function (window, $, rJS) {
  "use strict";

  rJS(window).declareMethod('setContent', function (url) {
    $(function() {
      PDFView.open(url, 0);
    });
  });

}(window, jQuery, rJS))
