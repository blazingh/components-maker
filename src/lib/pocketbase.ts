import PocketBase from "pocketbase";

const pb = new PocketBase("http://178.18.200.119:8090");

if (process.env.NODE_ENV === "development") pb.autoCancellation(false);

export default pb;
