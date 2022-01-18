import React from 'react'
import QRCode from "qrcode.react";
export default function QRcode() {
    return (
        <div>

            <QRCode
                value={Math.random()}
                renderAs="svg"
                style={{
                    width: "40vmin",
                    height: "40vmin"
                }}
            />

        </div>
    )
}
