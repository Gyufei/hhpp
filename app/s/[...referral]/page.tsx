"use client";
import { redirect } from "next/navigation";

export default function ReferralPage({ params }: { params: any }) {
  const referral = params.referral[0];

  redirect(`/en/s/${referral}`);

  return null;
}
