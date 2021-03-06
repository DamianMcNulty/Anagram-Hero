'use strict';

angular.module('anagram_hero.game.round_service', [])

.factory('RoundService', ['$rootScope', 'AnagramService',
    function($rootScope, AnagramService){

        var word = {};
        var score = 0;
        var guess_last_length = 0;

        var roundService = {};
        roundService.words = new Array();

        // Retrieve a random word
        roundService.init = function(){
             word = {};
             score = 0;
             guess_last_length = 0;

             var getWord = AnagramService.getWord();
             getWord.$promise.then(function(w) {
                 AnagramService.words.push(w);
                 word = w;
                 score = parseInt(word.highscore);

                 $rootScope.$emit("times-start", {});
             });
             return getWord;
         }

         roundService.authorize = function(event){
             // Prevent user to PAST
             if (event.ctrlKey==true && (event.which == '118' || event.which == '86')) {
                console.log('You should not PAST');
                event.preventDefault();
              }
         }

         roundService.score = function(searched, event){
             // Remember the last size to calcule how many char has been erase
             if( guess_last_length > searched.length ){
                 // Don't use the backspace or delete key press because of
                 // Use selecte texte and rewrite over it should also decrease score
                 var lose = guess_last_length - searched.length;
                 score -= lose;

                 // Animate the losing point
                 var div = angular.element('<div class="lose-point">-'+lose+'</div>');
                 $('.game--round-lose-points').append(div);
                 $(div).transition({ opacity: 0, y: 20 }, function(){
                     // Remove element when animation is finished
                     this.remove()
                 });

                 // Adjuste to zero if user key the delete pressed down
                 if( score < 0 ){
                     score = 0;
                 }
             }
             // Update the last size
             guess_last_length = searched.length;

             return roundService.get();
         }

         roundService.check = function(searched){
             if( searched === word.name ){
                 $rootScope.$emit("times-stop", {});
                 return true;
             }
             return false;
        }

         roundService.get = function(){
             return {
                 'word'             : word,
                 'score'            : score,
                 'guess_last_length': guess_last_length,
             };
         }


        return roundService;
    }
])

;
