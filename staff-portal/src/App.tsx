import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import FormElements from './pages/Form/FormElements';
import LabBook from './pages/Form/LabBook';
import LabCancel from './pages/Form/LabCancel';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Dashboard from './pages/Dashboard/Dashboard';
import Inventory from './pages/Inventory/Inventory';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Sign In | CO2 Lab Booking System | Staff Portal" />
              <SignIn/>
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="Dashboard | CO2 Lab Booking System | Staff Portal" />
              <Dashboard />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | CO2 Lab Booking System | Staff Portal" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | CO2 Lab Booking System | Staff Portal" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | CO2 Lab Booking System | Staff Portal" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/booking/lab-booking"
          element={
            <>
              <PageTitle title="Lab Booking | CO2 Lab Booking System | Staff Portal" />
              <LabBook />
            </>
          }
        />
        <Route
          path="/booking/lab-cancel"
          element={
            <>
              <PageTitle title="Lab Cancelling | CO2 Lab Booking System | Staff Portal" />
              <LabCancel />
            </>
          }
        />
        <Route
          path="/inventory"
          element={
            <>
              <PageTitle title="Inventory | CO2 Lab Booking System | Staff Portal" />
              <Inventory />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | CO2 Lab Booking System | Staff Portal" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | CO2 Lab Booking System | Staff Portal" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | CO2 Lab Booking System | Staff Portal" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | CO2 Lab Booking System | Staff Portal" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | CO2 Lab Booking System | Staff Portal" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | CO2 Lab Booking System | Staff Portal" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | CO2 Lab Booking System | Staff Portal" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
