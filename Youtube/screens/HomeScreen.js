import React from "react";
import {StyleSheet, View,Text,TouchableOpacity} from 'react-native';




class Home extends React.Component {

  render() {
    return (

     <View>
       <TouchableOpacity>
         <Text style={styles.text} >
           Transactions screen
         </Text>
       </TouchableOpacity>
     </View>

    )
  }

}



   


const styles = StyleSheet.create({
  title:{
    justifyContent:"center",
    alignItems:"center"
  }
});

export default Home;
