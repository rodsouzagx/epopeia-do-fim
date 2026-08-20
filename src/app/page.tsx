import Header from "../components/Header";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#070b14] text-slate-100">
      <Header />
      <main className="flex-1">
        <Hero />
        {/* Aqui entrarão: RecentChapters e LatestNews */}
      </main>
    </div>
  );
}
