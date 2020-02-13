import {are, have} from '../libraries/regex/subjectVerb'


function doUndo() {
    document.execCommand("undo", false, null);
  }

export function btn(mistake,repl) {

    $(".btn-0")
    .text(repl)
    .show();
  $(".btn-0").click(function() {
    let replaceRX = new RegExp(`\\b${mistake}\\b`, "g");
    if (mistake instanceof RegExp) {
      replaceRX = mistake
      if (mistake === are) mistake = 'are'
      if (mistake === have) mistake = 'have'
    }

    $("textarea").val(
      $("textarea")
        .val()
        .replace(replaceRX, repl)
        .replace(/(\(){2,}/g,'(')
        .replace(/(\)){2,}/g,')')
        .replace(/(,){2,}/g,',')
    )
    $(`span:contains(${mistake})`).css("display", "none");
    $('.comment').hide()
    $(".btn-0").unbind("click");
    setTimeout(doUndo(), 1);
  });


}

export function btns(mistake,repls) {
  for (let r = 0; r < repls.length; r++) {
    $(`.btn-${r.toString()}`).text(repls[r].trim());
    $(`.btn-${r.toString()}`).show();
    $(`.btn-${r.toString()}`).click(function() {
      let replaceRX = new RegExp(`\\b${mistake}\\b`, "g");
      $("textarea").val(
        $("textarea")
          .val()
          .replace(replaceRX, $(this).text())
      );
      $(`span:contains(${mistake})`).css("display", "none");
      $('.comment').hide()
      setTimeout(doUndo(), 1);
      $(".comment-replaces")
        .children()
        .unbind("click");
    });

  }
}