import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

const SumValuesScreen = () => {
  const [valuesArray, setValuesArray] = useState<number[]>([]);
  const [savedCalculations, setSavedCalculations] = useState<{ values: number[]; total: number }[]>([]);
  const navigation = useNavigation();
  const [value, setValue] = useState('');

  useEffect(() => {
    const loadCalculations = async () => {
      try {
        const savedData = await SecureStore.getItemAsync('savedCalculations');
        if (savedData) {
          setSavedCalculations(JSON.parse(savedData));
        }
      } catch (error) {
        console.error('Failed to load calculations:', error);
      }
    };

    loadCalculations();
  }, []);

  const handleSaveCalculations = async () => {
    try {
      await SecureStore.setItemAsync('savedCalculations', JSON.stringify(savedCalculations));
    } catch (error) {
      console.error('Failed to save calculations:', error);
    }
  };

  const addValue = () => {
    if (value) {
      setValuesArray([...valuesArray, parseFloat(value)]);
      setValue('');
    }
  };

  const deleteValue = (index: number) => {
    const updatedArray = valuesArray.filter((_, i) => i !== index);
    setValuesArray(updatedArray);
  };

  const calculateTotal = () => {
    return valuesArray.reduce((acc, curr) => acc + curr, 0);
  };

  const saveCalculation = () => {
    if (valuesArray.length > 0) {
      const total = calculateTotal();
      const newCalculation = {
        values: [...valuesArray],
        total: total,
      }
      
      setSavedCalculations([...savedCalculations, newCalculation]);
      setValuesArray([]); // Reset current calculations
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <Input
        value={value}
        onChangeText={setValue}
        onAdd={addValue}
      />
      <ValuesList
        values={valuesArray}
        onDelete={deleteValue}
      />
      <Total total={calculateTotal()} />
      <Button title="Salvar" onPress={handleSaveCalculations} />
    </View>
  );
};

const Header = () => {
  return (
    <Text style={styles.header}>Calculadora Mercado</Text>
  );
};

const Input = ({ value, onChangeText, onAdd }: { value: string, onChangeText: (text: string) => void, onAdd: () => void }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Insira Valor"
        keyboardType="numeric"
        value={value}
        onChangeText={onChangeText}
      />
      <Button title="+" onPress={onAdd} />
    </View>
  );
};

const ValuesList = ({ values, onDelete }: { values: number[], onDelete: (index: number) => void }) => {
  return (
    <FlatList
      data={values}
      renderItem={({ item, index }) => (
        <View style={styles.listItem}>
          <Text style={styles.itemText}>{item}</Text>
          <TouchableOpacity onPress={() => onDelete(index)}>
            <Text style={styles.deleteButton}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const Total = ({ total }: { total: number }) => {
  return (
    <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    flex: 1,
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

export default SumValuesScreen;

