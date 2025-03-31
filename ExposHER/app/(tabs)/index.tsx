import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Modal, Image, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { GoogleGenAI } from "@google/genai";

const categories = [
  { name: 'Science', icon: 'flask', color: '#FFB6C1' },
  { name: 'Trades', icon: 'wrench', color: '#6B8E23' },
  { name: 'Business', icon: 'briefcase', color: '#F2C700' },
  { name: 'Engineering', icon: 'cogs', color: '#5DADE2' },
  { name: 'Culinary', icon: 'utensils', color: '#F9A800' },
  { name: 'Law', icon: 'gavel', color: '#C8A2D4' },
  { name: 'Arts', icon: 'paint-brush', color: '#EC7063' },
  { name: 'Animals & Plants', icons: ['paw', 'pagelines'], color: '#A3C4D3' },
  { name: 'Health Care', icon: 'medkit', color: '#66E1D3' },
  { name: 'Education', icon: 'book', color: '#D3B0A6' }
];

const jobs = [
  { name: 'Mei, Blockchain Developer', image: require('../../assets/images/bcdev.png'), description: 'Develop cutting-edge technologies that power secure and decentralized networks for the future.', icon: 'flask' },
  { name: 'Amara, Zoo Keeper', image: require('../../assets/images/zoo.png'), description: 'Care for animals and educate the public about wildlife.', icon: 'paw' },
  { name: 'Zara, Judge', image: require('../../assets/images/judge.png'), description: 'Preside over court cases, ensuring justice is served and the law is upheld for all.', icon: 'gavel' },
  { name: 'Sofia, Civil Engineer', image: require('../../assets/images/cive.png'), description: 'Design and build the infrastructure that keeps societies running.', icon: 'cogs' },
  { name: 'Hana, Chemist', image: require('../../assets/images/chemist.png'), description: 'Use science to create solutions in industries like pharmaceuticals, food, and manufacturing.', icon: 'flask' },
  { name: 'Aisha, Planner', image: require('../../assets/images/planner.png'), description: 'Create detailed plans that shape cities, neighborhoods, and projects to improve quality of life.', icon: 'cogs' },
  { name: 'Priya, Marketer', image: require('../../assets/images/marketer.png'), description: 'Craft compelling strategies to connect brands with their audience, driving engagement and growth.', icon: 'briefcase' },
];

const scienceJobs = [
  { name: 'Mathematician', icon: 'calculator', description: 'Apply mathematical theories and techniques to solve problems in various industries, including finance, engineering, and research.' },
  { name: 'Chemist', icon: 'flask', description: 'Study the composition, properties, and reactions of substances to develop new products or improve existing ones.' },
  { name: 'Biochemist', icon: 'flask', description: 'Explore the chemical processes within living organisms to improve health, develop pharmaceuticals, or advance medical technologies.' },
  { name: 'Zoologist', icon: 'paw', description: 'Study animals and their ecosystems to understand behaviors, species conservation, and biological functions.' },
  { name: 'Veterinarian', icon: 'stethoscope', description: 'Diagnose and treat diseases, injuries, and health problems in animals, from pets to livestock.' },
  { name: 'Software Developer', icon: 'laptop', description: 'Design, create, and maintain software applications to solve specific problems or meet the needs of users.' },
  { name: 'Firmware Developer', icon: 'microchip', description: 'Write low-level code for embedded systems in hardware devices, ensuring proper functionality of electronic products.' },
  { name: 'Robotics Engineer', icon: 'cogs', description: 'Design, build, and maintain robots or automated systems for manufacturing, healthcare, or exploration.' },
  { name: 'Environmental Scientist', icon: 'leaf', description: 'Study environmental problems like pollution or climate change and develop solutions to mitigate these issues.' },
  { name: 'Geneticist', icon: 'dna', description: 'Study genes, heredity, and genetic variations to understand and treat genetic disorders or develop genetically modified organisms.' },
  { name: 'Neuroscientist', icon: 'brain', description: 'Explore the brain and nervous system to better understand neurological disorders, cognition, and behavior.' },
  { name: 'Astrophysicist', icon: 'star', description: 'Investigate the universe, from stars to galaxies, and develop theories about space, time, and the nature of the cosmos.' },
  { name: 'Pharmacologist', icon: 'medkit', description: 'Study the effects of drugs on living organisms to develop new medications and improve existing treatments.' },
  { name: 'Marine Biologist', icon: 'fish', description: 'Study ocean ecosystems, marine life, and the impact of human activities on the oceans and coastal regions.' },
  { name: 'Forensic Scientist', icon: 'search', description: 'Apply science to criminal investigations by analyzing physical evidence like DNA, fingerprints, and other trace materials.' },
  { name: 'Epidemiologist', icon: 'heartbeat', description: 'Study patterns of diseases in populations and work on public health solutions to prevent the spread of diseases.' },
  { name: 'Agricultural Scientist', icon: 'pagelines', description: 'Work on improving farming methods, crops, and livestock to increase food production and sustainability.' },
  { name: 'Quantum Computing Researcher', icon: 'superpowers', description: 'Work in cutting-edge technologies that utilize quantum mechanics.' },
  { name: 'Chemical Engineer', icon: 'industry', description: 'Apply chemistry and engineering principles to solve problems related to the production and use of chemicals, materials, and energy.' },
  { name: 'Data Scientist', icon: 'chart-line', description: 'Use scientific methods, algorithms, and data analysis to extract insights from large datasets to inform decision-making and predictive modeling.' }
];

export default function MainPage() {
  const [modalVisible, setModalVisible] = useState(true);
  const [jobModalVisible, setJobModalVisible] = useState(false);
  const [scienceModalVisible, setScienceModalVisible] = useState(false);
  const [qcModalVisible, setQcModalVisible] = useState(false);
  const [geminiModalVisible, setGeminiModalVisible] = useState(false);
  const [post, setPost] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialize Gemini AI (move your API key to environment variables in production)
  const ai = new GoogleGenAI({ apiKey: "AIzaSyAKWZTiwgZcfsQi7yK177wakblerVQR96c" });

  const closePopup = () => {
    setModalVisible(false);
  };

  const openJobModal = () => {
    setJobModalVisible(true);
  };

  const closeJobModal = () => {
    setJobModalVisible(false);
  };

  const openScienceModal = () => {
    setScienceModalVisible(true);
  };

  const closeScienceModal = () => {
    setScienceModalVisible(false);
  };

  const openQcModal = () => {
    setQcModalVisible(true);
  };

  const closeQcModal = () => {
    setQcModalVisible(false);
  };

  const openGeminiModal = () => {
    setGeminiModalVisible(true);
  };

  const closeGeminiModal = () => {
    setGeminiModalVisible(false);
  };

  const handlePostChange = (text) => {
    setPost(text);
  };

  const handlePostSubmit = () => {
    // Submit the post (for now just log it to the console lol)
    console.log('New Post:', post);
    setPost(''); // Clear the input field
  };

  const handleSubmit = async () => {
    const geminiInput = "I am a 12 year old girl that is interested in AI, ML, Blockchain, Baking, and Animals. Can you please create a roadmap/steps that I would have to take to learn about quantum computing and include projects that include my interest? Limit it to 6 sentences";

    try {
      setIsLoading(true);
      setError('');

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: geminiInput, // Use hardcoded input
      });

      setAiResponse(response.text);
    } catch (err) {
      console.error("Error generating content:", err);
      setError('Failed to get response from AI. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <View style={styles.container}>

      {/* Gemini Roadmap Modal */}
      <Modal visible={geminiModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.geminiModalContainer}>
            <TouchableOpacity
              style={[styles.geminiSubmitButton, (isLoading) && styles.geminiSubmitButtonDisabled]}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.geminiSubmitText}>Get AI Response</Text>
              )}
            </TouchableOpacity>

            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : aiResponse ? (
              <>
                <Text style={styles.responseHeader}>Gemini Response:</Text>
                <Text style={styles.responseText}>{aiResponse}</Text>
              </>
            ) : (
              <Text style={styles.placeholderText}>Your AI response will appear here...</Text>
            )}
          </View>
        </View>
      </Modal>


      {/* Popup Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closePopup}>
              <Text style={styles.closeText}>x</Text>
            </TouchableOpacity>
            <Image source={require('../../assets/images/carpenter.png')} style={styles.modalImage} />
            <Text style={styles.modalTitle}>Hi! I'm Maya   <Icon name="wrench" size={25} color="#6B8E23" style={styles.icon} /></Text>
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

      {/* Quantum Computing Post Modal */}
      <Modal visible={qcModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.qcModalContent}>
            <View style={styles.qcButtonContainer}>
              <TouchableOpacity 
                style={styles.qcCloseButton} 
                onPress={() => {
                  closeQcModal();
                  openScienceModal();
                }}
              >
                <Text style={styles.qcCloseText}>x</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.qcRoadmapButton}
                onPress={() => {
                  closeQcModal();
                  openGeminiModal();
                }}
              >
                <Text style={styles.qcRoadmapText}>roadmap</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.qcModalHeader}>
              <Text style={styles.qcTitle}>Quantum Computing</Text>
            </View>
            <TextInput
              style={styles.qcInput}
              placeholder="Write your post..."
              value={post}
              onChangeText={handlePostChange}
              multiline
            />
            <TouchableOpacity style={styles.qcPostSubmitButton} onPress={handlePostSubmit}>
              <Text style={styles.qcPostSubmitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Science Jobs Modal */}
      <Modal visible={scienceModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.scienceModalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closeScienceModal}>
              <Text style={styles.closeText}>x</Text>
            </TouchableOpacity>
            <View style={styles.scienceModalBox}></View>
            <FlatList
              data={scienceJobs}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    if (item.name === "Quantum Computing Researcher") {
                      closeScienceModal();
                      openQcModal();
                    }
                  }}
                >
                  <View style={styles.scienceJobItem}>
                    <Text style={styles.scienceJobImage}>
                      <Icon name={item.icon} size={25} color="#6B8E23" />
                    </Text>
                    <View style={styles.scienceJobTextContainer}>
                      <Text style={styles.scienceJobTitle}>{item.name}</Text>
                      <Text style={styles.scienceJobDescription}>{item.description}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal >

      {/* Jobs Modal */}
      < Modal visible={jobModalVisible} animationType="slide" transparent={true} >
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
                <View style={styles.jobItem}>
                  <Image source={item.image} style={styles.jobImage} />
                  <View style={styles.jobTextContainer}>
                    <Text style={styles.jobTitle}>{item.name} </Text>
                    <Text style={styles.jobDescription}>{item.description}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </Modal >

      {/* Top Bar */}
      < View style={styles.topBar} >
        <Icon name="star" size={40} color="#FFD700" style={styles.icon} onPress={openJobModal} />
        <TextInput
          style={styles.searchBar}
          placeholder="Search jobs..."
          placeholderTextColor="#666"
        />
      </View >

      {/* Job Categories */}
      < FlatList
        data={categories}
        numColumns={2}
        keyExtractor={(item) => item.name
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.categoryButton, { backgroundColor: item.color }]}
            onPress={() => {
              if (item.name === 'Science') {
                openScienceModal();  // Open Science Modal if category is 'Science'
              }
            }}
          >
            {item.icons ? (
              <View style={styles.iconContainer}>
                <Icon name={item.icons[0]} size={32} color="white" style={[styles.categoryIcon, { marginRight: 10 }]} />
                <Icon name={item.icons[1]} size={32} color="white" style={styles.categoryIcon} />
              </View>
            ) : (
              <Icon name={item.icon} size={40} color="white" style={styles.categoryIcon} />
            )}
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View >
  );
};

const styles = StyleSheet.create({
  geminiModalContainer: {
    width: '90%',
    height: '80%',
    backgroundColor: '#b1cf86',
    padding: 20,
    borderRadius: 10,
  },
  geminiSubmitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  geminiSubmitButtonDisabled: {
    opacity: 0.5,
  },
  geminiSubmitText: {
    color: 'white',
    fontWeight: 'bold',
  },
  responseHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  responseText: {
    backgroundColor: 'white',
    fontSize: 16,
    lineHeight: 24,
  },
  placeholderText: {
    backgroundColor: 'white',
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    backgroundColor: 'white',
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#b1cf86',
  },
  modalBox: {
    backgroundColor: '#b1cf86',
    height: 30,
  },
  scienceModalBox: {
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
  scienceModalContent: {
    width: '89%',
    height: '80%',
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
  qcButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  qcCloseButton: {
    marginRight: 20,
  },
  qcRoadmapButton: {
    // Additional styling can be added here if needed
  },
  qcRoadmapText:  {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textDecorationLine: 'underline',
  },
  qcCloseText: {
    fontSize: 30,
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
    width: 310,
    height: 70,
    borderRadius: 10,
  },
  scienceJobItem: {
    flexDirection: 'row',
    marginBottom: 13,
    alignItems: 'left',
    backgroundColor: 'white',
    width: 310,
    height: 100,
    borderRadius: 10,
  },
  jobImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    marginLeft: 10,
  },
  scienceJobImage: {
    width: 50,
    height: 50,
    alignItems: 'center',
    borderRadius: 25,
    marginLeft: 20,
    marginRight: -10,
    marginTop: 35,
  },
  jobTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  scienceJobTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scienceJobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 9,
  },
  jobDescription: {
    fontSize: 12,
    color: 'black',
  },
  scienceJobDescription: {
    fontSize: 12,
    color: 'black',
    marginLeft: 10,
    marginTop: 3,
  },
  qcModalContent: {
    width: '90%',
    height: '80%',
    backgroundColor: '#b1cf86',
    padding: 20,
    borderRadius: 10,
  },
  qcModalHeader: {
    marginBottom: 10
  },
  qcTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
  },
  qcInput: {
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20
  },
  qcPostSubmitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  qcPostSubmitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
});