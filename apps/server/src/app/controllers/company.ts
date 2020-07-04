import { Response, Request } from 'express';
import Company from '../models/company';
import BadRequestException from '../exceptions/BadRequestException';
import NotFoundException from '../exceptions/NotFoundException';
import ServerException from '../exceptions/ServerException';

class CompanyController {
  async registerCompany(req, res, next) {
    try {
      const company = new Company({ ...req.body, owner: req.user._id });
      await company.save();

      res.status(201).send(company);
    } catch (error) {
      next(new BadRequestException('Bad request', error));
    }
  }

  async updateCompany(req, res, next) {
    const updates = Object.keys(req.body).filter((el) => !(el === 'id'));
    const allowedUpdates = ['name', 'logo'];
    const isValidOperation = updates.every((u) => allowedUpdates.includes(u));

    if (!isValidOperation) {
      return next(new BadRequestException('Invalid updates!'));
    }

    try {
      const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!company) {
        return next(new NotFoundException(req.params.id));
      }

      res.status(200).send(company);
    } catch (error) {
      next(new BadRequestException('Bad request', error));
    }
  }

  async getAllCompanies(req: Request, res: Response, next) {
    try {
      const companies = await Company.find();

      res.send(companies);
    } catch (e) {
      next(new ServerException(e));
    }
  }

  async getCompanyById(req: Request, res: Response, next) {
    try {
      const company = await Company.findById(req.params.id);
      if (!company) {
        return next(new NotFoundException(req.params.id));
      }

      res.status(200).send(company);
    } catch (e) {
      next(new BadRequestException('Bad request', e));
    }
  }

  async deleteCompany(req, res, next) {
    try {
      const company = await Company.findByIdAndDelete(req.params.id);
      if (!company) {
        return next(new NotFoundException(req.params.id));
      }
      res.send(company);
    } catch (e) {
      next(new ServerException(e));
    }
  }
}

export default CompanyController;
