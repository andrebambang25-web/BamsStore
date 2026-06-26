import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { authenticateAccount, setActiveAccount } from '../../lib/auth-store';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Harap isi semua kolom!');
      return;
    }

    setIsLoading(true);

    try {
      const result = await authenticateAccount(email.trim(), password);

      if (!result.ok) {
        Alert.alert('Login Gagal', result.message);
        return;
      }

      await setActiveAccount(result.account);
      router.replace('/(tabs)');
    } catch {
      Alert.alert('Login Gagal', 'Terjadi kesalahan saat memproses login.');
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>BAMS<Text style={{ color: '#64748B' }}>STORE</Text></Text>
      <Text style={styles.subtitle}>Sign in to your gaming account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email atau Username"
        placeholderTextColor="#64748B"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#64748B"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={[styles.button, isLoading && styles.buttonDisabled]} onPress={handleLogin} disabled={isLoading}>
        <Text style={styles.buttonText}>{isLoading ? 'MASUK...' : 'MASUK'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={styles.linkText}>Belum punya akun? <Text style={{ color: '#64748B' }}>Daftar di sini</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0C10', justifyContent: 'center', padding: 24 },
  logo: { fontSize: 36, fontWeight: 'bold', color: '#C5C6C7', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#C5C6C7', textAlign: 'center', marginBottom: 32 },
  input: { backgroundColor: '#1F2833', color: '#C5C6C7', padding: 16, borderRadius: 8, marginBottom: 16, fontSize: 16, borderWidth: 1, borderColor: '#64748B' },
  button: { backgroundColor: '#64748B', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: '#0B0C10', fontWeight: 'bold', fontSize: 16 },
  linkText: { color: '#C5C6C7', textAlign: 'center', marginTop: 24, fontSize: 14 }
});