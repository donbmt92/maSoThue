import { config } from 'dotenv'
import { ObjectId } from 'mongodb'
import Taxe from '~/schemas/taxes.schema'
import databaseService from '~/services/database.services'

config()
class APIService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async uploadTaxes(req: any) {
    try {
      const id = new ObjectId()
      const result = await databaseService.taxes.insertOne(
        new Taxe({
          _id: id,
          companyName: req.companyName,
          taxeCode: req.taxeCode,
          address: req.address,
          owner: req.owner,
          operatingDay: new Date(req.operatingDay),
          managed_by: req.managed_by,
          status: req.status,
          dateUpdate: req.dateUpdate,
          created_at: new Date(),
          updated_at: new Date()
        })
      )
      return result
    } catch (error) {
      console.log(error)
    }
  }
  async getTaxes() {
    const result = await databaseService.taxes.find().toArray()
    return result
  }
  async getTaxe(_id: any) {
    const result = await databaseService.taxes.findOne({ _id: new ObjectId(_id.id as string) })
    return result
  }

  async deleteTaxe(id: string) {
    const result = await databaseService.taxes.findOneAndDelete({
      _id: new ObjectId(id)
    })

    return result
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async updateTaxe(id: string, data: any) {
    const result = await databaseService.taxes.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          taxeCode: data.taxeCode,
          address: data.address,
          owner: data.owner,
          operatingDay: new Date(data.operatingDay),
          managed_by: data.managed_by,
          status: data.status,
          dateUpdate: data.dateUpdate
        },
        $currentDate: {
          updated_at: true
        }
      }
    )
    console.log(result)

    return result
  }
}
const apiService = new APIService()
export default apiService
