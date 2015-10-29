function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function setDysModeAccordingToCookie(){
    if (getCookie('dysmode') === 'off'){
        document.body.style.textTransform="none";
    }else{
        document.body.style.textTransform="uppercase";
    }
}                    

function switchDysMode(){
    if (getCookie('dysmode') === 'off'){
        setCookie('dysmode', 'on', 365);
    }else{
        setCookie('dysmode', 'off', 365);
    }
    setDysModeAccordingToCookie();
}