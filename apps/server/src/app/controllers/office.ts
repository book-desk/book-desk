import { Response, Request } from 'express';
import Office, { OfficeSchema } from '../models/office';
import BadRequestException from '../exceptions/BadRequestException';
import NotFoundException from '../exceptions/NotFoundException';
import ServerException from '../exceptions/ServerException';

class OfficeController {
  createWorkplaces(office: OfficeSchema, countOfNewPlaces: number) {
    return new Array(countOfNewPlaces).fill(1).forEach((el, i) => {
      office.workplaces.push({
        placeNumber: i + 1,
        // name: generateRandomName, This should be functionality for generating funny roomName
        bookedDates: {},
        availability: true,
        companyId: office.companyId,
        officeId: office.id,
      });
    });
  }

  registerOffice = async (req, res, next) => {
    try {
      const office = new Office({
        ...req.body,
        companyId: req.params.companyId,
      });

      this.createWorkplaces(office, req.body.countOfNewPlaces);
      await office.save();

      res.status(201).send(office);
    } catch (error) {
      next(new BadRequestException('Bad Exception', error));
    }
  };

  async updateOffice(req, res, next) {
    const updates = Object.keys(req.body).filter((el) => !(el === 'id'));
    const allowedUpdates = ['name', 'logo', 'admin', 'city', 'address'];
    const isValidOperation = updates.every((u) => allowedUpdates.includes(u));

    if (!isValidOperation) {
      return next(new BadRequestException('Invalid updates!'));
    }

    try {
      const doc = await Office.findByIdAndUpdate(
        req.params.officeId,
        req.body,
        {
          new: true,
        }
      );

      if (!doc) {
        return next(new NotFoundException(req.params.officeId));
      }

      res.status(200).send(doc);
    } catch (error) {
      next(new BadRequestException('Bad request', error));
    }
  }

  async getAllCompanyOffices(req: Request, res: Response, next) {
    try {
      const offices = await Office.find({
        companyId: req.params.companyId,
      });

      if (!offices) {
        return next(new NotFoundException(req.params.companyId));
      }
      res.send(offices);
    } catch (e) {
      next(new ServerException(e));
    }
  }
  async getOfficeById(req: Request, res: Response, next) {
    try {
      const office = await Office.findById(req.params.officeId);
      if (!office) {
        return next(new NotFoundException(req.params.officeId));
      }

      res.status(200).send(office);
    } catch (e) {
      next(new BadRequestException('Bad request', e));
    }
  }

  async deleteOffice(req, res, next) {
    try {
      const office = await Office.findByIdAndDelete(req.params.officeId);
      if (!office) {
        return next(new NotFoundException(req.params.officeId));
      }
      res.send(office);
    } catch (e) {
      next(new ServerException(e));
    }
  }
}

export default OfficeController;
