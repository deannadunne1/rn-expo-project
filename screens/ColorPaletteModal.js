import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { ALL_COLORS as COLORS } from '../assets/colors';

const AddNewPaletteModal = ({ navigation }) => {
  const [paletteName, setPaletteName] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);

  const handleSwitch = useCallback((value, selectedColor) => {
    if (value) {
      setSelectedColors((selectedColors) => [selectedColor, ...selectedColors]);
    } else {
      setSelectedColors((selectedColors) =>
        selectedColors.filter(
          (currentColor) => selectedColor.colorName !== currentColor.colorName,
        ),
      );
    }
  }, []);

  const handleSubmit = useCallback(() => {
    if (!paletteName) Alert.alert('Error: Please enter palette name');
    else if (selectedColors.length < 3)
      Alert.alert('Error: Please enter at least 3 colors');
    else {
      const newColorPalette = {
        paletteName,
        colors: selectedColors,
      };
      navigation.navigate('Home', { newColorPalette });
    }
  }, [paletteName, selectedColors]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Name of your color palette</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPaletteName}
        value={paletteName}
      />
      <FlatList
        data={COLORS}
        keyExtractor={(item) => item.colorName}
        style={styles.list}
        renderItem={({ item }) => {
          return (
            <View style={styles.colorBlock}>
              <Text>{item.colorName}</Text>
              <Switch
                style={styles.colorSwitch}
                onValueChange={(selected) => handleSwitch(selected, item)}
                value={
                  !!selectedColors.find(
                    (color) => color?.colorName === item.colorName,
                  )
                }
              />
            </View>
          );
        }}
      />
      <TouchableOpacity
        style={styles.submit}
        onPress={handleSubmit}
        underlayColor="#fff"
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  header: {
    marginVertical: 10,
  },
  input: {
    borderColor: 'gray',
    borderRadius: 4,
    borderWidth: 1,
    padding: 10,
    height: 40,
    marginBottom: 10,
  },
  colorBlock: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBlockColor: 'gray',
  },
  submit: {
    backgroundColor: 'teal',
    margin: 20,
    borderRadius: 4,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
});

export default AddNewPaletteModal;
