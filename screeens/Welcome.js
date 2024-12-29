import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const handleSignupButton = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../images/back.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover">
        {/* App Name  */}
        <View style={styles.topContent}>
          <Text style={styles.title}>
            <Text style={styles.careText}>Care</Text>
            <Text style={styles.alertText}>Alert</Text>
          </Text>
          <Text style={styles.bottomText}>Stay informed, stay safe</Text>
        </View>

        <View style={styles.overlay}>
          {/* Button */}
          <TouchableOpacity style={styles.button} onPress={handleSignupButton}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
  },
  topContent: {
    justifyContent: 'flex-start',
    flex: 1,
    marginTop: 120,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
  },
  careText: {
    color: '#1D3B6C',
  },
  alertText: {
    color: '#fff',
  },
  bottomText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 70,
  },
  buttonText: {
    color: '#1A577C',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
