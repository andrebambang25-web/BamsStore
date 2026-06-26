// app/(tabs)/explore.tsx
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Game {
  id: string;
  judul: string;
  genre: string;
}

const SEMUA_GAME: Game[] = [
  { id: '1', judul: 'Elden Ring: Shadow of the Erdtree', genre: 'RPG / Action' },
  { id: '2', judul: 'Cyberpunk 2077: Phantom Liberty', genre: 'FPS / RPG' },
  { id: '3', judul: 'Grand Theft Auto V: Premium Edition', genre: 'Open World' },
  { id: '4', judul: 'Resident Evil 4 Remake', genre: 'Horror / Action' },
];

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleDetailPress = (judul: string) => {
    Alert.alert('Detail Game', `Fitur detail untuk ${judul} akan ditambahkan berikutnya.`);
  };

  // Logika memfilter game berdasarkan input pencarian
  const filteredGames = SEMUA_GAME.filter(game =>
    game.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <MaterialCommunityIcons name="compass-outline" size={22} color="#00FFFF" />
        <Text style={styles.title}>EXPLORE <Text style={{ color: '#00FFFF' }}>GAMES</Text></Text>
      </View>
      
      {/* Kolom Pencarian */}
      <View style={styles.searchBarWrap}>
        <Ionicons name="search" size={16} color="#64748B" />
        <TextInput
          style={styles.searchBar}
          placeholder="Cari game atau genre..."
          placeholderTextColor="#64748B"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Hasil Pencarian */}
      <FlatList
        data={filteredGames}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.gameTitle}>{item.judul}</Text>
              <Text style={styles.gameGenre}>{item.genre}</Text>
            </View>
            <TouchableOpacity style={styles.btnDetail} onPress={() => handleDetailPress(item.judul)}>
              <View style={styles.buttonContent}>
                <Ionicons name="information-circle-outline" size={14} color="#0B0C10" />
                <Text style={styles.btnText}>Detail</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Game tidak ditemukan...</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0C10', padding: 24, paddingTop: 48 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#C5C6C7' },
  searchBarWrap: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#1F2833', borderRadius: 8, marginBottom: 20, borderWidth: 1, borderColor: '#00FFFF', paddingHorizontal: 12 },
  searchBar: { flex: 1, color: '#C5C6C7', paddingVertical: 12, fontSize: 16 },
  card: { backgroundColor: '#1F2833', padding: 16, borderRadius: 8, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  gameTitle: { color: '#C5C6C7', fontSize: 16, fontWeight: 'bold' },
  gameGenre: { color: '#64748B', fontSize: 12, marginTop: 4 },
  btnDetail: { backgroundColor: '#00FFFF', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 4 },
  btnText: { color: '#0B0C10', fontWeight: 'bold', fontSize: 12 },
  buttonContent: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  emptyText: { color: '#64748B', textAlign: 'center', marginTop: 24 }
});