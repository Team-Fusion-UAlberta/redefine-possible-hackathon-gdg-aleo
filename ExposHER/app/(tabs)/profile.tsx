import React, { useState } from 'react';
import { View, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Text, ScrollView, ActivityIndicator } from 'react-native';
import { GoogleGenAI } from "@google/genai";

const GreenInputScreen = () => {
  const [inputText, setInputText] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialize Gemini AI (move your API key to environment variables in production)
  const ai = new GoogleGenAI({ apiKey: "apikey" });

  const handleSubmit = async () => {
    if (!inputText.trim()) return;
    
    try {
      setIsLoading(true);
      setError('');
      
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: inputText,
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
    <SafeAreaView style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Ask Gemini anything..."
          placeholderTextColor="#ccc"
          value={inputText}
          onChangeText={setInputText}
          editable={!isLoading}
        />
        <TouchableOpacity 
          style={[styles.submitButton, (!inputText.trim() || isLoading) && styles.submitButtonDisabled]} 
          onPress={handleSubmit}
          disabled={!inputText.trim() || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.submitText}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.responseContainer}>
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
  },
  responseContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginTop: 5,
  },
  responseHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  responseText: {
    fontSize: 16,
    lineHeight: 24,
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default GreenInputScreen;