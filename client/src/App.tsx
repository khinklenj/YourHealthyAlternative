import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Providers from "@/pages/providers";
import ProviderDetail from "@/pages/provider-detail";
import JoinProvider from "@/pages/join-provider";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/providers" component={Providers} />
      <Route path="/provider/:id" component={ProviderDetail} />
      <Route path="/join-provider" component={JoinProvider} />
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
