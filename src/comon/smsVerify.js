import React from 'react'

export default function SmsVerify({ message, onSubmit, onHandleChange }) {
    // console.log(typeof (message?.message.to), 999);
    return (
        <div>

            <form
                onSubmit={onSubmit}
                className={message?.error ? 'error sms-form' : 'sms-form'}
            >
                <div>
                    <label htmlFor="to">To:</label>
                    <input
                        type="tel"
                        name="to"
                        id="to"
                        value={message?.message?.to}
                        onChange={(e) => onHandleChange(e)}
                    />
                </div>
                <div>
                    <label htmlFor="body">Body:</label>
                    <textarea
                        name="body"
                        id="body"
                        value={message?.message?.body}
                        onChange={(e) => onHandleChange(e)}
                    />
                </div>
                <button type="submit" disabled={message?.submitting}>
                    Send message
                </button>
            </form>

        </div>
    )
}
