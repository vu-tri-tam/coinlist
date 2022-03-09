import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function Ckedittor({ setComment }) {
    return <div>
        <label><h5>Nhận xét</h5></label>
        <textarea className='form-control' placeholder='Để lại nhận xét của bạn tại đây...' name="" id="" cols="30" rows="10" onChange={(e) => setComment(e?.target.value)}></textarea>


        {/* <CKEditor
            editor={ClassicEditor}
            data="<p>Xin chào!. Mời để lại nhận xét ^^</p>"
            onReady={editor => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
                const data = editor.getData()

                console.log(data, 'event')
                setComment(data)

            }}
            onBlur={(event, editor) => {
                // console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
                // console.log('Focus.', editor);
            }}
        /> */}
    </div>;
}
