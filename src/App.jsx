import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './screens/Home/Home.jsx';
import { Dashboard } from './screens/Dashboard';
import { FinancialInsight } from './screens/FinancialInsight';
import { CuratedContent } from './screens/CuratedContent';
import { Membership } from './screens/Membership';
import { StartupCompanies } from './screens/StartupCompanies';
import { InvestorsFunding } from './screens/InvestorsFunding';
import { InvestmentHeatmap } from './screens/InvestmentHeatmap';
import { FindInvestor } from './screens/FindInvestor';
import { Report } from './screens/Report'; // Add this import
import { InvestorResult} from './screens/InvestorResult';
import {InvestorContactCard} from './screens/InvestorContactCard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="financial-insight" element={<FinancialInsight />} />
          <Route path="curated-content" element={<CuratedContent />} />
          <Route path="membership" element={<Membership />} />
          <Route path="startup-companies" element={<StartupCompanies />} />
          <Route path="investors-funding" element={<InvestorsFunding />} />
          <Route path="investment-heatmap" element={<InvestmentHeatmap />} />
          <Route path="find-investors" element={<FindInvestor />} />
          <Route path="reports" element={<Report />} /> {/* Add this route */}
          <Route path="investor-result" element={<InvestorResult />} />
          <Route path="investor-contact-card" element={<InvestorContactCard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;