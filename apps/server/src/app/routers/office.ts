import * as express from 'express';
import auth from '../middleware/auth';
import OfficeController from '../controllers/office';
const router = express.Router();
const office = new OfficeController();

//TODO: creating users by admin
router
  .post('/:companyId/office/', auth, office.registerOffice)
  .put('/:companyId/office/:officeId', auth, office.updateOffice)
  .get('/:companyId/office/:officeId', auth, office.getOfficeById)
  .get('/:companyId/office', auth, office.getAllCompanyOffices)
  .delete('/:companyId/office/:officeId', auth, office.deleteOffice);

export default router;
