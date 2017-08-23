<!doctype html>
<meta charset="UTF-8">
<html>
	<head>
		<title>Sentimental analysis of Crowd source data:Twitter</title>
		
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
		<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" integrity="sha256-7s5uDGW3AHqw6xtJmNNtr+OBRJUlgkNJEo78P4b0yRw= sha512-nNo+yCHEyn0smMxSswnf/OnX6/KwJuZTlNZBjauKhTK0c+zT+q5JOCx0UFhXQ6rJR9jg6Es8gPuD2uZcYDLqSw==" crossorigin="anonymous">	
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha256-KXn5puMvxCw+dAYznun+drMdG1IFl3agK0p/pqT9KAo= sha512-2e8qq0ETcfWRI4HJBzQiA3UoyFk6tbNyG+qSaIBZLyW9Xf3sWZHN/lxe9fTh1U45DpPf07yj94KsUHHWe4Yk1A==" crossorigin="anonymous"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js" ></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.3.2/angular-ui-router.min.js" ></script>
		<script type="text/javascript" src="javascript/main.js"></script>	

		<link rel="stylesheet" href="css/index.css">
		<script type="text/javascript" src='javascript/index.js'></script>


	</head>
	<body ng-app="app">
				<div  >
					<!-- Top navigation bar -->
					<div class="col-md-12 well" id ='topnav'>
						    <span style="font-size:30px;cursor:pointer ;color: white" onclick="openNav()">&#9776;</span>
			                <a href="index.html" >Home</a>
			     	</div>
				
				</div>

				<div class ="row" >
						<!-- left side navigation menu -->
						<div id="mySidenav" class="sidenav">
  								<a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
  								<a href="#/about"  onclick="closeNav()">About</a>
 						   		<a href="#/application" onclick="closeNav()">Application</a>
 						    	<a href="#/contact" onclick="closeNav()">Contact</a>
						</div>


						


						<!-- Views -->
						<div class ="col-md-9 " id='rightside' >

							<div ui-view></div>

							<div ui-view="inputContent"></div>
							
				            <div ui-view="tweets"></div>
							

						</div>			
			
				</div>
			 
				
 
	</body>

</html>
