var app=angular.module('app',['ui.router']);



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


app.controller('home',['$scope','$state',function($scope,$state){
	$scope.goapp=function(){
		$state.go('main');
	}

}]);

app.controller('aboutControl',['$state','$scope','$location','$rootScope',function($state,$scope,$location,$rootScope){
 
$scope.go=function(path)
{
	$location.path(path);
};
}]);

app.controller('error',['$scope','$location','$window',function($scope,$location,$window){

$scope.gohome=function()
	{	
var url = ($location.absUrl());
	url=  url.replace('#/404','');
	$window.location.href=url;
	}

}]);

app.controller('tweets',['$scope','$state','$stateParams',function($scope,$state,$stateParams){
	  

$scope.back=function()
	{	
	$state.go('main');

	}


}]);


app.controller('inputcontrol',['$scope','$location','$state','$rootScope',function($scope,$location,$state,$rootScope){
								$scope.isLoading=false;
	 


$scope.run=function(){
				
					var x=document.forms["inputForm"]["input"].value;
			        var y=document.forms["inputForm"]["count"].value;
					
					if(x==''||y=='')
						{
							alert("Fill all Fields ");
							return false;
						}

					else 
						{
							var values=JSON.stringify({input:$scope.val,count:$scope.count});
							console.log(values);

							$scope.isLoading=true;



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


                 function on_request_success(response) {
    					$scope.isLoading=false; 
    					console.log(response);
    					$rootScope.response=response;
    				
    					
    				
					$state.go('tweets',{
							a:$scope.val,
							b:$scope.count,


							});
    						
    				
    				}	

						function on_request_error(r, text_status, error_thrown)
						 {
   						
   						console.debug('error', text_status + ", " + error_thrown + ":\n" + r.responseText);
   						
						}
                        
      						
							}

	
	}


				}
]);