import 'dotenv/config'
import web from './middleware/web'
const port: number =
  process.env.PORT != null ? parseInt(process.env.PORT) : 3000

const BE_URL = process.env.BE_URL != null ? process.env.BE_URL : 'http://localhost'

web.listen(port, () => {
  console.log(`app running on ${BE_URL}:${port}`)
})