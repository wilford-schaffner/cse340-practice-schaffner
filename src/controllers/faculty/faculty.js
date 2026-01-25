import { getFacultyById, getSortedFaculty } from '../../models/faculty/faculty.js';

// Route handler for the faculty list page
const facultyListPage = (req, res) => {
    const sortBy = req.query.sort || 'name';
    const facultyArray = getSortedFaculty(sortBy);
    
    res.render('faculty/list', {
        title: 'Faculty Directory',
        faculty: facultyArray,
        currentSort: sortBy
    });
};

// Route handler for individual faculty detail pages
const facultyDetailPage = (req, res, next) => {
    const facultyId = req.params.facultyId;
    const facultyMember = getFacultyById(facultyId);
    
    // If faculty doesn't exist, create 404 error
    if (!facultyMember) {
        const err = new Error(`Faculty member ${facultyId} not found`);
        err.status = 404;
        return next(err);
    }
    
    res.render('faculty/detail', {
        title: `${facultyMember.name} - Faculty Profile`,
        faculty: { id: facultyId, ...facultyMember }
    });
};

export { facultyListPage, facultyDetailPage };
