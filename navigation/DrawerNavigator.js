import React,{Component} from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import Profile from "../screens/Profile";
import Logout from "../screens/Logout";
import firebase from 'firebase';

import CustomSidebarMenu from "../screens/CustomSidebarMenu";


const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends Component{
    constructor(props){
      super(props);
      this.state = {
        dark_theme : true
      };
    }
    componentDidMount(){
      let theme;
      firebase
      .database()
      .ref("/users/"+firebase.auth().currentUser.uid)
      .on("value",function(snapshot){
        theme = snapshot.val().current_theme;
        
      });
      this.setState({
        dark_theme:theme === "dark"?true:false
      });
    }
    render(){
      let props = this.props;
      return(
        <Drawer.Navigator
        drawerContentOptions = {{
          activeTintColor: "#e91e63",
          inactiveTintColor:this.state.dark_theme ? "black":"white",
          itemStyle:{marginVertical:5}
        }}
        drawerContent = {props =><CustomSidebarMenu{...props}/>}
        screenOptions = {{headerShown:false}}>

        <Drawer.Screen
        name = "MyHome"
        component = {StackNavigator}
        options = {{unmountOnBlur:true}}
        />

        <Drawer.Screen
        name = "profile"
        component = {StackNavigator}
        options = {{unmountOnBlur:true}}
        />

         <Drawer.Screen 
         name = "LogOutScreen" 
         component = {StackNavigator}
         options = {{unmountOnBlur:true}}
         />


        </Drawer.Navigator>
      )
    }
    
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown:false}}>
      <Drawer.Screen name="MyHome" component={StackNavigator} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
};

