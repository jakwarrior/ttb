<?php

class Actu extends DB\SQL\Mapper {

    public function __construct(DB\SQL $db) {
        parent::__construct($db,'actu');
    }

    public function all($limit = 0) {
  		$request =
  			'SELECT *'.
  			' FROM actu as a'.
            ' WHERE active = 1'.
  			' ORDER by a.date_posted DESC, a.id DESC'.
            ' LIMIT :limit';

		  return $this->actu_post_treatment($this->db->exec($request, array(':limit' => $limit)));
    }

    private function actu_post_treatment($actus) {
        foreach ($actus as $subKey  => $subArray) {
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

                    $center = $doc->createElement('center');

                    $new_node = $doc->createElement('iframe');
                    $new_node->setAttribute('width', '700');
                    $new_node->setAttribute('height', '393.75');
                    $new_node->setAttribute('src', $address);
                    $new_node->setAttribute('frameborder', '0');
                    $new_node->setAttribute('allowfullscreen', 'true');

                    $center->appendChild($new_node);
                    $a->parentNode->replaceChild($center, $a);

                    $center->parentNode->insertBefore($doc->createElement('br'), $center);
                    $center->parentNode->insertBefore($doc->createElement('br'), $center->nextSibling);
                }
            }

            # remove <!DOCTYPE and <html><body></body></html>
            $html = preg_replace('~<(?:!DOCTYPE|/?(?:html|body))[^>]*>\s*~i', '', $doc->saveHTML());

            $subArray['content'] = $html;

            $actus[$subKey] = $subArray;
        }

        return $actus;
    }

}
