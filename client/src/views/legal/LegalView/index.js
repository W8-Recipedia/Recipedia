import React from "react";
import {
  Card,
  CardHeader,
  Container,
  CardContent,
  Typography,
  Divider,
  makeStyles,
  Box,
} from "@material-ui/core";
import Page from "src/components/Page";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const LegalView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Recipedia | Legal">
      <Container maxWidth="lg">
        <Card>
          <CardHeader title="Terms and Conditions" />
          <Divider />
          <CardContent>
            <Box pb={2}>
              <Typography>
                PLEASE READ THESE TERMS OF USE CAREFULLY BEFORE USING THIS
                WEBSITE
              </Typography>
            </Box>
            <Box pb={2}>
              <Typography>
                Welcome to the Recipedia website (“Site”). Recipedia maintains
                this Site to provide general information to our visitors. All
                use of this Site is subject to the following terms and
                conditions. By accessing and browsing this Site, you agree to be
                bound by these terms and conditions.
              </Typography>
            </Box>
            <Box pb={2}>
              <Typography>
                Copyright. This Site, including all text, images, software, and
                other content contained herein, is the property of Recipedia or
                its suppliers and is protected by international copyright laws.
                The compilation and arrangement of all content on this Site is
                the exclusive property of Recipedia and is protected by
                international copyright laws. All rights reserved.
              </Typography>
            </Box>
            <Box pb={2}>
              <Typography>
                Trademarks. All Recipedia marks, graphics, photographs, logos,
                designs and trade names used and displayed on this site are
                service marks or trademarks of Recipedia and are the sole and
                exclusive property of Recipedia. The “look and feel” of this
                Site constitutes proprietary trade dress of Recipedia. All other
                trademarks not owned by Recipedia that appear on this Site are
                the property of their respective owners. You may not use any
                such marks for any purpose whatsoever without the express prior
                written permission of the owner.
              </Typography>
            </Box>
            <Box pb={2}>
              <Typography>
                Use of Site; Restrictions. You may view and print material
                displayed on this Site subject to the following conditions: (a)
                the materials may be used solely for your own, personal
                information and not for commercial use; and (b) you must retain
                without modification all copyright, trademark and other
                proprietary notices affixed to or contained in the materials you
                print and all copies thereof. You may not copy or otherwise use
                this Site or any portion hereof, except as expressly provided
                above. You may not reproduce, download, republish, frame,
                transmit, distribute, sell, license, modify, alter, reverse
                engineer or prepare derivative works from this Site or any
                portion hereof, except with the express prior written permission
                of Recipedia. Use of data mining, robots and similar data
                gathering and extraction tools is expressly prohibited. Links to
                this Site should not be made without the express prior written
                permission of Recipedia. Nothing contained in this Site shall be
                construed as conferring by implication, estoppel or otherwise
                any license or right under any copyright, patent, trademark or
                other proprietary interest of Recipedia or any third party. Any
                rights not expressly granted herein are reserved.
              </Typography>
            </Box>
            <Box pb={2}>
              <Typography>
                No Rendering of Advice. The information contained in or made
                available through this Site is provided for informational
                purposes only and should not be construed as rendering
                consulting, design, or other professional advice of any kind.
                Your use of this Site does not give rise to a client, advisory,
                fiduciary, or professional services relationship between you and
                Recipedia.{" "}
              </Typography>
            </Box>

            <Box pb={2}>
              <Typography>
                Accuracy of Information. While Recipedia uses reasonable efforts
                to furnish accurate and up-to-date information, Recipedia does
                not warrant that any information contained in or made available
                through this Site (including, without limitation, any
                information provided directly by representatives of Recipedia)
                is accurate, complete, reliable, current or error-free.
                Recipedia assumes no liability or responsibility for any errors
                or omissions in the content of this Site or such other materials
                or communications.{" "}
              </Typography>
            </Box>
            <Box pb={2}>
              <Typography>
                Disclaimer of Warranties and Limitations of Liability. THIS SITE
                IS PROVIDED BY RECIPEDIA ON AN “AS IS” AND “AS AVAILABLE” BASIS.
                USE OF THIS SITE IS AT YOUR SOLE RISK. TO THE FULL EXTENT
                PERMISSIBLE BY APPLICABLE LAW, RECIPEDIA AND ITS AFFILIATES AND
                SUPPLIERS DISCLAIM ALL WARRANTIES, WHETHER EXPRESS OR IMPLIED,
                INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF
                MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND
                NONINFRINGEMENT. WITHOUT LIMITING THE FOREGOING, RECIPEDIA AND
                ITS AFFILIATES AND SUPPLIERS MAKE NO REPRESENTATIONS OR
                WARRANTIES OF ANY KIND AS TO THE OPERATION OR AVAILABILITY OF
                THIS SITE OR THE INFORMATION, CONTENT, MATERIALS, PRODUCTS OR
                SERVICES INCLUDED ON OR MADE AVAILABLE THROUGH THIS SITE.
                RECIPEDIA DOES NOT WARRANT THAT THIS SITE WILL BE UNINTERRUPTED
                OR SECURE, OR THAT THIS SITE IS FREE OF VIRUSES OR OTHER HARMFUL
                COMPONENTS. Links to Third Party Websites. For your convenience,
                this Site may provide hyperlinks to websites and servers
                maintained by third parties. Recipedia does not control,
                evaluate, endorse or guarantee content found in such sites.
                Recipedia does not assume any responsibility or liability for
                the actions, products, services or content of these sites or the
                parties that operate them. You should carefully review their
                privacy statements and other conditions of use. Your use of
                these sites is entirely at your own risk.
              </Typography>
            </Box>
            <Box pb={2}>
              <Typography>
                Feedback and Other Submissions. All comments, feedback,
                suggestions, ideas and similar submissions furnished to
                Recipedia in connection with your use of this Site shall be
                deemed assigned to and shall remain the property of Recipedia.
                No such submissions shall be subject to any obligation of
                confidence on the part of Recipedia, and Recipedia shall be
                entitled to unrestricted use and disclosure of such submissions
                throughout the world for any purpose whatsoever, commercial or
                otherwise, without any obligation to compensate you for such use
                or disclosure. You represent that you have the lawful right to
                furnish such submissions to Recipedia and agree that you will
                not submit any information unless you are legally entitled to do
                so. Termination or Suspension of Access; Modifications to Site.
                Recipedia reserves the right to terminate, suspend or otherwise
                restrict your access to this Site, or any portion hereof, with
                or without notice at any time for any reason whatsoever
                including, but not limited to, your violation of these terms and
                conditions or any inappropriate or unlawful behavior on your
                part. In addition, Recipedia reserves the right to modify or
                discontinue this Site or any portion hereof at any time with or
                without notice. Recipedia shall not be liable to you or any
                third party for any such termination, suspension, restriction,
                modification or discontinuance.
              </Typography>
            </Box>
            <Box pb={2}>
              <Typography>
                Modifications. Recipedia reserves the right to modify these
                terms and conditions at any time upon posting. By continuing to
                use this Site after any changes are posted, you acknowledge your
                acceptance of the revised terms and conditions. Please visit
                this page regularly to review the then-current terms and
                conditions to which you are bound.
              </Typography>
            </Box>
            <Box pb={2}>
              <Typography>
                Minors. This Site is not intended for use by or availability to
                minors. IF YOU ARE NOT LEGALLY AN ADULT UNDER THE LAW WHERE YOU
                LIVE OR IF YOU ARE UNDER 13 YEARS OF AGE, YOU MAY NOT ACCESS OR
                USE THIS SITE.{" "}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

export default LegalView;
