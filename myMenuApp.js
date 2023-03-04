class Dish {                              
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    describe() { 
        return `${this.name} is $${this.price}.`;   //created a class that describes the dish name and price 
    }
}   

class Category{
    constructor(name) {
        this.name = name;
        this.dishes = [];
    }
    addDish(dish) {
        if (dish instanceof Dish) {     //to make sure users pass in the dish and not some number or string
            this.dishes.push(dish);
        } else {
            throw new Error(`You can only add an instance of dish. Argument is not a dish: ${dish}`);
        }
    }

    describe() {
        return `${this.name} has ${this.dishes.length} items.`;  
    }
}

class Menu {
    constructor(){
        this.categories = [];
        this.selectedCategory = null;  //helps manage one food categories at a time 
    }

    start() {
        let selection = this.showMainMenuOptions(); 

        while (selection != 0) {     //gets user selection and these cases are the options users get and can select from. 
            switch (selection) {     //depending on what user selects, we will get the following options. 
                case '1':
                    this.createCategory();
                    break;
                case '2':
                    this.viewCategory();
                    break;
                case '3':
                    this.deleteCategory();
                    break;
                case '4':
                    this.displayCategories();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Closing the food menu.') //if default 0 is selected, this will alert to close the menu. 
    }

    showMainMenuOptions() {
        return prompt(`
        0) close food menu 
        1) create new food category
        2) view food category
        3) delete food category
        4) display all food categories
        `);                                 // prompt is the pop up box, that displays the following and asks to return answer
    }

    showCategoryMenuOptions(categoryInfo) {  //takes food category info, and print out the info, and return following user input. *** put after food category menu option. 
        return prompt(`
        0) back
        1) create dish
        2) delete dish
        -------------------
        ${categoryInfo}
        `); 
    }

    displayCategories() {
        let categoryString = '';
        for (let i = 0; i < this.categories.length; i++) {                    
            categoryString += i + ') ' + this.categories[i].name + '\n';    
        }                               //created a loop to show all food categories and show each one with an index + show up on line. 
        alert(categoryString);
    }

    createCategory() {
        let name = prompt ('Enter name for new food category:');  //returns a prompt to type a name of neww food category
        this.categories.push(new Category(name));        //name typed in the prompt will get pushed into food category.
    }

    viewCategory() {
        let index = prompt(`Enter the index of the food category you wish to view`);   //to view food category, this asks users the category to view
        if (index > -1 && index < this.categories.length) {                        //validating user input to avoid error.
            this.selectedCategory = this.categories[index];
            let description = 'Food Category: ' + this.selectedCategory.name + '\n';  //we set class property by the food category input by user.

            for (let i = 0; i < this.selectedCategory.dishes.length; i++) {   //creating loop to add description of specific food in food category(name + price of food + new line)
                description += i + ') ' + this.selectedCategory.dishes[i].name    
                + ' - ' + this.selectedCategory.dishes[i].price + '\n';            //builds a list of dish in food category
            }

            let selection = this.showCategoryMenuOptions(description) //pass in description from show food category option to show for food category
            
            switch (selection) {
                case '1':
                    this.createDish();   //create sub selection inside food category for the dishes. 
                    break;
                case '2':
                    this.deleteDish();
            }
            
        }
    }

    deleteCategory() {
        let index = prompt('Enter the index of the category you wish to delete from the menu:');
        if (index > -1 && index < this.categories.length){
            this.categories.splice(index, 1);                 //gives user an option to delete a category by inputting an index. 
        }
    
    }

    createDish() {
        let name = prompt ('Enter name for a new item:');         //pops up a prompt after selecting create dish option
        let price = prompt ('Enter price for new item:');
        this.selectedCategory.dishes.push(new Dish(name, price));   //pushes the new price and name as new Dish. 
    }

    deleteDish() {
        let index = prompt('Enter the index of the item you wish to delete:');   //giving user option to delete dish within the category by using splice the index user types in.
        if (index > -1 && index < this.selectedCategory.dishes.length) {
            this.selectedCategory.dishes.splice(index, 1);                      
        }
    }
}

let menu = new Menu();
menu.start();