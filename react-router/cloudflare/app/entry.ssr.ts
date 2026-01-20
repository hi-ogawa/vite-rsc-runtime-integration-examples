import { generateHTML as defaultGenerateHTML } from "@react-router/dev/config/default-rsc-entries/entry.ssr";

export function generateHTML(
  request: Request,
  serverResponse: Response,
): Promise<Response> {
  console.log(
    "Custom SSR entry generating HTML for:",
    request.url,
  );

  return defaultGenerateHTML(request, serverResponse);
}
