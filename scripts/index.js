function onSignIn(googleUser) {
    //window.location.href='logged.html';
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    
    localStorage.setItem('userProfile', JSON.stringify(profile));
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    console.log('User signed out.');

    localStorage.removeItem('userProfile');
    });
}


//$(document).ready(function() {
    window.setTimeout(function(){
        function filterPath(string) {
            console.log("osa1");
          return string
            .replace(/^\//,'')  
            .replace(/(index|default).[a-zA-Z]{3,4}$/,'')  
            .replace(/\/$/,'');
        }
        $('a[href*=#]').each(function() {
            console.log("osa2");
          if ( filterPath(location.pathname) == filterPath(this.pathname)
          && location.hostname == this.hostname
          && this.hash.replace(/#/,'') ) {
            var $targetId = $(this.hash), $targetAnchor = $('[name=' + this.hash.slice(1) +']');
            console.log($targetAnchor);
            var $target = $targetId.length ? $targetId : $targetAnchor.length ? $targetAnchor : false;
             if ($target) {
                 console.log($target.offset());
               var targetOffset = $target.position().top;
               $(this).click(function() {
                   console.log("osa3");
                 $('html, body').animate({scrollTop: targetOffset}, 500);
                 return false;
               });
            }
          }
        });
          },2500);
      //});
      