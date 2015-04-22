#ShareContest
####This plugin has handlebars.js baked in. It is dependent on jQuery, Google Forms, Facebook, and Twitter.

Use this plugin to create share contests for email capture. It has built in validation for input fields and shares.

####How To Use:

Attach this plugin beneath jQuery. Initialize it by placing the following just before your closing ```</body>``` tag and following the two previously mentioned scripts.

```javascript
<script type="text/javascript">
  $("#contest").shareContestTW({
    context: {
      fbAppId: "[YOUR-FB-APP-ID]",
      fbShareTitle: "This is the Facebook Share Title",
      fbShareLink: "http://this-is-the-share-link.com",
      fbImageUrl: "http://fbrell.com/f8.jpg",
      fbSubText: "This is the subtext",
      fbDialog: "This is the share text. This is the share text. This is the share text. This is the share text.",
      tweet: "This%20is%20a%20test%20tweet%20from%20",
      twitterUser: "@dudeguytestguydude",
      twitterUrl: "http://google.com",
      twitterHashtag: "test",
      formActionUrlId: "[YOUR-URL-FOR-YOUR-FORM-ACTION]",
      firstNameId: "749925490",
      lastNameId: "453795809",
      emailId: "1493557255",
      optInId: "583147646",
      rulesId: "1082888376",
      fbCheckId: "701792494",
      twitterCheckId: "1730686214",
      contactName: "Mr. Coolguy",
      rulesLink: "http://google.com",
      thankYouMsg: "Thank you for entering!",
    }
  });
</script>
```

Then place the following anywhere on your page:
```html
<div id="contest"></div>
```

The plugin will do the rest for you.
