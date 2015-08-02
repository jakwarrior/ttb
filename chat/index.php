<?php
/*
 * @package AJAX_Chat
 * @author Sebastian Tschan
 * @copyright (c) Sebastian Tschan
 * @license Modified MIT License
 * @link https://blueimp.net/ajax/
 */

include_once '../app/vendor/functions.php';

if (!isset($_COOKIE['username']) || !isset($_COOKIE['pwd_string'])) {
    header("Location: /account/auth"); /* Redirect browser */
    exit();
} else {
    // Suppress errors.
    error_reporting(0);

// Path to the chat directory:
    define('AJAX_CHAT_PATH', dirname($_SERVER['SCRIPT_FILENAME']).'/');

// Include custom libraries and initialization code:
    require(AJAX_CHAT_PATH.'lib/custom.php');

// Include Class libraries:
    require(AJAX_CHAT_PATH.'lib/classes.php');

// Initialize the chat:
    $ajaxChat = new CustomAJAXChat();
}

?>