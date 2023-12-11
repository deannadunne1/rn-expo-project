import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ColorBox from '../components/colorBox';

const ColorPalette = ({ route }) => {
  const { colors } = route.params;

  return (
    <View style={styles.container}>
      <FlatList
        data={colors}
        keyExtractor={(item) => item.colorName}
        renderItem={({ item }) => (
          <ColorBox name={item.colorName} color={item.hexCode} />
        )}
        // ListHeaderComponent={<Text style={styles.header}>{paletteName}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
  header: {
    fontWeight: 'bold',
    marginTop: 40,
    fontSize: 18,
  },
});

export default ColorPalette;
