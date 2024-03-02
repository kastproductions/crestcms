"use client";

import React from "react";
import { Schema } from ".";
import { renderAdminUi } from "./router";

type Params = {
  schema: Schema;
  rootId?: string;
};

export function buildAdminUi(params: Params) {
  const { schema, rootId = "crest-cms-root" } = params;
  return function AdminUi() {
    const renderedOnce = React.useRef(false);
    React.useEffect(() => {
      if (renderedOnce.current) return;
      renderAdminUi({ schema, rootId });
      renderedOnce.current = true;
    }, []);
    return <div id={rootId} />;
  };
}
