import { NextResponse } from "next/server";
import { z } from "zod";

const itemIdSchema = z
  .string()
  .regex(/^\d+$/, "itemId should be a numeric string");

const bodySchema = z.object({
  quantity: z.number().int().positive(),
});

const validateItemId = (itemId: string) => {
  const idValidation = itemIdSchema.safeParse(itemId);
  if (!idValidation.success) {
    return NextResponse.json(
      { message: "Invalid cart item id", issues: idValidation.error.issues },
      {
        status: 400,
      }
    );
  }
};

const validateBody = (body: number) => {
  const bodyValidation = bodySchema.safeParse(body);

  if (!bodyValidation.success) {
    return NextResponse.json(
      { message: "Invalid quantity", issues: bodyValidation.error.issues },
      {
        status: 400,
      }
    );
  }
};

const returnNotFoundOrSuccess = (message: string, success: any) => {
  if (!success) {
    return NextResponse.json(
      { message: `No matched item found` },
      { status: 404 }
    );
  }
  return NextResponse.json({ message }, { status: 200 });
};

export { validateItemId, validateBody, returnNotFoundOrSuccess };
