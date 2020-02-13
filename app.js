
var app = angular.module('myApp', ['angular-intro']);

app.controller('myCtrl', function ($scope,ngIntroService)  {

  $scope.IntroOptions = {
    steps:[
      {
        element: document.querySelector('#step1'),
        intro: "<span style='color:#000'>Sample text 1<span>"
      },
      {
        element: document.querySelectorAll('#step2')[0],
        intro: "<span style='color:#000'>Sample text 2<span>",
      },
      {
        element: '#step3',
        intro: "<span style='color:#000'>Sample text 3<span>",
      },
      {
        element: '#step4',
        intro: "<span style='color:#000'>Sample text 4<span>",
      },
      {
        element: '#step5',
        intro: "<span style='color:#000'>Sample text 5<span>",
      },
      {
        element: '#step6',
        intro: "<span style='color:#000'>Thank you for taking step guide.<span>",
      }
    ],
    showStepNumbers: false,
    showBullets: false,
    exitOnOverlayClick: true,
    exitOnEsc:true,
    nextLabel: '<span style="color:#000">Next</span>',
    prevLabel: '<span style="color:#000">Previous</span>',
    skipLabel: '<span style="color:#000">Exit</span>',
    doneLabel: '<span style="color:#000">Thanks</span>'
  };

  $scope.CompletedEvent = function(){
    console.log('[directive] completed Event')
  }
	$scope.ExitEvent= function(){
	  console.log('[directive] exit Event')
	}
	$scope.ChangeEvent = function(){
	  console.log('[directive] change Event')
	}
	$scope.BeforeChangeEvent= function(){
    if (ngIntroService.intro._currentStep == 1){
      document.getElementById("custom-popup").style.width = "100%";
    }
    if (ngIntroService.intro._currentStep == 2){
      document.getElementById("custom-popup").style.width = "0%";
    }
	}
  $scope.AfterChangeEvent= function(){
    console.log('[directive] after change Event')
  }
    $scope.clearAndStartNewIntro = function(){
        $scope.IntroOptions = {
          steps:[
          {
              element: document.querySelector('#step1'),
              intro: "After being cleared, step 1"
          },
          {
              element: '#step2',
              intro: 'Setup and details :)',
              position: 'right'
          },
          {
              element: '.jumbotron',
              intro: 'We added a small feature, adding <pre>ng-intro-disable-button</pre> your buttons will be disabled when introJs is open :) <br><p style="color:red">if you\'re using anchor tags, you should prevent ng-click manually. </p> <p> <a target="_blank" href="https://github.com/mendhak/angular-intro.js/wiki/How-to-prevent-a-ng-click-event-when-a-tag--a--is-disabled%3F">click here for more details.</a></p>'
          }
          ],
          showStepNumbers: true,
          showBullets: true,
          exitOnOverlayClick: false,
          exitOnEsc:false,
          nextLabel: '<strong style="color:green">Next!</strong>',
          prevLabel: '<span style="color:red">Previous</span>',
          skipLabel: 'Skip',
          doneLabel: 'Done'
      };
      
      
      ngIntroService.clear();
      ngIntroService.setOptions($scope.IntroOptions);
      
      ngIntroService.onComplete(function(){
        console.log('update some cookie or localstorage.')
      })
      
      ngIntroService.onExit(function(){
        console.log("[service] exit");
      })
      
      ngIntroService.onBeforeChange(function(){
        console.log("[service] before change");
      })
      
      ngIntroService.onChange(()=>{
        console.log("[service] on change");
      })
      
      ngIntroService.onAfterChange(()=>{
        console.log("[service] after Change");
      })
      
      ngIntroService.start();
    }

}).directive('ngClick', function () {
  return {
    restrict: 'A',
    priority: 1,
    terminal: true,
    link: function (scope, element, attr) {
      var clickAction = attr.ngClick; // get the current ngclick value
      var d = element.bind('click',function () {
        if (attr.disabled==undefined) {//check if the tag is available to be clicked
          scope.$eval(clickAction) // call the event
        }
      });
      scope.$on('$destroy', function(){
        d(); // destroy the bind we created, so it a memory leak is prevented.
      })
    }
  };
});