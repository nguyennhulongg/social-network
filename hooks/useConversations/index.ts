import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useConversations = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/getConversations", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useConversations;
