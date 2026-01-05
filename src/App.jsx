import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/hero/HeroSection';
import StatsCard from './components/stats/StatsCard';
import Timer from './components/timer/Timer';
import TaskList from './components/tasks/TaskList';
import Analytics from './components/charts/Analytics';

function App() {
    return (
        <div className="min-h-screen bg-bg-light">
            <Header />
            <main>
                <HeroSection />
                <StatsCard />
                <Timer />
                <TaskList />
                <Analytics />
            </main>
            <Footer />
        </div>
    );
}

export default App;
