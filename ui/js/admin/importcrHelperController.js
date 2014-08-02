angular.module('App', ['ngSanitize', 'angular-loading-bar'])
.config(['$httpProvider', function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])
.service('Giantbomb', function($q, $http){

  this.searchGames = function(term) {
    var deferred = $q.defer();

    $http({method: 'POST', url: '/api/cr/games/', data : { 'term' : term } }).then(function(data){
      console.log("my object0: %o", data)

      /*var _data = { index: returns.data.index, games : ['']};
      var games = returns.data.games;

      for(var i = 0, len = games.length; i < len; i++) {
        _data['games'][games[i].name] = games[i].isNew;
      }*/

      deferred.resolve(data.data);
    }, function() {
      deferred.reject(arguments);
    });



    return deferred.promise;
  }
})
.controller('importcrHelperController', function($scope, $http, $location, $timeout, $filter, Giantbomb) {

    $scope.cr_url = '';
    $scope.cr_preview = 'preview';
    $scope.message = '';
    $scope.messageKO = '';
    $scope.somePlaceholder = 'URL du CR';

    $scope.import_step2 = false;
    $scope.import_step3 = false;
    $scope.import_stepOK = false;
    $scope.import_stepKO = false;

    function Game(){
      this.name = '';
      this.id = 0
      this.status = true;
      this.dataList = [];
    }

    $scope.table = [];
    $scope.tableGames = [];


    $scope.searchGames = function(term) {

      if (!term) {
        console.log('reinit');
        $scope.tableGames = [];
      }
      else {
        Giantbomb.searchGames(term).then(function(returns){
          console.log("my object1: %o", returns)

          $scope.tableGames = returns.games;

        });
      }

    }


    $scope.cr_url = $location.url().replace('/http://', 'http://');

    $scope.reset = function(e) {
      $scope.cr_url = '';
      $scope.import_step2 = false;
      $scope.import_step3 = false;
      $scope.table = [];
    }
    $scope.resetMSG  = function(e) {
      $scope.import_stepKO = false;
      $scope.messageKO = '';

      $scope.import_stepOK = false;
      $scope.message = '';
    }
    $scope.resetURL = function(e) {
      $scope.resetMSG(e);

      if ($scope.import_step2) {
        var tempUrl = $scope.cr_url;
        $scope.reset(e);
        $scope.cr_url = tempUrl;
      }
    }

    $scope.validateUrl = function(e) {
        //console.log('cr_url = ' + $scope.cr_url);

      if (!$scope.cr_url) {
          $scope.setKO('URL invalide :fou:');
      }
      else {
        $http({method: 'POST', url: '/api/cr/parse/', data : { 'cr_url' : $scope.cr_url } })
          .success(function(data, status, headers, config) {

            $scope.cr_preview = data;
            $scope.import_step2 = true;
            $scope.import_stepOK = false;
            $scope.import_stepKO = false;
            $scope.messageKO = '';
            $scope.message = '';
            // this callback will be called asynchronously
            // when the response is available
        }).error(function(data, status, headers, config) {
            $scope.setKO(data);

            if (status == 405) { //déjà en base
              $scope.reset(e);
            }
        });
      }

    };

    $scope.addGame = function(game) {

        if ($filter('exist')($scope.table, game) == -1) {
          $scope.table.push( game );
          $scope.searchterm = '';
          $scope.tableGames = [];
        }
        else
          {
            console.log('déjà là');
          }


    };

    $scope.validateCR = function(e) {
      $http({method: 'POST', url: '/api/cr/import/', data : { 'cr_url' : $scope.cr_url, 'games' : $scope.table } })
        .success(function(data, status, headers, config) {
          $scope.message = data;
          $scope.import_stepOK = true;
          $scope.import_stepKO = false;
          $scope.messageKO = '';          
          $scope.reset(e);
          //console.log(data);
          // this callback will be called asynchronously
          // when the response is available
        }).error(function(data, status, headers, config) {
          $scope.setKO(data);

          if (status == 405) { //déjà en base
            $scope.reset(e);
          }

          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    };

    $scope.setKO = function(message) {
      $scope.import_stepKO = true;
      $scope.messageKO = message;
    }

    $scope.setOK = function(step, message) {
      $scope.import_stepKO = false;
      $scope.messageKO = '';
    }

    $scope.$watch('table', function(scope, current, previous) {
      console.log(current);

      if ($scope.import_step2 == true && $scope.table.length >= 1) {
        $scope.import_step3 = true;
      }
      else
      {
        $scope.import_step3 = false;
      }
    }, true);

})
.directive('keyboardPoster', function($parse, $timeout){
  var DELAY_TIME_BEFORE_POSTING = 300;
  return function(scope, elem, attrs) {


    var element = angular.element(elem)[0];
    var currentTimeout = null;

    element.oninput = function() {
      var model = $parse(attrs.postFunction);
      var poster = model(scope);

      if(currentTimeout) {
        $timeout.cancel(currentTimeout)
      }
      currentTimeout = $timeout(function(){

        poster(angular.element(element).val());
      }, DELAY_TIME_BEFORE_POSTING)
    }
  }
}).filter('exist', function(){

  return function(games, game) {
    for (var index in games) {
      if (games[index].id == game.id) {
        return 1;
      }
    }
    return -1;
  }
})
;
