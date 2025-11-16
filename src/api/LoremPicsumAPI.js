import axios from "axios";

const instance = axios.create({
  baseURL: "https://picsum.photos",
  timeout: 5000,
});

export async function getPhotosList( page ) {
  const received = await instance.get(`/v2/list?page=${page}&limit=28`);
  return received.data;
}

export async function getPhoto() {
  const received = await instance.get("/v2/list");
  return received.data;
}

export async function getDetails({ id }) {
  const received = await instance.get(`/id/${id}/info`);
  return received.data;
}