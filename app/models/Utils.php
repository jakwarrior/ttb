<?php

class Utils
{
    public function content_post_treatment($raw)
    {
        foreach ($raw as $subKey => $subArray) {
            $subArray['content'] = html_entity_decode($subArray['content']);

            $doc = new DOMDocument('1.0', 'UTF-8');
            $doc->loadHTML(mb_convert_encoding($subArray['content'], 'HTML-ENTITIES', 'UTF-8')); //pour éviter les problèmes d'encodage
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
            }

            # remove <!DOCTYPE and <html><body></body></html>
            $html = preg_replace('~<(?:!DOCTYPE|/?(?:html|body))[^>]*>\s*~i', '', $doc->saveHTML());

            $subArray['content'] = $html;

            $raw[$subKey] = $subArray;
        }

        return $raw;
    }
}