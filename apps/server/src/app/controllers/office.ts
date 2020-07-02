import { Response, Request } from 'express';
import Office, { OfficeSchema } from '../models/office';

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

  registerOffice = async (req, res) => {
    try {
      const office = new Office({
        ...req.body,
        companyId: req.params.companyId,
      });

      this.createWorkplaces(office, req.body.countOfNewPlaces);
      await office.save();

      res.status(201).send(office);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  async updateOffice(req, res) {
    const updates = Object.keys(req.body).filter((el) => !(el === 'id'));
    const allowedUpdates = ['name', 'logo', 'admin', 'city', 'address'];
    const isValidOperation = updates.every((u) => allowedUpdates.includes(u));

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
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
        return res.status(404).send();
      }

      res.status(200).send(doc);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async getAllCompanyOffices(req: Request, res: Response) {
    try {
      const offices = await Office.find({
        companyId: req.params.companyId,
      });

      res.send(offices);
    } catch (e) {
      res.status(500).send(e);
    }
  }
  async getOfficeById(req: Request, res: Response) {
    try {
      const office = await Office.findById(req.params.officeId);
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
      const office = await Office.findByIdAndDelete(req.params.officeId);
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
