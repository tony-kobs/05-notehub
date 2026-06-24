import { useState } from "react";
import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import Pagination from "../Pagination/Pagination";
import {
  useCreateNote,
  useDeleteNote,
  useFetchNotes,
} from "../../queries/notes";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import EmptyNotes from "../EmptyNotes/EmptyNotes";

function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { data, error, isLoading, isError, isSuccess } = useFetchNotes(
    page,
    search,
  );

  const createNoteMutation = useCreateNote();
  const deleteNoteMutation = useDeleteNote();

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}

      {isError && (
        <ErrorMessage message={`Something went wrong! ${error.message}`} />
      )}
      {isSuccess && notes.length === 0 && <EmptyNotes />}
      {isSuccess && notes.length > 0 && (
        <NoteList notes={notes} onDelete={deleteNoteMutation.mutateAsync} />
      )}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm
            onClose={closeModal}
            onCreate={createNoteMutation.mutateAsync}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
