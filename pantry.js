
import React, {useState, useEffect}  from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Keyboard, ScrollView, TouchableOpacity, Button  } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

const Pantry = () => {

    const [people, setpeople] = useState([
        {name: "moeez"},
        {name: "waleed"}
    ])

    const [getGot ,setgot] = useState([]);
    const [getWant, setwant] = useState([]);
    const [getText, setText] = useState('');
    const [getTransfer, setTransfer] = useState([]);
 
      saveData = async () => {
       try {
        await AsyncStorage.setItem("@pantry102", JSON.stringify(getWant))
        // console.log(getWant)
         alert('Data successfully saved')
       } catch (e) {
         alert('Failed to save the data to the storage')
       }
     }

       readData = async () => {
        try {
          const userData= await AsyncStorage.getItem("@pantry102")
          const userData2 = JSON.parse(userData)
          if (userData2 !== null) {
           // console.log(userData2)
            setwant(userData2)
            
          }
        } catch (e) {
        alert('Failed to fetch the data from storage')
        }
      }

       saveData2 = async () => {
       try {
        await AsyncStorage.setItem("@pantry103", JSON.stringify(getGot))
         console.log(getGot)
         alert('Data successfully saved get got')
       } catch (e) {
         alert('Failed to save the data to the storage')
       }
     }

       readData2 = async () => {
        try {
          const userData= await AsyncStorage.getItem("@pantry103")
          const userData2 = JSON.parse(userData)
          if (userData2 !== null) {
            //console.log(userData2)
            setgot(userData2)
            
          }
        } catch (e) {
        alert('Failed to fetch the data from storage')
        }
      }

      useEffect(() => {
      readData()
      readData2()
      }, [])

     const addItem = async () => {
        await setwant([
          ...getWant,
          { key: Math.random().toString(), data: getText ,}
        ]);
        setText(''); 
        saveData();
        //console.log("add item sy")
        //console.log(getWant)
        Keyboard.dismiss();
      }

    const itemBought = async (id,itemKey) => {
      let newArr = [...getWant]; 
      await setgot([
        ...getGot,
        { key: Math.random().toString(), data: newArr[id].data ,}
      ])
      console.log("get got")
      console.log(getGot)
      await setwant(() => getWant.filter(item => item.key != itemKey));
      saveData()
      saveData2();
    }

    const removeItem1 = async (itemKey) => { //for Want List
      await setwant(() => getWant.filter(item => item.key != itemKey));
      saveData();
    }

    const removeItem2 = async(itemKey) => { //for get List
      await setgot(() => getGot.filter(item => item.key != itemKey));
      saveData2()
    }

    return (
      <View style={styles2.MainContainer }>
        <TextInput 
            style={styles2.textInput}
            underlineColorAndroid='transparent'
            placeholder="Enter Item Here" 
            onChangeText={text => setText(text)}
            value={getText}
            onSubmitEditing={()=> addItem()}
            />
            


        <View style= {{borderWidth: 2,borderColor: '#6495ed'}}>
            <Text>What You want</Text>
            {/* <FlatList
                data = {getWant}
                renderItem = {({item}) => (
                    <Text>{item.data}</Text>
                )}
            /> */}

            <ScrollView  keyboardShouldPersistTaps={'handled'}>
              {getWant.map((item, id) =>
              <TouchableOpacity
                key={item.key}
                activeOpacity={0.7}
                var a = {{}}
                onPress = {() => itemBought(id, item.key)}>
                
            <View style={styles.scrollviewItem}>
              <Text  style={styles.scrollviewText}>{id+1}) {item.data}</Text>
                <TouchableOpacity
                  onPress= {()=>removeItem1(item.key)}
              >
                <View style={styles.crosstextcontainer}>
                  <Text style={styles.crosstext}>X</Text>
                </View>
              </TouchableOpacity>

              
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>  




        </View>

        <View style= {{borderWidth: 2,borderColor: '#6495ed'}}>
            <Text>What You have Got</Text>
            {/* <FlatList
                data = {getGot}
                renderItem = {({item}) => (
                    <Text>{item.data}</Text>
                )}
            /> */}

            <ScrollView  keyboardShouldPersistTaps={'handled'}>
              {getGot.map((item, id) =>
              <TouchableOpacity
                key={item.key}
                activeOpacity={0.7}
                var a = {{}}>
              
                
            <View style={styles.scrollviewItem}>
              <Text  style={styles.scrollviewText2}>{id+1}) {item.data}</Text>
                <TouchableOpacity
                  onPress= {()=>removeItem2(item.key)}
              >
                <View style={styles.crosstextcontainer}>
                  <Text style={styles.crosstext}>X</Text>
                </View>
              </TouchableOpacity>

              
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>  

      <Button title ="clear"
              onPress= {()=> {
                AsyncStorage.clear()
                alert("cleared")}}
       ></Button>
            




        </View>
      </View>


     

    );
  }
export default Pantry


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