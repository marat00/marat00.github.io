(function () {
'use strict';

    // List of shopping items
  var toBuyItems = [ 
        {
		   name: "cookies",
		   quantity: "10"
		}, 
        { 
		   name: "waffles",
		   quantity: "5"
	    }, 
		{ 
		   name: "candies",
		   quantity: "10" 
		},
		
	    { 
		   name: "chocolate",
		   quantity: "3" 
		}, 
 	    { 
		   name: "puddings", 
		   quantity: "10" 
		},
	    { 
		   name: "donuts", 
		   quantity: "7"
		}
	];

  var boughtItems = [];

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);
  
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var itemAdder = this;
  
  itemAdder.items = ShoppingListCheckOffService.getToBuyItems();
  itemAdder.boughtItems = ShoppingListCheckOffService.getBoughtItems();
  
  
  itemAdder.addItem = function (itemName, itemQuantity) {
	try {
       ShoppingListCheckOffService.addBoughtItem(itemName, itemQuantity);
    } catch (error) {
       itemAdder.errorMessage = error.message;
    }
  }
  
  itemAdder.isEmpty = function () {
	  return itemAdder.items.length === 0;
  }
}

//Controller for the already bought items
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;

  var items = ShoppingListCheckOffService.getBoughtItems();
  
  boughtList.items = function () {
	  return items;
  }

  boughtList.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  };
  
  boughtList.isEmpty = function () {
	  return items.length === 0;
  }
}

function ShoppingListCheckOffService() {
  var service = this;

  service.getToBuyItems = function () {
	  return toBuyItems;
  }

  service.addBoughtItem = function (itemName, quantity) {
    setTimeout(function () {
		var item = {
		  name: itemName,
		  quantity: quantity
		};
		
		boughtItems.push(item);
		var num = toBuyItems.findIndex(item);
		
		if (num !== -1) {
		  toBuyItems.splice(num, 1);
		}
	}, 1);
  };

  service.removeItem = function (itemIndex) {
    boughtItems.splice(itemIndex, 1);
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}

})();