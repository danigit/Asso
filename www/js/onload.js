$(document).on("pagecreate", function() {
    // Panels (and any widgets within them) outside pages have to be initialised manually.
    $("body > [data-role='panel']").panel();
    $("body > [data-role='panel'] [data-role='listview']").listview();
    $("body > [data-role='panel'] [data-role='listdiveder']").listview();
});