import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, 
  Text, 
  View,
  TextInput,
  TouchableOpacity ,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
  AsyncStorage

} from 'react-native';

import { Ionicons,MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from 'react';

export default function App() {

  const[task,setTask] = useState(["Luis","Henrique","Oliveira"]);
  const[newTask,setNewTask]=useState('');

  async function addTask(){

    if(newTask==''){
      return;
    }
    
    const search = task.filter(task => task == newTask);
    
    if(search.length !=0 ){
      alert("Atenção","Nome da tarefa repetido!!");
      return;
    }


    setTask([...task,newTask]);
    setNewTask('');
    Keyboard.dismiss();

  }

  async function removeTask(item){
    alert(
      "Deletar Task",
      "Tem certeza que desja remover esta anoatção?",
      [
        {text:"Cancel",
        onPress:()=>{
          return;
        },
        style:'cancel'
      },
      {
        text : "OK",
        onPress:()=> setTask(task.filter(tasks=>tasks!=item))
      }

      ],
      {cancelable:false}
    );
    
  }

  useEffect(()=>{
    console.log(newTask);
  },[newTask]);


  return (
    <>
<KeyboardAvoidingView

  keyboardVerticalOffset= {0}
  behavior="padding"
  style={{flex:1}}
  enabled={Platform.os == 'ios'}
>
    <View style={styles.container}>
      <View style= {styles.Body}>
        <FlatList style={styles.FlatList} 
          style={styles.FlatList}
          data={task}
          keyExtractor = {item => item.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item})=> (
            <View style={styles.ContainerView}>
              <Text style={styles.Texto}>{item}</Text>
              <TouchableOpacity onPress={()=>removeTask(item)}>
                <MaterialIcons name="delete-forever" size={25} color="#f64c75" />
              </TouchableOpacity>
          </View>
          )}
        />
      </View>

      <View style= {styles.Form}>

        <TextInput 
          style={styles.Input} 
          placeholderTextColor="#999"
          autoCorrect={true}
          placeholderText = "Adicione uma tarefa"
          maxLength={25}
          onChangeText={text =>setNewTask(text)}
          value={newTask}
        />

        <TouchableOpacity style={styles.Button} onPress={()=>addTask()} >
          <Ionicons name="add" size={24} color="white" />  
        </TouchableOpacity>

      </View>

    </View>
    </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal : 20,
    paddingVertical : 20,
    marginTop :20
  },

  Body:{
    flex:1
  },

  Form:{
      padding : 0,
      height :60,
      justifyContent : "center",
      alignSelf: "stretch",
      flexDirection : "row",
      paddingTop: 13,
      borderTopWidth : 1,
      borderColor:"#eee",
      backgroundColor : "#777",
  },
  Input:{
    flex : 1,
    height : 40,
    backgroundColor :"#eee",
    borderRadius: 4 ,
    paddingVertical : 5 ,
    paddingHorizontal : 10,
    borderWidth : 1,
    borderColor : "#eee",


  },

  Button : {
    height : 40,
    width : 40,
    justifyContent : "center",
    alignItems : "center",
    backgroundColor : "#1c6cce",
    borderRadius : 4,
    marginLeft : 10
  },

  FlatList : {
    flex : 1,
    marginTop : 5,
  },

  ContainerView: {

    marginBottom:15,
    padding : 15,
    borderRadius : 4 ,
    backgroundColor: "#eee",
    display:"flex",
    flexDirection:"row",
    justifyContent : "center",
    borderWidth:1,
    borderColor:"#eee"
  },
  
  Texto:{

    fonSize : 14,
    color: "#333",
    fontWeight: "bold",
    marginTop: 4,
    textAlign: "center",

  }


});
