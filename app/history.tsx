// app/history.tsx
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type HistoryItem = {
  id: string;
  tanggal: string;
  total: number;
  status: 'LUNAS' | 'PENDING';
};

export default function HistoryScreen() {
  const router = useRouter();

  const items: HistoryItem[] = useMemo(
    () => [
      { id: 'tx-001', tanggal: '2026-06-01', total: 1019000, status: 'LUNAS' },
      { id: 'tx-002', tanggal: '2026-06-12', total: 599000, status: 'LUNAS' },
    ],
    []
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        RIWAYAT <Text style={{ color: '#8B5CF6' }}>TRANSAKSI</Text>
      </Text>

      <View style={styles.list}>
        {items.map(item => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardRow}>
              <Text style={styles.cardId}>{item.id.toUpperCase()}</Text>
              <Text style={[styles.cardStatus, { color: item.status === 'LUNAS' ? '#16A34A' : '#F59E0B' }]}>
                {item.status}
              </Text>
            </View>
            <Text style={styles.cardDate}>Tanggal: {item.tanggal}</Text>
            <Text style={styles.cardTotal}>Total: Rp {item.total.toLocaleString('id-ID')}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.homeBtn} onPress={() => router.replace('/')}>
        <Text style={styles.homeBtnText}>KEMBALI KE HOME</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0C10',
    padding: 24,
    paddingTop: 56,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C5C6C7',
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  card: {
    backgroundColor: '#1F2833',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#223041',
    marginBottom: 14,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardId: {
    color: '#C5C6C7',
    fontWeight: 'bold',
  },
  cardStatus: {
    fontWeight: 'bold',
  },
  cardDate: {
    color: '#C5C6C7',
    marginBottom: 8,
    fontSize: 13,
  },
  cardTotal: {
    color: '#00FFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  homeBtn: {
    backgroundColor: '#8B5CF6',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  homeBtnText: {
    color: '#0B0C10',
    fontWeight: 'bold',
  },
});

