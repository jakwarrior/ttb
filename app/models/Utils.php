<?php

class Utils
{
    public function content_post_treatment($raw)
    {

        $raw = html_entity_decode($raw);

        $doc = new DOMDocument('1.0', 'UTF-8');
        $doc->loadHTML(mb_convert_encoding($raw, 'HTML-ENTITIES', 'UTF-8')); //pour éviter les problèmes d'encodage
        $xpath = new DOMXpath($doc);

        $rx = '~
                ^(?:https?://)?              # Optional protocol
                (?:www\.)?                  # Optional subdomain
                (?:youtube\.com|youtu\.be)  # Mandatory domain name
                /watch\?v=([^&]+)           # URI with video id as capture group 1
                ~x';
        $replace = 'http://www.youtube.com/embed/$1';

        foreach ($xpath->query('//a') as $a) {
            if (preg_match($rx, $a->nodeValue) == 1) {
                $address = preg_replace($rx, $replace, $a->nodeValue);

                $container = $doc->createElement('div');
                $container->setAttribute('class', 'video-container');

                $new_node = $doc->createElement('iframe');
                $new_node->setAttribute('src', $address);
                $new_node->setAttribute('frameborder', '0');
                $new_node->setAttribute('allowfullscreen', 'true');

                $container->appendChild($new_node);
                $a->parentNode->replaceChild($container, $a);

                $container->parentNode->insertBefore($doc->createElement('br'), $container);
                $container->parentNode->insertBefore($doc->createElement('br'), $container->nextSibling);
            }

            if (strlen($a->nodeValue) > 0) {
                if ($this->str_starts_with($a->nodeValue, 'mp4')) {
                    error_log($a->nodeValue);
                }
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
}