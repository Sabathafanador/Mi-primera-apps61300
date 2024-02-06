import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const App = () => {
  const [text, setText] = useState('');
  const [data, setData] = useState([]);

  const addItem = () => {
    if (text.trim() !== '') {
      setData([...data, { id: Math.random().toString(), text: text, completed: false }]);
      setText('');
    }
  };

  const deleteItem = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  const toggleCompleted = (id) => {
    setData(data.map(item => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    }));
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => toggleCompleted(item.id)}>
        <Text style={[styles.itemText, { textDecorationLine: item.completed ? 'line-through' : 'none' }]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteItem(item.id)}>
        <Text style={styles.deleteButton}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
        placeholder="Hola Coder"
        onSubmitEditing={addItem}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
  },
  deleteButton: {
    color: 'red',
  },
});

export default App;
