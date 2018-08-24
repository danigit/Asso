$(document).on("pagecreate", function() {
    $("body > [data-role='panel']").panel();
    $("body > [data-role='panel'] [data-role='listview']").listview();
    $("body > [data-role='panel'] [data-role='listdiveder']").listview();
});