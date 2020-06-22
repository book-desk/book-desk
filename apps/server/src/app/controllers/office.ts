import { Response, Request } from 'express';
import Office, { OfficeSchema } from '../models/office';

class OfficeController {
  createWorkplaces(office: OfficeSchema, countOfNewPlaces: number) {
    return new Array(countOfNewPlaces).fill(1).forEach((el, i) => {
      console.log(i, '+_+_+_+_+__+_+_');

      office.workplaces.push({
        placeNumber: i + 1,
        // name: generateRandomName, This should be functionality for generating funny roomName
        bookedDates: {},
        availability: true,
      });
    });
  }

  registerOffice = async (req, res) => {
    try {
      const office = new Office({
        ...req.body,
        companyId: req.params.companyId,
      });
      const workPlaces = this.createWorkplaces(
        office,
        req.body.countOfNewPlaces
      );
      await office.save();

      res.status(201).send(office);
    } catch (error) {
      console.log(error);

      res.status(400).send(error);
    }
  };

  async updateOffice(req, res) {
    const updates = Object.keys(req.body).filter((el) => !(el === 'id'));
    const allowedUpdates = ['name', 'logo'];
    const isValidOperation = updates.every((u) => allowedUpdates.includes(u));

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
      const company = await Office.findByIdAndUpdate(req.params.id, req.body, {
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

  async getAllCompanyOffices(req: Request, res: Response) {
    try {
      const offices = await Office.find({ companyId: req.params.companyId });

      res.send(offices);
    } catch (e) {
      res.status(500).send(e);
    }
  }
  async getOfficeById(req: Request, res: Response) {
    try {
      const office = await Office.findById(req.params.id);
      if (!office) {
        return res.status(404).send();
      }

      res.status(200).send(office);
    } catch (e) {
      res.status(400).send(e);
    }
  }

  async deleteOffice(req, res) {
    try {
      const office = await Office.findByIdAndDelete(req.params.id);
      if (!office) {
        return res.status(404).send();
      }
      res.send(office);
    } catch (e) {
      res.status(500).send(e);
    }
  }
}

export default OfficeController;
