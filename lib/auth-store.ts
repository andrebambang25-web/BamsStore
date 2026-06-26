import AsyncStorage from '@react-native-async-storage/async-storage';

export type AuthAccount = {
  username: string;
  email: string;
  password: string;
};

export type AuthSuccessResult = {
  ok: true;
  account: AuthAccount;
};

export type AuthFailureResult = {
  ok: false;
  message: string;
};

export type AuthResult = AuthSuccessResult | AuthFailureResult;

const STORAGE_KEY = 'bams-store.auth-account';
const ACTIVE_STORAGE_KEY = 'bams-store.active-account';

let registeredAccount: AuthAccount | null = null;
let activeAccount: AuthAccount | null = null;
const loadRegisteredAccount = async () => {
  if (registeredAccount) {
    return registeredAccount;
  }

  const storedAccount = await AsyncStorage.getItem(STORAGE_KEY);

  if (!storedAccount) {
    return null;
  }

  try {
    registeredAccount = JSON.parse(storedAccount) as AuthAccount;
    return registeredAccount;
  } catch {
    await AsyncStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export const registerAccount = async (account: AuthAccount) => {
  registeredAccount = account;
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(account));
};

export const getRegisteredAccount = async () => loadRegisteredAccount();

export const getActiveAccount = async () => {
  if (activeAccount) {
    return activeAccount;
  }

  const storedActiveAccount = await AsyncStorage.getItem(ACTIVE_STORAGE_KEY);

  if (!storedActiveAccount) {
    return null;
  }

  try {
    activeAccount = JSON.parse(storedActiveAccount) as AuthAccount;
    return activeAccount;
  } catch {
    await AsyncStorage.removeItem(ACTIVE_STORAGE_KEY);
    return null;
  }
};

export const setActiveAccount = async (account: AuthAccount | null) => {
  activeAccount = account;

  if (account) {
    await AsyncStorage.setItem(ACTIVE_STORAGE_KEY, JSON.stringify(account));
    return;
  }

  await AsyncStorage.removeItem(ACTIVE_STORAGE_KEY);
};

export const clearActiveAccount = async () => {
  activeAccount = null;
  await AsyncStorage.removeItem(ACTIVE_STORAGE_KEY);
};

export const authenticateAccount = async (identifier: string, password: string): Promise<AuthResult> => {
  const account = await loadRegisteredAccount();

  if (!account) {
    return { ok: false, message: 'Belum ada akun terdaftar. Silakan daftar terlebih dahulu.' };
  }

  const matchesIdentifier =
    account.email.toLowerCase() === identifier.toLowerCase() ||
    account.username.toLowerCase() === identifier.toLowerCase();

  if (!matchesIdentifier || account.password !== password) {
    return { ok: false, message: 'Email/username atau password salah.' };
  }

  return { ok: true, account };
};