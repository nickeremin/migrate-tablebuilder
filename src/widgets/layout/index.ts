/*
  This section consists of components 
  that are used in the layout of different pages, 
  for example in the header, footer, nav, etc.
*/

import FallbackComponent from "./fallback-component"
import SiteFooter from "./footers/site-footer"
import AuthHeader from "./headers/auth-header"
import DashboardHeader from "./headers/dashboard/dashboard-header"
import TableHeader from "./headers/dashboard/table-header"
import HomeHeader from "./headers/home-header"
import VerificationHeader from "./headers/verification-header"
import DashboardNav from "./navs/dashboard-nav"
import DesktopNavbar from "./navs/desktop-navbar"
import MobileNavMenu from "./navs/mobile-nav-menu"
import { OrganizationSettingsNav, UserSettingsNav } from "./navs/settings-nav"
import StarsBackground from "./stars-background"
import { TrialPreveiw } from "./tables-preview"

export {
  FallbackComponent,
  SiteFooter,
  HomeHeader,
  AuthHeader,
  VerificationHeader,
  DashboardHeader,
  MobileNavMenu,
  StarsBackground,
  TrialPreveiw,
  TableHeader,
  DashboardNav,
  DesktopNavbar,
  OrganizationSettingsNav,
  UserSettingsNav,
}
