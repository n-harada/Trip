import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Image, Alert, AsyncStorage, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SLIDE_DATA = [
    { title: 'Step:1', text: 'aaa', uri: require('../assets/welcome_screen1.jpg') },
    { title: 'Step:2', text: 'bbb', uri: require('../assets/welcome_screen2.jpg') },
    { title: 'Step:3', text: 'ccc', uri: require('../assets/welcome_screen3.jpg') },
];

class WelcomeScreen extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            is_initialized : null
        }; 
    }

    async componentDidMount(){
        let is_initializedString = await AsyncStorage.getItem('is_initialized');
        if (is_initializedString === 'true') {
            this.setState({ is_initialized: true });
            this.props.navigation.navigate('main');
        }
        else{
            this.setState({ is_initialized: false });
        }
    }


    onStartButtonPress = async () => {

        await AsyncStorage.setItem('is_initialized', 'true')

        this.props.navigation.navigate('main');
        setTimeout(
            function(){
                Alert.alert(
                    'Alert',
                    'The Button was pressed',
                    [
                        { text: 'OK' },
                        { text: 'NO' }
                    ],
                    { cancelable: false }
                );
            },1000
        )
    }

    renderLastButton(index){
        if(index === SLIDE_DATA.length - 1){
            return(
                <Button
                    style={{ padding: 10 }}
                    buttonStyle = {styles.buttonStyle}
                    title = "Let's get it started!"   
                    onPress = {this.onStartButtonPress}             
                />
            );
        }
    }


    renderSlides() {
        return SLIDE_DATA.map((slide, index) => {
            return (
                <View
                 key={index}
                 style={styles.slideStyle}
                >
                    <View 
                    style={styles.containerStyle}>
                        <Text style={styles.textStyle}>{slide.title}</Text>
                        <Text style={styles.textStyle}>{slide.text}</Text>
                    </View>

                    <Image
                        style={{ flex:2 }}
                        resizeMode="contain"
                        source={slide.uri}
                    
                    /> 

                    <View 
                    style={styles.containerStyle}>
                        {this.renderLastButton(index)}
                        <Text style={styles.textStyle}>{index+1} / 3</Text>
                    </View>
                </View>

            )
        });
    }

    render() {

        if(this.state.is_initialized === null){
            return <ActivityIndicator size="large"/>;
        }
    
        return(
            <ScrollView
             horizontal
             pagingEnabled
             style={{ flex: 1 }}
            >
                {this.renderSlides()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    slideStyle: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'skyblue',
        width: SCREEN_WIDTH,
    },
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',        
    },
    textStyle: {
        color: 'white',
        fontSize: 20,
        padding: 5
    },
    buttonStyle: {
        backgroundColor: 'deepskyblue',
    }

});

export default WelcomeScreen;