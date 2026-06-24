import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "../services/noteService";

export function useFetchNotes(page: number, search: string) {
  return useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes({ page, search }),
    placeholderData: keepPreviousData,
  });
}
