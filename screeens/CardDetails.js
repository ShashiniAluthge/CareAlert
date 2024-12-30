import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

const CardDetails = ({route}) => {
  const {flag, country, continent, population, cases, deaths, tests} =
    route.params;

  return (
    <View style={styles.container}>
      {/* Static Header */}
      <View style={styles.header}>
        <Text style={styles.countryName}>{country}</Text>
      </View>
      
      {/* Static Content */}
      <View style={styles.staticContent}>
        <Image source={{uri: flag}} style={styles.cardImage} />
        <Text style={styles.topdetail}>
          Continent: <Text style={styles.value}>{continent || 'N/A'}</Text>
        </Text>
        <Text style={styles.topdetail}>
          Population: <Text style={styles.value}>{population || 'N/A'}</Text>
        </Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollable}>
        {/* Cases Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Cases</Text>
          <View style={styles.row}>
            <Text style={styles.detail}>Total Cases</Text>
            <Text style={styles.value}>{cases.total || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.detail}>New Cases</Text>
            <Text style={styles.value}>{cases.new || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.detail}>Active Cases</Text>
            <Text style={styles.value}>{cases.active || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.detail}>Recovered</Text>
            <Text style={styles.value}>{cases.recovered || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.detail}>Critical Cases</Text>
            <Text style={styles.value}>{cases.critical || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.detail}>Cases per 1M Population</Text>
            <Text style={styles.value}>{cases['1M_pop'] || 'N/A'}</Text>
          </View>
        </View>

        {/* Deaths Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Deaths</Text>
          <View style={styles.row}>
            <Text style={styles.detail}>Total Deaths</Text>
            <Text style={styles.value}>{deaths.total || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.detail}>New Deaths</Text>
            <Text style={styles.value}>{deaths.new || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.detail}>Deaths per 1M Population</Text>
            <Text style={styles.value}>{deaths['1M_pop'] || 'N/A'}</Text>
          </View>
        </View>

        {/* Tests Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Tests</Text>
          <View style={styles.row}>
            <Text style={styles.detail}>Total Tests</Text>
            <Text style={styles.value}>{tests.total || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.detail}>Tests per 1M Population</Text>
            <Text style={styles.value}>{tests['1M_pop'] || 'N/A'}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#1D3B6C',
    height: 80,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  countryName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
  staticContent: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 25,
  },
  detail: {
    fontSize: 15,
    color: '#1D3B6C',
    fontWeight: '500',
  },
  topdetail: {
    fontSize: 16,
    marginBottom: 5,
    color: '#1D3B6C',
    fontWeight: 'bold',
  },
  value: {
    color: '#7F8C8D',
    fontWeight: '400',
  },
  scrollable: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1ABC9C',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default CardDetails;
