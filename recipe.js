import React, {useState, useEffect}  from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Keyboard, ScrollView, TouchableOpacity, Button, Image, Linking  } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Recipe2 from "./recipe2"



const Recipe= ({navigation}) => {

    const App_Id = "8a8af900";
    const App_Key = "213e4d7c875a4c51c5c700b3a059ce9e";

    const [query, setQuery] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [alert, setAlert] = useState("");
    const [img, setImg]= useState([]);

    const url = `https://api.edamam.com/search?q=${query}&app_id=${App_Id}&app_key=${App_Key}&from=0&to=30`;

    const fetchAPI = async ()=> {
        return await fetch(url)
        .then((response) => response.json())
        .then((result) => {
         console.log(result)
          setRecipes(result.hits);
          //setImg(result.hits[0].recipe.uri)
         //console.log(recipes.recipe)
         setQuery("");
         setAlert("");
        }
        )
        .catch((error) => {
          console.error(error);
        });}
    return(
    <View style = {styles2.MainContainer}>
        <TextInput 
            style={styles2.textInput}
            underlineColorAndroid='transparent'
            placeholder="Enter Item Here" 
            onChangeText={text => setQuery(text)}
            value={query}
            onSubmitEditing={fetchAPI}
            />

        
        <ScrollView  
            keyboardShouldPersistTaps={'handled'}>
              {recipes.map(({recipe}, id) =>
              <TouchableOpacity
              
                key={recipe.key}
                activeOpacity={0.7}
               // {...console.log(recipe.image)}
                onPress = {() => 
                
                navigation.navigate("2",{Recipe: recipe})}
                
                >
                
            <View style={styles.scrollviewItem}>
            
              <Text  style={styles.scrollviewText}>{id+1}) {recipe.label}</Text>
              <Image style={{width: 51,height: 51,resizeMode: 'contain'}} source={{uri: recipe.image}}></Image>
                <TouchableOpacity
                  
              >
                
              </TouchableOpacity>

              
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>  
            
    </View>
    )}
export default Recipe




const styles2 = StyleSheet.create({
 
    MainContainer: {
      padding: 10,
      justifyContent: 'center',
      backgroundColor: '#ffff',
    },
   
    row: {
      fontSize: 15,
      padding: 15
    },
   
    textInput: {
      textAlign: 'center',
      height: 42,
      borderWidth: 2,
      borderColor: '#6495ed',
      borderRadius: 120,
      backgroundColor: "#FFFF",
    }
  });

  const styles = StyleSheet.create({
    crosstextcontainer: {
      backgroundColor: 'grey',
      borderRadius: 50,
      padding: 5,
      width: 30,
      justifyContent: 'center',
      alignItems: 'center'
    },
    crosstext: {
      fontSize: 16,
      color: 'red',
      fontWeight: "bold"
    },
    scrollviewText2: {
      flex: 2,
      fontSize: 26,
      color: 'white',
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid'
    },
    scrollviewText: {
      flex: 2,
      fontSize: 26,
      color: 'white',
      
    },
    scrollview: {
      paddingTop: 20,
      width: '100%'
    },
    scrollviewItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: 'orange',
      alignSelf: "center",
      padding: 10,
      margin: 5,
      width: '90%',
      borderRadius: 10
    },
    title: {
      fontSize: 64,
      color: 'lightgrey'
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop: 40
    },
    inputContainer: {
      flexDirection: "row",
      width: '70%',
      justifyContent: "space-between",
      alignItems: "center"
    },
    textInput: {
      borderColor: 'red',
      //borderWidth: 2,
      borderBottomWidth: 2,
      width: '100%',
      // borderRadius: 50,
      fontSize: 16,
      padding: 10
    }
  })