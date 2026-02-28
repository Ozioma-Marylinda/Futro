import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useJobsStore = create(
  persist(
    (set) => ({
      jobs: [],
      setJobs: (newJobs) => set({ jobs: newJobs }),
    }),
    {
      name: 'jobs-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useJobsStore;