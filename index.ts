import { Hono } from "hono";
import { logger } from 'hono/logger'
import { createHeadlessEditor } from '@lexical/headless';
import { JSDOM } from "jsdom"
import { $generateNodesFromDOM } from "@lexical/html";
import { $getRoot, $getSelection } from "lexical";

const app = new Hono();
app.use(logger())

app.get("/healthcheck", (c) => c.text("ok"));
app.post("/html_to_json", async (c) => {
  const body = await c.req.text();

  const editor = createHeadlessEditor({
    nodes: [],
    onError: (e) => {
      console.error(e);
    },
  });
  await editor.update(() => {
    const dom = new JSDOM(body);
    const nodes = $generateNodesFromDOM(editor, dom.window.document);
    $getRoot().select();
    const selection = $getSelection();
    selection?.insertNodes(nodes);
  });

  return c.json(editor.getEditorState().toJSON())
});

export default app;
