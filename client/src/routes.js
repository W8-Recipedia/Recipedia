import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import LegalView from 'src/views/legal/LegalView';
import FAQView from 'src/views/faq/FAQView';
import FeedbackView from 'src/views/feedback/FeedbackView';
import LandingView from 'src/views/landing/LandingView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'customers', element: <CustomerListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'legal', element: <LegalView /> },
      { path: 'feedback', element: <FeedbackView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'faq', element: <FAQView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: 'legal', element: <LegalView /> },
      { path: '', element: <LandingView /> },
      { path: '*', element: <NotFoundView /> }
    ]
  }
];

export default routes;
