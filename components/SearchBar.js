import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import SearchIcon from '../images/search.png';

const SearchBar = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <Image source={SearchIcon} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search countries..."
        value={value}
        onChangeText={onChange}
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor="#999"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: '#ddd',
    height: 45,
    marginHorizontal:15
  },
  icon: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
    tintColor: '#1D3B6C',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1D3B6C',
  },
});

export default SearchBar;
