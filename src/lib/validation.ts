import { NextResponse } from "next/server";
import { z } from "zod";

const productIdSchema = z
  .string()
  .regex(/^[a-zA-Z0-9-]+$/, "Id should only contain letters, numbers and -");

const bodySchema = z.object({
  quantity: z.number().int().positive(),
});

const validateProductId = (id: string) => {
  const idValidation = productIdSchema.safeParse(id);
  if (!idValidation.success) {
    return NextResponse.json(
      { message: "Invalid product id", issues: idValidation.error.issues },
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
      { message: `No matched product found` },
      { status: 404 }
    );
  }
  return NextResponse.json({ message }, { status: 200 });
};

export { validateProductId, validateBody, returnNotFoundOrSuccess };
