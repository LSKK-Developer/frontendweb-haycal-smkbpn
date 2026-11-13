import { useEffect } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import { useSkillUpStore } from './store/useSkillUpStore';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ExplorePage from './pages/ExplorePage';
import MyLearningPage from './pages/MyLearningPage';
import SkillDetailPage from './pages/SkillDetailPage';
import NotesPage from './pages/NotesPage';
import AchievementsPage from './pages/AchievementsPage';
import ProfilePage from './pages/ProfilePage';

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } } });
function ProtectedLayout() {
  const user = useSkillUpStore((state) => state.user);
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
function LoginRoute() {
  const user = useSkillUpStore((state) => state.user);
  return user ? <Navigate to="/" replace /> : <LoginPage />;
}

export default function App() {
  const themeMode = useSkillUpStore((state) => state.theme);
  useEffect(() => { document.documentElement.classList.toggle('dark', themeMode === 'dark'); }, [themeMode]);
  return <QueryClientProvider client={queryClient}><ConfigProvider theme={{ algorithm: themeMode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm, token: { colorPrimary: '#6d5ce7', borderRadius: 10, fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' } }}><HashRouter><Routes><Route path="/login" element={<LoginRoute/>}/><Route element={<ProtectedLayout/>}><Route path="/" element={<AppLayout/>}><Route index element={<DashboardPage/>}/><Route path="explore" element={<ExplorePage/>}/><Route path="learning" element={<MyLearningPage/>}/><Route path="skills/:id" element={<SkillDetailPage/>}/><Route path="notes" element={<NotesPage/>}/><Route path="achievements" element={<AchievementsPage/>}/><Route path="profile" element={<ProfilePage/>}/></Route></Route><Route path="*" element={<Navigate to="/" replace/>}/></Routes></HashRouter></ConfigProvider></QueryClientProvider>;
}
