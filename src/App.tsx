import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { DashboardHomePage } from "./pages/DashboardHomePage";
import { NewBlueprintPage } from "./pages/NewBlueprintPage";
import { AllBlueprintsPage } from "./pages/AllBlueprintsPage";
import { BlueprintViewPage } from "./pages/BlueprintViewPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHomePage />} />
          <Route path="new" element={<NewBlueprintPage />} />
          <Route path="blueprints" element={<AllBlueprintsPage />} />
          <Route path="blueprint/:id" element={<BlueprintViewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
