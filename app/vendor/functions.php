<?php

function sec_session_start() {
    $session_name = 'sec_session_id';   // Set a custom session name
    // This stops JavaScript being able to access the session id.
    $httponly = true;
    // Forces sessions to only use cookies.
    ini_set('session.use_only_cookies', 1);

    // Gets current cookies params.
    $cookieParams = session_get_cookie_params();
    session_set_cookie_params(60*60,
        $cookieParams["path"],
        $cookieParams["domain"],
        false,
        $httponly);
    // Sets the session name to the one set above.
    session_name($session_name);
    session_start();            // Start the PHP session
    session_regenerate_id(true);    // regenerated the session, delete the old one.
}