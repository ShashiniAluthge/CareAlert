import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Linking,
} from 'react-native';
import { useUser } from '../context/UserContext';
import nameValidation from '../Validations/nameValidation';
import passwordValidation from '../Validations/passwordValidation';
import emailValidation from '../Validations/emailValidation';
import confirmPasswordValidation from '../Validations/confirmePasswordValidation';

const SignUp = () => {
  const navigation = useNavigation();
  const { signUp } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateName = (name) => {
    const error = nameValidation(name);
    setErrorMessage((prev) => ({ ...prev, name: error }));
  };

  const validateEmail = (email) => {
    const error = emailValidation(email);
    setErrorMessage((prev) => ({ ...prev, email: error }));
  };

  const validatePassword = (password) => {
    const error = passwordValidation(password);
    setErrorMessage((prev) => ({ ...prev, password: error }));
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    const error = confirmPasswordValidation(confirmPassword, password);
    setErrorMessage((prev) => ({ ...prev, confirmPassword: error }));
  };

  const handleSignUp = () => {
    const nameError = nameValidation(name);
    if (nameError) {
      setErrorMessage({
        name: nameError,
        email: '',
        password: '',
        confirmPassword: '',
      });
      return;
    }

    const emailError = emailValidation(email);
    if (emailError) {
      setErrorMessage({
        name: '',
        email: emailError,
        password: '',
        confirmPassword: '',
      });
      return;
    }

    const passwordError = passwordValidation(password);
    if (passwordError) {
      setErrorMessage({
        name: '',
        email: '',
        password: passwordError,
        confirmPassword: '',
      });
      return;
    }

    const confirmPasswordError = confirmPasswordValidation(confirmPassword, password);

    if (confirmPasswordError) {
      setErrorMessage({
        name: '',
        email: '',
        password: '',
        confirmPassword: confirmPasswordError,
      });
      return;
    }

    setErrorMessage({ name: '', email: '', password: '', confirmPassword: '' });

    signUp(name, email, password);
    navigation.navigate('Login');
  };

   const handleSocialButtonPress = async (url) => {
     try {
       await Linking.openURL(url);
     } catch (err) {
       console.error('Failed to open URL:', err);
     }
   };
   
  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.titleText}>Create an Account</Text>
        <Text style={styles.subText}>Please fill in the details to sign up</Text>
      </View>

      <View style={styles.middleView}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={(text) => {
            setName(text);
            validateName(text);
          }}
        />
        {errorMessage.name ? (
          <Text style={styles.errorText}>{errorMessage.name}</Text>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            validateEmail(text);
          }}
        />
        {errorMessage.email ? (
          <Text style={styles.errorText}>{errorMessage.email}</Text>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            validatePassword(text);
          }}
        />
        {errorMessage.password ? (
          <Text style={styles.errorText}>{errorMessage.password}</Text>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            validateConfirmPassword(text, password);
          }}
        />
        {errorMessage.confirmPassword ? (
          <Text style={styles.errorText}>{errorMessage.confirmPassword}</Text>
        ) : null}

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.bottomView}>
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>or sign up with</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.socialLoginContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialButtonPress('https://www.google.com')}
            >
              <View style={styles.socialContent}>
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
              }
            >
              <View style={styles.socialContent}>
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

          <View style={styles.signUpContainer}>
          <Text style={{ color: '#aaa' }}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topView: {
    flex: 2,
    backgroundColor: '#1D3B6C',
    justifyContent: 'center',
    borderBottomLeftRadius: 150,
    paddingHorizontal: 15,
    paddingVertical: 40,
  },
  titleText: {
    fontSize: 34,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  middleView: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 10,
  },
  bottomView: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
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
  signUpButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#1D3B6C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D3B6C',
    marginLeft: 8,
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
    width: '100%',
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
  socialContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialButtonText: {
    color: '#565758',
    fontSize: 16,
    fontWeight: '600',
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
  },
});
