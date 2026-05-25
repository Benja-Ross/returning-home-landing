import { NextResponse } from "next/server";
import { z } from "zod";

const web3FormsEndpoint = "https://api.web3forms.com/submit";
const defaultWeb3FormsAccessKey = "25662c8a-3db5-49ef-8247-3fa0cc420aaa";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(120),
  interestType: z.string().trim().min(1).max(80),
  message: z.string().trim().min(10).max(3000),
  website: z.string().trim().max(200).optional().default(""),
});

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY ?? defaultWeb3FormsAccessKey;

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "We could not read that message." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please complete all fields before sending." },
      { status: 400 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const web3FormsPayload = {
    access_key: accessKey,
    subject: `Returning Home contact: ${parsed.data.interestType}`,
    from_name: "Returning Home contact form",
    replyto: parsed.data.email,
    name: parsed.data.name,
    email: parsed.data.email,
    interest_type: parsed.data.interestType,
    message: parsed.data.message,
    botcheck: "",
  };

  try {
    const response = await fetch(web3FormsEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(web3FormsPayload),
      cache: "no-store",
    });

    const result = (await response.json()) as { success?: boolean };

    if (!response.ok || !result.success) {
      return NextResponse.json(
        { ok: false, error: "Your note did not go through. Please try again in a moment." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "We could not reach the contact service just now." },
      { status: 502 },
    );
  }
}
