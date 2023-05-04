import { createServer } from "node:http"
import { Transform } from "node:stream"

class InverseNumber extends Transform {
    _transform (chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        console.log(transformed)

        callback(null, Buffer.from(String(transformed)))
    }
}

const server = createServer(async (req, res) => {
    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    const fullStreamsContent = Buffer.concat(buffers).toString()

    console.log(fullStreamsContent)

    return res.end(fullStreamsContent)


    // return req
    //     .pipe(new InverseNumber())
    //     .pipe(res)
})

server.listen(3334)