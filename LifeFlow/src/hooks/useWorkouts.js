import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 模拟本地存储
const STORAGE_KEY = 'lifeflow_workouts';

const getWorkouts = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveWorkouts = (workouts) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
};

export const useWorkouts = () => {
  const queryClient = useQueryClient();

  const { data: workouts = [], isLoading } = useQuery({
    queryKey: ['workouts'],
    queryFn: getWorkouts,
  });

  const addWorkoutMutation = useMutation({
    mutationFn: ({ name, category }) => {
      const newWorkout = {
        id: Date.now().toString(),
        name,
        category: category || '未分类',
        sets: [],
        createdAt: new Date().toISOString(),
      };
      const updatedWorkouts = [...workouts, newWorkout];
      saveWorkouts(updatedWorkouts);
      return updatedWorkouts;
    },
    onSuccess: (updatedWorkouts) => {
      queryClient.setQueryData(['workouts'], updatedWorkouts);
    },
  });

  const deleteWorkoutMutation = useMutation({
    mutationFn: (workoutId) => {
      const updatedWorkouts = workouts.filter(workout => workout.id !== workoutId);
      saveWorkouts(updatedWorkouts);
      return updatedWorkouts;
    },
    onSuccess: (updatedWorkouts) => {
      queryClient.setQueryData(['workouts'], updatedWorkouts);
    },
  });

  const addSetMutation = useMutation({
    mutationFn: (workoutId) => {
      const newSet = {
        id: Date.now().toString(),
        setNumber: workouts.find(w => w.id === workoutId)?.sets.length + 1 || 1,
        weight: 0,
        reps: 0,
        note: '',
      };
      
      const updatedWorkouts = workouts.map(workout =>
        workout.id === workoutId
          ? { ...workout, sets: [...workout.sets, newSet] }
          : workout
      );
      saveWorkouts(updatedWorkouts);
      return updatedWorkouts;
    },
    onSuccess: (updatedWorkouts) => {
      queryClient.setQueryData(['workouts'], updatedWorkouts);
    },
  });

  const updateSetMutation = useMutation({
    mutationFn: ({ workoutId, setId, data }) => {
      const updatedWorkouts = workouts.map(workout =>
        workout.id === workoutId
          ? {
              ...workout,
              sets: workout.sets.map(set =>
                set.id === setId ? { ...set, ...data } : set
              )
            }
          : workout
      );
      saveWorkouts(updatedWorkouts);
      return updatedWorkouts;
    },
    onSuccess: (updatedWorkouts) => {
      queryClient.setQueryData(['workouts'], updatedWorkouts);
    },
  });

  const deleteSetMutation = useMutation({
    mutationFn: ({ workoutId, setId }) => {
      const updatedWorkouts = workouts.map(workout =>
        workout.id === workoutId
          ? {
              ...workout,
              sets: workout.sets.filter(set => set.id !== setId)
            }
          : workout
      );
      saveWorkouts(updatedWorkouts);
      return updatedWorkouts;
    },
    onSuccess: (updatedWorkouts) => {
      queryClient.setQueryData(['workouts'], updatedWorkouts);
    },
  });

  return {
    workouts,
    isLoading,
    addWorkout: (name, category) => addWorkoutMutation.mutate({ name, category }),
    deleteWorkout: (workoutId) => deleteWorkoutMutation.mutate(workoutId),
    addSet: (workoutId) => addSetMutation.mutate(workoutId),
    updateSet: (workoutId, setId, data) => updateSetMutation.mutate({ workoutId, setId, data }),
    deleteSet: (workoutId, setId) => deleteSetMutation.mutate({ workoutId, setId }),
  };
};
