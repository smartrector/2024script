let view = true;
$(".toggle").click(function () {
  if (view == true) {
    $(".gnbMenu").addClass("active");
    view = false;
  } else {
    $(".gnbMenu").removeClass("active");
    view = true;
  }
});
