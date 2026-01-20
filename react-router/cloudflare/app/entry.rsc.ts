import defaultEntry from "@react-router/dev/config/default-rsc-entries/entry.rsc";
import { RouterContextProvider } from "react-router";

export default {
  fetch(request: Request): Promise<Response> {
    console.log(
      "Custom RSC entry handling request:",
      request.url,
    );

    const requestContext = new RouterContextProvider();
    return defaultEntry.fetch(request, requestContext);
  },
};

if (import.meta.hot) {
  import.meta.hot.accept();
}
