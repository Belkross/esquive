import { Io } from "../../types/server.js"
import { instrument } from "@socket.io/admin-ui"
import bcrypt from "bcrypt"

export function connectAdminUi(io: Io) {
  instrument(io, {
    auth: {
      type: "basic",
      username: "admin",
      password: bcrypt.hashSync(process.env.ADMIN_UI_PASSWORD || "admin", 10),
    },
  })
}
