
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { SportType } from './types';

import HomePage from './pages/HomePage';
import PickupActivitiesPage from './pages/PickupActivitiesPage';
import ActivityDetailPage from './pages/ActivityDetailPage';
import MyActivitiesPage from './pages/MyActivitiesPage';
import MyCourseDetailPage from './pages/MyCourseDetailPage';
import VenueBookingDetailPage from './pages/VenueBookingDetailPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import WalletPage from './pages/WalletPage';
import NotificationsPage from './pages/NotificationsPage';
import ChatPage from './pages/ChatPage';
import SettingsPage from './pages/SettingsPage';
import VenueSelectionPage from './pages/VenueSelectionPage';
import VenueRentalPage from './pages/VenueRentalPage';
import VenueReservationPage from './pages/VenueReservationPage';
import DistrictSelectionPage from './pages/DistrictSelectionPage';
import PaymentPage from './pages/PaymentPage';
import StorePage from './pages/StorePage';
import CoursesPage from './pages/CoursesPage';
import TeamDetailPage from './pages/TeamDetailPage';
import FamilyManagementPage from './pages/FamilyManagementPage';
import LeaveRequestPage from './pages/LeaveRequestPage';
import LocationSelectionPage from './pages/LocationSelectionPage';
import TeamClassListPage from './pages/TeamClassListPage';
import CourseBookingDetailPage from './pages/CourseBookingDetailPage';

import BottomNav from './components/BottomNav';
import Toast from './components/Toast';

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedSport, setSelectedSport] = useState<SportType>('all');
  const [currentDistrict, setCurrentDistrict] = useState<string>('台北市 大安區');
  const [selectedVenueName, setSelectedVenueName] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const isChatRoute = location.pathname.startsWith('/chat/');
  const isPaymentRoute = location.pathname === '/payment';
  const isLeaveRoute = location.pathname.startsWith('/leave/');
  const isDetailRoute = location.pathname.startsWith('/my/course/') || location.pathname.startsWith('/my/venue/') || location.pathname.startsWith('/activity/');
  const isFullPage = location.pathname === '/profile/edit' || location.pathname === '/wallet' || location.pathname === '/family';
  const isBookingFlow = location.pathname.includes('/locations') || location.pathname.includes('/location/') || location.pathname.startsWith('/class/');
  
  const showNav = !isChatRoute && !isPaymentRoute && !isLeaveRoute && !isDetailRoute && !isFullPage && !location.pathname.startsWith('/team/') && !isBookingFlow;

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white overflow-hidden relative shadow-2xl font-['Noto_Sans_TC']">
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<HomePage currentDistrict={currentDistrict} />} />
          <Route path="/select-district" element={<DistrictSelectionPage currentDistrict={currentDistrict} onSelect={(d) => { setCurrentDistrict(d); navigate(-1); }} />} />
          <Route path="/pickup-venues" element={<VenueSelectionPage currentDistrict={currentDistrict} onSelect={(venue) => { setSelectedVenueName(venue); navigate('/pickup-activities'); }} />} />
          <Route path="/pickup-activities" element={<PickupActivitiesPage selectedSport={selectedSport} onSelectSport={setSelectedSport} selectedVenue={selectedVenueName || currentDistrict} />} />
          <Route path="/venues" element={<VenueRentalPage currentDistrict={currentDistrict} />} />
          <Route path="/reserve-venue" element={<VenueReservationPage showToast={showToast} />} />
          <Route path="/payment" element={<PaymentPage showToast={showToast} />} />
          <Route path="/store" element={<StorePage showToast={showToast} />} />
          <Route path="/courses" element={<CoursesPage currentDistrict={currentDistrict} showToast={showToast} />} />
          <Route path="/team/:id" element={<TeamDetailPage showToast={showToast} />} />
          <Route path="/team/:id/locations" element={<LocationSelectionPage />} />
          <Route path="/team/:id/location/:locId/classes" element={<TeamClassListPage />} />
          <Route path="/class/:classId" element={<CourseBookingDetailPage />} />
          <Route path="/activity/:id" element={<ActivityDetailPage onJoin={() => navigate('/my')} />} />
          <Route path="/my" element={<MyActivitiesPage />} />
          <Route path="/my/course/:id" element={<MyCourseDetailPage />} />
          <Route path="/my/venue/:id" element={<VenueBookingDetailPage />} />
          <Route path="/leave/:id" element={<LeaveRequestPage showToast={showToast} />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfilePage showToast={showToast} />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/family" element={<FamilyManagementPage showToast={showToast} />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/chat/:id" element={<ChatPage />} />
          <Route path="/settings" element={<SettingsPage showToast={showToast} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      {showNav && <BottomNav activePath={location.pathname} />}
      <Toast message={toastMessage} />
    </div>
  );
};

const App: React.FC = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
