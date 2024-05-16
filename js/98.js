// This makes all the windows draggable and brings them to focus when they're selected
console.log("win98 script loaded");
let zindex = 1;

$(function () {
  $(".draggable").draggable({ handle: ".menuBar" });
  $(".draggable").resizable({ handles: "all" });
  $(".draggable").click(function () {
    $(this).css({ "z-index": zindex + 1 });
    zindex++;
    
  });

  // This is for closing windows
  $(".close").click(function (event) {
    event.preventDefault();
    let windowID = $(this).parents(".window").attr('id');
    $(this).parents(".window").hide();
    $(".minimized-app." + windowID).removeClass("active");
    
  });

  // This is for minimizing windows
  $(".minimize").click(function (event) {
    event.preventDefault();
    // Get the window's title
    let windowTitle = $(this).parent().children(".windowTitle");
    // Get the window's ID
    let windowID = $(this).parents(".window").attr('id');
    // Add an li element in our taskbar with text and a link that matches the window's title
    if (!$(".minimized-app." + windowID).length) {
      $("#minimizedApps").append("<li><a href='#' class='minimized-app " + windowID + "'>" + windowTitle.text() + "</a></li>");    // Hide the window as in the previous function
    $(this).parents(".window").hide()
    };
    
  });

  // This is for toggling menus
  $(".toggleMenu").click(function () {
    $("#beginMenu").toggle();
    
  });

  // This is specifically for the Begin menu in the taskBar
  $("#beginMenu").menu();

  // This is for any element that has the .menu class
  $(".menu").menu();

  // // This is for the settings pane
  // $("#settings .bgPicker img").click(function () {
  //   let url = $(this).attr("src");
  //   $("body").css("background-image", "url(" + url + ")");
  //   return false;
  // });

  // $("#jspaint-link").click(function () {
  //   $("#jspaint-iframe").attr("src", $("#jspaint-iframe").attr("https://jspaint.app/"));
  //   showWindow("jspaint");
  // });

  // Click event handler for minimized elements
  $(document).on('click', '.minimized-app', function (event) {
    event.preventDefault();
    let windowID = $(this).attr('class').split(' ')[1];
    showWindow(windowID);
    $(this).addClass("active");
    }
  );
});

function showWindow(windowID) {
  $("#" + windowID).show();
  $("#" + windowID).css({ "z-index": zindex + 1 });
  zindex++;
}

$(function () {
  $("#textpadWindow").draggable({ handle: ".menuBar" });
  $("#textpadWindow").resizable();
  $(".close").click(function (event) {
    event.preventDefault();
    let windowID = $(this).closest(".window").attr('id');
    $(this).closest(".window").hide();
    $(".minimized-app." + windowID).removeClass("active");
  });
  $(".minimize").click(function (event) {
    event.preventDefault();
    let windowID = $(this).closest(".window").attr('id');
    $(this).closest(".window").hide();
    $(".minimized-app." + windowID).removeClass("active");
  });

$(function () {
  $("#textpadWindow").draggable({ handle: ".menuBar" });
  $("#textpadWindow").resizable();
  $(".close").click(function () {
    $(this).closest(".window").hide();
    removeMinimizedApp($(this).closest(".window").attr('id'));
  });
  $(".minimize").click(function () {
    $(this).closest(".window").hide();
  });
  // Add any additional Textpad-specific functionality here
  // ...
    })
  })
;