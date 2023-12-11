import React, { useCallback, useState, useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import PalettePreview from '../components/palettePreview';

// const RAINBOW = [
//   { colorName: 'Red', hexCode: '#FF0000' },
//   { colorName: 'Orange', hexCode: '#FF7F00' },
//   { colorName: 'Yellow', hexCode: '#FFFF00' },
//   { colorName: 'Green', hexCode: '#00FF00' },
//   { colorName: 'Violet', hexCode: '#8B00FF' },
// ];

// const COLOR_PALETTES = [
//   { paletteName: 'Solarized', colors: SOLARIZED },
//   { paletteName: 'Frontend Masters', colors: FRONTEND_MASTERS },
//   { paletteName: 'Rainbow', colors: RAINBOW },
// ];

const Home = ({ navigation, route }) => {
  const newColorPalette = route.params
    ? route.params.newColorPalette
    : undefined;
  const [palettes, setPallets] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchPalettes = useCallback(async () => {
    const result = await fetch(
      'https://color-palette-api.kadikraman.now.sh/palettes',
    );
    const palettes = await result.json();

    if (result.ok) {
      setPallets(palettes);
    }
  });

  useEffect(() => {
    if (newColorPalette) {
      setPallets((palettes) => [newColorPalette, ...palettes]);
    }
  }, [newColorPalette]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchPalettes();
    // set timeout just to see the refreshing experience
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, [isRefreshing]);

  useEffect(() => {
    // cannot do async requests here so do it in a callback
    fetchPalettes();
  }, []);

  return (
    <FlatList
      data={palettes}
      keyExtractor={(item) => item.paletteName}
      style={styles.list}
      renderItem={({ item }) => (
        <PalettePreview
          palette={item}
          handlePress={() => {
            navigation.navigate('ColorPalette', item);
          }}
        />
      )}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      ListHeaderComponent={
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ColorPaletteModal');
          }}
        >
          <Text style={styles.modal}>Add a color scheme</Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: 'white',
  },
  modal: {
    fontSize: 18,
    color: 'teal',
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Home;
