// Imports
// ========================================================
import Loader from "../Loader";

// Main Component
// ========================================================
const FullLoader = ({ className }: { className?: string }) => <div className={className ?? "fixed inset-0 bg-slate-50 flex items-center justify-center"}>
  <Loader />
</div>;

// Exports
// ========================================================
export default FullLoader;