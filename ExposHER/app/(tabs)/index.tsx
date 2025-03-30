import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Modal, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const categories = [
  { name: 'Science', icon: 'flask', color: '#FFB6C1' },
  { name: 'Construction', icon: 'wrench', color: '#6B8E23' },
  { name: 'Business', icon: 'briefcase', color: '#F2C700' },
  { name: 'Engineering', icon: 'cogs', color: '#5DADE2' },
  { name: 'Culinary', icon: 'cutlery', color: '#F9A800' },
  { name: 'Law', icon: 'gavel', color: '#C8A2D4' },
  { name: 'Arts', icon: 'paint-brush', color: '#EC7063' },
  { name: 'Animals & Plants', icons: ['paw', 'pagelines'], color: '#A3C4D3' },
  { name: 'Health Care', icon: 'medkit', color: '#66E1D3' },
  { name: 'Education', icon: 'book', color: '#D3B0A6' }
];

const jobs = [
  { name: 'Mei, Blockchain Developer', image: require('../../assets/images/bcdev.png'), description: 'Develop cutting-edge technologies that power secure and decentralized networks for the future.' },
  { name: 'Amara, Zoo Keeper', image: require('../../assets/images/zoo.png'), description: 'Care for animals and educate the public about wildlife.' },
  { name: 'Zara, Judge', image: require('../../assets/images/judge.png'), description: 'Preside over court cases, ensuring justice is served and the law is upheld for all.' },
  { name: 'Sofia, Civil Engineer', image: require('../../assets/images/cive.png'), description: 'Design and build the infrastructure that keeps societies running.' },
  { name: 'Hana, Chemist', image: require('../../assets/images/chemist.png'), description: 'Use science to create solutions in industries like pharmaceuticals, food, and manufacturing.' },
  { name: 'Aisha, Planner', image: require('../../assets/images/planner.png'), description: 'Create detailed plans that shape cities, neighborhoods, and projects to improve quality of life.' },
  { name: 'Priya, Marketer', image: require('../../assets/images/marketer.png'), description: 'Craft compelling strategies to connect brands with their audience, driving engagement and growth.' },
];

export default function MainPage() {
  const [modalVisible, setModalVisible] = useState(true);
  const [jobModalVisible, setJobModalVisible] = useState(false);

  const closePopup = () => {
    setModalVisible(false);
  };

  const openJobModal = () => {
    setJobModalVisible(true);
  };

  const closeJobModal = () => {
    setJobModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Popup Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closePopup}>
              <Text style={styles.closeText}>x</Text>
            </TouchableOpacity>
            <Image source={require('../../assets/images/carpenter.png')} style={styles.modalImage} />
            <Text style={styles.modalTitle}>Hi! I'm Maya</Text>
            <Text style={styles.modalText}>
              I work as a Carpenter. I always loved spending time with my dad in his workshop. The smell of sawdust, the rhythmic thud of the hammer, the way he could transform a pile of wood into something beautiful…
              {'\n\n'}
              One day, he took me to a construction site. I was amazed by the towering buildings and the intricate woodwork. I asked him, "Can girls be carpenters?" He just smiled and said, "Of course, Maya! It's a job for anyone with skill and determination."
              {'\n\n'}
              That's when I knew. I took woodworking classes in high school, then went to trade school. Now, I'm a carpenter myself. I love the challenge, the creativity, and the satisfaction of building something with my own hands.
              {'\n\n'}
              I often talk to young girls about my job. I tell them, "Don't let anyone tell you what you can't do. If you dream of building things, go for it!"
            </Text>
          </View>
        </View>
      </Modal>

      {/* Jobs Modal */}
      <Modal visible={jobModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closeJobModal}>
              <Text style={styles.closeText}>x</Text>
            </TouchableOpacity>
            <View style={styles.modalBox}></View>
            <FlatList
              data={jobs}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <View style={styles.jobList}>
                  <View style={styles.jobItem}>
                    <Image source={item.image} style={styles.jobImage} />
                    <View style={styles.jobTextContainer}>
                      <Text style={styles.jobTitle}>{item.name}</Text>
                      <Text style={styles.jobDescription}>{item.description}</Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Top Bar */}
      <View style={styles.topBar}>
        <Icon name="star" size={40} color="#FFD700" style={styles.icon} onPress={openJobModal} />
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
  modalBox: {
    backgroundColor: '#b1cf86',
    height: 30,
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

  /* Modal styles */
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '89%',
    backgroundColor: '#A8D08D',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  closeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    lineHeight: 20,
  },

  /* Jobs Modal styles */
  jobItem: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
    backgroundColor: 'white',
    width: 300,
    height: 70,
    borderRadius: 10,
  },
  jobImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    marginLeft: 10,
  },
  jobTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  jobDescription: {
    fontSize: 12,
    color: '#666',
  },
});
