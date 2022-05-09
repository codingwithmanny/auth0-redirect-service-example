// Imports
// ========================================================
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

// Main Page
// ========================================================
const OneColumn: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return <div className="w-full mx-auto">
    <div className="w-full">
      <Nav />
      {children}
      <Footer />
    </div>
  </div>
};

// Exports
// ========================================================
export default OneColumn;