import { createEffect, createSignal } from "solid-js";
import { Notation, tabParser } from "./parsers/";
import TabsCanvas from "./TabsCanvas";

function App() {
  const [tabsInput, setTabsInput] = createSignal("");
  const [parsedTabs, setParsedTabs] = createSignal<Notation[][]>([]);

  const handleParse = (str: string) => {
    const parsedData = tabParser(str);
    setParsedTabs(parsedData);
  };

  return (
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="bg-white p-4 shadow-md rounded-md w-96">
        <h1 class="text-2xl font-semibold mb-4">Guitar Tabs Parser</h1>
        <textarea
          class="w-full p-2 border rounded-md resize-none"
          rows="10"
          value={tabsInput()}
          onInput={(e) => handleParse(e.target.value)}
        ></textarea>
        <button
          class="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md"
          // onClick={handleParse}
        >
          Parse Tabs
        </button>
        <div class="mt-4">
          <TabsCanvas
            parsedTabs={parsedTabs()[0]}
            width={800}
            height={150}
            columnWidth={10}
            lineHeight={30}
            dashWidth={10}
          ></TabsCanvas>
          {/* {parsedTabs().map((tab, index) => (
            <pre key={index} class="bg-gray-200 p-2 mb-2 rounded-md">
              {tab.map((v) => `${v.type} ${v.value}`).join("\n")}
            </pre>
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default App;
