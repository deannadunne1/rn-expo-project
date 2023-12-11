import React from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const PalettePreview = ({ palette, handlePress }) => {
  const { paletteName, colors } = palette;
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.paletteText}>{paletteName}</Text>
      <FlatList
        data={colors?.slice(0, 5)}
        keyExtractor={(color) => color.colorName}
        renderItem={({ item }) => {
          const boxColor = { backgroundColor: item.hexCode };
          return <View style={[styles.box, boxColor]} />;
        }}
        // horizontal
        style={styles.list}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  paletteText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  box: {
    height: 30,
    width: 30,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2, // does the above box shadow for android
  },
  list: {
    marginBottom: 20,
    flexDirection: 'row',
  },
});

export default PalettePreview;
