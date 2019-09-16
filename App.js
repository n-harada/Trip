import React from 'react';
import { StyleSheet, Image, Text, View, Platform, StatusBar, AsyncStorage } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import { Provider } from 'react-redux'
import store from './store';
import WelcomeScreen from './screens/WelcomeScreen';


import HomeScreen from './screens/HomeScreen';
import AddScreen from './screens/AddScreen';
import DetailScreen from './screens/DetailScreen';
import ProfileScreen from './screens/ProfileScreen';
import Setting1Screen from './screens/Setting1Screen';
import Setting2Screen from './screens/Setting2Screen'; 

export default class App extends React.Component {

  render(){

    const headerNavigationOptions = {
      headerStyle: {
        backgroundColor: '#009ccc',
        marginTop: (Platform.OS === 'android' ? 24 : 0)
      },
      headerTitleStyle: { 
        color: 'white',
        fontSize:28
      },
      headerTintColor: 'white',
    }

    const HomeStack = createStackNavigator({
      home: { 
        screen: HomeScreen,
        navigationOptions: {
          ...headerNavigationOptions,
          headerTitle: 'ClubCloud',
          headerBackTitle: 'Home'
        }
      
      },
      detail: { 
        screen: DetailScreen, 
        navigationOptions: {
          ...headerNavigationOptions,
          headerTitle: 'Detail',
        }
      }
    });

    HomeStack.navigationOptions = ({ navigation }) => {
      return {
        tabBarVisible: (navigation.state.index === 0)
      };
    };


    const AddStack = createStackNavigator({
      add: { 
        screen: AddScreen,
        navigationOptions: {
          header: null
        }
      }
    });

    AddStack.navigationOptions = ({ navigation }) => {
      return {
        tabBarVisible: ( navigation.state.index === -1 )
      };
    };

    const ProfileStack = createStackNavigator({
      profile: { 
        screen: ProfileScreen,
        navigationOptions: {
          ...headerNavigationOptions,
          headerTitle: 'Treco',
          headerBackTitle: 'Profile'
        }
      },
      setting1: { 
        screen: Setting1Screen,
        navigationOptions: {
          ...headerNavigationOptions,
          headerTitle: 'Setting 1',
        } 
      },
      setting2: { 
        screen : Setting2Screen,
        navigationOptions: {
          ...headerNavigationOptions,
          headerTitle: 'Setting 2',
        } 
      },
    });

    ProfileStack.navigationOptions = ({ navigation }) => {
      return {
        tabBarVisible: (navigation.state.index === 0)
      };
    };


    const MainTab = createBottomTabNavigator({
      homeStack: { 
        screen: HomeStack,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Image
              style={{ height:25, width:25, tintColor: tintColor }}
              source={require('./assets/home.png')}
              // source={require('https://d2ml46mqa54h0p.cloudfront.net/media/1/file/IMG_6134.PNG')}
            />
          ),
          title: 'Home'
        }
      },
      addStack: { 
        screen: AddStack,
        navigationOptions: {
          tabBarIcon: () => (
            <Image
              style={{ height: 60, width:60, tintColor:'deepskyblue' }}
              source={require('./assets/add.png')}
            />
          ),
          title:'',
        } 
      },
      profileStack: { 
        screen: ProfileStack,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Image
              style={{ height:25, width: 25, tintColor: 'deepskyblue' }}
              source = {require('./assets/profile.png')}
            />
          ),
          title: 'Profile'
        } 
      
      }
    },{
      swipeEnabled: false,
    });

    const NavigatorTab = createAppContainer(
      createSwitchNavigator({
        welcome: { screen: WelcomeScreen },
        main: { screen: MainTab }
      })
    );
  

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <NavigatorTab />
      </View>
    </Provider>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});
