import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import nameValidation from '../Validations/nameValidation';
import passwordValidation from '../Validations/passwordValidation';


const Login = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState({name: '', password: ''});

  const validateName = name => {
    const error = nameValidation(name);
    setErrorMessage(prev => ({...prev, name: error}));
  };

  const validatePassword = password => {
    const error = passwordValidation(password);
    setErrorMessage(prev => ({...prev, password: error}));
  };

  const handleLoginButton = () => {
    const nameError = nameValidation(name);
    if (nameError) {
      setErrorMessage({name: nameError, password: ''});
      return;
    }
    const passwordError = passwordValidation(password);
    if (passwordError) {
      setErrorMessage({name: '', password: passwordError});
      return;
    }

    // Clear errors if validation is successful
    setErrorMessage({name: '', password: ''});

    navigation.navigate('Home', {name});
  };

  const handleSignUpText = () => {
    navigation.navigate('SignUp');
  };

  const handleSocialButtonPress = url => {
    Linking.openURL(url).catch(err =>
      console.error('Failed to open URL:', err),
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topView}>
        <Text style={styles.titleText}>Welcome Back !</Text>
        <Text style={styles.subText}>Please log in to continue</Text>
      </View>

      {/* Middle Content */}
      <View style={styles.middleView}>
        <View style={styles.middleBox}>
          {/* Username Input */}
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={text => {
              setName(text);
              validateName(text);
            }}
          />
          {errorMessage.name ? (
            <Text style={styles.errorText}>{errorMessage.name}</Text>
          ) : null}

          {/* Password Input */}
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={text => {
              setPassword(text);
              validatePassword(text);
            }}
          />
          {errorMessage.password ? (
            <Text style={styles.errorText}>{errorMessage.password}</Text>
          ) : null}

          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLoginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {/* Horizontal Line with Text */}
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>or login with</Text>
            <View style={styles.line} />
          </View>

          {/* Social Login Buttons */}
          <View style={styles.socialLoginContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialButtonPress('https://www.google.com')}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={{
                    uri: 'https://img.icons8.com/color/48/google-logo.png',
                  }}
                  style={styles.socialIcon}
                />
                <Text style={styles.socialButtonText}>Google</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() =>
                handleSocialButtonPress('https://www.facebook.com')
              }>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={{
                    uri: 'https://img.icons8.com/color/48/facebook-new.png',
                  }}
                  style={styles.socialIcon}
                />
                <Text style={styles.socialButtonText}>Facebook</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Sign Up Section */}
          <View style={styles.signUpContainer}>
            <Text style={{marginTop: 20, color: '#aaa'}}>
              If you don't have an account?
            </Text>
            <TouchableOpacity onPress={handleSignUpText}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D3B6C',
  },
  topView: {
    flex: 2.5,
    backgroundColor: '#1D3B6C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    margin: 20,
  },
  titleText: {
    fontSize: 34,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
    marginLeft: '3%',
  },
  subText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: '3%',
  },
  middleView: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopRightRadius: 120,
  },
  middleBox: {
    width: '90%',
    padding: '2%',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  forgotText: {
    alignSelf: 'flex-end',
    fontSize: 14,
    fontWeight: '500',
    color: '#1D3B6C',
    marginBottom: 20,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#1D3B6C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#aaa',
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    marginHorizontal: 5,
  },
  socialButtonText: {
    color: '#565758',
    fontSize: 16,
    fontWeight: '600',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  signUpText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D3B6C',
    marginLeft: 8,
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
  },
});
