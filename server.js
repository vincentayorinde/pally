import app from './app.js'

const port = process.env.PORT || 7001
app.listen(port, () => {
  console.log(`live on port ${port} (^__^)`)
})
