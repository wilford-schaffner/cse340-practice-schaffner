import { Router } from 'express';

// Create a new router instance
const router = Router();

// Add catalog-specific styles to all catalog routes
router.use('/catalog', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/catalog.css">');
    next();
});

// Middleware: add faculty-specific styles (used by list and detail routes)
const facultyStyles = (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/faculty.css">');
    next();
};

// Add contact-specific styles to all contact routes
router.use('/contact', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/contact.css">');
    next();
});

// Add registration-specific styles to all registration routes
router.use('/register', (req, res, next) => {
    res.addStyle('<link rel="stylesheet" href="/css/registration.css">');
    next();
});

// Import controllers and middleware
import { addDemoHeaders } from '../middleware/demo/headers.js';
import { catalogPage, courseDetailPage } from './catalog/catalog.js';
import contactRoutes from './forms/contact.js';
import registrationRoutes from './forms/registration.js';
import { facultyListPage, facultyDetailPage } from './faculty/faculty.js';
import { homePage, aboutPage, demoPage, testErrorPage } from './index.js';

// Home and basic pages
router.get('/', homePage);
router.get('/about', aboutPage);

// Course catalog routes
router.get('/catalog', catalogPage);
router.get('/catalog/:slugId', courseDetailPage);

// Faculty directory routes (dynamic CSS via middleware)
router.get('/faculty', facultyStyles, facultyListPage);
router.get('/faculty/:facultySlug', facultyStyles, facultyDetailPage);

// Contact form routes
router.use('/contact', contactRoutes);

// Registration routes
router.use('/register', registrationRoutes);

// Demo page with special middleware
router.get('/demo', addDemoHeaders, demoPage);

// Route to trigger a test error
router.get('/test-error', testErrorPage);

export default router;
