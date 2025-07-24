import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { } from 'react-native';

import Login from './Screens/Login_Logout/Login.js';
import Logout from './Screens/Login_Logout/Logout.js';

import Structure_Details from './Screens/Home/Structure/Structure_Details.js';
import Structure_Management from './Screens/Home/Structure/Structure_Management.js';

import Add_Edit_Land from './Screens/Home/Land Management/Add_Edit_Land.js';
import Add_Edit_Partners from './Screens/Home/Land Management/Add_Edit_Partners.js';
import Expenses from './Screens/Home/Land Management/Expenses.js';
import Land_Management from './Screens/Home/Land Management/Land_Management.js';
import Pay_Partner from './Screens/Home/Land Management/Pay_Partner.js';
import View_Partner_Transactions from './Screens/Home/Land Management/View_Partner_Transactions.js';

import EditCustomerDetails from './Screens/Home/Flat Management/EditCustomerDetails.js';
import Flat_Management from './Screens/Home/Flat Management/Flat_Management.js';
import FlatList from './Screens/Home/Flat Management/FlatList.js';
import FlatOwner from './Screens/Home/Flat Management/FlatOwner.js'; // Assuming this is a valid import, if not, remove it
import ViewInstallments from './Screens/Home/Flat Management/ViewInstallments.js';

import Add_Edit_Lead from './Screens/Home/Lead Management/Add_Edit_Lead.js';
import Lead_Management from './Screens/Home/Lead Management/Lead_Management.js';

import All_Customer from './Screens/Home/Customer Details/All_Customer.js'; // Assuming this is a valid import, if not, remove it
import Customer_Details from './Screens/Home/Customer Details/Customer_Details.js';

import Add_Staff from './Screens/Home/Add Staff/Add_Staff.js';

import All_Stocks from './Screens/Home/Stock Management/All_Stocks.js';
import Stock_Details from './Screens/Home/Stock Management/Stock_Details.js';
import Stock_Management from './Screens/Home/Stock Management/Stock_Management.js';

import Allotment_Letter from './Screens/Home/Letter/Allotment_Letter.js';
import Demand_Letter from './Screens/Home/Letter/Demand_Letter.js';
import Letter from './Screens/Home/Letter/Letter.js';
import letter_Heades from './Screens/Home/Letter/letter_Heades.js';
import Noc_Letter from './Screens/Home/Letter/Noc_Letter.js';
import Offer_Letter from './Screens/Home/Letter/Offer_Letter.js';
import Possession_Letter from './Screens/Home/Letter/Possession_Letter.js'; // Assuming this is a valid import, if not, remove it
import Riveling_Letter from './Screens/Home/Letter/Riveling_Letter.js';
import Salary_Slip from './Screens/Home/Letter/Salary_Slip.js';


import Home from './Screens/Home/Home.js';
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationIndependentTree>
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>

            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Logout" component={Logout} />

            <Stack.Screen name="Home" component={Home} />

            <Stack.Screen name="Structure_Management" component={Structure_Management} />
            <Stack.Screen name="Structure_Details" component={Structure_Details} />

            <Stack.Screen name="Land_Management" component={Land_Management} />
            <Stack.Screen name="Add_Edit_Land" component={Add_Edit_Land} />
            <Stack.Screen name="Add_Edit_Partners" component={Add_Edit_Partners} />
            <Stack.Screen name="View_Partner_Transactions" component={View_Partner_Transactions} />
            <Stack.Screen name="Pay_Partner" component={Pay_Partner} />
            <Stack.Screen name="Expenses" component={Expenses} />

            <Stack.Screen name="Flat_Management" component={Flat_Management} />
            <Stack.Screen name="FlatList" component={FlatList} />
            <Stack.Screen name="FlatOwner" component={FlatOwner} />
            <Stack.Screen name="ViewInstallments" component={ViewInstallments} />
            <Stack.Screen name="EditCustomerDetails" component={EditCustomerDetails} />

            <Stack.Screen name="Lead_Management" component={Lead_Management} />
            <Stack.Screen name="Add_Edit_Lead" component={Add_Edit_Lead} />

            <Stack.Screen name="Customer_Details" component={Customer_Details} />
            <Stack.Screen name="All_Customer" component={All_Customer} />

            <Stack.Screen name="Add_Staff" component={Add_Staff} />

            <Stack.Screen name="Stock_Management" component={Stock_Management} />
            <Stack.Screen name="All_Stocks" component={All_Stocks} />
            <Stack.Screen name="Stock_Details" component={Stock_Details} />

            <Stack.Screen name="Letter" component={Letter} />
            <Stack.Screen name="Offer Letter" component={Offer_Letter} />
            <Stack.Screen name="Riveling Letter" component={Riveling_Letter} />
            <Stack.Screen name="Salary Slip" component={Salary_Slip} />
            <Stack.Screen name="Allotment Letter" component={Allotment_Letter} />
            <Stack.Screen name="Demand Letter" component={Demand_Letter} />
            <Stack.Screen name="Letter Headers" component={letter_Heades} />
            <Stack.Screen name="Noc Letter" component={Noc_Letter} />
            <Stack.Screen name="Possession Letter" component={Possession_Letter} />


        </Stack.Navigator>
    </NavigationContainer>
    </NavigationIndependentTree>
  )
}

export default App