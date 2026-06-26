// app/payment-success.tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { clearCart } from '../lib/cart-store';

export default function PaymentSuccessScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const rawTotal = Array.isArray(params.total) ? params.total[0] : params.total;
  const totalBayar = rawTotal ? Number(rawTotal) : 0;

  useEffect(() => {
    // Memantul alert bawaan sistem saat halaman dimuat
    Alert.alert('Transaksi Sukses', 'Terima kasih telah berbelanja di BamsStore!');
    clearCart();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.invoiceBox}>
        <View style={styles.iconContainer}>
          <Text style={styles.successIcon}>✓</Text>
        </View>
        
        <Text style={styles.statusText}>PEMBAYARAN BERHASIL</Text>
        <Text style={styles.subText}>Invoice transaksi BamsStore</Text>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Total Pembayaran :</Text>
          <Text style={styles.value}>Rp {totalBayar.toLocaleString('id-ID')}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Metode :</Text>
          <Text style={styles.value}>Bams Wallet</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Status :</Text>
          <Text style={[styles.value, { color: '#16A34A' }]}>LUNAS</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.buttonText}>KEMBALI KE HOME</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0C10', justifyContent: 'center', padding: 24 },
  invoiceBox: { backgroundColor: '#1F2833', padding: 24, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: '#16A34A' },
  iconContainer: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#16A34A', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  successIcon: { color: '#0B0C10', fontSize: 32, fontWeight: 'bold' },
  statusText: { color: '#16A34A', fontSize: 20, fontWeight: 'bold' },
  subText: { color: '#C5C6C7', fontSize: 12, marginTop: 4 },
  divider: { height: 1, backgroundColor: '#0B0C10', width: '100%', marginVertical: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 12 },
  label: { color: '#C5C6C7', fontSize: 14 },
  value: { color: '#C5C6C7', fontSize: 14, fontWeight: 'bold' },
  button: { backgroundColor: '#16A34A', width: '100%', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 24 },
  buttonText: { color: '#0B0C10', fontWeight: 'bold', fontSize: 14 }
});