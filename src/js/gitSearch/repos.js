function GitHubReposController($scope, $http) {
	$scope.repos = [];

	$scope.name = "";
	

	$scope.start = function()
	{
		$http.get('https://api.github.com/legacy/repos/search/'+$scope.name)
		.success(function(data){
			$scope.repos = data.repositories;
		});
	}

	$scope.sort = 'name';
	
}

