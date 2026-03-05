import { lazy, Suspense, memo, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'

import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HeroSection } from './components/HeroSection'
import { MarqueeSection } from './components/MarqueeSection'
import { AboutSection } from './components/AboutSection'
import { ServicesSection } from './components/ServicesSection'
import { BusinessGrowthSection } from './components/BusinessGrowthSection'
import { PerformanceSection } from './components/PerformanceSection'
import { ClientsSection } from './components/ClientsSection'
import { WhyChooseSection } from './components/WhyChooseSection'
import { PartnersSection } from './components/PartnersSection'
import { ReadyToGrowSection } from './components/ReadyToGrowSection'
import { CertificationsSection } from './components/CertificationsSection'
import { FAQSection } from './components/FAQSection'

import { AdminProvider, useAdmin } from '../contexts/AdminContext'
import { AdminToolbar } from '../components/AdminToolbar'
import { AdminLogin } from '../components/AdminLogin'
import { FastAdmin } from '../components/admin/FastAdmin'
import { ImprovedAdminDashboard as AdminDashboard } from '../components/admin/ImprovedAdminDashboard'
import { PageRenderer } from '../components/PageRenderer'

import { Toaster } from 'sonner'

/* ---------- Lazy Loaded Pages ---------- */

const ContentMarketingPage = lazy(() =>
  import('./services/content-marketing/ContentMarketingPage').then(m => ({
    default: m.ContentMarketingPage,
  }))
)

const GoogleAdsPage = lazy(() =>
  import('./services/google-ads/GoogleAdsPage').then(m => ({
    default: m.GoogleAdsPage,
  }))
)

const MetaAdsPage = lazy(() =>
  import('./services/meta-ads/MetaAdsPage').then(m => ({
    default: m.MetaAdsPage,
  }))
)

const ShopifyPage = lazy(() =>
  import('./services/shopify/ShopifyPage').then(m => ({
    default: m.ShopifyPage,
  }))
)

const SocialMediaPage = lazy(() =>
  import('./services/social-media/SocialMediaPage').then(m => ({
    default: m.SocialMediaPage,
  }))
)

const BuildABrandPage = lazy(() =>
  import('./services/build-a-brand/BuildABrandPage').then(m => ({
    default: m.BuildABrandPage,
  }))
)

const ServicesPage = lazy(() =>
  import('./services/ServicesPage').then(m => ({
    default: m.ServicesPage,
  }))
)

/* ---------- Loader ---------- */

const PageLoader = memo(() => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-[#4A90E2] border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-gray-500">Loading...</p>
    </div>
  </div>
))

/* ---------- Page Wrapper ---------- */

const PageWrapper = memo(({ children }: { children: React.ReactNode }) => {
  const { isAdmin } = useAdmin()
  const navigate = useNavigate()

  const handleNavigate = (page: string) => {
    const routes: Record<string, string> = {
      home: '/',
      services: '/services',
      'content-marketing': '/content-marketing',
      'google-ads': '/google-ads',
      'meta-ads': '/meta-ads',
      shopify: '/shopify-development',
      'social-media': '/social-media-marketing',
      'build-a-brand': '/branding-pr',
    }

    navigate(routes[page] || '/')
  }

  return (
    <>
      <AdminToolbar />

      <div
        className="min-h-screen bg-white"
        style={isAdmin ? { paddingTop: '48px' } : {}}
      >
        <Header onNavigate={handleNavigate} />

        <Suspense fallback={<PageLoader />}>{children}</Suspense>

        <Footer />
      </div>
    </>
  )
})

/* ---------- Home Page ---------- */

const HomePage = memo(() => {
  const navigate = useNavigate()

  const handleNavigate = (page: string) => {
    const routes: Record<string, string> = {
      home: '/',
      services: '/services',
      'content-marketing': '/content-marketing',
      'google-ads': '/google-ads',
      'meta-ads': '/meta-ads',
      shopify: '/shopify-development',
      'social-media': '/social-media-marketing',
      'build-a-brand': '/branding-pr',
    }

    navigate(routes[page] || '/')
  }

  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection onNavigate={handleNavigate} />
      <BusinessGrowthSection />
      <PerformanceSection />
      <ClientsSection />
      <WhyChooseSection />
      <PartnersSection />
      <ReadyToGrowSection />
      <CertificationsSection />
      <FAQSection />
    </>
  )
})

/* ---------- Main Routes ---------- */

function AppRoutes() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const hash = window.location.hash
    if (hash === '#admin-login') navigate('/admin-login')
  }, [navigate])

  if (location.pathname === '/fast-admin') return <FastAdmin />
  if (location.pathname === '/fast-admin/dashboard') return <AdminDashboard />
  if (location.pathname === '/admin-login') return <AdminLogin />

  return (
    <PageWrapper>
      <Routes>
        {/* Static pages */}
        <Route path="/" element={<HomePage />} />

        <Route path="/services" element={<ServicesPage />} />
        <Route path="/content-marketing" element={<ContentMarketingPage />} />
        <Route path="/google-ads" element={<GoogleAdsPage />} />
        <Route path="/meta-ads" element={<MetaAdsPage />} />
        <Route path="/shopify-development" element={<ShopifyPage />} />
        <Route path="/social-media-marketing" element={<SocialMediaPage />} />
        <Route path="/branding-pr" element={<BuildABrandPage />} />

        {/* CMS Dynamic Pages */}
        <Route path="/:slug" element={<PageRenderer />} />
      </Routes>
    </PageWrapper>
  )
}

/* ---------- App Content ---------- */

function AppContent() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/fast-admin" element={<FastAdmin />} />
          <Route path="/fast-admin/dashboard" element={<AdminDashboard />} />

          <Route path="/*" element={<AppRoutes />} />
        </Routes>
      </BrowserRouter>

      <Toaster position="top-center" richColors closeButton />
    </>
  )
}

/* ---------- Root ---------- */

export default function App() {
  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  )
}