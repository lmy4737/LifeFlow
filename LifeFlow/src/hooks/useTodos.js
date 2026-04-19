import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 模拟本地存储
const STORAGE_KEY = 'lifeflow_todos';

const getTodos = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveTodos = (todos) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

export const useTodos = () => {
  const queryClient = useQueryClient();

  const { data: todos = [], isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  const addTodoMutation = useMutation({
    mutationFn: (text) => {
      const newTodo = {
        id: Date.now().toString(),
        text,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      const updatedTodos = [...todos, newTodo];
      saveTodos(updatedTodos);
      return updatedTodos;
    },
    onSuccess: (updatedTodos) => {
      queryClient.setQueryData(['todos'], updatedTodos);
    },
  });

  const toggleTodoMutation = useMutation({
    mutationFn: (id) => {
      const updatedTodos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      saveTodos(updatedTodos);
      return updatedTodos;
    },
    onSuccess: (updatedTodos) => {
      queryClient.setQueryData(['todos'], updatedTodos);
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: (id) => {
      const updatedTodos = todos.filter(todo => todo.id !== id);
      saveTodos(updatedTodos);
      return updatedTodos;
    },
    onSuccess: (updatedTodos) => {
      queryClient.setQueryData(['todos'], updatedTodos);
    },
  });

  return {
    todos,
    isLoading,
    addTodo: (text) => addTodoMutation.mutate(text),
    toggleTodo: (id) => toggleTodoMutation.mutate(id),
    deleteTodo: (id) => deleteTodoMutation.mutate(id),
  };
};
