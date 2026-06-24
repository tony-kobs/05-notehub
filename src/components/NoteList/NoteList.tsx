import toast from "react-hot-toast";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => Promise<unknown>;
}

export default function NoteList({ notes, onDelete }: NoteListProps) {
  const handleDelete = async (id: string) => {
    try {
      await onDelete(id);
      toast.success("Note deleted");
    } catch {
      toast.error("Failed to delete note");
    }
  };
  return (
    <ul className={css.list}>
      {notes.map((note: Note) => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.button}
              onClick={() => handleDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
