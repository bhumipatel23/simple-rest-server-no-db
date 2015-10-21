var demoApp = angular.module("demoApp",["ngRoute"]);
	demoApp.controller("SimpleController",function($scope,$http){
		
		$http.get("/users").success(function(data){
			$scope.contacts=data;
			console.log(data);

		});
	$scope.appenddata = function(result){
		console.log(result);
	$http.post("/users",result).success(function(data){
			$scope.contacts.push(
				{

					item:data.item,
					desc:data.desc,
					price:data.price,
					id:data.id
					// item:$scope.result.item,
					// desc:$scope.result.desc,
					// price:$scope.result.price
				});
						// $scope.result.item="",
						// $scope.result.desc="",
						// $scope.result.price=""
				$scope.result="";
					
		});	
	};
	$scope.deleteData = function(id) {   
        for(i in $scope.contacts) {
            if($scope.contacts[i].id == id) {
                $scope.contacts.splice(i,1);
               $http.delete("/users"+"/"+ id);
            }
        }    
    }
});	 

	demoApp.config(['$routeProvider',function($routeProvider){
	
		$routeProvider.
				when('/AddStore',{
					templateUrl:'Add_Store.html',
					controller:'AddStoreController'
				}).
				when('/AddHome',{
					templateUrl:"Add_Home.html",
					controller:'AddHomeController'
				}).
				when('/AddAbout',{
					templateUrl:"Add_About.html",
					controller:'AddAboutController',
				}).when('/AddCatalog',{
					templateUrl:"Add_Catalog.html",
					controller:'AddCatalogController',
				}).when('/AddContact',{
					templateUrl:"Add_Contact.html",
					controller:'AddContactController',
				}).otherwise({
					redirectTo:'/AddStore'
				});
		}]); 
		
		demoApp.controller('AddStoreController',function($scope){
			$scope.message = "Please Enter a Store name.";
		});
		demoApp.controller('AddHomeController',function($scope){
			$scope.message = "This is the Home page.";
		});
		demoApp.controller('AddAboutController',function($scope){
			$scope.message = "This is About.";
		});
		demoApp.controller('AddCatalogController',function($scope){
			$scope.message = "This is Catalog";
		});
		demoApp.controller('AddContactController',function($scope){
			$scope.message = "please Contact our toll free number : 888-888-8888";
		}); 

