import { useQuery, useMutation, useQueryClient,} from '@tanstack/react-query';

export interface Story {
  id: number;
  title: string;
  author?: string;
}

const API_URL = 'http://localhost:3000/stories';

export const useCRUDStory = () => {
  const queryClient = useQueryClient();
  const queryKey = ['stories'];

  const list = useQuery<Story[]>({
    queryKey,
    queryFn: async (): Promise<Story[]> => {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Network error');
      return res.json();
    },
  });

  const add = useMutation({
    mutationFn: async (newStory: Omit<Story, 'id'>): Promise<Story> => {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStory),
      });
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const update = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Story> }): Promise<Story> => {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  // 4. DELETE
  const remove = useMutation({
    mutationFn: async (id: number): Promise<void> => {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  return { list, add, update, remove };
};