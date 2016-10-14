
var app = angular.module("myApp",[]);

app.controller("CartController",["$scope",function($scope) {
    $scope.cart = [
        {
            id: 1000,
            name: 'iPhone7',
            quantity: 3,
            price:4300,
        },
        {
            id: 3300,
            name: 'iPhone6',
            quantity: 30,
            price:3300,
        },
        {
            id: 232,
            name: 'Mac',
            quantity: 4,
            price:23000,
        },
        {
            id: 1800,
            name: 'iPad',
            quantity: 5,
            price:6900,
        },
    ];

    $scope.totalPrice = function () {
        var total = 0;
        angular.forEach($scope.cart,function (item) {
            total += item.quantity * item.price;
        });
        return total;
    };

    $scope.totalQuantity = function () {
        var total = 0;
        angular.forEach($scope.cart,function (item) {
            total += item.quantity;
        });
        return parseInt(total);
    };

    var findIndex = function (id) {
        var index = null;
        angular.forEach($scope.cart, function (item, key) {
            if (item.id === id) {
                index = key;
            }
        });
        return index;
    };

    $scope.remove = function (id) {
        var index = findIndex(id);
        if(index !== null) {
            $scope.cart.splice(index,1);
        }
    };

    $scope.add = function (id) {
        var index = findIndex(id);
        if (index !== null) {
            $scope.cart[index].quantity++;
        }
    };

    $scope.reduce = function (id) {
        var index = findIndex(id);
        if (index !== null) {
            var itemno = $scope.cart[index];
            if (itemno.quantity > 0) {
                itemno.quantity--;
            }
        }
    };

    $scope.$watch('cart', function (newValue, oldValue) {
        angular.forEach(newValue, function(item, key) {
            if(item.quantity < 1) {
                var returnKey = confirm("Delete this item from cart!");
                if (returnKey) {
                    $scope.remove(item.id);
                } else {
                    item.quantity = oldValue[key].quantity;
                }
            }
        })
    },true);
}]);