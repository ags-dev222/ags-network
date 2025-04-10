import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './screens/Home/Home.jsx';
import { Dashboard } from './screens/Dashboard';
import { CuratedContent } from './screens/CuratedContent';
import { Membership } from './screens/Membership';
import { StartupCompanies } from './screens/StartupCompanies';
import { InvestorsFunding } from './screens/InvestorsFunding';
import { InvestmentHeatmap } from './screens/InvestmentHeatmap';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="curated-content" element={<CuratedContent />} />
          <Route path="membership" element={<Membership />} />
          <Route path="startup-companies" element={<StartupCompanies />} />
          <Route path="investors-funding" element={<InvestorsFunding />} />
          <Route path="investment-heatmap" element={<InvestmentHeatmap />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;