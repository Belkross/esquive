import { Io } from "../../types/server.js"
import { instrument } from "@socket.io/admin-ui"

export function connectAdminUi(io: Io) {
  instrument(io, {
    auth: {
      type: "basic",
      username: "admin",
      password: process.env.ADMIN_UI_PASSWORD || "admin",
    },
  })
}
