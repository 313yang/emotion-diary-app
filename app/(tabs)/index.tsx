import React, { useState } from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet } from 'react-native';
import EmojiSelector from 'react-native-emoji-selector';

interface diaryType {
  id: string;
  text: string;
}
const EmojiDiaryApp = () => {
  const [selectedEmojis, setSelectedEmojis] = useState('');
  const [diaryEntries, setDiaryEntries] = useState<diaryType[]>([]);

  const addEntry = () => {
    if (selectedEmojis.trim() === '' || selectedEmojis.length > 10) {
      Alert.alert('Error', '이모지는 최소 1자에서 최대 10자까지 입력할 수 있어요.');
      return;
    }

    setDiaryEntries([...diaryEntries, { id: Date.now().toString(), text: selectedEmojis }]);
    setSelectedEmojis(''); // 선택한 이모지 초기화
  };

  const renderItem = ({ item }: { item: diaryType; }) => (
    <View style={styles.entry}>
      <Text style={styles.emojiText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.selectedEmojisContainer}>
        <Text style={styles.selectedEmojis}>{selectedEmojis}</Text>
      </View>
      <EmojiSelector
        onEmojiSelected={(emoji) => {
          if (selectedEmojis.length < 10) {
            setSelectedEmojis((prev) => prev + emoji);
          }
        }}
        showSearchBar={false} // 검색 바 숨기기
      />
      <Button title="저장하기" onPress={addEntry} />
      <FlatList
        data={diaryEntries}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  selectedEmojisContainer: {
    marginBottom: 10,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  selectedEmojis: {
    fontSize: 30,
  },
  entry: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  emojiText: {
    fontSize: 30,
  },
});

export default EmojiDiaryApp;
