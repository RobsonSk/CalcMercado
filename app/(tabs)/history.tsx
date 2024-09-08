import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const HistoryScreen = () => {
  interface Calculation {
    values: number[];
    total: number;
  }

  const savedCalculations: Calculation[] = [];

  // React.useEffect(() => {
  //   const loadSavedCalculations = async () => {
  //     const savedData = await SecureStore.getItemAsync('savedCalculations').catch((error) =>
  //       console.error(error));
  //     if (savedData) {
  //       setSavedCalculations(JSON.parse(savedData));
  //     }
  //   };
  //   loadSavedCalculations();
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Calculation History</Text>
      <FlatList
        data={savedCalculations}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.itemText}>Values: {item.values.join(', ')}</Text>
            <Text style={styles.totalText}>Total: {item.total}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#1a1a1a', // Dark theme background
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    color: '#ffffff', // White text color
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#333333',
    color: '#ffffff', // White text color
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#333333',
    borderRadius: 5,
  },
  itemText: {
    color: '#ffffff', // White text color
  },
  deleteButton: {
    color: '#ff4c4c', // Red color for delete button
  },
  totalText: {
    fontSize: 20,
    marginTop: 20,
    color: '#ffffff', // White text color
    textAlign: 'center',
  },
});

export default HistoryScreen;