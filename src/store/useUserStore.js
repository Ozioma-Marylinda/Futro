import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || {
    name: '',
    email: '',
    isLoggedIn: false,
    role: 'buyer',
  },

  signIn: ({ name, email, role = 'buyer' }) => {
    const newUser = { name, email, isLoggedIn: true, role };
    localStorage.setItem('user', JSON.stringify(newUser));
    set({ user: newUser });
  },

  signOut: () => {
    const resetUser = { name: '', email: '', isLoggedIn: false, role: 'buyer' };
    localStorage.removeItem('user');
    set({ user: resetUser });
  },

  setRole: (role) =>
    set((state) => {
      const updatedUser = { ...state.user, role };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { user: updatedUser };
    }),
}));

export default useUserStore;