$(document).on("pagecreate", function() {
    $("body > [data-role='panel']").panel().enhanceWithin();
    $("body > [data-role='panel'] [data-role='listview']").listview().enhanceWithin();

    $(document).on("swiperight", function (e) {

        if ($(".ui-page-active").jqmData("panel") !== "open") {
            if (e.type === "swiperight") {
                $("#menu").panel("open");
            }
        }
    });
});