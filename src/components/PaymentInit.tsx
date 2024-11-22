import React from 'react';
import { NodeProps } from "@xyflow/react";

export default function PaymentInit({ data: { amount }, }: NodeProps<{ amount: number }>) {
    return (
        <div>PaymentInit</div>
    )
}
