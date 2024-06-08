import 'dotenv/config'
import web from './middleware/web'
const port: number =
  process.env.PORT != null ? parseInt(process.env.PORT) : 3000

const URL = process.env.URL != null ? process.env.URL : 'http://localhost'

web.listen(port, () => {
  console.log(`app running on ${URL}:${port}`)
})