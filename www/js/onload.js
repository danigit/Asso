$(document).on("pagecreate", function() {
    $("body > [data-role='panel']").panel().enhanceWithin();
    $("body > [data-role='panel'] [data-role='listview']").listview().enhanceWithin();
});