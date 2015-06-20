<?php
require_once "/google-api-php-client/src/Google/autoload.php";

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
        $this->f3->set('streamers', $Streams->getListStreamers());
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
            $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
            $game = filter_input(INPUT_POST, 'game', FILTER_SANITIZE_STRING);
            $day = filter_input(INPUT_POST, 'day', FILTER_SANITIZE_STRING);
            $hourStart = filter_input(INPUT_POST, 'hourStart', FILTER_SANITIZE_STRING);
            $hourEnd = filter_input(INPUT_POST, 'hourEnd', FILTER_SANITIZE_STRING);

/*            $client_id = $this->f3->get('clientId');
            $client_secret = $this->f3->get('clientSecret');*/

/*            $client = new Google_Client();
            $client->setApplicationName("TheTartuffeBayCalendar");
            $client->setClientId($client_id);
            $client->setClientSecret($client_secret);
            $client->setRedirectUri("http://thetartuffebay.dev/hfrtv/addStream");
            $client->setAccessType('offline');
            $client->setScopes(array('https://www.googleapis.com/auth/calendar'));

            $authUrl = $client->createAuthUrl();
            error_log($authUrl);*/

            $client_email = $this->f3->get('clientEmail');
            $private_key = file_get_contents('ui/key/TheTartuffeBay-c985f9bb86a4.p12');
            $scopes = array('https://www.googleapis.com/auth/calendar');
            $credentials = new Google_Auth_AssertionCredentials(
                $client_email,
                $scopes,
                $private_key
            );

            $client = new Google_Client();
            $client->setAssertionCredentials($credentials);
            if ($client->getAuth()->isAccessTokenExpired()) {
                $client->getAuth()->refreshTokenWithAssertion();
            }

            $service = new Google_Service_Calendar($client);
            $calendarId = 'ddbhu19gfu40seliu5torjfe8g@group.calendar.google.com';

            $optParams = array(
                'maxResults' => 10,
                'orderBy' => 'startTime',
                'singleEvents' => TRUE,
                'timeMin' => date('c'),
            );
            $results = $service->events->listEvents($calendarId, $optParams);

            if (count($results->getItems()) == 0) {
                error_log("No upcoming events found");
            } else {
                error_log("Upcoming events:");
                foreach ($results->getItems() as $event) {
                    $start = $event->start->dateTime;
                    if (empty($start)) {
                        $start = $event->start->date;
                    }
                    error_log($event->getSummary());
                }
            }


/*            $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
            $password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);

            $response = $this->user->login($email, $password);

            if ($response == "OK") {
                $data['success'] = true;
                $data['message'] = "L'authentification s'est bien déroulée";
            }
            else if($response == "incorrect") {
                $data['success'] = false;
                $data['message'] = 'Le mot de passe est incorrect';
                $errors['else'] = 'Le mot de passe est incorrect';
            }
            else if ($response == "problem") {
                $data['success'] = false;
                $data['message'] = "Une erreur s'est produite";
                $errors['else'] = "Une erreur s'est produite";
            }*/
        }

        $data['errors']  = $errors;
        echo json_encode($data);
    }
}
