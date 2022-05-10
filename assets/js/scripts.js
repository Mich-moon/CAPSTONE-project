/* ==========================================================================
   other scripts
   ========================================================================== */

   // {% include /assets/js/file.js %}

$(document).ready(function() {

    // reveal faq content
    $(".faq-title").on("click", function(event) {
      event.preventDefault();

      var content = $(this).parent().find(".faq-content")[0];

        if (content.style.display == "none") {
            content.style.display = "block";
        } else {
            content.style.display = "none";
        }
    });

});
  