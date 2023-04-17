import { test } from "tap";
import { build } from "../../helpers/helper";

test("List article API", async (t) => {
  t.plan(1);

  const fastify = await build(t);

  const res = await fastify.inject({
    method: "GET",
    path: "api/public/v1/articles",
  });

  t.equal(res.statusCode, 200);
});
