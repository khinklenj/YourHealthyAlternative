import Header from "@/components/header";
import JoinProviderForm from "@/components/join-provider-form";

export default function JoinProviderPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8">
        <JoinProviderForm />
      </main>
    </div>
  );
}