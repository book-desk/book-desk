import * as express from 'express';
import auth from '../middleware/auth';
import OfficeController from '../controllers/office';
const router = express.Router();
const office = new OfficeController();

//creating users by admin
router
  .post('/:companyId/office/', auth, office.registerOffice)
  // .put('/:companyId/office/:officeId', auth, office.updateCompany)
  // .get('/:companyId/office/:officeId', auth, office.getCompanyById)
  .get('/:companyId/office', auth, office.getAllCompanyOffices);
// .delete('/:companyId/office/:officeId', auth, office.deleteCompany);

export default router;
