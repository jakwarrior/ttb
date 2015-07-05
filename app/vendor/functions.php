<?php

function sec_session_start() {
    $session_name = 'sec_session_ttb';   // Set a custom session name
    // This stops JavaScript being able to access the session id.
    $httponly = true;
    // Forces sessions to only use cookies.
    //ini_set('session.save_path', $_SERVER['DOCUMENT_ROOT'].'/sessions');
    //session_save_path($_SERVER['DOCUMENT_ROOT'].'/sessions');
    ini_set('session.gc_maxlifetime',60*60*24*7);
    ini_set('session.gc_probability', 1);
    ini_set('session.gc_divisor', 100);
    ini_set('session.use_only_cookies', 1);

    // Gets current cookies params.
    $cookieParams = session_get_cookie_params();
    session_set_cookie_params(60*60*24*7,
        $cookieParams["path"],
        $cookieParams["domain"],
        false,
        $httponly);
    // Sets the session name to the one set above.
    session_name($session_name);
    session_start();            // Start the PHP session
    session_regenerate_id(true);    // regenerated the session, delete the old one.
}

function sec_chat_session_start() {
    $session_name = 'sec_session_ttb';   // Set a custom session name
    // This stops JavaScript being able to access the session id.
    $httponly = true;
    // Forces sessions to only use cookies.
    //ini_set('session.save_path', $_SERVER['DOCUMENT_ROOT'].'/sessions');
    //session_save_path($_SERVER['DOCUMENT_ROOT'].'/sessions');
    ini_set('session.gc_maxlifetime',60*60*24*7);
    ini_set('session.gc_probability', 1);
    ini_set('session.gc_divisor', 100);
    ini_set('session.use_only_cookies', 1);

    // Gets current cookies params.
    $cookieParams = session_get_cookie_params();
    session_set_cookie_params(60*60*24*7,
        $cookieParams["path"],
        $cookieParams["domain"],
        false,
        $httponly);
    // Sets the session name to the one set above.
    session_name($session_name);
    session_start();            // Start the PHP session
}

function sec_session_destroy() {
    // Unset all session values
    $_SESSION = array();

    // get session parameters
    $params = session_get_cookie_params();

    // Delete the actual cookie.
    setcookie(session_name(),
        '', time() - 42000,
        $params["path"],
        $params["domain"],
        $params["secure"],
        $params["httponly"]);

    // Destroy session
    session_destroy();
}