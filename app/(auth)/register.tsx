import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { registerAccount } from '../../lib/auth-store';

export default function RegisterScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'Harap isi semua kolom!');
      return;
    }

    setIsLoading(true);

    try {
      await registerAccount({
        username: username.trim(),
        email: email.trim(),
        password,
      });

      Alert.alert('Sukses', 'Akun berhasil terdaftar! Silakan masuk dengan akun baru kamu.', [
        { text: 'OK', onPress: () => router.replace('/login') }
      ]);
    } catch {
      Alert.alert('Error', 'Gagal menyimpan akun. Coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DAFTAR AKUN</Text>
      <Text style={styles.subtitle}>Bergabunglah dengan komunitas BamsStore</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#64748B"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#64748B"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
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

      <TouchableOpacity style={[styles.button, isLoading && styles.buttonDisabled]} onPress={handleRegister} disabled={isLoading}>
        <Text style={styles.buttonText}>{isLoading ? 'MENYIMPAN...' : 'DAFTAR'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.linkText}>Sudah punya akun? <Text style={{ color: '#64748B' }}>Masuk</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B0C10', justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#C5C6C7', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#C5C6C7', textAlign: 'center', marginBottom: 32 },
  input: { backgroundColor: '#1F2833', color: '#C5C6C7', padding: 16, borderRadius: 8, marginBottom: 16, fontSize: 16 },
  button: { backgroundColor: '#64748B', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: '#0B0C10', fontWeight: 'bold', fontSize: 16 },
  linkText: { color: '#C5C6C7', textAlign: 'center', marginTop: 24 }
});