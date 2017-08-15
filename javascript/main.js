var app=angular.module('app',['ui.router']);

// Different states for views 
app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider
	.state('home',{
		url:'',
		templateUrl:'home.html',
		controller:'home'
})

	.state('about',{
		url:'/about',
		templateUrl:'about.html',
		controller:'aboutControl',
		
})
	
	.state('main',{
		url:'/application',
		views: {
		'inputContent'	:{
							templateUrl:'input.html',
							controller:'inputcontrol'
        				 }	
			   }
})

	.state('tweets',{
		url:'/application/:a/:b',
		views:{
		'tweets':{
                  templateUrl:'tweets.html',
         	      controller:'tweets'
		         }
     		  }
})

    .state('contact',{
		url:'/contact',
		templateUrl:'contact.html'
})


    .state('404',{
	    url:'/404',
	    templateUrl:'error-not-found.html',
	    controller:'error'
});

$urlRouterProvider.otherwise('/404');

}]);

// controllers..


// controller for state home
app.controller('home',['$scope','$state',function($scope,$state){
	$scope.goapp=function(){
		$state.go('main');
	};

}]);

// controller for state aboutcontrol
app.controller('aboutControl',['$scope','$location',function($scope,$location){
 
$scope.go=function(path){
	$location.path(path);
};
}]);

// controller for state error
app.controller('error',['$scope','$location','$window',function($scope,$location,$window){

$scope.gohome=function(){	
	var url = ($location.absUrl());
	url=  url.replace('#/404','');
	$window.location.href=url;
};

}]);

// controller for state tweets
app.controller('tweets',['$scope','$state',function($scope,$state){
	  

$scope.back=function(){	
	$state.go('main');

};

}]);


// controller for state inputcontrol
app.controller('inputcontrol',['$scope','$location','$state','$rootScope',function($scope,$location,$state,$rootScope){
$scope.isLoading=false;
	 
$scope.run=function(){
				
		var x=document.forms["inputForm"]["input"].value;
	    var y=document.forms["inputForm"]["count"].value;
					
			if(x==''||y==''){
				alert("Fill all Fields ");
				return false;
				}

			else{
   				var values=JSON.stringify({input:$scope.val,count:$scope.count});
				$scope.isLoading=true;

			// sending request to sentiment.py for json response using jquery and ajax
			jQuery.ajax ({
	   
	    			url:'http://localhost/Sentiment.py',
					type: 'POST',
  					cache: false,
  					data: values,
    				contentType: 'application/json',
    				processData: false,
     				success: on_request_success,
    				error: on_request_error
						});

				 // success function
                 function on_request_success(response) {
    				$scope.isLoading=false; 
    				$rootScope.response=response;

    			// changing the state to tweets  
    				$state.go('tweets',{
							a:$scope.val,
							b:$scope.count,
							});
    				}	
    	        // error function
				 function on_request_error(r, text_status, error_thrown)
						 {
   						
   						console.debug('error', text_status + ", " + error_thrown + ":\n" + r.responseText);
   						
						 }
                        
      						
				}  

   };

}]);
