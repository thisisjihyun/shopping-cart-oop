import { z } from "zod";

import type { NextApiRequest, NextApiResponse } from "next";
import db from "@/lib/db";
import addItemToCart from "@/services/addItemToCart";

// run time validation
const CartItemSchema = z.object({
  id: z.string().optional(),
  productId: z.string(),
  productName: z.string(),
  quantity: z.number(),
  unitPrice: z.number(),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = CartItemSchema.safeParse(req.body);

  if (!result.success) {
    return res
      .status(400)
      .json({ error: "Invalid cart item", issues: result.error.issues });
  }
  const validatedData = result.data;
  if (req.method === "PUT") {
    const updatedCart = await addItemToCart(validatedData);
    res.status(200).json({ items: updatedCart });
  }
  if (req.method === "GET") {
    const cart = db.prepare("SELECT * FROM CartItem").all();
    res.status(200).json({ cart });
  }
};
export default handler;
