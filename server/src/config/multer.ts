import Multer from "multer"
import Path from "path"
import Crypto from "crypto"

export default {
    storage: Multer.diskStorage({
        destination: Path.resolve(__dirname, "..", "..", "uploads"),
        filename(request, file, callback) {
            let hash = Crypto.randomBytes(6).toString("hex")

            let filename = hash + "-" + file.originalname

            callback(null, filename)
        }
    })
}