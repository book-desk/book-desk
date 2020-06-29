import * as express from 'express';
import auth from '../middleware/auth';
import CompanyController from '../controllers/company';
import { check } from 'express-validator';
const router = express.Router();
const company = new CompanyController();

router
  .post(
    '/company',
    auth,
    [check('name').exists(), check('owner').exists()],
    company.registerCompany
  )
  .put(
    '/company/:id',
    auth,
    [check('companyId').exists()],
    company.updateCompany
  )
  .get('/company/:id', auth, company.getCompanyById)
  .get('/company', auth, company.getAllCompanies)
  .delete('/company/:id', auth, company.deleteCompany);

export default router;
