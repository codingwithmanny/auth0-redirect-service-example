// Imports
// ========================================================
import OneColumn from "../../layouts/OneColumn";
import useWebAuth from "../../hooks/useWebAuth";

// Main Page
// ========================================================
const Home = () => {
  // State / Props
  const { state } = useWebAuth();

  // Render / UI
  return <OneColumn>
    <main className="px-4">
      <div className="py-10">
        <h1 className="text-2xl font-medium mb-8">Home Content</h1>
        <pre className="bg-slate-100 p-8 mb-8 overflow-scroll"><code>{JSON.stringify(state, null, ' ')}</code></pre>
      </div>
    </main>
  </OneColumn>
}

// Exports
// ========================================================
export default Home;