import express, { Express, Request, Response } from "express";

const app: Express = express();

app.use(express.json({ limit: "50mb" }));

const port = process.env.PORT || 8080;

const addWalletToConversation = async (walletAddress: string) => {
  // Here you can put your logic to determine
  // if the wallet should be allowed in group,
  // add the user to the group, and return true if you did
  return true;
};

app.use("/webhook", async (req: Request, res: Response) => {
  const { groupLinkId, topic, walletAddress } = req.body;
  console.log(
    `Received a join query for topic ${topic} - wallet ${walletAddress}`
  );

  if (await addWalletToConversation(walletAddress)) {
    // To allow, just send { status: "SUCCESS" }
    res.json({ status: "SUCCESS" });
  } else {
    // To deny, just send { status: "FORBIDDEN", reason: <string> }
    res.json({
      status: "DENIED",
      reason: "You do not hold enough Degen token",
    });
  }
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
