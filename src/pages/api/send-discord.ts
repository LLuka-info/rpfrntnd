// pages/api/send-discord.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { cart, customer, totalAmount } = req.body;

    if (!DISCORD_WEBHOOK_URL) {
      return res.status(500).json({ message: "Missing Discord webhook URL" });
    }

    const embed = {
      title: "🧾 New Paid Order",
      fields: [
        { name: "Customer", value: customer.fullName },
        { name: "Email", value: customer.email },
        { name: "Phone", value: customer.phone || "N/A" },
        { name: "Address", value: `${customer.address}, ${customer.city}, ${customer.country}` },
        { name: "Payment", value: customer.paymentMethod },
        { name: "Total", value: `${totalAmount} EUR` },
        {
          name: "Products",
          value: cart
            .map((item: any) => {
              const model = item.images?.[0]?.label || "N/A";
              return `• **${item.name}** (Model: ${model}, Size: ${item.selectedSize || "N/A"}, Quantity: ${item.quantity}, Price: ${item.price} RON, [CNFans URL](${item.cnfansurl || "#"})`;
            })
            .join("\n"),
        },
      ],
    };
    

    await axios.post(DISCORD_WEBHOOK_URL, {
      content: "✅ A new order has been paid!",
      embeds: [embed],
    });

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("❌ Discord webhook failed:", error.message);
    return res.status(500).json({ message: "Failed to send Discord webhook", error: error.message });
  }
}
