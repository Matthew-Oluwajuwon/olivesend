import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';

interface SecureStoreHook {
  setItem: (key: string, value: string) => Promise<void>;
  getItem: (key: string) => Promise<string | null>;
  removeItem: (key: string) => Promise<void>;
  clearStore: () => Promise<void>;
  error: string | null;
  data: string | null;
  loading: boolean;
}

export const useSecureStore = (): SecureStoreHook => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Function to set an item in SecureStore
  const setItem = async (key: string, value: string) => {
    try {
      setLoading(true);
      await SecureStore.setItemAsync(key, value);
      setLoading(false);
    } catch (err) {
      setError(`Failed to set item: ${err}`);
      setLoading(false);
    }
  };

  // Function to get an item from SecureStore
  const getItem = async (key: string) => {
    try {
      setLoading(true);
      const result = await SecureStore.getItemAsync(key);
      setData(result);
      setLoading(false);
      return result;
    } catch (err) {
      setError(`Failed to get item: ${err}`);
      setLoading(false);
      return null;
    }
  };

  // Function to remove an item from SecureStore
  const removeItem = async (key: string) => {
    try {
      setLoading(true);
      await SecureStore.deleteItemAsync(key);
      setLoading(false);
    } catch (err) {
      setError(`Failed to remove item: ${err}`);
      setLoading(false);
    }
  };

  // Function to clear all items (there's no direct method for clearing all, so you need to do it manually)
  const clearStore = async () => {
    try {
      setLoading(true);
      const keys = ['userInfo']; // Replace with actual keys you use
      await Promise.all(keys.map((key) => SecureStore.deleteItemAsync(key)));
      setLoading(false);
    } catch (err) {
      setError(`Failed to clear store: ${err}`);
      setLoading(false);
    }
  };

  return {
    setItem,
    getItem,
    removeItem,
    clearStore,
    error,
    data,
    loading,
  };
};
