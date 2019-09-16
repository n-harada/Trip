import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
// import { threadId } from 'worker_threads';


class AddScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>This is AddScreen</Text>
        <Icon
          name="close"
          onPress={() => this.props.navigation.navigate('detail')}
        />
      </View>
    );
  }
}


export default AddScreen;