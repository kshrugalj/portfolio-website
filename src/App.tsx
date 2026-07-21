import { useMode } from "./hooks/useMode";
import ModeSwitcher from "./components/ModeSwitcher";
import Terminal from "./components/Terminal/Terminal";
import BrowseMode from "./components/Browse/BrowseMode";

function App() {
  const { mode, chooseMode } = useMode();

  if (!mode) {
    return <ModeSwitcher onChoose={chooseMode} />;
  }

  if (mode === "terminal") {
    return <Terminal onSwitchMode={() => chooseMode("browse")} />;
  }

  return <BrowseMode onSwitchMode={() => chooseMode("terminal")} />;
}

export default App;
