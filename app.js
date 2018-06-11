//BUDGET CONTROLLER

let budgetController = (function(){

    let Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    
    let Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let allExpenses = [];
    let allIncomes = [];
    let totalExpenses = 0;

    let data = {
        allItems : {
            exp: [],
            inc: []
        },
        totals: {
            exp:0,
            inc:0
        }
    };

    return {
        addItem: function(type, desc, val){
            let newItem, ID;

            //create new ID
            if (data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            //create new item based on 'inc' or 'exp' type
            if(type === 'exp'){
            newItem = new Expense(ID, desc, val);
            } else if(type ==='inc'){
            newItem = new Income(ID, desc, val);
            }
            //push it into our data structure
            data.allItems[type].push(newItem);

            //return the new element
            return newItem;
        },

        testing: function(){
            console.log(data);
        }
    };

    
})();




//UI CONTROLLER

let UIController = (function() {

    let DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue : '.add__value',
        inputBtn: '.add__btn'

    }

    return {
        getInput: function(){
            return {
            type : document.querySelector(DOMstrings.inputType).value, //will be either inc or exp
            description : document.querySelector(DOMstrings.inputDescription).value,
            value : document.querySelector(DOMstrings.inputValue).value
            };
        },

        addListItem: function(obj, type){
            //create HTML string with placeholder text

            //replace placeholder text with data

            // insert the HTML into the dom
        },

        getDomstrings: function(){
            return DOMstrings;
        } 
    };

})();

//GLOBAL APP CONTROLLER

let controller = (function(budgetCtrl, UICtrl) {
    let DOM = UIController.getDomstrings();

    let setupEventListeners = function(){
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event){
        if(event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
           
        }
    });

    }
    

    let ctrlAddItem = function(){
        let input, newItem;
        //1.Get the field input data
        input = UICtrl.getInput();
        console.log(input);
        //2.Add the item to budget controller
        newItem = budgetController.addItem(input.type, input.description, input.value);

        //3.Add the new item to UI
        //4.Calculate new budget
        //5.Display new budget
    };

    return {
        init: function() {
        setupEventListeners();
        }
    };
    
    
})(budgetController, UIController);

controller.init();