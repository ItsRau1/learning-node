import { createServer } from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import { ExtractQueryParams } from "./utils/extract-query-params.js";



const server = createServer(async (req, res)=>{
    const { method, url } = req;

    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })
    
    if (route) {
        const RouteParams = req.url.match(route.path)

        const { query, ...params } = RouteParams.groups

        req.params = params
        req.query = query ? ExtractQueryParams(query) : {}

        return route.handler(req, res);
    }

    return res.writeHead(404).end()
})

server.listen(3333)