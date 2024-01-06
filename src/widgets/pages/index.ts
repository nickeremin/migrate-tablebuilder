/*
  This is a section consisting of components that were then used on finished pages. 
  I found it convenient to work on separating the parts here, 
  although you could make them all mostly monolithic pages without separation.
*/

import { HomePreview } from "../layout/tables-preview"
import OrganizationGeneralSettings from "./dashboard/settings/organization-general-settings"
import OrganizationMembersTable from "./dashboard/settings/organization-members-table"
import UserGeneralSettings from "./dashboard/settings/user-general-settings"
import UserOrganizations from "./dashboard/settings/user-organizations"
import OrganizationTables from "./dashboard/tables/organization-tables"
import UserTables from "./dashboard/tables/user-tables"
import HomeImage from "./home/home-image"
import HomeTestimonials from "./home/home-testimonials"
import HomeTimeline from "./home/home-timeline"
import HomeTrial from "./home/home-trial"

export {
  HomePreview,
  HomeImage,
  HomeTestimonials,
  HomeTimeline,
  HomeTrial,
  UserGeneralSettings,
  UserOrganizations,
  OrganizationGeneralSettings,
  OrganizationTables,
  UserTables,
  OrganizationMembersTable,
}
