import { NoteBoard } from "./components/NoteBoard/NoteBoard";
import { GlobalProvider } from "./provider/GlobalProvider";

function App() {
  return (
    <GlobalProvider>
      <NoteBoard />
    </GlobalProvider>
  );
}

export default App;
