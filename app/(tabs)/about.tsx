// app/(tabs)/about.tsx
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        ABOUT <Text style={{ color: '#FFD700' }}>BAMS STORE</Text>
      </Text>

      <View style={styles.card}>
        <View style={styles.badgeRow}>
          <Ionicons name="shield-checkmark-outline" size={14} color="#00FFFF" />
          <Text style={styles.badge}>Trusted by gamer community</Text>
        </View>
        <View style={styles.sectionRow}>
          <MaterialCommunityIcons name="account-group-outline" size={16} color="#00FFFF" />
          <Text style={styles.sectionTitle}>SIAPA KAMI</Text>
        </View>
        <Text style={styles.cardText}>
          BamsStore adalah aplikasi toko game yang dibuat untuk pengguna yang ingin berbelanja
          dengan cepat, jelas, dan tanpa proses yang bertele-tele. Setiap halaman disusun agar
          mudah dipahami sejak pertama kali dibuka, sehingga pengguna bisa langsung mencari game,
          melihat detail, lalu melanjutkan ke checkout dengan nyaman.
        </Text>

        <View style={styles.sectionRow}>
          <Ionicons name="sparkles-outline" size={16} color="#00FFFF" />
          <Text style={styles.sectionTitle}>KENAPA TERASA TEWEPERCAYA</Text>
        </View>
        <Text style={styles.cardText}>
          Banyak pengguna memilih BamsStore karena tampilannya konsisten, navigasinya sederhana,
          dan informasi penting selalu dibuat terlihat jelas. Harga, keranjang, riwayat transaksi,
          hingga status akun disusun agar pengalaman terasa aman, rapi, dan profesional.
        </Text>

        <View style={styles.sectionRow}>
          <MaterialCommunityIcons name="gamepad-variant-outline" size={16} color="#00FFFF" />
          <Text style={styles.sectionTitle}>FITUR UTAMA</Text>
        </View>
        <Text style={styles.bullet}>• Browse game dengan tampilan yang rapi dan mudah dijelajahi</Text>
        <Text style={styles.bullet}>• Tambah ke keranjang dengan kontrol jumlah yang praktis</Text>
        <Text style={styles.bullet}>• Checkout cepat dengan ringkasan total yang jelas</Text>
        <Text style={styles.bullet}>• Status akun dan riwayat transaksi yang mudah dipantau</Text>

        <View style={styles.sectionRow}>
          <Ionicons name="checkmark-done-outline" size={16} color="#00FFFF" />
          <Text style={styles.sectionTitle}>KOMITMEN BAMS STORE</Text>
        </View>
        <Text style={styles.bullet}>• Menjaga pengalaman belanja tetap cepat dan efisien</Text>
        <Text style={styles.bullet}>• Menampilkan informasi dengan bahasa yang sederhana dan mudah dipahami</Text>
        <Text style={styles.bullet}>• Memberikan alur transaksi yang jelas dari awal sampai selesai</Text>
        <Text style={styles.bullet}>• Terus dikembangkan agar makin nyaman dipakai oleh komunitas gamer</Text>

        <Text style={styles.quote}>
          BamsStore dibangun untuk menjadi tempat belanja game yang terasa modern, tepercaya,
          dan nyaman digunakan oleh pemain kasual maupun yang sudah terbiasa belanja digital.
        </Text>
      </View>

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
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#1F2833',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#223041',
  },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
  badge: {
    color: '#00FFFF',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  sectionRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4, marginBottom: 8 },
  cardText: {
    color: '#C5C6C7',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#00FFFF',
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 4,
  },
  bullet: {
    color: '#C5C6C7',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 6,
  },
  quote: {
    color: '#FFD700',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 10,
    fontStyle: 'italic',
  },
});

