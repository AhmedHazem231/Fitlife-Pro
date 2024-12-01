import React, { useState } from 'react';
import {
  Activity,
  Award,
  BarChart2,
  Book,
  Calendar,
  Dumbbell,
  LogOut,
  MessageSquare,
  Settings as SettingsIcon,
  Trophy,
  User,
} from 'lucide-react';
import { UserData } from '../App';
import ProgressChart from './ProgressChart';
import ScheduleWorkout from './ScheduleWorkout';
import Community from './Community';
import Leaderboard from './Leaderboard';
import FAQs from './FAQs';
import SettingsPage from './Settings';
import AIAssistant from './AIAssistant';
import { FitnessMetricsForm } from './FitnessMetricsForm';
import { FitnessResults } from './FitnessResults';
import { LoadingProgress } from './LoadingProgress';
import { calculateFitnessMetrics } from '../utils/api';
import { FitnessData, FitnessMetrics } from '../utils/types';
import { MetricsOverview } from './dashboard/MetricsOverview';
import { NutritionPlan } from './dashboard/NutritionPlan';

interface Props {
  userData: UserData;
  setIsAuthenticated: (value: boolean) => void;
}

function HomePage({ userData, setIsAuthenticated }: Props) {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [showMetricsForm, setShowMetricsForm] = useState(true);
  const [fitnessMetrics, setFitnessMetrics] = useState<FitnessMetrics | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userProgress = {
    points: 1250,
    badges: [
      { name: 'Early Bird', description: 'Completed 5 morning workouts' },
      { name: 'Strength Master', description: 'Lifted 1000kg total' },
      { name: 'Diet Guru', description: 'Followed meal plan for 30 days' },
    ],
    streaks: 12,
    workoutsCompleted: 48,
  };

  const progressData = [
    { day: 'Mon', workouts: 2, calories: 2200 },
    { day: 'Tue', workouts: 1, calories: 2000 },
    { day: 'Wed', workouts: 3, calories: 2400 },
    { day: 'Thu', workouts: 2, calories: 2100 },
    { day: 'Fri', workouts: 2, calories: 2300 },
    { day: 'Sat', workouts: 1, calories: 1900 },
    { day: 'Sun', workouts: 0, calories: 1800 },
  ];

  const handleMetricsSubmit = async (data: FitnessData) => {
    setLoading(true);
    setError(null);
    try {
      const metrics = await calculateFitnessMetrics(data);
      setFitnessMetrics(metrics);
      setShowMetricsForm(false);
    } catch (err) {
      setError('Failed to calculate fitness metrics. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseResults = () => {
    // Keep the metrics in state but close the modal
    setShowMetricsForm(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'schedule':
        return <ScheduleWorkout />;
      case 'community':
        return <Community userData={userData} />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'faqs':
        return <FAQs />;
      case 'settings':
        return <SettingsPage userData={userData} />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2 space-y-6">
              {fitnessMetrics && (
                <>
                  <MetricsOverview metrics={fitnessMetrics} />
                  <NutritionPlan metrics={fitnessMetrics} />
                </>
              )}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Your Progress
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Trophy className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-600">
                      {userProgress.points}
                    </p>
                    <p className="text-sm text-gray-600">Points</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-600">
                      {userProgress.badges.length}
                    </p>
                    <p className="text-sm text-gray-600">Badges</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <BarChart2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-600">
                      {userProgress.streaks}
                    </p>
                    <p className="text-sm text-gray-600">Day Streak</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <Dumbbell className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-orange-600">
                      {userProgress.workoutsCompleted}
                    </p>
                    <p className="text-sm text-gray-600">Workouts</p>
                  </div>
                </div>
                <ProgressChart data={progressData} />
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-4">
                  <button
                    onClick={() => setShowMetricsForm(true)}
                    className="w-full flex items-center space-x-3 text-left p-3 rounded-lg hover:bg-gray-50"
                  >
                    <Activity className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">Update Metrics</span>
                  </button>
                  <button
                    onClick={() => setActiveSection('schedule')}
                    className="w-full flex items-center space-x-3 text-left p-3 rounded-lg hover:bg-gray-50"
                  >
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">Schedule Workout</span>
                  </button>
                  <button
                    onClick={() => setActiveSection('community')}
                    className="w-full flex items-center space-x-3 text-left p-3 rounded-lg hover:bg-gray-50"
                  >
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">Community</span>
                  </button>
                  <button
                    onClick={() => setActiveSection('leaderboard')}
                    className="w-full flex items-center space-x-3 text-left p-3 rounded-lg hover:bg-gray-50"
                  >
                    <Trophy className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">Leaderboard</span>
                  </button>
                  <button
                    onClick={() => setActiveSection('faqs')}
                    className="w-full flex items-center space-x-3 text-left p-3 rounded-lg hover:bg-gray-50"
                  >
                    <Book className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">FAQs</span>
                  </button>
                  <button
                    onClick={() => setActiveSection('settings')}
                    className="w-full flex items-center space-x-3 text-left p-3 rounded-lg hover:bg-gray-50"
                  >
                    <SettingsIcon className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">Settings</span>
                  </button>
                  <button
                    onClick={() => setIsAuthenticated(false)}
                    className="w-full flex items-center space-x-3 text-left p-3 rounded-lg hover:bg-gray-50 text-red-600"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setActiveSection('home')}
            >
              <Activity className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                FitLife Pro
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-6 w-6 text-gray-600" />
                <span className="text-gray-700">{userData.name}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {showMetricsForm && !loading && (
        <FitnessMetricsForm
          onSubmit={handleMetricsSubmit}
          onClose={() => setShowMetricsForm(false)}
          loading={loading}
          error={error}
        />
      )}

      {loading && <LoadingProgress />}

      {fitnessMetrics && !showMetricsForm && !loading && (
        <FitnessResults metrics={fitnessMetrics} onClose={handleCloseResults} />
      )}

      <AIAssistant />
    </div>
  );
}

export default HomePage;
