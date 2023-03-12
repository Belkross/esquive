import mongoose from "mongoose"

const schema_connections = new mongoose.Schema(
  {  
    totalRoom: Number,
    totalUser: Number,
    handshake: Object
  },
  { collection: "connections" }
)

export const modelConnections = mongoose.model("connections", schema_connections)
