/////////////////////////////////////
//       BEGIN DOCUMENT READY      //
/////////////////////////////////////
$(function(){

  // Next Button
  $('.next').on('click', function(){

    var eMail = $('.email-address').val();
    var atpos = eMail.indexOf("@");
    var dotpos = eMail.lastIndexOf(".");

    if($('.first-name').val().length < 1){
      $('.form-error').html('Please enter your first name.');
    }
    else if($('.last-name').val().length < 1){
      $('.form-error').html('Please enter your last name.');
    }
    else if(atpos< 1 || dotpos<atpos+2 || dotpos+2>=eMail.length){
      $('.form-error').html('Please enter a valid email address.');
    }
    else if(!$('.rules').prop('checked')){
      $('.form-error').html('Please agree to the rules.');
    }
    else{
      $('#shares').removeClass('hider');
      $('.goog-inline-block').removeClass('hider');
      $('#first-section').addClass('hider');
      $('.form-error').html('');
    }
  });

  // fbshare click event
  $('.fbclick').on('click', function(){
    fbShare();
  });

  // Thank you message
  $('#hidden_iframe').load(function(){
    if (submitted) {
      $('.ss-form').html('<h2 class=\'thanks\'>'+ thankYouMsg  +'</h2>');
    }
  });



  /////////////////////////////////////
  //         BEGIN API HOOKS         //
  /////////////////////////////////////

  //        Facebook API HOOKS       //
  window.fbAsyncInit = function() {
    FB.init({
      appId      : fbAppId,
      xfbml      : true,
      version    : 'v2.3'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

  /////////////////////////////////////
  //           END API HOOKS         //
  /////////////////////////////////////



  /////////////////////////////////////
  //      BEGIN SHARE MECHANISMS     //
  /////////////////////////////////////
  //      Facebook Share function    //
  function fbShare() {
    FB.ui(
    {
      method: 'feed',
      name: fbShareTitle,
      link: fbShareLink,
      picture: fbImageUrl,
      caption: fbSubText,
      description: fbDialog
    },
    function(response) {
      if (response && response.post_id) {
        // Successful Facebook Share Callback
        $('.fb-check').prop('checked', true);
        $('.fbclick').hide();
        $('.right').css({'width':'100%','margin-left':'0'});
        $('.form-error').html('');
        shareCount = shareCount + 1;
        if (shareCount == 2){
          $('.check-wrap').removeClass('hider');
        }
      } else {
        // Unsuccessful Facebook Share Callback
        $('.fb-check').prop('checked', false);
      }
    }
    );
  }

  //      Twitter Share Callback     //
  $.getScript("http://platform.twitter.com/widgets.js", function(){
     function handleTweetEvent(event){
       if (event) {
          $('.tw-check').prop('checked', true);
          $('.right').hide();
          $('.left').css({'width':'100%'});
          $('.form-error').html('');
          shareCount = shareCount + 1;
          if (shareCount == 2){
            $('.check-wrap').removeClass('hider');
          }
       }
     }
     twttr.events.bind('tweet', handleTweetEvent);
   });
  /////////////////////////////////////
  //      END SHARE MECHANISMS       //
  /////////////////////////////////////

});
/////////////////////////////////////
//        END DOCUMENT READY       //
/////////////////////////////////////


/////////////////////////////////////
//          Validate Shares        //
/////////////////////////////////////
function validateShare(){
  if (shareCount < 2){
    $('.form-error').html('Please complete both shares.');
    return false;
  }
  else{
    submitted = true;
  }

}
/////////////////////////////////////
//      END Validate Shares        //
/////////////////////////////////////


/////////////////////////////////////
//          GENERATE FORM          //
/////////////////////////////////////

(function ($) {
  var source ='<script>var fbAppId=\"{{fbAppId}}\"; var fbShareTitle=\"{{fbShareTitle}}\"; var fbShareLink= \"{{fbShareLink}}\"; var fbImageUrl= \"{{fbImageUrl}}\"; var fbSubText= \"{{fbSubText}}\"; var fbDialog= \"{{fbDialog}}\"; var thankYouMsg= \"{{thankYouMsg}}\"; var submitted=false;var shareCount=0;</script><div id=\"fb-root\"></div><iframe name="hidden_iframe" id="hidden_iframe" style="display:none;"></iframe><div id=\"contest-wrapper\"> <p class=\"form-error\"><p> <div class=\"ss-form\"> <form action=\"https://docs.google.com/a/trendsettermarketing.net/forms/d/{{formActionUrlId}}/formResponse\" method=\"POST\" id=\"ss-form\" target=\"hidden_iframe\" onsubmit=\"validateShare();\"> <ol role=\"list\" class=\"ss-question-list\" style=\"padding-left: 0\"> <section id=\"first-section\"> <div class=\"ss-form-question errorbox-good\" role=\"listitem\"> <div dir=\"ltr\" class=\"ss-item ss-text\"> <div class=\"ss-form-entry\"> <input type=\"text\" name=\"entry.{{firstNameId}}\" value=\"\" class=\"ss-q-short first-name\" id=\"entry_{{firstNameId}}\" dir=\"auto\" aria-label=\"Input 1 \" title=\"\" placeholder=\"First Name\"> </div></div></div><div class=\"ss-form-question errorbox-good\" role=\"listitem\"> <div dir=\"ltr\" class=\"ss-item ss-text\"> <div class=\"ss-form-entry\"> <input type=\"text\" name=\"entry.{{lastNameId}}\" value=\"\" class=\"ss-q-short last-name\" id=\"entry_{{lastNameId}}\" dir=\"auto\" aria-label=\"Input 2 \" title=\"\" placeholder=\"Last Name\"> </div></div></div><div class=\"ss-form-question errorbox-good\" role=\"listitem\"> <div dir=\"ltr\" class=\"ss-item ss-text\"> <div class=\"ss-form-entry\"> <input type=\"text\" name=\"entry.{{emailId}}\" value=\"\" class=\"ss-q-short email-address\" id=\"entry_{{emailId}}\" dir=\"auto\" aria-label=\"Input 3 \" title=\"\" placeholder=\"Email Address\"> </div></div></div><section id=\"legal\"> <div class=\"ss-form-question errorbox-good\" role=\"listitem\"> <div dir=\"ltr\" class=\"ss-item ss-checkbox\"> <div class=\"ss-form-entry\"> <ul class=\"ss-choices\" role=\"group\" aria-label=\"Opt In \"> <li class=\"ss-choice-item\"> <label> <span class=\"ss-choice-item-control goog-inline-block\"> <input type=\"checkbox\" name=\"entry.{{optInId}}\" value=\"I agree to receive emails\" id=\"group_{{optInId}}_1\" role=\"checkbox\" class=\"ss-q-checkbox\" checked=\"true\"> </span> <span class=\"ss-choice-label\">I agree to receive emails from {{contactName}}.</span> </label> </li></ul> </div></div></div><div class=\"ss-form-question errorbox-good\" role=\"listitem\"> <div dir=\"ltr\" class=\"ss-item ss-checkbox\"> <div class=\"ss-form-entry\"> <ul class=\"ss-choices\" role=\"group\" aria-label=\"Agree to Rules \"> <li class=\"ss-choice-item\"> <label> <span class=\"ss-choice-item-control goog-inline-block\"> <input type=\"checkbox\" name=\"entry.{{rulesId}}\" value=\"I agree to the rules\" id=\"group_{{rulesId}}_1\" role=\"checkbox\" class=\"ss-q-checkbox rules\"> </span> <span class=\"ss-choice-label\">I agree to the <a href=\"{{rulesLink}}\" target=\"_blank\">rules</a>.</span> </label> </li></ul> </div></div></div></section> <div class=\"contest-btn next\"> NEXT → </div></section> <section id=\"shares\" class=\"hider\"> <h4 class=\"sharehead\">Share this page to complete your entry</h4> <div class=\"btn-wrap fbclick left\"> <div class=\"btn btn-facebook fbbtn\"> <i class=\"fa fa-facebook\"></i> </div><p>Share</p></div><div class=\"ss-form-question errorbox-good hider\" role=\"listitem\"> <div dir=\"ltr\" class=\"ss-item ss-checkbox\"> <div class=\"ss-form-entry\"> <ul class=\"ss-choices\" role=\"group\" aria-label=\"Facebook Share \"> <li class=\"ss-choice-item\"> <label> <span class=\"ss-choice-item-control goog-inline-block\"> <input type=\"checkbox\" name=\"entry.{{fbCheckId}}\" value=\"True\" id=\"group_{{fbCheckId}}_1\" role=\"checkbox\" class=\"ss-q-checkbox fb-check\"> </span> <span class=\"ss-choice-label\">True</span> </label> </li></ul> </div></div></div><div class=\"btn-wrap right\"> <a href=\"https://twitter.com/intent/tweet?text={{tweet}}{{twitterUser}};url={{twitterUrl}};hashtags={{twitterHashtag}};\" title=\"Share on Twitter\" target=\"_blank\" class=\"btn btn-twitter\"> <div class=\"twbtn\"> </div><p>Tweet</p></a> </div><div class=\"ss-form-question errorbox-good hider\" role=\"listitem\"> <div dir=\"ltr\" class=\"ss-item ss-checkbox\"> <div class=\"ss-form-entry\"> <label class=\"ss-q-item-label\" for=\"entry_1030731654\"> <div class=\"ss-q-title\">Twitter Share</div></label> <ul class=\"ss-choices\" role=\"group\" aria-label=\"Twitter Share \"> <li class=\"ss-choice-item\"> <label> <span class=\"ss-choice-item-control goog-inline-block\"> <input type=\"checkbox\" name=\"entry.{{twitterCheckId}}\" value=\"True\" id=\"group_{{twitterCheckId}}_1\" role=\"checkbox\" class=\"ss-q-checkbox tw-check\"> </span> <span class=\"ss-choice-label\">True</span> </label> </li></ul> </div></div></div><div class=\"check-wrap hider\"> <img class=\"checkmark\" src=\"/images/check-mark.png\"> <p>You may now submit your entry.</p></div></br> <small>*Entries will not count unless both shares are completed.</small> </section> <input type=\"hidden\" name=\"draftResponse\" value=\"[,,&quot;4687543796847312923&quot;]\"> <input type=\"hidden\" name=\"pageHistory\" value=\"0\"> <input type=\"hidden\" name=\"fbzx\" value=\"4687543796847312923\"> <div class=\"ss-item ss-navigate\"> <table id=\"navigation-table\"> <tbody> <tr> <td class=\"ss-form-entry goog-inline-block hider\" id=\"navigation-buttons\" dir=\"ltr\"> <input type=\"submit\" name=\"submit\" value=\"Submit\" id=\"ss-submit\" class=\"jfk-button jfk-button-action contest-btn\"> </td></tr></tbody> </table> </div></ol> </form> </div></div>';

  var template = Handlebars.compile(source);

  // @option formAction [String] - the action of the form
  // @option fbAppId [String] - the Facebook App Id
  $.fn.shareWidgetContest = function (options) {
    var html = template(options.context);
    $(this).html(html);
  }
}(window.jQuery));
/////////////////////////////////////
//        END GENERATE FORM        //
/////////////////////////////////////
