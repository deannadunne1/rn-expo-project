import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ColorBox = ({ name, color }) => {
  const boxColor = {
    backgroundColor: color,
  };

  const textColor = {
    color:
      parseInt(color.replace('#', ''), 16) > 0xffffff / 1.1 ? 'black' : 'white',
  };

  return (
    <View style={[styles.container, boxColor]}>
      <Text style={[styles.text, textColor]}>
        {name}: {color}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 10,
    borderRadius: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2, // does the above box shadow for android
  },
  text: {
    fontWeight: 'bold',
  },
});

export default ColorBox;
