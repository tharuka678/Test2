import React,{useState}from 'react';
import {NavigationContainer}from '@react-navigation/native';
import {createStackNavigator}from '@react-navigation/stack';
import { StyleSheet, Text, View ,Image, TextInput,TouchableOpacity, Alert} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Ionicons} from '@expo/vector-icons';

const myStack = createStackNavigator();
const mytab = createBottomTabNavigator();
const mydrawer = createDrawerNavigator();

function HomePage({route,navigation}){
  const {OwnerAccount} = route.params;
  return(
    <View>
      <Text style={styles.ownertext}>
        Hi  {OwnerAccount} Welcome To the G-BABA App!!!</Text>
    </View>
  )
}
function PhotosPage({route,navigation}){
  return(
    <View style={styles.gallery}>
     
      <View style={styles.myimgs}>
         
            <Image style={styles.mylogos} source={require('../2015ICTS65/src/images/arduino_mega.png')}></Image>
      </View>
      <View style={styles.myimgs}>
         
            <Image style={styles.mylogos} source={require('../2015ICTS65/src/images/arduino_mini.png')}></Image>
      </View>
      <View style={styles.myimgs}>
         
            <Image style={styles.mylogos} source={require('../2015ICTS65/src/images/Arduino_uno.png')}></Image>
      </View>
      <View style={styles.myimgs}>
         
            <Image style={styles.mylogos} source={require('../2015ICTS65/src/images/nodemcu.png')}></Image>
      </View>
      <View style={styles.myimgs}>
         
            <Image style={styles.mylogos} source={require('../2015ICTS65/src/images/arduino_mega.png')}></Image>
      </View>
      <View style={styles.myimgs}>
         
            <Image style={styles.mylogos} source={require('../2015ICTS65/src/images/arduino_mini.png')}></Image>
      </View>
    </View>
  )
}
function CartPage({route,navigation}){

    const[itemname,setitemname]=useState('');
    const[itemlocation,setitemlocation]=useState('');
    const[itemcode,setitemcode]=useState('');
    return(

    <View style={styles.mycart}>
      <TextInput style={styles.myinput} placeholder='Product Name' onChangeText={text => setitemname(text)}></TextInput>
      <TextInput style={styles.myinput} placeholder='Diliver Location' onChangeText={text => setitemlocation(text)}></TextInput>
      <TextInput style={styles.myinput} placeholder='Swift Code' onChangeText={text => setitemcode(text)}></TextInput>
      <TouchableOpacity onPress={() =>{
        alert('Product Name '+itemname+' Will be diliver To The loacation '+itemlocation+'\n  Charges Will be reduce from swift code : '+itemcode+'.')
      }}>
        <Text style={styles.btprocess}>Procecd</Text>
      </TouchableOpacity>
    </View>
  )
}

function HomeTabScreen({route,navigation}){
  const {OwnerAccount} = route.params;
  return(
    <mytab.Navigator
    screenOptions={
      ({route}) => ({
        tabBarIcon : ({focused,size,color}) => {
          if(route.name=='home'){
            return(
              <Ionicons
                name = {
                  focused
                  ? 'ios-home'
                  : 'ios-home'
                }
                size = {size}
                color = {color}
              />
            )
          }
         else if(route.name=='photos'){
            return(
              <Ionicons
                name = {
                  focused
                  ? 'ios-camera'
                  : 'ios-camera'
                }
                size = {size}
                color = {color}
              />
            )
          }
          else if(route.name=='cart'){
            return(
              <Ionicons
                name = {
                  focused
                  ? 'ios-cart'
                  : 'ios-cart'
                }
                size = {size}
                color = {color}
              />
            )
          } 
        }
      })
    }
    tabBarOptions={{
      activeTintColor: 'orange',
      inactiveTintColor: 'gray'
    }}
    >
      <mytab.Screen name="home" component={HomePage} initialParams={{OwnerAccount:OwnerAccount}}/>
      <mytab.Screen name="photos" component={PhotosPage} />
      <mytab.Screen name="cart" component={CartPage} />
    </mytab.Navigator>

  )
}


function HomeDrawerScreen({route,navigation}){
  const {OwnerAccount} = route.params;
  return(
    <mydrawer.Navigator>
        <mydrawer.Screen name="home" component={HomeTabScreen} initialParams={{OwnerAccount:OwnerAccount}}/>
        <mydrawer.Screen name="signout" component={loginScreen} />

    </mydrawer.Navigator>
  )
}

function loginScreen({navigation,route}){
  
  const [username,setUsername] =useState('');
  const [password,setPassword] =useState('');

  return(
    <View style={styles.container}>
      <View style={styles.mylogo}>
        <Image style={styles.mylogos} source={require('../2015ICTS65/src/images/logo.png')}></Image>
        <Text style={styles.title}>G-BABA</Text>
      </View>
        <Text style={styles.welcomenote}>Welcome To The
          G-BABA App</Text>
      <View>
        <TextInput style={styles.inputs} 
        onChangeText={text => setUsername(text)}
        placeholder='UserName'
    />
        <TextInput style={styles.inputs} 
        onChangeText={(text) =>setPassword(text)}
        placeholder='Password'
        secureTextEntry
   />
      </View>
      <View style={styles.lgbutton}>
        <TouchableOpacity
        onPress={() => {
          var un = username;
          var pw = password;

          if(un == 'aaa' && pw == 'aaa')
          {
            alert('Sucessfully logged In!!!');
            navigation.navigate('home',{OwnerAccount:un});
          }
          else
          {
            alert('Error!!!.Please Chek username and password.');
          }
        }}
        >
          <Text style={styles.loginbutton}>Login</Text>
        </TouchableOpacity>
      </View>
          
    </View>
  )
}
export default function App() {
  return (
    <NavigationContainer>
      <myStack.Navigator initialRouteName='login'
      screenOptions={{headerShown: false,}}
        >

        <myStack.Screen name='login' component={loginScreen}/>
        <myStack.Screen name="home" component={HomeDrawerScreen} />

      </myStack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe4c4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    textAlign:'center',
    fontSize:25,
  },
  welcomenote:{
      fontStyle:'italic',
      padding: 10, 
  },
  mylogos:{
    width:135,
    height:130,  
  },
  inputs:{
    width:240,
    height:30, 
    marginTop:15,
    borderRadius: 15,
    borderWidth:2,
    textAlign:'center',
    backgroundColor: '#dda0dd',
  },
  lgbutton:{
    width:240,
    height:30, 
    marginTop:25,
    borderRadius: 15,
    borderWidth:2,
    textAlign:'center',
    backgroundColor: '#893471',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  loginbutton:{
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  homeview:{
    flex: 1,
    backgroundColor: '#ffe4c4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ownertext:{
    marginTop:"60%",
    textAlign:'center',
    width:'100%',
    height:'100%',
    fontSize:45,
  },
  gallery:{
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: '10%',
  },
  myimgs:{
    width: '40%',
    height: 120,
    marginTop: '20%',
  },
  mycart:
  {
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: '20%',
  },
  btprocess:{
    width: 320,
    height:30,
    backgroundColor: '#906543',
    borderRadius:10,
    marginTop: '20%',
    textAlign: 'center',
    fontSize: 25,
    color:'#fff',
    fontWeight:'bold',
  },
  myinput:{
     width: '90%',
     height:'6%',
     marginTop: '5%',
     backgroundColor: '#2383',
     fontSize:18,
     fontWeight:'bold',

  }
});
