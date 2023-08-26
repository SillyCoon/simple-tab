import { createSignal } from "solid-js";
import { Note, tabParser } from "./parsers/parser";
import TabsCanvas from "./TabsCanvas";
import { Notifications } from "./components/Notifications";
import { ParsingError } from "./notifier/notifier";

// prettier-ignore
const example =
`--------------------------------
-3------------3-2h3----3-2h3----
--2--------------------------2--
--0------0----------0----------0
--0-----------------------------
--0--------0----------0---------`;

function App() {
  const [tabsInput, setTabsInput] = createSignal("");
  const [parsedTabs, setParsedTabs] = createSignal<Note[][]>([]);
  const [parsingErrors, setParsingErrors] = createSignal<ParsingError[][]>([]);

  const handleParse = (str: string) => {
    const notation = tabParser(str);
    setParsedTabs(notation.map((v) => v.notes));
    setParsingErrors(notation.map((v) => v.errors));
  };

  const handleExample = () => {
    setTabsInput(example);
    handleParse(example);
  };

  return (
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="bg-white p-4 shadow-md rounded-md w-120">
        <h1 class="text-2xl font-semibold mb-4">Guitar Tabs Parser</h1>
        <textarea
          class="w-full p-2 border rounded-md resize-none font-mono"
          rows="10"
          value={tabsInput()}
          onInput={(e) => handleParse(e.target.value)}
        ></textarea>
        <button
          class="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md
          hover:bg-blue-600 active:bg-blue-700 transition-colors duration-100 cursor-pointer"
          onClick={handleExample}
        >
          Paste example
        </button>
        <div class="mt-4">
          <TabsCanvas
            parsedTabs={parsedTabs()}
            width={800}
            height={300}
            columnWidth={10}
            lineHeight={30}
            dashWidth={10}
          ></TabsCanvas>
        </div>
        <div class="mt-4">
          <Notifications errors={parsingErrors().flat()}></Notifications>
        </div>
      </div>
    </div>
  );
}

export default App;
