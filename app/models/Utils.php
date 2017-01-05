<?php

class Utils extends Controller
{
    public function content_post_treatment($raw)
    {
        $raw = html_entity_decode($raw);

        $doc = new DOMDocument('1.0', 'UTF-8');
        $doc->loadHTML(mb_convert_encoding($raw, 'HTML-ENTITIES', 'UTF-8')); //pour éviter les problèmes d'encodage
        $xpath = new DOMXpath($doc);

        $rx = '%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i';
        $rx2 = '%(?:youtube(?:-nocookie)?\.com/)|youtu\.be/%i';

        foreach ($xpath->query('//a') as $a) {
            if (strlen($a->nodeValue) > 0) {
                if ($this->str_ends_with($a->nodeValue, '.mp4') || $this->str_ends_with($a->nodeValue, '.webm') || $this->str_ends_with($a->nodeValue, '.ogv')) {
                    $container = $doc->createElement('div');
                    $container->setAttribute('class', 'html5-container');

                    $video = $doc->createElement('video');
                    $video->setAttribute('src', $a->getAttribute('href'));
                    $video->setAttribute('loop', '');
                    $video->setAttribute('muted', '');
                    $video->setAttribute('controls', '');

                    $container->appendChild($video);
                    $a->parentNode->replaceChild($container, $a);

                    $container->parentNode->insertBefore($doc->createElement('br'), $container);
                    $container->parentNode->insertBefore($doc->createElement('br'), $container->nextSibling);
                }
                else if ($this->str_ends_with($a->nodeValue, '.gifv')) {
                    $container = $doc->createElement('div');
                    $container->setAttribute('class', 'html5-container');

                    $video = $doc->createElement('video');
                    $video->setAttribute('src', str_replace('gifv', 'mp4', $a->getAttribute('href')));
                    $video->setAttribute('loop', '');
                    $video->setAttribute('muted', '');
                    $video->setAttribute('controls', '');

                    $container->appendChild($video);
                    $a->parentNode->replaceChild($container, $a);

                    $container->parentNode->insertBefore($doc->createElement('br'), $container);
                    $container->parentNode->insertBefore($doc->createElement('br'), $container->nextSibling);
                }
                else if ((strpos($a->nodeValue, 'i.imgur.com') !== FALSE) && ($this->str_ends_with($a->nodeValue, '.gif'))) {
                    $container = $doc->createElement('div');
                    $container->setAttribute('class', 'html5-container');

                    $video = $doc->createElement('video');
                    $video->setAttribute('src', str_replace('gif', 'mp4', $a->getAttribute('href')));
                    $video->setAttribute('loop', '');
                    $video->setAttribute('muted', '');
                    $video->setAttribute('controls', '');

                    $container->appendChild($video);
                    $a->parentNode->replaceChild($container, $a);

                    $container->parentNode->insertBefore($doc->createElement('br'), $container);
                    $container->parentNode->insertBefore($doc->createElement('br'), $container->nextSibling);
                }
                else if (strpos($a->nodeValue, '//gfycat.com/') !== FALSE) {
                    $res = explode('/', $a->getAttribute('href'));
                    $container = $doc->createElement('div');
                    $container->setAttribute('class', 'html5-container');

                    $video = $doc->createElement('video');
                    $video->setAttribute('loop', '');
                    $video->setAttribute('muted', '');
                    $video->setAttribute('controls', '');

                    $source = $doc->createElement('source');
                    $source->setAttribute('src', 'https://zippy.gfycat.com/' . $res[count($res)-1] . '.webm');
                    $source->setAttribute('type', 'video/webm');
                    $video->appendChild($source);

                    $source2 = $doc->createElement('source');
                    $source2->setAttribute('src', 'https://fat.gfycat.com/' . $res[count($res)-1] . '.webm');
                    $source2->setAttribute('type', 'video/webm');
                    $video->appendChild($source2);

                    $source3 = $doc->createElement('source');
                    $source3->setAttribute('src', 'https://giant.gfycat.com/' . $res[count($res)-1] . '.webm');
                    $source3->setAttribute('type', 'video/webm');
                    $video->appendChild($source3);

                    $container->appendChild($video);
                    $a->parentNode->replaceChild($container, $a);

                    $container->parentNode->insertBefore($doc->createElement('br'), $container);
                    $container->parentNode->insertBefore($doc->createElement('br'), $container->nextSibling);

                }
                else if (preg_match($rx2, $a->nodeValue) == 1) {
                    $match = array();
                    preg_match($rx, $a->getAttribute('href'), $match);

                    if (isset($match[1]))
                    {
                        $address = 'https://www.youtube.com/embed/' . $match[1];

                        $container = $doc->createElement('div');
                        $container->setAttribute('class', 'video-container');

                        $new_node = $doc->createElement('iframe');
                        $new_node->setAttribute('src', $address);
                        $new_node->setAttribute('frameborder', '0');
                        $new_node->setAttribute('allowfullscreen', true);

                        $container->appendChild($new_node);
                        $a->parentNode->replaceChild($container, $a);

                        $container->parentNode->insertBefore($doc->createElement('br'), $container);
                        $container->parentNode->insertBefore($doc->createElement('br'), $container->nextSibling);
                    }
                }
                else if ((preg_match($rx2, $a->nodeValue) == 0) && (preg_match($rx2, $a->getAttribute('href')) == 1)) {
                    $a->setAttribute('class', 'popup-youtube');
                }
            }
            else if (($this->str_ends_with($a->getAttribute('href'), '.jpg')) || ($this->str_ends_with($a->getAttribute('href'), '.jpeg'))
                || ($this->str_ends_with($a->getAttribute('href'), '.png'))) {
                foreach ($a->getElementsByTagName('img') as $img) {
                    if (($this->str_ends_with($img->getAttribute('alt'), '.jpg')) || ($this->str_ends_with($img->getAttribute('alt'), '.jpeg'))
                        || ($this->str_ends_with($img->getAttribute('alt'), '.png'))) {
                        $a->setAttribute('href', str_replace('http://reho.st/view/self/', 'http://reho.st/self/', $a->getAttribute('href')));
                        $a->setAttribute('class', 'test-popup-link');
                    }
                }
            }
        }

        foreach ($xpath->query('//img') as $img) {
            if ($img->getAttribute('src') && (strpos($img->getAttribute('src'), 'i.imgur.com') !== FALSE) && ($this->str_ends_with($img->getAttribute('src'), '.gif'))) {
                $container = $doc->createElement('div');
                $container->setAttribute('class', 'html5-container');

                $video = $doc->createElement('video');
                $video->setAttribute('src', str_replace('gif', 'mp4', $img->getAttribute('src')));
                $video->setAttribute('autoplay', '');
                $video->setAttribute('loop', '');
                $video->setAttribute('muted', '');

                $container->appendChild($video);
                $img->parentNode->replaceChild($container, $img);

                $container->parentNode->insertBefore($doc->createElement('br'), $container);
                $container->parentNode->insertBefore($doc->createElement('br'), $container->nextSibling);
            }
        }

        # remove <!DOCTYPE and <html><body></body></html>
        $html = preg_replace('~<(?:!DOCTYPE|/?(?:html|body))[^>]*>\s*~i', '', $doc->saveHTML());

        $raw = $html;

        return $raw;
    }

    public function str_starts_with($haystack, $needle)
    {
        return substr_compare($haystack, $needle, 0, strlen($needle))
        === 0;
    }

    public function str_ends_with($haystack, $needle)
    {
        return substr_compare($haystack, $needle, -strlen($needle))
        === 0;
    }

    public function createCookies($username, $hfr_user_id, $pwd_string, $email) {
        setcookie('username', $username, time() + (86400 * 10), '/', $this->f3->get('domain'), false, true);
        setcookie('hfr_user_id', $hfr_user_id, time() + (86400 * 10), '/', $this->f3->get('domain'), false, true);
        setcookie('pwd_string', $pwd_string, time() + (86400 * 10), '/', $this->f3->get('domain'), false, true);
        setcookie('email', $email, time() + (86400 * 10), '/', $this->f3->get('domain'), false, true);
    }

    public function updateCookies() {
        setcookie('username', $this->f3->get('COOKIE.username'), time() + (86400 * 10), '/', $this->f3->get('domain'), false, true);
        setcookie('hfr_user_id', $this->f3->get('COOKIE.hfr_user_id'), time() + (86400 * 10), '/', $this->f3->get('domain'), false, true);
        setcookie('pwd_string', $this->f3->get('COOKIE.pwd_string'), time() + (86400 * 10), '/', $this->f3->get('domain'), false, true);
        setcookie('email', $this->f3->get('COOKIE.email'), time() + (86400 * 10), '/', $this->f3->get('domain'), false, true);
    }

    public function deleteCookies() {
        $cookieUsername = $this->f3->get('COOKIE.username');
        unset($cookieUsername);
        setcookie('username', '', time() - 3600, '/', $this->f3->get('domain'), false, true);

        $cookieHFRUserId = $this->f3->get('COOKIE.hfr_user_id');
        unset($cookieHFRUserId);
        setcookie('hfr_user_id', '', time() - 3600, '/', $this->f3->get('domain'), false, true);

        $cookieLoginString = $this->f3->get('COOKIE.pwd_string');
        unset($cookieLoginString);
        setcookie('pwd_string', '', time() - 3600, '/', $this->f3->get('domain'), false, true);

        $cookieEmail = $this->f3->get('COOKIE.email');
        unset($cookieEmail);
        setcookie('email', '', time() - 3600, '/', $this->f3->get('domain'), false, true);
    }
}