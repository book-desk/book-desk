import { Response, Request } from 'express';
import Company from '../models/company';

class CompanyController {
  async registerCompany(req, res) {
    try {
      const company = new Company({ ...req.body, owner: req.user._id });
      await company.save();

      res.status(201).send(company);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async updateCompany(req, res) {
    const updates = Object.keys(req.body).filter((el) => !(el === 'id'));
    const allowedUpdates = ['name', 'logo'];
    const isValidOperation = updates.every((u) => allowedUpdates.includes(u));

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
      const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!company) {
        return res.status(404).send();
      }

      res.status(200).send(company);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async getAllCompanies(req: Request, res: Response) {
    try {
      const companies = await Company.find();

      res.send(companies);
    } catch (e) {
      res.status(500).send(e);
    }
  }
  async getCompanyById(req: Request, res: Response) {
    try {
      const company = await Company.findById(req.params.id);
      console.log(company);
      if (!company) {
        return res.status(404).send();
      }

      res.status(200).send(company);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  async deleteCompany(req, res) {
    try {
      const company = await Company.findByIdAndDelete(req.params.id);
      if (!company) {
        return res.status(404).send();
      }
      res.send(company);
    } catch (e) {
      res.status(500).send(e);
    }
  }
}

export default CompanyController;
