// app/(tabs)/menu.tsx
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState, useSyncExternalStore } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { addGameToCart, getCartItems, subscribeCart } from '../../lib/cart-store';

type Game = {
  id: string;
  judul: string;
  harga: number;
  hargaAsli: number;
  diskon: number;
  deskripsi: string;
  warna: string;
};

type GameSeed = {
  judul: string;
  harga?: number;
  deskripsi: string;
};

const COLOR_PALETTE = ['#8B5CF6', '#10B981', '#00FFFF', '#F59E0B', '#EF4444'];

const BASE_PRICES = [
  250000, 275000, 300000, 325000, 350000, 375000, 400000, 425000, 450000, 475000,
  500000, 525000, 550000, 575000, 600000, 625000, 650000, 675000, 700000, 725000,
  750000, 775000, 800000, 825000, 850000, 875000, 900000, 925000, 950000, 975000,
  1000000, 265000, 290000, 315000, 340000, 365000, 390000, 415000, 440000, 465000,
  490000, 515000, 540000, 565000, 590000, 615000, 640000, 665000, 690000, 715000,
];

const DISCOUNTS = [
  15, 18, 20, 22, 25, 28, 30, 32, 35, 38,
  40, 42, 45, 48, 50, 52, 55, 58, 60, 62,
  65, 68, 70, 72, 75, 78, 80, 24, 27, 29,
  31, 34, 36, 39, 41, 44, 47, 49, 51, 53,
  56, 59, 61, 63, 66, 69, 71, 73, 76, 79,
];

const GAME_CATALOG: GameSeed[] = [
  { judul: 'Elden Ring', harga: 599000, deskripsi: 'RPG dunia luas dengan tantangan besar.' },
  { judul: 'Cyberpunk 2077', harga: 420000, deskripsi: 'Action futuristik dengan cerita sinematik.' },
  { judul: 'Baldur’s Gate 3', harga: 699000, deskripsi: 'RPG taktis dengan pilihan cerita yang luas.' },
  { judul: 'Grand Theft Auto V', harga: 300000, deskripsi: 'Open world klasik dengan banyak aktivitas.' },
  { judul: 'Red Dead Redemption 2', harga: 649000, deskripsi: 'Petualangan western yang sangat imersif.' },
  { judul: 'Resident Evil 4 Remake', harga: 750000, deskripsi: 'Horror action dengan gameplay modern.' },
  { judul: 'Hogwarts Legacy', harga: 610000, deskripsi: 'Petualangan sihir di dunia Hogwarts.' },
  { judul: 'Starfield', harga: 720000, deskripsi: 'Eksplorasi luar angkasa penuh kebebasan.' },
  { judul: 'Forza Horizon 5', harga: 580000, deskripsi: 'Balapan open world yang seru dan luas.' },
  { judul: 'EA Sports FC 25', harga: 840000, deskripsi: 'Game sepak bola dengan mode kompetitif.' },
  { judul: 'Call of Duty: Modern Warfare III', harga: 930000, deskripsi: 'FPS cepat dengan mode online intens.' },
  { judul: 'Battlefield 2042', harga: 540000, deskripsi: 'Perang skala besar dengan aksi cepat.' },
  { judul: 'Valorant', harga: 0, deskripsi: 'Tactical shooter gratis untuk kompetisi.' },
  { judul: 'Counter-Strike 2', harga: 0, deskripsi: 'FPS kompetitif dengan tempo cepat.' },
  { judul: 'Apex Legends', harga: 0, deskripsi: 'Battle royale team-based yang dinamis.' },
  { judul: 'Fortnite', harga: 0, deskripsi: 'Battle royale dengan event dan update rutin.' },
  { judul: 'Genshin Impact', harga: 0, deskripsi: 'Action RPG dengan dunia fantasi luas.' },
  { judul: 'Honkai: Star Rail', harga: 0, deskripsi: 'RPG turn-based dengan cerita sci-fi.' },
  { judul: 'The Witcher 3', harga: 390000, deskripsi: 'RPG fantasi dengan kisah yang kuat.' },
  { judul: 'Assassin’s Creed Mirage', harga: 560000, deskripsi: 'Petualangan stealth di kota kuno.' },
  { judul: 'Assassin’s Creed Valhalla', harga: 640000, deskripsi: 'Petualangan Viking yang besar.' },
  { judul: 'Far Cry 6', harga: 520000, deskripsi: 'Shooter open world dengan konflik seru.' },
  { judul: 'Far Cry 5', harga: 420000, deskripsi: 'Petualangan aksi di wilayah penuh konflik.' },
  { judul: 'Watch Dogs Legion', harga: 510000, deskripsi: 'Hacking action di kota futuristik.' },
  { judul: 'Sekiro: Shadows Die Twice', harga: 570000, deskripsi: 'Action menantang dengan timing presisi.' },
  { judul: 'Ghost of Tsushima', harga: 650000, deskripsi: 'Samurai open world dengan visual indah.' },
  { judul: 'Marvel’s Spider-Man Remastered', harga: 700000, deskripsi: 'Aksi superhero yang cepat dan seru.' },
  { judul: 'God of War Ragnarök', harga: 850000, deskripsi: 'Aksi epik dengan cerita yang kuat.' },
  { judul: 'Horizon Forbidden West', harga: 780000, deskripsi: 'Petualangan futuristik penuh eksplorasi.' },
  { judul: 'Uncharted 4', harga: 440000, deskripsi: 'Petualangan sinematik penuh aksi.' },
  { judul: 'The Last of Us Part I', harga: 790000, deskripsi: 'Cerita emosional dengan aksi survival.' },
  { judul: 'Sonic Frontiers', harga: 480000, deskripsi: 'Platformer cepat dalam dunia terbuka.' },
  { judul: 'Minecraft', harga: 350000, deskripsi: 'Bangun dunia sendiri sesuai kreativitas.' },
  { judul: 'Stardew Valley', harga: 120000, deskripsi: 'Simulasi santai tentang bertani dan membangun.' },
  { judul: 'Terraria', harga: 150000, deskripsi: 'Petualangan 2D dengan crafting dan eksplorasi.' },
  { judul: 'Among Us', harga: 75000, deskripsi: 'Game sosial deduksi yang ringan dan seru.' },
  { judul: 'It Takes Two', harga: 480000, deskripsi: 'Co-op kreatif untuk dimainkan bersama.' },
  { judul: 'Overcooked! 2', harga: 220000, deskripsi: 'Masak bareng dengan tempo cepat dan lucu.' },
  { judul: 'Diablo IV', harga: 910000, deskripsi: 'Action RPG gelap dengan loot melimpah.' },
  { judul: 'Dragon’s Dogma 2', harga: 890000, deskripsi: 'RPG aksi dengan dunia fantasi luas.' },
  { judul: 'Persona 5 Royal', harga: 620000, deskripsi: 'JRPG stylish dengan cerita kuat.' },
  { judul: 'Final Fantasy VII Rebirth', harga: 980000, deskripsi: 'RPG sinematik dengan petualangan besar.' },
  { judul: 'Tekken 8', harga: 760000, deskripsi: 'Fighting game kompetitif dan responsif.' },
  { judul: 'Mortal Kombat 1', harga: 740000, deskripsi: 'Pertarungan brutal dengan karakter ikonik.' },
  { judul: 'Street Fighter 6', harga: 730000, deskripsi: 'Fighting game cepat dan penuh gaya.' },
  { judul: 'Nier: Automata', harga: 390000, deskripsi: 'Action RPG dengan cerita unik.' },
  { judul: 'Death Stranding Director’s Cut', harga: 510000, deskripsi: 'Eksperimen gameplay dengan dunia luas.' },
  { judul: 'Sea of Thieves', harga: 450000, deskripsi: 'Petualangan bajak laut multiplayer.' },
  { judul: 'Palworld', harga: 280000, deskripsi: 'Survival kreatif dengan makhluk unik.' },
  { judul: 'Helldivers 2', harga: 430000, deskripsi: 'Co-op shooter penuh aksi dan koordinasi.' },
];

export default function MenuScreen() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const cartItems = useSyncExternalStore(subscribeCart, getCartItems, getCartItems);

  const games: Game[] = useMemo(
    () =>
      GAME_CATALOG.map((game, index) => ({
        id: `g${index + 1}`,
        judul: game.judul,
        hargaAsli: BASE_PRICES[index],
        diskon: DISCOUNTS[index],
        harga: Math.round(BASE_PRICES[index] * (100 - DISCOUNTS[index]) / 100),
        deskripsi: game.deskripsi,
        warna: COLOR_PALETTE[index % COLOR_PALETTE.length],
      })),
    []
  );

  const handleAddToCart = (game: Game) => {
    addGameToCart(game);
    setSelectedId(game.id);
    Alert.alert(
      'Ditambahkan ke Keranjang',
      `${game.judul}\nHarga promo: ${formatRupiah(game.harga)}\nDiskon: ${game.diskon}%`
    );
  };

  const isInCart = (gameId: string) => cartItems.some(item => item.id === gameId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        PILIH <Text style={{ color: '#8B5CF6' }}>GAME</Text>
      </Text>

      <FlatList
        data={games}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View style={[styles.card, { borderColor: item.warna }]}>
            <View style={[styles.cardTop, { backgroundColor: `${item.warna}22` }]}>
              <View style={styles.cardHeaderRow}>
                <View style={styles.titleRow}>
                  <Ionicons name="game-controller-outline" size={18} color={item.warna} />
                  <Text style={[styles.cardTitle, { color: item.warna }]}>{item.judul}</Text>
                </View>
                <View style={styles.discountBadge}>
                  <MaterialCommunityIcons name="sale" size={12} color="#FFFFFF" />
                  <Text style={styles.discountText}>-{item.diskon}%</Text>
                </View>
              </View>
              <Text style={styles.cardDesc}>{item.deskripsi}</Text>
            </View>

            <View style={styles.bottomRow}>
              <View>
                <Text style={styles.originalPrice}>Rp {item.hargaAsli.toLocaleString('id-ID')}</Text>
                <Text style={styles.price}>Rp {item.harga.toLocaleString('id-ID')}</Text>
              </View>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: item.warna }]}
                onPress={() => handleAddToCart(item)}>
                <View style={styles.buttonContent}>
                  <Ionicons name={selectedId === item.id || isInCart(item.id) ? 'checkmark' : 'cart'} size={14} color="#0B0C10" />
                  <Text style={styles.btnText}>{selectedId === item.id || isInCart(item.id) ? 'ADDED' : 'ADD'}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.cartFloatingBtn} onPress={() => router.push('/cart')}>
        <View style={styles.buttonContent}>
          <Ionicons name="cart-outline" size={16} color="#0B0C10" />
          <Text style={styles.cartFloatingText}>Buka Keranjang</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const formatRupiah = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0C10',
    padding: 24,
    paddingTop: 56,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#C5C6C7', marginBottom: 16 },
  card: {
    backgroundColor: '#1F2833',
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
  },
  cardTop: {
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  cardTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 6 },
  cardDesc: { color: '#C5C6C7', fontSize: 12 },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  originalPrice: { color: '#64748B', fontSize: 11, textDecorationLine: 'line-through', marginBottom: 2 },
  price: { color: '#00FFFF', fontWeight: 'bold', fontSize: 16 },
  btn: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10 },
  btnText: { color: '#0B0C10', fontWeight: 'bold' },
  discountBadge: { backgroundColor: '#EF4444', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, flexDirection: 'row', alignItems: 'center', gap: 4 },
  discountText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 11 },
  cartFloatingBtn: {
    position: 'absolute',
    right: 24,
    bottom: 22,
    backgroundColor: '#10B981',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    elevation: 4,
  },
  cartFloatingText: { color: '#0B0C10', fontWeight: 'bold' },
  buttonContent: { flexDirection: 'row', alignItems: 'center', gap: 6 },
});

