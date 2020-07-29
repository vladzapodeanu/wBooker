angular.module('eventsApp')
    .directive('googlePlace', directiveFunction);

directiveFunction.$inject = ['../app/templates/booking.html'];

function directiveFunction($rootScope) {
    return {
        require: 'ngModel',
        scope: {
            ngModel: '=',
            details: '=?'
        },
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'from-address', function() {
                scope.$apply(function() {
                    scope.details = scope.gPlace.getPlace();
                    model.$setViewValue(element.val());
                    $rootScope.$broadcast('to-address', scope.details);
                });
            });
        }
    };
}