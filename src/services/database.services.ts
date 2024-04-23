import { config } from 'dotenv'
import { Collection, Db, MongoClient } from 'mongodb'
import Taxe from '~/schemas/taxes.schema'

config()

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twitter.g2li5h3.mongodb.net/?retryWrites=true&w=majority&appName=Twitter`
class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }
  async connect() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      //await client.connect();

      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log(error)
      throw error
    }
    // finally {
    //   // Ensures that the client will close when you finish/error
    //   await this.client.close()
    // }
  }
  get taxes(): Collection<Taxe> {
    return this.db.collection(process.env.DB_TAXES_COLLECTION as string)
  }
}
const databaseService = new DatabaseService()

export default databaseService
