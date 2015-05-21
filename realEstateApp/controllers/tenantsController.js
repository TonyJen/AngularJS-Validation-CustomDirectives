(function (app) {
    var tenantsController = function ($scope, tenantService) {
        var init = function () {
            $scope.tenant = tenantService.getTenant(0);
        };

        var index = 0;

        $scope.nextTenant = function () {
            index++;
            if (tenantService.isOverflow(index)) {
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

    app.directive("company", function () {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function (scope, element, attributes, ngModel) {
                ngModel.$validators.company = function (modelValue) {
                    if (modelValue == "ACME") {
                        return true;
                    }
                    else return false;
                };
            }
        };
    });

    app.directive("firstname", function () {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function (scope, element, attributes, ngModel) {
                ngModel.$validators.firstname = function (modelValue) {
                    if (modelValue == "Tony" || modelValue == "John") {
                        return true;
                    }
                    else return false;
                };
            }
        };
    });


    app.directive("userexists", function ($q, $timeout) {

        var CheckUserExists = function (name) {
            if (name == "Tony") {
                return true;
            }
            else if (name == "John") {
                return false;
            }
            else {
                return false;
            }
        };

        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, element, attributes, ngModel) {
                ngModel.$asyncValidators.userexists = function (modelValue) {
                    var defer = $q.defer();
                    $timeout(function () {
                        if (CheckUserExists(modelValue)) {
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