import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import { IoMdAdd } from 'react-icons/io';
import { AiOutlineDelete, AiOutlineCloudUpload } from 'react-icons/ai';
import Loading from "../loading";
import notification from "../notification/notification";
export default function UploadImages({ setNuevo, nuevo, handleClose }) {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const maxNumber = 69;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        // console.log(imageList, addUpdateIndex, 6767);
        setImages(imageList);
    };
    let arrayImg = []
    const handleSubmit = () => {
        setLoading(true)

        setTimeout(() => {
            notification.success('Tải lên thành công')
            setLoading(false)
            handleClose(false)
        }, 2000);
        setNuevo({ ...nuevo, cccd: images[0]?.file?.name })



    }
    console.log(images[0]?.file?.name, 'ok');
    return (
        <div className="App">
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps
                }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                        <button className="btn btn-warning"
                            style={isDragging ? { color: "red" } : null}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            <span><AiOutlineCloudUpload /></span> Tải hình ảnh lên
                        </button>
                        &nbsp;
                        <button onClick={onImageRemoveAll} className="btn btn-danger"><span><AiOutlineDelete /></span>xóa tất cả</button>
                        {imageList.map((image, index) => (
                            <div key={index} className="image-item mt-3">
                                <img src={image.data_url} alt="" width="300" />
                                <div className="image-item__btn-wrapper mt-3">
                                    <IoMdAdd onClick={() => onImageUpdate(index)} className="icon-upload">Cập nhật</IoMdAdd>
                                    <AiOutlineDelete onClick={() => onImageRemove(index)} >Xóa</AiOutlineDelete>
                                </div>
                                <button className="btn btn-primary w-100" onClick={() => handleSubmit()}>  {
                                    loading ? <Loading type="spinningBubbles" color="white" width={20} height={20} /> : "Sử dụng ảnh này"
                                }</button>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}