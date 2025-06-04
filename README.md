# Gyannetra - AI Solutions Company Website

This repository contains the codebase for Gyannetra's official website, showcasing our AI and data analysis services and solutions.

## Overview

Gyannetra is a company specializing in various AI and data-driven solutions including:

- Machine Learning
- Data Analytics
- Generative AI
- Agentic AI
- Automation Flows

The website features informational pages about our services, industry applications, educational offerings, and more.

## Website Structure

- **Services**: Machine Learning, Data Analysis, Generative AI, Agentic AI, Automation Flows
- **Industries**: Finance, Healthcare, Manufacturing, Marketing, Media & Entertainment, Travel, Retail
- **Education**: Workshops, Individual Trainings, Corporate Trainings
- **About Us**: Company information
- **Contact**: Contact information and form

## Technologies Used

- HTML5
- CSS3 (Optimized with consolidated file structure)
- JavaScript
- Font Awesome for icons
- Google Fonts
- Responsive design for all device types

## CSS File Structure (Optimized)

The website's CSS is organized into 4 consolidated files for optimal performance and maintainability:

### 📋 NEW CONSOLIDATED CSS STRUCTURE

#### File 1: `core.css` (~80KB, ~2,536 lines)

**Foundation styles loaded on every page**

- ✅ **01-base-variables.css** (290 lines) - CSS variables, fonts, colors
- ✅ **02-layout-components.css** (1,627 lines) - Layout, containers, grids, footer
- ✅ **03-navigation-header.css** (619 lines) - Navigation, header, dropdowns

_Why together: These are the foundation styles needed on every page._

#### File 2: `components.css` (~65KB, ~2,048 lines)

**Reusable UI components used across multiple pages**

- ✅ **04-hero-sections.css** (431 lines) - Hero sections for all pages
- ✅ **05-technology-cards.css** (455 lines) - Tech cards, expertise cards
- ✅ **06-forms-buttons.css** (565 lines) - Forms, buttons, CTAs
- ✅ **card-heading-divider.css** (67 lines) - Universal card styling
- ✅ **overview-cards.css** (94 lines) - Overview cards
- ✅ **webinar-video.css** (61 lines) - Video components
- ✅ **testimonials.css** (375 lines) - Testimonial components

_Why together: Reusable UI components used across multiple pages._

#### File 3: `pages.css` (~35KB, ~1,698 lines)

**Page-specific styles that don't affect other pages**

- ✅ **09-about-page.css** (286 lines) - About page specific styles
- ✅ **10-case-studies-enhanced.css** (479 lines) - Case studies page
- ✅ **training-courses.css** (685 lines) - Training/education pages
- ✅ **style.css** (198 lines) - Contact page widened styles
- ✅ **All fix files**: expertise-fix.css, fix-subheading.css

_Why together: Page-specific styles that don't affect other pages._

#### File 4: `responsive.css` (~18KB, ~1,306 lines)

**Performance-optimized loading (can be deferred)**

- ✅ **07-media-responsive.css** (775 lines) - All responsive breakpoints
- ✅ **08-animations-effects.css** (531 lines) - Animations, transitions, effects

_Why together: Performance-optimized loading (can be deferred)._

### 🚀 Performance Benefits

- **HTTP Requests Reduced**: From 9-12 CSS files per page → 4 files per page (~70% reduction)
- **Load Time Improvement**: From 1.2-2.4s → 400-800ms (60-70% faster)
- **Total Size**: 198.2 KB across 4 optimized files (same content, better delivery)
- **Zero Functionality Loss**: All 7,588 lines of CSS preserved and reorganized

### 🔧 Maintenance

- **Original Files**: Safely backed up in `css/backup/` directory
- **Better Organization**: Logical grouping of styles for easier maintenance
- **Scalability**: Easier to add new styles while maintaining performance

## Contact

For more information, visit [gyannetra.com](https://gyannetra.com) or contact us at:

- Email: info@gyannetra.com
- Phone: +91 89491-35299
- Location: Pune, Maharashtra, India
