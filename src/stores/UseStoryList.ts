import { useQuery } from "@tanstack/react-query";

const useStoryList = () => {
    const {data} = useQuery({
        queryKey:["stories"],
        queryFn: async () => {
            const response = await fetch('http://localhost:3000/stories');
            return response.formData;
            }
    })
    return { data };

};