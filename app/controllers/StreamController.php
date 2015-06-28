<?php
require_once "google-api-php-client/src/Google/autoload.php";

class StreamController extends Controller {

	public function index()
    {
        $Streams = new Stream($this->db);
        $this->f3->set('streams',$Streams->find(NULL, array('order'=>'username ASC')));
        $this->f3->set('includeJsCssStream','true');
        $this->f3->set('view','stream/list.htm');
        echo \Template::instance()->render('layout.htm');
	}

    public function agenda()
    {
        $Streams = new Stream($this->db);
        $Event = new Event($this->db);
        $this->f3->set('streamers', $Streams->getListStreamers());
        $this->f3->set('events', $Event->getAllListEvents());
        $this->f3->set('includeJsCssAgenda', 'true');
        $this->f3->set('view','stream/agenda.html');
        echo \Template::instance()->render('layout.htm');
    }

    public function profil()
    {
        $Streams = new Stream($this->db);
        $streamer = $Streams->byUserName($this->f3->get('PARAMS.name'));

        if (count($streamer) != 1) {
            $this->f3->error(404);
        }

        $this->f3->set('streamer', $streamer[0]);

        $this->f3->set('view','stream/profil.html');
        echo \Template::instance()->render('layout.htm');
    }

    public function addStream() {
        $errors = array();
        $data = array();

        if (!$this->f3->exists('POST.name') || empty($this->f3->get('POST.name')))
            $errors['name'] = "Le nom du streamer est requis";

        if (!$this->f3->exists('POST.game') || empty($this->f3->get('POST.game')))
            $errors['game'] = "Le nom du jeu est requis";

        if (!$this->f3->exists('POST.day') || empty($this->f3->get('POST.day')))
            $errors['day'] = "Le jour est requis";

        if (!$this->f3->exists('POST.hourStart') || empty($this->f3->get('POST.hourStart')))
            $errors['hour'] = "L'heure de début est requise";

        if (!$this->f3->exists('POST.hourEnd') || empty($this->f3->get('POST.hourEnd')))
            $errors['hour'] = "L'heure de fin est requise";

        if ( !empty($errors)) {
            $data['success'] = false;
        } else {
            $name = $this->f3->clean($this->f3->get('POST.name'));
            $game = $this->f3->clean($this->f3->get('POST.game'));
            $day = $this->f3->clean($this->f3->get('POST.day'));
            $hourStart = $this->f3->clean($this->f3->get('POST.hourStart'));
            $hourEnd = $this->f3->clean($this->f3->get('POST.hourEnd'));
            $url = $this->f3->clean($this->f3->get('POST.url'));

            $client_email = $this->f3->get('clientEmail');
            $private_key = file_get_contents('ui/key/TheTartuffeBay-c985f9bb86a4.p12');
            $scopes = implode(' ', array(Google_Service_Calendar::CALENDAR));
            $credentials = new Google_Auth_AssertionCredentials(
                $client_email,
                $scopes,
                $private_key
            );

            $client = new Google_Client();
            $client->setApplicationName("TheTartuffeBayCalendar");
            $client->setScopes(implode(' ', array(Google_Service_Calendar::CALENDAR)));
            $client->setAccessType('offline');
            $client->setAssertionCredentials($credentials);

            if ($client->getAuth()->isAccessTokenExpired()) {
                $client->getAuth()->refreshTokenWithAssertion();
            }

            $service = new Google_Service_Calendar($client);

            $event = new Google_Service_Calendar_Event();
            $event->setSummary($name . ' - ' . $game);
            $start = new Google_Service_Calendar_EventDateTime();

            $datetime1 = DateTime::createFromFormat('d/m/Y H:i', $day . ' ' . $hourStart);
            $start->setDateTime($datetime1->format('Y-m-d\TH:i:s'));
            $start->setTimeZone('Europe/Paris');
            $event->setStart($start);

            $end = new Google_Service_Calendar_EventDateTime();
            $datetime2 = DateTime::createFromFormat('d/m/Y H:i', $day . ' ' . $hourEnd);
            $end->setDateTime($datetime2->format('Y-m-d\TH:i:s'));
            $end->setTimeZone('Europe/Paris');
            $event->setEnd($end);


            $calendarId = 'ddbhu19gfu40seliu5torjfe8g@group.calendar.google.com';
            try {
                $event = $service->events->insert($calendarId, $event);

                $Stream = new Stream($this->db);
                $streamer = $Stream->byUserName($name);

                if (count($streamer) == 0) {
                    $streamer = array();
                    $streamer['id'] = -1;
                    $streamer['username'] = $name;
                    $streamer['url'] = $url;
                } else {
                    $streamer = $streamer[0];
                    $streamer['url'] = '';
                }

                $Event = new Event($this->db);
                $return = $Event->addEvent($event->getId(), $streamer['username'], $streamer['id'], $game, $datetime1->format('d/m\@H\hi'), $datetime1->format('Y-m-d'), $streamer['url']);

                if ($return == 1) {
                    $data['success'] = true;
                } else {
                    $data['success'] = false;
                    $errors['else'] = "Une erreur s'est produite";
                }
            } catch (Google_Exception $e) {
                error_log($e);
                $data['success'] = false;
                $errors['else'] = "Une erreur s'est produite";
            }
        }

        $data['errors']  = $errors;
        echo json_encode($data);
    }

    public function deleteStream() {
        $errors = array();
        $data = array();

        if (!$this->f3->exists('POST.id') || empty($this->f3->get('POST.id')))
            $errors['id'] = "Le nom du stream est requis";

        if ( !empty($errors)) {
            $data['success'] = false;
        } else {
            $id = $this->f3->clean($this->f3->get('POST.id'));

            $client_email = $this->f3->get('clientEmail');
            $private_key = file_get_contents('ui/key/TheTartuffeBay-c985f9bb86a4.p12');
            $scopes = implode(' ', array(Google_Service_Calendar::CALENDAR));
            $credentials = new Google_Auth_AssertionCredentials(
                $client_email,
                $scopes,
                $private_key
            );

            $client = new Google_Client();
            $client->setApplicationName("TheTartuffeBayCalendar");
            $client->setScopes(implode(' ', array(Google_Service_Calendar::CALENDAR)));
            $client->setAccessType('offline');
            $client->setAssertionCredentials($credentials);

            if ($client->getAuth()->isAccessTokenExpired()) {
                $client->getAuth()->refreshTokenWithAssertion();
            }

            $service = new Google_Service_Calendar($client);
            $calendarId = 'ddbhu19gfu40seliu5torjfe8g@group.calendar.google.com';

            try {
                $service->events->delete($calendarId, $id);

                $Event = new Event($this->db);
                $return = $Event->deleteEvent($id);

                if ($return == 1) {
                    $data['success'] = true;
                } else {
                    $data['success'] = false;
                    $errors['else'] = "Une erreur s'est produite";
                }
            } catch (Google_Exception $e) {
                error_log($e);
                $data['success'] = false;
                $errors['else'] = "Une erreur s'est produite";
            }
        }

        $data['errors']  = $errors;
        echo json_encode($data);
    }
}
