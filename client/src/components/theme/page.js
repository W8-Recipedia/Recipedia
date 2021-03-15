import React, { forwardRef } from "react";
import { Helmet } from "react-helmet";

const Page = forwardRef(({ children, title = "", ...rest }, ref) => {
  return (
    <div ref={ref} {...rest}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
});

export default Page;
