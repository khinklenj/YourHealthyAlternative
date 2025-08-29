import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Providers from "@/pages/providers";
import ProviderDetail from "@/pages/provider-detail";
import JoinProvider from "@/pages/join-provider";
import CustomerDashboard from "@/pages/customer-dashboard";
import ProviderDashboard from "@/pages/provider-dashboard";
import TermsConditions from "@/pages/terms-conditions";
import PrivacyPolicy from "@/pages/privacy-policy";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/providers" component={Providers} />
      <Route path="/provider/:id" component={ProviderDetail} />
      <Route path="/join-provider" component={JoinProvider} />
      <Route path="/dashboard/customer" component={CustomerDashboard} />
      <Route path="/dashboard/provider" component={ProviderDashboard} />
      <Route path="/terms-conditions" component={TermsConditions} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
