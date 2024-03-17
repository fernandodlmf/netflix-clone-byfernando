import axios from "axios";

const fetcher = async (url: string) =>  await axios.get(url).then((resp) => resp.data)

export default fetcher;