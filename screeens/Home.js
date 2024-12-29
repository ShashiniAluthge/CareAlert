import React, {useState, useEffect, useContext} from 'react';
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
import {CountContext} from '../context/CountContext';
import SearchBar from '../components/SearchBar';
import notificationIcon from '../images/notification.png';

import covid1 from '../images/cardImages/covid1.jpg';
import covid2 from '../images/cardImages/covid2.jpg';
import covid3 from '../images/cardImages/covid3.jpg';
import covid4 from '../images/cardImages/covid4.jpg';
import covid5 from '../images/cardImages/covid5.jpg';
import covid6 from '../images/cardImages/covid6.jpg';
import covid7 from '../images/cardImages/covid7.jpg';
import covid8 from '../images/cardImages/covid8.jpg';
import covid9 from '../images/cardImages/covid9.jpg';
import covid10 from '../images/cardImages/covid10.jpg';
import covid11 from '../images/cardImages/covid11.jpg';
import covid12 from '../images/cardImages/covid12.jpg';
import covid13 from '../images/cardImages/covid13.jpg';
import covid14 from '../images/cardImages/covid14.jpg';
import covid15 from '../images/cardImages/covid15.jpg';
import covid16 from '../images/cardImages/covid16.jpg';
import covid17 from '../images/cardImages/covid17.jpg';
import covid18 from '../images/cardImages/covid18.jpg';
import covid19 from '../images/cardImages/covid19.jpg';
import covid20 from '../images/cardImages/covid20.jpg';

const Home = ({route}) => {
  const {name} = route.params;
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const {count, setCount} = useContext(CountContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://covid-193.p.rapidapi.com/statistics',
          {
            headers: {
              'X-Rapidapi-Key':
                '6310bd4c1dmshb71acfd1972974ap1a6af8jsne5e250f9e962',
              'X-Rapidapi-Host': 'covid-193.p.rapidapi.com',
            },
          },
        );
        const topCountries = response.data.response.map((item, index) => ({
          ...item,
          image: images[index % images.length],
        }));
        setData(topCountries);
        setFilteredData(topCountries);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const images = [
    covid1,
    covid2,
    covid3,
    covid4,
    covid5,
    covid6,
    covid7,
    covid8,
    covid9,
    covid10,
    covid11,
    covid12,
    covid13,
    covid14,
    covid15,
    covid16,
    covid17,
    covid18,
    covid19,
    covid20,
  ];

  const handleSearch = query => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item =>
        item.country.toLowerCase().startsWith(query.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  };

  const renderCard = ({item}) => {
    return (
      <View style={{paddingHorizontal: 15}}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => setCount(count + 1)}>
          <Image source={item.image} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{item.country}</Text>
          <Text style={styles.cardItem}>
            Total Cases: {item.cases.total || 'N/A'}
          </Text>
          <Text style={{color: 'red'}}>
            Total Deaths: {item.deaths.total || 'N/A'}
          </Text>
          <Text style={styles.cardItem}>
            Total Tests: {item.tests.total || 'N/A'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
     <View style={styles.welcomeContainer}>
  <View>
    <Text style={styles.welcome}>Welcome, {name} !</Text>
    <Text style={styles.subtitle}>
      Your trusted platform for health and safety updates.
    </Text>
  </View>
  <TouchableOpacity style={styles.notificationIconContainer}>
    <Image source={notificationIcon} style={{tintColor: '#fff'}} />
  </TouchableOpacity>
</View>


      <View style={styles.descriptionContainer}>
        <Text style={{fontWeight: '500', fontSize: 20}}>
          Global COVID-19 Updates
        </Text>
        <Text style={styles.description}>
          Stay updated with the latest COVID-19 statistics from around the
          world. Browse through various countries to view the total cases,
          deaths, and tests.
        </Text>
      </View>

      <View style={{marginBottom: 15}}>
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
    shadowOffset: {width: 0, height: 2},
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
  cardButton: {
    backgroundColor: '#16A085',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  cardButtonText: {
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
    shadowOffset: {width: 0, height: 2},
    elevation: 5,
  },
  floatingButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Home;
