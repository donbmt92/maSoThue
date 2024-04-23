import { ObjectId } from 'mongodb'
import { taxesStatus } from '~/constants/enums'

interface TaxeType {
  _id?: ObjectId
  companyName: string
  taxeCode: string
  address: string
  owner: string
  operatingDay: Date
  managed_by: string
  status: taxesStatus
  dateUpdate: Date
  created_at?: Date
  updated_at?: Date
}
export default class Taxe {
  _id?: ObjectId
  companyName: string
  taxeCode: string
  address: string
  owner: string
  operatingDay: Date
  managed_by: string
  status: taxesStatus
  dateUpdate: Date
  created_at?: Date
  updated_at?: Date

  constructor(user: TaxeType) {
    const date = new Date()
    this._id = user._id
    this.companyName = user.companyName
    this.taxeCode = user.taxeCode
    this.address = user.address
    this.owner = user.owner
    this.operatingDay = user.operatingDay || new Date()
    this.managed_by = user.managed_by
    this.status = user.status || taxesStatus.Dissolved
    this.dateUpdate = user.dateUpdate || new Date()
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
  }
}
