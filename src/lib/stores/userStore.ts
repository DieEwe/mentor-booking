// src/lib/stores/userStore.ts
import { writable } from 'svelte/store';
import type { User } from '../dummyData';


export interface UserState {
  isLoggedIn: boolean;
  user: User | null;
}



export const userStore = writable<UserState>({
  isLoggedIn: false,
  user: null
});

export function login(user: User) {
  userStore.set({
    isLoggedIn: true,
    user
  });
}

export function logout() {
  userStore.set({
    isLoggedIn: false,
    user: null
  });
}
