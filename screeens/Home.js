import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { CountContext } from '../context/CountContext';
import SearchBar from '../components/SearchBar';
import notificationIcon from '../images/notification.png';
import { useNavigation } from '@react-navigation/native';

const Home = ({ route }) => {
  const navigation = useNavigation();
  const { name } = route.params;
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { count, setCount } = useContext(CountContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch COVID-19 data
        const covidResponse = await axios.get(
          'https://covid-193.p.rapidapi.com/statistics',
          {
            headers: {
              'X-Rapidapi-Key':
                '6310bd4c1dmshb71acfd1972974ap1a6af8jsne5e250f9e962',
              'X-Rapidapi-Host': 'covid-193.p.rapidapi.com',
            },
          }
        );
  
        // Fetch country flags
        const flagsResponse = await axios.get(
          'https://restcountries.com/v3.1/all?fields=name,flags'
        );
  
        // Map flags to country names
        const flagsMap = flagsResponse.data.reduce((acc, country) => {
          acc[country.name.common.toLowerCase()] = country.flags?.png || null;
          return acc;
        }, {});
  
        // Placeholder image for missing flags
        const placeholderImage = 'https://via.placeholder.com/150';
  
        // Map COVID-19 data with corresponding flags
        const mergedData = covidResponse.data.response.map((item) => ({
          ...item,
          flag: flagsMap[item.country.toLowerCase()] || placeholderImage,
        }));
  
        setData(mergedData);
        setFilteredData(mergedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.country.toLowerCase().startsWith(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handleMoreButtonPress = (item) => {
    // Increase the count
    setCount(count + 1);

    // Navigate to CardDetails page
    navigation.navigate('CardDetails', {
      country: item.country,
      flag: item.flag,
      cases: item.cases,
      deaths: item.deaths,
      tests: item.tests,
      population: item.population || 'N/A',
      continent: item.continent || 'N/A',
      critical: item.cases.critical || 'N/A',
      active: item.cases.active || 'N/A',
      recovered: item.cases.recovered || 'N/A',
    });
  };

  const renderCard = ({ item }) => (
    <View style={{ paddingHorizontal: 15 }}>
      <View
        style={styles.card}
        onPress={() =>
          navigation.navigate('CardDetails', {
            country: item.country,
            flag: item.flag,
            cases: item.cases,
            deaths: item.deaths,
            tests: item.tests,
            population: item.population || 'N/A',
            continent: item.continent || 'N/A',
            critical: item.cases.critical || 'N/A',
            active: item.cases.active || 'N/A',
            recovered: item.cases.recovered || 'N/A',
          })
        }
      >
        <Image source={{ uri: item.flag }} style={styles.cardImage} />
        <Text style={styles.cardTitle}>{item.country}</Text>
        <Text style={styles.cardItem}>
          Total Cases: {item.cases.total || 'N/A'}
        </Text>
        <Text style={{ color: 'red' }}>
          Total Deaths: {item.deaths.total || 'N/A'}
        </Text>
        <Text style={styles.cardItem}>
          Total Tests: {item.tests.total || 'N/A'}
        </Text>

        {/* More button */}
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => handleMoreButtonPress(item)}
        >
          <Text style={styles.moreButtonText}>More...</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <View>
          <Text style={styles.welcome}>Welcome, {name}!</Text>
          <Text style={styles.subtitle}>
            Your trusted platform for health and safety updates.
          </Text>
        </View>
        <TouchableOpacity style={styles.notificationIconContainer}>
          <Image source={notificationIcon} style={{ tintColor: '#fff' }} />
        </TouchableOpacity>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={{ fontWeight: '500', fontSize: 20 }}>
          Global COVID-19 Updates
        </Text>
        <Text style={styles.description}>
          Stay updated with the latest COVID-19 statistics from around the
          world. Browse through various countries to view the total cases,
          deaths, and tests.
        </Text>
      </View>

      <View style={{ marginBottom: 15 }}>
        <SearchBar value={searchQuery} onChange={handleSearch} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#1A577C" />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderCard}
        />
      )}

      <View style={styles.floatingButtonContainer}>
        <View style={styles.floatingButton}>
          <Text style={styles.floatingButtonText}>{count}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  welcomeContainer: {
    backgroundColor: '#1D3B6C',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 35,
    paddingTop: 25,
    paddingHorizontal: 15,
  },
  welcome: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 0,
  },
  notificationIconContainer: {
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  descriptionContainer: {
    marginBottom: 20,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  description: {
    color: '#7F8C8D',
    fontSize: 14,
    textAlign: 'justify',
    marginTop: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    paddingHorizontal: 25,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1D3B6C',
  },
  cardItem: {
    color: '#2E2E2E',
  },
  moreButton: {
    backgroundColor: '#1D3B6C',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
    alignSelf:'flex-end'
  },
  moreButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 999,
  },
  floatingButton: {
    backgroundColor: '#1ABC9C',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  floatingButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Home;
