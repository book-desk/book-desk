import * as express from 'express';
import auth from '../middleware/auth';
import CompanyController from '../controllers/company';
const router = express.Router();
const company = new CompanyController();

router
  .post('/company', auth, company.registerCompany)
  .put('/company/:id', auth, company.updateCompany)
  .get('/company/:id', auth, company.getCompanyById)
  .get('/company', auth, company.getAllCompanies)
  .delete('/company/:id', auth, company.deleteCompany);

export default router;
