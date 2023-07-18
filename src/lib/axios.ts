import axios from "axios"

const jobInstance = axios.create({
  baseURL: "https://jobify-prod.herokuapp.com/api/v1/toolkit",
})

export default jobInstance
