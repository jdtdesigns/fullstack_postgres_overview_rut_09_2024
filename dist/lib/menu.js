import inquirer from 'inquirer';
import 'console.table';
import { getAllShops, getAllUsers, createShop } from './query.js';
let showWelcome = false;
export async function addShop() {
    const usersArray = await getAllUsers();
    const { user_id, name, address } = await inquirer.prompt([
        {
            message: 'Please select the owner of the shop',
            name: 'user_id',
            type: 'list',
            choices: usersArray.map((userObj) => {
                return {
                    name: userObj.user_name,
                    value: userObj.id
                };
            })
        },
        {
            message: 'Enter the shop name',
            name: 'name',
            type: 'input'
        },
        {
            message: 'Enter the shop address',
            name: 'address',
            type: 'input'
        }
    ]);
    await createShop(user_id, name, address);
    console.log('\nShop created successfully!\n');
}
export async function showAllShops() {
    const shopRowsArray = await getAllShops();
    console.table(shopRowsArray);
}
export async function showMainMenu() {
    if (!showWelcome) {
        console.log('\n------ Welcome To The Shop App ------\n');
        showWelcome = true;
    }
    const { optionFunction } = await inquirer.prompt({
        message: 'Please select an option',
        name: 'optionFunction',
        type: 'list',
        choices: [
            {
                name: 'Show All Shops',
                value: showAllShops
            },
            {
                name: 'Add Shop',
                value: addShop
            },
            {
                name: 'Quit',
                value: 0
            }
        ]
    });
    if (!optionFunction) {
        console.log('\nThanks for using the shop app!\n');
        process.exit();
    }
    await optionFunction();
    showMainMenu();
}
// export async function showMainMenu() {
//   if (!showWelcome) {
//     console.log('\n------ Welcome To The Shop App ------\n');
//     showWelcome = true;
//   }
//   const { option } = await inquirer.prompt({
//     message: 'Please select an option',
//     name: 'option',
//     type: 'list',
//     choices: ['Show All Shops', 'Add Shop', 'Show All Wines', 'Add Wine']
//   });
//   switch (option) {
//     case 'Show All Shops':
//       await showAllShops();
//       showMainMenu();
//       break;
//     case 'Add Shop':
//       await addShop();
//       showMainMenu();
//       break;
//   }
// }
//# sourceMappingURL=menu.js.map