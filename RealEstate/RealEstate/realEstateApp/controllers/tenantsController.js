(function (app) {
    var tenantsController = function ($scope, tenantService) {
        var init = function () {
            $scope.tenant = tenantService.getTenant(0);
       };

        var index = 0;

        $scope.nextTenant = function () {
            index++;
            if (tenantService.isOverflow(index))
            {
                index--;
            }
            $scope.tenant = tenantService.getTenant(index);

        }

        $scope.previousTenant = function () {
            index--;
            if (index < 0) {
                index = 0;
            }
            $scope.tenant = tenantService.getTenant(index);
        }

        $scope.addTenant = function () {
            index--;
            if (index < 0) {
                index = 0;
            }
            $scope.tenant = tenantService.addTenant(index);
        }

        $scope.deleteTenant = function () {
         
            $scope.tenant = tenantService.deleteTenant(index);
            index--;
        }      

        init();
    };
    app.controller("tenantsController", ["$scope", "tenantService", tenantsController]);

    app.directive("odd", function () {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function (scope, element, attributes, ngModel) {
                ngModel.$validators.odd = function (modelValue) {

                    return modelValue % 2 === 1;
                };
            }
        };
    });

    app.directive("jose", function () {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function (scope, element, attributes, ngModel) {
                ngModel.$validators.jose = function (modelValue) {
                    if (modelValue == "Jose") {
                        return true;
                    }
                    else return false;
                };
            }
        };
    });

    app.directive("prime", function ($q, $timeout) {

        var isPrime = function (n) {
            if (n < 2) {
                return false;
            }

            for (var i = 2; i <= Math.sqrt(n) ; i++) {
                if (n % i == 0) {
                    return false;
                }
            }
            return true;
        };

        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, element, attributes, ngModel) {
                ngModel.$asyncValidators.prime = function (modelValue) {
                    var defer = $q.defer();
                    $timeout(function () {
                        if (isPrime(modelValue)) {
                            defer.resolve();
                        } else {
                            defer.reject();
                        }
                    }, 2000);
                    return defer.promise;
                }
            }
        };
    });

}(angular.module("realestateApp")));