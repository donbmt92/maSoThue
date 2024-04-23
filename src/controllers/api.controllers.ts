/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import axios from 'axios'
import cheerio from 'cheerio'
import { NextFunction, Request, Response, response } from 'express'
import apiService from '~/services/api.services'
import databaseService from '~/services/database.services'
const checkStatus = (status: string) => {
  if (
    status === 'Ngừng hoạt động nhưng chưa hoàn thành thủ tục đóng MST' ||
    status === 'Ngừng hoạt động và đã đóng MST'
  ) {
    return 2
  } else if (status === 'Tạm nghỉ kinh doanh có thời hạn') {
    return 0
  } else {
    return 1
  }
}
const searchInfo = async (req: Request) => {
  try {
    const response = await axios.get(`https://masothue.com/Search/?q=${req}&type=auto`)
    const html = response.data
    const $ = cheerio.load(html)

    const extractedData: any = {}
    const companyName = $('th span.copy').text().trim()

    $('tr').each((index, element) => {
      const key = $(element).find('td').eq(0).text().trim()
      let value = $(element).find('td').eq(1).find('.copy').text().trim()

      if (!value) {
        value = $(element).find('td').eq(1).text().trim()
      }

      extractedData[key] = value
    })

    if (!extractedData['Mã số thuế']) return
    const updateTime = $('td em').text().trim()
    const final_data = {
      companyName: companyName,
      taxeCode: extractedData['Mã số thuế'],
      address: extractedData['Địa chỉ'],
      owner: extractedData['Người đại diện'].replace(' Ẩn thông tin', ''),
      operatingDay: extractedData['Ngày hoạt động'],
      managed_by: extractedData['Quản lý bởi'],
      status: checkStatus(extractedData['Tình trạng']),
      dateUpdate: updateTime
    }

    return final_data
  } catch (error) {
    console.error('Đã xảy ra lỗi:', error)
    throw error
  }
}
export const searchController = async (req: Request, res: Response) => {
  const taxeCode = req.body.tax

  const companyInfo = await searchInfo(taxeCode)

  if (!companyInfo) return res.json({ message: 'cant find company' })

  return res.json({
    message: 'search Success',
    companyInfo
  })
}
export const getController = async (req: Request, res: Response) => {
  const result = await apiService.getTaxes()
  return res.json({
    result
  })
}
export const getTaxeController = async (req: Request, res: Response) => {
  const _id = req.params
  const result = await apiService.getTaxe(_id as any)
  return res.json({
    result
  })
}

export const uploadController = async (req: Request, res: Response, next: NextFunction) => {
  req.companyInfo = req.body
  const result = await apiService.uploadTaxes(req.body)
  return res.json({
    message: 'Success',
    result
  })
}
export const deleteController = async (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.id
  const result = await apiService.deleteTaxe(_id)

  return res.json({
    message: 'Update Success',
    result
  })
}
export const updateController = async (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.id
  const data = req.body
  console.log(data)

  const result = await apiService.updateTaxe(_id, data)
  return res.json({
    message: 'Update Success',
    result
  })
}
