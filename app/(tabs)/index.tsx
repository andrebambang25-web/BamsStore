// app/(tabs)/index.tsx
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { clearActiveAccount, getActiveAccount, getRegisteredAccount, type AuthAccount } from '../../lib/auth-store';

export default function HomeScreen() {
  const router = useRouter();
  const [account, setAccount] = useState<AuthAccount | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loadAccount = useCallback(async () => {
    const activeAccount = await getActiveAccount();
    const storedAccount = activeAccount ?? (await getRegisteredAccount());

    setAccount(storedAccount);
    setIsLoggedIn(Boolean(activeAccount));
  }, []);

  useEffect(() => {
    loadAccount();
  }, [loadAccount]);

  useFocusEffect(
    useCallback(() => {
      loadAccount();
    }, [loadAccount])
  );

  const handleLogout = () => {
    Alert.alert('Konfirmasi Logout', 'Yakin ingin keluar dari sesi aktif?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await clearActiveAccount();
          setIsLoggedIn(false);
          setAccount(null);
          Alert.alert('Logout Berhasil', 'Kamu sudah keluar dari sesi aktif.');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <View style={styles.logoBadge}>
          <View style={styles.logoMark}>
            <Text style={styles.logoBams}>Bams</Text>
            <View style={styles.logoDivider} />
            <Text style={styles.logoStore}>Store</Text>
          </View>
          <Text style={styles.logoMini}>BS</Text>
        </View>
        <View style={styles.logoTextBlock}>
          <Text style={styles.logoTitle}>BamsStore</Text>
          <Text style={styles.logoSubtitle}>Game shop for modern players</Text>
        </View>
      </View>

      <Text style={styles.welcomeText}>
        Welcome Back, <Text style={styles.cyanText}>{account?.username ?? 'Gamer!'}</Text>
      </Text>

      <View style={styles.authCard}>
        <View style={styles.sectionHeader}>
          <Ionicons name="person-circle" size={18} color="#00FFFF" />
          <Text style={styles.authTitle}>STATUS AKUN</Text>
        </View>
        <Text style={styles.authStatus}>{isLoggedIn ? 'SEDANG LOGIN' : 'BELUM LOGIN'}</Text>
        <Text style={styles.authText}>
          {account
            ? `Tersimpan sebagai ${account.username} (${account.email})`
            : 'Belum ada akun tersimpan. Silakan daftar atau masuk terlebih dahulu.'}
        </Text>

        <View style={styles.authButtonRow}>
          <TouchableOpacity style={styles.authButtonPrimary} onPress={() => router.push('/register')}>
            <View style={styles.buttonContent}>
              <MaterialCommunityIcons name="account-plus" size={16} color="#0B0C10" />
            <Text style={styles.authButtonPrimaryText}>DAFTAR</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.authButtonSecondary} onPress={() => router.push('/login')}>
            <View style={styles.buttonContent}>
              <MaterialCommunityIcons name="login" size={16} color="#FFFFFF" />
            <Text style={styles.authButtonSecondaryText}>MASUK</Text>
            </View>
          </TouchableOpacity>
        </View>

        {isLoggedIn ? (
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <View style={styles.buttonContent}>
              <Ionicons name="log-out-outline" size={16} color="#EF4444" />
              <Text style={styles.logoutButtonText}>LOGOUT</Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
      
      {/* Banner Promo */}
      <View style={styles.bannerContainer}>
        <View style={styles.banner}>
          <MaterialCommunityIcons name="sale" size={30} color="#00FFFF" />
          <Text style={styles.bannerTitle}>MIDYEAR MEGA SALE</Text>
          <Text style={styles.bannerSubtitle}>Dapatkan Diskon Game hingga 80%</Text>
          <View style={styles.badge}><Text style={styles.badgeText}>LIMITED TIME</Text></View>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0C10', padding: 24, justifyContent: 'center' },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 18 },
  logoBadge: {
    minWidth: 118,
    height: 60,
    borderRadius: 18,
    backgroundColor: '#1F2833',
    borderWidth: 1,
    borderColor: '#00FFFF',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  logoTextBlock: { justifyContent: 'center' },
  logoMark: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoBams: { color: '#00FFFF', fontSize: 17, fontWeight: 'bold', letterSpacing: 0.4 },
  logoDivider: { width: 1, height: 24, backgroundColor: '#64748B' },
  logoStore: { color: '#FFD700', fontSize: 17, fontWeight: 'bold', letterSpacing: 0.4 },
  logoMini: {
    color: '#0B0C10',
    backgroundColor: '#00FFFF',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
    overflow: 'hidden',
  },
  logoTitle: { color: '#C5C6C7', fontSize: 20, fontWeight: 'bold', letterSpacing: 0.5 },
  logoSubtitle: { color: '#64748B', fontSize: 12, marginTop: 2 },
  welcomeText: { fontSize: 24, fontWeight: 'bold', color: '#C5C6C7', marginBottom: 24 },
  cyanText: { color: '#00FFFF' },
  authCard: { backgroundColor: '#1F2833', borderRadius: 14, padding: 16, marginBottom: 24, borderWidth: 1, borderColor: '#223041' },
  authTitle: { color: '#00FFFF', fontWeight: 'bold', marginBottom: 8 },
  authStatus: { color: '#10B981', fontSize: 12, fontWeight: 'bold', marginBottom: 8 },
  authText: { color: '#C5C6C7', fontSize: 13, lineHeight: 20, marginBottom: 14 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  authButtonRow: { flexDirection: 'row', gap: 12 },
  authButtonPrimary: {
    flex: 1,
    backgroundColor: '#00FFFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authButtonPrimaryText: { color: '#0B0C10', fontWeight: 'bold', fontSize: 15, letterSpacing: 0.5 },
  authButtonSecondary: {
    flex: 1,
    backgroundColor: '#1F2833',
    borderWidth: 1,
    borderColor: '#64748B',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authButtonSecondaryText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 15, letterSpacing: 0.5 },
  logoutButton: {
    marginTop: 12,
    backgroundColor: '#1F2833',
    borderWidth: 1,
    borderColor: '#EF4444',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: { color: '#EF4444', fontWeight: 'bold', fontSize: 15, letterSpacing: 0.5 },
  buttonContent: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  bannerContainer: { borderRadius: 12, overflow: 'hidden', borderWidth: 2, borderColor: '#00FFFF', marginBottom: 32 },
  banner: { padding: 32, backgroundColor: '#1F2833', alignItems: 'center', gap: 8 },
  bannerTitle: { color: '#00FFFF', fontSize: 24, fontWeight: 'bold', marginBottom: 8, textAlign: 'center' },
  bannerSubtitle: { color: '#C5C6C7', fontSize: 14, marginBottom: 16, textAlign: 'center' },
  badge: { backgroundColor: '#00FFFF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4 },
  badgeText: { color: '#0B0C10', fontWeight: 'bold', fontSize: 12 },
});