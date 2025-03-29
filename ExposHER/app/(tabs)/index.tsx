import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const categories = [
  { name: 'Science', icon: 'flask', color: '#FFB6C1' },
  { name: 'Construction', icon: 'wrench', color: '#A1C99A' },
  { name: 'Business', icon: 'briefcase', color: '#F2C700' },
  { name: 'Engineering', icon: 'cogs', color: '#5DADE2' },
  { name: 'Culinary', icon: 'cutlery', color: '#F9A800' },
  { name: 'Law', icon: 'gavel', color: '#C8A2D4' },
  { name: 'Arts', icon: 'paint-brush', color: '#EC7063' },
  { name: 'Animals & Plants', icons: ['paw', 'pagelines'], color: '#A3C4D3' },
  { name: 'Health Care', icon: 'medkit', color: '#66E1D3' },
  { name: 'Education', icon: 'book', color: '#D3B0A6' }
];

export default function MainPage() {
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Icon name="star" size={40} color="#FFD700" style={styles.icon} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search jobs..."
          placeholderTextColor="#666"
        />
      </View>

      {/* Job Categories */}
      <FlatList
        data={categories}
        numColumns={2}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.categoryButton, { backgroundColor: item.color }]}>
            {item.icons ? (
              // Render multiple icons side by side for Animals & Plants
              <View style={styles.iconContainer}>
                <Icon name={item.icons[0]} size={32} color="white" style={[styles.categoryIcon, { marginRight: 10 }]} />
                <Icon name={item.icons[1]} size={32} color="white" style={styles.categoryIcon} />
              </View>
            ) : (
              // Single icon for other categories
              <Icon name={item.icon} size={40} color="white" style={styles.categoryIcon} />
            )}
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#b1cf86',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 45,
  },
  icon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  categoryButton: {
    flex: 1,
    height: 117, // 117 is perfect plssss dont change
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    flexBasis: '48%',
    borderWidth: 1.5,  // Add border width
    borderColor: '#D3D3D3',  // Light grey color for border
  },
  categoryIcon: {
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
