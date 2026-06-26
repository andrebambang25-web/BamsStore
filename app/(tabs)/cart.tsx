// app/(tabs)/cart.tsx
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useSyncExternalStore } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { calculateCartTotal, getCartItems, subscribeCart, updateCartQuantity } from '../../lib/cart-store';

export default function CartScreen() {
  const router = useRouter();
  const cartItems = useSyncExternalStore(subscribeCart, getCartItems, getCartItems);

  const updateKuantitas = (id: string, tipe: 'tambah' | 'kurang') => {
    updateCartQuantity(id, tipe);
  };

  const hitungTotal = () => {
    return calculateCartTotal(cartItems);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Keranjang Kosong', 'Tambahkan game terlebih dahulu sebelum checkout.');
      return;
    }
    const totalBayar = hitungTotal();
    router.push({
      pathname: '/payment-success',
      params: { total: totalBayar.toString() }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Ionicons name="cart-outline" size={22} color="#10B981" />
        <Text style={styles.title}>KERANJANG <Text style={{ color: '#10B981' }}>BELANJA</Text></Text>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>Keranjang masih kosong...</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>{item.judul}</Text>
              <Text style={styles.itemPrice}>Rp {(item.harga * item.kuantitas).toLocaleString('id-ID')}</Text>
            </View>
            
            <View style={styles.qtyContainer}>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => updateKuantitas(item.id, 'kurang')}>
                <Ionicons name="remove" size={14} color="#10B981" />
              </TouchableOpacity>
              <Text style={styles.qtyText}>{item.kuantitas}</Text>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => updateKuantitas(item.id, 'tambah')}>
                <Ionicons name="add" size={14} color="#10B981" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Footer Total */}
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>TOTAL BAYAR:</Text>
          <Text style={styles.totalValue}>Rp {hitungTotal().toLocaleString('id-ID')}</Text>
        </View>

        <TouchableOpacity style={styles.historyBtn} onPress={() => router.push('/history')}>
          <View style={styles.buttonContent}>
            <MaterialCommunityIcons name="history" size={16} color="#C5C6C7" />
            <Text style={styles.historyBtnText}>Lihat Riwayat Transaksi</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
          <View style={styles.buttonContent}>
            <Ionicons name="shield-checkmark-outline" size={16} color="#0B0C10" />
            <Text style={styles.checkoutBtnText}>BAYAR SEKARANG</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0C10', padding: 24, paddingTop: 48 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 24 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#C5C6C7' },
  card: { backgroundColor: '#1F2833', padding: 16, borderRadius: 8, marginBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemTitle: { color: '#C5C6C7', fontSize: 14, fontWeight: 'bold' },
  itemPrice: { color: '#10B981', fontSize: 14, marginTop: 4 },
  qtyContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#0B0C10', borderRadius: 6, padding: 4 },
  qtyBtn: { width: 28, height: 28, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1F2833', borderRadius: 4 },
  qtyBtnText: { color: '#10B981', fontSize: 16, fontWeight: 'bold' },
  qtyText: { color: '#C5C6C7', marginHorizontal: 12, fontWeight: 'bold' },
  footer: { borderTopWidth: 2, borderTopColor: '#1F2833', paddingTop: 16, marginTop: 12 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, alignItems: 'center' },
  totalLabel: { color: '#C5C6C7', fontWeight: 'bold', fontSize: 14 },
  totalValue: { color: '#10B981', fontWeight: 'bold', fontSize: 20 },
  historyBtn: { borderWidth: 1, borderColor: '#C5C6C7', borderStyle: 'dashed', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  historyBtnText: { color: '#C5C6C7', fontWeight: 'bold' },
  checkoutBtn: { backgroundColor: '#10B981', padding: 16, borderRadius: 8, alignItems: 'center' },
  checkoutBtnText: { color: '#0B0C10', fontWeight: 'bold', fontSize: 16 },
  buttonContent: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  emptyText: { color: '#64748B', textAlign: 'center', marginTop: 12, marginBottom: 12 }
});