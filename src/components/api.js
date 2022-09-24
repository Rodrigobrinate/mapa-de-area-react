import axios from "axios";

let api 

export default  api = axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        //baseURL: "http://172.17.0.6:6868"
      });
